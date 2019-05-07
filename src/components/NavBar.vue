<template>
  <Menu mode="horizontal" theme="dark" active-name="1">
    <Modal v-model="modal1" title="修改密码" @on-ok="ok">
      <div slot="header" style="font-size: 20px">
        <Icon type="ios-lock" size="20"/>
        <span style="font-weight: bold">修改密码 </span>
      </div>
      <Form>
        <FormItem label="旧密码： ">
          <Input v-model="oldPassWd" type="password"/>
        </FormItem>
        <FormItem label="新密码： ">
          <Input v-model="newPassWd" type="password"/>
        </FormItem>
        <FormItem label="确认密码： ">
          <Input v-model="rePassWd" type="password"/>
        </FormItem>
      </Form>
    </Modal>
    <h4 class="layout-logo">轻课</h4>
    <div class="layout-nav">
      <MenuItem :name="item.value" v-for="(item,index) in menu" :key="index" @click.native="handleJump(item.url)">
        <Icon :type="item.icon" size="25"/>
        {{item.name}}
      </MenuItem>
      <Submenu name="5">
        <template slot="title">
          <img type="md-contact" size="30" :src="teacherInfo.avatar" class="avatar_logo"/>
        </template>
        <MenuItem name="5-1" to="/userSettings">
          用户信息
        </MenuItem>
        <MenuItem name="5-2" @click.native="modal1 = true">
          修改密码
        </MenuItem>
        <MenuItem name="5-3" @click.native="handleLogout">
          退出登录
        </MenuItem>
        <MenuItem name="5-4" to="/about">
          关于我们
        </MenuItem>
      </Submenu>
    </div>
  </Menu>
</template>

<script>
  import {MenuItem, Menu, Icon, Submenu, MenuGroup, Badge, Modal, Input} from 'iview'
  import {mapGetters} from 'vuex';
  import config from '../config';

  export default {
    name: "NavBar",
    data() {
      return {
        activeName: '1',
        modal1: false,
        unread: 2,
        oldPassWd: '',
        newPassWd: '',
        rePassWd: '',

      }
    },
    methods: {
      handleJump(url) {
        this.$router.push(url);
      },
      handleLogout() {
        localStorage.removeItem("userInfo");
        this.$store.dispatch('saveInfo', {});
        this.$router.replace('/login');
      },
      ok() {
        //修改密码
        this.$http.post('changePasswd ', {
          params: {
            oldPassWd: this.oldPassWd,
            newPassWd: this.newPassWd,
            rePassWd: this.rePassWd
          }
        }).then(res => {

        });
      },
    },
    computed: {
      ...mapGetters(['currentPath', 'teacherInfo']),
      menu() {
        return config.menu;
      }
    },
  }
</script>

<style scoped lang="less">
  .layout-logo {
    width: 100px;
    height: 50px;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 20px;
    left: 20px;
    color: white;
  }

  .avatar_logo {
    height: 40px;
    width: 40px;
    border-radius: 50%;
  }
</style>
