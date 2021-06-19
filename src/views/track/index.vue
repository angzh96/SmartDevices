<template>
  <div class="app-container">
    <baidu-map class="map" :center="centerPos" :zoom="18" :scroll-wheel-zoom="true" style="height:85vh" @click="getClickInfo">
      <!--缩放控件-->
      <bm-navigation anchor="BMAP_ANCHOR_TOP_LEFT"></bm-navigation>
      <!-- 基站id/pos/radius -->
      <div class="anchor" v-for="circleCenter in centers " :key="circleCenter.id">
        <!-- <bm-circle :center="circleCenter.pos" :radius="circleCenter.radius" stroke-color="grey" stroke-style="dashed" :editing="false" :stroke-opacity="0.5" :stroke-weight="1" :fillOpacity="0.3"></bm-circle> -->
        <!-- <bm-label :content="circleCenter.id" :position="circleCenter.pos" :labelStyle="{color: 'grey', fontSize : '12px'}"></bm-label> -->
      </div>
      <!--多目标-->
      <div class="target" v-for="target in targets" :key="target.id" >
        <bm-marker :position="target.pos" :icon="{url: require('@/icons/svg/target.png'), size:{width: 50,height:50}}">
          <bm-label
          :content="
          '<div>目标编号：' + target.id + '</div>' +
          '<div>目标级别：' + target.rank + '</div>'"
          :labelStyle="{border:'', color: 'blue', fontSize : '12px'}" 
          :offset="{width: -35, height: 15}">
          </bm-label>
        </bm-marker>
      </div>
      <!--多车test-->
      <div class="device" v-for="device in devices" :key="device.id">
        <bm-marker :position="device.pos" :icon="{url: require('@/icons/svg/marker.png'), size:{width: 50,height:50}}">
          <bm-label
          :content="
          '<div>设备编号：' + device.id + '</div>' + 
          '<div>所属基站：' + device.anchorId + '</div>'"
          :labelStyle="{border:'', color: 'black', fontSize : '12px'}" 
          :offset="{width: -35, height: 15}">
          </bm-label>
        </bm-marker>
      </div>
    </baidu-map>
  </div>
</template>

<script>
export default {
  data() {
    return {
      centerPos: {lng: 120.349512,lat: 30.320546},
      centers : [],
      targets : [],
      devices : [],
      };

  },

  mounted(){
    this.$nextTick( function() {
      this.getCircleInfo();
    })
  },
  methods: {
    getClickInfo (e) {
      console.log(e.point)
    },
    //获取基站信息
    getCircleInfo () {
      let anchorObj = []
      let anchorObj2 = []
      let url = process.env.VUE_APP_BASE_API + '/anchor/allAnchorData'
      this.$ajax.get(url).then( res => {
        anchorObj = res.data
        console.log(anchorObj)
        for( let i=0; i<anchorObj.length; i++) {
          let metadata = {}
          metadata.id = anchorObj[i].anchorID
          metadata.radius = anchorObj[i].radius
          metadata.pos = {lng:'', lat:''}
          metadata.pos.lng = anchorObj[i].longitude
          metadata.pos.lat = anchorObj[i].latitude
          anchorObj2.push(metadata)
        }
        // console.log(anchorObj2)
        this.centers = anchorObj2
        this.openSocket()
        this.openSocket2()

      }).catch(error => {
        console.log(error)
        this.$message.error("获取数据失败")
      })

    },
    //获取设备实时数据
    openSocket() {
      let _this = this;
      let socket;
      var socketUrl = "http://localhost:6382/imserver/user1"
      console.log(socketUrl);
      socketUrl = socketUrl.replace('http','ws').replace('http','ws')
      if(socket!=null){
        socket.close()
        socket=null
      }
      socket = new WebSocket(socketUrl)
      //打开事件
      socket.onopen = function() {
        console.log("websocket已打开")
      };
      socket.onmessage = function(msg) {
        //data为jason格式
        // console.log(msg.data);
        if(msg.data != '连接成功') {
          let data = eval('('+msg.data+')')
          let deviceObj = []
          for(let i=0; i<data.length; i++) {
            let deviceData = {}
            deviceData.anchorId = data[i].anchorID
            deviceData.id = data[i].deviceID
            deviceData.pos = {lng:'', lat:''}
            deviceData.pos.lng = data[i].longitude
            deviceData.pos.lat = data[i].latitude
            deviceObj.push(deviceData)
          }
          _this.devices = deviceObj
        }
      }
    },
    //获取目标实时数据
    openSocket2() {
      let _this = this;
      let socket;
      var socketUrl = "http://localhost:6382/imserver/user2"
      console.log(socketUrl);
      socketUrl = socketUrl.replace('http','ws').replace('http','ws')
      if(socket!=null){
        socket.close()
        socket=null
      }
      socket = new WebSocket(socketUrl)
      //打开事件
      socket.onopen = function() {
        console.log("websocket已打开")
      };
      socket.onmessage = function(msg) {
        //data为jason格式
        // console.log(msg.data);
        if(msg.data != '连接成功') {
          let data = eval('('+msg.data+')')
          // console.log(data)
          let targetObj = []
          for(let i=0; i<data.length; i++) {
            let targetData = {}
            targetData.id = data[i].targetId
            targetData.rank = data[i].targetRank
            targetData.pos = {lng:'', lat:''}
            targetData.pos.lng = data[i].longitude
            targetData.pos.lat = data[i].latitude
            targetObj.push(targetData)
          }
          _this.targets = targetObj
        }
      }
    }

  }

};
</script>

<style lang="scss" scoped>

</style>


