<template>
  <div class="info">
    <!-- 0--顶部筛选条件 -->
    <iw-banner :title="`竞争对手`"/>
    <div class="main-content">
      <iw-search
        :tab-list="tabList"
        :tab-key="tabKey"
        @onTabChange="changeTab"
        @change="changeDataForm"
      />
      <a-card v-if="tabKey==1" title="查询结果">
        <div class="iw-card-container iw-row">
          <div class="iw-card-container iw-col12">
            <iw-card title="选择原因" style="width: 100%; height: 100%;" body-style="height: 400px;">
              <iw-table-box :data="selectReasonData" />
            </iw-card>
          </div>
          <div class="iw-card-container iw-col12">
            <iw-card title="放弃原因" style="width: 100%; height: 100%;" body-style="height: 400px;">
              <iw-table-box :data="selectReasonData" />
            </iw-card>
          </div>
        </div>
        <div class="iw-card-container iw-row">
          <iw-card title="选择原因和放弃原因分析" style="width: 100%; height: 100%;" body-style="height: 540px;">
            <div v-if="chartVb.series" style="height: 100%; position: relative;">
              <iw-chart :options="chartVb" chart-id="chart-b" style="height: 510px;" />
              <span class="chart-title-tips left-top">劣势点</span>
              <span class="chart-title-tips right-top"> 争议点</span>
              <span class="chart-title-tips left-bottom">低关注</span>
              <span class="chart-title-tips right-bottom">优势点</span>
            </div>
          </iw-card>
        </div>
      </a-card>
      <a-card v-if="tabKey==2" title="查询结果">
        <div class="iw-card-container">
          <div class="iw-card-container iw-col6">
            <iw-card title="主要竞争对手(TOP10)" style="height: 100%;" body-style="height: 100%">
              <iw-top10-box :data="top10Data"/>
            </iw-card>
          </div>
          <div class="iw-card-container iw-card-col9">
            <iw-card title="购买对象的原因" style="width: 100%; height: 100%;" body-style="height: 400px;">
              <iw-table-box :data="selectReasonData" />
            </iw-card>
          </div>
          <div class="iw-card-container iw-card-col9">
            <iw-card title="放弃[卡罗拉]的原因" style="width: 100%; height: 100%;" body-style="height: 400px;">
              <iw-table-box :data="selectReasonData" />
            </iw-card>
          </div>
        </div>
        <div class="iw-card-container">
          <iw-card title="选择原因和放弃原因分析" style="width: 100%; height: 100%;" body-style="height: 540px;">
            <div v-if="chartVb.series" style="height: 100%; position: relative;">
              <iw-chart :options="chartVb" chart-id="chart-b" style="height: 510px;" />
              <span class="chart-title-tips left-top">劣势点</span>
              <span class="chart-title-tips right-top"> 争议点</span>
              <span class="chart-title-tips left-bottom">低关注</span>
              <span class="chart-title-tips right-bottom">优势点</span>
            </div>
          </iw-card>
        </div>
      </a-card>
      <a-card v-if="tabKey==3" title="查询结果">
        <div class="iw-card-container">
          <div class="iw-card-container iw-col6">
            <iw-card title="主要竞争对手(TOP10)" style="height: 100%;" body-style="height: 100%">
              <iw-top10-box :data="top10Data"/>
            </iw-card>
          </div>
          <div class="iw-card-container iw-card-col9">
            <iw-card title="购买对象的原因" style="width: 100%; height: 100%;" body-style="height: 400px;">
              <iw-table-box :data="selectReasonData" />
            </iw-card>
          </div>
          <div class="iw-card-container iw-card-col9">
            <iw-card title="放弃[卡罗拉]的原因" style="width: 100%; height: 100%;" body-style="height: 400px;">
              <iw-table-box :data="selectReasonData" />
            </iw-card>
          </div>
        </div>
        <div class="iw-card-container">
          <iw-card title="选择原因和放弃原因分析" style="width: 100%; height: 100%;" body-style="height: 540px;">
            <div v-if="chartVb.series" style="height: 100%; position: relative;">
              <iw-chart :options="chartVb" chart-id="chart-b" style="height: 510px;" />
              <span class="chart-title-tips left-top">劣势点</span>
              <span class="chart-title-tips right-top"> 争议点</span>
              <span class="chart-title-tips left-bottom">低关注</span>
              <span class="chart-title-tips right-bottom">优势点</span>
            </div>
          </iw-card>
        </div>
      </a-card>
    </div>
  </div>
