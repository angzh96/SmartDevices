<template>
  <div class="app-container">
    <baidu-map
      class="map"
      v-model="map"
      :zoom="16"
      :center="center"
      :scroll-wheel-zoom="true"
    >
      <bm-navigation anchor="BMAP_ANCHOR_TOP_LEFT"></bm-navigation>
      <bm-scale anchor="BMAP_ANCHOR_BOTTOM_LEFT"></bm-scale>
      <bm-circle
        v-if="target_id !== -1"
        :center="target_position"
        :radius="radius"
        stroke-color="red"
        :stroke-opacity="0.6"
        :stroke-weight="2"
        :stroke-style="'dashed'"
      ></bm-circle>

      <bm-marker
        v-if="target_id !== -1"
        :position="target_position"
        :icon="{
          url: require('../../icons/png/position_red.png'),
          size: { width: 25, height: 25 },
        }"
      >
        <bm-label
          :content="'设备编号：' + target_id"
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
      radius: 0,
      center: { lng: 120.15, lat: 30.28 },
      target_id: -1,
      target_position: { lng: 0, lat: 0 },
      points: [],
    };
  },
  created() {
    this.getCenter();
    // var dataCnt = 0;
    // this.addPoints(dataCnt);
    // window.setInterval(() => {
    //   setTimeout(() => {
    //     if (dataCnt < 7) {
    //       dataCnt++;
    //     } else {
    //       dataCnt = 0;
    //     }
    //     this.addPoints(dataCnt);
    //   }, 0);
    // }, 1000);
    this.init();
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
    addPoints(dataCnt) {
      this.points = [];
      this.targetPoint = {};

      var dataSet = [
        [
          {
            des_latitude: 0.0,
            des_longitude: 0.0,
            distance_to_target: 0.0,
            if_move: false,
            in_circle: true,
            latitude: 30.005518,
            longitude: 120.00286,
            radius: 709.0,
          },
          {
            des_latitude: 30.005518,
            des_longitude: 120.003031,
            distance_to_target: 8.1,
            if_move: true,
            in_circle: true,
            latitude: 30.005543,
            longitude: 120.002781,
            radius: 709.0,
          },
          {
            des_latitude: 30.005518,
            des_longitude: 120.002689,
            distance_to_target: 8.1,
            if_move: true,
            in_circle: true,
            latitude: 30.005543,
            longitude: 120.002781,
            radius: 709.0,
          },
          {
            des_latitude: 0.0,
            des_longitude: 0.0,
            distance_to_target: 1077.5,
            if_move: false,
            in_circle: false,
            latitude: 30.004142,
            longitude: 120.014142,
            radius: 709.0,
          },
          {
            des_latitude: 0.0,
            des_longitude: 0.0,
            distance_to_target: 1214.2,
            if_move: false,
            in_circle: false,
            latitude: 30.005348,
            longitude: 120.015348,
            radius: 709.0,
          },
          {
            des_latitude: 30.005653,
            des_longitude: 120.00286,
            distance_to_target: 8.1,
            if_move: true,
            in_circle: true,
            latitude: 30.005543,
            longitude: 120.002781,
            radius: 709.0,
          },
          {
            des_latitude: 0.0,
            des_longitude: 0.0,
            distance_to_target: 787.6,
            if_move: false,
            in_circle: false,
            latitude: 30.000781,
            longitude: 120.010781,
            radius: 709.0,
          },
          {
            des_latitude: 30.005383,
            des_longitude: 120.00286,
            distance_to_target: 8.1,
            if_move: true,
            in_circle: true,
            latitude: 30.005543,
            longitude: 120.002781,
            radius: 709.0,
          },
          {
            des_latitude: 0.0,
            des_longitude: 0.0,
            distance_to_target: 830.2,
            if_move: false,
            in_circle: false,
            latitude: 30.008676,
            longitude: 120.008676,
            radius: 709.0,
          },
          {
            des_latitude: 0.0,
            des_longitude: 0.0,
            distance_to_target: 1207.7,
            if_move: false,
            in_circle: false,
            latitude: 30.005292,
            longitude: 120.015292,
            radius: 709.0,
          },
        ],
        [
          {
            des_latitude: 0.0,
            des_longitude: 0.0,
            distance_to_target: 0.0,
            if_move: false,
            in_circle: true,
            latitude: 30.005164,
            longitude: 120.004662,
            radius: 944.0,
          },
          {
            des_latitude: 30.005164,
            des_longitude: 120.004833,
            distance_to_target: 730.4,
            if_move: true,
            in_circle: true,
            latitude: 30.004756,
            longitude: 119.9971,
            radius: 944.0,
          },
          {
            des_latitude: 30.005164,
            des_longitude: 120.004491,
            distance_to_target: 730.4,
            if_move: true,
            in_circle: true,
            latitude: 30.004756,
            longitude: 119.9971,
            radius: 944.0,
          },
          {
            des_latitude: 0.0,
            des_longitude: 0.0,
            distance_to_target: 1077.5,
            if_move: false,
            in_circle: false,
            latitude: 30.004142,
            longitude: 120.014142,
            radius: 944.0,
          },
          {
            des_latitude: 0.0,
            des_longitude: 0.0,
            distance_to_target: 1214.2,
            if_move: false,
            in_circle: false,
            latitude: 30.005348,
            longitude: 120.015348,
            radius: 944.0,
          },
          {
            des_latitude: 30.005299,
            des_longitude: 120.004662,
            distance_to_target: 730.4,
            if_move: true,
            in_circle: true,
            latitude: 30.004756,
            longitude: 119.9971,
            radius: 944.0,
          },
          {
            des_latitude: 0.0,
            des_longitude: 0.0,
            distance_to_target: 1033.7,
            if_move: false,
            in_circle: false,
            latitude: 30.00668,
            longitude: 120.016509,
            radius: 944.0,
          },
          {
            des_latitude: 0.0,
            des_longitude: 0.0,
            distance_to_target: 939.9,
            if_move: false,
            in_circle: true,
            latitude: 30.00662,
            longitude: 119.996511,
            radius: 944.0,
          },
          {
            des_latitude: 30.005029,
            des_longitude: 120.004662,
            distance_to_target: 206.6,
            if_move: true,
            in_circle: true,
            latitude: 30.004756,
            longitude: 120.002571,
            radius: 944.0,
          },
          {
            des_latitude: 0.0,
            des_longitude: 0.0,
            distance_to_target: 1207.7,
            if_move: false,
            in_circle: false,
            latitude: 30.005292,
            longitude: 120.015292,
            radius: 944.0,
          },
        ],
        [
          {
            des_latitude: 0.0,
            des_longitude: 0.0,
            distance_to_target: 0.0,
            if_move: false,
            in_circle: true,
            latitude: 30.004374,
            longitude: 120.002652,
            radius: 944.0,
          },
          {
            des_latitude: 30.004374,
            des_longitude: 120.002823,
            distance_to_target: 536.0,
            if_move: true,
            in_circle: true,
            latitude: 30.004641,
            longitude: 119.9971,
            radius: 944.0,
          },
          {
            des_latitude: 30.004374,
            des_longitude: 120.002481,
            distance_to_target: 536.0,
            if_move: true,
            in_circle: true,
            latitude: 30.004641,
            longitude: 119.9971,
            radius: 944.0,
          },
          {
            des_latitude: 0.0,
            des_longitude: 0.0,
            distance_to_target: 1077.5,
            if_move: false,
            in_circle: false,
            latitude: 30.004142,
            longitude: 120.014142,
            radius: 944.0,
          },
          {
            des_latitude: 0.0,
            des_longitude: 0.0,
            distance_to_target: 1214.2,
            if_move: false,
            in_circle: false,
            latitude: 30.005348,
            longitude: 120.015348,
            radius: 944.0,
          },
          {
            des_latitude: 30.004509,
            des_longitude: 120.002652,
            distance_to_target: 536.0,
            if_move: true,
            in_circle: true,
            latitude: 30.004641,
            longitude: 119.9971,
            radius: 944.0,
          },
          {
            des_latitude: 0.0,
            des_longitude: 0.0,
            distance_to_target: 1033.7,
            if_move: false,
            in_circle: false,
            latitude: 30.00668,
            longitude: 120.016509,
            radius: 944.0,
          },
          {
            des_latitude: 0.0,
            des_longitude: 0.0,
            distance_to_target: 939.9,
            if_move: false,
            in_circle: true,
            latitude: 30.00662,
            longitude: 119.996511,
            radius: 944.0,
          },
          {
            des_latitude: 30.004239,
            des_longitude: 120.002652,
            distance_to_target: 30.7,
            if_move: true,
            in_circle: true,
            latitude: 30.004641,
            longitude: 120.002571,
            radius: 944.0,
          },
          {
            des_latitude: 0.0,
            des_longitude: 0.0,
            distance_to_target: 1207.7,
            if_move: false,
            in_circle: false,
            latitude: 30.005292,
            longitude: 120.015292,
            radius: 944.0,
          },
        ],
        [
          {
            des_latitude: 0.0,
            des_longitude: 0.0,
            distance_to_target: 0.0,
            if_move: false,
            in_circle: true,
            latitude: 30.005321,
            longitude: 120.00452,
            radius: 944.0,
          },
          {
            des_latitude: 30.005321,
            des_longitude: 120.004691,
            distance_to_target: 718.1,
            if_move: true,
            in_circle: true,
            latitude: 30.004756,
            longitude: 119.9971,
            radius: 944.0,
          },
          {
            des_latitude: 30.005321,
            des_longitude: 120.004349,
            distance_to_target: 718.1,
            if_move: true,
            in_circle: true,
            latitude: 30.004756,
            longitude: 119.9971,
            radius: 944.0,
          },
          {
            des_latitude: 0.0,
            des_longitude: 0.0,
            distance_to_target: 1077.5,
            if_move: false,
            in_circle: false,
            latitude: 30.004142,
            longitude: 120.014142,
            radius: 944.0,
          },
          {
            des_latitude: 0.0,
            des_longitude: 0.0,
            distance_to_target: 1214.2,
            if_move: false,
            in_circle: false,
            latitude: 30.005348,
            longitude: 120.015348,
            radius: 944.0,
          },
          {
            des_latitude: 30.005456,
            des_longitude: 120.00452,
            distance_to_target: 718.1,
            if_move: true,
            in_circle: true,
            latitude: 30.004756,
            longitude: 119.9971,
            radius: 944.0,
          },
          {
            des_latitude: 0.0,
            des_longitude: 0.0,
            distance_to_target: 1033.7,
            if_move: false,
            in_circle: false,
            latitude: 30.00668,
            longitude: 120.016509,
            radius: 944.0,
          },
          {
            des_latitude: 0.0,
            des_longitude: 0.0,
            distance_to_target: 939.9,
            if_move: false,
            in_circle: true,
            latitude: 30.00662,
            longitude: 119.996511,
            radius: 944.0,
          },
          {
            des_latitude: 30.005186,
            des_longitude: 120.00452,
            distance_to_target: 198.1,
            if_move: true,
            in_circle: true,
            latitude: 30.004756,
            longitude: 120.002571,
            radius: 944.0,
          },
          {
            des_latitude: 0.0,
            des_longitude: 0.0,
            distance_to_target: 1207.7,
            if_move: false,
            in_circle: false,
            latitude: 30.005292,
            longitude: 120.015292,
            radius: 944.0,
          },
        ],
        [
          {
            des_latitude: 0.0,
            des_longitude: 0.0,
            distance_to_target: 0.0,
            if_move: false,
            in_circle: true,
            latitude: 30.006598,
            longitude: 120.005057,
            radius: 944.0,
          },
          {
            des_latitude: 30.006598,
            des_longitude: 120.005228,
            distance_to_target: 683.5,
            if_move: true,
            in_circle: true,
            latitude: 30.006789,
            longitude: 119.99797,
            radius: 944.0,
          },
          {
            des_latitude: 30.006598,
            des_longitude: 120.004886,
            distance_to_target: 683.5,
            if_move: true,
            in_circle: true,
            latitude: 30.006789,
            longitude: 119.99797,
            radius: 944.0,
          },
          {
            des_latitude: 0.0,
            des_longitude: 0.0,
            distance_to_target: 1077.5,
            if_move: false,
            in_circle: false,
            latitude: 30.004142,
            longitude: 120.014142,
            radius: 944.0,
          },
          {
            des_latitude: 0.0,
            des_longitude: 0.0,
            distance_to_target: 1214.2,
            if_move: false,
            in_circle: false,
            latitude: 30.005348,
            longitude: 120.015348,
            radius: 944.0,
          },
          {
            des_latitude: 30.006733,
            des_longitude: 120.005057,
            distance_to_target: 683.5,
            if_move: true,
            in_circle: true,
            latitude: 30.006789,
            longitude: 119.99797,
            radius: 944.0,
          },
          {
            des_latitude: 0.0,
            des_longitude: 0.0,
            distance_to_target: 1033.7,
            if_move: false,
            in_circle: false,
            latitude: 30.00668,
            longitude: 120.016509,
            radius: 944.0,
          },
          {
            des_latitude: 0.0,
            des_longitude: 0.0,
            distance_to_target: 939.9,
            if_move: false,
            in_circle: true,
            latitude: 30.00662,
            longitude: 119.996511,
            radius: 944.0,
          },
          {
            des_latitude: 30.006463,
            des_longitude: 120.005057,
            distance_to_target: 21.3,
            if_move: true,
            in_circle: true,
            latitude: 30.006789,
            longitude: 120.005071,
            radius: 944.0,
          },
          {
            des_latitude: 0.0,
            des_longitude: 0.0,
            distance_to_target: 1207.7,
            if_move: false,
            in_circle: false,
            latitude: 30.005292,
            longitude: 120.015292,
            radius: 944.0,
          },
        ],
        [
          {
            des_latitude: 0.0,
            des_longitude: 0.0,
            distance_to_target: 0.0,
            if_move: false,
            in_circle: true,
            latitude: 30.005351,
            longitude: 120.004437,
            radius: 944.0,
          },
          {
            des_latitude: 30.005351,
            des_longitude: 120.004608,
            distance_to_target: 710.4,
            if_move: true,
            in_circle: true,
            latitude: 30.004756,
            longitude: 119.9971,
            radius: 944.0,
          },
          {
            des_latitude: 30.005351,
            des_longitude: 120.004266,
            distance_to_target: 710.4,
            if_move: true,
            in_circle: true,
            latitude: 30.004756,
            longitude: 119.9971,
            radius: 944.0,
          },
          {
            des_latitude: 0.0,
            des_longitude: 0.0,
            distance_to_target: 1077.5,
            if_move: false,
            in_circle: false,
            latitude: 30.004142,
            longitude: 120.014142,
            radius: 944.0,
          },
          {
            des_latitude: 0.0,
            des_longitude: 0.0,
            distance_to_target: 1214.2,
            if_move: false,
            in_circle: false,
            latitude: 30.005348,
            longitude: 120.015348,
            radius: 944.0,
          },
          {
            des_latitude: 30.005486,
            des_longitude: 120.004437,
            distance_to_target: 710.4,
            if_move: true,
            in_circle: true,
            latitude: 30.004756,
            longitude: 119.9971,
            radius: 944.0,
          },
          {
            des_latitude: 0.0,
            des_longitude: 0.0,
            distance_to_target: 1033.7,
            if_move: false,
            in_circle: false,
            latitude: 30.00668,
            longitude: 120.016509,
            radius: 944.0,
          },
          {
            des_latitude: 0.0,
            des_longitude: 0.0,
            distance_to_target: 939.9,
            if_move: false,
            in_circle: true,
            latitude: 30.00662,
            longitude: 119.996511,
            radius: 944.0,
          },
          {
            des_latitude: 30.005216,
            des_longitude: 120.004437,
            distance_to_target: 95.8,
            if_move: true,
            in_circle: true,
            latitude: 30.004756,
            longitude: 120.003719,
            radius: 944.0,
          },
          {
            des_latitude: 0.0,
            des_longitude: 0.0,
            distance_to_target: 1207.7,
            if_move: false,
            in_circle: false,
            latitude: 30.005292,
            longitude: 120.015292,
            radius: 944.0,
          },
        ],
        [
          {
            des_latitude: 0.0,
            des_longitude: 0.0,
            distance_to_target: 0.0,
            if_move: false,
            in_circle: true,
            latitude: 30.002821,
            longitude: 120.002737,
            radius: 944.0,
          },
          {
            des_latitude: 30.002821,
            des_longitude: 120.002908,
            distance_to_target: 595.8,
            if_move: true,
            in_circle: true,
            latitude: 30.00268,
            longitude: 119.996559,
            radius: 944.0,
          },
          {
            des_latitude: 30.002821,
            des_longitude: 120.002566,
            distance_to_target: 595.8,
            if_move: true,
            in_circle: true,
            latitude: 30.00268,
            longitude: 119.996559,
            radius: 944.0,
          },
          {
            des_latitude: 0.0,
            des_longitude: 0.0,
            distance_to_target: 1077.5,
            if_move: false,
            in_circle: false,
            latitude: 30.004142,
            longitude: 120.014142,
            radius: 944.0,
          },
          {
            des_latitude: 0.0,
            des_longitude: 0.0,
            distance_to_target: 1214.2,
            if_move: false,
            in_circle: false,
            latitude: 30.005348,
            longitude: 120.015348,
            radius: 944.0,
          },
          {
            des_latitude: 30.002956,
            des_longitude: 120.002737,
            distance_to_target: 595.8,
            if_move: true,
            in_circle: true,
            latitude: 30.00268,
            longitude: 119.996559,
            radius: 944.0,
          },
          {
            des_latitude: 0.0,
            des_longitude: 0.0,
            distance_to_target: 1033.7,
            if_move: false,
            in_circle: false,
            latitude: 30.00668,
            longitude: 120.016509,
            radius: 944.0,
          },
          {
            des_latitude: 0.0,
            des_longitude: 0.0,
            distance_to_target: 939.9,
            if_move: false,
            in_circle: true,
            latitude: 30.00662,
            longitude: 119.996511,
            radius: 944.0,
          },
          {
            des_latitude: 30.002686,
            des_longitude: 120.002737,
            distance_to_target: 55.2,
            if_move: true,
            in_circle: true,
            latitude: 30.00268,
            longitude: 120.002188,
            radius: 944.0,
          },
          {
            des_latitude: 0.0,
            des_longitude: 0.0,
            distance_to_target: 1207.7,
            if_move: false,
            in_circle: false,
            latitude: 30.005292,
            longitude: 120.015292,
            radius: 944.0,
          },
        ],
        [
          {
            des_latitude: 0.0,
            des_longitude: 0.0,
            distance_to_target: 0.0,
            if_move: false,
            in_circle: true,
            latitude: 30.002821,
            longitude: 120.002737,
            radius: 944.0,
          },
          {
            des_latitude: 30.002821,
            des_longitude: 120.002908,
            distance_to_target: 595.8,
            if_move: true,
            in_circle: true,
            latitude: 30.00268,
            longitude: 119.996559,
            radius: 944.0,
          },
          {
            des_latitude: 30.002821,
            des_longitude: 120.002566,
            distance_to_target: 595.8,
            if_move: true,
            in_circle: true,
            latitude: 30.00268,
            longitude: 119.996559,
            radius: 944.0,
          },
          {
            des_latitude: 0.0,
            des_longitude: 0.0,
            distance_to_target: 1077.5,
            if_move: false,
            in_circle: false,
            latitude: 30.004142,
            longitude: 120.014142,
            radius: 944.0,
          },
          {
            des_latitude: 0.0,
            des_longitude: 0.0,
            distance_to_target: 1214.2,
            if_move: false,
            in_circle: false,
            latitude: 30.005348,
            longitude: 120.015348,
            radius: 944.0,
          },
          {
            des_latitude: 30.002956,
            des_longitude: 120.002737,
            distance_to_target: 595.8,
            if_move: true,
            in_circle: true,
            latitude: 30.00268,
            longitude: 119.996559,
            radius: 944.0,
          },
          {
            des_latitude: 0.0,
            des_longitude: 0.0,
            distance_to_target: 1033.7,
            if_move: false,
            in_circle: false,
            latitude: 30.00668,
            longitude: 120.016509,
            radius: 944.0,
          },
          {
            des_latitude: 0.0,
            des_longitude: 0.0,
            distance_to_target: 939.9,
            if_move: false,
            in_circle: true,
            latitude: 30.00662,
            longitude: 119.996511,
            radius: 944.0,
          },
          {
            des_latitude: 30.002686,
            des_longitude: 120.002737,
            distance_to_target: 55.2,
            if_move: true,
            in_circle: true,
            latitude: 30.00268,
            longitude: 120.002188,
            radius: 944.0,
          },
          {
            des_latitude: 0.0,
            des_longitude: 0.0,
            distance_to_target: 1207.7,
            if_move: false,
            in_circle: false,
            latitude: 30.005292,
            longitude: 120.015292,
            radius: 944.0,
          },
        ],
      ];
      var data = [];
      data = dataSet[dataCnt];
      var cnt = 0;
      this.radius = 0;
      this.target_position = { lng: 0, lat: 0 };
      this.target_id = -1;
      this.points = [];
      data.forEach((element) => {
        cnt++;
        if (cnt === 1) {
          this.radius = element.radius;

          this.target_position.lng = element.longitude;
          this.target_position.lat = element.latitude;
          this.target_id = element.id;
        }
        if (cnt > 1) {
          var item = {};
          item.target = this.target_id;
          item.id = element.id;
          item.position = { lng: element.longitude, lat: element.latitude };
          item.distance_to_target = element.distance_to_target;
          this.points.push(item);
        }
      });

      // var url = "http://192.168.43.254:6382/device/carCoordinate/allCarData";
      // sendGetRequest(url).then((res) => {
      //   console.log(res.data);
      //   this.radius = res.data[0].radius;

      //   this.target_position.lng = res.data[0].longitude;
      //   this.target_position.lat = res.data[0].latitude;
      //   this.target_id = res.data[0].id;

      //   var cnt = 0;
      //   res.data.forEach((element) => {
      //     cnt++;
      //     if (cnt > 1) {
      //       var item = {};
      //       item.target = this.target_id;
      //       item.id = element.id;
      //       item.position = { lng: element.longitude, lat: element.latitude };
      //       item.distance_to_target = element.distance_to_target;
      //       this.points.push(item);
      //     }
      //   });
      // });
    },
    init() {
      if (typeof WebSocket === "undefined") {
        this.msgError("您的浏览器不支持websocket。");
      } else {
        console.log("您的浏览器支持websocket。");
        var url = "ws://192.168.43.254:6382/imserver/client1";
        this.socoket = new WebSocket(url);
        this.socoket.onopen = this.onopen;
        this.socoket.onerror = this.onerror;
        this.socoket.onmessage = this.onmessage;
        this.socoket.onclose = this.onclose;
      }
    },
    onopen() {
      console.log("socket连接成功。");
    },
    onerror() {
      this.msgError("socket连接错误。");
    },
    onmessage(msg) {
      var _this = this;
      // console.log(msg.data);
      if (this.isJSON(msg.data)) {
        var data = JSON.parse(msg.data);
        console.log(data);

        var cnt = 0;
        this.radius = 0;
        this.target_position = { lng: 0, lat: 0 };
        this.target_id = -1;
        this.points = [];
        data.forEach((element) => {
          cnt++;
          if (cnt === 1) {
            this.radius = element.radius;

            this.target_position.lng = element.longitude;
            this.target_position.lat = element.latitude;
            this.target_id = element.id;
          }
          if (cnt > 1) {
            var item = {};
            item.target = this.target_id;
            item.id = element.id;
            item.position = { lng: element.longitude, lat: element.latitude };
            item.distance_to_target = element.distance_to_target;
            this.points.push(item);
          }
        });
        console.log("加载设备点成功。");
      } else {
        this.msgSuccess("当前没有设备在线。");
      }
    },
    onclose() {
      this.msgError("socket连接已关闭。");
    },
    isJSON(str) {
      if (typeof str === "string") {
        try {
          var obj = JSON.parse(str);
          if (typeof obj === "object" && obj) {
            return true;
          } else {
            return false;
          }
        } catch (e) {
          return false;
        }
      }
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
.BMap_Marker :hover {
  z-index: 9999;
}
</style>





