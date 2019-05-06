<template>
  <div class="main">
    <div class="flex-container">
      <div class="inform_menu flex-item">
        <Card title="通知列表" icon="ios-options" :padding="0" shadow >
          <Button slot="extra" to="/inform/editorInform" type="primary">
              <Icon type="md-add" sixe="30"/>
              新建通知
          </Button>
          <CellGroup>
            <Cell v-for="(item,index) in informArr" :title="item.content" :to="`/inform/showInform/${item.id}`" :key="index">
              <Badge :count="10" slot="extra"/>
            </Cell>
          </CellGroup>
        </Card>
      </div>
      <div class="inform_main flex-item">
        <router-view></router-view>
      </div>
    </div>

  </div>
</template>

<script>
  import NavBar from "../components/NavBar";
  import {Icon, Cell, CellGroup, Badge, Card, Button} from 'iview'

  export default {
    name: "Inform",
    components: {NavBar},
    data() {
      return {
        activeName: '3',
        informArr: [{id: 1, content: '第一条通知'}, {id: 2, content: '第二条通知'}, {id: 3, content: '第三条通知'}]
      }
    },
    mounted: function () {
    },
  }
</script>

<style lang="less" scoped>
  .main {
    width: 100%;
    height: 100%;
    .inform_menu {
      width: 20%;
      height: 100%;
      float: left;
      min-width: 300px;
      box-shadow: 2px 2px 5px rgba(128, 128, 128, 0.7);
      .add_inform {
        width: 200px;
        height: 35px;
        background-color: rgba(78, 197, 164, 0.93);
        border: none;
        box-shadow: 2px 2px 5px rgba(128, 134, 149, 0.8);
        color: white;
        font-size: 16px;
        margin: 20px 50px;
        /*margin-top: 20px;*/
      }
      .inform_items {
        list-style: none;
        width: 100%;
        padding: 10px 20px;
        height: 800px;
        /*overflow: scroll;*/
        .inform_item {
          font-size: 16px;
          height: 30px;
          line-height: 20px;
          margin: 5px auto;
          border-bottom: 1px solid rgba(158, 158, 158, 0.71);
        }
      }
    }
    .inform_main {
      float: left;
      width: 75%;
      height: auto;
      /*overflow: scroll;*/
      /*background: #000;*/
      /*background-color: #eee;*/

      /*background-color: rebeccapurple;*/
    }

  }

  .flex-container {
    display: -webkit-flex;
    display: flex;
    width: 100%;
    height: 94%;
    /*align-items: flex-end;*/
    justify-content: space-between;
    overflow: hidden;
  }
</style>
