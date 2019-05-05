<template>
  <div class="main bg-gray">
    <NavBar></NavBar>
    <div class="qb_bar">
      <div class="qb_bar_left">
        <span>{{$route.params.name}}</span>
        <Input search enter-button placeholder="检索题目" class="search" v-model="contentSearch"
               @on-search="searchByContent"/>
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

          <Menu theme="light" @on-select="menuSelect">
            <MenuItem name="1">
              <Icon type="ios-infinite"/>
              所有资源
              <div class="right_num">{{this.allResource.length}}</div>
            </MenuItem>
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
                问题: {{jsonParse(item["content"])["content"]}}
              </h5>
              <div class="content">
                <div class="pull-both">
                  <span><Icon size="20" type="md-analytics"/>答案: {{jsonParse(item["content"])["answer"]}}</span>
                  <span><Icon size="20" type="md-star-half"/>评分: <Rate :count="4" disabled v-model="item.hard"/></span>
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
                size="20" type="md-star-half"/>难度: <Rate :count="4" disabled v-model="item.hard"/></span></div>
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
      <div class="margin-top-lg">章节权重 ：
        <Input v-model="newOrder" placeholder="指定的章节权重..." style="width: 300px"/>
      </div>
    </Modal>
    <!--上传课件-->
    <Modal v-model="updateModal" title="上传课件" @on-ok="handleUploadDoc">
      <Form :label-width="80">
        <FormItem label="文档名称">
          <Input v-model="uploadForm.name" placeholder="文档名"></Input>
        </FormItem>
        <FormItem label="文档类型">
          <Select v-model="uploadForm.type">
            <Option v-for="(item,index) in docTypes" :key="index" :value="item">{{item}}</Option>
          </Select>
        </FormItem>
        <FormItem label="是否公开">
          <Select v-model="uploadForm.public">
            <Option value="0">课件（不公开）</Option>
            <Option value="1">资料（公开）</Option>
          </Select>
        </FormItem>
        <FormItem label="资料分类">
          <Select v-model="uploadForm.cate">
            <Option v-for="(item,index) in docCateList" :key="index" :value="item.id">{{item.name}}</Option>
          </Select>
        </FormItem>
        <FormItem label="上传附件">
          <div>
            <Upload
              type="drag"
              :multiple="false"
              :data="{token: teacherInfo.token,'user_id':teacherInfo.id}"
              :on-success="handleUploadSuccess"
              action="http://qk.heniankj.com/public/index.php/home/Attachment/add">
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
        <span>{{$route.params.name}}</span>
      </p>
      <div class="addQuestion_main" slot="">
        <div class="addQuestion_main_item">
          <span>章节&nbsp;</span>
          <Select style="width:200px" v-model="questionForm.chapter">
            <Option value="0">不指定章节</Option>
            <Option v-for="(item,index) in chapterArr" :key="index" :value="item.id">第{{index + 1}}章 {{item.name}}
            </Option>
          </Select>
        </div>
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
          <Rate :count="4" :value="1" v-model="questionForm.hard" style="margin-right: 100px"/>
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
    <!--组卷-->
    <Modal v-model="examModal" title="组卷" @on-ok="handleAddExam" width="80%">
      <Form>
        <FormItem label="试卷名称">
          <Input placeholder="请输入试卷名称" v-model="examForm.name"/>
        </FormItem>
        <FormItem label="选择题目">
          <Table :columns="examCols" :data="questionList" @on-selection-change="handleSelectQ"></Table>
        </FormItem>
      </Form>
    </Modal>
  </div>

</template>

