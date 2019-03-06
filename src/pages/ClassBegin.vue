<template>
  <div class="main_page">
    <ClassBar></ClassBar>
    <div class="main">
      <div class='courseware' style="background:  rgba(44,51,68,0.87)">
        <Card title="Options" icon="ios-options" :padding="0" shadow style="color: rgba(232,232,232,1)">
          <CellGroup>
            <Cell title="Only show titles">
              <Collapse v-model="value1">
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
            </Cell>
          </CellGroup>
        </Card>
      </div>
      <div class="show_area">
        <div class="show_courseware">
        </div>
        <div class="button_group">
          <ButtonGroup shape="circle">
            <Button type="primary" icon="ios-skip-backward"></Button>
            <Button type="primary" icon="ios-skip-forward"></Button>
          </ButtonGroup>
        </div>

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
    min-width: 683px;
    .main {
      width: 100%;
      height: 681px;
      background-color: rgba(44, 51, 68, 0.87);
      .courseware {
        float: left;
        width: 19%;
        display: inline-block;
        margin: 0;
        height: 100%;
        .ivu-card {
          width: 100%;
          height: 100%;
          background-color: rgba(87, 91, 99, .5);
          color: rgba(232, 232, 232, 1);
        }
        /*.ivu-card-body {*/
        /*height: 630px;*/
        /*!*overflow:scroll;*!*/
        /*}*/
        /*.ivu-cell-group {*/
        /*height: 630px;*/
        /*!*overflow:scroll;*!*/

        /*}*/

      }
      .show_area {
        position: relative;
        width: 64%;
        float: left;
        height: 100%;
        .show_courseware {
          width: 94%;
          height: 85%;
          float: left;
          display: block;
          margin-left: 4%;
          margin-top: 20px;
          background-color: rgba(255, 246, 253, 0.11);
        }
        .button_group{
          width: 100px;
          height: 35px;
          position: absolute;
          bottom: 5%;
          left: 50%;
          margin-left: -50px;
        }
      }

      .talk_area {
        float: right;
        width: 16%;
        background-color: rgba(49, 59, 79, 0.81);
        height: 100%;

      }
    }

  }

  .ivu-cell {
    color: #e8e8e8 !important;
    padding: 0px;
    background-color: rgba(87, 91, 99, .5);
    .ivu-cell-item {
      background-color: rgba(87, 91, 99, .5);
      width: 100%;
    }
    .ivu-cell-main {
      border: none;
      width: 100% !important;
      margin: 0;
      background-color: rgba(87, 91, 99, .5);
      .ivu-collapse-header {
        width: 100%;
        background-color: rgba(87, 91, 99, .5);
      }
    }

  }

  .ivu-card-head p {
    color: white;
  }
</style>