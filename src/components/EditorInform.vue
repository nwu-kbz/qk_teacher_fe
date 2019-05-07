<template>
  <Form class="form-style">
    <FormItem label="接受者">
      <Select v-model="fromData.to">
        <Option v-for="(te,ins) in teacherList" :key="ins" :value="te.id">{{te.nickname}}</Option>
      </Select>
    </FormItem>
    <FormItem label="主题">
      <Input type="text" placeholder="通知主题" v-model="fromData.subject">
        <Icon type="ios-person-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>
    <FormItem label="内容">
      <Input type="textarea" placeholder="通知内容" :autosize="{minRows: 15,maxRows: 5}" v-model="fromData.content">
        <Icon type="ios-person-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>
    <Button type="primary" style="float: right;" @click="handleSubmit">确定</Button>
  </Form>
</template>

<script>
  import {Button, Icon, Input, Form} from 'iview';
  import {mapGetters} from 'vuex';

  const FormItem = Form.Item;
  export default {
    name: "EditorInform",
    props: ['sendInfo'],
    computed: {
      ...mapGetters(['teacherInfo', 'ws'])
    },
    data() {
      return {
        fromData: {
          to: 0,
          subject: "",
          content: ""
        },
        teacherList: []
      };
    },
    methods: {
      handleSubmit() {
        this.$http.post('/message/add', {...this.fromData, from: this.teacherInfo.id, quota: 0}).then(res => {
          if (res.data.code === 1) {
            this.ws.send(JSON.stringify({
              token: this.teacherInfo.token,
              body: this.fromData.content,
              from: this.teacherInfo.id,
              to: this.fromData.to
            }));
            this.$Notice.success({
              title: '成功',
              content: "发送消息成功"
            });
            this.$router.push({path: '/inform'});
          }else {
            this.$Notice.error({
              title: '失败',
              content: "发送消息失败"
            })
          }
        })
      },
      getTeacherList() {
        this.$http.get('/teacher/getteacherlist').then(res => {
          if (res.data.code === 1) {
            this.teacherList = res.data.data;
          }
        })
      }
    },
    mounted() {
      this.getTeacherList();
    },
    components: {FormItem}
  }


</script>

<style lang="less" scoped>
  .form-style {
    padding: 10px 15px;
  }
</style>
