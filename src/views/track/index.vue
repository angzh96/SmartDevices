<template>
  <div class="app-container">
    <baidu-map
      class="map"
      v-model="map"
      :zoom="16"
      :center="targetPoint.position"
      :scroll-wheel-zoom="true"
    >
      <bm-navigation anchor="BMAP_ANCHOR_TOP_LEFT"></bm-navigation>
      <bm-scale anchor="BMAP_ANCHOR_BOTTOM_LEFT"></bm-scale>
      <bm-circle
        :center="targetPoint.position"
        :radius="radius"
        stroke-color="red"
        :stroke-opacity="0.6"
        :stroke-weight="2"
        :stroke-style="'dashed'"
      ></bm-circle>

      <bm-marker
        :position="targetPoint.position"
        :icon="{
          url: require('../../icons/png/position_red.png'),
          size: { width: 25, height: 25 },
        }"
      >
        <bm-label
          :content="'设备编号：' + targetPoint.id"
          :labelStyle="{
            color: '#fff',
            backgroundColor: '#333333',
            border: '0',
            opacity: '0.8',
            padding: '5px',
            borderRadius: '5px',
            fontSize: '14px',
          }"
          :offset="{ width: 15, height: -30 }"
        />
      </bm-marker>

      <div v-for="point in points" :key="point.id">
        <bm-marker
          :position="point.position"
          :icon="{
            url: require('../../icons/png/position_blue.png'),
            size: { width: 25, height: 25 },
          }"
        >
          <bm-label
            :content="
              '<div>设备编号：' +
              point.id +
              '</div><div>目标：' +
              point.target +
              '</div><div>距离目标：' +
              point.distance_to_target +
              '米</div>'
            "
            :labelStyle="{
              background: 'rgba(255, 255, 255, 0.85)',
              border: '0',
              padding: '5px',
              borderRadius: '5px',
              fontSize: '14px',
            }"
            :offset="{ width: 15, height: -50 }"
          />
        </bm-marker>
      </div>
    </baidu-map>
  </div>
</template>


<script>
import { sendGetRequest } from "@/api/api.js";

export default {
  data() {
    return {
      map: {},
      radius: 1000,
      center: { lng: 120.15, lat: 30.28 },
      targetPoint: {},
      points: [],
    };
  },
  created() {
    // this.getCenter();
    this.addPoints();
    // window.setInterval(() => {
    //   setTimeout(() => {
    //     this.addPoints();
    //   }, 0);
    // }, 1000);
  },
  methods: {
    msgSuccess(msg) {
      this.$message({
        message: msg,
        type: "success",
      });
    },
    msgError(msg) {
      this.$message.error(msg);
    },
    // getCenter() {
    //   var geolocation = new window.BMap.Geolocation();
    //   geolocation.getCurrentPosition(
    //     function (r) {
    //       if (this.getStatus() == BMAP_STATUS_SUCCESS) {
    //         this.center = { lng: r.longitude, lat: r.latitude };
    //       } else {
    //         this.msgError("获取设备点失败！");
    //       }
    //     },
    //     { enableHighAccracy: true }
    //   );
    // },
    addPoints() {
      this.points = [];
      this.targetPoint = {};

      var url = "http://192.168.43.254:6382/device/carCoordinate/coordinate";
      sendGetRequest(url).then((res) => {
        // this.$ajax.get(url).then((res) => {
        // var res = {};
        // res.data = [
        //   {
        //     longitude: 120.016883,
        //     latitude: 30.003487,
        //     distance_to_target: 0.0,
        //     radius: 400.0,
        //     id: 0,
        //     _in_circle: true,
        //   },
        //   {
        //     longitude: 120.019734,
        //     latitude: 30.000179,
        //     distance_to_target: 459.5,
        //     radius: 400.0,
        //     id: 1,
        //     _in_circle: false,
        //   },
        //   {
        //     longitude: 120.015056,
        //     latitude: 30.008784,
        //     distance_to_target: 615.4,
        //     radius: 400.0,
        //     id: 2,
        //     _in_circle: false,
        //   },
        //   {
        //     longitude: 120.001757,
        //     latitude: 30.005111,
        //     distance_to_target: 1469.3,
        //     radius: 400.0,
        //     id: 3,
        //     _in_circle: false,
        //   },
        //   {
        //     longitude: 120.012897,
        //     latitude: 30.004933,
        //     distance_to_target: 416.6,
        //     radius: 400.0,
        //     id: 4,
        //     _in_circle: false,
        //   },
        //   {
        //     longitude: 120.01998,
        //     latitude: 30.008067,
        //     distance_to_target: 590.8,
        //     radius: 400.0,
        //     id: 5,
        //     _in_circle: false,
        //   },
        //   {
        //     longitude: 120.011488,
        //     latitude: 30.004937,
        //     distance_to_target: 544.6,
        //     radius: 400.0,
        //     id: 6,
        //     _in_circle: false,
        //   },
        //   {
        //     longitude: 120.01496,
        //     latitude: 30.00254,
        //     distance_to_target: 213.29999999999998,
        //     radius: 400.0,
        //     id: 7,
        //     _in_circle: true,
        //   },
        //   {
        //     longitude: 120.001187,
        //     latitude: 30.000798,
        //     distance_to_target: 1542.5,
        //     radius: 400.0,
        //     id: 8,
        //     _in_circle: false,
        //   },
        //   {
        //     longitude: 120.013006,
        //     latitude: 30.00023,
        //     distance_to_target: 520.7,
        //     radius: 400.0,
        //     id: 9,
        //     _in_circle: false,
        //   },
        // ];
        console.log(res.data);
        this.radius = res.data[0].radius;

        this.targetPoint.position = {
          lng: res.data[0].longitude,
          lat: res.data[0].latitude,
        };
        this.targetPoint.id = res.data[0].id;

        var cnt = 0;
        res.data.forEach((element) => {
          cnt++;
          if (cnt > 1) {
            var item = {};
            item.target = this.targetPoint.id;
            item.id = element.id;
            item.position = { lng: element.longitude, lat: element.latitude };
            item.distance_to_target = element.distance_to_target;
            this.points.push(item);
          }
        });
        console.log(this.targetPoint);
        console.log(this.points);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.app-container {
  padding: 0px;
  min-width: 970px;
  position: absolute;
  width: 100%;
  height: 100%;

  .map {
    height: 100%;
    width: 100%;
  }
}
</style>

<style>
.anchorBL {
  display: none;
}
</style>





