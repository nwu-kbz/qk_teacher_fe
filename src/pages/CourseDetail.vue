<template>
  <div class="main">
    <NavBar></NavBar>
    <div class="qb_bar">
      <div class="qb_bar_left">
        <span>{{$route.params.name}}</span>
        <Input search enter-button placeholder="检索题目" class="search"/>
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
            <DropdownItem name="3">创建组卷</DropdownItem>
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
            <Menu theme="light">
              <Submenu name="2">
                <template slot="title">
                  <Icon type="ios-paper"/>
                  章节
                </template>
                <button class="editor_charpter" @click="handleEditorCharpter">编辑章节</button>
                <MenuItem v-for="(charpter,index) in chapterArr" :key="index" :name="'2-'+ index">第{{index + 1}}章
                </MenuItem>
                <MenuItem name="2-0">未指定章节</MenuItem>
              </Submenu>
            </Menu>
          </Menu>
        </div>
      </div>
      <!--中间显示题目-->
      <div class="qb_main">
        <div class="options_container">
          <div class="options">
            类型：
            <Select v-model="research.type" style="width:100px">
              <Option v-for="item in type" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </div>
          <div class="options" v-show="showQType">
            题型：
            <Select v-model="research.questionType" style="width:100px">
              <Option v-for="item in questionType" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </div>
          <div class="options" v-show="showDifficult">
            难度：
            <Select v-model="research.level" style="width:100px">
              <Option v-for="item in level" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </div>
          <div class="options" v-show="showFormat">
            格式：
            <Select v-model="research.format" style="width:100px">
              <Option v-for="item in formatType" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </div>
        </div>
        <div class="result_container">
          <div v-for="(item,index) in resultArr" :key="index">
            {{item.name}}
          </div>
        </div>
      </div>
    </div>

    <!--录入题目-->
    <Modal v-model="chapterModal" title="编辑章节数目">
      设定章节数目为：
      <InputNumber :max="30" :min="1" v-model="chapterCount" size="small"></InputNumber>
    </Modal>
    <Modal v-model="questionModal" width="900" class="addQuestion" :styles="{top: '40px'}" scrollable>
      <p slot="header" class="addQuestion_header">
        <Icon type="md-pricetags"/>
        <span>{{$route.params.name}}</span>
      </p>
      <div class="selectCharpter">
        <span>章节&nbsp;</span>
        <Select style="width:200px" v-model="qForm.chapter">
          <Option value="0">不指定章节</Option>
          <Option v-for="(item,index) in chapterArr" :key="index" :value="item.id">第{{index + 1}}章  {{item.name}}</Option>
        </Select>
      </div>

      <div class="addQuestion_main" slot="">
        <div class="addQuestion_main_item">
          <span>题目</span>
          <div class="editer_question">
            <div id="toolbar">
            </div>
            <div id="editor" v-model="qForm.qname">
              <p></p>
            </div>
          </div>
        </div>

        <div class="addQuestion_main_item">
          <span>题型</span>
          <Select v-model="qForm.qType" style="width:100px;margin-right: 110px">
            <Option v-for="item in questionType" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <span>难度</span>
          <Rate v-model="qForm.hard" style="margin-right: 100px"/>
          <span style="width:90px">预计答题时间：</span>
          <InputNumber :max="30" :min="1" v-model="qForm.time"></InputNumber>
          <span>分钟</span>
        </div>

        <!--题型所对应的题目编辑方式-->

        <!--单选-->
        <div class="addQuestion_main_item" v-show="qForm.qType==1">
          <span>选项</span>
          <AnswerRadio :answers.sync="qForm.answers" :right-answer.sync="qForm.rightAnswer"></AnswerRadio>
        </div>
        <!--多选-->
        <!--<div class="addQuestion_main_item" v-show="qForm.qType==2">-->
          <!--<span>选项</span>-->
          <!--<AnswerCheckbox :answers.sync="qForm.answers" :right-answer.sync="qForm.rightAnswer"></AnswerCheckbox>-->
        <!--</div>-->
        <!--&lt;!&ndash;是非&ndash;&gt;-->
        <!--<div class="addQuestion_main_item" v-show="qForm.qType==3">-->
          <!--<span>选项</span>-->
          <!--<AnswerJudge :right-answer.sync="qForm.rightAnswer"></AnswerJudge>-->
        <!--</div>-->
        <!--&lt;!&ndash;填空&ndash;&gt;-->
        <!--<div class="addQuestion_main_item" v-show="qForm.qType==4">-->
          <!--<span>选项</span>-->
          <!--<AnswerBlank :right-answer.sync="qForm.rightAnswer"></AnswerBlank>-->
        <!--</div>-->
        <!--&lt;!&ndash;简答&ndash;&gt;-->
        <!--<div class="addQuestion_main_item" v-show="qForm.qType==5">-->
          <!--<span>选项</span>-->
          <!--<AnswerCompute :right-answer.sync="qForm.rightAnswer"></AnswerCompute>-->
        <!--</div>-->
      </div>

      <div slot="footer">
        <Button size="large"  @click="questionModal=false">取消</Button>
        <Button size="large" type="success" @click="handleSubmit">确认</Button>
      </div>
    </Modal>
  </div>

