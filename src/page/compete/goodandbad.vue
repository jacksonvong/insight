<template>
  <div class="info">
    <!-- 0--顶部筛选条件 -->
    <iw-banner :title="`竞争对手`"/>
    <div class="main-content">
      <iw-search
        :tab-list="tabList"
        :tab-key="tabKey"
        :multiple="{submodel: false}"
        @onTabChange="changeTab"
        @change="changeDataForm"
      />
      <a-card v-if="tabKey==1" title="查询结果">
        <a-row :gutter="20" class="iw-card-container">
          <a-col :span="12" class="iw-card-container">
            <iw-card :title="leftData.title" style="width: 100%; height: 100%;" body-style="height: 400px;">
              <iw-table-box :data="leftData.option" :active-key="leftData.activeKey" is-percent @click="item=>getReasonItem(item, 'left')" />
            </iw-card>
          </a-col>
          <a-col :span="12" class="iw-card-container">
            <iw-card :title="rightData.title" style="width: 100%; height: 100%;" body-style="height: 400px;">
              <iw-table-box :data="rightData.option" :active-key="rightData.activeKey" is-percent @click="item=>getReasonItem(item, 'right')" />
            </iw-card>
          </a-col>
        </a-row>
        <a-row class="iw-card-container">
          <iw-card :title="bottomData.title" style="width: 100%; height: 100%;" body-style="height: 540px;">
            <div v-if="bottomData.option.series" style="height: 100%; position: relative;">
              <iw-chart :options="bottomData.option" chart-id="chart-b" style="height: 510px;" />
              <span class="chart-title-tips left-top">劣势点</span>
              <span class="chart-title-tips right-top"> 争议点</span>
              <span class="chart-title-tips left-bottom">低关注</span>
              <span class="chart-title-tips right-bottom">优势点</span>
            </div>
          </iw-card>
        </a-row>
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
import { Card, Tooltip, Row, Col } from 'ant-design-vue'
import IwBanner from '@/components/banner/index'
import IwSearch from '@/page/components/search'
import IwCard from '@/page/components/card'
import IwSimpleBox from '@/page/components/simple-box'
import IwTableBox from '@/page/components/simple-table-box'
import Top10Box from '@/page/components/top10-box'
import IwChart from '@/components/charts'
import { Chart } from '@/utils/echarts'
import { getReasonSports, getReasonItem, getChooseAbandonReason } from '@/api/compete'
import { getTop10 } from '@/api/old-car'

export default {
  name: 'GoodAndBad',
  components: {
    ACard: Card,
    ARow: Row,
    ACol: Col,
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
        { key: '1', tab: this.$t('compete.tab.selectOrGiveUp') },
        { key: '2', tab: this.$t('compete.tab.inFlowAnaly') },
        { key: '3', tab: this.$t('compete.tab.outFlowAnaly') }
      ],
      tabKey: '1',
      selectReasonData: {},
      chartVb: {},
      top10Data: [],

      leftData: { key: '10024', title: this.$t('compete.title.reasonToChoose'), status: 0, activeKey: '', option: {}},
      rightData: { key: '10043', title: this.$t('compete.title.reasonToQuit'), status: 0, activeKey: '', option: {}},
      bottomData: { key: '10024-10043', title: this.$t('compete.title.reasonToChooseAndQuitAnalysis'), status: 0, option: {}}
    }
  },
  methods: {
    changeTab(key) {
      this.tabKey = key
      if (key === '2') {
        this.getTop10()
      }
    },
    changeDataForm(form) {
      this.dataForm = Object.assign({}, this.dataForm, form)
      this.getData()
    },
    // API
    getData() {
      this.getReasonSports(Object.assign({}, this.dataForm, { key: this.leftData.key }), 'left')
      this.getReasonSports(Object.assign({}, this.dataForm, { key: this.rightData.key }), 'right')
      this.getChooseAbandonReason(Object.assign({}, this.dataForm, { key: this.bottomData.key }), 'bottom')
    },
    getReasonSports(params, group) {
      params.subModelId = params.subModelIds[0]
      return new Promise((resolve, reject) => {
        getReasonSports(params).then(res => {
          const data = res.data || {}
          this.$set(this[group + 'Data'], 'option', data.option)
          this.$set(this[group + 'Data'], 'avgNum', data.avgNum)
          this.$set(this[group + 'Data'], 'sampleNum', data.sampleNum)
          this.$set(this[group + 'Data'], 'status', 200)
          resolve(res)
        }).catch(res => {
          this.$set(this[group + 'Data'], 'status', 500)
          reject(res)
        })
      })
    },
    getReasonItem(item, group) {
      const params = Object.assign({}, this.dataForm, {
        subModelId: this.dataForm.subModelIds[0],
        key: item.key
      })
      return getReasonItem(params).then(res => {
        const data = res.data || {}
        this.$set(item, 'data', data.answerList)
        this.$set(this[group + 'Data'], 'activeKey', item.key)
      })
    },
    getChooseAbandonReason(params, group) {
      params.subModelId = params.subModelIds[0]
      return new Promise((resolve, reject) => {
        getChooseAbandonReason(params)
          .then(res => {
            const data = res.data || {}
            const xAxisMax = 0.7
            const yAxisMax = 0.5
            console.log(data.option)
            const option = new Chart('scatter', data.option, {
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
            this.$set(this[group + 'Data'], 'option', option)
            this.$set(this[group + 'Data'], 'avgNum', data.avgNum)
            this.$set(this[group + 'Data'], 'sampleNum', data.sampleNum)
            this.$set(this[group + 'Data'], 'status', 200)
            console.log(option)
            resolve(res)
          }).catch(res => {
            this.$set(this[group + 'Data'], 'status', 500)
            reject(res)
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
