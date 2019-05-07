<template>
  <div class="main">
    <div class="flex-container">
      <Card title="通知列表" icon="ios-options" class="left">
        <Button slot="extra" to="/inform/editorInform" type="primary">
          <Icon type="md-add" sixe="30"/>
          新建通知
        </Button>
        <CellGroup>
          <Cell v-for="(item,index) in messageList" :title="item['subject']" :to="`/inform/showInform/${index}`"
                :key="index">
            <p slot="extra">{{item.from['username']}}
              <Badge v-if="item.read===0" :count="1"></Badge>
            </p>
          </Cell>
        </CellGroup>
      </Card>
      <router-view class="right"></router-view>
    </div>

  </div>
</template>

<script>
  import NavBar from "../components/NavBar";
  import {mapGetters, mapActions} from 'vuex';
  import {Icon, Cell, CellGroup, Badge, Card, Button} from 'iview'
  import config from '../config';
  import _ from 'lodash';

  export default {
    name: "Inform",
    components: {NavBar},
    computed: {
      ...mapGetters(['teacherInfo', 'messageList', 'ws']),
    },
    data() {
      return {
        activeName: '3',
        socket: null
      }
    },
    methods: {
      ...mapActions(['addMessage', 'saveMessage', 'saveWs']),
      getMessages() {
        this.$http.get('/message/index', {params: {id: this.teacherInfo.id}})
          .then(res => {
            if (res.data.code === 1) {
              this.saveMessage(res.data.data);
            }
          })
      },
      initSocket() {
        this.socket = new WebSocket(config.urls.teacherSocketUrl);
        this.socket && this.saveWs(this.socket);

        // 监听socket连接
        this.socket.onopen = this.open;
        // 监听socket错误信息
        this.socket.onerror = this.error;
        // 监听socket消息
        this.socket.onmessage = this.getMessage;
      },
      open() {
        // 验证 token
        const userInfo = {
          'from': this.teacherInfo.id,
          'token': this.teacherInfo.token
        };
        this.socket.send(JSON.stringify(userInfo));
      },
      error() {
      },
      getMessage({data}) {
        let datas = JSON.parse(data)['data'];
        if (datas && !_.isEmpty(datas)) datas['data'].map(x => this.addMessage({...x, read: 0}));
      }
    },
    mounted: function () {
      this.getMessages();
      this.initSocket();
    },
  }
</script>

<style lang="less" scoped>
  .main {
    width: 100%;
    height: 100%;

    .flex-container {
      display: -webkit-flex;
      display: flex;
      width: 100%;
      height: 94%;
      justify-content: space-between;
      overflow: hidden;
      padding: 20px;

      .left {
        width: 20%;
        min-width: 225px;
      }

      .right {
        width: 78%;
      }
    }
  }


</style>
