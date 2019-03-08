<template>
  <div class="main">
    <NavBar></NavBar>
    <div class="qb_container">
      <div class="course">
        <router-link v-for="(course) in courseArr" :key="course.id" :to="course.url">
          <Card class="course_card">
            <img slot="title" src="../assets/course_logo.jpg">
            <p>{{course.courseName}}</p>
            <div class="icon">
              <Icon type="ios-create" size="24"/>
              {{course.count}}
            </div>
          </Card>
        </router-link>

        <!--<Card class="course_card">-->
          <!--<img slot="title" src="../assets/course_logo.jpg">-->
          <!--<p>C语言程序设计基础</p>-->
          <!--<div class="icon">-->
            <!--<Icon type="ios-create" size="24"/>-->
            <!--3-->
          <!--</div>-->
        <!--</Card>-->
        <!--<Card class="course_card">-->
          <!--<img slot="title" src="../assets/course_logo.jpg">-->
          <!--<p>JAVA语言程序设计基础</p>-->
          <!--<div class="icon">-->
            <!--<Icon type="ios-create" size="24"/>-->
            <!--2-->
          <!--</div>-->
        <!--</Card>-->
        <!--<Card class="course_card">-->
          <!--<img slot="title" src="../assets/course_logo.jpg">-->
          <!--<p>微积分</p>-->
          <!--<div class="icon">-->
            <!--<Icon type="ios-create" size="24"/>-->
            <!--0-->
          <!--</div>-->
        <!--</Card>-->
      </div>
    </div>
  </div>
</template>

<script>
  import NavBar from "../components/NavBar";
  import {Card} from 'iview'

  export default {
    name: "QBank",
    components: {NavBar},
    data() {
      return {
        courseArr: [{id: 1, courseName: 'C程序设计基础', url: "/courseDetail/1", count: 3},
          {id: 2, courseName: 'JAVA程序设计基础', url: "/courseDetail/:2", count: 4},
          {id: 3, courseName: '微积分', url: "/courseDetail/3", count: 0}]
      }
    },

  }
</script>

<style lang="less" scoped>
  .main {
    width: 100%;
    height: 100%;
    .qb_container {
      width: 100%;
      height: 94%;
      padding: 30px;
      .course {
        width: 310px;
        height: 230px;
        border-radius: 5px;
        margin: 0;
        display: flex;
        .course_card {
          display: inline-block;
          float: left;
          margin: 5px;
        }
        p {
          font-size: 18px;
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

  .ivu-card-head {
    padding: 0;
  }


</style>