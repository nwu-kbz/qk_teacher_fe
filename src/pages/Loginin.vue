<template>
  <div class="user-login">
    <div class="user-login-bg"></div>
    <div class="content-wrapper">
      <h2 class="slogan">
        欢迎使用 <br/> 轻课教学管理系统
      </h2>
      <div class="form-container">
        <h4 class="form-title">登录</h4>
        <el-form ref="form" label-width="0">
          <div class="form-items">
            <el-row class="form-item">
              <el-col>
                <el-form-item :rules="[ { required: true, message: '会员名/邮箱/手机号不能为空'}]">
                  <div class="form-line">
                    <i class="el-icon-edit-outline input-icon"></i>
                    <!--<el-input placeholder="会员名/邮箱/手机号" v-model="user.username"></el-input>-->
                    <input type="text" class="under_line_input" autocomplete="off" v-model="username">
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="form-item">
              <el-col>
                <el-form-item prop="password" :rules="[ { required: true, message: '密码不能为空'}]">
                  <div class="form-line">
                    <i class="el-icon-service input-icon"></i>
                    <!--<el-input type="password" placeholder="密码" v-model="user.password"></el-input>-->
                    <input type="password" class="under_line_input" autocomplete="off" v-model="password">
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class=form-item>
              <el-col>
                <el-form-item>
                  <el-checkbox class="checkbox" v-model="isChecked">记住账号</el-checkbox>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="form-item">
              <el-button type="primary" class="submit-btn" size="small" @click="handleLogin">
                登 录
              </el-button>
            </el-row>
          </div>
          <el-row class="tips">
            <router-link to="/register">立即注册</router-link>
            <span class="line">|</span>
            <a href="/" class="link">
              忘记密码
            </a>
          </el-row>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import BasicContainer from '@vue-materials/basic-container';
  import {mapActions} from 'vuex';

  export default {
    name: "Loginin",
    components: {BasicContainer},
    data() {
      return {
        isChecked: true,
        username: '',
        password: '',
      }
    },
    methods: {
      ...mapActions(['schoolInfo', 'departmentInfo', 'positionInfo']),
      handleLogin() {
        // var params = new URLSearchParams();
        // params.append('username', this.username);
        // params.append('password', this.password);
        this.$http.get('teacher/login', {params: {'username': this.username, 'password': this.password}})
            .then(res => {
              console.log(res);
              if (res.data.code === 0) { //err
                this.$Message.error(res.data.msg);
                this.username = '';
                this.password = '';
              } else {
                  if(this.isChecked ===false){
                    this.clearCookie();
                  }else{
                    //调用配置cookie方法,传入账号名，密码，和保存天数3个参数
                    this.setCookie(this.username, this.password, 7, true);
                  }
                  //获取教师的个人信息添加到vuex中
                  this.$store.dispatch('saveInfo', res.data.data);
                  // console.log("username: " + res.data.data.user.username);
                  //成功登录
                  this.$router.push('/main');
                }

            }).catch(e => console.error(e))
      },
      //设置cookie
      setCookie(u_name, u_pwd, exdays, isChecked) {
        let exdate = new Date(); //获取时间
        exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
        //字符串拼接cookie
        window.document.cookie = "\"userName\"" + "=\"" + u_name + "\";path=/;expires=" + exdate.toUTCString();
        window.document.cookie = "\"userPwd\"" + "=\"" + u_pwd + "\";path=/;expires=" + exdate.toUTCString();
        window.document.cookie = "\"rememberFlag\"" + "=" + isChecked + ";path=/;expires=" + exdate.toUTCString();
      },

      //读取cookie
      getCookie: function () {
        //把cookie中的字符串转为对象
        let ck = JSON.parse("{" + window.document.cookie.trim().replace(/=/g,':').replace(/;/g,',') + "}");
        if (ck != null) {
          this.username = ck.userName;
          this.password = ck.userPwd;
        }
      },
      //清除cookie
      clearCookie: function() {
        this.setCookie("", "", -1, false); //修改2值都为空，天数为负1天就好了
      }
    },
    mounted() {
      //页面加载调用cookie值
      this.getCookie();
      this.$http.get('teacher/getInfo')
          .then(res => {
            if (res.data.code === 0) { //err
              this.$Message.error(res.data.msg);
            } else {
              this.schoolInfo(res.data.data.school)
              this.departmentInfo(res.data.data.department)
              this.positionInfo(res.data.data.position)
            }
          }).catch(e => console.error(e))
    }
  }


</script>

<style lang="scss" scoped>
  @import '../../static/css/UserLogin';
</style>
