<template>
  <div class="comment-deal">
    <iw-banner title="试乘试驾评价"/>
    <div class="main-content">
      <iw-search
        @change="changeSearchForm"
      />
      <a-card title="查询结果">
        <a-row :gutter="20" class="iw-card-container iw-row">
          <a-col :span="12">
            <div v-for="(item, keyword) in leftData" :key="keyword" class="iw-card-container">
              <iw-card :title="item.title" style="width: 100%;">
                <template v-if="item.data.series&&item.data.series.length&&pieKeys.includes(keyword)">
                  <iw-chart :options="item.data" style="height: 180px;" />
                </template>
                <template v-else-if="item.data.series&&item.data.series.length">
                  <iw-simple-box :data="item.data" :show-number="false" :label-width="200" style="padding-top: 10px;" />
                </template>
                <iw-empty v-else :status="item.status" style="height:200px;" />
              </iw-card>
            </div>
          </a-col>
          <a-col :span="12">
            <div v-for="(item, keyword) in rightData" :key="keyword" class="iw-card-container">
              <iw-card :title="item.title" style="width: 100%;">
                <a-row v-if=" item.children" class="iw-card-container">
                  <a-col v-for="(item2, keyword2) in item.children" :span="12" :key="item2.key" class="iw-card-container">
                    <iw-card-inner :title="item2.title" >
                      <template v-if="item2.data&&pieKeys.includes(keyword2)">
                        <iw-chart :options="item2.data" style="height: 180px;" />
                      </template>
                      <template v-else-if="item2.data">
                        <iw-simple-box :data="item2.data" :show-number="false" :label-width="150" style="padding-top: 10px;" />
                      </template>
                      <iw-empty v-else :status="item2.status" style="height:200px;" />
                    </iw-card-inner>
                  </a-col>
                </a-row>
              </iw-card>
            </div>
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
import IwSearch from '@/page/components/search'
import IwSimpleBox from '@/page/components/simple-box'
import { getEchartOption } from '@/api/common'
import IwChart from '@/components/charts'
import { Chart } from '@/utils/echarts'

export default {
  name: 'Deal',
  components: {
    ACard: Card,
    ARow: Row,
    ACol: Col,
    IwBanner,
    IwCard,
    IwCardInner,
    IwSearch,
    IwChart,
    IwSimpleBox
  },
  data() {
    return {
      dataForm: {},
      pieKeys: ['a', 'c1', 'd1'],
      leftData: {
        a: { key: 10082, title: '交易过程满意度', status: 0, data: {}},
        b: { key: 10083, title: '不满意的原因', status: 0, data: {}}
      },
      rightData: {
        c: {
          title: '对赠送内容评价',
          children: {
            c1: { key: 10085, title: '是否遵守承诺', status: 0, data: {}},
            c2: { key: 10084, title: '是否遵守承诺', status: 0, data: {}}
          }
        },
        d: {
          title: '对金融贷款评价',
          children: {
            d1: { key: 10086, title: '金融贷款满意度', status: 0, data: {}},
            d2: { key: 10087, title: '不满意的原因', status: 0, data: {}}
          }
        }
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
      for (const keyword in this.leftData) {
        const item = this.leftData[keyword]
        const params = Object.assign({}, this.dataForm, { key: item.key })
        this.getEchartOption(params, 'left', keyword)
      }
      for (const keyword in this.rightData) {
        const item = this.rightData[keyword]
        if (item.children) {
          for (const keyword2 in item.children) {
            const child = item.children[keyword2]
            const params = Object.assign({}, this.dataForm, { key: child.key })
            this.getEchartOption(params, 'right', keyword, keyword2)
          }
        }
      }
    },
    getEchartOption(params, group, keyword, keyword2) {
      let obj = {}
      if (keyword && keyword2) {
        obj = this[group + 'Data'][keyword]['children'][keyword2]
      } else if (keyword) {
        obj = this[group + 'Data'][keyword]
      } else {
        obj = this[group + 'Data']
      }
      return new Promise((resolve, reject) => {
        getEchartOption(params).then(res => {
          const data = res.data || {}
          if (data.option.series && data.option.series.length) {
            const option = (this.pieKeys.includes(keyword) || this.pieKeys.includes(keyword2))
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
            this.$set(obj, 'data', option)
          } else {
            this.$set(obj, 'data', data.option)
          }
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
.comment-deal {
  .iw-card-container {
    display: flex;
    flex-wrap: wrap;
    &.iw-col8 {
      &:first-child { .iw-card-inner { padding-left: 0;}}
      &:last-child { .iw-card-inner { padding-right: 0;}}
    }
    &.iw-col12 {
      &:first-child {
        .iw-card-inner { padding: 0; }
      }
      &:last-child {
        .iw-card-inner { padding-right: 0; }
      }
    }
  }
}
</style>
