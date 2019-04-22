<template>
  <div id="app">

    <router-view/>
  </div>
</template>

<script>
  import {mapActions} from 'vuex';

  export default {
    name: 'App',
    watch: {
      '$route'(val) {
        this.setNav(val);
      }
    },
    mounted() {
      this.setNav(this.$route);
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

<style>
  html, body, #app {
    width: 100%;
    height: 100%;
  }

</style>
