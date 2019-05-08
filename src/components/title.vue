<template>
  <div class="title">{{content}}</div>
</template>

<script>
  export default {
    props: ['content'],
    name: "atitle"
  }
</script>

<style scoped>
  .title {
    border-left: #1cbbb4 5px solid;
    color: #666666;
    font-size: 25px;
    height: 45px;
    width: 100%;
    padding: 7px;
    /*line-height: 45px;*/
  }
</style>
