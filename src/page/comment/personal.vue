<template>
  <div class="comment-summary">
    <iw-banner title="人员评价"/>
    <div class="main-content">
      <iw-search
        @change="changeSearchForm"
      />
      <a-card title="查询结果">
        <a-row :gutter="20" class="iw-card-container iw-row">
          <a-col :span="12" class="iw-card-container">
            <iw-card v-for="(item, keyword) in leftData" :key="keyword" :title="item.title+'['+toThousand(item.sampleNum)+']'" :extra="'MEAN '+toThousand(item.avgNum, 1)" style="width: 100%;" body-style="height:297px;">
              <template v-if="item.data.series&&item.data.series.length&&pieKeys.includes(keyword)">
                <iw-chart :options="item.data" style="height: 100%;" />
              </template>
              <template v-else-if="item.data.series&&item.data.series.length">
                <iw-simple-box :data="item.data" :show-number="false" :label-width="200" is-percent style="padding-top: 10px; height: 100%" />
              </template>
              <iw-empty v-else :status="item.status" style="height:200px;" />
            </iw-card>
          </a-col>
          <a-col :span="12" class="iw-card-container">
            <iw-card v-for="(item, keyword) in rightData" :key="keyword" :title="item.title+'['+toThousand(item.sampleNum)+']'" :extra="'MEAN '+toThousand(item.avgNum, 1)" style="width: 100%;" body-style="height:180px;">
              <template v-if="item.data&&pieKeys.includes(keyword)">
                <iw-chart :options="item.data" style="height: 180px;" />
              </template>
              <template v-else-if="item.data">
                <iw-simple-box :data="item.data" :show-number="false" :label-width="200" is-percent style="padding-top: 10px; height: 180px" />
              </template>
              <iw-empty v-else :status="item.status" style="height:180px;" />
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
import { getEchartOption } from '@/api/common'
import IwChart from '@/components/charts'
import { Chart } from '@/utils/echarts'
import { toThousand } from '@/utils/filters'

export default {
  name: 'Personal',
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
      dataForm: {},
      pieKeys: ['a'],
      leftData: {
        a: { key: 10072, title: '销售人员满意度', status: 0, data: {}},
        b: { key: 10073, title: '不满意的原因', status: 0, data: {}}
      },
      rightData: {
        c: { key: 10074, title: '服务积极性', status: 0, data: {}},
        d: { key: 10075, title: '了解车主需求', status: 0, data: {}},
        e: { key: 10076, title: '介绍的产品内容', status: 0, data: {}}
      },
      that: this
    }
  },
  methods: {
    toThousand() {
      return toThousand(...arguments)
    },
    changeSearchForm(form) {
      this.dataForm = Object.assign(this.dataForm, form)
      this.getData()
    },
    // API
    getData() {
      for (const keyword in this.leftData) {
        const item = this.leftData[keyword]
        const params = Object.assign({}, this.dataForm, { key: item.key })
        this.getEchartOption(params, 'left', keyword)
      }
      for (const keyword in this.rightData) {
        const item = this.rightData[keyword]
        const params = Object.assign({}, this.dataForm, { key: item.key })
        this.getEchartOption(params, 'right', keyword)
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
    }
  }
}
</script>

<style lang="less" scoped>
</style>
