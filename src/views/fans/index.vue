<template>
  <div>
      <el-row :gutter="10">
  <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">   <div class="pie-box">
      <div class="pie-header">
        <div style="font-weight: 700; color: #565656">Keyword Spend Ratio</div>
        <div style="color: #727272; font-size: 14px">Target ACoS: 25%</div>
      </div>
      <div style=" height: 300px" class="div1"></div>
    </div></el-col>
  <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">   <div class="pie-box">
      <div class="pie-header">
        <div style="font-weight: 700; color: #565656">Keyword Spend Ratio</div>
        <div style="color: #727272; font-size: 14px">Target ACoS: 25%</div>
      </div>
      <div style=" height: 300px" class="div2"></div>
    </div></el-col>
  <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">   <div class="pie-box">
      <div class="pie-header">
        <div style="font-weight: 700; color: #565656">Keyword Spend Ratio</div>
        <div style="color: #727272; font-size: 14px">Target ACoS: 25%</div>
      </div>
      <div style=" height: 300px" class="div3"></div>
    </div></el-col>

</el-row>

    <!-- <div class="pie-box">
      <div class="pie-header">
        <div style="font-weight: 700; color: #565656">Keyword Spend Ratio</div>
        <div style="color: #727272; font-size: 14px">Target ACoS: 25%</div>
      </div>
      <div style="width: 520px; height: 300px" class="div1"></div>
    </div> -->
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  created () {},
  mounted () {
    var mCharts = echarts.init(document.querySelector('.div1'))
    var mCharts2 = echarts.init(document.querySelector('.div2'))
    var mCharts3 = echarts.init(document.querySelector('.div3'))

    // pieData就是需要设置给饼图的数据, 数组,数组中包含一个又一个的对象, 每一个对象中, 需要有name和value
    var pieData = [
      {
        name: 'Low ACoS Keywords',
        value: 189.29
      },
      {
        name: 'High ACoS Keywords',
        value: 558.15
      },
      {
        name: 'Low Click Spend',
        value: 82.48
      },
      {
        name: 'Bleeding Spend',
        value: 185.48
      }
    ]
    var total = 0
    pieData.forEach((item) => {
      total += item.value
    })
    total = '$' + (total / 1000).toFixed(2) + 'K'
    // console.log(total);
    var option = {
      legend: {
        top: 'center',
        left: '5%',
        orient: 'vertical',
        icon: 'circle',
        itemGap: 24
      },
      tooltip: {
        trigger: 'item'
      },
      color: ['#0077C7', '#FBA842', '#4EBFF7', '#b1e5fa'],
      graphic: {
        type: 'text',
        right: '20%',
        top: '42%',
        style: {
          text: total,
          textAlign: 'center',
          fill: '#333',
          fontSize: 30,
          fontWeight: 400
        }
      },
      title: {
        text: 'Ad Spend',
        left: '63%',
        top: '53%',
        textStyle: {

          color: '#616161',
          fontSize: 12,
          align: 'center',
          fontWeight: 400
        }
      },

      series: [
        {
          center: ['70%', '50%'],
          type: 'pie',
          data: pieData,
          radius: ['55%', '70%'],
          hoverAnimation: false,
          label: {
            show: false,
            position: 'center'
          }
        }
      ],
      media: [
        {
          query: {
            maxWidth: 1200 // 当长宽比小于1时。
          },
          option: {
            legend: { // legend 放在底部中间。
              top: 0,
              left: '5%',

              icon: 'circle',
              itemGap: 10,
              orient: 'horizontal' // legend 横向布局。
            },
            title: {
              left: '66%'
            },
            graphic: {
              type: 'text',
              right: '25%',
              top: '42%',
              style: {
                text: total,
                textAlign: 'center',
                fill: '#333',
                fontSize: 30,
                fontWeight: 400
              }
            },
            series: [ // 两个饼图左右布局。
              // {
              //   radius: [20, '50%'],
              //   center: ['50%', '30%']
              // },
              // {
              //   radius: [30, '50%'],
              //   center: ['50%', '70%']
              // }
            ]
          }
        },
        {
          query: {
            maxWidth: 1100 // 当长宽比小于1时。
          },
          option: {
            legend: { // legend 放在底部中间。
              top: 0,
              left: '5%',

              icon: 'circle',
              itemGap: 10,
              orient: 'horizontal' // legend 横向布局。
            },
            title: {
              left: '66%'
            },
            graphic: {
              type: 'text',
              right: '24%',
              top: '42%',
              style: {
                text: total,
                textAlign: 'center',
                fill: '#333',
                fontSize: 30,
                fontWeight: 400
              }
            },
            series: [ // 两个饼图左右布局。
              // {
              //   radius: [20, '50%'],
              //   center: ['50%', '30%']
              // },
              // {
              //   radius: [30, '50%'],
              //   center: ['50%', '70%']
              // }
            ]
          }
        },
        {
          query: {
            maxWidth: 980 // 当长宽比小于1时。
          },
          option: {
            legend: { // legend 放在底部中间。
              top: 0,
              left: '5%',

              icon: 'circle',
              itemGap: 10,
              orient: 'horizontal' // legend 横向布局。
            },
            title: {
              left: '66%'
            },
            graphic: {
              type: 'text',
              right: '18%',
              top: '42%',
              style: {
                text: total,
                textAlign: 'center',
                fill: '#333',
                fontSize: 30,
                fontWeight: 400
              }
            },
            series: [ // 两个饼图左右布局。
              // {
              //   radius: [20, '50%'],
              //   center: ['50%', '30%']
              // },
              // {
              //   radius: [30, '50%'],
              //   center: ['50%', '70%']
              // }
            ]
          }
        },
        {
          query: {
            maxWidth: 580 // 当长宽比小于1时。
          },
          option: {
            legend: { // legend 放在底部中间。
              top: 0,
              left: '5%',

              icon: 'circle',
              itemGap: 10,
              orient: 'horizontal' // legend 横向布局。
            },
            title: {
              left: '58%'
            },
            graphic: {
              type: 'text',
              right: '10%',
              top: '42%',
              style: {
                text: total,
                textAlign: 'center',
                fill: '#333',
                fontSize: 30,
                fontWeight: 400
              }
            },
            series: [ // 两个饼图左右布局。
              // {
              //   radius: [20, '50%'],
              //   center: ['50%', '30%']
              // },
              // {
              //   radius: [30, '50%'],
              //   center: ['50%', '70%']
              // }
            ]
          }
        }
      ]
    }
    mCharts.setOption(option)
    mCharts2.setOption(option)
    mCharts3.setOption(option)

    window.onresize = function () {
      console.log(11)
      mCharts.resize()
      mCharts2.resize()
      mCharts3.resize()
    }
  },
  data () {
    return {}
  }
}
</script>

<style lang="less" scoped>
.pie-box {

  height: 360px;
  box-shadow: 0px 0px 5px #ecedef;
}

.pie-header {
  height: 60px;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ecedef;
  box-sizing: border-box;
  padding: 0 25px;
  display: flex;
}
</style>
