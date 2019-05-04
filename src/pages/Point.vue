<template>
  <div>
  <div class="main bg-grey">


    <div class="student">
        <img class='ivu-avatar' :src="teacherInfo.avatar"/>
      </div>


  </div>
  <div class="drawer">
    <Drawer title="Basic Drawer" placement="left" :closable="false" v-model="isOpen" :styles="styles">
      <h5 slot="header">
        <Icon type="md-medal" size="25"/>
        评分记录
      </h5>
    </Drawer>
    <Button @click="openDraw" type="primary" class="openDraw" :class="{'openedDrawer':openedDrawer}">
      <Icon style="margin-left: -10px" :type="btnLogo" size="25"/>
    </Button>
  </div>
  </div>
</template>

<script>
  import NavBar from "../components/NavBar";
  import {Card} from 'iview' ;
  import {mapGetters} from 'vuex'

  export default {
    name: "Point",
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
        studentArr: []
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
  .main {
    width: 100%;
    height: 100%;

    .student {
      width: 140px;
      height: 180px;
      background-color: rebeccapurple;
    }

  }

  .drawer {
    min-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .openDraw {
      width: 30px;
      height: 80px;
    }
    Button {
      background: #303133;
      border: 0;
      border-radius: 0 8px 8px 0;
    }
    .openedDrawer {
      position: relative;
      transition: transform 340ms ease-in-out;
      transform: translateX(256px);
    }
  }


</style>