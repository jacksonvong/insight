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
      <Iw-tab1 v-if="tabKey==1" :data-form="dataForm" class="tab1" />
      <iw-tab2 v-if="tabKey==2" :data-form="dataForm" class="tab2" />

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
import IwTab1 from './tab1'
import IwTab2 from './tab2'
import IwCard from '@/page/components/card'
import IwSimpleBox from '@/page/components/simple-box'
import IwTableBox from '@/page/components/simple-table-box'
import Top10Box from '@/page/components/top10-box'
import IwChart from '@/components/charts'

export default {
  name: 'GoodAndBad',
  components: {
    ACard: Card,
    ARow: Row,
    ACol: Col,
    ATooltip: Tooltip,
    IwBanner: IwBanner,
    IwSearch: IwSearch,
    IwTab1,
    IwTab2,
    IwCard,
    IwSimpleBox,
    IwTableBox,
    IwTop10Box: Top10Box,
    IwChart
  },
  data() {
    return {
      dataForm: {},
      tabList: [
        { key: '1', tab: this.$t('compete.tab.selectOrGiveUp') },
        { key: '2', tab: this.$t('compete.tab.inFlowAnaly') },
        { key: '3', tab: this.$t('compete.tab.outFlowAnaly') }
      ],
      tabKey: '1',
      selectReasonData: {},
      chartVb: {},
      top10Data: []
    }
  },
  methods: {
    changeTab(key) {
      this.tabKey = key
    },
    changeDataForm(form) {
      this.dataForm = Object.assign({}, this.dataForm, form)
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
