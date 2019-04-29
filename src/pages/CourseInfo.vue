<template>
  <div class="main_page">
    <NavBar></NavBar>
    <div class="info">
      <!--<div class="bg bg-blur"></div>-->
      <!--<div class="black_bg"></div>-->
      <div class="header-info">
        <div class="course_info">
          <div>
            <img src="../assets/course.jpg" alt="课程">
            <Button @click="begin_class" @mouseover="button_style" @mouseout="button_style1" class="begin_class"
                    type="success">
              <Icon type="ios-people-outline" size="30"/>
              开始上课
            </Button>
          </div>
          <div>
            <div><span><Icon size="24" type="md-paper"/>课程名称：{{classDetail.name}}</span></div>
            <div><span><Icon size="24" type="ios-clock"/>课时：{{classDetail.course_t}}课时</span></div>
            <div><span><Icon size="24" type="md-contact"/>班长：{{classDetail.leader}}</span></div>
            <div><span><Icon size="24" type="ios-happy"/>班级人数：{{classDetail.num}}</span></div>
            <div><span><Icon size="24" type="md-cog"/>上课时间：{{classDetail['baseinfo'][0].week}}-{{classDetail['baseinfo'][0].day}}</span></div>
            <div><span><Icon size="24" type="ios-home"/>教室：{{classDetail['baseinfo'][0].place}}</span></div>
            <div><span><Icon size="24" type="ios-contacts"/>班群QQ：{{classDetail.chat}}</span></div>
          </div>

        </div>
      </div>
      <div class="course_upload">
        <div class="course_upload_detail course_upload_left">
          <span><Icon type="md-school" size="40"/>课程信息</span>
          <hr>
          <Collapse simple>
            <Panel name="1">
              <Icon type="md-menu" size="30" color="pink"/>
              课程介绍
              <p slot="content">{{classDetail.introduce}}</p>
            </Panel>
            <Panel name="2">
              <Icon type="ios-list-box" size="30" color="LightGreen"/>
              课程目标
              <p slot="content">{{classDetail.target}}</p>
            </Panel>
            <Panel name="3">
              <Icon type="ios-calendar" size="30" color="PaleTurquoise"/>
              课程计划
              <p slot="content">{{classDetail.plan}}</p>
            </Panel>
            <Panel name="4">
              <Icon type="ios-school" size="30" color="LightSalmon"/>
              评估方式
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
              课件

              <div slot="content" class="describe_right">
                <Upload
                        multiple
                        action="//jsonplaceholder.typicode.com/posts/">
                  <Button icon="ios-cloud-upload-outline">Upload files</Button>
                </Upload>
              </div>
              <div slot="content" class="describe_right">
                课件1
              </div>
              <div slot="content" class="describe_right">
                课件2
              </div>

            </Panel>
            <Panel name="6">
              <Icon type="ios-book" size="30" color="LightGreen"/>
              资料
              <p slot="content">斯蒂夫·盖瑞·沃兹尼亚克（Stephen Gary
                Wozniak），美国电脑工程师，曾与史蒂夫·乔布斯合伙创立苹果电脑（今之苹果公司）。斯蒂夫·盖瑞·沃兹尼亚克曾就读于美国科罗拉多大学，后转学入美国著名高等学府加州大学伯克利分校（UC
                Berkeley）并获得电机工程及计算机（EECS）本科学位（1987年）。</p>
            </Panel>
            <Panel name="7">
              <Icon type="ios-checkbox" size="30" color="PaleTurquoise"/>
              测验
              <p slot="content">
                乔纳森·伊夫是一位工业设计师，现任Apple公司设计师兼资深副总裁，英国爵士。他曾参与设计了iPod，iMac，iPhone，iPad等众多苹果产品。除了乔布斯，他是对苹果那些著名的产品最有影响力的人。</p>
            </Panel>
            <Panel name="8">
              <Icon type="ios-cloud" size="30" color="LightSalmon"/>
              题库
              <p slot="content">
                乔纳森·伊夫是一位工业设计师，现任Apple公司设计师兼资深副总裁，英国爵士。他曾参与设计了iPod，iMac，iPhone，iPad等众多苹果产品。除了乔布斯，他是对苹果那些著名的产品最有影响力的人。</p>
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

  export default {
    name: "CourseInfo",
    components: {NavBar, Panel, Collapse, Upload},
    data() {
      return {
        classDetail: {}
      }
    },
    methods: {
      begin_class() {
        this.$router.push('/classBegin')
      },
      button_style(e) {
        e.target.style.boxShadow = '2px 2px 5px #B35A3E'
      },
      button_style1(e) {
        e.target.style.boxShadow = 'none'
      }
    },
    //http://qk.heniankj.com/public/index.php/home/coursedetail/getdetailbyid/id/4
    mounted() {
      // console.log(this.$route.params.id);
      this.$http.get(`coursedetail/getdetailbyid/id/${this.$route.params.id}`)
          .then(res => {
            this.classDetail = res.data.data;
            console.log(this.classDetail);

          })


    }
  }
</script>


<style lang="less" scoped>

  .main_page {
    height: 95%;
    width: 100%;
  }

  .info {
    width: 100%;
    height: 100%;
    background-color: #e5e5e5;
    position: relative;
    .header-info {
      background-color: rebeccapurple;
      height: 50%;
      width: 100%;
    }
    .course_info {
      height: 100%;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      &>div{
        width: 40%;
        box-sizing: border-box;
        &:nth-child(1){
          text-align: right;
          position: relative;

          img{
            border-radius: 4px;
            &:hover{
              filter: blur(10px);
            }
          }
          .begin_class{
            top: 45%;
            left: 45%;
            position: absolute;
            height: 50px;
            font-size: 18px;
          }
        }
        &:nth-child(2){
          font-size: 20px;
          color: #ffffff;
          padding-left: 4%;
          &>div{
            border-bottom: 1px white dashed;
            margin-bottom: 7px;
          }
        }

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
      &>div {
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
        font-size: 30px;
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
