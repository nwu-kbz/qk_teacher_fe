<template>
  <div>
    <Input type="textarea" placeholder="请输入答案" v-model="rightAnswer"/>
  </div>

</template>
<script>
  import {Input} from 'iview';
  import {mapActions} from 'vuex';

  export default {
    name: 'AnswerCompute',
    data() {
      return {
        rightAnswer: ''
      }
    },
    methods: {
      ...mapActions(['updateAnswers','updateRightAnswer'])
    },
    watch: {
      rightAnswer(val) {
        this.updateRightAnswer(val);
      },
    },
  }
</script>
<style lang="less">

</style>
