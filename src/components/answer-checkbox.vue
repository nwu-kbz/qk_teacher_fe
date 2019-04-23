<template>
  <div>
    <CheckboxGroup v-model="rightAnswer">

      <div class="option-item" v-for="(item,key,index) in answers" :key="index">
        <Checkbox :label="key">{{key}}:</Checkbox>
        <Input v-model="answers[key]" placeholder="请输入选项"/>
        <Button type="error" ghost class="btn-add" @click="handleDelItem(key)">
          <Icon type="md-remove"/>
        </Button>
      </div>

      <Button type="info" long ghost class="btn-add" @click="handleAddItem">
        <Icon type="md-add"/>
      </Button>
    </CheckboxGroup>
  </div>

</template>
<script>
  import {CheckboxGroup, Checkbox, Button, Input} from 'iview';
  import {mapActions, mapGetters} from 'vuex';

  export default {
    name: 'AnswerRadio',
    data() {
      return {
        answers: {},
        rightAnswer: [],
        current: 5
      }
    },
    mounted() {
      this.items = this.answers;
      this.current = Object.keys(this.items).length + 1;
    },
    methods: {
      handleAddItem() {
        const item = 'A' + this.current;
        this.answers = Object.assign({}, this.answers, {[item]: ''});
        ++this.current;
      },
      handleDelItem(key) {
        delete this.answers[key];
        this.rightAnswer.splice(this.rightAnswer.findIndex(x => x === key), 1);
        this.answers = {...this.answers};
      },
      ...mapActions(['updateAnswers', 'updateRightAnswer'])
    },
    watch: {
      answers: {
        handler(val) {
          this.updateAnswers(val);
        },
        deep: true
      },
      rightAnswer(val) {
        this.updateRightAnswer(val);
      },
    },
  }
</script>
<style lang="less">
  .ivu-input-wrapper {
    width: 400px;
  }

  .option-item {
    width: 500px;
    margin-bottom: 13px;
  }
</style>
