<template>
  <div class="app-container">
    <!-- selectbar -->
    <div class="selectbar">
      <span style="font-size:15px">设备种类：</span>
      <!-- <el-select v-model="value" size="small" placeholder="请选择" @change="fetchData"> -->
      <el-select v-model="value" size="small" placeholder="请选择" @change="getCarData">

        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          >
        </el-option>
      </el-select>
    </div>
    <!-- table -->
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      @current-change="handleCurrentChange"
    >
      
      <el-table-column label="设备编号" min-width="100" align="center">
        <template slot-scope="scope">
          <!-- <el-input placeholder="请输入设备编号" size="mini" v-show="scope.row.show" v-model="scope.row.carID"></el-input>
          <span v-show="!scope.row.show">{{ scope.row.carID }}</span> -->
          {{scope.row.carID}}
        </template>
      </el-table-column>
      <el-table-column label="设备型号" min-width="100" align="center">
        <template slot-scope="scope">
          <el-input placeholder="请输入设备型号" size="mini" v-if="scope.row.isShow" v-model="scope.row.type"></el-input>
          <span v-else>{{ scope.row.type }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属人" min-width="100" align="center">
        <template slot-scope="scope">
          <el-input placeholder="请输入所属人" size="mini" v-if="scope.row.isShow" v-model="scope.row.owner"></el-input>
          <span v-else>{{ scope.row.owner }}</span>
        </template>
      </el-table-column>
      <el-table-column label="电池状态" min-width="200" align="center">
        <template slot-scope="scope">
          <el-progress :text-inside="true" :stroke-width="17" :percentage="scope.row.electricity" :color="customColorMethod"></el-progress>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="使用状态" min-width="100" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.state | statusFilter">{{ scope.row.state }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="150" align="center">
        <template slot-scope="scope">
          <el-button @click="editInfo(scope.row,scope.$index,true)" :type="scope.row.isShow? 'success':''" plain size="small">
            {{scope.row.isShow?'保存':"修改"}}
          </el-button>
          <el-button @click="editInfo(scope.row,scope.$index,false)" v-if="scope.row.isShow" type="primary" plain size="small">
            取消
          </el-button>
          <!-- <el-tag :type="scope.row.isShow? 'success':''" style="cursor: pointer;width:130px;height:60px" @click="editInfo(scope.row,scope.$index,true)">
            {{scope.row.isShow?'保存':"修改"}}
          </el-tag>
          <el-tag v-if="scope.row.isShow" style="cursor: pointer;" @click="editInfo(scope.row,scope.$index,false)">
              取消
          </el-tag> -->
        </template>
      </el-table-column>
    </el-table>
    <!-- buttonbar -->
    <div class="buttonbar">
      <!-- leftbutton -->
      <div class="leftbutton">
        <el-button plain @click="dialogFormVisible = true">添加设备</el-button>
        <el-dialog title="添加设备信息" :visible.sync="dialogFormVisible" width="35%" center>
          <span style="font-size: 17px; margin:0px 0px 0px 20px">请输入设备信息进行连接。</span>
          <el-form ref="insertForm" :model="form" :label-position="formLabelPosition" :rules="insertRules" style="margin: 20px 20px -30px 20px;">
            <el-form-item label="设备编号：" :label-width="formLabelWidth" prop="carID">
              <el-input v-model="form.carID" placeholder="请输入设备编号" size="'mini'" ref="carID" name="carID"></el-input>
            </el-form-item>
            <el-form-item label="设备型号：" :label-width="formLabelWidth" prop="type">
              <el-input v-model="form.type" placeholder="请输入设备型号" ref="type"></el-input>
            </el-form-item>
            <el-form-item label="所属人：" :label-width="formLabelWidth" prop="owner">
              <el-input v-model="form.owner" placeholder="请输入设备所属人姓名" ref="owner"></el-input>
            </el-form-item>
            <el-form-item label="IP：" :label-width="formLabelWidth" prop="ip">
              <el-input v-model="form.ip" placeholder="请输入设备IP地址" ref="ip"></el-input>
            </el-form-item>
            <el-form-item label="连接设备：" :label-width="formLabelWidth" prop="isConnect">
              <el-button plain @click="testCount">连接测试</el-button>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cancelCar">取 消</el-button>
            <el-button type="primary" @click="insertCar">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <!-- rightbutton -->
      <div class="rightbutton">
          <el-button @click="deleteInfo" type="danger" plain>删除</el-button>
          <el-button @click="unconnect" type="warning" plain>断开</el-button>
          <el-button @click="connect" type="primary" plain>连接</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { getList } from '@/api/table'
import { addDeviceInfo } from '@/api/table'
import { editDeviceInfo } from '@/api/table'
import { deleteDeviceInfo } from '@/api/table'
import { unconnectDevice } from '@/api/table'
import { connectDevice } from '@/api/table'
import { validCarID } from '../../utils/validate'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        '连接成功': 'success',
        // '正在连接': 'gray',
        // '无法连接': 'danger',
        '断开连接': 'info'
      }
      return statusMap[status]
    }
  },
  data() {
    // 数据量小的时候，直接从后台返回的数据得到所有设备的carID
    const validateCarID = (rule, value, callback) => {
      var carID_arr = []
      console.log(value)
      this.list.forEach(item => {
        carID_arr.push(item.carID)
      })
      // console.log(carID_arr)
      if(!value) {
        callback(new Error('设备编号不能为空！'))
      }
      if (carID_arr.includes(value)) {
        // console.log('存在')
        callback(new Error('该设备已存在！'))
      } else {
        callback()
      }
    }

    const validateType = (rule, value, callback) => {
      if (!value) {
        callback(new Error('设备型号不能为空！'))
      } else {
        callback()
      }
    }

    const validateOwner = (rule, value, callback) => {
      if (!value) {
        callback(new Error('所属人不能为空！'))
      } else {
        callback()
      }
    }

    const validateIP = (rule, value, callback) => {
      if (!value) {
        callback(new Error('IP不能为空！'))
      }
      else {
        callback()
      }
    }

    const validateConnect = (rule, value, callback) => {
      if (!value) {
        callback(new Error('连通没有成功！'))
      }
      else {
        callback()
      }
    }
    return {
      list: null,
      listLoading: true,
      options: [{
          value: '0',
          label: '无人机'
        }, {
          value: '1',
          label: '小车'
      }],
      value: '1',
      currentRow: null,
      dialogFormVisible: false,
      form: {carID: '',type: '',owner: '',ip: '', isConnect: false},
      insertRules: {
        carID: [{required: true, trigger: 'blur', validator: validateCarID}],
        type: [{required: true, trigger: 'blur', validator: validateType}],
        owner: [{required: true, trigger: 'blur', validator: validateOwner}],
        ip: [{required: true, trigger: 'blur', validator: validateIP}],
        isConnect: [{required: true, trigger: 'blur', validator: validateConnect}]
      },
      formLabelPosition: 'left',
      formLabelWidth: '100px'
    }
  },
  created() {
    this.value = this.options[1].value
    this.getType()
    this.getCarData()
  },
  methods: {
    getType() {
      var type = this.value
      return type
    },
    getCarData(){
      var _this = this
      var Params = {}
      var type = parseInt(_this.getType())
      console.log('进入到跨域');
      if (type == 1) {
        this.listLoading = true
        let url = process.env.VUE_APP_BASE_API + '/device/car/allCarData'
        console.log(url);
        _this.$ajax.get(url).then( res => {
        _this.list = res.data
        _this.list.forEach(item => {
          // 从后台获取到数据之后，给数据新增一个isShow属性
          Vue.set(item, 'isShow', false)
          if(item.state == 1) {
            item.state = "连接成功"
          } else {
            item.state = "断开连接"
          }
        })
        this.listLoading = false
        console.log(_this.list)
        console.log('跨域获取数据成功');
      }).catch(error => {
        console.log(error);
        this.$message.error("获取数据失败");
      })
      } else {
        var data = {}
        data.type = parseInt(this.getType())
        // console.log(data)
        this.listLoading = true
        getList(data).then(response => {
          this.list = response.data.items
          this.list.forEach(element => {
            element['show'] = false
            if(element.state == 1) {
              element.state = "连接成功"
            } else {
              element.state = "断开连接"
          }
          })
          this.listLoading = false
        })
        console.log('refresh')
      }
    },
    customColorMethod(percentage) {
      if (percentage < 100 && percentage >= 75) {
        return '#409DFE'
      } else if (percentage < 75 && percentage >= 50) {
        return '#67C13A'
      } else if (percentage < 50 && percentage >= 25) {
        return '#E5A13C'
      } else {
        return '#F46C6C'
      }
    },
    handleCurrentChange(val) {
      this.currentRow = val
    },
    insertCar() {
      this.$refs.insertForm.validate(valid => {
        if (valid) {
          this.$ajax.post(process.env.VUE_APP_BASE_API + '/device/car/insertCar',{
          carID: this.form.carID,
          type: this.form.type,
          owner: this.form.owner,
          ip: this.form.ip
        }).then( res => {
          console.log(res)
          if (res.data == 1){
            this.$message({
              message:"添加成功！",
              type: 'success'
            })
            this.dialogFormVisible = false;
            // 提交成功之后，清空表单
            this.$refs.insertForm.resetFields();
            this.getCarData()
          } else {
              this.$message.error("添加设备失败")
            }
          }).catch(error => {
          if (error.response) {
            // 请求已发出，但服务器响应的状态码不在 2xx 范围内
            console.log( error.response.data );
            console.log( error.response.status );
            console.log( error.response.headers );
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log( "Error", error.message)
          }
          })
        } else {
          console.log('错误提交')
          return false
        }
      })
    },
    cancelCar(){
      this.dialogFormVisible = false
      this.$refs.insertForm.resetFields();
    },
    editInfo(row, index, cg){
      console.log(row)
      // 点击修改，判断是否已经保存所有修改操作
      for (let i of this.list) {
        console.log(i.isShow)
        if (i.isShow && i.carID != row.carID) {
          this.$message.warning('请先保存当前选项')
          return false
        }
      }
      // 是否是修改操作
      if(!row.isShow && cg){
        row.isShow = true
        return true
      }
      // 是否是取消操作
      if (!cg) {
        this.getCarData()
        return row.isShow = !row.isShow
      }
      // 进行保存数据
      if(row.isShow && cg) {
        this.saveInfo(row)
        row.isShow = false
        return true
      }
    },
    saveInfo(row) {
      if (row.type == '' || row.owner == '') {
        this.$message.error("设备型号或者所属人不能为空！")
        this.getCarData()
        return false
      }
      var Params = {
        carID: row.carID,
        type: row.type,
        owner: row.owner
      }
      console.log(Params)
      this.$ajax({
            url: process.env.VUE_APP_BASE_API + '/device/car/updateCar',
            method: 'post',
            contentType: "application/json;charset=UTF-8",
            data: Params
        }).then( res => {
          console.log(res)
        if (res.data == 1) {
          this.$message({
            message: '保存成功!',
            type: 'success'
          })
          this.getCarData()
        } else {
          console.log("更新失败")
        }
      }).catch(error => {
        if (error.response) {
          // 请求已发出，但服务器响应的状态码不在 2xx 范围内
          console.log( error.response.data );
          console.log( error.response.status );
          console.log( error.response.headers );
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log( "Error", error.message)
        }
      })

    },
    deleteInfo() {
      if (!this.currentRow) { this.$message.error('请先至少选择一行！') } else {
        var Params = {
          carID: this.currentRow.carID
        }
        console.log(Params)
        // data.Number = this.currentRow.Number
        // console.log(data)
        this.$confirm('此操作将永久删除选中的该设备, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$ajax({
            url: process.env.VUE_APP_BASE_API + '/device/car/deleteCar',
            method: 'post',
            contentType: "application/json;charset=utf-8",
            params: Params
          }).then(res => {
            console.log(res)
            if (res.data === 1) {
              this.$message({
                message:"删除成功！",
                type: 'success'
              })
              this.getCarData()
            }else {
              this.$message.error('删除失败！')
            }
          }).catch(error => {
            console.log(error)
          })
      })
      }
    },
    unconnect() {
      if (!this.currentRow) { this.$message.error('请先至少选择一行！') } else {
        console.log(this.currentRow)
        if (this.currentRow.state === '断开连接') {
          this.$message.error('您选择的设备处于断开连接状态，无法进行断开连接操作。')
        } else if (this.currentRow.state === '正在连接') {
          this.$message.error('您选择的设备处于正在连接状态，无法进行连接操作。')
        } else if (this.currentRow.state === '连接成功' || this.currentRow.state === '无法连接') {
        var Params = {
          carID: this.currentRow.carID
        }
        let url = process.env.VUE_APP_BASE_API + '/data/car/closeConnect'
        this.$ajax({
          url: url,
          method: 'post',
          contentType: 'application/json;charset=utf-8',
          params: Params
        }).then(res => {
          console.log(res)
          if(res.data == 1) {
            this.$message({
              type: 'success',
              message: '断开成功'
            })
            this.currentRow.state = "断开连接"
          } else{
            this.$message.error("连接失败")
          }
        }).catch(error => {
          console.log("连接失败")
        })
        }
      }
    },
    connect() {
      if (!this.currentRow) { this.$message.error('请先至少选择一行！') } else {
        console.log(this.currentRow)
        if (this.currentRow.state === '已连接') {
          this.$message.error('您选择的设备处于已连接状态，无法进行连接操作。')
        } else if (this.currentRow.state === '正在连接') {
          this.$message.error('您选择的设备处于正在连接状态，无法进行连接操作。')
        } else if (this.currentRow.state === '断开连接' || this.currentRow.state === '无法连接') {
          var Params = {
            carID: this.currentRow.carID
          }
          let url = process.env.VUE_APP_BASE_API + '/data/car/connect'
          this.$ajax({
            url: url,
            method: 'post',
            contentType: 'application/json;charset=utf-8',
            params: Params
          }).then(res => {
            console.log(res)
            if(res.data == 1) {
              this.$message({
                type: 'success',
                message: '连接成功'
              })
              this.currentRow.state = "连接成功"
            } else{
              this.$message.error("连接失败")
            }
          }).catch(error => {
            console.log("连接失败")
          })
        }
      }
    },
    testCount() {
      this.form.isConnect = false;
      var Params = {
        IP: this.form.ip
      }
      let url = process.env.VUE_APP_BASE_API + '/data/car/testConnect'
      console.log(url)
      this.$ajax({
        url: url,
        method: 'post',
        params: Params,
        contentType: 'application/json;charset=utf-8'
        }).then(res => {
          console.log(res)
        if (res.data == 1) {
          this.$message({
            type: 'success',
            message: '连通成功'
          })
          this.form.isConnect = true;
        } else {
          this.$message.error('连通失败')
        }
      }).catch(error => {
        console.log('连通失败')
      })
    },

  },
}
</script>

<style lang="scss" scoped>
.app-container {
  min-width: 795px;
  .el-table {
    margin-top: 20px;
    .el-progress {
      padding: 20px;
    }
  }
  .buttonbar {
    padding: 20px;
    .leftbutton {
      float: left;
    }
    .rightbutton {
      float: right;
    }
  }
}
</style>

<style>
  body .el-table th.gutter{
    display: table-cell!important;
  }

  body .el-table colgroup.gutter{
    display: table-cell!important;
  }
</style>
