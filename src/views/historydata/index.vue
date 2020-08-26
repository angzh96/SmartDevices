<template>
  <div class="hisdata-container">
    <el-row style="line-height:50px">
      <el-col :span="24">
        <div class="grid-content bg-purple-light">
          <el-col :span="3" style="text-align:center">按时间查询：</el-col>
          <el-col :span="7">
            <el-date-picker
              v-model="value1"
              type="date"
              placeholder="选择日期"
              size="small"
            />
          </el-col>
          <el-col :span="3" style="text-align:center">按编号查询：</el-col>
          <el-col :span="7">
            <el-select v-model="value" placeholder="请选择" size="small">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-col>
          <el-col :span="4">
            <el-button size="small">查询</el-button>
          </el-col>
        </div>
      </el-col>
    </el-row>
    <el-card class="box-card" style="height:84vh">
      <el-row :gutter="20">
        <el-col :span="14" style="height:78vh">
          <baidu-map :center="center" :zoom="zoom" style="width: 100%; height:75vh;" :scroll-wheel-zoom="true" @ready="handler">
            <bm-driving start="杭州电子科技大学" end="西湖" :panel="false" :auto-viewport="true" @searchcomplete="handleSearchComplete" />
            <bml-lushu
              :path="path"
              :icon="icon"
              :play="play"
              :rotation="true"
              @stop="reset"
            />
          </baidu-map>
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
import { BmlLushu } from 'vue-baidu-map'
export default {
  name: 'HistoryData',
  components: {
    BmlLushu
  },
  data() {
    return {
      center: { lng: 120.14561, lat: 30.293904 },
      zoom: 3,
      play: true,
      path: [],
      icon: {
        url: 'http://api.map.baidu.com/library/LuShu/1.2/examples/car.png',
        size: { width: 52, height: 26 },
        opts: { anchor: { width: 27, height: 13 }}
      },
      picture: require('@/icons/svg/picture.png'),
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      options: [{
        value: '选项1',
        label: 'fj-001'
      }, {
        value: '选项2',
        label: 'fj-002'
      }, {
        value: '选项3',
        label: 'fj-003'
      }],
      value: '',
      value1: ''
    }
  },
  methods: {
    handler({ BMap, map }) {
      console.log(BMap, map)
      this.center.lng = 120.14561
      this.center.lat = 30.293904
      this.zoom = 20
    },

    //   var point = new BMap.Point(109.49926175379778, 36.60449676862417)
    //   map.centerAndZoom(point, 13)
    //   var marker = new BMap.Marker(point) // 创建标注
    //   map.addOverlay(marker) // 将标注添加到地图中
    //   var circle = new BMap.Circle(point, 6, { strokeColor: 'Red', strokeWeight: 6, strokeOpacity: 1, Color: 'Red', fillColor: '#f03' })
    //   map.addOverlay(circle)
    // },
    // getClickInfo(e) {
    //   console.log(e.point.lng)
    //   console.log(e.point.lat)
    //   this.center.lng = e.point.lng
    //   this.center.lat = e.point.lat
    // }

    reset() {
      this.play = false
    },
    handleSearchComplete(res) {
      this.path = res.getPlan(0).getRoute(0).getPath()
    }
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

