<template>
  <div class="main_page">
    <NavBar></NavBar>
    <div class="info">
      <div class="header-info">
        <div class="course_info">
          <div>
            <img :src="urlPath" alt="课程">
          </div>
          <div>
            <div><span><Icon size="24" type="md-paper"/>课程名称：{{classDetail.name}}</span></div>
            <div><span><Icon size="24" type="ios-clock"/>课时：{{classDetail.course_t}}课时</span></div>
            <div><span><Icon size="24" type="md-contact"/>班长：{{classDetail.monitor}}</span></div>
            <div><span><Icon size="24" type="ios-happy"/>班级人数：{{classDetail.num}}</span></div>
            <div><span><Icon size="24" type="md-cog"/>上课时间：{{classDetail.week}} - {{classDetail.day}}</span></div>
            <div><span><Icon size="24" type="ios-home"/>教室：{{classDetail.place}}</span></div>
            <div><span><Icon size="24" type="ios-contacts"/>班群QQ：{{classDetail.chat}}</span></div>
          </div>
          <Button @click="begin_class" @mouseover="button_style" @mouseout="button_style1" class="begin_class"
                  type="success">
            <Icon type="ios-people-outline" size="30"/>
            开始上课
          </Button>

        </div>
      </div>
      <div class="course_upload">
        <div class="course_upload_detail course_upload_left">
          <span><Icon type="md-school" size="40"/>课程信息</span>
          <hr>
          <Collapse simple>
            <Panel name="1">
              <Icon type="md-menu" size="30" color="pink"/>
              <span class="panel-title">课程介绍</span>
              <p slot="content">{{classDetail.introduce}}</p>
            </Panel>
            <Panel name="2">
              <Icon type="ios-list-box" size="30" color="LightGreen"/>
              <span class="panel-title">课程目标</span>
              <p slot="content">{{classDetail.target}}</p>
            </Panel>
            <Panel name="3">
              <Icon type="ios-calendar" size="30" color="PaleTurquoise"/>
              <span class="panel-title">课程计划</span>
              <p slot="content">{{classDetail.plan}}</p>
            </Panel>
            <Panel name="4">
              <Icon type="ios-school" size="30" color="LightSalmon"/>
              <span class="panel-title">评估方式</span>
              <p slot="content">{{classDetail.evaluation}} </p>
            </Panel>
          </Collapse>
        </div>
        <div class="course_upload_detail course_upload_right">
          <span><Icon type="ios-paper" size="40"/>资料库</span>
          <hr>
          <Collapse simple>
            <Panel name="5">
              <Icon type="ios-browsers" size="30" color="pink"/>
              <span class="panel-title">课件</span>
              <div slot="content">
                <CellGroup >
                  <Cell v-for="(item,index) in courseWare" :key="index" :title="`${item.name}`"  extra="查看详情" :to="`#/docPreview?url=${publicPath}${item.url}`" target="_blank" />
                </CellGroup>
              </div>
            </Panel>
            <Panel name="6">
              <Icon type="ios-book" size="30" color="LightGreen"/>
              <span class="panel-title">资料</span>
              <div slot="content">
                  <CellGroup >
                    <Cell v-for="(item,index) in docList" :key="index" :title="`${item.name}`"  extra="查看详情" :to="`#/docPreview?url=${publicPath}${item.url}`" target="_blank" />
                  </CellGroup>
              </div>
            </Panel>
            <Panel name="7">
              <Icon type="ios-checkbox" size="30" color="PaleTurquoise"/>
              <span class="panel-title">测验</span>
              <div slot="content">
                <CellGroup >
                  <Cell v-for="(item,index) in examList" :key="index" :title="`${item.name}`"  extra="查看详情" to="https://www.baidu.com" target="_blank" />
                </CellGroup>
              </div>
            </Panel>
            <Panel name="8">
              <Icon type="ios-cloud" size="30" color="LightSalmon"/>
              <span class="panel-title">题库</span>
              <div slot="content">
                <CellGroup >
                  <Cell v-for="(item,index) in qBaseList" :key="index" :title="`${item.name}`"  extra="查看详情" :to="`/courseDetail/${item.id}/${item.name}`" target="_blank" />
                </CellGroup>
              </div>
            </Panel>
          </Collapse>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import NavBar from "../components/NavBar";
  import {Panel, Collapse, Upload, Button} from 'iview'
  import {mapGetters,mapActions} from 'vuex';
  import config from '../config'

  export default {
    name: "CourseInfo",
    components: {NavBar, Panel, Collapse, Upload},
    computed: {
      ...mapGetters(['teacherInfo']),
      urlPath(){
        return config.urls.picUrl + this.classDetail.path;
      },
      publicPath() {
        return config.urls.publicUrl;
      },
      courseWare() {
        if (this.classDetail['document']) {
          return this.classDetail['document'].filter(x => x.public === 0);
        }else {
          return [];
        }
      },
      //瑾瑾是世界上最可爱的女孩子
      //瑾瑾最好看了   身上也香香的    我好喜欢他啊
      //我要做一个乖宝宝   听瑾瑾话
      docList() {
        if (this.classDetail['document']) {
          return this.classDetail['document'].filter(x => x.public === 1);
        }else {
          return [];
        }
      },
      qBaseList() {
        return this.classDetail['qbase'];
      },
      examList() {
        return this.classDetail['exam'];
      }
    },
    data() {
      return {
        classDetail: {},
      }
    },
    methods: {
      ...mapActions(['saveDocument']),
      begin_class() {
        this.$router.push(`/classBegin?id=${this.$route.params.id}`)
      },
      button_style(e) {
        e.target.style.boxShadow = '2px 2px 5px #B35A3E'
      },
      button_style1(e) {
        e.target.style.boxShadow = 'none'
      },
      getDetail() {
        this.$http.get(`course/getDetail/id/${this.$route.params.id}`)
          .then(res => {
            if (res.data.code === 1) {
              this.classDetail = res.data.data;
              this.saveDocument(res.data.data.document);
            }
          })
      }
    },
    mounted() {
      this.getDetail();
    }
  }
