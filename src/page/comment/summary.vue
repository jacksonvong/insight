<template>
  <div class="comment-summary">
    <iw-banner title="评价总体"/>
    <div class="main-content">
      <iw-search
        @change="changeSearchForm"
      />
      <a-card title="查询结果">
        <div class="iw-card-container iw-row">
          <div v-for="(item, keyword) in summaryData" :key="keyword" class="iw-card-container iw-col12">
            <iw-card :title="item.title" style="width: 100%; height: 100%;">
              <template v-if="item.data.series&&item.data.series.length&&pieKeys.includes(keyword)">
                <iw-chart :options="item.data" style="height: 180px;" />
              </template>
              <template v-else-if="item.data.series&&item.data.series.length">
                <iw-simple-box :data="item.data" :show-number="false" :label-width="200" style="padding-top: 10px;" />
              </template>
              <iw-empty v-else :status="item.status" style="height:200px;" />
            </iw-card>
          </div>
        </div>
      </a-card>
    </div>
  </div>
</template>

<script>
import { Card } from 'ant-design-vue'
import IwBanner from '@/components/banner/index'
import IwCard from '@/page/components/card'
import IwSearch from '@/page/components/search'
import IwSimpleBox from '@/page/components/simple-box'
import { getEchartOption } from '@/api/common'
import IwChart from '@/components/charts'
import { Chart } from '@/utils/echarts'

export default {
  name: 'Summary',
  components: {
    ACard: Card,
    IwBanner,
    IwCard,
    IwSearch,
    IwChart,
    IwSimpleBox
  },
  data() {
    return {
      dataForm: {},
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
    changeSearchForm(form) {
      this.dataForm = Object.assign(this.dataForm, form)
      this.getData()
    },
    // API
    getData() {
      for (const keyword in this.summaryData) {
        const item = this.summaryData[keyword]
        const params = Object.assign({}, this.dataForm, { key: item.key })
        this.getEchartOption(params, 'summary', keyword)
      }
    },
    getEchartOption(params, group, keyword) {
      console.log(keyword)
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
          console.log(this[group + 'Data'][keyword])
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
.comment-summary {
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
