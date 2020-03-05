<template>
  <div class="competitor">
    <!-- 0--顶部筛选条件 -->
    <iw-banner :title="`竞争对手`"/>
    <div class="main-content">
      <iw-search
        :multiple="{submodel: false}"
        @change="changeDataForm"
      />
      <a-card title="查询结果">
        <a-row :gutter="20" class="iw-card-container">
          <a-col :span="18" class="iw-card-container">
            <iw-card title="[对象]各阶段对比车型" style="width: 100%; height: 100%" body-style="height: 498px;">
              <a-row :gutter="20" class="iw-card-container">
                <a-col v-for="(item, key) in compareData" :key="key" class="iw-card-container iw-col8">
                  <iw-card-inner :title="item.title">
                    <iw-simple-box :data="item.option" />
                  </iw-card-inner>
                </a-col>
              </a-row>
            </iw-card>
          </a-col>
          <a-col :span="6" class="iw-card-container">
            <iw-card :title="finanlData.title" style="width: 100%; height: 100%" body-style="height: 498px;">
              <iw-card-inner style="padding-top:20px;">
                <iw-simple-box :data="finanlData.option" />
              </iw-card-inner>
            </iw-card>
          </a-col>
        </a-row>
        <a-row class="iw-card-container">
          <iw-card :title="crossData.title" style="width: 100%; height: 100%;" body-style="height: 540px;">
            <div v-if="crossData.option.series" style="height: 100%; position: relative;">
              <iw-chart :options="crossData.option" chart-id="chart-b" style="height: 510px;" />
              <span class="chart-title-tips left-top">劣势点</span>
              <span class="chart-title-tips right-top"> 争议点</span>
              <span class="chart-title-tips left-bottom">低关注</span>
              <span class="chart-title-tips right-bottom">优势点</span>
            </div>
          </iw-card>
        </a-row>
      </a-card>
    </div>
  </div>
</template>

<script>
import { Card, Row, Col } from 'ant-design-vue'
import IwBanner from '@/components/banner/index'
import IwSearch from '@/page/components/search'
import IwCard from '@/page/components/card'
import IwCardInner from '@/page/components/card-inner'
import IwSimpleBox from '@/page/components/simple-box'
import IwTableBox from '@/page/components/complex-table-box'
import IwChart from '@/components/charts'
import { Chart } from '@/utils/echarts'
import { getCompTop15, getCompCross } from '@/api/compete'

export default {
  name: 'Info',
  components: {
    ACard: Card,
    ARow: Row,
    ACol: Col,
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

      compareData: { // 各阶段对比车型
        websit: { key: 10040, title: '考虑', status: 0, option: {}},
        car: { key: 10041, title: '到点', status: 0, option: {}},
        video: { key: 10042, title: '最终对比', status: 0, option: {}}
      },
      finanlData: { key: 10042, title: '最终对比[对象]的车型', status: 0, option: {}},
      crossData: { key: 10042, title: '选择原因和放弃原因分析', status: 0, option: {}},
      pieKeys: []
    }
  },
  created() {
    // this.getData()
  },
  methods: {
    changeDataForm(form) {
      this.dataForm = Object.assign({}, this.dataForm, form)
      this.getData()
    },
    // API
    getData() {
      for (const keyword in this.compareData) {
        const item = this.compareData[keyword]
        const params = Object.assign({}, this.dataForm, { key: item.key })
        this.getCompTop15(params, 'compare', keyword)
      }
      const item = this.finanlData
      const params = Object.assign({}, this.dataForm, { key: item.key })
      this.getCompTop15(params, 'finanl')

      this.getCompCross()
    },
    getCompTop15(params, group, keyword) {
      let obj
      if (keyword) {
        obj = this[group + 'Data'][keyword]
      } else {
        obj = this[group + 'Data']
        params.subModelId = params.subModelIds[0]
      }
      return new Promise((resolve, reject) => {
        getCompTop15(params).then(res => {
          const data = res.data || {}
          this.$set(obj, 'option',
            (this.pieKeys.includes(keyword))
              ? new Chart('pie', data.option, {
                customColor: ['#467BF9', '#21D1D9'],
                backgroundColor: 'transparent',
                legend: { show: false }
              }).getChart()
              : new Chart('bar', data.option, {
                backgroundColor: 'transparent',
                dataZoom: { show: false },
                legend: { show: false },
                showTooltip: false
              }).getChart()
          )
          this.$set(obj, 'avgNum', data.avgNum)
          this.$set(obj, 'sampleNum', data.sampleNum)
          this.$set(obj, 'status', 200)
          resolve(res)
        }).catch(res => {
          this.$set(obj, 'status', 500)
          reject(res)
        })
      })
    },
    getCompCross() {
      return new Promise((resolve, reject) => {
        getCompCross({
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
            const option = new Chart('scatter', data, {
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
            this.$set(this.crossData, 'option', option)
            this.$set(this.crossData, 'status', 200)
            resolve(response)
          }).catch(response => {
            this.$set(this.crossData, 'status', 500)
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
