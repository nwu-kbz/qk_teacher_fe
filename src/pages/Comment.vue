<template>
  <div class="main">
    <div class="qb_container">
    </div>
  </div>
</template>

<script>
  import NavBar from "../components/NavBar";
  import {Card} from 'iview'
  import {mapGetters,mapActions} from 'vuex'

  export default {
    name: "Comment",
    components: {NavBar},
    data() {
      return {
      }
    },
    computed: {
      ...mapGetters(['teacherInfo'])
    },
    methods:{
      ...mapActions([])
    },
    mounted() {
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
    }
  }

  .ivu-card-head {
    padding: 0;
  }


</style>
