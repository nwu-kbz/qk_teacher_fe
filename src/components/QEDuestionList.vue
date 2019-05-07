<template>
  <div>
    <Card :bordered="false" v-for="(item,index) in result" :key="index" class="margin10">
      <!---->
      <div v-show="cate===1">
        <h5 slot="title">
          <Icon size="30" type="md-help"/>
          问题: {{jsonParse(item["content"])["content"]}}
        </h5>
        <div class="content">
          <div class="pull-both">
            <span><Icon size="20" type="md-analytics"/>答案: {{jsonParse(item["content"])["answer"]}}</span>
            <span><Icon size="20" type="md-star-half"/>评分: <Rate :count="4" disabled v-model="item.hard"/></span>
            <span><Icon size="20" type="ios-time"/>预计答题时间: {{item.time}}</span>
          </div>
          <div class="pull-both">
            <span><Icon size="20" type="md-apps"/>章节: 第 {{item.chapter}} 章</span>
            <span><Icon size="20" type="md-checkmark-circle"/>正确次数: {{item.right}}</span>
            <span><Icon size="20" type="md-close-circle"/>错误次数: {{item.wrong}}</span>
          </div>
        </div>
      </div>
      <div v-show="cate===2">
        <h5 slot="title">
          <Icon size="30" type="ios-copy"/>
          {{item.name}}
        </h5>
        <div class="pull-both"><span><Icon size="20" type="ios-time"/>测试时长: {{item.time}} 分钟</span> <span><Icon
          size="20" type="md-star-half"/>难度: <Rate :count="4" disabled v-model="item.hard"/></span></div>
      </div>
    </Card>
    <div v-show="resultArr.length===0" style="text-align: center">
      <Icon type="ios-alert-outline" size="50"/>
      <h3>啊哦!暂时没有内容呢~</h3>
    </div>
  </div>
</template>

<script>
  export default {
    name: "QEDuestionList",
    props: ['result', 'cate'],
    methods: {
      jsonParse(str) {
        if (str && JSON.parse(str)) {
          return JSON.parse(str)
        } else {
          return "";
        }
      },
    }
  }
</script>

<style scoped>

</style>
