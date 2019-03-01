<template>
  <div class="main-page">
    <Menu mode="horizontal" :theme="theme1" active-name="1">
      <MenuItem name="1">
        <Icon type="ios-paper"/>
        题库
      </MenuItem>
      <MenuItem name="2">
        <Icon type="ios-notifications" size="20"/>
        消息
      </MenuItem>
      <MenuItem name="3">
        <Icon type="ios-stats"/>
        数据分析
      </MenuItem>
      <Submenu name="3" class="user_item">
        <template slot="title">
          <Icon type="md-contact" size="30"/>
        </template>
        <MenuItem name="3-1">修改信息</MenuItem>
        <MenuItem name="3-2">个人设置</MenuItem>
        <MenuItem name="3-3">退出登录</MenuItem>
        <MenuItem name="3-4">关于我们</MenuItem>
      </Submenu>
    </Menu>
    <div class="user_page">
      <div class="user_photo">
        <Avatar icon="ios-person" size="large"/>
      </div>
      <div class="user_label">
        <label class="user_info">西北大学</label>
        <label class="user_info">佚名</label>
        <label class="user_info">教授</label>
        <label class="user_info">信息科学与技术学院</label>
        <label class="user_info">
          <a class="user_info" href="#">xfs0565840@163.com</a></label>
      </div>
    </div>

  </div>
</template>

<script>
  import {MenuItem, Menu, Icon, Submenu, MenuGroup, Avatar} from 'iview'

  export default {
    name: "main",
    components: {
      MenuItem, Menu, Icon, Submenu, MenuGroup, Avatar
    }
  }
</script>

<style lang="less" scoped>
  .ivu-menu-light.ivu-menu-horizontal .ivu-menu-submenu {
    line-height: 40px;
  }

  .user_item {

    float: right;
    line-height: 40px;
  }

  .user_page {
    position: relative;
    width: 100%;
    height: 280px;
    background-image: linear-gradient(0deg, #8755ff 0%, #30AFED 51%, #03DDE4 100%);
    .ivu-avatar-large{
      line-height: 65px;
    }
    .user_photo{
      width: 200px;
      position: absolute;
      left:50%;
      top:30%;
      margin-left: -100px;
    }
  }

  .ivu-menu-horizontal {
    height: 40px;
    .ivu-menu-item {
      line-height: 40px;
    }
  }

  .ivu-avatar {
    top: 0;
    left: 50%;
    margin-left: -35px;
    width: 70px;
    height: 70px;
    border-radius: 35px;
    font-size: 50px;
    .ivu-icon-ios-person {
      line-height: 70px !important;
    }
  }

  .user_label {
    text-align: center;
    position: absolute;
    height: 15px;
    bottom: 70px;
    width:600px;
    left: 50%;
    margin-left: -300px;
    .user_info {
      margin: 0 5px;
      color: white;
    }
  }
</style>