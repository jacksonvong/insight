<template>
  <div class="comment-facility">
    <iw-banner title="评价总体"/>
    <div class="main-content">
      <iw-search
        @change="changeSearchForm"
      />
      <a-card title="查询结果">
        <a-row :gutter="20" class="iw-card-container iw-row">
          <a-col v-for="(item, keyword) in facilityData" :span="12" :key="keyword" class="iw-card-container">
            <iw-card :title="item.title+'['+toThousand(item.sampleNum)+']'" :extra="'MEAN '+toThousand(item.avgNum, 1)" style="width: 100%; height: 100%;">
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
  name: 'Facility',
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
      facilityData: {
        a: { key: 10077, title: '设施满意度', status: 0, data: {}},
        b: { key: 10078, title: '不满意的原因', status: 0, data: {}}
      }
    }
  },
  created() {
    this.getData()
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
      for (const keyword in this.facilityData) {
        const item = this.facilityData[keyword]
        const params = Object.assign({}, this.dataForm, { key: item.key })
        this.getEchartOption(params, 'facility', keyword)
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
            this.$set(this[group + 'Data'][keyword], 'data', option)
          } else {
            this.$set(this[group + 'Data'][keyword], 'data', data.option)
          }
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
.comment-facility {
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
