<template>
  <div class="main bg-grey">
    <NavBar/>
    <div class="content">
      <Card icon="ios-options" :padding="0" shadow class="group-card" v-for="(item,index) in groupList" :key="index">
        <p slot="title">分组{{index+1}}</p>
        <span class="text-green text-lg" slot="extra" @click="handleAddStudent(index)"><Icon type="md-add-circle" size="30"/></span>
        <CellGroup>
          <Cell :title="findStuById(stu)['nickname']"  v-for="(stu,ins) in item" :key="ins">
            <span slot="extra" class="text-red" @click="handleRemoveStudent(index,ins)"><Icon type="ios-trash" size="20"/></span>
          </Cell>
        </CellGroup>
      </Card>
    </div>
    <div class="submit-btn">
      <Button type="success" size="large" @click="handleAddGroup">添加组</Button>
      <Button type="success" size="large" @click="handleSubGroup">删除组</Button>
      <Button type="success" size="large" @click="handleSubmitGroup">提交修改</Button>

    </div>

    <!--选择学生的modal-->
    <Modal v-model="modalShow" title="选择学生" @on-ok="handleDoAdd" @on-cancel="handleCancel">
      <div class="stu-list">
        <Table border @on-selection-change="handleSelect" :columns="stuCols" :data="unSelectedStu"></Table>
      </div>
    </Modal>
  </div>
</template>

<script>
  import NavBar from '../components/NavBar';
  import _ from 'lodash';
  import {mapGetters,mapActions} from 'vuex';

  export default {
    name: "Group",
    components: {NavBar},
    computed: {
      unSelectedStu() {
        return this.students.filter(s => !s.selected);
      },
      ...mapGetters(['studentList'])
    },
    methods:{
      handleAddGroup() {
        this.groupList.push([]);
      },
      handleSubmitGroup() {
        this.$router.back();
      },
      handleSubGroup() {
        let stuIds = this.groupList.pop();
        stuIds.map(id=>{
          this.students.find(st => st.id === id)['selected'] = false;
        })
      },
      handleDoAdd() {
        this.groupList.splice(this.toGroup,1,this.groupList[this.toGroup].concat(this.selectedIds));
        this.students = this.selectedStu;
      },
      handleCancel() {
        this.modalShow = false;
      },
      handleRemoveStudent(x,y) {
        let tab = this.groupList[x];
        tab.splice(y, 1);
        this.groupList.splice(x, 1, tab);
      },
      handleAddStudent(index) {
        this.toGroup = index;
        this.modalShow = true;
      },
      handleSelect(records) {
        let stuList = _.cloneDeep(this.students);
        this.selectedIds = records.map(r => {
          let ins = stuList.findIndex(st => st.id === r.id);
          stuList[ins].selected = true;
          return r.id;
        });
        this.selectedStu = stuList;
      },
      findStuById(id) {
        return this.students.find(s => s.id === id)||{};
      },
      ...mapActions(['saveStudentList'])
    },
    mounted() {
      this.students = _.cloneDeep(this.studentList);
    },
    data() {
      return {
        groupList:[
          [],
          [],
          [],
          [],
          [],
          [],
        ],
        students:[],
        toGroup: 0,
        modalShow: false,
        stuCols:[
          {type: 'selection', width: 60, align: 'center'},
          {title:'Id',key:'id'},
          {title:'姓名',key:'nickname'},
          {title:'是否被选择',key:'selected'},
        ],
        selectedStu: [],
        selectedIds: []
      }
    },
  }
</script>

<style lang="less" scoped>
  .main {
    min-height: 100%;
    width: 100%;
    position: relative;
    .submit-btn{
     font-size: 23px;
      position: absolute;
      right: 20px;
      bottom: 20px;
    }
    .content {
      height: 90%;
      width: 100%;
      display: flex;
      /*justify-content: ;*/
      flex-wrap: wrap;
      padding: 20px;
      box-sizing: border-box;
      .group-card{
        margin: 20px;
        width: 300px;
      }
    }
  }
</style>
