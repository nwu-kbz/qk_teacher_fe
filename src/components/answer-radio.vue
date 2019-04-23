<template>
  <div>
    <RadioGroup v-model="rightAnswer" >
      <div class="option-item">
        <Radio label="A">
        </Radio>
        <Input v-model="answer.A" placeholder="请输入选项"/>
      </div>
      <div class="option-item">
        <Radio label="B">
        </Radio>
        <Input v-model="answer.B" placeholder="请输入选项"/>
      </div>
      <div class="option-item">
        <Radio label="C">
        </Radio>
        <Input v-model="answer.C" placeholder="请输入选项"/>
      </div>
      <div class="option-item">
        <Radio label="D">
        </Radio>
        <Input v-model="answer.D" placeholder="请输入选项"/>
      </div>
    </RadioGroup>
  </div>

</template>
<script>
  import {RadioGroup,Radio,Button,Input} from 'iview'
  import {mapGetters,mapActions} from 'vuex';

  export default {
    name: 'AnswerRadio',
    data() {
      return {
        answer:{
          A:'',
          B:'',
          C:'',
          D:'',
        },
        rightAnswer: ''
      }
    },
    mounted() {
    },
    methods: {
      ...mapActions(['updateAnswers','updateRightAnswer'])
    },
    watch: {
      answer: {
        deep: true,
        handler(val) {
          this.updateAnswers(val);
        }
      },
      rightAnswer(val) {
        this.updateRightAnswer(val);
      }
    },
  }
</script>
<style lang="less">
  .ivu-input-wrapper{
    width: 400px;
    margin:0 7px ;
  }
  .option-item{
    width: 500px;
    margin-bottom: 13px;
  }
</style>
