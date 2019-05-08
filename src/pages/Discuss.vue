<template>
  <div class="main bg-grey">

    <div class="main-content">
      <Card class="left">
        <p slot="title" @click="disModal=true">
          <Icon type="md-add-circle" size="20"/>
          添加讨论
        </p>
        <CellGroup class="cellGroup" width="100%">
          <span v-for="(item,index) in discussList" :key="index" @click="handleShowDetail(index)">
             <Cell :title="item.name"><Badge :count="0" slot="extra"/></Cell>
          </span>
        </CellGroup>
      </Card>

      <!--讨论区-->
      <Card class="right">
        <p slot="title">
          <Icon type="md-alarm" size="20"/>
          讨论区
        </p>
        <CellGroup class="cellGroup" width="100%">
          <Cell :title="findStuById(item.user)['nickname']" v-for="(item,index) in currentDiscuss['record']"
                :key="index">
            <p slot="extra">{{item.content}}</p>
          </Cell>
        </CellGroup>
      </Card>

      <!--      添加讨论-->
      <Modal v-model="disModal" title="添加讨论" @on-ok="handleAddDiscuss">
        <Form>
          <Input placeholder="讨论名" v-model="disName"/>
        </Form>
      </Modal>
    </div>
  </div>
</template>

<script>
  import NavBar from "../components/NavBar";
  import {Cell, CellGroup, Badge, Form} from 'iview'
  import {mapGetters, mapActions} from 'vuex';
  import config from '../config';

  export default {
    name: "Discuss",
    components: {},
    data() {
      return {
        discussList: [],
        currentDiscuss: {},
        disName: "",
        disModal: false,
        socket: null
      }
    },
    computed: {
      ...mapGetters(['studentList'])
    },
    methods: {
      ...mapActions(['saveStudentList']),
      handleAddDiscuss() {
        this.$http.get('/discuss/add', {params: {sku: this.$route.query.sku, name: this.disName}})
          .then(res => {
            if (res.data.code === 1) {
              this.getDiscussList();
              this.$Notice.success({
                title: '成功',
                content: '添加成功'
              })
            } else {
              this.$Notice.error({
                title: '失败',
                content: '添加失败'
              })
            }
          })
      },
      handleShowDetail(index) {
        this.currentDiscuss = this.discussList[index];
      },
      getDiscussList() {
        this.$http.get('/discuss/index', {params: {sku: this.$route.query.sku}})
          .then(res => {
            if (res.data.code === 1) {
              this.discussList = res.data.data;
            }
          })
      },
      getStudentList() {
        if (!this.studentList || this.studentList.length === 0) {
          this.$http.get('/students/getUserList', {params: {id: this.$route.query.sku}}).then(res => {
            if (res.data.code === 1) {
              this.saveStudentList(res.data.data);
            }
          });
        }
      },
      findStuById(id) {
        return this.studentList.find(s => s.id === id) || {};
      },
      initSocket() {
        this.socket = new WebSocket(config.urls.studentSocketUrl);
        this.socket && this.saveWs1237(this.socket);

        // 监听socket连接
        this.socket.onopen = this.open;
        // 监听socket错误信息
        this.socket.onerror = this.error;
        // 监听socket消息
        this.socket.onmessage = this.getMessage;
      },
      open() {
        // 登录
        const info = {
          'type': 'publish',
          'tasks': 'login'
        };
        this.socket.send(JSON.stringify(info));
      },
      error() {
      },
      getMessage({data}) {
        let datas = JSON.parse(data)['data'];
        console.log(datas);
        if (datas && !_.isEmpty(datas)) ;
      },
    },
    mounted() {
      this.getDiscussList();
      this.getStudentList();
      this.initSocket();
    }
  }
</script>

<style scoped lang="less">
  .main {
    width: 100%;
    min-height: 100%;

    .main-content {
      width: 100%;
      min-height: 100%;
      display: flex;
      justify-content: center;

      .left {
        width: 18%;
        min-height: 91%;
        margin: 10px;

        .cellGroup {
          width: 100%;

          .cellItem {
            .ivu-cell-title {
              width: 100%;
            }

            .msgCount {
              float: right;
            }
          }

        }
      }

      .right {
        margin: 10px;
        width: 80%;
      }
    }

  }
</style>
