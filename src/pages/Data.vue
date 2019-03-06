<template>
  <div class="main_container">
      <NavBar></NavBar>
      <div class="chart_container">
        <div class="chart chart1"></div>
        <div class="chart chart2"></div>
        <div class="chart chart3"></div>
        <div class="chart chart4"></div>
      </div>

  </div>
</template>

<script>
  import echarts from 'echarts'
  import NavBar from "../components/NavBar";

  export default {
    name: "Data",
    components: {NavBar},
    mounted() {
      // 基于准备好的dom，初始化echarts实例
      const myChart1 = echarts.init(document.getElementsByClassName('chart1')[0]);
      myChart1.setOption({
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            data: [
              {value: 35, name: '100'},
              {value: 274, name: '90+'},
              {value: 310, name: '80+'},
              {value: 335, name: '70+'},
              {value: 400, name: '60+'},
              {value: 125, name: '60-'},
            ]
          }
        ],
        title : {
          text: '同名数量统计',
          subtext: '纯属虚构',
          x:'center'
        },
      });
      const myChart2 = echarts.init(document.getElementsByClassName('chart2')[0]);
      myChart2.setOption({
        title: {
          text: '每周测评平均分',
          subtext: '纯属虚构',
          x:'center'
        },
        xAxis: {
          type: 'category',
          data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
            '11', '12', '13', '14', '15', '16', '17', '18']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [72.6, 73.5, 75.2, 74.1, 76.6, 72.8, 79, 78.8, 74, 76.3, 74.2, 78.6,
            78.3, 69.2, 70.6, 73.6, 79.2, 80.2, 81.8],
          type: 'line'
        }]
      });
      const myChart3 = echarts.init(document.getElementsByClassName('chart3')[0]);
      myChart3.setOption({
            title: {
              text: '目标得分与实际得分/每大题',
              subtext: '纯属虚构',
              x:'center'
              // subtext: '数据来自网络'
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
            // legend: {
            //   data: ['目标分', '实际分']
            // },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: {
              type: 'value',
              boundaryGap: [0, 0.01]
            },
            yAxis: {
              type: 'category',
              data: ['单选', '多选', '填空', '判断', '计算']
            },
            series: [
              {
                name: '目标分',
                type: 'bar',
                data: [90, 85, 80, 50, 60]
              },
              {
                name: '实际分',
                type: 'bar',
                data: [87, 88, 80, 60, 65]
              }
            ]
          });
      const myChart4 = echarts.init(document.getElementsByClassName('chart4')[0]);
      myChart4.setOption({
        title: {
          text: '每周测评',
          subtext: '纯属虚构',
          x:'center'
        },
        xAxis: {
          type: 'category',
          data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
            '11', '12', '13', '14', '15', '16', '17', '18']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [72.6, 73.5, 75.2, 74.1, 76.6, 72.8, 79, 78.8, 74, 76.3, 74.2, 78.6,
            78.3, 69.2, 70.6, 73.6, 79.2, 80.2, 81.3],
          type: 'line'
        }]
      });
    }

  }


</script>

<style scoped>
  .main_container{
    height: 100%;
    width: 100%;
  }
  .chart_container {
    display: flex;
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    flex-wrap: wrap;
    align-items: flex-start;

  }

  .chart{
    width: 50%;
    height: 50%;
    /*background-color: pink;*/
    display: inline-block;
  }
</style>