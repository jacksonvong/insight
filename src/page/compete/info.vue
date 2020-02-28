<template>
  <div class="info">
    <!-- 0--顶部筛选条件 -->
    <iw-banner :title="`信息触点`"/>
    <div class="main-content">
      <iw-search
        @change="changeDataForm"
      />
      <a-card title="查询结果">
        <div class="iw-card-container iw-row">
          <div class="iw-card-container  iw-col iw-col2">
            <iw-card title="信息接触媒体" style="width: 100%;" body-style="height: 500px;">
              <iw-table-box :data="infoData.data" :table-data="orderData.data" />
            </iw-card>
          </div>
          <div class="iw-card-container iw-col iw-col2">
            <iw-card v-for="(item, key) in otherData" :key="key" :title="item.title">
              <iw-chart v-if="item.data&&item.key==='websit'" :options="item.data" />
              <iw-simple-box v-else-if="item.data" :data="item.data" />
              <iw-empty v-else :status="item.status" style="height: 180px;" />
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
import IwSearch from '@/page/components/search'
import IwCard from '@/page/components/card'
import IwSimpleBox from '@/page/components/simple-box'
import IwTableBox from '@/page/components/complex-table-box'
import { getContactOrder } from '@/api/compete'
import IwChart from '@/components/charts'
import { Chart } from '@/utils/echarts'
import { getEchartOption } from '@/api/common'

export default {
  name: 'Info',
  components: {
    ACard: Card,
    IwBanner: IwBanner,
    IwSearch: IwSearch,
    IwCard,
    IwChart,
    IwSimpleBox,
    IwTableBox
  },
  data() {
    return {
      sexData: {},
      ageData: {},
      educationData: {},

      dataForm: {},
      infoData: { key: 10062, title: '信息接触媒体', status: 0, data: {}},
      orderData: { key: 10063, title: '信息接触媒体', status: 0, data: {}},
      mediaData: { key: 10064, title: '促购力最大的信息渠道', status: 0, data: {}},
      otherData: { // 三个图
        websit: { key: 10065, title: '门户网站', status: 0, data: {}},
        car: { key: 10066, title: '汽车垂直网站/APP', status: 0, data: {}},
        video: { key: 10067, title: '视频媒体', status: 0, data: {}}
      },
      pieKeys: []
    }
  },
  created() {
    this.getData()
  },
  methods: {
    changeDataForm(form) {
      console.log(form)
      this.getData()
    },

    // API
    getData() {
      this.getContactOrder(Object.assign({}, this.dataForm, { key: this.orderData.key }), 'order')
      this.getEchartOption(Object.assign({}, this.dataForm, { key: this.infoData.key }), 'info')
      this.getEchartOption(Object.assign({}, this.dataForm, { key: this.mediaData.key }), 'media')
      for (const keyword in this.otherData) {
        const item = this.otherData[keyword]
        const params = Object.assign({}, this.dataForm, { key: item.key })
        this.getEchartOption(params, 'other', keyword)
      }
    },
    getContactOrder(params) {
      return new Promise((resolve, reject) => {
        getContactOrder(params).then(res => {
          const data = res.data || {}
          this.orderData.data = data
          this.$set(this.orderData, 'status', 200)
          resolve(res)
        }).catch(res => {
          this.$set(this.orderData, 'status', 500)
          reject(res)
        })
      })
    },
    getEchartOption(params, group, keyword) {
      const obj = keyword ? this[group + 'Data'][keyword] : this[group + 'Data']
      return new Promise((resolve, reject) => {
        getEchartOption(params).then(res => {
          const data = res.data || {}
          this.$set(obj, 'data',
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
          this.$set(obj, 'status', 200)
          resolve(res)
        }).catch(res => {
          this.$set(obj, 'status', 500)
          reject(res)
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.info {
  .iw-card-container {
    display: flex;
    flex-wrap: wrap;
    &.iw-col2 {
      flex: 0 0 50%;
      &:last-child {
        .iw-card {
          margin: 0 20px 20px 0;
        }
      }
    }
  }
}
</style>