</template>

<script>
  import NavBar from "../components/NavBar";
  import {MenuItem, Icon, Menu, Modal, Button, Option, Rate, InputNumber} from 'iview'
  import $Message from 'iview';
  import AnswerCheckbox from '../components/answer-checkbox';
  import AnswerRadio from '../components/answer-radio';
  import AnswerJudge from '../components/answer-judge';
  import AnswerCompute from '../components/answer-compute';
  import AnswerBlank from '../components/answer-blank';
  import Quill from 'quill'

  export default {
    name: "CourseDetail",
    components: {NavBar, AnswerCheckbox, AnswerRadio, AnswerCompute, AnswerJudge,AnswerBlank},
    computed: {
      showQType(){
        return this.research.type === 1;
      },
      showDifficult() {
        return this.research.type === 1||this.research.type === 2;
      },
      showFormat() {
        return this.research.type === 3;
      }

    },
    data() {
      return {
        // 收集题目数据
        qForm:{
          chapter: "0",
          qname: '',
          qType: "1",
          hard: 0,
          time: 1,
          answers:{},
          rightAnswer: null
        },
        quill:null,//编辑器实例
        chapterModal:false,
        questionModal:true,
        answers: {
        },
        // showQuestionType:[true,false,false,false,false],
        rightAnswer: [],
        chapterCount: 0,
        resourceCount: 0,
        modal1: false,
        modal2: true,
        chapterArr: [
          {id: 1, name: "数据类型"},
          {id: 2, name: "循环"},
          {id: 3, name: "递归"}
        ],
        deleteCount: 0,
        questionType: [
          {
            value: '1',
            label: '单选'
          },
          {
            value: '2',
            label: '多选'
          },
          {
            value: '3',
            label: '是非'
          },
          {
            value: '4',
            label: '填空'
          },
          {
            value: '5',
            label: '简答'
          }

        ],    //题型
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
            value: '简单',
            label: '简单'
          },
          {
            value: '中等',
            label: '中等'
          },
          {
            value: '困难',
            label: '困难'
          },
          {
            value: '超纲',
            label: '超纲'
          }
        ],  //难度
        //所获取的内容
        research: {
          type: '',        //类型（3）   单题，组卷，课件
          questionType: '',//题型（5）   1.单选   2.多选    3.是非   4.填空    5.简答;
          level: '',       //难度（4）   1.简单   2.中等    3.困难   4.超纲
          format: '',      //格式（4）   'ppt','pdf','word','excel'
        },
        //结果数据
        resultArr: [],
        //假的题目数据
        //单题
        singleQuestionArr: [
          {
            id: 1,      //题目编号
            questionType: 1,    //1.单选   2.多选    3.是非   4.填空    5.简答;
            level: 1,  //1.简单   2.中等    3.困难   4.超纲
            name: '这是一道单选题',   //题目
            answerOptions: ['选项A', '选项B', '选项C', '选项D'],
            rightAnswer: 0,
            analyze: '因为第一题，所以选择A'
          },
          {
            id: 2,      //题目编号
            questionType: 2,    //1.单选   2.多选    3.是非   4.填空    5.简答;
            level: 1,  //1.简单   2.中等    3.困难   4.超纲
            name: '这是一道多选题',   //题目
            answer: ['选项A', '选项B', '选项C', '选项D'],
            analyze: '因为第二题，所以选择A和B'
          },
          {
            id: 3,      //题目编号
            questionType: 3,    //1.单选   2.多选    3.是非   4.填空    5.简答;
            level: 1,  //1.简单   2.中等    3.困难   4.超纲
            name: '这是一道判断题',   //题目
            answer: ['对', '错'],
            analyze: '因为是判断题，所以选择对'
          },
          {
            id: 4,      //题目编号
            questionType: 4,    //1.单选   2.多选    3.是非   4.填空    5.简答;
            level: 1,  //1.简单   2.中等    3.困难   4.超纲
            name: '这是一道填空',   //题目
            answer: [''],
            analyze: '因为是填空题，所以选择0'
          },
          {
            id: 5,      //题目编号
            questionType: 5,    //1.单选   2.多选    3.是非   4.填空    5.简答;
            level: 1,  //1.简单   2.中等    3.困难   4.超纲
            name: '这是一道简答题',   //题目
            answer: [''],
            analyze: '因为是简答题，所以尽情发挥'
          }
        ],
        //组卷
        paperArr: [
          {
            id: 1,
            level: 1,  //1.简单   2.中等    3.困难   4.超纲
            name: '试卷1',   //试卷名
          },
          {
            id: 2,
            level: 2,  //1.简单   2.中等    3.困难   4.超纲
            name: '试卷2',   //试卷名
          },
          {
            id: 3,
            level: 3,  //1.简单   2.中等    3.困难   4.超纲
            name: '试卷3',   //试卷名
          }
        ],
        //课件
        courseWareArr: [
          {
            id: 1,
            type: 2,                       //['ppt','pdf','word','excel']
            name: 'charpter 1',
            description: '1111111'
          },
          {
            id: 2,
            type: 1,
            name: 'charpter 2',
            description: '2222222'
          },
          {
            id: 3,
            type: 3,
            name: 'charpter 3',
            description: '3333333'
          }
        ]
      }

    },
    methods: {
      handleInsert(itemId) {
        switch (parseInt(itemId)) {
          case 1:
            this.questionModal = true;
            break;
          case 2:
            this.modal1 = true;
            break;
          default:
            break;
        }
      },
      handleEditorCharpter() {
        this.modal1 = true;
      },
      handleSubmit() {
        this.qForm.qname = this.quill.getText();
        console.log(this.qForm);
      },

    },
    watch: {
      // charpterCount: function (newVal) {
      //   let arr = [];
      //   for (var i = 0; i < newVal; i++) {
      //     arr.push(i)
      //   }
      //   this.chapterArr = arr;
      // },
      // option1: function (newVal) {
      //   if (newVal === "组卷") {
      //     this.typeModel2 = false;
      //   }
      //   if (newVal === "课件") {
      //     this.typeModel2 = false;
      //     this.typeModel3 = false;
      //     this.typeModel4 = true;
      //   }
      },
      research: {
        handler(newVal) {
          if (newVal.type === "单题") {
            //获取所选择的题型数值
            const questionTypeIndex = this.questionType.findIndex((item, index) => {
              return item.label === newVal.questionType
            });
            //获取所选择的难度数值
            const levelIndex = this.level.findIndex((item, index) => {
              return item.label === newVal.level
            });
            this.resultArr = this.singleQuestionArr.filter(item =>
                item.level === (levelIndex + 1) && item.questionType === (questionTypeIndex + 1)
            );
          }
          if (newVal.type === "组卷") {
            this.typeModel2 = false;
            //获取所选择的难度数值
            const index = this.level.findIndex((item, index) => {
              return item.label === newVal.level
            });
            this.resultArr = this.paperArr.filter(item => item.level === (index + 1));
          }
          if (newVal.type === "课件") {
            this.typeModel2 = false;
            this.typeModel3 = false;
            this.typeModel4 = true;
            const index = this.formatType.findIndex((item, index) => {
              return item.label === newVal.format
            });
            this.resultArr = this.courseWareArr.filter(item => item.type === (index + 1));
          }

        },
        deep: true
      },

    mounted() {
      const options = {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['blockquote', 'code-block'],

            [{'header': 1}, {'header': 2}],               // custom button values
            [{'list': 'ordered'}, {'list': 'bullet'}],
            [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
            [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
            [{'direction': 'rtl'}],                         // text direction

            [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
            [{'header': [1, 2, 3, 4, 5, 6, false]}],

            [{'color': []}, {'background': []}],          // dropdown with defaults from theme
            [{'font': []}],
            [{'align': []}],

            ['clean']                                         // remove formatting button
          ]
        },
        placeholder: '在此处输入题干...',
        theme: 'snow',
        scrollingContainer: '#scrolling-container',
      };
      this.quill = new Quill('#editor', options);
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
      height: 87%;
      width: 100%;
      display: flex;

      .qb_menu {
        width: 241px;
        min-width: 241px;
        height: 100%;
        background-color: rgba(214, 214, 214, 0.42);
        border-right: 1px solid #aaaaaa;
        .qb_menu_item {
          width: 99%;
          .editor_charpter {
            width: 60%;
            border: none;
            background-color: white;
            height: 30px;
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
        background-color: rgba(247, 249, 251, 0.85);
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
      /*height: 700px;*/
      /*align-items: center;*/
      /*display: flex;*/
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

  .selectCharpter {

  }

</style>
