<template>
  <div class="app-container">
    <p style="font-weight:bold;text-align:center">项目规划(BUG列表）</p>
    <div class="block">
      <el-timeline>
        <el-timeline-item placement="top">
          <el-card>
            <h4>1、完成首页和设备管理小车部分真实数据展现及小车简单操控。</h4>
            <!-- <p>王小虎 提交于 2018/4/12 20:46</p> -->
          </el-card>
        </el-timeline-item>
        <el-timeline-item placement="top">
          <el-card>
            <h4>2、完成首页中实时数据传送时图片实时;完成车辆标志图片的替换并能体现方向。</h4>
            <!-- <p>王小虎 提交于 2018/4/2 20:46</p> -->
          </el-card>
        </el-timeline-item>
        <el-timeline-item placement="top">
          <el-card>
            <h4>3、完成历史数据中历史路径的展示及视频的播放。</h4>
            <!-- <p>王小虎 提交于 2018/4/2 20:46</p> -->
          </el-card>
        </el-timeline-item>
        <el-timeline-item placement="top">
          <el-card>
            <h4>4、进行无人机信息的跟进及展示。</h4>
            <!-- <p>王小虎 提交于 2018/4/2 20:46</p> -->
          </el-card>
        </el-timeline-item>
        <el-timeline-item placement="top">
          <el-card style="background:#FFE6D9">
            <h4>注、调节BUG：socket的http地址跨域问题；百度地图LOGO去除问题；所有ajax接口封装问题；所有mock.js清除问题。</h4>
            <!-- <p>王小虎 提交于 2018/4/3 20:46</p> -->
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

