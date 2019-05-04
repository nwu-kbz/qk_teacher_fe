<template>
  <div class="main bg-grey ">
    <NavBar></NavBar>
    <div class="drawer">
      <Drawer title="Basic Drawer" placement="left" :closable="false" v-model="isOpen" :styles="styles">
        <h5 slot="header">
          <Icon type="md-medal" size="25"/>
          评分记录
        </h5>
        <div class="record-item">
          <div class="time">
            <Icon type="md-radio-button-on"/>
            <span>2019年5月5日</span></div>
          <div class="aRecord">
            <div class="itemBorder"></div>
            <div class="itemContainer">
              <div class="stars"><img src="../../static/img/two.png"></div>
              <span>徐鹏飞</span>
            </div>
            <div class="delete"><Icon type="md-trash" size="25" class="icon"/></div>
          </div>
        </div>
      </Drawer>
    </div>
    <div class="studentList">
      <div class="student" v-for="(item,index) in [1,2,4,4]" :key="index" @click="handleModal">
        <img class='ivu-avatar' :src="teacherInfo.avatar"/>
        <h6>飞飞</h6>
      </div>
      <Modal v-model="studentModal" :width="350">
        <div class="studentInfo">
          <img class='ivu-avatar' :src="teacherInfo.avatar"/>
        </div>
        <div slot="footer" class="modelFooter">
          评价：<Rate v-model="value" :count="3"/>
          <button>评分</button>
        </div>
      </Modal>
    </div>
    <Button @click="openDraw" type="primary" class="openDraw" :class="{'openedDrawer':openedDrawer}">
      <Icon style="margin-left: -10px" :type="btnLogo" size="25"/>
    </Button>

  </div>

</template>

<script>
  import NavBar from "../components/NavBar";
  import {Modal} from 'iview' ;
  import {mapGetters} from 'vuex'

  export default {
    name: "Point",
    components: {NavBar},
    data() {
      return {
        isOpen: false,
        styles: {
          background: '#303133',
          color: 'white'
        },
        openedDrawer: false,
        // ["md-arrow-round-forward",'md-arrow-round-back']
        btnLogo: "md-arrow-round-forward",
        studentArr: [],
        studentModal:false
      }
    },
    computed: {
      ...mapGetters(['teacherInfo'])
    },
    methods: {
      openDraw() {
        this.isOpen = !this.isOpen;
        this.openedDrawer = !this.openedDrawer;
      },
      handleModal(){
        this.studentModal = true
      }
    },
    watch: {
      isOpen: function (val) {
        if (val) {
          this.btnLogo = 'md-arrow-round-back';
          this.openedDrawer = true;
        } else {
          this.btnLogo = 'md-arrow-round-forward';
          this.openedDrawer = false;
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .record-item {
    border: 0;
    width: 280px;
    height: 100px;
    margin: 5px auto;
    &:hover{
      .delete{
        margin-left: -50px;
        /*display: inline-block;*/
        visibility: visible;
        /*background-color: rebeccapurple;*/

      }

    }
    .time {
      margin: 10px 0;
    }
    .itemBorder {
      background: #717171;
      width: 8px;
      height: 38px;
      display: inline-block;
      float: left;

    }
    .itemContainer {
      background: white;
      width: 215px;
      height: 38px;
      display: inline-block;
      float: left;
      color: black;
      font-size: 18px;
      .stars{
        width: 38px;
        height: 38px;
        display: inline-block;
        margin: 0 6px;

        img{
          width: 38px;
          height:38px;
        }
      }
    }
    .delete{
      background-color: rgba(212, 0, 0, 1);
      width: 50px;
      height: 38px;
      /*display: none;*/
      visibility: hidden;
      float: left;
      transition: all 300ms ease-in-out;
      .icon{
        margin: 5px 12px;
      }

      /*margin-left: -50px;*/
    }
  }

  .main {
    width: 100%;
    height: 100%;
    position: relative;

    .studentList {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      .student {
        margin: 10px;
        width: 100px;
        height: 130px;
        text-align: center;
        &:hover {
          background-color: rgba(67, 67, 67, 0.48);
        }
        img {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          margin: 10px 20px;
        }
      }
    }
    .openDraw {
      width: 30px;
      height: 80px;
      background-color: rgb(48, 49, 51);
      border: 0;
      border-radius: 0 8px 8px 0;
      position: fixed;
      top: 42%;
    }
    .openedDrawer {
      transition: transform 340ms ease-in-out;
      transform: translateX(256px);
    }
  }
  .studentInfo{
    width: 100%;
    height: 320px;
    /*background: plum;*/
    /*background-image: url("");*/
    /*filter:blur(3px);*/
    .ivu-avatar{
      width: 120px;
      height: 120px;
      border-radius: 50%;
      margin: 25px 100px;
    }
  }
  .modelFooter{
    button{
      width: 50px;
      height: 30px;
      border-radius: 8px;
      border:0;

    }
  }

</style>