</script>


<style lang="less" scoped>

  .main_page {
    height: 95%;
    width: 100%;
    min-height: 650px;
  }

  .info {
    width: 100%;
    height: 100%;
    background-color: #e5e5e5;
    position: relative;

    .header-info {
      background-color: rebeccapurple;
      min-height:  50%;
      height: 50%;
      width: 100%;
    }

    .course_info {
      height: 100%;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      & > div {
        width: 40%;
        box-sizing: border-box;

        &:nth-child(1) {
          text-align: center;

          img {
            border-radius: 4px;
            height: 50%;
            width: 65%;
          }

        }

        &:nth-child(2) {
          font-size: 20px;
          color: #ffffff;
          position: relative;
          width: 25%;

          & > div {
            border-bottom: 1px white dashed;
            margin-bottom: 7px;
          }
        }
      }

      .begin_class {
        height: 50px;
        font-size: 18px;
        margin-left: 5%;
        margin-top: 11%;
      }
    }

    .black_bg {
      height: 320px;
      width: 100%;
      text-align: center;
      position: absolute;
      top: 0;
      left: 0;
    }

    .course_picture {
      display: inline-block;
      width: 36%;
      height: 95%;
      float: left;

      img {
        display: inline-block;
        height: 100%;
        width: 100%;
        border-radius: 9px;
      }
    }

    .course_describe {
      font-size: 16px;
      display: inline-block;
      float: left;
      width: 50%;

      & > div {
        color: white;
        width: 90%;
        height: 30px;
        margin-left: 30px;
        border-bottom: 1px white dashed;
        margin-top: 10px;

        span {
          line-height: 25px;
          word-break: break-all;
        }
      }
    }

  }

  .course_upload {
    display: flex;
    width: 100%;
    justify-content: space-around;
    margin-top: 2%;
    background-color: #e5e5e5;
    padding-bottom: 30px;

    .course_upload_detail {
      background-color: white;
      min-height: 400px;
      padding: 30px;
      border-radius: 2%;
      width: 40%;

      span {
        font-size: 20px;
        color: black;
      }
    }

    .course_upload_right {
      float: right;

      .describe_right {
        margin-left: 35px;

      }
    }
  }


</style>
