<template>
  <div class="accessory">
    <iw-banner title="精品附件"/>
    <div class="main-content">
      <iw-search @change="changeSearchForm" />
      <a-card title="查询结果">
        <div class="iw-card-container">
          <iw-card v-for="(item, keyword) in accessoryData" :key="item.key" :title="item.title" body-style="height: auto;">
            <div class="iw-card-container">
              <template v-if="item.data&&pieKeys.includes(keyword)">
                <iw-chart :options="item.data" style="height: 180px;" />
              </template>
              <template v-else-if="item.data">
                <iw-simple-box :data="item.data" :show-number="false" :label-width="100" is-percent style="height: 180px;" />
              </template>
              <iw-empty v-else :status="item.status" style="height: 180px;" />
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
import IwCard from '@/page/components/card'
import IwSimpleBox from '@/page/components/simple-box'
import IwSearch from '@/page/components/search'
import { getEchartOption } from '@/api/common'
import IwChart from '@/components/charts'
import { Chart } from '@/utils/echarts'

export default {
  name: 'UserBackground',
  components: {
    ACard: Card,
    IwBanner,
    IwCard,
    IwChart,
    IwSimpleBox,
    IwSearch
  },
  data() {
    return {
      dataForm: {},
      accessoryData: {
        proportion: { key: 10014, title: '购买比例', status: 0, data: {}},
        content: { key: 10018, title: '购买精品内容', status: 0, data: {}},
        outer: { key: 10019, title: '外观附件', status: 0, data: {}},
        inner: { key: 10020, title: '内饰附件', status: 0, data: {}},
        electric: { key: 10021, title: '电子附件', status: 0, data: {}},
        waste: { key: 10022, title: '易耗附件', status: 0, data: {}},
        power: { key: 10023, title: '动力底盘附件', status: 0, data: {}},
        sun: { key: 10012, title: '太阳膜价格', status: 0, data: {}},
        footstep: { key: 10015, title: '蹬车踏板价格', status: 0, data: {}},
        luggage: { key: 10016, title: '行李箱价格', status: 0, data: {}},
        record: { key: 10017, title: '行车记录仪价格', status: 0, data: {}}
      },
      pieKeys: ['proportion']
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
      for (const keyword in this.accessoryData) {
        const item = this.accessoryData[keyword]
        const params = Object.assign({}, this.dataForm, { key: item.key })
        this.getEchartOption(params, 'accessory', keyword)
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
.accessory {
  .iw-card {
    margin: 0 10px 20px 10px;
  }
}
</style>
