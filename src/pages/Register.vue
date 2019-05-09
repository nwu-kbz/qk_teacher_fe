<template>
  <div class="main">
    <div class="bg bg-blur"></div>
    <div class="main-page">
      <div class="title">
        <h1 style="font-size: 30px;color: rgba(0,0,255,0.84);display: inline-block">注册&nbsp;</h1>
        <span style="font-size: 15px;color:#dbdbdb;">Register User</span></div>
      <div class="welcomeText">
        <span class="line"></span>
        <span class="txt" style="font-size: 10px">欢迎来到轻课</span>
        <span class="line"></span>
      </div>
      <Input class='input_message' v-model="username" prefix="ios-contact-outline" placeholder="用户名" style="width: auto" clearable/>
      <Input class='input_message' v-model="email" prefix="ios-mail-outline" placeholder="邮箱" style="width: auto" clearable/>
      <Input class='input_message' v-model="telephone" prefix="ios-call-outline" placeholder="电话" style="width: auto" clearable/>
      <Select class='input_message select_message' v-model="sex" prefix="ios-male" placeholder="性别" style="width:300px">
        <Option v-for="item in sexs" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <Select class='input_message select_message' v-model="school" prefix="ios-school-outline" placeholder="学校" style="width:300px" >
        <Option v-for="(item, index) in schoolArr" :value="item.id" :key="item.id">{{ item.name }}</Option>
      </Select>
      <Select class='input_message select_message' v-model="department" prefix="ios-people-outline" placeholder="部门" style="width:300px" >
        <Option v-for="(item, index) in departmentArr" :value="item.id" :key="item.id">{{ item.name }}</Option>
      </Select>
      <Select class='input_message select_message' v-model="position" prefix="ios-ribbon-outline" placeholder="职位" style="width:300px" >
        <Option v-for="(item, index) in positionArr" :value="item.id" :key="item.id">{{ item.name }}</Option>
      </Select>
      <Input class='input_message' v-model="password" prefix="ios-lock-outline" placeholder="密码" style="width: auto" clearable type="password"/>
      <Input class='input_message' v-model="repassword" prefix="ios-lock-outline" placeholder="重复密码" style="width: auto" clearable type="password" id="repassword"/>
      <Button type="success" long class="login_btn" @click="handleRegister">注册</Button>
      <div class="altOption">
      </div>
      <router-link to="/main">已有账号？返回登录</router-link>
    </div>
  </div>
</template>

<script>
  import {Icon, Input, Button} from 'iview';
  import {mapGetters,mapActions} from 'vuex';

  export default {
    name: "Login",
    components: {Icon, Input, Button},
    computed:{
        ...mapGetters(['schoolArr','departmentArr','positionArr'])
    },
    data() {
      return {
        username: '',
        email: '',
        school: '',
        department: '',
        position: '',
        password: '',
        repassword: '',
        rememberPasswd: false,
        sexs: [
          {
            value: '男',
            label: '男'
          },
          {
            value: '女',
            label: '女'
          }]
      }
    },
    methods: {
      clearForm(){
        this.username = '';
        this.email = '';
        this.school = '';
        this.department = '';
        this.position = '';
        this.password = '';
        this.repassword = '';
      },
      handleRegister() {//给数据库中添加数据
        this.$http.get('teacher/register',
            {
              params: {
                'username': this.username,
                'password': this.password,
                'repassword':this.repassword,
                'email': this.email,
                'school': this.school,
                'department': this.department,
                'position': this.position
              }
            })
            .then(res => {   //error
              if (res.data.code === 0) {
                this.$Message.error(res.data.msg);
                this.clearForm();
              } else {
                this.$router.push('/login')
              }
            })

      },

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
    /*background-image: linear-gradient(0deg, #8755ff 0%, #30AFED 51%, #03DDE4 100%);*/
    background-image: url("../../static/img/bcg.png");
    filter: blur(5px);
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
    height: 520px;
    background-color: white;
    padding: 15px 25px 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -225px;
    margin-top: -280px;
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
    background-color: rgba(0, 0, 255, 0.85);
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
