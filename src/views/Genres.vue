<template>
  <div>
    <el-row type="flex" align="left">
      <el-col :span="6"/>
      <el-col :span="2">
        起始年份
      </el-col>
      <el-col :span="4">
        <el-date-picker
          v-model="begin"
          type="year"
          placeholder="选择年"
          @change="handleChange">
        </el-date-picker>
      </el-col>
      <el-col :span="2">
        终止年份
      </el-col>
      <el-col :span="4">
        <el-date-picker
          v-model="end"
          type="year"
          placeholder="选择年"
          @change="handleChange">
        </el-date-picker>
      </el-col>
      <!--      <el-col :span="4"/>-->
    </el-row>
    <el-row type="flex" align="left" style="font-size: small; font-weight: lighter">
      <div id="main" style="margin-left: 20%; width: 900px; height: 600px"></div>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Keywords',
  data () {
    return {
      begin: new Date(1980, 1, 1),
      end: new Date(2000, 1, 1),
      type: ['次数', '平均预算', '平均收入'],
      label: ['2012', '2013', '2014', '2015', '2016'],
      time: [320, 332, 301, 334, 390],
      budget: [220, 182, 191, 234, 290],
      revenue: [150, 232, 201, 154, 190]
    }
  },
  mounted () {
    this.drawLine()
  },
  methods: {
    handleChange () {
      // console.log(1900 + this.$data.begin.getYear(), 1900 + this.$data.end.getYear())
      // this.$data.time = [120, 332, 301, 334, 390]
      // 参数情况：（interfaceState：query参数，ID：body参数）
      this.$axios({
        url: 'http://localhost:5000/genres',
        method: 'post',
        // data: { ID: '123' }, // body参数
        params: {
          begin: this.$data.begin.getYear(),
          end: this.$data.end.getYear()
        } // query参数
      }).then(response => {
        console.log(response.data)
        this.$data.label = response.data.label
        this.$data.time = response.data.time
        this.$data.budget = response.data.budget
        this.$data.revenue = response.data.revenue

        this.drawLine()
      })
    },
    drawLine () {
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById('main'))
      var config = {
        rotate: 90,
        align: 'left',
        verticalAlign: 'middle',
        position: 'insideBottom',
        distance: 15,
        onChange: function () {
          const labelOption = {
            rotate: config.rotate,
            align: config.align,
            verticalAlign: config.verticalAlign,
            position: config.position,
            distance: config.distance
          }
          myChart.setOption({
            series: [
              {
                label: labelOption
              },
              {
                label: labelOption
              },
              {
                label: labelOption
              },
              {
                label: labelOption
              }
            ]
          })
        }
      }
      const labelOption = {
        show: true,
        position: config.position,
        distance: config.distance,
        align: config.align,
        verticalAlign: config.verticalAlign,
        rotate: config.rotate,
        formatter: '{c}  {name|{a}}',
        fontSize: 11,
        rich: {
          name: {}
        }
      }
      myChart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: this.$data.type
        },
        toolbox: {
          show: true,
          orient: 'vertical',
          left: 'right',
          top: 'center',
          feature: {
            mark: { show: true },
            dataView: {
              show: true,
              readOnly: false
            },
            magicType: {
              show: true,
              type: ['line', 'bar', 'stack']
            },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        xAxis: [
          {
            type: 'category',
            axisTick: { show: false },
            data: this.$data.label
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: this.$data.type[0],
            type: 'bar',
            barGap: 0,
            label: labelOption,
            emphasis: {
              focus: 'series'
            },
            data: this.$data.time
          },
          {
            name: this.$data.type[1],
            type: 'bar',
            label: labelOption,
            emphasis: {
              focus: 'series'
            },
            data: this.$data.budget
          },
          {
            name: this.$data.type[2],
            type: 'bar',
            label: labelOption,
            emphasis: {
              focus: 'series'
            },
            data: this.$data.revenue
          }
        ]
      })
    }
  }
}
</script>

<style scoped>
.el-row {
  /*margin-bottom: 20px;*/
  float: left;
  background-color: #ffffff;
  height: 5%;
  width: 100%;
  padding: 10px;
  display: flex;
  /*flex-wrap: wrap;*/
  line-height: 50px;
  text-align: left;
}
</style>