</template>

<script>
import { Card, Tooltip } from 'ant-design-vue'
import IwBanner from '@/components/banner/index'
import IwSearch from '@/page/components/search'
import IwCard from '@/page/components/card'
import IwSimpleBox from '@/page/components/simple-box'
import IwTableBox from '@/page/components/simple-table-box'
import Top10Box from '@/page/components/top10-box'
import IwChart from '@/components/charts'
import { Chart } from '@/utils/echarts'
import { getSelectReason, getBubble } from '@/api/compete'
import { getTop10 } from '@/api/old-car'

export default {
  name: 'Info',
  components: {
    ACard: Card,
    ATooltip: Tooltip,
    IwBanner: IwBanner,
    IwSearch: IwSearch,
    IwCard,
    IwSimpleBox,
    IwTableBox,
    IwTop10Box: Top10Box,
    IwChart
  },
  data() {
    return {
      tabList: [
        { key: '1', tab: '选择和放弃原因' },
        { key: '2', tab: '流入对手分析' },
        { key: '3', tab: '流出对手分析' }
      ],
      tabKey: '1',
      selectReasonData: {},
      chartVb: {},

      top10Data: []
    }
  },
  created() {
    this.getData()
  },
  methods: {
    changeTab(key) {
      this.tabKey = key
      if (key === '2') {
        this.getTop10()
      }
    },
    changeDataForm(form) {
      console.log(form)
    },
    // API
    getData() {
      this.getSelectReason()
      this.getBubble()
    },
    getSelectReason(params) {
      return getSelectReason(params).then(res => {
        const data = res.data || {}
        this.selectReasonData = data
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
            const xAxisMax = 0.7
            const yAxisMax = 0.5
            this.chartVb = new Chart('scatter', data, {
              customColor: ['#467BF9'],
              backgroundColor: 'transparent',
              tooltipFields: [
                { key: '0', seriesName: '购买卡罗拉的原因' },
                { key: '1', seriesName: '放弃对象的原因' },
                { key: '2', name: true }
              ],
              markLine: {
                silent: true,
                symbol: 'none',
                animation: false,
                label: { show: false },
                data: [
                  {
                    xAxis: xAxisMax / 2,
                    lineStyle: {
                      color: '#6FC2EF',
                      type: 'solid'
                    }
                  },
                  {
                    xAxis: xAxisMax,
                    lineStyle: {
                      color: '#6FC2EF',
                      type: 'solid'
                    }
                  },
                  {
                    yAxis: yAxisMax / 2,
                    lineStyle: {
                      color: '#6FC2EF',
                      type: 'solid'
                    }
                  },
                  {
                    yAxis: yAxisMax,
                    lineStyle: {
                      color: '#6FC2EF',
                      type: 'solid'
                    }
                  }
                ]
              }
            }).getScatterChart()
            resolve(response)
          }).catch(response => {
            reject(response)
          })
      })
    },

    getTop10(params) {
      return getTop10(params).then(res => {
        const data = res.data || {}
        this.top10Data = data.top10
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/assets/style/mixins';
.info {
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
  .chart-title-tips {
    position: absolute;
    display: block;
    padding: 4px 10px;
    border-radius: 2px;
    background: #467BF9;
    .font-adjust(14px, inherit, #fff);
    &.left-top { top: 68px; left: 88px; }
    &.right-top { top: 68px; right: 38px; }
    &.left-bottom { bottom: 77px; left: 88px; }
    &.right-bottom { bottom: 77px;  right: 38px; }
  }
}
</style>
