<template>
  <el-card class="box-card" shadow="never">
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
      <el-tab-pane label="账号管理" name="first">账号管理</el-tab-pane>
      <el-tab-pane label="基本资料" name="second">
        <el-row :gutter="20">
          <el-col :span="6" style="padding-left: 40px;color:#606266;font-weight:600">
            <p>用户名</p>
            <p>注册时间</p>
            <p>拥有设备数</p>
          </el-col>
          <el-col :span="4" style="text-align:center;color:#606266">
            <p>  John  </p>
            <p>2020/6/1</p>
            <p>  4 台  </p>
          </el-col>
          <el-col :span="8" :offset="6">
            <el-row style="height:160px;padding:20px">
              <el-avatar shape="square" :size="100" :src="squareUrl" />
            </el-row>
            <el-row style="height:160px;padding:50px 30px;">
              <el-button size="small">修改资料</el-button>
            </el-row>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="安全设置" name="third">安全设置</el-tab-pane>
      <el-tab-pane label="关于我们" name="fourth">关于我们</el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  name: 'Userdata',
  data() {
    return {
      activeName: 'second',
      squareUrl: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'
    }
  }
}
</script>

<style lang="scss">
  // .main {
  //   height: 355px;
  //   width: 600px;
  //   margin: 50px 150px;
  //   font-size:13px;
  //   line-height: 50px;
  // }

  .el-tabs--border-card {
    height: 415px;
    .el-tabs__content {
      height: 416px;
      padding: 30px;
    }
  }
  .footer {
    height: 20px;
    padding: 0 29%;
  }
  .el-tab-pane {
    min-height: 386px;
    font-family: "微软雅黑";
    font-size:14px;
    line-height: 70px;
  }
  .box-card {
    padding: 20px;
    height: 528px;
    float:center;
    .el-card__body {
      height: 100%;
    }
    .el-col {
      height:307px;
    }
  }
</style>
