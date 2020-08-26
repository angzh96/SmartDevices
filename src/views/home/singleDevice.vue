<template>
  <div class="app-container">
    <!-- show-container -->
    <el-card shadow="never" class="show-container">
      <el-row :gutter="20">
        <el-col :span="14">
          <span>- 当前地图 -</span>
          <div class="test"></div>
        </el-col>
        <el-col :span="10">
          <span>- 摄像头显示 -</span>
          <div class="test"></div>
        </el-col>
      </el-row>
    </el-card>
    <!-- info-container -->
    <el-card shadow="never" class="info-container">
      <el-col :span="12" class="info">
        <el-col :span="12" class="left">
          <el-form :label-position="'left'" label-width="80px" :model="info">
            <el-form-item label="当前设备:">
              <span class="data">{{ info.model }}</span>
            </el-form-item>
            <el-form-item label="当前高度:">
              <span class="data">{{ info.height }}</span>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12" class="right">
          <el-form :label-position="'left'" label-width="80px" :model="info">
            <el-form-item label="当前经度:">
              <span class="data">{{ info.lnt }}</span>
            </el-form-item>
            <el-form-item label="当前纬度:">
              <span class="data">{{ info.lat }}</span>
            </el-form-item>
          </el-form>
        </el-col>
      </el-col>
      <el-col :span="12" class="cmd">
        <el-form :label-position="'left'" label-width="80px">
          <el-form-item label="发送命令:">
            <el-select v-model="value">
              <el-option
                v-for="op in options"
                :key="op.value"
                :label="op.label"
                :value="op.value"
              >
              </el-option>
            </el-select>
            <el-button type="primary" size="small" icon="el-icon-position" style="margin-left: 20px">发送</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-card>
    <!-- route-container -->
    <el-card shadow="never" class="route-container">
      <span style="display:table; margin:0 auto;">- 路径规划 -</span>
      <el-form>
        <el-col>
          <el-input placeholder="请选择起点" size="small"></el-input>
        </el-col>
        <el-col>
          <el-input placeholder="请选择终点" size="small"></el-input>
        </el-col>
      </el-form>
    </el-card>
    <!-- controler -->
    <div class="ctrl">
      <!-- up -->
      <el-row :gutter="24">
        <el-col :span="8" :offset="8">
          <el-button type="primary" icon="el-icon-caret-top" circle></el-button>
        </el-col>
      </el-row>
      <!-- center -->
      <el-row :gutter="24" style="margin-top: 6px;">
        <el-col :span="8">
          <el-button type="primary" icon="el-icon-caret-left" circle></el-button>
        </el-col>
        <el-col :span="8">
          <el-button type="primary" icon="el-icon-video-play" circle></el-button>
        </el-col>
        <el-col :span="8">
          <el-button type="primary" icon="el-icon-caret-right" circle></el-button>
        </el-col>
      </el-row>
      <!-- down -->
      <el-row :gutter="24" style="margin-top: 6px;">
        <el-col :span="8" :offset="8">
          <el-button type="primary" icon="el-icon-caret-bottom" circle></el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SingleDevice',
  data() {
    return {
      options: [{
        value: 0,
        label: '喷洒酒精'
      },
      {
        value: 1,
        label: '未知命令'
      }],
      value: 0,
      info: {
        model: 'undefined',
        height: 'undefined',
        lnt: 'undefined',
        lat: 'undefined'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .app-container {
    padding: 20px;
    min-width: 970px;
    .show-container {
      height: 50%;
      .el-col {
        text-align: center;
      }
      .test {
        height: 400px;
        margin: 20px;
        background-color: #c4c4c4;
      }
    }
    .info-container {
      margin-top: 20px;
      .info {
        margin-top: -10px;
        padding: 0 0px 10px 30px;
        min-width: 360px;
        .el-form-item {
          margin-bottom: 0 !important;
          .data {
            color: #b5bac2;
          }
        }
      }
      .cmd {
        padding: 0 150px 0 0;
        min-width: 425px;
        .el-form {
          float: right;
        }
      }
    }
    .route-container {
      margin-top: 20px;
      width: 50%;
      .el-input {
        width: 200px;
      }
    }
    .ctrl {
      z-index: 9999;
      position: fixed;
      right: 50px;
      bottom: 10px;
      width: 120px;
      height: 150px;
    }
  }
</style>
