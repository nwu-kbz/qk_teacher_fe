<template>
  <div class="main_page">
    <NavBar></NavBar>
    <div class="info">
      <div class="bg bg-blur"></div>
      <div class="black_bg"></div>
      <div class="course_info">
        <div class="course_picture">
          <img src="../assets/course.jpg">
        </div>
        <div class="course_describe">
          <div class="describe1"><span>课程名：程序设计语言</span></div>
          <div class="describe1"><span>课时：54课时</span></div>
          <div class="describe1"><span>班长：张小明</span></div>
          <div class="describe1"><span>班级人数：40人</span></div>
          <div class="describe1"><span>上课时间：周二8:00-10:00，周四10:00-12:00</span></div>
          <div class="describe1"><span>教室：1-3505</span></div>
          <div class="describe1"><span>班群QQ：352689452</span></div>
        </div>
        <button @click="begin_class" @mouseover="button_style" @mouseout="button_style1" class="begin_class">
          <Icon type="ios-people-outline" size="24"/>  开始上课</button>
      </div>
      <div class="course_upload">
        <div class="course_upload_detail course_upload_left">
          <span>课程信息</span>
          <hr>
          <Collapse simple>
            <Panel name="1">
              <Icon type="md-menu" size="20" color="pink"/>
              课程介绍
              <p slot="content">
                程序设计是一门基础课程。对于计算机相关专业而言，程序设计是专业基础知识，是进一步学习其他专业知识的第一步阶梯；对于非计算机专业而言，程序设计的学习有助于理解计算机的能力所在，理解哪些是计算机擅长解决的问题，怎样的方式方法是计算机擅长的手段，从而能更好地利用计算机来解决本专业领域内的问题。程序设计是一门基础课程。对于计算机相关专业而言，程序设计是专业基础知识，是进一步学习其他专业知识的第一步阶梯；对于非计算机专业而言，程序设计的学习有助于理解计算机的能力所在，理解哪些是计算机擅长解决的问题，怎样的方式方法是计算机擅长的手段，从而能更好地利用计算机来解决本专业领域内的问题。</p>
            </Panel>
            <Panel name="2">
              <Icon type="ios-list-box" size="20" color="LightGreen"/>
              课程目标
              <p slot="content">斯蒂夫·盖瑞·沃兹尼亚克（Stephen Gary
                Wozniak），美国电脑工程师，曾与史蒂夫·乔布斯合伙创立苹果电脑（今之苹果公司）。斯蒂夫·盖瑞·沃兹尼亚克曾就读于美国科罗拉多大学，后转学入美国著名高等学府加州大学伯克利分校（UC
                Berkeley）并获得电机工程及计算机（EECS）本科学位（1987年）。</p>
            </Panel>
            <Panel name="3">
              <Icon type="ios-calendar" size="20" color="PaleTurquoise"/>
              课程计划
              <p slot="content">
                乔纳森·伊夫是一位工业设计师，现任Apple公司设计师兼资深副总裁，英国爵士。他曾参与设计了iPod，iMac，iPhone，iPad等众多苹果产品。除了乔布斯，他是对苹果那些著名的产品最有影响力的人。</p>
            </Panel>
            <Panel name="4">
              <Icon type="ios-school" size="20" color="LightSalmon"/>
              评估方式
              <p slot="content">
                乔纳森·伊夫是一位工业设计师，现任Apple公司设计师兼资深副总裁，英国爵士。他曾参与设计了iPod，iMac，iPhone，iPad等众多苹果产品。除了乔布斯，他是对苹果那些著名的产品最有影响力的人。</p>
            </Panel>
          </Collapse>
        </div>
        <div class="course_upload_detail course_upload_right">
          <span>资料库</span>
          <hr>
          <Collapse simple>
            <Panel name="5">
              <Icon type="ios-browsers" size="20" color="pink"/>
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
              <Icon type="ios-book" size="20" color="LightGreen"/>
              资料
              <p slot="content">斯蒂夫·盖瑞·沃兹尼亚克（Stephen Gary
                Wozniak），美国电脑工程师，曾与史蒂夫·乔布斯合伙创立苹果电脑（今之苹果公司）。斯蒂夫·盖瑞·沃兹尼亚克曾就读于美国科罗拉多大学，后转学入美国著名高等学府加州大学伯克利分校（UC
                Berkeley）并获得电机工程及计算机（EECS）本科学位（1987年）。</p>
            </Panel>
            <Panel name="7">
              <Icon type="ios-checkbox" size="20" color="PaleTurquoise"/>
              测验
              <p slot="content">
                乔纳森·伊夫是一位工业设计师，现任Apple公司设计师兼资深副总裁，英国爵士。他曾参与设计了iPod，iMac，iPhone，iPad等众多苹果产品。除了乔布斯，他是对苹果那些著名的产品最有影响力的人。</p>
            </Panel>
            <Panel name="8">
              <Icon type="ios-cloud" size="20" color="LightSalmon"/>
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
  import {Panel, Collapse, Upload} from 'iview'

  export default {
    name: "CourseInfo",
    components: {NavBar, Panel, Collapse, Upload},
    methods:{
      begin_class(){
        this.$router.push('/classBegin')
      },
      button_style(e){
        e.target.style.boxShadow = '2px 2px 5px #B35A3E'
      },
      button_style1(e){
        e.target.style.boxShadow = 'none'
      }
    }
  }
</script>


<style lang="less" scoped>

  .main_page {
    height: auto;
    width: 100%;
    background-color: #f5f5f5;

  }

  .info {
    width: 100%;
    height: 1700px;
    position: relative;
    .course_info {
      /*width: 900px;*/
      height: 220px;
      position: absolute;
      top: 3%;
      left: 22%;
      /*margin-left: -300px;*/
      /*margin-top: -300px;*/
      .begin_class{
        font-size: 14px;
        color: white;
        position: absolute;
        bottom: 3%;
        right: 1%;
        display: inline-block;
        border: none;
        width: 12%;
        float: right;
        height: 16%;
        background-color: rgba(255, 126, 81, 0.8);
      }
    }

    .black_bg {
      height: 320px;
      width: 100%;
      text-align: center;
      /*background-color: rgba(0, 0, 0, 0.28);*/
      position: absolute;
      top: 0;
      left: 0;
    }
    .bg {
      float: left;
      background: url("../assets/class_bg.png") no-repeat;
      background-size: 100% 20%;
      height: 320px;
      width: 100%;
      text-align: center;
    }

    .bg-blur {
      /*float: left;*/
      width: 100%;
      height: 320px;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      -webkit-filter: blur(3px);
      -moz-filter: blur(3px);
      -o-filter: blur(3px);
      -ms-filter: blur(3px);
      filter: blur(3px);
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
      }
    }
    .course_describe {
      font-size: 16px;
      display: inline-block;
      float: left;
      width: 50%;
      .describe1 {
        color: white;
        width: 90%;
        height: 30px;
        margin-left: 30px;
        border-bottom: 1px white dashed;
        span {
          line-height: 25px;
          word-break: break-all;
        }
      }
    }

  }

  .course_upload {

    display: block;
    width: 70%;
    /*height: 45%;*/
    padding: 20px;
    margin: 20px auto;
    position: absolute;
    top: 20%;
    left: 15%;
    .course_upload_detail {
      background-color: white;
      height: 95%;
      padding: 20px;
      display: inline-block;
      float: left;
      width: 45%;
      span {
        font-size: 30px;
      }
    }
    .course_upload_right {
      float: right;
      .describe_right{
        margin-left: 35px;

      }
    }
  }



</style>