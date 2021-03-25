<template>
  <div class="app-container">
    <baidu-map
      class="map"
      v-model="map"
      :zoom="12"
      :center="center"
      :scroll-wheel-zoom="true"
    >
      <bm-navigation anchor="BMAP_ANCHOR_TOP_LEFT"></bm-navigation>
      <bm-scale anchor="BMAP_ANCHOR_BOTTOM_LEFT"></bm-scale>
      <bm-circle
        :center="targetPoint.position"
        radius="5000"
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
              '</div>'
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
export default {
  data() {
    return {
      map: {},
      center: { lng: 120.15, lat: 30.28 },
      targetPoint: {},
      points: [],
    };
  },
  created() {
    this.getCenter();
    this.addPoints();
    window.setInterval(() => {
      setTimeout(() => {
        this.addPoints();
      }, 0);
    }, 1000);
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
    getCenter() {
      var geolocation = new window.BMap.Geolocation();
      geolocation.getCurrentPosition(
        function (r) {
          if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            this.center = { lng: r.longitude, lat: r.latitude };
          } else {
            this.msgError("获取设备点失败！");
          }
        },
        { enableHighAccracy: true }
      );
    },
    addPoints() {
      this.points = [];
      this.targetPoint = {};

      for (var i = 0; i < 10; i++) {
        const point = {};
        point.id = i;
        point.position = {
          lng: Math.random() * 0.1 + 120.1,
          lat: Math.random() * 0.1 + 30.2,
        };
        point.target = 999;
        this.points.push(point);
      }

      this.targetPoint.id = 999;
      this.targetPoint.position = {
        lng: Math.random() * 0.1 + 120.1,
        lat: Math.random() * 0.1 + 30.2,
      };
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





