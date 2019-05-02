<template>
  <div class="main_page">
    <NavBar></NavBar>
    <div class="main">
      <div class="show_area">
        <div class="show_courseware">
          <iframe width="100%" height="100%" :src="`https://view.officeapps.live.com/op/view.aspx?src=${url}`"></iframe>
        </div>
      </div>
      <div class="talk_area">

      </div>
    </div>
  </div>
</template>

<script>
  import NavBar from "../components/NavBar";
  import {Cell, CellGroup, Card, Collapse, Panel, ButtonGroup} from 'iview' ;

  export default {
    name: "DocPreview",
    components: {NavBar, Cell, CellGroup, Card, Collapse, Panel, ButtonGroup},
    data() {
      return {
        url: ''
      }
    },
    mounted() {
      this.url = this.$route.query.url;
    }
  }
</script>

<style lang="less" scoped>
  .main_page {
    width: 100%;
    height: 100%;
    min-height: 700px;
    background: #e5e5e5;

    .main {
      height: 100%;
      width: 100%;
      min-height: 700px;


      .show_area {
        width: 100%;
        height: 100%;
        min-height: 600px;
        background-color: #fff;

        .show_courseware {
          background-color: rebeccapurple;
          height: 100%;
          width: 100%;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          margin: auto;
        }
      }

    }
  }

</style>
