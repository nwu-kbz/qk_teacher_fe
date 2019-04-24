<template>
  <Menu mode="horizontal" :theme="theme1" active-name="1" class="main_menu">

    <!--<MenuItem name="2">-->
      <!--<Icon type="ios-calendar" size="20"/>-->
     <!--签到-->
    <!--</MenuItem>-->
    <!--<MenuItem name="8">-->
      <!--<Icon type="logo-youtube" size="17"/>-->
      <!--课件-->
    <!--</MenuItem>-->
    <!--<MenuItem name="3">-->
      <!--<Icon type="ios-create" size="22"/>-->
      <!--测评-->
    <!--</MenuItem>-->
    <!--<MenuItem name="4">-->
      <!--<Icon type="ios-stats" size="20"/>-->
      <!--数据分析-->
    <!--</MenuItem>-->
<div class="primary_msg">
    <MenuItem name="5" to="/main">
      <Icon type="ios-home" size="20" />
      首页
    </MenuItem>
    <!--<MenuItem name="6">-->
      <!--<Icon type="ios-notifications" size="20"/>-->
      <!--消息-->
    <!--</MenuItem>-->
</div>
    <Submenu name="3" class="user_item">
      <template slot="title">
        <Icon type="md-contact" size="30"/>
      </template>
      <MenuItem name="3-1">
        <router-link to="/userSettings">修改信息</router-link>
      </MenuItem>
      <MenuItem name="3-2">个人设置</MenuItem>
      <MenuItem name="3-3">退出登录</MenuItem>
      <MenuItem name="3-4">关于我们</MenuItem>
    </Submenu>
  </Menu>
</template>

<script>
  import {MenuItem, Menu, Icon, Submenu, MenuGroup} from 'iview'

  export default {
    name: "NavBar",
    data(){
      return{
        theme1:'light'
      }
    }
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
  .main_menu{
    position: relative;
    .primary_msg{
      height: 40px;
      position: absolute;
      right:97px;
    }
  }



</style>
