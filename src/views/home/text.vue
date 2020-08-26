<template>
<baidu-map class="map" :center="{lng: 116.404, lat: 39.915}" :zoom="11" style="height:500px">
<bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
  <bm-driving
        :start="{lng: 116.404, lat: 39.915}"
        :end="{lng: 116.8, lat: 39.5}"
     
        :auto-viewport="true"
        :panel="false"
      ></bm-driving>
  <!-- <bm-driving start="天安门" end="百度大厦" @searchcomplete="handleSearchComplete" :panel="false" :autoViewport="true"></bm-driving> -->
  <!-- <bml-lushu
    @stop="reset"
    :path="path"
    :icon="icon"
    :play="play"
    :rotation="true">
  </bml-lushu> -->
</baidu-map>
</template>

<script>
import {BmlLushu} from 'vue-baidu-map'
export default {
  components: {
    BmlLushu
  },
  data () {
    return {
      play: true,
      path: [],
      icon: {
        url: 'http://api.map.baidu.com/library/LuShu/1.2/examples/car.png',
        size: {width: 52, height: 26},
        opts: {anchor: {width: 27, height:13}}
      }
    }
  },
  methods: {
    reset () {
      this.play = false
    },
    handleSearchComplete (res) {
      console.log(res)
    //   this.path = res.getPlan(0).getRoute(0).getPath()
      this.path = [{lng: 116.403984,lat:390.914034,of:"inner"},{lng: 116.30813,lat:40.05719,of:"inner"}]
      console.log(this.path)
    }
  }
}
</script>