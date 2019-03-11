<template>
  <div>
    <Input type="textarea" placeholder="请输入答案" v-model="rightAnswer"/>
  </div>

</template>
<script>
  import {Input} from 'iview'
  export default {
    name: 'AnswerCompute',
    props: ['rightAnswer'],
    data() {
      return {

      }
    },
    methods: {},
    watch: {
      rightAnswer(val) {
        this.$emit('update:rightAnswer', val);
      },
    },
  }
</script>
<style lang="less">

</style>
