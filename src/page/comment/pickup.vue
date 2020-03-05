<template>
  <div class="comment-pickup">
    <iw-banner title="试乘试驾评价"/>
    <div class="main-content">
      <iw-search
        @change="changeSearchForm"
      />
      <a-card title="查询结果">
        <a-row :gutter="20" class="iw-card-container iw-row">
          <a-col :span="12" class="iw-card-container">
            <iw-card v-for="(item, keyword) in leftData" :key="keyword" :title="item.title+'['+toPercent(item.sampleNum, 1)+']'" :extra="'MEAN '+(item.avgNum||0)" style="width: 100%;">
              <template v-if="item.option.series&&item.option.series.length&&pieKeys.includes(keyword)">
                <iw-chart :options="item.option" style="height: 180px;" />
              </template>
              <template v-else-if="item.option.series&&item.option.series.length">
                <iw-simple-box :data="item.option" :show-number="false" :label-width="200" is-percent style="padding-top: 10px;" />
              </template>
              <iw-empty v-else :status="item.status" style="height:200px;" />
            </iw-card>
          </a-col>
          <a-col :span="12" class="iw-card-container">
            <iw-card v-for="(item, keyword) in rightData" :key="keyword" :title="item.title+'['+toPercent(item.sampleNum, 1)+']'" :extra="'MEAN '+(item.avgNum||0)" style="width: 100%;" body-style="height: 500px;">
              <template v-if="item.option.series&&item.option.series.length&&pieKeys.includes(keyword)">
                <iw-chart :options="item.option" style="height: 360px;" />
              </template>
              <template v-else-if="item.option.series&&item.option.series.length">
                <iw-simple-box :data="item.option" :show-number="false" :label-width="200" is-percent high-bar style="padding-top: 10px;" />
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
import { getEchartOption } from '@/api/common'
import IwChart from '@/components/charts'
import { Chart } from '@/utils/echarts'
import { toPercent } from '@/utils/filters'

export default {
  name: 'Pickup',
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
        a: { key: 10088, title: '交车过程满意度', status: 0, option: {}},
        b: { key: 10089, title: '不满意的原因', status: 0, option: {}}
      },
      rightData: {
        c: { key: 10090, title: '交车过程销售人员的行为', status: 0, option: {}}
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
          if (data.option.series && data.option.series.length) {
            const option = (this.pieKeys.includes(keyword))
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
            this.$set(this[group + 'Data'][keyword], 'option', option)
          } else {
            this.$set(this[group + 'Data'][keyword], 'option', data.option)
          }
          this.$set(this[group + 'Data'][keyword], 'status', 200)
          this.$set(this[group + 'Data'][keyword], 'sampleNum', data.sampleNum)
          this.$set(this[group + 'Data'][keyword], 'avgNum', data.avgNum)
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
.comment-pickup {
  .iw-card-container {
    display: flex;
    flex-wrap: wrap;
    &.iw-col12 {
      flex: 0 0 50%;
    }
    &.iw-col6 {
      flex: 0 0 25%;
    }
    &.iw-card-col9 {
      flex: 0 0 37.5%;
    }
  }
}
</style>
