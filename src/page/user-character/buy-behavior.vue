<template>
  <div>
    <iw-banner title="用户背景"/>
    <div class="main-content">
      <a-card>
        <custom-search/>
      </a-card>
      <a-card title="查询结果">
        <div class="iw-card-container">
          <iw-card-extend title="购车动机" extra="">
            <iw-simple-box slot="content" :data="reasonData" />
          </iw-card-extend>
          <iw-card-extend title="购车用途" extra="">
            <iw-simple-box slot="content" :data="reasonData" />
          </iw-card-extend>
          <div>
            <div class="iw-card-container">
              <iw-card-extend title="购车准备" extra="">
                <iw-simple-box slot="content" :data="detailReasonData" />
              </iw-card-extend>
              <iw-card-extend title="购车预算" extra="">
                <iw-simple-box slot="content" :data="detailReasonData" />
              </iw-card-extend>
            </div>
            <div class="iw-card-container">
              <iw-card title="购车形态" extra="" >
                <iw-chart slot="content" :options="sexData" />
              </iw-card>
              <iw-card-extend title="购车时长" extra="">
                <iw-simple-box slot="content" :data="detailReasonData" />
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
import { getSex } from '@/api/board'
// import { getFamily, getIndustry, getPosition, getIncome, getValue } from '@/api/user-background'
import { getReason, getDetailReason } from '@/api/user-preference'
import { Chart } from '@/utils/echarts'
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
  data() {
    return {
      reasonData: {},
      detailReasonData: {},
      // 购车形态
      buyCarMethodData: {},
      sexData: {}
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.getReason()
      this.getDetailReason()
      this.getBuyCarMethodData()
      this.getSex()
    },
    getReason(params) {
      return getReason(params).then(res => {
        const data = res.data || {}
        this.reasonData = data
      })
    },
    getDetailReason(params) {
      return getDetailReason(params).then(res => {
        const data = res.data || {}
        this.detailReasonData = data
      })
    },
    getBuyCarMethodData(params) {
      return getSex(params).then(res => {
        const data = res.data || {}
        this.buyCarMethodData = new Chart('pie', data, {
          customColor: ['#467BF9', '#21D1D9'],
          backgroundColor: 'transparent'
        }).getChart()
      })
    },
    getSex(params) {
      return getSex(params).then(res => {
        const data = res.data || {}
        this.sexData = new Chart('pie', data, {
          customColor: ['#467BF9', '#21D1D9'],
          backgroundColor: 'transparent'
        }).getChart()
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
