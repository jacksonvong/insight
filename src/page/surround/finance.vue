<template>
  <div class="finance">
    <iw-banner title="金融保险延保产品"/>
    <div class="main-content">
      <iw-search @change="changeSearchForm" />
      <a-card title="查询结果">
        <a-row :gutter="20" class="iw-card-container">
          <a-col :span="12" class="iw-card-container">
            <iw-card title="金融产品" style="width: 100%;" body-style="height: 500px;">
              <div class="iw-card-container">
                <div v-for="(item, keyword) in financeData" :key="item.key" class="iw-card-container iw-col8">
                  <iw-card-inner :title="item.title" >
                    <template v-if="item.data&&pieKeys.includes(keyword)">
                      <iw-chart :options="item.data" style="height: 180px;" />
                    </template>
                    <template v-else-if="item.data">
                      <iw-simple-box :data="item.data" :show-number="false" :label-width="70" :is-percent="keyword!=='rate'" style="padding-top: 10px; min-height: 180px;" />
                    </template>
                    <iw-empty v-else :status="item.status" style="height:200px;" />
                  </iw-card-inner>
                </div>
              </div>
            </iw-card>
          </a-col>
          <a-col :span="12" class="iw-card-container">
            <iw-card title="保险产品" style="width: 100%;" body-style="height: auto;">
              <div class="iw-card-container">
                <div v-for="(item, keyword) in insuranceData" :key="item.key" class="iw-card-container iw-col8">
                  <iw-card-inner :title="item.title">
                    <template v-if="item.data&&pieKeys.includes(keyword)">
                      <iw-chart :options="item.data" style="height: 180px;" />
                    </template>
                    <template v-else-if="item.data">
                      <iw-simple-box :data="item.data" :show-number="false" :label-width="100" is-percent style="padding-top: 10px; min-height: 180px;" />
                    </template>
                    <iw-empty v-else :status="item.status" style="height:200px;" />
                  </iw-card-inner>
                </div>
              </div>
            </iw-card>
            <iw-card title="延保产品" style="width: 100%;" body-style="height: auto;">
              <div class="iw-card-container">
                <div v-for="(item, keyword) in extendData" :key="item.key" class="iw-card-container iw-col12">
                  <iw-card-inner :title="item.title" >
                    <template v-if="item.data&&pieKeys.includes(keyword)">
                      <iw-chart :options="item.data" style="height: 180px;" />
                    </template>
                    <template v-else-if="item.data">
                      <iw-simple-box :data="item.data" :show-number="false" :label-width="100" is-percent style="padding-top: 10px; min-height: 180px;" />
                    </template>
                    <iw-empty v-else :status="item.status" style="height:200px;" />
                  </iw-card-inner>
                </div>
              </div>
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
import IwCardInner from '@/page/components/card-inner'
import IwSimpleBox from '@/page/components/simple-box'
import IwSearch from '@/page/components/search'
import { getEchartOption } from '@/api/common'
import IwChart from '@/components/charts'
import { Chart } from '@/utils/echarts'

export default {
  name: 'Finance',
  components: {
    ACard: Card,
    ARow: Row,
    ACol: Col,
    IwBanner,
    IwCard,
    IwChart,
    IwCardInner,
    IwSimpleBox,
    IwSearch
  },
  data() {
    return {
      dataForm: {},
      financeData: {
        payType: { key: 10001, title: '付款方式', status: 0, data: {}}, // 付款方式 key: 10001
        downPayment: { key: 10003, title: '首付比例', status: 0, data: {}}, // 首付比例 key: 10003
        period: { key: 10004, title: '余款期数', status: 0, data: {}}, // 余款期数 key: 10004
        loan: { key: 10002, title: '贷款途径', status: 0, data: {}}, // 贷款途径 key: 10002
        repay: { key: 10005, title: '还款方式', status: 0, data: {}}, // 还款方式 key: 10005
        rate: { key: 10007, title: '利率计算方式', status: 0, data: {}} // 利率 key: 10007
      },
      insuranceData: {
        buy: { key: 10008, title: '购买保险', status: 0, data: {}}, // 购买保险 key: 10008
        fee: { key: 10009, title: '保险费用', status: 0, data: {}}, // 保险费用 key: 10009
        content: { key: 10010, title: '保险内容', status: 0, data: {}} // 保险内容 key: 10010
      },
      extendData: {
        situation: { key: 11391, title: '购买情况', status: 0, data: {}}, // 购买情况 key: 11391
        buyFee: { key: 10013, title: '购买费用', status: 0, data: {}} // 购买费用 key: 10013
      },
      pieKeys: ['payType', 'loan', 'repay', 'buy', 'situation']
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
      for (const keyword in this.financeData) {
        const item = this.financeData[keyword]
        const params = Object.assign({}, this.dataForm, { key: item.key })
        this.getEchartOption(params, 'finance', keyword)
      }
      for (const keyword in this.insuranceData) {
        const item = this.insuranceData[keyword]
        const params = Object.assign({}, this.dataForm, { key: item.key })
        this.getEchartOption(params, 'insurance', keyword)
      }
      for (const keyword in this.extendData) {
        const item = this.extendData[keyword]
        const params = Object.assign({}, this.dataForm, { key: item.key })
        this.getEchartOption(params, 'extend', keyword)
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
</style>
