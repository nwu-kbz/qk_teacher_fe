<template>
  <div class="main_page">
    <div class="main">
      <Card class="left">
        <!--功能模块-->
        <div class="toolbox">
          <div class="tool-item" v-for="(item,index) in toolsMenu" :key="index">
            <div>
              <Icon :type="item.icon" size="40" :color="item.color"/>
              <router-link v-if="item.url.startsWith('/')" :to="`${item.url}?sku=${$route.query.id}`"><h4>
                {{item.name}}</h4></router-link>
              <h4 v-else @click="handleShowStudent">{{item.name}}</h4>
            </div>
          </div>
        </div>

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
      </Card>
      <Card class="right">
        <h2 v-if="!url">请在右侧选择课件进行展示</h2>
        <iframe v-if="office" width="100%" height="100%"
                :src="`https://view.officeapps.live.com/op/view.aspx?src=${url}`"></iframe>
        <iframe v-if="pdf" width="100%" height="100%"
                :src="`./static/pdf/web/viewer.html?file=`+encodeURIComponent(url)"></iframe>
        <video v-if="video" :src="url" width="100%" height="100%" controls></video>
      </Card>
      <Modal v-model="studentModal" title="学生列表" width="80%">
        <Table :columns="stuCols" :data="studentList"></Table>
      </Modal>
    </div>
  </div>
</template>

<script>
  import NavBar from "../components/NavBar";
  import {Cell, CellGroup, Card, Collapse, Panel, ButtonGroup} from 'iview' ;
  import {mapGetters, mapActions} from 'vuex';
  import config from '../config';
  import _ from 'lodash';

  export default {
    name: "ClassBegin",
    components: {NavBar, Cell, CellGroup, Card, Collapse, Panel, ButtonGroup},
    computed: {
      ...mapGetters(['documents', 'studentList']),
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
      video() {
        return this.url && this.url.endsWith('mp4');
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
        studentModal: false,
        toolsMenu: [
          {name: "签到", color: "#9226b0", icon: "ios-analytics", url: "/signin"},
          {name: "分组", color: "#e54d42", icon: "md-apps", url: "/group"},
          {name: "学生", color: "#fbbd08", icon: "ios-filing", url: "handleShowStudent"},
          {name: "答题", color: "#39b54a", icon: "ios-paper", url: "/doPractice"},
          {name: "讨论", color: "#1cbbb4", icon: "logo-reddit", url: "/discuss"},
          {name: "点答", color: "#0081ff", icon: "md-stats", url: "/point"},
        ]
      }
    },
    methods: {
      getStudentList() {
        if (!this.studentList || this.studentList.length === 0) {
          this.$http.get('/students/getUserList', {params: {id: this.$route.query.id}}).then(res => {
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
              if (!this.document || _.isEmpty(this.document)) {
                this.$http.get('/document/getDocumentBySku', {params: {id: this.$route.query.id}}).then(res => {
                  if (res.data.code === 1) {
                    this.saveDocument(res.data.data);
                    res.data.data.map(doc => {
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
                  }
                })
              }

            } else {
              this.$Message.error(res.data.msg);
            }
          })
      },
      handleShowWare(url) {
        if (url) {
          this.url = this.publicUrl + url;
        }
      },
      ...mapActions(['saveStudentList', 'saveDocument'])
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
      h4 {
        color: #2d2d2d;
      }

      h4:hover {
        cursor: pointer;
      }

      height: 100%;
      width: 100%;
      display: flex;
      min-height: 700px;
      justify-content: space-between;
      padding: 20px;

      .left {
        width: 18%;

        .row {
          margin-bottom: 2px;
        }

        .toolbox {
          width: 100%;
          height: 200px;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;

          .tool-item {
            width: 30%;
            height: 30%;
            text-align: center;

            & > div {
              height: 100%;
              width: 100%;
            }
          }
        }
      }

      .right {
        width: 81%;

        iframe {
          min-height: 872px;
        }

        h2 {
          line-height: 500px;
          text-align: center;
          font-size: 40px;
        }
      }

    }
  }

</style>
