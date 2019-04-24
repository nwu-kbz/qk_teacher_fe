<template>
  <div class="main_page">
    <ClassBar></ClassBar>
    <div class="main">
      <div class='courseware'>
        <Card title="课程列表" icon="ios-options">
              <Collapse simple>
                <Panel name="1">
                  第一章：程序设计入门
                  <p slot="content">...</p>
                </Panel>
                <Panel name="2">
                  第二章：计算
                  <p slot="content">...</p>
                </Panel>
                <Panel name="3">
                  第三章：判断与循环1
                  <p slot="content">...</p>
                </Panel>
                <Panel name="4">
                  第四章：判断与循环2
                  <p slot="content">...</p>
                </Panel>
                <Panel name="5">
                  第五章：循环与控制
                  <p slot="content">...</p>
                </Panel>
                <Panel name="6">
                  第六章：数组与函数
                  <p slot="content">...</p>
                </Panel>
                <Panel name="7">
                  第七章：指针与字符串
                  <p slot="content">...</p>
                </Panel>
              </Collapse>
        </Card>
      </div>
      <div class="show_area">
        <div class="show_courseware">
          <iframe width="100%" height="100%" src="https://view.officeapps.live.com/op/view.aspx?src=http%3A%2F%2Fvideo.ch9.ms%2Fbuild%2F2011%2Fslides%2FTOOL-532T_Sutter.pptx"></iframe>
        </div>
        <!--<div class="button_group">-->
          <!--<ButtonGroup shape="circle">-->
            <!--<Button type="primary" icon="ios-skip-backward"></Button>-->
            <!--<Button type="primary" icon="ios-skip-forward"></Button>-->
          <!--</ButtonGroup>-->
        <!--</div>-->

      </div>
      <div class="talk_area">

      </div>
    </div>
  </div>
</template>

<script>
  import ClassBar from "../components/ClassBar";
  import {Cell, CellGroup, Card, Collapse, Panel, ButtonGroup} from 'iview' ;

  export default {
    name: "ClassBegin",
    components: {ClassBar, Cell, CellGroup, Card, Collapse, Panel, ButtonGroup}
  }
</script>

<style lang="less" scoped>
  .main_page {
    width: 100%;
    height: 100%;
    background: #e5e5e5;
    .main{
      height: 100%;
      display: flex;
      justify-content: space-between;
      .courseware{
        width: 18%;
      }
      .show_area {
        margin-top: 2%;
        width: 70%;
        height: 60%;
        position: relative;
        background-color: #fff;
        .show_courseware{
          background-color: rebeccapurple;
          height: 95%;
          width: 97%;
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          margin: auto;
        }
        .button_group{
          position: absolute;
          bottom: -50px;
          left: 47%;
        }
      }
    }
  }

</style>
