<template>
  <div class="old-car">
    <iw-banner :title="`旧车处理`"/>
    <div class="main-content">
      <iw-search
        :tab-list="tabList"
        :tab-key="tabKey"
        @onTabChange="changeTab"
        @change="changeDataForm"
      />
      <a-card v-if="tabKey === '1'" title="查询结果">
        <div class="iw-card-container">
          <iw-card-extend title="升级品牌来源" extra="TOP10">
            <top10-box slot="content" :data="top10Data"/>
          </iw-card-extend>
          <div>
            <div class="iw-card-container">
              <iw-card title="行驶里程" extra="万公里">
                <iw-chart slot="content" :options="mileage"/>
              </iw-card>
              <iw-card title="二手车置换价格" extra="%">
                <iw-chart slot="content" :options="usedCarData"/>
              </iw-card>
            </div>
            <div class="iw-card-container">
              <iw-card title="处理方法" extra="">
                <iw-chart slot="content" :options="dealMethodsData"/>
              </iw-card>
              <iw-card title="二手车转卖价格" extra="%">
                <iw-chart slot="content" :options="usedCarData"/>
              </iw-card>
            </div>
          </div>
        </div>
      </a-card>
      <a-card v-else title="查询结果">
        <div class="iw-card-container">
          <iw-card title="置换前了解信息渠道" extra="">
            <iw-simple-box slot="content" :data="barData"/>
          </iw-card>
          <iw-card title="置换渠道选择原因" extra="">
            <iw-simple-box slot="content" :data="barData"/>
          </iw-card>
        </div>
        <div class="iw-card-container">
          <iw-card title="二手车评估方法" extra="">
            <iw-simple-box slot="content" :data="barData"/>
          </iw-card>
          <iw-card title="二手车出售渠道" extra="">
            <iw-simple-box slot="content" :data="barData"/>
          </iw-card>
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
import IwSearch from '@/page/components/search'
import IwChart from '@/components/charts'
import IwCard from '@/page/components/card'
import IwCardExtend from '@/page/components/card-extend'
import IwSimpleBox from '@/page/components/simple-box'
import ResultUnit from '@/page/components/ResultUnit'
import Top10Box from '@/page/components/top10-box'
import { getTop10, getMileage, getUsedCar, getDealMethods, getBar } from '@/api/old-car'
import { Chart } from '@/utils/echarts'

export default {
  name: 'OldCar',
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
    IwChart,
    IwSimpleBox,
    CustomSearch: CustomSearch,
    ResultUnit,
    Top10Box,
    IwCard,
    IwCardExtend
  },
  data() {
    return {
      tabList: [
        { key: '1', tab: '旧车信息' },
        { key: '2', tab: '处理渠道' }
      ],
      tabKey: '1',
      top10Data: [],
      // 行驶里程
      mileage: {},
      // 二手车置换价格
      usedCarData: {},
      // 处理方法
      dealMethodsData: {},
      barData: {}
    }
  },
  created() {
    this.getData()
  },
  methods: {
    changeTab(key) {
      this.tabKey = key
    },
    getData() {
      this.getTop10()
      this.getMileage()
      this.getUsedCar()
      this.getDealMethods()
      this.getBar()
    },
    getTop10(params) {
      return getTop10(params).then(res => {
        const data = res.data || {}
        this.top10Data = data.top10
      })
    },
    getMileage(params) {
      return getMileage(params).then(res => {
        const data = res.data || {}
        this.mileage = data
      })
    },
    getUsedCar(params) {
      return getUsedCar(params).then(res => {
        const data = res.data || {}
        this.usedCarData = data
      })
    },
    getDealMethods(params) {
      return getDealMethods(params).then(res => {
        const data = res.data || {}
        this.dealMethodsData = new Chart('pie', data, {
          customColor: ['#467BF9', '#21D1D9'],
          backgroundColor: 'transparent'
        }).getChart()
      })
    },
    getBar(params) {
      return getBar(params).then(res => {
        const data = res.data || {}
        this.barData = data
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
