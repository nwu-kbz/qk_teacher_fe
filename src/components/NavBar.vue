<template>
  <Menu ref="menu"  mode="horizontal" theme='light' :activeName ="activeName">
    <router-link to="/main">
      <MenuItem name="1">
        <Icon type="ios-home" size="20"/>
        首页
      </MenuItem>
    </router-link>
    <router-link to="/qbank">
    <MenuItem name="2">
      <Icon type="ios-paper" size="15"/>
      题库
    </MenuItem>
    </router-link>
    <router-link to="/inform">
      <MenuItem name="3">
        <Badge dot :offset="[7,0]">
          <Icon type="ios-notifications" size="20"/>
          通知  {{unread}}
        </Badge>
      </MenuItem>
    </router-link>
    <router-link to="/data">
      <MenuItem name="4">
        <Icon type="ios-stats" size="20"/>
        数据分析
      </MenuItem>
    </router-link>
    <Submenu name="5" class="user_item">
      <template slot="title">
        <Icon type="md-contact" size="30"/>
      </template>
      <MenuItem name="5-1">
        <router-link to="/userSettings">用户信息</router-link>
      </MenuItem>
      <MenuItem name="5-2">
        <router-link @click.native="modal1 = true" to="">修改密码</router-link>
        <Modal
                v-model="modal1"
                title="修改密码"
                @on-ok="ok"
                @on-cancel="cancel">
          <div slot="header" style="font-size: 20px">
            <Icon type="ios-lock" size="20"/>
            <span style="font-weight: bold">修改密码 </span>
          </div>
          <div class="modifyPassword">旧密码：
            <div class="enter_password">
              <Input v-model="oldPassWd" style="width: 300px" type="password"/>
            </div>
          </div>
          <div class="modifyPassword">新密码：
            <div class="enter_password">
              <Input v-model="newPassWd" style="width: 300px" type="password"/>
            </div>
          </div>
          <div class="modifyPassword ">确认密码：
            <div class="confirm_password">
              <Input v-model="rePassWd" style="width: 300px" type="password"/>
            </div>
          </div>
        </Modal>
      </MenuItem>
      <MenuItem name="5-3">退出登录</MenuItem>
      <MenuItem name="5-4">关于我们</MenuItem>
    </Submenu>
  </Menu>
</template>

<script>
  import {MenuItem, Menu, Icon, Submenu, MenuGroup, Badge, Modal, Input} from 'iview'

  export default {
    name: "NavBar",
    data() {
      return {
        activeName: '1',
        modal1: false,
        unread:2,
        oldPassWd:'',
        newPassWd:',' ,
        rePassWd:''
      }
    },
    methods: {
      ok() {
        //修改密码
        this.$http.post('teacher/changePasswd ',{
          params: {
            oldpassword :this.oldPassWd,
            newpassword:this.newPassWd,
          }
        }).then(res =>{
          if (res.data.code === 0) {
            this.$Message.error(res.data.msg);
            this.oldPassWd = '';
            this.newPassWd = '';
            this.rePassWd = '';
          }else{
            this.$Message.info('修改成功');
          }
        });

      },
      cancel() {
        this.$Message.info('取消修改');
      }
    },
    // mounted: function() {
    //   // this.open = ["5"];
    //   this.activeName = ['1'];
    //   // this.$nextTick(function() {
    //   //   this.$refs.menu.updateOpened();
    //   //   this.$refs.menu.updateActiveName();
    //   // })
    //   // this.handleSelect(this.active);
    // },
    // watch: {
    //   '$route' () {
    //     this.$refs.leftMenu.currentActiveName = ''
    //   }
    // }
  }
</script>

<style scoped lang="less">

  .ivu-menu-horizontal {
    height: 40px;
    line-height: 40px;
  }

  .user_item {

    float: right;
    line-height: 40px;
  }

  a {
    color: #343434;
  }

  .ivu-badge-dot {
    top: 4px;
    right: -18px;
  }

  .modifyPassword {
    height: 40px;
    width: 450px;
    margin: 5px auto;
    font-size: 18px;
    /*border-bottom: 1px solid rgba(158, 158, 158, 0.62);*/
    input {
      margin-left: 23px;
    }
    .enter_password {
      display: inline-block;
      margin-left: 23px;
    }
    .confirm_password {
      display: inline-block;
      margin-left: 5px;
    }
  }
</style>