<template>
  <div>
    <RadioGroup v-model="rightAnswer">
      <Radio label="true">正确
      </Radio>
      <Radio label="false">错误
      </Radio>
    </RadioGroup>
  </div>

</template>

<script>
  import {RadioGroup,Radio} from 'iview'
  import {mapGetters,mapActions} from 'vuex';

  export default {
    name: 'AnswerJudge',
    components:{RadioGroup,Radio},
    data() {
      return {
        rightAnswer: 'true'
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
