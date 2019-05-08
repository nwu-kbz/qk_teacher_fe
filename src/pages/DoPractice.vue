<template>
  <div class="main bg-grey">
    <!--题目列表-->
    <div class="main-container">
      <Card title="题目列表" icon="ios-options" :padding="0" shadow class="left">
        <Collapse simple @on-change="handleSelectPractice">
          <Panel :name="ins+''" v-for="(prac,ins) in eList" :key="ins">
            {{prac.name}}
            <p slot="content">
              <CellGroup>
                <span v-for="(item,index) in prac['practice']" :key="index" @click="handleShowQuestion(ins,index)"><Cell
                  :title="item.content"/></span>
              </CellGroup>
            </p>
          </Panel>
        </Collapse>

      </Card>
      <!--题目详情-->
      <Card title="题目详情" icon="ios-options" :padding="0" shadow class="right">
        <div v-if="showQuestion">
          <!--题目概况-->
          <Card class="inner-card">
            <Tag type="dot" color="success">{{getType(currentQuestion.type)}}</Tag>
            <h4 style="margin: 10px ">题干： {{currentQuestion['content']}}</h4>
            <div class="qlist">
              <div v-for="(item,key,index) in currentQuestion['question']">{{key}}. {{item}}</div>
            </div>
            <Divider/>
            <div v-if="!start">
              <Poptip title="答案" :content="currentQuestion['rightAnswer']">
                <Button type="error">展示答案</Button>
              </Poptip>
              <span class="text-grey">
                设置答题时间：<Input v-model="time" type="number" style="width: 200px;display: inline-block"/> 分钟
              </span>
              <Button type="info" @click="handleStartQuestion">开始计时答题</Button>
            </div>
            <div v-else >
              <span>剩余时间 :{{this.time}} <Progress :percent="leftTime" status="wrong"/></span>
              <Button type="error" size="large" style="margin-right: 20px" @click="handleStopQuestion">结束答题</Button>
            </div>
          </Card>

          <Card class="inner-card">
            <!--答题概况-->
            <div>
              <Title content="答题概况"></Title>
              <ve-pie :data="summaryData"></ve-pie>
            </div>
            <!--正确人员名单-->
            <div>
              <Title content="正确人员名单"></Title>
              <ul class="right-list">
                <li v-for="(item,index) in rightUsers" :key="index">
                  <div class="avatar-wrap">
                    <img src="https://app.teachermate.com.cn/5aea7754/1547642167_oq9PYwu_1MCV-C-XSum3Qgo2JlOM"/>
                  </div>
                  <span class="name">王瑾</span>
                </li>
              </ul>
            </div>
            <!--答案分布-->
            <div>
              <Title content="答案分布"></Title>
              <ve-histogram :data="answerDistributionData"></ve-histogram>
            </div>
            <!--未答题人员名单-->
            <div>
              <Title content="未答题人员名单"></Title>
              <ul class="right-list">
                <li v-for="(item,index) in rightUsers" :key="index">
                  <div class="avatar-wrap">
                    <img src="https://app.teachermate.com.cn/5aea7754/1547642167_oq9PYwu_1MCV-C-XSum3Qgo2JlOM"/>
                  </div>
                  <span class="name">王瑾</span>
                </li>
              </ul>
            </div>
          </Card>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
  import NavBar from "../components/NavBar";
  import Title from '../components/title';
  import {mapGetters, mapActions} from 'vuex'
  import config from '../config';

  export default {
    name: "DoPractice",
    components: {NavBar, Title},
    data() {
      return {
        start: false,
        currentQIndex: -1,
        currentPId: 1,
        showQuestion: false,
        eList: [],
        initTime: 5,
        time: 5,
        rightUsers: [1, 2, 2, 3, 3, 3, 33, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        summaryData: {
          columns: ['类型', '人数'],
          rows: [
            {'类型': '正确', '人数': 3},
            {'类型': '错误', '人数': 5},
          ]
        },
        answerDistributionData: {
          columns: ['选项', '人数'],
          rows: [
            {'选项': 'A', '人数': 1393},
            {'选项': 'B', '人数': 3530},
            {'选项': 'C', '人数': 2923},
            {'选项': 'D', '人数': 1723},
          ]
        },
        currentQuestion: {},
        intvals: null,
        timeout: null
      }
    },
    computed: {
      ...mapGetters(['teacherInfo']),
      leftTime() {
        return Math.floor(100*(this.time / this.initTime*1));
      }
    },
    methods: {
      ...mapActions(['saveWs1237']),
      initSocket() {
        this.socket = new WebSocket(config.urls.studentSocketUrl);
        this.socket && this.saveWs1237(this.socket);

        // 监听socket连接
        this.socket.onopen = this.open;
        // 监听socket错误信息
        this.socket.onerror = this.error;
        // 监听socket消息
        this.socket.onmessage = this.getMessage;
      },
      open() {
        // 登录
        const info = {
          'type': 'publish',
          'tasks': 'login'
        };
        this.socket.send(JSON.stringify(info));
      },
      error() {
      },
      getMessage({data}) {
        let datas = JSON.parse(data)['data'];
        console.log(datas);
        if (datas && !_.isEmpty(datas)) ;
      },
      getType(val) {
        const maps = [
          '单选', '多选', '判断', '简答',
        ];
        return maps[val - 1];
      },
      handleShowQuestion(ins, index) {
        this.showQuestion = true;
        this.currentQuestion = this.eList[ins]['practice'][index];
      },
      getExamList() {
        this.$http.get('practice/getlist', {params: {id: this.$route.query.sku}}).then(rs => {
          if (rs.data.code === 1) {
            this.eList = rs.data.data;
          }
        })
      },
      handleStartQuestion() {
        this.socket.send(JSON.stringify({
          type: 'publish',
          tasks: 'answer',
          sku:this.$route.query.sku,
          name:this.currentQuestion['content'],
          questions: this.currentQuestion['id'],
        }));
        this.start = true;
        this.initTime = this.time;
        this.timeout = setTimeout(() => {
          this.start = false;
          clearTimeout(this.timeout);
          clearInterval(this.intvals);
        }, this.time * 1000);
        this.intvals = setInterval(() => this.time > 0 && --this.time, 1000);
      },

      handleStopQuestion() {
        this.start = false;
        clearTimeout(this.timeout);
        clearInterval(this.intvals);
      },
      handleSelectPractice(current) {
        current = parseInt(current[0]);
        if (this.eList[current] && !this.eList[current]['practice']) {
          this.$http.get('practice/getquestionsbysku', {params: {id: this.eList[current]['id']}}).then(rs => {
            if (rs.data.code === 1) {
              let ret = rs.data.data;
              let qlist = [];
              for (let q of ret) {
                let content = JSON.parse(q['content']);
                q['question'] = JSON.parse(content['questions'].replace(/'/g, "\""));
                q['content'] = content['content'];
                q['rightAnswer'] = content['answer'];
                qlist.push(q);
              }
              this.eList.splice(current, 1, {...this.eList[current], 'practice': qlist});
            }
          })
        }
      }
    },
    mounted() {
      this.getExamList();
      this.initSocket();
    }

  }
</script>

<style lang="less" scoped>
  @keyframes huxi {
    from {
      background-color: #ff403c;
    }
    to {
      background-color: #cd6e70;
    }
  }

  .main {
    width: 100%;
    height: 100%;
    min-height: 700px;

    .main-container {
      height: 100%;
      width: 100%;
      display: flex;
      min-height: 700px;
      justify-content: space-between;
      padding: 20px;

      .left {
        width: 20%;
      }

      .right {
        width: 79%;
        color: #666666;
      }

      .inner-card {
        margin: 16px;

        .qlist {
          font-size: 18px;
          margin-left: 20px;

          & > div {
            margin: 5px;
          }
        }

        .doTime {
          height: 78px;
          /*width: 100%;*/
          /*background-color: rebeccapurple;*/
          display: flex;
          justify-content: space-between;
          align-items: center;
          animation-name: huxi;
          animation-direction: alternate;
          animation-duration: 1s;
          animation-iteration-count: infinite;

          span {
            font-size: 17px;
            color: white;
            line-height: 0;

            span {
              font-size: 20px;
              color: white;
            }

            margin: 10px;
          }

        }

        .right-list {
          margin: 10px;
          display: flex;
          flex-wrap: wrap;

          li {
            list-style: none;
            margin: 10px;

            .avatar-wrap {
              img {
                height: 80px;
                width: 80px;
                border-radius: 50%;
              }
            }

            text-align: center;
            color: #666;
            font-size: 18px;
          }
        }
      }

      /*height: 100%;*/
    }
  }

  .ivu-card-head {
    padding: 0;
  }


</style>
