<template>
  <div id="app" class="layout">
      <Layout>
        <Header>
          <NavBar/>
        </Header>
        <Content :style="{padding: '0 50px',minHeight:'100%'}">
          <Card style="margin:20px" >
            <router-view/>
          </Card>
        </Content>
        <Footer class="layout-footer-center">2011-2016 &copy; TalkingData</Footer>
      </Layout>

  </div>
</template>

<script>
  import {mapActions} from 'vuex';
  import NavBar from "./components/NavBar";

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
        // console.log(this.$store);
        info&&this.$store.dispatch('saveInfo', info);
      }
    },
    methods: {
      ...mapActions(['updateCurrentPath']),
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

  .layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
  }

  .layout-nav{
    width: 600px;
    margin: 0 auto;
    margin-right: 20px;
  }
  .layout-footer-center{
    text-align: center;
  }

</style>
