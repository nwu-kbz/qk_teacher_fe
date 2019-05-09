<template>
  <div class="main_page">
    <div class="info">
      <Card dis-hover class="card">
        <div class="header-info">
          <div class="course_info">
            <div class="course_picture">
              <img :src="urlPath" alt="课程">
            </div>
            <div class="course_describe">
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
            <Button @click="handleGotoQBase" @mouseover="button_style" @mouseout="button_style1" class="begin_class"
                    type="info">
              <Icon type="ios-people-outline" size="30"/>
              资料库
            </Button>

          </div>
        </div>
      </Card>
      <Card dis-hover class="card">
        <Tabs>
          <TabPane label="课程介绍" icon="logo-apple">
            {{classDetail.introduce}}
          </TabPane>
          <TabPane label="课程目标" icon="logo-windows">
            {{classDetail.target}}
          </TabPane>
          <TabPane label="课程计划" icon="logo-tux">
            {{classDetail.plan}}
          </TabPane>
          <TabPane label="评估方式" icon="logo-tux">
            {{classDetail.evaluation}}
          </TabPane>
          <TabPane label="课件" icon="logo-tux">
            <CellGroup>
              <Cell v-for="(item,index) in courseWare" :key="index" :title="`${item.name}`" extra="查看详情"
                    :to="`#/docPreview?url=${publicPath}${item.url}`" target="_blank"/>
            </CellGroup>
          </TabPane>
          <TabPane label="资料" icon="logo-tux">
            <CellGroup>
              <Cell v-for="(item,index) in docList" :key="index" :title="`${item.name}`" extra="查看详情"
                    :to="`#/docPreview?url=${publicPath}${item.url}`" target="_blank"/>
            </CellGroup>
          </TabPane>
          <TabPane label="测验" icon="logo-tux">
            <CellGroup>
              <Cell v-for="(item,index) in examList" :key="index" :title="`${item.name}`" extra="查看详情"
                    :to="`/examDetail?id=${item.id}`" target="_blank"/>
            </CellGroup>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  </div>
</template>

<script>
  import NavBar from "../components/NavBar";
  import {Panel, Collapse, Upload, Button} from 'iview'
  import {mapGetters, mapActions} from 'vuex';
  import config from '../config'

  export default {
    name: "CourseInfo",
    components: {NavBar, Panel, Collapse, Upload},
    computed: {
      ...mapGetters(['teacherInfo', 'courseList']),
      urlPath() {
        return config.urls.picUrl + this.classDetail.path;
      },
      publicPath() {
        return config.urls.publicUrl;
      },
      courseWare() {
        if (this.classDetail['document']) {
          return this.classDetail['document'].filter(x => x.public === 0);
        } else {
          return [];
        }
      },
      docList() {
        if (this.classDetail['document']) {
          return this.classDetail['document'].filter(x => x.public === 1);
        } else {
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
      handleGotoQBase() {
        const sku = this.$route.params.id;
        const currentCourse = this.courseList.find(x => x.id + '' === sku + '');
        this.$router.push(`/courseDetail/${sku}/${currentCourse['name']}`)
      },
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
    position: relative;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    .card {
      width: 95%;
      margin: 5px;

      &:nth-child(2) {
        font-size: 24px;
      }
    }

    .header-info {
      min-height: 70%;
      height: 70%;
      width: 100%;
    }

    .course_info {
      height: 100%;
      width: 95%;
      display: flex;
      justify-content: center;
      align-items: center;
      .course_describe {
        margin-top: 100px;

      }
      & > div {
        width: 40%;
        box-sizing: border-box;
        margin: 20px 0;

        &:nth-child(1) {
          text-align: center;

          img {
            border-radius: 4px;
            height: 400px;
            width: 400px;
          }

        }

        &:nth-child(2) {
          font-size: 20px;
          /*color: #ffffff;*/
          position: relative;
          width: 25%;

          & > div {
            border-bottom: 1px #666666 dashed;
            margin-bottom: 7px;
          }
        }
      }

      .begin_class {
        height: 50px;
        font-size: 18px;
        margin-left: 3%;
        margin-top: 25%;
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
