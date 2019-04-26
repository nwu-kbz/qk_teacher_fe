<template>
  <div class="main-page">
    <NavBar ref="navBar" menus=""></NavBar>
    <div class="user_page">
      <div class="user_photo">
        <img class='ivu-avatar' :src="teacherInfo.avatar"/>
      </div>
      <div class="user_label">
        <label class="user_info">{{teacherInfo.username}}</label>
        <label class="user_info">{{teacherInfo.position}}</label>
        <label class="user_info">{{teacherInfo.school}}</label>
        <label class="user_info">{{teacherInfo.department}}</label>
        <label class="user_info">{{teacherInfo.email}}</label>
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
    computed: {
      teacherInfo() {
        return this.$store.getters.teacherInfo
      }
    },
    data() {
      return {
        courseList: []
      }
    },
    methods: {
      // gridOnClick: function (e) {
      gridOnClick: function () {
        this.$router.push('/courseInfo')
      },
      getCourse() {
        this.$http.get('teacher/getCourse', {params: {id: 13}})
          .then(res => {
            if (res.data.code === 0) {
              this.$Message.error('获取课程列表失败');
            } else {
              let courseTable = [[], [], [], [], []];
              for (let i = 0; i < courseTable.length; i++) {
                for (let j = 0; j < 12; j++) {
                  courseTable[i][j] = '';
                }
              }
              if (!res.data.data) this.$Message.error('课程列表暂时为空!');
              for (let course of res.data.data) {
                let arr = course.day.split(',').map(x => parseInt(x));
                for (let x of arr) {
                  if (course.name)
                    courseTable[course.week - 1][x-1] = `${course.name}@${course.id} -> ${course.place} [${course.type}]`;
                }
              }
              this.courseList = courseTable;
              this.initCourseTable();
            }
          })
      },
      initCourseTable() {
        // let courseList = [
        //   ['大学英语(Ⅳ)@10203', '大学英语(Ⅳ)@10203', '', '', '', '', '毛概@14208', '毛概@14208', '', '', '', '选修'],
        //   ['', '', '信号与系统@11302', '信号与系统@11302', '模拟电子技术基础@16204', '模拟电子技术基础@16204', '', '', '', '', '', ''],
        //   ['大学体育(Ⅳ)', '大学体育(Ⅳ)', '形势与政策(Ⅳ)@15208', '形势与政策(Ⅳ)@15208', '', '', '电路、信号与系统实验', '电路、信号与系统实验', '', '', '', ''],
        //   ['', '', '', '', '电装实习@11301', '电装实习@11301', '', '', '', '大学体育', '大学体育', ''],
        //   ['', '', '数据结构与算法分析', '数据结构与算法分析', '', '', '', '', '信号与系统', '信号与系统', '', ''],
        // ];
        let week = window.innerWidth > 360 ? ['周一', '周二', '周三', '周四', '周五'] : ['一', '二', '三', '四', '五'];
        let day = new Date().getDay();
        let courseType = [
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
          timetables: this.courseList,
          week: week,
          timetableType: courseType,
          highlightWeek: day,
          styles: {
            Gheight: 50,
            // leftHandWidth: 50,
            // palette: ['#ff6633', '#eeeeee']
          },
          gridOnClick: (e) => {
            let ret = e.name.match(/(.*)@(\d+) -> (.*) \[(.*)]/);
            this.$router.push(`courseInfo/${ret[2]}`);
          },
        });
      }
    },
    mounted() {
      this.getCourse();
    }
  }
</script>

<style lang="less" scoped>
  .main-page{
    font-size: 16px;
    font-weight: lighter;
  }
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
    width: 800px;
    left: 50%;
    margin-left: -400px;
    .user_info {
      margin: 0 5px;
      color: white;
    }
  }
</style>
