<template>
  <div class="main bg-grey">

    <div class="main-content">
      <Card class="left">
        <p slot="title" @click="addInform=true">
          <Icon type="md-add-circle" size="20"/>
          添加讨论
        </p>
        <Modal
                v-model="addInform"
                title="添加讨论话题"
                @on-ok="handle_addInform"
                >
          <Input v-model="newInform" type="textarea" :rows="4" placeholder="create a topic..."/>
        </Modal>
        <CellGroup class="cellGroup" width="100%">
          <Cell title="讨论话题1" v-for="(item,index) in [1,2,2,2,2,2]" :key="index">
            <Badge :count="10" slot="extra" />
          </Cell>
        </CellGroup>
      </Card>

      <!--讨论区-->
      <Card class="right">
        <p slot="title">
          <Icon type="md-alarm" size="20"/>
          讨论区
        </p>
        <CellGroup class="cellGroup" width="100%">
          <Cell :title="`用户${index}`" v-for="(item,index) in [1,2,2,2,2,3]" :key="index">
            <p slot="extra">讨论的哈收到啦放假啊事件的发生风机电机阿斯弗暗室逢灯拉萨解放的</p>
          </Cell>
        </CellGroup>
      </Card>
    </div>
  </div>
</template>

<script>
  import NavBar from "../components/NavBar";
  import {Cell, CellGroup, Badge} from 'iview'

  export default {
    name: "Discuss",
    components: {NavBar},
    data(){
      return{
        addInform:false,
        informArr:[],
        newInform:''
      }
    },
    methods:{
      handle_addInform(){

      }
    }
  }
</script>

<style scoped lang="less">
  .main {
    width: 100%;
    min-height: 100%;

    .main-content{
      width: 100%;
      min-height: 100%;
      display: flex;
      justify-content: center;
      .left {
        width: 18%;
        min-height: 91%;
        margin: 10px;
        .cellGroup {
          width: 100%;
          .cellItem{
            .ivu-cell-title{
              width: 100%;
            }
            .msgCount {
              float: right;
            }
          }

        }
      }
      .right{
        margin: 10px;
        width: 80%;
      }
    }

  }
</style>
