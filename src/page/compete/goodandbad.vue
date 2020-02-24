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
        <div class="iw-card-container">
          <iw-card title="选择原因和放弃原因分析" style="width: 100%; height: 100%;" body-style="height: 540px;">
            <div v-if="chartVb.series" slot="content" style="height: 100%; position: relative;">
              <iw-charts :options="chartVb" chart-id="chart-b" style="height: 510px;" />
              <span class="chart-title-tips left-top">
                劣势点
                <a-tooltip v-if="false" placement="rightTop">
                  <template slot="title">
                    <span>销量同比下降，份额环比上升，是整体大环境需求减少带来的销售下滑，跟竞品比较仍相对有优势</span>
                  </template>
                  <i>?</i>
                </a-tooltip>
              </span>
              <span class="chart-title-tips right-top">
                争议点
                <a-tooltip v-if="false" placement="rightTop">
                  <template slot="title">
                    <span>销量同比、份额环比双增长，销售形势良好</span>
                  </template>
                  <i>?</i>
                </a-tooltip>
              </span>
              <span class="chart-title-tips left-bottom">
                低关注
                <a-tooltip v-if="false" placement="rightTop">
                  <template slot="title">
                    <span>销量同比、份额环比双下滑，说明该品牌销售情况较差，销量下滑，市场份额被竞品蚕食，销售受阻</span>
                  </template>
                  <i>?</i>
                </a-tooltip>
              </span>
              <span class="chart-title-tips right-bottom">
                优势点
                <a-tooltip v-if="false" placement="rightTop">
                  <template slot="title">
                    <span>销量同比上升，份额环比下降，虽销量增长，但增速未能跟上整体市场步伐，竞争力下降，跟竞品相比处于劣势</span>
                  </template>
                  <i>?</i>
                </a-tooltip>
              </span>
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
    padding: 4px 10px;
    border-radius: 2px;
    background: #467BF9;
    .font-adjust(14px, inherit, #fff);
    &.left-top { top: 68px; left: 88px; }
    &.right-top { top: 68px; right: 38px; }
    &.left-bottom { bottom: 77px; left: 88px; }
    &.right-bottom { bottom: 77px;  right: 38px; }
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
