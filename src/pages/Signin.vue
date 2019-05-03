<template>
  <div class="main bg-grey">
    <NavBar/>
    <div class="content">
      <!--签到列表-->
      <div class="left">
        <div class="margin">
          <Button v-show="!isSigned" type="primary" shape="circle" long class="margin-top-lg text-md" @click="handleStartSign">开启签到</Button>
          <Button v-show="isSigned&&!start" type="dashed" long class="margin-top-lg text-md bg-red" @click="handleStopSign">正在签到中...</Button>
        </div>
        <div class="record-list">
          <CellGroup class="margin-top-lg">
            <span v-for="(item,index) in signList" :key="index"><Cell :title="`${item.name}`"></Cell></span>
          </CellGroup>
        </div>
      </div>
      <!--签到详情-->
      <div class="right">
        <!--签到详情-->
        <div>
          <div v-show="!isSigned&&!start" class="delete">
            <span class="text-md text-red"><Icon type="ios-trash" size="26"/>删除这个签到</span>
          </div>
          <div v-show="!isSigned&&!start" class="bg-gray info-card">
            <h5>本次签到开启于 2019-05-03 15:29:34</h5>
            <div>
              <div>
                <div>出勤</div>
                <div><span>0</span><span>人</span></div>
              </div>
              <div>
                <div>出勤率</div>
                <div><span>0</span><span>%</span></div>
              </div>
              <div>
                <div>开启签到时间</div>
                <div><span>3</span><span>秒</span></div>
              </div>
            </div>
          </div>
          <div v-show="isSigned&&!start" class="bg-gray info-card">
            <h5>距离本次签到还有 <span class="text-md text-red">299</span> 秒结束</h5>
            <div class="number-list">
              <div class="number">
                <span>{{signCount[0]}}</span>
              </div>
              <div class="number">
                <span>{{signCount[1]}}</span>
              </div>
              <div class="number">
                <span>{{signCount[2]}}</span>
              </div>
            </div>
          </div>
          <div v-show="start" class="bg-gray info-card">
            <h5>点击开始，开始签到</h5>
            <div class="number-list">
              <div class="number">
                <span>0</span>
              </div>
              <div class="number">
                <span>0</span>
              </div>
              <div class="number">
                <span>0</span>
              </div>
            </div>
          </div>
          <div class="long-line margin"></div>
          <div class="user-list">
            <div class="user" v-for="(user,index) in userList" :key="index">
              <div>
                <Avatar  src="https://i.loli.net/2017/08/21/599a521472424.jpg"/>
              </div>
              <span class="text-gray">徐鹏飞</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import NavBar from '../components/NavBar';

  export default {
    name: "Signin",
    components: {NavBar},
    computed: {
      signCount() {
        return this.count + ''.split('').map(x => parseInt(x))
      }
    },
    methods:{
      handleStartSign() {
        this.isSigned = true;
        this.start = false;
        this.$Notice.success({
          title: '开启签到',
          desc: '开启签到成功！'
        });
      },
      handleStopSign() {
        this.isSigned = false;
        this.start = false;
        this.$Notice.info({
          title: '关闭签到',
          desc: '关闭签到成功！'
        });
      }
    },
    data() {
      return {
        signList: [{name: 'aaa',}, {name: 'aaa',}, {name: 'aaa'}],
        userList: [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6],
        isSigned: false,
        count: 356,
        currentIndex: -1,
        start: true
      }
    },
  }
</script>

<style lang="less" scoped>
  .main {
    height: 100%;
    width: 100%;

    .content {
      height: 90%;
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding: 20px;
      box-sizing: border-box;

      .left {
        width: 18%;
        height: 100%;
        border-radius: 5px;
        background-color: #fff;
        min-height: 644px;

        .record-list {
          height: 90%;
        }
      }

      .right {
        height: 100%;
        width: 80%;
        background-color: #fff;
        border-radius: 5px;
        min-height: 644px;
        position: relative;

        .user-list {
          display: flex;
          flex-wrap: wrap;

          .user {
            width: 80px;
            height: 80px;
            text-align: center;
            /*background-color: rebeccapurple;*/
            padding: 10px;

            & > span {
              font-size: 15px;
            }
          }
        }

        .delete {
          position: absolute;
          right: 5%;
          top: 50px;
        }

        .info-card {
          height: 30%;
          margin-top: 100px;
          padding: 20px;

          .number-list{
            margin: 0 auto;
            width: 30%;
            display: flex;
            justify-content: space-around;
            .number{
              font-size: 80px;
              color: white;
              font-weight: bold;
              background: #333;
              &>span{
                text-shadow: #aac9e8 2px -3px;
              }
            }
          }

          h5 {
            text-align: center;
            color: black;
          }

          div {
            margin-top: 10px;
            display: flex;
            justify-content: space-around;

            & > div {
              width: 30%;
              display: flex;
              flex-wrap: wrap;

              & > div {
                width: 100%;
                text-align: center;
                display: block;
                font-size: 20px;

                span:nth-child(1) {
                  font-size: 66px;
                  color: black;
                }
              }
            }
          }
        }

        .long-line {
          border-top: 2px solid #9FE0CC;
          margin-top: 30px;
          margin-bottom: 30px;
        }
      }
    }
  }
</style>
