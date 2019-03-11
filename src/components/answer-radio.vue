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
  export default {
    name: 'AnswerRadio',
    props: ['answers', 'rightAnswer'],
    data() {
      return {
        answer:{}
      }
    },
    mounted() {
      this.answer = this.answers;
    },
    methods: {

    },
    watch: {
      answer: {
        handler(val) {
          this.$emit('update:answers', val);
        },
        deep: true
      },
      rightAnswer(val) {
        this.$emit('update:rightAnswer', val);
      },
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
