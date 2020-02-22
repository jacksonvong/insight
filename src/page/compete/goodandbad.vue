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
        <div class="iw-card-container">
          <div class="iw-card-container iw-card-col2">
            <iw-card title="选择原因" style="width: 100%; height: 100%;" body-style="height: 400px;">
              <iw-table-box slot="content" :data="selectReasonData" />
            </iw-card>
          </div>
          <div class="iw-card-container iw-card-col2">
            <iw-card title="放弃原因" style="width: 100%; height: 100%;" body-style="height: 400px;">
              <iw-table-box slot="content" :data="selectReasonData" />
            </iw-card>
          </div>
        </div>
        <div class="">
          <div v-if="chartVb.series" style="height: 100%; position: relative;">
            <iw-charts :options="chartVb" chart-id="chart-b" style="height: 500px;" />
            <span class="chart-title-tips left-top">
              劣势点
              <a-tooltip placement="rightTop">
                <template slot="title">
                  <span>销量同比下降，份额环比上升，是整体大环境需求减少带来的销售下滑，跟竞品比较仍相对有优势</span>
                </template>
                <i>?</i>
              </a-tooltip>
            </span>
            <span class="chart-title-tips right-top">
              争议点
              <a-tooltip placement="rightTop">
                <template slot="title">
                  <span>销量同比、份额环比双增长，销售形势良好</span>
                </template>
                <i>?</i>
              </a-tooltip>
            </span>
            <span class="chart-title-tips left-bottom">
              低关注
              <a-tooltip placement="rightTop">
                <template slot="title">
                  <span>销量同比、份额环比双下滑，说明该品牌销售情况较差，销量下滑，市场份额被竞品蚕食，销售受阻</span>
                </template>
                <i>?</i>
              </a-tooltip>
            </span>
            <span class="chart-title-tips right-bottom">
              优势点
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
import IwSearch from '@/page/components/search'
import IwCard from '@/page/components/card'
import IwSimpleBox from '@/page/components/simple-box'
import IwTableBox from '@/page/components/simple-table-box'
import { getSelectReason, getBubble } from '@/api/compete'
import IwCharts from '@/components/charts'
import { Chart } from '@/utils/echarts'

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
    IwCharts
  },
  data() {
    return {
      tabList: [
        { key: '1', tab: '原因分析' },
        { key: '2', tab: '竞争对手' },
        { key: '3', tab: '流出对手' }
      ],
      tabKey: '1',
      selectReasonData: {},
      chartVb: {}
    }
  },
  created() {
    this.getData()
  },
  methods: {
    changeTab(key) {
      this.tabKey = key
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

<style lang="less" scoped>
@import '~@/assets/style/mixins';
.info {
  .iw-card-container {
    display: flex;
    flex-wrap: wrap;
    &.iw-card-col2 {
      flex: 0 0 50%;
    }
  }
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
