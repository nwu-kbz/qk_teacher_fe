<template>
  <div class="main_page">
    <NavBar></NavBar>
    <div class="main">
      <div class="show_area">
        <div class="show_courseware">
          <iframe v-if="office" width="100%" height="100%"
                  :src="`https://view.officeapps.live.com/op/view.aspx?src=${url}`"></iframe>
          <iframe v-if="pdf" width="100%" height="100%" :src="`./static/pdf/web/viewer.html?file=`+encodeURIComponent(url)"></iframe>
          <video v-if="video" :src="url" width="100%" height="100%" controls></video>
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
    computed:{
      office() {
        let format = ['ppt', 'pptx', 'doc', 'docx', 'xls', 'xlsx'];
        return this.url && format.some(f => this.url.endsWith(f));
      },
      pdf() {
        return this.url && this.url.endsWith('pdf');
      },
      video() {
        return this.url && this.url.endsWith('mp4');
      },
    },
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
