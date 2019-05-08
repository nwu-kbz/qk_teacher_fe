<template>
  <div class="main">
    <div class="qb_container">
      <div class="course">
        <router-link v-for="(course,index) in courseList" :key="index"
                     :to="`/courseDetail/${course.id}/${course.name}`">
          <Card class="course_card">
            <img slot="title" :src="randomPic()" height="170px" width="270px">
            <p>《{{course.name}}》 资源库</p>
            <div class="icon">
              <Icon type="ios-create" size="24"/>
            </div>
          </Card>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import NavBar from "../components/NavBar";
  import {Card} from 'iview'
  import {mapGetters, mapActions} from 'vuex'
  import random from 'random';

  export default {
    name: "QBank",
    components: {NavBar},
    data() {
      return {
        courseArr: []
      }
    },
    computed: {
      ...mapGetters(['teacherInfo', 'qBank', 'courseList','courseImage'])
    },
    methods: {
      ...mapActions(['saveQbank', 'saveCourseList']),
      getCourseList() {
        if (!this.courseList || this.courseList.length === 0) {
          this.$http.get('teacher/getCourse', {params: {id: this.teacherInfo.id}}).then(res => {
            if (res.data.code === 1) {
              this.saveCourseList(res.data.data);
            }
          });
        }
      },
      randomPic() {
        return this.courseImage[random.int(0, 8)];
      }
    },
    mounted() {
      this.getCourseList();
      this.$http.get(`qbase/getbasebyteacher/id/${this.teacherInfo.id}`)
        .then(res => {
          if (res.data.code === 0) { //err
            this.$Message.error("获取题库信息失败");
          } else {
            this.courseArr = res.data.data;
            //将该教师所有的题库存在vuex中
            this.$store.dispatch('saveQbank', res.data.data);
          }
        })
    }

  }
</script>

<style lang="less" scoped>
  .main {
    width: 100%;
    min-height: 100%;

    .qb_container {
      width: 100%;
      height: 94%;
      padding: 30px;

      .course {
        border-radius: 5px;

        .course_card {
          min-height: 263px;
          width: 300px;
          display: inline-block;
          margin: 5px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }

        p {
          font-size: 15px;
          width: 80%;
          display: inline-block;
        }

        .icon {
          float: right;
          display: inline-block;
        }
      }
    }
  }
</style>
