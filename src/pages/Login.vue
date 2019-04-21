<template>
  <div class="main">
    <div class="bg bg-blur"></div>
    <div class="main-page">
      <div class="title">
        <h1 style="font-size: 30px;color: #51d3b2;display: inline-block">用户登录&nbsp;</h1>
        <span style="font-size: 15px;color:#dbdbdb;">Login User</span></div>
      <div class="welcomeText">
        <span class="line"></span>
        <span class="txt" style="font-size: 10px">欢迎来到轻课</span>
        <span class="line"></span>
      </div>
      <Input class='input_message' v-model="username" prefix="ios-contact-outline" placeholder="用户名" style="width: auto" clearable/>
      <Input class='input_message' v-model="password" prefix="ios-lock-outline" placeholder="密码" style="width: auto" clearable
             type="password"/>
      <Button type="success" long class="login_btn" @click="handleLogin">登录</Button>
      <div class="altOption">
        <div class="remenberPassword altDiv">
          <Checkbox v-model="rememberPasswd">记住密码</Checkbox>
        </div>
        <div class="forgetPassword altDiv">
          <Icon type="ios-help-circle" size="18"/>
          忘记密码
        </div>
      </div>
      <router-link to="/register">没有账号？点击注册</router-link>

    </div>
  </div>
</template>

<script>
  import {Checkbox, Icon, Input, Button } from 'iview';
  export default {
    name: "Login",
    components: {Checkbox, Icon, Input, Button},
    data() {
      return {
        rememberPasswd: false,
        username:'',
        password:''
      }
    },
    methods:{
      handleLogin(){
        this.$http.get('http://qk.heniankj.com/public/index.php/home/teacher/login', {params:{'username':this.username,'password':this.password}})
            .then(res=>{
              if (res.data.code === 0) { //err
                this.$Message.error(res.data.msg);
                this.username = '';
                this.password = '';
              }else {
                this.$router.push('/main')
              }
            }).catch(e=>console.error(e))
      }
    }
  }
</script>

<style scoped>
  .main {
    height: 100%;
    width: 100%;
  }

  .bg {
    /*background: url("../assets/bg.jpg");*/
    background-image: linear-gradient(0deg, #8755ff 0%, #30AFED 51%, #03DDE4 100%);
    height: 100%;
    width: 100%;
    text-align: center;
  }

  .bg-blur {
    float: left;
    width: 100%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    -webkit-filter: blur(5px);
    -moz-filter: blur(5px);
    -o-filter: blur(5px);
    -ms-filter: blur(5px);
    filter: blur(5px);
  }

  .main-page .title {
    margin: 0 auto;
    text-align: center;
  }

  .main-page {
    width: 400px;
    height: 270px;
    background-color: white;
    padding: 15px 25px 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -225px;
    margin-top: -180px;
    border-radius: 20px;
  }

  .main {
    position: relative;
  }

  .welcomeText {
    height: 20px;
    line-height: 20px;
    text-align: center;
  }

  .welcomeText .line {
    display: inline-block;
    width: 115px;
    border-top: 1px solid #ccc;
  }

  .welcomeText .txt {
    color: #686868;
    vertical-align: middle;
  }

  .login_btn {
    background-color: #51d3b2;
    border: none;
    width: 300px;
    display: block !important;
    margin: 0 auto;
  }

  .input_message {

    display: block;
    width: 300px !important;

    margin: 10px auto;
  }

  .altDiv {
    display: inline-block;
  }

  .forgetPassword a {
    line-height: 25px;
  }

  .forgetPassword {
    float: right;
  }

  .altOption {
    width: 300px;
    margin: 5px auto;
  }

  .main-page a {
    float: right;
    position: absolute;
    bottom: 5px;
    right: 5px;
  }
</style>
