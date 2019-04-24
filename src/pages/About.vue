<template>
  <div>
    <div class="about-page">
      <NavBar ref="navBar" menus=""></NavBar>
      <div class="top_img">
        <img src="../../src/assets/bg.jpg">
      </div>
      <div class="product_feature">
        <div class="feature" v-for="(item,index) in [1,2,3,4]" :class="`feature${item}`"
             @mouseenter="changeIconIn(index)" @mouseleave="changeIconOut(index)">
          <div class="hoverImg">
            <img :src="iconArr[index]">
            <div class="describe"><h3>{{info[index].summary}}</h3></div>
            <h5 class="details">{{info[index].details}}</h5>
          </div>
        </div>
      </div>
      <div class="footer">
        <div class="copyright">
          <p>版权所有 2018-2019 西北大学 LightGo团队</p>
        </div>
        <div class="somelink">
          <div class="row mob-masonry     center">
            <div class="col-lg-2 col-md-3 col-xs-6 list masonry-item">

              <h4 class="title">产品服务</h4>

              <ul class="ulstyle m-b-0">
                <li>
                  <a href="#" target="_self" title="设备接入">设备接入</a>
                </li>
                <li>
                  <a href="#" target="_self" title="运营中心">运营中心</a>
                </li>
                <li>
                  <a href="#" target="_self" title="联网模块">联网模块</a>
                </li>
                <li>
                  <a href="#" target="_self" title="数据中心">数据中心</a>
                </li>
              </ul>
            </div>
            <div class="col-lg-2 col-md-3 col-xs-6 list masonry-item">
              <h4 class="title">解决方案
              </h4>
              <ul class="ulstyle m-b-0">
                <li>
                  <a href="#" target="_self" title="一">解决方案一</a>
                </li>
                <li>
                  <a href="#" target="_self" title="二">解决方案二</a>
                </li>
                <li>
                  <a href="#" target="_self" title="三">解决方案三</a>
                </li>
                <li>
                  <a href="#" target="_self" title="四">解决方案四</a>
                </li>
              </ul>
            </div>
            <div class="col-lg-2 col-md-3 col-xs-6 list masonry-item">
              <h4 class="title">新闻资讯
              </h4>
              <ul class="ulstyle m-b-0">
                <li>
                  <a href="#" target="_self" title="公司公告">公司公告</a>
                </li>
                <li>
                  <a href="#" target="_self" title="行业动态">行业动态</a>
                </li>
              </ul>
            </div>
            <div class="col-lg-2 col-md-3 col-xs-6 list masonry-item">
              <h4 class="title">申请合作
              </h4>
            </div>
            <div class="col-lg-3 col-md-12 col-xs-12 info masonry-item">
              <h5>000-000-0000</h5>
              <h5>联系我们</h5>
            <div>
              <img src="../../static/img/qq.png" class="connect">
              <img src="../../static/img/wx.png" class="connect">
              <img src="../../static/img/wb.png" class="connect">
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import NavBar from "../components/NavBar";

  export default {
    name: "About",
    components: {
      NavBar
    },
    data() {
      return {
        iconArr: ['../../static/img/summary.png', '../../static/img/msg.png', '../../static/img/exam.png', '../../static/img/team.png'],
        iconArr1: ['../../static/img/summary1.png', '../../static/img/msg1.png', '../../static/img/exam1.png', '../../static/img/team1.png'],
        info: [
          {
            summary: '精确统计',
            details: '最全面的数据统计，最清晰的数据展示图，提供科学的教学计划参考'
          },
          {
            summary: '实时消息',
            details: '线上通知，在线提问，提供最实时的教学反馈'
          }, {
            summary: '课堂试题',
            details: '科学的试题分类，精准的结果统计，保障课堂教学质量'
          }, {
            summary: '优秀团队',
            details: '齐心协力，克服困难，为完成目标一起奋斗'
          }]
      }
    },
    methods: {
      changeIconIn(index) {
        this.iconArr.splice(index, 1, this.iconArr[index].replace('.png', '1.png'))
      }
      ,
      changeIconOut(index) {
        this.iconArr.splice(index, 1, this.iconArr[index].replace('1.png', '.png'))

      }
    }
  }
</script>

<style lang="less" scoped>
  .top_img {
    width: 100%;
    height: 400px;

    img {
      width: 100%;
      height: 100%;
    }

  }

  .product_feature {
    display: flex;
    text-align: center;
    justify-content: space-between;
    width: 70%;
    margin: 3% 15%;
    color: white;
    .feature {
      overflow: hidden;
      width: 270px;
      height: 350px;
      background-size: 100% 100%;
      position: relative;
      .describe {
        width: 100%;
        margin-top: 20px;
      }
    }

  }

  .feature1 {
    background-image: url("../assets/us1.jpg");
  }

  .feature2 {
    background-image: url("../assets/us4.jpg");
  }

  .feature3 {
    background-image: url("../assets/us2.jpg");
  }

  .feature4 {
    background-image: url("../assets/us3.jpg");
  }

  .hoverImg {
    padding: 20px;
    padding-top: 40%;
    width: 100%;
    height: 500px;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    transition: all 300ms ease-out;
    background: rgba(22, 26, 29, 0.61);
    &:hover {
      transform: translateY(-80px);
      background: rgba(28, 179, 134, 0.9);
      .details {
        display: block;
      }
    }
    img {
      width: 50px;
      height: 50px;
    }
  }

  .details {
    margin-top: 20px;
    display: none;
  }

  .footer {
    background: rgba(35, 35, 35, 1);
    width: 100%;
    height: 300px;
    color: #bdbdbd;
  }

  .copyright {
    position: relative;
    top: 270px;
    text-align: center;
  }

  .somelink {
    /*background: yellowgreen;*/
    width: 90%;
    margin: 20px 5%;
    text-align: center;
    a {
      color: #bdbdbd;
    }
    .title {
      margin-bottom: 10px;
    }
    li {
      list-style: none;
    }
    .connect{
      display: inline-block;
      width: 35px;
      height: 35px;
      margin: 20px 10px;

    }
  }



</style>