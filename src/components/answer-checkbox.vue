<template>
  <div>
    <CheckboxGroup v-model="rightAnswer">
      <div class="option-item" v-for="(item,key,index) in items" :key="index">
          <Checkbox :label="item.label">:</Checkbox>
        <Input v-model="item.text" placeholder="请输入选项"/>
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
  import {CheckboxGroup,Checkbox,Button,Input} from 'iview'
  export default {
    name: 'AnswerRadio',
    props: ['answers', 'rightAnswer'],
    data() {
      return {
        items: {
          'item1': {text: '', label: '选项1'},
          'item2': {text: '', label: '选项2'},
          'item3': {text: '', label: '选项3'},
          'item4': {text: '', label: '选项4'},
        },
        current: 5
      }
    },
    mounted() {
      this.items = this.answers;
      this.current = Object.keys(this.items).length + 1;
    },
    methods: {
      handleAddItem() {
        const item = 'item' + this.current;
        this.items = Object.assign({}, this.items,{[item]:{text: '', label: `选项${this.current}`}});
        ++this.current;
      },
      handleDelItem(key) {
        --this.current;
        delete this.items[key];
        this.items = {...this.items};
      }
    },
    watch: {
      items: {
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
  }
  .option-item{
    width: 500px;
    margin-bottom: 13px;
  }
</style>
