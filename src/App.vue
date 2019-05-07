<template>
  <div id="app" class="layout">
    <Layout v-if="needLayout">
      <Header>
        <NavBar/>
      </Header>
      <Content :style="{padding: '0 50px',minHeight:'100%'}">
        <Card style="margin:20px">
          <router-view/>
        </Card>
      </Content>
      <Footer class="layout-footer-center">2011-2016 &copy; TalkingData</Footer>
    </Layout>

    <router-view v-else/>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex';
  import NavBar from "./components/NavBar";
  import _ from 'lodash';

  export default {
    name: 'App',
    components: {NavBar},
    watch: {
      '$route'(val) {
        this.setNav(val);
      }
    },
    mounted() {
      this.setNav(this.$route);
      let info = this.$store.getters.teacherInfo;
      if (!Object.keys(info).length) {
        info = JSON.parse(localStorage.getItem("userInfo"));
        info && this.$store.dispatch('saveInfo', info);
      }
      // 保证课程列表
      this.getAndUpdateCourseList();
    },
    computed: {
      ...mapGetters(['courseList', 'teacherInfo']),
      needLayout() {
        const maps = [
          '/login',
          '/register'
        ];
        return !maps.some(p => this.$route.path.indexOf(p) >= 0);
      }
    },
    methods: {
      ...mapActions(['updateCurrentPath', 'saveCourseList']),
      setNav(val) {
        const maps = {
          '/main': 1,
          '/qbank': 2,
          '/inform': 3,
          '/data': 4
        };
        for (let key in maps) {
          if (val.path.indexOf(key) >= 0) {
            this.updateCurrentPath(maps[key] + '');
          }
        }
      },
      getAndUpdateCourseList() {
        if (_.isEmpty(this.courseList) && !_.isEmpty(this.teacherInfo)) {
          this.$http.get('teacher/getCourse', {params: {id: this.teacherInfo.id}})
            .then(res => {
              if (res.data.code === 1) {
                this.saveCourseList(res.data.data);
              }
            })
        }
      }
    }
  }
</script>

<style lang="less">
  @import "../static/css/main";

  html, body, #app {
    width: 100%;
    height: 100%;
  }

  .layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
  }

  .layout-nav {
    width: 600px;
    margin: 0 auto;
    margin-right: 20px;
  }

  .layout-footer-center {
    text-align: center;
  }

</style>
