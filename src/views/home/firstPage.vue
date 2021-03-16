<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="24" class="map-container">
        <el-card shadow="never">
            <!--选择设备--> 
            <el-select v-model="selectValue" placeholder="请选择在线设备" class="select-container" @change="showInfo()" >
                <el-option
                    v-for="item in deviceOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
            <!--设备信息及命令--> 
            <el-card v-show="visible" class="carInfo-container" shadow="hover">
                <span class="info-title">设备实时信息</span>
                <div style="line-height:1.7">
                    <div>当前设备：{{realtime.value}}</div>
                    <div>当前经度：{{realtime.j}}</div>
                    <div>当前纬度：{{realtime.w}}</div>
                    <div>当前高度：0m</div>
                    <div>周围温度：35℃</div>
                    <div>设备电量：60%</div>
                </div>
                <el-divider></el-divider>
                <span class="info-title">选择命令</span>
                <el-select size="small" v-model="selectOrder" clearable placeholder="请选择">
                    <el-option
                        v-for="item in orderOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <el-button type="primary" size="small" icon="el-icon-position" style="margin-top: 15px;float: right;margin-bottom: 15px;">发送</el-button>
            </el-card>
          <!-- 地图 -->
          <baidu-map class="map" :center="center" :zoom="10" :scroll-wheel-zoom="true" style="height:85vh">
            <!--缩放控件--> 
            <bm-navigation anchor="BMAP_ANCHOR_TOP_LEFT"></bm-navigation>
            <!--比例尺控件--> 
            <bm-scale anchor="BMAP_ANCHOR_BOTTOM_LEFT"></bm-scale>
            <!--所有目标--> 
            <bm-point-collection :points="markerPoints" shape="BMAP_POINT_SHAPE_STAR" color="red"></bm-point-collection>
            <!--选中目标-->
            <bm-marker :position="nowPosition" animation="BMAP_ANIMATION_BOUNCE">
                <bm-info-window :show="show" @close="infoWindowClose" @open="infoWindowOpen" style="padding-top:10px;margin-bottom:-10px;width:250px">
                    <img :src="picture" style="height:90%;width:100%">
                    <p style="text-align:center">- 拍摄画面 -</p>
                </bm-info-window>
            </bm-marker>
          </baidu-map>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>


