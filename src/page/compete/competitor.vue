<template>
  <div class="competitor">
    <!-- 0--顶部筛选条件 -->
    <iw-banner :title="`竞争对手`"/>
    <div class="main-content">
      <iw-search
        @change="changeDataForm"
      />
      <a-card title="查询结果">
        <div class="iw-card-container iw-row">
          <div class="iw-card-container iw-col iw-col18">
            <iw-card title="[对象]各阶段对比车型" style="width: 100%; height: 100%" body-style="height: 498px;">
              <div class="iw-card-container">
                <div v-for="item in 3" :key="item" class="iw-card-container iw-col8">
                  <iw-card-inner>
                    <iw-simple-box :data="ageData" />
                  </iw-card-inner>
                </div>
              </div>
            </iw-card>
          </div>
          <div class="iw-card-container iw-col iw-col6">
            <iw-card title="信息接触媒体" style="width: 100%; height: 100%" body-style="height: 498px;">
              <iw-simple-box :data="ageData" />
            </iw-card>
          </div>
        </div>
        <div class="iw-card-container iw-row">
          <iw-card title="选择原因和放弃原因分析" style="width: 100%; height: 100%;" body-style="height: 540px;">
            <div v-if="chartVb.series" style="height: 100%; position: relative;">
              <iw-chart :options="chartVb" chart-id="chart-b" style="height: 510px;" />
              <span class="chart-title-tips left-top">劣势点</span>
              <span class="chart-title-tips right-top"> 争议点</span>
              <span class="chart-title-tips left-bottom">低关注</span>
              <span class="chart-title-tips right-bottom">优势点</span>
            </div>
          </iw-card>
        </div>
      </a-card>
    </div>
  </div>
</template>

<script>
import { Card } from 'ant-design-vue'
import IwBanner from '@/components/banner/index'
import IwSearch from '@/page/components/search'
import IwCard from '@/page/components/card'
import IwCardInner from '@/page/components/card-inner'
import IwSimpleBox from '@/page/components/simple-box'
import IwTableBox from '@/page/components/complex-table-box'
import { getBubble } from '@/api/compete'
import { getAge } from '@/api/board'
import IwChart from '@/components/charts'
import { Chart } from '@/utils/echarts'

export default {
  name: 'Info',
  components: {
    ACard: Card,
    IwBanner: IwBanner,
    IwSearch: IwSearch,
    IwCard,
    IwCardInner,
    IwChart,
    IwSimpleBox,
    IwTableBox
  },
  data() {
    return {
      sexData: {},
      ageData: {},
      educationData: {},
      chartVb: {},

      compareData: { // 各阶段对比车型
        websit: { key: 10040, title: '考虑', status: 0, data: {}},
        car: { key: 10041, title: '到点', status: 0, data: {}},
        video: { key: 10042, title: '最终对比', status: 0, data: {}}
      },
      finanlData: { key: 10042, title: '最终对比的车型', status: 0, data: {}},
      crossData: { key: 10042, title: '竞争对手交叉分析', status: 0, data: {}}
    }
  },
  created() {
    this.getData()
  },
  methods: {
    changeDataForm(form) {
      console.log(form)
    },
    // API
    getData() {
      this.getAge()
      this.getBubble()
    },
    getAge(params) {
      return getAge(params).then(res => {
        const data = res.data || {}
        this.ageData = data
      })
    },
    getBubble() {
      return new Promise((resolve, reject) => {
        getBubble({
          areaId: -1,
          compSubModelId: [123, 884, 837, 902, 459],
          dataSourceId: 5,
          dimensionId: 0,
          showType: 1,
          subModelId: 123,
          ym: 201910
        })
          .then(response => {
            const data = response.data || {}
            const xAxisMax = 0.7
            const yAxisMax = 0.5
            this.chartVb = new Chart('scatter', data, {
              customColor: ['#467BF9'],
              backgroundColor: 'transparent',
              tooltipFields: [
                { key: '0', seriesName: '购买卡罗拉的原因' },
                { key: '1', seriesName: '放弃对象的原因' },
                { key: '2', name: true }
              ],
              markLine: {
                silent: true,
                symbol: 'none',
                animation: false,
                label: { show: false },
                data: [
                  {
                    xAxis: xAxisMax / 2,
                    lineStyle: {
                      color: '#6FC2EF',
                      type: 'solid'
                    }
                  },
                  {
                    xAxis: xAxisMax,
                    lineStyle: {
                      color: '#6FC2EF',
                      type: 'solid'
                    }
                  },
                  {
                    yAxis: yAxisMax / 2,
                    lineStyle: {
                      color: '#6FC2EF',
                      type: 'solid'
                    }
                  },
                  {
                    yAxis: yAxisMax,
                    lineStyle: {
                      color: '#6FC2EF',
                      type: 'solid'
                    }
                  }
                ]
              }
            }).getScatterChart()
            resolve(response)
          }).catch(response => {
            reject(response)
          })
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/assets/style/mixins';
.competitor {
  .iw-card-container {
    display: flex;
    flex-wrap: wrap;
    &.iw-col6 {
      flex: 0 0 25%;
    }
    &.iw-col8 {
      flex: 0 0 33.3333%;
      &:first-child { .iw-card-inner { padding-left: 0;}}
      &:last-child { .iw-card-inner { padding-right: 0;}}
    }
    &.iw-col18 {
      flex: 0 0 75%;
    }
  }
  .chart-title-tips {
    position: absolute;
    display: block;
    padding: 4px 10px;
    border-radius: 2px;
    background: #467BF9;
    .font-adjust(14px, inherit, #fff);
    &.left-top { top: 68px; left: 88px; }
    &.right-top { top: 68px; right: 38px; }
    &.left-bottom { bottom: 77px; left: 88px; }
    &.right-bottom { bottom: 77px;  right: 38px; }
  }
}
</style>
