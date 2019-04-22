<template>
  <Form class="form-style">
    <FormItem label="标题">
      <Input type="text" placeholder="通知标题">
        <Icon type="ios-person-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>
    <FormItem label="内容">
      <Input type="textarea" placeholder="通知内容" :autosize="{minRows: 15,maxRows: 5}">
        <Icon type="ios-person-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>
    <Button type="primary" style="float: right;" :size="30">确定</Button>
  </Form>
</template>

<script>
  import {Button, Icon, Input, Form} from 'iview';

  const FormItem = Form.Item;
  export default {
    name: "EditorInform",
    mounted() {
    },
    components: {FormItem}
  }


</script>

<style lang="less" scoped>
  .form-style{
    padding: 10px 15px;
  }
</style>
