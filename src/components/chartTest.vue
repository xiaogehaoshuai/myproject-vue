<template>
  <div style="width:700px;margin:0 auto">
    <el-row
      v-if="visible"
      class="chartRow">
      <el-card
        id="chartT"
        class="chartCard">
        <el-row style="padding: 20px 0 0;float:left">
        </el-row>
      </el-card>
    </el-row>
  </div>
</template>

<script>
  import Chart from 'chart.js'
  export default {
    name: 'chartTest',
    props: {
      // learningChapters:{
      //   type:Array,
      //   required: true
      // },
      subChapterNames: {
        type: Array,
        required: true
      },
      subChapterAccuracy: {
        type: Array,
        required: true
      },
      subChapterFinishTime: {
        type: Array,
        required: true
      },
      subChapterQuestions: {
        type: Array,
        required: true
      },
      visible: {
        type: Boolean,
        required: true
      }
    },
    data () {
      return {
        chapterName: [],
        subChapterInfo: [{
          label: '正确率', // ClassName之一
          fill: false,
          data: [], // Mastery
          backgroundColor: '#969C99',
          borderColor: '#969C99',
          borderWidth: 1
        }, {
          label: '差值', // ClassName
          fill: false,
          data: [], // knowledgeMastery
          backgroundColor: '#00BA7E',
          borderColor: '#00BA7E',
          borderWidth: 1
        }, ]

      }
    },
    mounted () {
      this.showChart()
    },
    methods: {
      showChart () {
        this.chapterName = this.subChapterNames
        this.subChapterInfo[0].data = this.subChapterQuestions
        this.subChapterInfo[1].data = this.subChapterAccuracy
        // let thisVue = this
        if (document.getElementById('myChart')) {
          document.getElementById('myChart').remove()
        }
        let cdom = document.createElement('canvas')
        cdom.setAttribute('id', 'myChart')
        cdom.setAttribute('height', '300')
        cdom.setAttribute('width', '920')
        // cdom.style.setProperty("padding","30px")
        document.getElementById('chartT').appendChild(cdom)
        var c = document.getElementById('myChart')
        var ctx = c.getContext('2d')
        window.myChart = new Chart(ctx, {
          defaults: {
            barStrokeWidth: 2,
            // 柱状条组之间的间距(过大或过小会出现重叠偏移错位的效果，请控制合理数值)
            barValueSpacing: 5,
            // 每组柱状条组中柱状条之间的间距
            barDatasetSpacing: 5
          },
          type: 'bar',
          data: {
            labels: this.chapterName,
            datasets: this.subChapterInfo
          },
          options: {
            responsive: true,
            title: {
              display: false
            },
            tooltips: {
              mode: 'index',
              intersect: false
            },
            hover: {
              mode: 'nearest',
              intersect: true
            },
            scales: {
              xAxes: [{
                categoryPercentage: 0.5,
                barPercentage: 1.0,
                barDatasetSpacing: 1,
                rectangle: {
                  borderWidth: 2
                },
                barThickness: 8,
                // maxBarThickness: 8,
                // minBarLength: 2,
                gridLines: {
                  color: '#CCCCCC', // 轴颜色
                  display: false// 隐藏网格线
                },
                display: true,
                // barPercentage: 0.1,
                scaleLabel: {
                  display: false,
                  labelString: '章节',
                  step: 20
                },
                ticks: {// 设置轴文字字号和色值
                  fontSize: 12,
                  fontColor: '#5F6C65',
                  beginAtZero: true// x轴数据从0开始展示
                }
              }],
              yAxes: [{
                gridLines: {
                  color: '#CCCCCC',
                  display: true
                },
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: '掌握度(%)'
                },
                ticks: {// 设置轴文字字号和色值
                  fontSize: 12,
                  fontColor: '#5F6C65',
                  beginAtZero: true, // y轴数据从0开始展示
                  stepSize: 20,
                  min: 0,
                  max: 100
                }
              }]
            }
          }
        })
      }
    }
  }
</script>

<style scoped>
  .chartRow{/*放图表那行的样式*/
    margin-top: 50px;
  }
  .chartCard{  /*图表卡片样式 */
    width: 960px;
    height: 375px;
    margin-right:8px;
    margin-left:8px;
    border-radius: 1px;
    box-shadow: 0 0 10px 0
    rgba(0,0,0,0.05);
  }
</style>
