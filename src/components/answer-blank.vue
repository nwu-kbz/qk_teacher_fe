<template>
  <div>
    * 在答题中输入 ____（4个连续的下划线）即可认为开始一个新的填空项。
    <Checkbox-group :model.sync="rightOption">
      <Checkbox value="order">允许与标答次序不同</Checkbox>
      <Checkbox value="case">严格区分大小写</Checkbox>
      <Checkbox value="independence">每空独立给分</Checkbox>
    </Checkbox-group>
    <Input type="textarea" :autosize="true" placeholder="请输入..." v-model="answer"/>
  </div>

</template>

<script>
  import {Checkbox,CheckboxGroup,Input}  from 'iview';
  export default {
    name: "answer-blank",
    props:['rightOption','answer'],
    data(){
      return {

      }
    }
  }
</script>

<style scoped>

</style>
