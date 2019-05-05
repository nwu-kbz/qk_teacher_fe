<template>
  <div class="main_page">
    <NavBar></NavBar>
    <div class="main">
      <div class='courseware'>
        <!--功能模块-->
        <Row class="row">
          <Col span="8">
            <Card style="width:92%">
              <div style="text-align:center">
                <Icon type="ios-analytics" size="40" color="#9c26b0"/>
                <router-link to="/signin"><h4>签到</h4></router-link>
              </div>
            </Card>
          </Col>
          <Col span="8">
            <Card style="width:92%">
              <div style="text-align:center">
                <Icon type="md-apps"  size="40" color="#e54d42"/>
                <router-link to="/group"><h4>分组</h4></router-link>
              </div>
            </Card>
          </Col>
          <Col span="8">
            <Card style="width:92%">
              <div style="text-align:center">
                <Icon type="ios-filing"size="40" color="#fbbd08" />
                <h4 @click="handleShowStudent">学生</h4>
              </div>
            </Card>
          </Col>
        </Row>
        <Row class="row">
          <Col span="8">
            <Card style="width:92%">
              <div style="text-align:center">
                <Icon type="ios-paper" size="40" color="#39b54a" />
                <router-link :to="`/doPractice?sku=${$route.query.id}`"><h4>答题</h4></router-link>
              </div>
            </Card>
          </Col>
          <Col span="8">
            <Card style="width:92%">
              <div style="text-align:center">
                <Icon type="logo-reddit" size="40" color="#1cbbb4"/>
                <router-link to="/discuss"><h4>讨论</h4></router-link>
              </div>
            </Card>
          </Col>
          <Col span="8">
            <Card style="width:92%">
              <div style="text-align:center">
                <Icon type="md-stats" size="40" color="#0081ff"/>
                <router-link to="/point"><h4>点答</h4></router-link>
              </div>
            </Card>
          </Col>
        </Row>
        <!-- 章节列表-->
        <Collapse simple>
          <Panel :name="index+''" v-for="(item,index) in chapter" :key="index">
            <span class="chapter_title">第{{index+1}}章：{{item.name}}</span>
            <p slot="content">
              <CellGroup>
                <span v-for="(doc,index) in item.docs" :key="index" @click="handleShowWare(doc.url)">
                  <Cell :title="`${doc.name}`"/>
                </span>
              </CellGroup>
            </p>
          </Panel>
        </Collapse>
      </div>
      <div class="show_area">
        <div class="show_courseware">
          <h2 v-if="!url">请在右侧选择课件进行展示</h2>
          <iframe v-if="office" width="100%" height="100%"
                  :src="`https://view.officeapps.live.com/op/view.aspx?src=${url}`"></iframe>
          <iframe v-if="pdf" width="100%" height="100%" :src="`./static/pdf/web/viewer.html?file=${url}`"></iframe>
        </div>
      </div>
      <Modal v-model="studentModal" title="学生列表" width="80%">
        <Table :columns="stuCols" :data="studentList"></Table>
      </Modal>
    </div>
  </div>
</template>

<script>
  import NavBar from "../components/NavBar";
  import {Cell, CellGroup, Card, Collapse, Panel, ButtonGroup} from 'iview' ;
  import {mapGetters,mapActions} from 'vuex';
  import config from '../config';

  export default {
    name: "ClassBegin",
    components: {NavBar, Cell, CellGroup, Card, Collapse, Panel, ButtonGroup},
    computed: {
      ...mapGetters(['documents','studentList']),
      publicUrl() {
        return config.urls.publicUrl;
      },
      office() {
        let format = ['ppt', 'pptx', 'doc', 'docx', 'xls', 'xlsx'];
        return this.url && format.some(f => this.url.endsWith(f));
      },
      pdf() {
        return this.url && this.url.endsWith('pdf');
      },
    },
    data() {
      return {
        stuCols: [
          {title: 'Id', key: 'id'},
          {title: '姓名', key: 'nickname'},
          {title: '用户名', key: 'username'},
          {title: '学号', key: 'number'},
          {title: '邮箱', key: 'email'},
          {title: '手机号', key: 'mobile'},
        ],
        url: '',
        chapter: [],
        studentModal: false
      }
    },
    methods: {
      getStudentList() {
        if (!this.studentList || this.studentList.length === 0) {
          this.$http.get('/students/getUserList',{params: {id: this.$route.query.id}}).then(res => {
            if (res.data.code === 1) {
              this.saveStudentList(res.data.data);
            }
          });
        }
      },
      handleShowStudent() {
        this.studentModal = true;
      },
      getChapters() {
        this.$http.get('/chapter/getChapterByCourse', {params: {id: this.$route.query.id}})
          .then(res => {
            if (res.data.code === 1) {
              let chapter = res.data.data;
              this.documents.map(doc => {
                chapter.map(cha => {
                  if (doc.chapter + '' === cha.id + '') {
                    if (!cha['docs']) {
                      cha['docs'] = [];
                    } else {
                      cha['docs'].push(doc);
                    }
                  }
                })
              });

              this.chapter = chapter.sort((x, y) => x.sort - y.sort);
            } else {
              this.$Message.error(res.data.msg);
            }
          })
      },
      handleShowWare(url) {
        this.url = this.publicUrl + url;
      },
      ...mapActions(['saveStudentList'])
    },
    mounted() {
      this.getChapters();
      this.getStudentList();
    }
  }
</script>

<style lang="less" scoped>
  .main_page {
    width: 100%;
    height: 100%;
    min-height: 700px;
    background: #e5e5e5;

    .main {
      h4{
        color: #2d2d2d;
      }
      h4:hover{
        cursor: pointer;
      }
      height: 100%;
      width: 100%;
      display: flex;
      min-height: 700px;
      justify-content: space-between;

      .courseware {
        width: 18%;
        height: 100%;
        background-color: #fff;

        .row{
          margin: 3%;
        }

        .chapter_title {
          font-size: 18px;
        }
      }

      .show_area {
        width: 80%;
        height: 100%;
        margin-top: 3px;
        min-height: 600px;
        /*background-color: #fff;*/

        .show_courseware {
          background-color: #515a6e;
          height: 95%;
          width: 97%;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          margin: auto;
          text-align: center;

          h2 {
            color: #dfdfdf;
            line-height: 500px;
          }
        }
      }

    }
  }

</style>
