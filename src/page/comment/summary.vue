<template>
  <div class="comment-summary">
    <iw-banner/>
    <div class="main-content">
      <iw-search
        @comparison="changeContrastForm"
        @change="changeSearchForm"
      />
      <a-card v-if="activeCard===1" title="查询结果">
        <a-row :gutter="20" class="iw-card-container iw-row">
          <a-col v-for="(item, keyword) in summaryData" :span="12" :key="keyword" class="iw-card-container">
            <iw-card :title="item.title+'['+toPercent(item.sampleNum, 1)+']'" :extra="'MEAN '+(item.avgnum||0)" style="width: 100%;">
              <template v-if="item.data.series&&item.data.series.length&&pieKeys.includes(keyword)">
                <iw-chart :options="item.data" style="height: 180px;" />
              </template>
              <template v-else-if="item.data.series&&item.data.series.length">
                <iw-simple-box :data="item.data" :show-number="false" :label-width="200" is-percent style="padding-top: 10px;" />
              </template>
              <iw-empty v-else :status="item.status" style="height:200px;" />
            </iw-card>
          </a-col>
        </a-row>
      </a-card>
      <a-card v-if="activeCard===2" title="查询结果">
        <a-row :gutter="20" class="iw-card-container iw-row">
          <a-col v-for="(item, keyword) in summaryData" :span="12" :key="keyword" class="iw-card-container">
            <iw-card :title="item.title+'['+toPercent(item.sampleNum, 1)+']'" :extra="'MEAN '+(item.avgnum||0)" style="width: 100%;">
              <template v-if="item.data.series&&item.data.series.length&&pieKeys.includes(keyword)">
                <iw-chart :options="item.data" style="height: 100%;" />
              </template>
              <template v-else-if="item.data.series&&item.data.series.length">
                <iw-simple-box :data="item.data" :show-number="false" :label-width="200" is-percent style="padding-top: 10px;" />
              </template>
              <iw-empty v-else :status="item.status" style="height:200px;" />
            </iw-card>
          </a-col>
        </a-row>
      </a-card>
    </div>
  </div>
</template>

<script>
import { Card, Row, Col } from 'ant-design-vue'
import IwBanner from '@/components/banner/index'
import IwCard from '@/page/components/card'
import IwSearch from '@/page/components/search'
import IwSimpleBox from '@/page/components/simple-box'
import { getEchartOption, getEchartOptionContrast } from '@/api/common'
import IwChart from '@/components/charts'
import { Chart } from '@/utils/echarts'
import { toPercent } from '@/utils/filters'

export default {
  name: 'Summary',
  components: {
    ACard: Card,
    ARow: Row,
    ACol: Col,
    IwBanner,
    IwCard,
    IwSearch,
    IwChart,
    IwSimpleBox
  },
  data() {
    return {
      activeCard: 1,
      dataForm: {},
      contrastForm: {},
      pieKeys: ['a', 'b', 'c'],
      summaryData: {
        a: { key: 10070, title: '总体销售满意度', status: 0, data: {}},
        b: { key: 10071, title: '推荐意愿', status: 0, data: {}},
        c: { key: 10068, title: '是否去过其他店', status: 0, data: {}},
        d: { key: 10069, title: '选择到店原因', status: 0, data: {}}
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    toPercent() {
      return toPercent(...arguments)
    },
    changeSearchForm(form) {
      this.dataForm = Object.assign(this.dataForm, form)
      this.activeCard = 1
      this.getData()
    },
    changeContrastForm(form) {
      this.dataForm = Object.assign(this.dataForm, form)
      this.activeCard = 2
      this.getContrastData()
    },
    // API
    getData() {
      for (const keyword in this.summaryData) {
        const item = this.summaryData[keyword]
        const params = Object.assign({}, this.dataForm, { key: item.key })
        this.getEchartOption(params, 'summary', keyword)
      }
    },
    getContrastData() {
      for (const keyword in this.summaryData) {
        const item = this.summaryData[keyword]
        const params = Object.assign({}, this.contrastForm, { key: item.key })
        this.getEchartOptionContrast(params, 'summary', keyword)
      }
    },
    getEchartOption(params, group, keyword) {
      return new Promise((resolve, reject) => {
        getEchartOption(params).then(res => {
          const data = res.data || {}
          this.$set(this[group + 'Data'][keyword], 'data',
            (this.pieKeys.includes(keyword))
              ? new Chart('pie', data.option, {
                customColor: ['#467BF9', '#21D1D9'],
                backgroundColor: 'transparent'
                // legend: { show: false }
              }).getChart()
              : new Chart('bar', data.option, {
                backgroundColor: 'transparent',
                dataZoom: { show: false },
                legend: { show: false },
                showTooltip: false
              }).getChart()
          )
          this.$set(this[group + 'Data'][keyword], 'avgNum', data.avgNum)
          this.$set(this[group + 'Data'][keyword], 'sampleNum', data.sampleNum)
          this.$set(this[group + 'Data'][keyword], 'status', 200)
          resolve(res)
        }).catch(res => {
          this.$set(this[group + 'Data'][keyword], 'status', 500)
          reject(res)
        })
      })
    },
    getEchartOptionContrast(params, group, keyword) {
      return new Promise((resolve, reject) => {
        getEchartOptionContrast(params).then(res => {
          const data = res.data || {}
          this.$set(this[group + 'Data'][keyword], 'data', new Chart('bar', data.option, {
            backgroundColor: 'transparent',
            dataZoom: { show: false },
            legend: { orient: 'horizontal', bottom: 0 },
            grid: {
              top: 10,
              bottom: 30,
              left: 50,
              right: 50
            },
            barMaxWidth: 24,
            labelColor: '#FFF',
            defaultField: { type: 'normal', unit: '' }
          }).getChart())
          this.$set(this[group + 'Data'][keyword], 'status', 200)
          resolve(res)
        }).catch(res => {
          this.$set(this[group + 'Data'][keyword], 'status', 500)
          reject(res)
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
