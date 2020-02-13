<template>
  <div class="market-overview">
    <!-- 0--顶部筛选条件 -->
    <iw-banner :title="`车型概览`"/>

    <div id="page" :class="{'filter--fixed':$store.state.app.filter==='fixed'}" class="main-content">
      <!-- 0--条件过滤 -->
      <iw-banner-filter :id="$store.state.app.filter!=='fixed'?'overview-analyse':''" @change="changeDataForm" />

      <a-card>
        <iw-charts :options="chartVa" chart-id="chart-a" style="height: 300px;" />
      </a-card>
      <a-card>
        <div>
          <div v-if="chartVb.series" style="height: 100%; position: relative;">
            <iw-charts :options="chartVb" chart-id="chart-b" style="height: 400px;" />
            <span class="chart-title-tips left-top">
              市场需求减弱区
              <a-tooltip placement="rightTop">
                <template slot="title">
                  <span>销量同比下降，份额环比上升，是整体大环境需求减少带来的销售下滑，跟竞品比较仍相对有优势</span>
                </template>
                <i>?</i>
              </a-tooltip>
            </span>
            <span class="chart-title-tips right-top">
              销售优良区
              <a-tooltip placement="rightTop">
                <template slot="title">
                  <span>销量同比、份额环比双增长，销售形势良好</span>
                </template>
                <i>?</i>
              </a-tooltip>
            </span>
            <span class="chart-title-tips left-bottom">
              销售受阻区
              <a-tooltip placement="rightTop">
                <template slot="title">
                  <span>销量同比、份额环比双下滑，说明该品牌销售情况较差，销量下滑，市场份额被竞品蚕食，销售受阻</span>
                </template>
                <i>?</i>
              </a-tooltip>
            </span>
            <span class="chart-title-tips right-bottom">
              竞争力降低区
              <a-tooltip placement="rightTop">
                <template slot="title">
                  <span>销量同比上升，份额环比下降，虽销量增长，但增速未能跟上整体市场步伐，竞争力下降，跟竞品相比处于劣势</span>
                </template>
                <i>?</i>
              </a-tooltip>
            </span>
          </div>
        </div>
      </a-card>
    </div>
  </div>
</template>

<script>
import { Card, Tooltip } from 'ant-design-vue'
import IwBanner from '@/components/banner/index'
import IwBannerFilter from '@/components/banner/filter'
import IwCharts from '@/components/charts'

import { getWordCloud, getBubble } from '@/api/index'
import { Chart } from '@/utils/echarts'

export default {
  components: {
    'a-card': Card,
    'a-tooltip': Tooltip,
    'iw-banner': IwBanner,
    'iw-banner-filter': IwBannerFilter,
    'IwCharts': IwCharts
  },
  data() {
    return {
      dataForm: {},
      chartVa: {},
      chartVb: {}
    }
  },
  methods: {
    changeDataForm(form) {
      console.log(form)
      this.dataForm = { ...this.dataForm, ...form }
      this.getWordCloud()
      this.getBubble()
    },
    getWordCloud() {
      return new Promise((resolve, reject) => {
        getWordCloud({
        })
          .then(response => {
            const data = response.data[0] || {}
            this.chartVa = new Chart('bar', data).getWordCloudChart()
            resolve(response)
          }).catch(response => {
            reject(response)
          })
      })
    },
    getBubble() {
      return new Promise((resolve, reject) => {
        getBubble({
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
            this.chartVb = new Chart('scatter', data, {
              // customColor: ['#85AFF6', '#F89A8C'],
              tooltipFields: [
                { key: '2', seriesName: `销量`, type: 'normal', unit: '辆' },
                { key: '0', seriesName: '销量同比' },
                { key: '1', seriesName: '份额环比' },
                { key: '3', name: true }
              ]
            }).getScatterChart()
            resolve(response)
          }).catch(response => {
            reject(response)
          })
      })
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/style/mixins';
.market-overview {
  .chart-title-tips {
    position: absolute;
    display: block;
    padding: 5px 2px;
    .font-adjust(14px, 34px, #181c2b);
    &.left-top { top: 60px; left: 30px; color: #f7d783; }
    &.right-top { top: 60px; right: 30px; color: #80dd81; }
    &.left-bottom { bottom: 0; left: 30px; color: #999999; }
    &.right-bottom { bottom: 0;  right: 30px; color: #6fc2ef; }
    i {
      .border-radius(50%);
      .font-adjust(12px, 14px, #fff);
      color: #fff;
      background-color: #dfdfdf;
      display: inline-block;
      width: 14px;
      height: 14px;
      cursor: pointer;
    }
  }
}
</style>
