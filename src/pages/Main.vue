<template>
  <div class="main-page">
    <NavBar ref="navBar" menus=""></NavBar>
    <div class="user_page">
      <div class="user_photo">
        <img class='ivu-avatar' :src="teacherInfo.avatar"/>
      </div>
      <div class="user_label">
        <span><Icon type="md-person" /><span>{{teacherInfo.username}}</span></span>
        <span><Icon type="ios-book" /><span>{{teacherInfo.position}}</span></span>
        <span><Icon type="md-school" /><span>{{teacherInfo.school}}</span></span>
        <span><Icon type="md-home" /><span>{{teacherInfo.department}}</span></span>
        <span><Icon type="md-mail" /><span>{{teacherInfo.email}}</span></span>
      </div>
    </div>
    <div id="courseTable"></div>
  </div>
</template>

<script>
  import {MenuItem, Menu, Icon, Submenu, MenuGroup, Avatar} from 'iview'
  import Timetables from 'timetables';
  import NavBar from "../components/NavBar";
  import {mapGetters,mapActions} from 'vuex'
  export default {
    name: "index",
    components: {
      NavBar,
      MenuItem, Menu, Icon, Submenu, MenuGroup, Avatar
    },
    computed: {
        ...mapGetters(['teacherInfo']),
      teacherInfo() {
        let info = this.$store.getters.teacherInfo;
        // if (!Object.keys(info).length) {
        //   info = JSON.parse(localStorage.getItem("userInfo"));
        // }
        return info;
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
        this.$http.get('teacher/getCourse', {params: {id: this.teacherInfo.id}})
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
                    courseTable[course.week - 1][x-1] = `${course.name}@${course['course_sku']} -> ${course.place} [${course.type}]`;
                }
              }
              this.courseList = courseTable;
              this.initCourseTable();
            }
          })
      },
      initCourseTable() {
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
            leftHandWidth: 70,
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
    width: 100%;
    height: 280px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    background-image: linear-gradient(0deg, #8755ff 0%, #30AFED 51%, #03DDE4 100%);
    .ivu-avatar-large {
      line-height: 65px;
    }
    .user_photo {
      width: 200px;
    }
    .user_label {
      width: 100%;
      font-size: 20px;
      text-align: center;
      span {
        margin: 0 5px;
        color: white;
        span{
          margin-left: 5px;
        }
      }
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

  #courseWrapper{
    background-color: gray;
  }

</style>
