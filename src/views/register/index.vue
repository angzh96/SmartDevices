<template>
  <div class="register-container">
    <el-form ref="registerForm" :model="registerForm" class="register-form" auto-complete="on" label-position="left" label-width="80px">
      <div class="title-container">
        <h3 class="title">UVA/CAR 管理系统</h3>
      </div>
      <!-- main-container -->
      <el-card shadow="always">
        <span style="margin-top: 0px;padding: 30px;">欢迎注册，请设置您的用户名、密码。</span>
        <el-form-item label="用户名" style="margin-top: 30px">
          <el-input v-model="registerForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="registerForm.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input v-model="registerForm.repassword" show-password @blur="repswCheck"></el-input>
        </el-form-item>
        <el-form-item label="邀请码">
          <el-input v-model="registerForm.invitecode"></el-input>
        </el-form-item>
        <div style="text-align: center">
          <el-button :loading="loading" type="primary" style="width:30%;" @click="regis">注册</el-button>
        </div>
        <!-- tip -->
        <div class="tip">
          <span style="font-size: 14px;height: 16px">已有账号?</span>
          <el-link href="https://element.eleme.io" target="_blank">快捷登录>></el-link>
        </div>
      </el-card>
    </el-form>
  </div>
</template>

<script>
import { register } from '@/api/register'

export default {
  name: 'Register',
  data() {
    return {
      registerForm: {
        username: '',
        password: '',
        repassword: '',
        invitecode: ''
      },
      loading: false
    }
  },
  methods: {
    repswCheck() {
      console.log(this.registerForm.password)
      console.log(this.registerForm.repassword)
      if (this.registerForm.password !== this.registerForm.repassword) {
        console.log(111)
      }
    },
    regis() {
      var data = {}
      data.username = this.registerForm.username
      data.password = this.registerForm.password
      data.invitecode = this.registerForm.invitecode
      console.log(data)
      register(data).then(response => {
        console.log(response)
        if (response.code === 20000) {
          this.$message({
            message: '注册成功!',
            type: 'success'
          })
        } else {
          this.$message.error('注册失败!')
        }
      })
    }
  }
}
</script>

<style lang="scss">
  $bg:#283443;
  $light_gray:#fff;
  $cursor: #fff;
</style>

<style lang="scss" scoped>
  $bg:#2d3a4b;
  $dark_gray:#889aa4;
  $light_gray:#eee;

  .register-container {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;

    .register-form {
      position: relative;
      width: 520px;
      max-width: 100%;
      padding: 85px 35px 0;
      margin: 0 auto;

      .el-card {
        width: 450px;
        margin: 0px !important;
        border-radius: 70px !important;
        padding: 30px;

        .el-input {
          width: 250px;
        }
      }
    }

    .title-container {
      position: relative;

      .title {
        font-size: 26px;
        color: $light_gray;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }
    }

    .tip {
      text-align: center;
      margin-top: 20px;
    }
  }
</style>
