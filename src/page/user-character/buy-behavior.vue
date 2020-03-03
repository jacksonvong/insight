<template>
  <div>
    <iw-banner title="购买行为"/>
    <div class="main-content">
      <iw-search
        @change="changeDataForm"
        @download="onDownload"
      />
      <a-card title="查询结果" class="downloadPart">
        <div class="iw-card-container">
          <iw-card-extend title="购车动机" extra="">
            <iw-simple-box :data="reasonData" />
          </iw-card-extend>
          <iw-card-extend title="购车用途" extra="">
            <iw-simple-box :data="purposeData" />
          </iw-card-extend>
          <div>
            <div class="iw-card-container">
              <iw-card-extend title="购车考虑顺序" extra="">
                <iw-simple-box :data="beforeBuyData" />
              </iw-card-extend>
              <iw-card-extend title="购车预算" extra="">
                <iw-simple-box :data="budgetData" />
              </iw-card-extend>
            </div>
            <div class="iw-card-container">
              <iw-card title="购车形态" extra="" >
                <iw-chart :options="buyCarMethodData" />
              </iw-card>
              <iw-card-extend title="购车时长" extra="">
                <iw-simple-box :data="durationData" />
              </iw-card-extend>
            </div>
          </div>
        </div>
      </a-card>
    </div>
  </div>
</template>

<script>
import { Card, Button, Modal, Tabs, Divider, Checkbox, Row, Col } from 'ant-design-vue'
const { TabPane } = Tabs
const { Grid } = Card
import CustomSearch from '@/page/components/CustomSearch'
import IwBanner from '@/components/banner/index'
import IwChart from '@/components/charts'
import IwSearch from '@/page/components/search'
import IwCard from '@/page/components/card'
import IwCardExtend from '@/page/components/card-extend'
import IwSimpleBox from '@/page/components/simple-box'
import IwSimpleBoxExtend from '@/page/components/simple-box-extend'
import ResultUnit from '@/page/components/ResultUnit'
// import { getSex } from '@/api/board'
// import { getFamily, getIndustry, getPosition, getIncome, getValue } from '@/api/user-background'
import { getDetailReason } from '@/api/user-preference'
import { Chart } from '@/utils/echarts'
import { downloadMixin } from '@/utils/mixin'

export default {
  name: 'BuyBehavior',
  components: {
    ACard: Card,
    AButton: Button,
    AModal: Modal,
    ATabs: Tabs,
    ATabPane: TabPane,
    ADivider: Divider,
    ACardGrid: Grid,
    ACheckbox: Checkbox,
    ARow: Row,
    ACol: Col,
    IwBanner: IwBanner,
    IwSearch,
    IwCard,
    IwChart,
    IwSimpleBox,
    IwSimpleBoxExtend,
    IwCardExtend,
    CustomSearch: CustomSearch,
    ResultUnit
  },
  mixins: [downloadMixin],
  data() {
    return {
      // 购车动机
      reasonData: {},
      // 用途
      purposeData: {},
      // 购车准备
      beforeBuyData: {},
      // 购车预算
      budgetData: {},
      // 购车形态
      buyCarMethodData: {},
      // 购车时长
      durationData: {}
    }
  },
  created() {
    this.getData()
  },
  methods: {
    changeDataForm(params) {
      this.getData(params)
    },
    getData(params) {
      this.getReason(params)
      this.getPurposeData(params)
      this.getBeforeBuyData(params)
      this.getBudgetData(params)
      this.getBuyCarMethodData(params)
      this.getDurationData(params)
    },
    getReason(params) {
      return getDetailReason(params, '10092').then(res => {
        const data = res.data || {}
        this.reasonData = data.option
      })
    },
    getPurposeData(params) {
      return getDetailReason(params, '10093').then(res => {
        const data = res.data || {}
        this.purposeData = data.option
      })
    },
    getBeforeBuyData(params) {
      return getDetailReason(params, '10061').then(res => {
        const data = res.data || {}
        this.beforeBuyData = data.option
      })
    },
    getBudgetData(params) {
      return getDetailReason(params, '10109').then(res => {
        const data = res.data || {}
        this.budgetData = data.option
      })
    },
    getBuyCarMethodData(params) {
      return getDetailReason(params, 'BUYCARSTATUS_ID').then(res => {
        const data = res.data || {}
        delete data.option.legend
        this.buyCarMethodData = new Chart('pie', data.option, {
          customColor: ['#467BF9', '#21D1D9'],
          backgroundColor: 'transparent'
        }).getChart()
      })
    },
    getDurationData(params) {
      return getDetailReason(params, 'CARPERIOD_ID').then(res => {
        const data = res.data || {}
        this.durationData = data.option
      })
    }
  }
}
</script>

<style>
  .iw-card-container {
    display: flex;
    align-items: flex-start;
  }
</style>
