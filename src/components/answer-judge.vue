<template>
  <div>
    <RadioGroup v-model="rightAnswer">
      <Radio label="正确">
      </Radio>
      <Radio label="错误">
      </Radio>
    </RadioGroup>
  </div>

</template>

<script>
  import {RadioGroup,Radio} from 'iview'
  export default {
    name: 'AnswerJudge',
    props: ['rightAnswer'],
    components:{RadioGroup,Radio},
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
