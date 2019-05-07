<template>
  <div class="main-page">
    <div class="userinfo">
      <Divider><img class='avatar' :src="teacherInfo.avatar"/>
      <!--<div>-->
        <p class="name">{{teacherInfo.username}}</p>
        <p class="info">
          {{teacherInfo.position}}.
          {{teacherInfo.school}}.
          {{teacherInfo.department}}.
          {{teacherInfo.email}}
        </p>
      </Divider>
      <!--</div>-->
      <div class="info-blocks">
        <div class="info-block"><p>8</p>
          <p>课堂</p></div>
        <div class="info-block"><p>40</p>
          <p>学生</p></div>
        <div class="info-block"><p>50</p>
          <p>题目</p></div>
        <div class="info-block"><p>2</p>
          <p>组卷</p></div>
      </div>
    </div>
    <div id="courseTable"></div>
  </div>
</template>

<script>
  import {MenuItem, Menu, Icon, Submenu, MenuGroup, Avatar} from 'iview'
  import Timetables from 'timetables';
  import NavBar from "../components/NavBar";
  import {mapGetters, mapActions} from 'vuex'

  export default {
    name: "index",
    components: {
      NavBar,
      MenuItem, Menu, Icon, Submenu, MenuGroup, Avatar
    },
    computed: {
      ...mapGetters(['teacherInfo']),
      teacherInfo() {
        return this.$store.getters.teacherInfo;
      }
    },
    data() {
      return {
        courseList: []
      }
    },
    methods: {
      ...mapActions(['saveCourseList']),
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
              if (!res.data.data) {
                this.$Message.error('课程列表暂时为空!');
                return;
              }
              this.saveCourseList(res.data.data);
              for (let course of res.data.data) {
                let arr = course.day.split(',').map(x => parseInt(x));
                for (let x of arr) {
                  if (course.name)
                    courseTable[course.week - 1][x - 1] = `${course.name}@${course.id} -> ${course.place} [${course.type}]`;
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
  .main-page {
    font-size: 16px;
    font-weight: lighter;
    height: 100%;
    width: 100%;

    .userinfo {
      height: 240px;
      width: 100%;

      .avatar {
        height: 80px;
        width: 80px;
        border-radius: 50%;

      }

      & > div {
        height: 110px;
        text-align: center;

        .name {
          font-size: 24px;
          color: #4a4a4a;
          line-height: 40px;
          margin-bottom: 15px;
        }

        .info {
          font-size: 14px;
          color: #4a4a4a;
          line-height: 20px;
        }
      }

      .line{
        height: 28px;
        border-bottom: 1px solid #eee;
        z-index: 0;
      }
      .info-blocks {
        margin-top: -40px;
        background-color: hsla(0,0%,100%,0);
        display: flex;
        align-items: center;
        justify-content: center;

        .info-block {
          width: 24px;
          height: 43px;
          margin: 0 24px;

          & > p:nth-child(1) {
            font-size: 20px;
            color: #4a4a4a;
            text-align: center;
          }

          & > p:nth-child(2) {
            font-size: 12px;
            color: #9b9b9b;
            line-height: 20px;
          }
        }
      }
    }
  }

  #courseTable {
    width: 70%;
    margin: 10px auto;
    height: 650px;
    text-align: center;
  }

</style>
