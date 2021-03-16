<template>
  <div class="hisdata-container">
    <el-row style="line-height:50px">
      <el-col :span="24">
        <div class="grid-content bg-purple-light">
          <el-col :span="3" style="text-align:center">按时间查询：</el-col>
          <el-col :span="7">
            <el-date-picker
              v-model="val_date"
              type="date"
              placeholder="选择日期"
              size="small"
            />
          </el-col>
          <el-col :span="3" style="text-align:center">按编号查询：</el-col>
          <el-col :span="7">
            <el-select v-model="val_id" placeholder="请选择" size="small">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-col>
          <el-col :span="4">
            <el-button size="small" @click="findPath">查询</el-button>
            <el-button size="small" @click="clearPath">清除</el-button>
          </el-col>
        </div>
      </el-col>
    </el-row>
    <el-card class="box-card" style="height:84vh">
      <el-row :gutter="20">
        <el-col :span="14" style="height:78vh">
          <baidu-map class="allmap" :center="center" :zoom="zoom" :scroll-wheel-zoom="true" @ready="handler" />
        </el-col>
        <el-col :span="10">
          <div class="video">
            <img :src="picture" style="height:160%;width:100%">
            <p style="text-align:center">- 拍摄画面 -</p>
          </div>
          <div class="datadisplay" style="padding-top:220px">
            <el-col :span="6" :offset="6" style="font-weight:600">
              <p>总路程：</p>
              <p>总时长:</p>
            </el-col>
            <el-col :span="10">
              <p>38公里</p>
              <p>1小时15分</p>
            </el-col>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7" :offset="6"><span>- 历史路径 -</span></el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'HistoryData',
  data() {
    return {
      center: { lng: 120.35861, lat: 30.324156 },
      zoom: 15,
      picture: require('@/icons/svg/picture.png'),
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      options: [{
        value: 'fj1',
        label: 'fj-001'
      }, {
        value: 'fj2',
        label: 'fj-002'
      }, {
        value: 'fj3',
        label: 'fj-003'
      }],
      val_date:'',
      val_id: '',
    }
  },
  watch: {
    val_id(val, oldval) {
      //val_id为下拉框v-model的值
      console.log(val,oldval)
      this.val_id = val
    }
  },
  methods: {
    handler({ BMap, map }) {
      //初始化地图
      this.map = map
      this.BMap = BMap
      var point = new BMap.Point(120.35861, 30.324156)
      map.centerAndZoom(point, 15)
    },
    findPath() {
      let BMap = this.BMap
      let map = this.map
      var datas = [
        { x: 120.349512, y: 30.320546, name: 'fj1' },
        { x: 120.356876, y: 30.320134, name: 'fj1' },
        { x: 120.363847, y: 30.319261, name: 'fj1' },
        { x: 120.366874, y: 30.320103, name: 'fj1' },
        { x: 120.349512, y: 30.320546, name: 'fj2' },
        { x: 120.355951, y: 30.326805, name: 'fj2' },
        { x: 120.360442, y: 30.326244, name: 'fj2' },
        { x: 120.366658, y: 30.327865, name: 'fj2' },
        { x: 120.349512, y: 30.320546, name: 'fj3' },
        { x: 120.364862, y: 30.323221, name: 'fj3' },
        { x: 120.369964, y: 30.325839, name: 'fj3'},
        { x: 120.371545, y: 30.322971, name: 'fj3'}
      ]
      var pois = []
      for (const i in datas) {
        if(datas[i].name == this.val_id )
        {
          pois.push(new BMap.Point(datas[i].x, datas[i].y))
        }
        for (const j in pois) {
          var marker = new BMap.Marker(pois[j])
          map.addOverlay(marker)
        }
      }
      var polyline = new BMap.Polyline(pois, {
        enableEditing: false,
        strokeColor: 'blue',
        strokeWeight: 4,
        strokeOpacity: 0.5
      })
      map.addOverlay(polyline)
    },
    clearPath() {
      let map = this.map
      map.clearOverlays()
    },
  }

}
</script>

<style lang="scss" scoped>
.hisdata-container {
  font-size:13px;
  margin:20px;

}
 .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    min-height: 50px;
  }
  .el-card {
    border:0px;
    height: 438px;
    .video {
      height:265px;
      width:100%;
    }
    .datadisplay {
      height:120px;
      width:100%;
      padding:20px;
      line-height: 25px;
    }
  }
</style>

<style>
.allmap {
  width: 100%;
  height: 75vh;
}
.BMap_cpyCtrl {
  display: none;
}
.anchorBL img{
  width: 0 !important;
}
</style>
