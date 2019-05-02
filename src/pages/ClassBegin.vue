<template>
  <div class="main_page">
    <NavBar></NavBar>
    <div class="main">
      <div class='courseware'>
        <!--功能模块-->

        <!-- 章节列表-->
        <Collapse simple>
          <Panel name="1" v-for="(item,index) in chapter">
            <span class="chapter_title">第一章：程序设计入门</span>
            <p slot="content">...</p>
          </Panel>
        </Collapse>
      </div>
      <div class="show_area">
        <div class="show_courseware">
          <h2>请在右侧选择课件进行展示</h2>
          <iframe v-if="url" width="100%" height="100%" :src="`https://view.officeapps.live.com/op/view.aspx?src=${url}`"></iframe>
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
    name: "ClassBegin",
    components: {NavBar, Cell, CellGroup, Card, Collapse, Panel, ButtonGroup},
    data() {
      return {
        url: '',
        chapter: []
      }
    },
    methods: {
      getChapters(){
        this.$http.get('/chapter/getChapterByCourse',{params:{id:this.$route.query.id}})
          .then(res=>{
            if (res.data.code === 1) {
              let chapter = res.data.data;

            }else {
              this.$Message.error(res.data.msg);
            }
          })
      },
    },
    mounted() {
      this.getChapters();
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
      display: flex;
      min-height: 700px;
      justify-content: space-between;

      .courseware {
        width: 18%;
        height: 100%;
        background-color: #fff;
        .chapter_title {
          font-size: 18px;
        }
      }

      .show_area {
        width: 80%;
        height: 100%;
        margin-top: 3px;
        min-height: 600px;
        background-color: #fff;

        .show_courseware {
          background-color: #515a6e;
          height: 95%;
          width: 97%;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          margin: auto;
          text-align: center;
          h2{
            color: #dfdfdf;
            line-height: 500px;
          }
        }
      }

    }
  }

</style>
