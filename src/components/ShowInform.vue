<template>
  <div class="main">
   {{detail.content}}
  </div>
</template>

<script>
  export default {
    name: "showInform",
    data() {
      return {
        detail: {},
        details: [
          {
            id: 1,
            title: 'inform001',
            content: 'this is inform001'
          },
          {
            id: 2,
            title: 'inform002',
            content: 'this is inform002'
          },
          {
            id: 3,
            title: 'inform003',
            content: 'this is inform003'
          }
        ]
      }
    },
    mounted(){
      this.detail = this.details.find(detail => this.$route.params.id*1 === detail.id)
    },
    watch:{
      $route:function () {
        this.detail = this.details.find(detail => this.$route.params.id*1 === detail.id)
      }
    }
  }
</script>

<style scoped>

</style>