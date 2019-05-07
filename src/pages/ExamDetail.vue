<template>
  <QEDuestionList cate="2" :result="result"/>
</template>

<script>
  import QEDuestionList from "../components/QEDuestionList";

  export default {
    name: "ExamDetail",
    components: {QEDuestionList},
    data() {
      return {
        result: []
      }
    },
    methods: {
      getExamQuestions() {
        this.$http.get('/exam/getQuestionsFromExam', {params: {id: this.$route.query.id}}).then(res => {
          if (res.data.code === 1) {
            this.result = this.res.data.data;
          }
        })
      }
    },
    mounted() {
      this.getExamQuestions();
    }
  }
</script>

<style scoped>

</style>