<script>
export default {
  data() {
    return { 
        realtime:{name: '小车1', value: 'car1', j: '120.12', w: '30.25'},   // 实时经纬度，选中行的经纬度
        markerPoints: [],         //海量点
        visible: false,           //是否显示设备实时信息
        deviceOptions: [],        //选择设备下拉框
        selectValue: '',
        orderOptions: [{          //选择命令下拉框
          value: '选项1',
          label: '喷洒酒精'
        }, {
          value: '选项2',
          label: '拍照'
        }],
        selectOrder:'',
        show: false,                           //是否显示当前车辆摄像头数据
        center: {lng: 120.15, lat: 30.28},     // 初始地图中心点的经纬度
        nowPosition: {lng: '', lat: ''},       //初始地图当前车辆位置
        picture: require('@/icons/svg/picture.png'),
    }
  },
  mounted(){
    this.$nextTick( function() {
    //   var timer = setTimeout(() => {

    //   }, 500);
      this.getServiceInfo(1);
    })
  },
  methods: {
    //得到设备信息
    getServiceInfo() {
      var Params = {}
      let url = process.env.VUE_APP_BASE_API + '/device/car/allCarData'
      this.$ajax.get(url).then( res => {
        console.log(res)
        let deviceObj = [{label:'显示全部',value:'all'}]
        let positionObj = []
        for(let i=0; i<res.data.length; i++) {
            let array = {}
            let array2 = {}
            if(res.data[i].state==1) {
                array.label = res.data[i].deviceID
                array.value = res.data[i].deviceID
                array2.name= res.data[i].deviceID
                //array2.lng = 120.12
                //array2.lat = 30.25      
                array2.lng = res.data[i].latitude
                array2.lat = res.data[i].longitude          
                deviceObj.push(array)
                positionObj.push(array2)
            }
        }
        this.deviceOptions = deviceObj
        //console.log(this.deviceOptions)
        this.markerPoints = positionObj
        this.openSocket()
        this.$message({
          message:'跨域数据获取成功',
          type:'success'
        });
        this.listLoading = false
      }).catch(error => {
        console.log(error);
        this.$message.error("获取数据失败");
      })
    },
    //关闭摄像头窗口
    infoWindowClose () {
      this.show = false
    },
    //打开摄像头窗口
    infoWindowOpen () {
      this.show = true
    },
    //展示当前设备实时状态
    showInfo() {
      console.log(this.selectValue)
      this.realtime.value = this.selectValue
      for(let i=0;i<this.markerPoints.length;i++) {
          if(this.realtime.value == this.markerPoints[i].name) {
            this.realtime.j = this.markerPoints[i].lng
            this.realtime.w = this.markerPoints[i].lat
          }
      }
      if(this.selectValue!='all') {
        this.visible = true
        if(this.selectValue!='') {
            this.nowPosition.lng = this.realtime.j
            this.nowPosition.lat = this.realtime.w
            this.center.lng = this.realtime.j
            this.center.lat = this.realtime.w
            this.infoWindowOpen()
        }
      }
      else {
        this.nowPosition.lng = ''
        this.nowPosition.lat = ''
        this.center={lng: 120.15, lat: 30.28}
        this.infoWindowClose()    
        this.visible = false
      }
    },
    // 实时获取数据
    openSocket() {
      let _this = this;
      for(let i=0; i<_this.deviceOptions.length; i++) {
        if (_this.deviceOptions[i].value!='all') {
            let socket;
            var socketUrl = "http://10.1.18.217:6382/imserver/" + _this.deviceOptions[i].value;
            console.log(socketUrl)
            socketUrl = socketUrl.replace('https', 'ws').replace('http', 'ws');
            if(socket!=null){
                socket.close();
                socket=null;
            }
            socket = new WebSocket(socketUrl);
            //打开事件
            socket.onopen = function() {
            // console.log("websocket已打开");
            };
            //获得消息事件，收到服务器的消息时被调用
            socket.onmessage = function(msg) {
                // data为json格式
                //console.log(msg)
                if (msg.data != '连接成功') {
                let data = eval('(' +msg.data + ')');
                if(_this.selectValue!='all' || _this.selectValue!='') {
                    if(data.carID==_this.realtime.value) {
                        _this.realtime.j = data.longitude;
                        _this.realtime.w = data.latitude;
                        _this.nowPosition.lng = data.longitude;
                        _this.nowPosition.lat = data.latitude;
                    }                
                }
                //地图上更新当前车辆位置
                let points = _this.markerPoints;
                for (let i=0; i<points.length; i++) {
                    if(points[i].name == data.deviceID) {
                        _this.$set(points[i],'lng',data.longitude)
                        _this.$set(points[i],'lat',data.latitude)
                    }
                }
                _this.markerPoints = points
                //console.log(_this.markerPoints)
                }
            };
            }
      }
    }
  }
}

</script>


<style lang="scss" scoped>
  .app-container {
    padding: 20px;
    min-width: 970px;
    .map-container {
      .newmap {
        height: 590px;
      }
      .select-container {
        position: fixed;
        z-index: 2;
        right: 50px;
        top: 100px;
        width: 240px;
      }
      .carInfo-container {
        position: fixed;
        z-index: 1;
        right: 50px;
        top: 160px;
        width: 239px;     
        .info-title {
            line-height: 1.8;
            padding-bottom: 10px;
            font-weight: bold;
            display: block;
        }
      }
      
    }
    .ctrl-container {
      .selectCmd {
        margin-top: 20px;
      }
      .el-row {
        margin-bottom: 20px;
        margin-top: 20px;
        &:last-child {
          margin-bottom: 0;
        }
      }
      .el-col {
        width: 50%;
      }
    }
  }
.select-form{
  display: flex;
  justify-content: center;
  height: 40px;
}
.check-btn{
  margin-left: 20px;
}
</style>