<script>
  import NavBar from "../components/NavBar";
  import {MenuItem, Icon, Menu, Modal, Button, Option, Rate, InputNumber, Form, Select,Table} from 'iview'
  import AnswerCheckbox from '../components/answer-checkbox';
  import AnswerRadio from '../components/answer-radio';
  import AnswerJudge from '../components/answer-judge';
  import AnswerCompute from '../components/answer-compute';
  import AnswerBlank from '../components/answer-blank';
  import {mapActions, mapGetters} from 'vuex';

  const FormItem = Form.Item;

  export default {
    name: "CourseDetail",
    components: {NavBar, AnswerCheckbox, AnswerRadio, AnswerCompute, AnswerJudge, AnswerBlank,Table},
    computed: {
      ...mapGetters(['teacherInfo', 'qBank', 'qForm', 'allResource', 'docCateList']),
      showQType() {
        return this.research.cate === 1;
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
        examCols: [
          {type: 'selection', width: 60, align: 'center'},
          {title: 'Id', key: 'id'},
          {title: '问题', key: 'content',minWidth:100},
          {title: '答案', key: 'answer'},
          {title: '难度', key: 'hard'},
          {title: '正确数', key: 'right'},
          {title: '错误数', key: 'wrong'},
          {title: '标签', key: 'tags'},
        ],
        examModal: false,
        docTypes: ['ppt', 'pdf', 'xls', 'doc', 'mp4'],
        uploadForm: {
          name: '',
          type: '',
          attachment: '',
          user: '',
          public: 0,
          cate: '',
          course: '',
        },
        questionList: [],
        questionForm: {
          chapter: "0",
          title: '',
          type: "1",
          hard: 0,
          time: 1,
        },// 收集题目数据
        chapterModal: false,
        questionModal: false,
        updateModal: false,
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
        questionType: [{value: '1', label: '单选'}, {value: '2', label: '多选'}, {
          value: '3',
          label: '是非'
        }, /* { value: '4', label: '填空' },*/ {value: '4', label: '简答'}],    //题型
        formatType: [{value: 'ppt', label: 'ppt'}, {value: 'pdf', label: 'pdf'}, {
          value: 'word',
          label: 'word'
        }, {value: 'excel', label: 'excel'}],      //格式
        type: [{value: 1, label: '单题'}, {value: 2, label: '组卷'}, {value: 3, label: '课件'}],          //类型
        level: [{value: 1, label: '简单'}, {value: 2, label: '中等'}, {value: 3, label: '困难'}, {value: 4, label: '超纲'}],  //难度
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
        contentSearch: '',
        examForm: {
          name: '',
          question: ''
        }
      }
    },
    methods: {
      handleSelectQ(list) {
        this.examForm.question = list.map(l => l.id).join(',');
      },
      handleAddExam() {
        this.examForm['user'] = this.teacherInfo.id;
        this.examForm['sku'] = this.sku;
        this.$http.get('exam/addQuestionToExam',{params:this.examForm})
          .then(res=>{
            if (res.data.code === 1) {
              this.success('组卷成功');
              this.examModal = false;
            }else {
              this.error(res.data.msg);
            }
          })
      },
      handleUploadDoc() {
        this.uploadForm['user'] = this.teacherInfo.id;
        this.uploadForm['course'] = this.sku;
        this.$http.post('Document/add',this.uploadForm).then(res=>{
          if (res.data.code === 1) {
            this.success('添加文档成功');
            this.updateModal = false;
          }else{
            this.error(res.data.msg);
          }
        })
      },
      success(content) {
        this.$Notice.success({
          'title': '成功',
          content
        });
      },
      error(content) {
        this.$Notice.error({
          'title': '失败',
          content
        })
      },
      handleUploadSuccess(res, file, fileList) {
        console.log(res, file, fileList);
        if (res.code === 1) {
          this.uploadForm.attachment = res.data;
        } else {
          this.$Notice.error({
            title: '失败',
            content: '上传文件失败！'
          })
        }
      },
      getCateList() {
        this.$http.get('Document/getDocumentCate')
          .then(res => {
            if (res.data.code === 1) {
              this.saveDocCateList(res.data.data);
            } else {
              this.$Notice.error({
                title: '失败',
                content: '获取文档分类列表失败！'
              })
            }
          })
      },
      searchByContent() {
        this.getQList({q_base: this.$route.params.id, content: this.contentSearch});
      },
      handleAllResource() {
        this.resultArr = this.allResource
      },
      jsonParse(str) {
        if (str && JSON.parse(str)) {
          return JSON.parse(str)
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
          case 3:
            this.examModal = true;
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
        this.getQList({q_base: this.$route.params.id}, () => this.saveAllResource(this.resultArr));
      },
      clearQuestionForm() {
        this.clearQForm();
      },
      handleFilter(e) {
        console.log(e);
      },
      getQList(params, callback) {
        this.commonGetList('Qbase/getQuestions', params, callback);
      },
      getEList(params) {
        this.commonGetList('exam/getExamFromTeacher', params);
      },
      getDList(params) {
        this.commonGetList('document/getDocument', params);
      },
      addQuestion(params) {
        this.$http.get('/questions/add', {params})
          .then(res => {
            if (res.data.code === 0) {
              this.$Message.error(' 添加题目失败');
            } else {
              this.$Message.success(' 添加题目成功');
              this.questionModal = false;
            }
          })
      },
      commonGetList(url, params, callback) {
        this.$http.get(url, {params})
          .then(res => {
            if (res.data.code === 0) {
              // this.$Message.info(res.data.msg);
              this.resultArr = [];
            } else {
              this.resultArr = res.data.data;
              //把所有资源存储
              callback && callback();
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
        if (index + '' === '1') {
          this.handleAllResource();
          return;
        }
        this.research.chapter = index.toString().substring(2);
      },
      ...mapActions(['updateQForm', 'clearQForm', 'saveAllResource', 'saveDocCateList']),

    },
    mounted() {
      //初始获取所有资源
      this.getQList({q_base: this.$route.params.id}, () => {
        this.saveAllResource(this.resultArr);

        this.resultArr.map(q=>{
          this.questionList.push({
            ...q,
            content:JSON.parse(q['content'])['content'],
            answer:JSON.parse(q['content'])['answer']
          })
        })
      });
      this.getCateList();
      //获取章节
      let qb = this.qBank.find((item) => {
        return item.id === parseInt(this.$route.params.id)
      });
      // console.log(qb);
      this.sku = qb ? qb['course_sku']['sku'] : 1;
      this.$http.get('Chapter/getChapterByCourse', {params: {id: this.sku}})
        .then(res => {
          //给chapterArr赋值
          if (res.data.code === 1) {
            this.chapterArr = res.data.data;
            this.chapterArr.sort((a, b) => a.order - b.order);
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
    min-height: 100%;

    .qb_bar {
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

      .qb_menu {
        width: 241px;
        min-width: 241px;
        /*height: 100%;*/
        min-height: 100%;
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
        margin: 20px;
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
