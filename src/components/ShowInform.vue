<template>
  <Card icon="ios-notifications" class="right">
    <p slot="title">{{detail.subject}}</p>
    <p class="content">{{detail.content}}</p>
  </Card>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';

  export default {
    name: "showInform",
    computed: {
      ...mapGetters(['messageList'])
    },
    data() {
      return {
        detail: {},
      }
    },
    methods: {
      ...mapActions(['updateMessage']),
      updateUnread() {
        // 未读
        if (this.detail['read'] === 0) {
          this.$http.get('/message/changeStatus', {params: {id: this.detail['id']}}).then(res => {
            if (res.data.code === 1) {
              this.updateMessage({id: this.$route.params.id, obj: {...this.detail, read: 1}})
            }
          })
        }
      }
    },
    mounted() {
      if (this.messageList) {
        this.detail = this.messageList[this.$route.params.id];
        this.updateUnread();
      }
    },
    watch: {
      $route: function () {
        if (this.messageList) {
          this.detail = this.messageList[this.$route.params.id];
          this.updateUnread();
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .right {
    width: 80%;
    min-width: 500px;

    .content {
      font-size: 23px;
    }
  }

</style>
