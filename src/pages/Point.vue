<template>
  <div class="main bg-grey ">
    <div class="drawer">
      <Drawer title="Basic Drawer" placement="left" :closable="false" v-model="isOpen" :styles="styles" :width='280'>
        <h5 slot="header">
          <Icon type="md-medal" size="25"/>
          评分记录
        </h5>
        <div class="record-item">
          <div class="time">
            <!--            <Icon type="md-radio-button-on"/>-->
            <!--            <span>2019年5月5日</span>-->
          </div>
          <div class="aRecord" v-for="(item,index) in recordList" :key="index">
            <div class="itemContainer">
              <div class="stars"><img :src="starImage(item.star)"></div>
              <span>{{getNicknameById(item.uid)}}</span>
            </div>
            <!--<div class="delete"><Icon type="md-trash" size="25" class="icon"/></div>-->
          </div>
        </div>
      </Drawer>
    </div>

    <Button type="info" style="margin: 20px" shape="circle" @click="openDraw">查看回答问题列表</Button>
    <Button type="error" style="margin: 20px" shape="circle" @click="handleRandom">随机点人</Button>
    <div class="studentList">
      <div class="student" v-for="(item,index) in studentList" :key="index" @click="handleModal(index)">
        <img class='ivu-avatar' :src="publicUrl+item.avatar"/>
        <h6>{{item.nickname}}</h6>
      </div>
      <Modal v-model="studentModal" :width="350">
        <div class="studentInfo">
          <img class='ivu-avatar' :src="publicUrl+current.avatar"/>
          <h3>{{current.nickname}}</h3>
        </div>

        <div slot="footer" class="modelFooter">
          评价：
          <Rate v-model="star" :count="3"/>
          <Button type="success" @click="handleRate">评分</Button>
        </div>
      </Modal>
    </div>
  </div>

</template>

<script>
  import NavBar from "../components/NavBar";
  import config from '../config'
  import {mapGetters,mapActions} from 'vuex'
  import random from 'random';

  export default {
    name: "Point",
    components: {NavBar},
    data() {
      return {
        isOpen: false,
        styles: {
          background: '#303133',
          color: 'white',
        },
        openedDrawer: false,
        // ["md-arrow-round-forward",'md-arrow-round-back']
        btnLogo: "md-arrow-round-forward",
        studentArr: [1, 2, 3, 3, 4, 4, 4],
        studentModal: false,
        index: -1,
        star: 1,
        recordList: []
      }
    },
    computed: {
      ...mapGetters(['teacherInfo', 'studentList']),
      publicUrl() {
        return config.urls.publicUrl
      },
      current() {
        if (this.index >= 0) {
          return this.studentList[this.index];
        } else {
          return {};
        }
      }
    },
    methods: {
      ...mapActions(['saveStudentList']),
      getStudentList() {
        if (!this.studentList || this.studentList.length === 0) {
          this.$http.get('/students/getUserList', {params: {id: this.$route.query.sku}}).then(res => {
            if (res.data.code === 1) {
              this.saveStudentList(res.data.data);
            }
          });
        }
      },
      getNicknameById(id) {
        if (this.studentList && this.studentList.length > 0 && id) {
          return this.studentList.find(s => s.id === id * 1)['nickname'];
        } else {
          return "";
        }
      },
      handleRandom() {
        this.index = random.int(0, this.studentList.length - 1);
        this.studentModal = true
      },
      starImage(star) {
        let maps = [
          '../../static/img/one.png',
          '../../static/img/two.png',
          '../../static/img/three.png',
        ];
        return maps[star - 1];
      },
      handleRate() {
        this.$http.get('/rate/rate', {
          params: {
            uid: this.studentList[this.index]['id'],
            sku: this.$route.query.sku,
            star: this.star
          }
        }).then(res => {
          if (res.data.code === 1) {
            this.recordList.push({...this.current, star: this.star, uid: this.studentList[this.index]['id']});
            this.star = 1;
            this.studentModal = false;
            this.$Notice.success({
              title: '成功',
              content: '评分成功'
            })
          } else {
            this.$Notice.error({
              title: '失败',
              content: '评分失败'
            })
          }
        })
      },
      openDraw() {
        this.isOpen = !this.isOpen;
        this.openedDrawer = !this.openedDrawer;
      },
      handleModal(index) {
        this.index = index;
        this.studentModal = true
      },
      getRatedList() {
        this.$http.get('/rate/index', {params: {sku: this.$route.query.sku}})
          .then(res => {
            if (res.data.code === 1) {
              this.recordList = res.data.data;
            }
          })
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
    },
    mounted() {
      this.getStudentList();
      this.getRatedList();
    }
  }
</script>

<style lang="less" scoped>
  .record-item {
    border: 0;
    width: 260px;
    height: 100px;
    margin: 5px auto;

    .time {
      margin: 10px 0;
    }

    .itemContainer {
      border-left: #666666 5px solid;
      background: white;
      width: 215px;
      height: 38px;
      display: inline-block;
      float: left;
      color: black;
      font-size: 18px;
      margin-top: 3px;

      .stars {
        width: 38px;
        height: 38px;
        display: inline-block;
        margin: 0 6px;

        img {
          width: 38px;
          height: 38px;
        }
      }
    }
  }

  .delete {
    background-color: rgba(212, 0, 0, 1);
    width: 50px;
    height: 38px;
    /*display: none;*/
    visibility: hidden;
    float: left;
    transition: all 300ms ease-in-out;

    .icon {
      margin: 5px 12px;
    }

    /*margin-left: -50px;*/
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
      min-height: 600px;

      .student {
        cursor: pointer;
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
      transform: translateX(280px);
    }
  }

  .studentInfo {
    width: 100%;
    height: 320px;
    text-align: center;
    /*background: plum;*/
    /*background-image: url("");*/
    /*filter:blur(3px);*/

    .ivu-avatar {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      margin: 25px 100px;
    }
  }

  .modelFooter {
    button {
      width: 50px;
      height: 30px;
      border-radius: 8px;
      border: 0;

    }
  }


</style>
