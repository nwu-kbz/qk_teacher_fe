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
        const maps = {
          '/main': 1,
          '/qbank': 2,
          '/inform': 3,
          '/data': 4
        };
        this.updateCurrentPath(maps[val.path]+'');
      }
    },
    methods: {
      ...mapActions(['updateCurrentPath'])
    }
  }
</script>

<style>
  html, body, #app {
    width: 100%;
    height: 100%;
  }

</style>
