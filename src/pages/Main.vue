<template>
  <div class="main-page">
    <NavBar ref="navBar" menus=""></NavBar>
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
    <div id="courseTable"></div>
  </div>
</template>

<script>
  import {MenuItem, Menu, Icon, Submenu, MenuGroup, Avatar} from 'iview'
  import Timetables from 'timetables';
  import NavBar from "../components/NavBar";

  export default {
    name: "main",
    components: {
      NavBar,
      MenuItem, Menu, Icon, Submenu, MenuGroup, Avatar
    },
    methods:{
      // gridOnClick: function (e) {
      gridOnClick:function(){
        this.$router.push('/courseInfo')
      }
    },
    mounted() {
      // 在可以获取到真实dom节点到周期里进行实例化
      var courseList = [
        ['大学英语(Ⅳ)@10203', '大学英语(Ⅳ)@10203', '', '', '', '', '毛概@14208', '毛概@14208', '', '', '', '选修'],
        ['', '', '信号与系统@11302', '信号与系统@11302', '模拟电子技术基础@16204', '模拟电子技术基础@16204', '', '', '', '', '', ''],
        ['大学体育(Ⅳ)', '大学体育(Ⅳ)', '形势与政策(Ⅳ)@15208', '形势与政策(Ⅳ)@15208', '', '', '电路、信号与系统实验', '电路、信号与系统实验', '', '', '', ''],
        ['', '', '', '', '电装实习@11301', '电装实习@11301', '', '', '', '大学体育', '大学体育', ''],
        ['', '', '数据结构与算法分析', '数据结构与算法分析', '', '', '', '', '信号与系统', '信号与系统', '', ''],
      ];
      var week = window.innerWidth > 360 ? ['周一', '周二', '周三', '周四', '周五'] :
          ['一', '二', '三', '四', '五'];
      var day = new Date().getDay();
      var courseType = [
        [{index: '1', name: '8:00'}, 1],
        [{index: '2', name: '9:00'}, 1],
        [{index: '3', name: '10:00'}, 1],
        [{index: '4', name: '11:00'}, 1],
        [{index: '5', name: '12:00'}, 1],
        [{index: '6', name: '14:00'}, 1],
        [{index: '7', name: '15:00'}, 1],
        [{index: '8', name: '16:00'}, 1],
        [{index: '9', name: '17:00'}, 1],
        [{index: '10', name: '18:00'}, 1],
        [{index: '11', name: '19:00'}, 1],
        [{index: '12', name: '20:00'}, 1]
      ];
      let Timetable = new Timetables({
        el: '#courseTable',
        timetables: courseList,
        week: week,
        timetableType: courseType,
        highlightWeek: day,
        styles: {
          Gheight: 50,
          // leftHandWidth: 50,
          // palette: ['#ff6633', '#eeeeee']
        },
        gridOnClick: () => {
          this.$router.push('/courseInfo');
        },
      });
    }
  }
</script>

<style lang="less" scoped>

  #courseTable {
    width: 70%;
    margin: 10px auto;
    height: 650px;
    text-align: center;
  }


  .user_page {
    position: relative;
    width: 100%;
    height: 280px;
    background-image: linear-gradient(0deg, #8755ff 0%, #30AFED 51%, #03DDE4 100%);
    .ivu-avatar-large {
      line-height: 65px;
    }
    .user_photo {
      width: 200px;
      position: absolute;
      left: 50%;
      top: 30%;
      margin-left: -100px;
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
    width: 600px;
    left: 50%;
    margin-left: -300px;
    .user_info {
      margin: 0 5px;
      color: white;
    }
  }
</style>