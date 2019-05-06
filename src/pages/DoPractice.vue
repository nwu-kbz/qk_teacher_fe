<template>
  <div class="main bg-grey">
    <!--题目列表-->
    <div class="main-container">
      <div>
        <Card title="题目列表" icon="ios-options" :padding="0" shadow>
          <Collapse simple @on-change="handleSelectPractice">
            <Panel :name="ins" v-for="(prac,ins) in eList" :key="ins">
              {{prac.name}}
              <p slot="content">
                <CellGroup>
                  <span v-for="(item,index) in prac['practice']" :key="index"><Cell :title="item.content"/></span>
                </CellGroup>
              </p>
            </Panel>
          </Collapse>

        </Card>
      </div>
      <!--题目详情-->
      <div>
        <Card title="题目详情" icon="ios-options" :padding="0" shadow style="width: 100%">
          <!--题目概况-->
          <Card class="inner-card">
            <Tag type="dot" color="success">{{currentQ.type}}</Tag>
            <h4>{{currentQ.content}}</h4>
            <div class="qlist">
              <div v-for="(item,key,index) in currentQ.answer">{{key}}. {{item}}</div>
            </div>
            <Divider/>
            <div v-if="!start">
              <Poptip title="答案" :content="currentQ.rightAnswer">
                <Button type="error">展示答案</Button>
              </Poptip>
              <span class="text-grey">
                设置答题时间：<Input v-model="time" type="number" style="width: 200px;display: inline-block"/> 分钟
              </span>
              <Button type="info" @click="handleStartQuestion">开始计时答题</Button>
            </div>
            <div v-else class="doTime">
              <span>剩余时间 <span>{{leftTime}}</span></span>
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
        </Card>
      </div>
    </div>
  </div>
</template>

<script>
  import NavBar from "../components/NavBar";
  import {Card} from 'iview'
  import Title from '../components/title';
  import {mapGetters, mapActions} from 'vuex'

  export default {
    name: "DoPractice",
    components: {NavBar, Title},
    data() {
      return {
        start: false,
        currentQIndex: -1,
        currentPId: 1,
        eList: [],
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
        }
      }
    },
    computed: {
      ...mapGetters(['teacherInfo']),
      currentQ() {
        if (this.currentQIndex>0) {
          return this.qList[this.currentQIndex] || {};
        }else {
          return {};
        }
      }
    },
    methods: {
      ...mapActions([]),
      getExamList() {
        this.$http.get('practice/getlist', {params: {id: this.$route.query.sku}}).then(rs => {
          if (rs.data.code === 1) {
            this.eList = rs.data.data;
          }
        })
      },
      handleStartQuestion() {
        this.start = true;
      },

      handleStopQuestion() {
        this.start = false;
      },
      handleSelectPractice(current) {
        current = parseInt(current[0]);
        if (!this.eList[current]['practice']) {
          this.$http.get('practice/getquestionsbysku', {params: {id: this.eList[current]['id']}}).then(rs => {
            if (rs.data.code === 1) {
              let ret = rs.data.data;
              let content = JSON.parse(ret['content']);
              ret['content'] = content['content'];
              ret['question'] = JSON.parse(content['question']);
              ret['rightAnswer'] = content['answer'];
              this.eList[current]['practice'] = ret;
            }
          })
        }
      }
    },
    mounted() {
      this.getExamList();
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
    min-height: 100%;

    .main-container {
      margin: 20px;
      width: 100%;
      display: flex;

      & > div:nth-child(1) {
        width: 18%;
      }

      & > div:nth-child(2) {
        width: 78%;
        margin-left: 20px;
      }

      .inner-card {
        margin: 16px;

        .doTime {
          height: 78px;
          width: 100%;
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
