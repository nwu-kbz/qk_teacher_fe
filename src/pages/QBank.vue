<template>
  <div class="main">
    <NavBar></NavBar>
    <div class="qb_container">
      <div class="course">
        <router-link v-for="(course,index) in courseArr" :key="index" :to="`/courseDetail/${course.id}/${course.name}`">
          <Card class="course_card">
            <img slot="title" src="../assets/course_logo.jpg">
            <p>{{course.name}}</p>
            <div class="icon">`
              <Icon type="ios-create" size="24"/>
              {{course.count}}
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

  export default {
    name: "QBank",
    components: {NavBar},
    data() {
      return {
        courseArr: []
      }
    },
    mounted() {
      this.$http.get('qbase/getbasebyteacher/id/10')
        .then(res=>{
          if (res.data.code === 0) { //err
            this.$Message.error("获取题库信息失败");
          }else {
            this.courseArr = res.data.data;
          }
        })
    }

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
