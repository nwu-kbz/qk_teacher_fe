<template>
  <div class="main bg-grey">
    <NavBar/>
    <div class="content">
      <Card icon="ios-options" :padding="0" shadow class="group-card" v-for="(item,index) in groupList" :key="index">
        <p slot="title">分组{{index+1}}</p>
        <span class="text-green text-lg" slot="extra" @click="handleAddStudent(index)"><Icon type="md-add-circle" size="30"/></span>
        <CellGroup>
          <Cell :title="findStuById(stu)['name']"  v-for="(stu,ins) in item" :key="ins">
            <span slot="extra" class="text-red" @click="handleRemoveStudent(index,ins)"><Icon type="ios-trash" size="20"/></span>
          </Cell>
        </CellGroup>
      </Card>
    </div>
    <Button type="success" size="large" class="submit-btn">提交修改</Button>

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

  export default {
    name: "Group",
    components: {NavBar},
    computed: {
      unSelectedStu() {
        return this.studentList.filter(s => !s.selected);
      }
    },
    methods:{
      handleDoAdd() {
        this.groupList.splice(this.toGroup,1,this.groupList[this.toGroup].concat(this.selectedIds));
        this.studentList = this.selectedStu;
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
        let stuList = _.cloneDeep(this.studentList);
        this.selectedIds = records.map(r => {
          let ins = stuList.findIndex(st => st.id === r.id);
          stuList[ins].selected = true;
          return r.id;
        });
        this.selectedStu = stuList;
      },
      findStuById(id) {
        return this.studentList.find(s => s.id === id)||{};
      }
    },
    data() {
      return {
        groupList:[
          [1,2,3,4,5,5,6,7,7,5,5,6,7,7],
          [1,2,3,4,5,5,6,7,7,5,5,6,7,7],
          [1,2,3,4,5,5,6,7,7,5,5,6,7,7],
          [1,2,3,4,5,5,6,7,7],
          [1,2,3,4,5,5,6,7,7],
          [1,2,3,4,5,5,6,7,7],
        ],
        studentList:[
          {id:1,name:'aaa2',selected:false},
          {id:2,name:'aaa1',selected:false},
          {id:3,name:'aaa3',selected:false},
          {id:4,name:'aaa44',selected:false},
          {id:5,name:'aaa5',selected:false},
          {id:6,name:'aa34a',selected:false},
          {id:7,name:'aaa',selected:false},
          {id:8,name:'aaa',selected:false},
          {id:9,name:'aaa',selected:false},
          {id:10,name:'aaa',selected:false},
          {id:1,name:'aaa',selected:false},
          {id:1,name:'aaa',selected:false},
          {id:1,name:'aaa',selected:false},
          {id:1,name:'aaa',selected:false},
          {id:1,name:'aaa',selected:false},
          {id:1,name:'aaa',selected:false},
          {id:1,name:'aaa',selected:false},
          {id:1,name:'aaa',selected:false},
          ],
        toGroup: 0,
        modalShow: false,
        stuCols:[
          {type: 'selection', width: 60, align: 'center'},
          {title:'Id',key:'id'},
          {title:'姓名',key:'name'},
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
