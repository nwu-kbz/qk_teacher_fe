<template>
  <div class="main">
    <NavBar></NavBar>
    <div class="qb_bar">
      <div class="qb_bar_left">
        <span>{{$route.params.name}}</span>
        <Input search enter-button placeholder="检索题目" class="search" v-model="contentSearch"/>
      </div>
      <div class="qb_bar_right">
        <Dropdown style="margin-left: 20px" @on-click="handleInsert">
          <Button type="primary">
            录入题目
            <Icon type="ios-arrow-down"></Icon>
          </Button>
          <DropdownMenu slot="list">
            <DropdownItem name="1">添加单题</DropdownItem>
            <DropdownItem name="2">上传课件</DropdownItem>
            <!--<DropdownItem name="3">创建组卷</DropdownItem>-->
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
    <!--主体-->
    <div class="qb_containter">
      <!--左边的菜单-->
      <div class="qb_menu">
        <div class="qb_menu_item">
          <Menu theme="light" active-name="1">
            <div>
              <MenuItem name="1">
                <Icon type="ios-infinite"/>
                所有资源
                <div class="right_num">0</div>
              </MenuItem>
            </div>
            <Menu theme="light" @on-select="menuSelect">
              <Submenu name="2">
                <template slot="title">
                  <Icon type="ios-paper"/>
                  章节
                </template>
                <button class="editor_charpter" @click="chapterModal=true">添加章节</button>
                <MenuItem v-for="(chapter,index) in chapterArr" :key="index+1" :name="'2-'+ (index+1)">
                  第{{index + 1}}章-{{chapter.name}}
                </MenuItem>
                <MenuItem name="2-0">未指定章节</MenuItem>
              </Submenu>
            </Menu>
          </Menu>
        </div>
      </div>
      <!--中间显示题目,筛选条件-->
      <div class="qb_main">
        <div class="options_container">
          <div class="options">
            类型：
            <Select v-model="research.cate" style="width:100px">
              <Option v-for="item in type" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </div>
          <div class="options" v-show="showQType">
            题型：
            <Select clearable v-model="research.type" style="width:100px">
              <Option v-for="item in questionType" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </div>
          <div class="options" v-show="showDifficult">
            难度：
            <Select clearable v-model="research.hard" style="width:100px">
              <Option v-for="item in level" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </div>
          <div class="options" v-show="showFormat">
            格式：
            <Select clearable v-model="research.format" style="width:100px">
              <Option v-for="item in formatType" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </div>
        </div>
        <!-- 展示列表-->
        <div class="result_container">
          <Card :bordered="false" v-for="(item,index) in resultArr" :key="index" class="margin10">
            <!---->
            <div v-show="cate===1">
              <h5 slot="title">
                <Icon size="30" type="md-help"/>
                <!--JSON.parse(item.content)[content]-->
                问题: {{jsonParse(item["content"])}}
              </h5>
              <div class="content">
                <div class="pull-both">
                  <span><Icon size="20" type="md-analytics"/>答案: {{item.answer}}</span>
                  <span><Icon size="20" type="md-star-half"/>评分: <Rate disabled v-model="item.hard"/></span>
                  <span><Icon size="20" type="ios-time"/>预计答题时间: {{item.time}}</span>
                </div>
                <div class="pull-both">
                  <span><Icon size="20" type="md-apps"/>章节: 第 {{item.chapter}} 章</span>
                  <span><Icon size="20" type="md-checkmark-circle"/>正确次数: {{item.right}}</span>
                  <span><Icon size="20" type="md-close-circle"/>错误次数: {{item.wrong}}</span>
                </div>
              </div>
            </div>
            <div v-show="cate===2">
              <h5 slot="title">
                <Icon size="30" type="ios-copy"/>
                {{item.name}}
              </h5>
              <div class="pull-both"><span><Icon size="20" type="ios-time"/>测试时长: {{item.time}} 分钟</span> <span><Icon
                      size="20" type="md-star-half"/>难度: <Rate disabled v-model="item.hard"/></span></div>
            </div>

          </Card>
          <div v-show="resultArr.length===0" style="text-align: center">
            <Icon type="ios-alert-outline" size="50"/>
            <h3>啊哦!暂时没有内容呢~</h3>
          </div>
        </div>
      </div>
    </div>

    <!--章节-->
    <Modal v-model="chapterModal" title="添加章节" @on-ok="addChapter">
      <div>章节名称：
        <!--字段信息 id, name(章节名），course（课程名id），order（顺序），pid（父章节）-->
        <Input v-model="newChapter" placeholder="指定的章节名称..." style="width: 300px"/>
      </div>
      <div>章节权重 ：
        <Input v-model="newOrder" placeholder="指定的章节权重..." style="width: 300px"/>
      </div>
    </Modal>
    <!--上传课件-->
    <Modal v-model="updateModal" title="上传课件">
      <Form :label-width="80">
        <FormItem label="选择章节">
          <Select v-model="uploadForm.chapter">
            <Option v-for="(item,index) in chapterArr" :key="index" :value="item.id">{{item.name}}</Option>
          </Select>
        </FormItem>
        <FormItem label="上传附件">
          <div>
            <Upload
                    multiple
                    type="drag"
                    action="http://qk.heniankj.com/public/index.php/home/attachment/add">
              <div style="padding: 20px 0">
                <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                <p>拖动文件到此处上传</p>
              </div>
            </Upload>
          </div>
        </FormItem>
      </Form>
    </Modal>
    <!--题目-->
    <Modal v-model="questionModal" width="900" class="addQuestion" :styles="{top: '40px'}" scrollable
           @close="questionModal=false">
      <p slot="header" class="addQuestion_header">
        <Icon type="md-pricetags"/>
        <span>{{$route.params.name}}</span></p>
      <div class="selectCharpter"><span>章节&nbsp;</span>
        <Select style="width:200px" v-model="questionForm.chapter">
          <Option value="0">不指定章节</Option>
          <Option v-for="(item,index) in chapterArr" :key="index" :value="item.id">第{{index + 1}}章 {{item.name}}
          </Option>
        </Select>
      </div>

      <div class="addQuestion_main" slot="">
        <div class="addQuestion_main_item">
          <span>题目</span>
          <div class="editer_question">
            <Input type="textarea" v-model="questionForm.title" :autosize="{minRows: 3,maxRows: 15}"/>
          </div>
        </div>
        <div class="addQuestion_main_item " style="width:100%;margin-top: 30px;">
          <span>题型</span>
          <Select v-model="questionForm.type" style="width:100px;margin-right: 110px;" @change="clearQuestionForm">
            <Option v-for="item in questionType" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <span>难度</span>
          <Rate v-model="questionForm.hard" style="margin-right: 100px"/>
          <span style="width:90px">预计答题时间：</span>
          <InputNumber :max="30" :min="1" v-model="questionForm.time"></InputNumber>
          <span>分钟</span>
        </div>

        <!--题型所对应的题目编辑方式-->

        <!--单选-->
        <div class="addQuestion_main_item" v-show="questionForm.type==1">
          <span>选项</span>
          <AnswerRadio></AnswerRadio>
        </div>
        <!--多选-->
        <div class="addQuestion_main_item" v-show="questionForm.type==2">
          <span>选项</span>
          <AnswerCheckbox></AnswerCheckbox>
        </div>
        <!--是非-->
        <div class="addQuestion_main_item" v-show="questionForm.type==3">
          <span>选项</span>
          <AnswerJudge></AnswerJudge>
        </div>
        <!--填空-->
        <!--<div class="addQuestion_main_item" v-show="questionForm.type==4">-->
        <!--<span>选项</span>-->
        <!--<AnswerBlank ></AnswerBlank>-->
        <!--</div>-->
        <!--简答-->
        <div class="addQuestion_main_item" v-show="questionForm.type==4">
          <span>选项</span>
          <AnswerCompute></AnswerCompute>
        </div>
      </div>

      <div slot="footer">
        <Button size="large" @click="questionModal=false">取消</Button>
        <Button size="large" type="success" @click="handleSubmit">确认</Button>
      </div>
    </Modal>
  </div>

</template>

<script>
  import NavBar from "../components/NavBar";
  import {MenuItem, Icon, Menu, Modal, Button, Option, Rate, InputNumber, Form, Select} from 'iview'
  import AnswerCheckbox from '../components/answer-checkbox';
  import AnswerRadio from '../components/answer-radio';
  import AnswerJudge from '../components/answer-judge';
  import AnswerCompute from '../components/answer-compute';
  import AnswerBlank from '../components/answer-blank';
  import {mapActions, mapGetters} from 'vuex';

  const FormItem = Form.Item;

  export default {
    name: "CourseDetail",
    components: {NavBar, AnswerCheckbox, AnswerRadio, AnswerCompute, AnswerJudge, AnswerBlank},
    computed: {
      ...mapGetters(['teacherInfo', 'qBank', 'qForm']),
      showQType() {
        return this.research.cate === 1 || true;
      },
      showDifficult() {
        return this.research.cate === 1 || this.research.cate === 2;
      },
      showFormat() {
        return this.research.cate === 3;
      },
      cate() {
        return this.research.cate;
      },
    },
    data() {
      return {
        uploadForm: {
          chapter: ''
        },
        // 所有资源

        questionList: {},
        questionForm: {
          chapter: "0",
          title: '',
          type: "1",
          hard: 0,
          time: 1,
        },// 收集题目数据
        contentSearch: '',
        chapterModal: false,
        questionModal: false,
        updateModal: false,
        // showQuestionType:[true,false,false,false,false],
        rightAnswer: [],
        //新添加的章节名
        newChapter: '',
        newOrder: 1,
        sku: 1,
        // chapterCount: 0,
        resourceCount: 0,
        modal1: false,
        modal2: true,
        //章节
        chapterArr: [],
        deleteCount: 0,
        questionType: [{value: '1', label: '单选'}, {value: '2', label: '多选'}, {value: '3', label: '是非'}, /* { value: '4', label: '填空' },*/ {value: '4', label: '简答'}],    //题型
        formatType: [
          {
            value: 'ppt',
            label: 'ppt'
          },
          {
            value: 'pdf',
            label: 'pdf'
          },
          {
            value: 'word',
            label: 'word'
          },
          {
            value: 'excel',
            label: 'excel'
          }

        ],      //格式
        type: [
          {
            value: 1,
            label: '单题'
          },
          {
            value: 2,
            label: '组卷'
          },
          {
            value: 3,
            label: '课件'
          }
        ],          //类型
        level: [
          {
            value: 1,
            label: '简单'
          },
          {
            value: 2,
            label: '中等'
          },
          {
            value: 3,
            label: '困难'
          },
          {
            value: 4,
            label: '超纲'
          }
        ],  //难度
        //所获取的内容
        research: {
          cate: 1,        //类型（3）   单题，组卷，课件
          type: '',//题型（5）   1.单选   2.多选    3.是非  4.简答;
          hard: '',       //难度（4）   1.简单   2.中等    3.困难   4.超纲
          format: '',      //格式（4）   'ppt','pdf','word','excel'
          chapter: ''
        },
        //结果数据  当前的题目
        resultArr: [],

      }

    },
    methods: {
      jsonParse(str) {
        if (str && JSON.parse(str)) {
          return JSON.parse(str)["content"]
        } else {
          return "";
        }
      },
      handleInsert(itemId) {
        switch (parseInt(itemId)) {
          case 1:
            this.questionModal = true;
            break;
          case 2:
            this.updateModal = true;
            break;
        }
      },
      handleSubmit() {
        let obj = Object.assign({}, this.questionForm, {
          answer: this.qForm.rightAnswer,
          questions: this.qForm.answers,
          user: 1,
          bid: 1
        });
        this.addQuestion(obj);
      },
      clearQuestionForm() {
        this.clearQForm();
      },
      handleFilter(e) {
        console.log(e);
      },
      getQList(params) {
        this.commonGetList('Qbase/getQuestions', params);
      },
      getEList(params) {
        this.commonGetList('exam/getExamFromTeacher', params);
      },
      getDList(params) {
        this.commonGetList('document/getDocument', params);
      },
      addQuestion(params) {
        this.$http.post('/questions/add', params)
            .then(res => {
              if (res.data.code === 0) {
                this.$Message.error(' 添加题目失败');
              } else {
                this.$Message.success(' 添加题目成功');
                this.questionModal = false;
              }
            })
      },
      commonGetList(url, params) {
        this.$http.get(url, {params})
            .then(res => {
              if (res.data.code === 0) {
                this.$Message.info(res.data.msg);
                this.resultArr = [];
              } else {
                this.resultArr = res.data.data;
              }
            })
      },
      addChapter() {
        let newItem = {
          id: this.chapterArr.length + 1,
          name: this.newChapter,
          pid: 0,
          order: this.newOrder,
          course: this.sku
        };

        this.$http.get('Chapter/addChapterTocourse', {params: newItem}
        )
            .then(res => {
              this.newChapter = '';
              this.chapterArr.push(newItem)
            })
      },
      menuSelect(index) {
        this.research.chapter = index.toString().substring(2)
      },
      ...mapActions(['updateQForm', 'clearQForm'])
    },
    mounted() {
      console.log(this, 'sss');
      //初始获取所有资源
      this.getQList({q_base: this.$route.params.id});

      //获取章节
      let qb = this.qBank.find((item) => {
        return item.id === parseInt(this.$route.params.id)
      });
      console.log(qb);
      this.sku = qb ? qb['course_sku']['sku'] : 1;
      this.$http.get('Chapter/getChapterByCourse', {params: {id: this.sku}})
          .then(res => {
            //给chapterArr赋值
            if (res.data.code === 1) {
              this.chapterArr = res.data.data;
              this.chapterArr.sort((a, b) => a.order - b.order);
            } else {
              this.$Message.info("该课程未指定章节！")
            }

          })
    }
    ,

    watch: {
      cate(val) {
        this.research = {
          cate: val,
          type: '',
          hard: '',
          format: '',
        };
        this.resultArr = [];
      }
      ,
      research: {   //cate,chapter,type,hard,format
        deep: true,
        handler(val) {
          for (let key in val) {
            !val[key] && delete val[key];
          }
          switch (val.cate) {
            case 1:
              val && this.getQList(val);
              break;
            case 2:
              val && this.getEList({id: 10, ...val});
              break;
            case 3:
              val && this.getDList({...val});
              break;
          }


        }
      }
    }
  }

</script>

<style lang="less" scoped>
  .main {
    width: 100%;
    height: 100%;
    .qb_bar {
      background-color: rgba(214, 214, 214, 0.42);
      width: 100%;
      height: 50px;
      padding: 10px;
      display: flex;
      border-bottom: 1px solid #aaaaaa;
      /*background-color: #2db7f5;*/
      align-items: center;
      justify-content: space-between;
      /*box-shadow: 2px 2px 4px rgb(149, 149, 149);*/
      .qb_bar_left {
        display: flex;
        align-items: center;
        width: 60%;
        min-width: 403px;
      }
      span {
        width: 20%;
        font-size: 16px;
        line-height: 50px;
      }
      .search {
        width: 50%;
      }
    }
    .qb_containter {
      /*height: 87%;*/
      width: 100%;
      display: flex;
      background-color: #e9ebecd9;

      .qb_menu {
        width: 241px;
        min-width: 241px;
        height: 100%;
        min-height: 630px;
        background-color: white;
        .qb_menu_item {
          width: 99%;
          .editor_charpter {
            padding-left: 43px;
            width: 100%;
            border: none;
            background-color: white;
            height: 48px;
            text-align: left;
            &:hover {
              color: #4dc8a9;
            }
          }
        }
        .right_num {
          float: right;
          display: inline-block;
        }
      }
      .qb_main {
        width: 1300px;
        height: 100%;
        min-height: 630px;
        /*background-color: #e9ebecd9;*/
        .options_container {
          width: 50%;
          display: flex;
          justify-content: space-around;
          margin: 10px;
        }
      }

    }
  }

  .addQuestion {
    .addQuestion_header {
      height: 40px;
    }
    .addQuestion_main {
      flex-wrap: wrap;
      align-items: flex-start;
      .addQuestion_main_item {
        display: flex;
        margin-top: 10px;
        &:nth-child(2) {
          margin-top: 80px;
        }
      }
      span {
        width: 40px
      }
      .editor_question {
        display: inline-block;
        width: 360px;
      }

    }
  }

  .margin10 {
    margin: 20px;
  }

  .pull-both {
    display: flex;
    margin-top: 15px;
    justify-content: space-between;
  }

  .result_container {
    .content {
      margin-top: 20px;
    }
    padding: 30px;
  }

</style>
