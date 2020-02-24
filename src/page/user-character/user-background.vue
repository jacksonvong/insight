<template>
  <div>
    <iw-banner title="用户背景"/>
    <div class="main-content">
      <a-card>
        <custom-search/>
      </a-card>
      <a-card title="查询结果">
        <div class="iw-card-container">
          <iw-card title="性别" extra="男性：60%">
            <iw-chart slot="content" :options="sexData" />
          </iw-card>
          <iw-card title="年龄" extra="平均年龄：43">
            <iw-simple-box slot="content" :data="ageData" />
          </iw-card>
          <iw-card title="学历" extra="本科：35%">
            <iw-simple-box slot="content" :data="educationData" />
          </iw-card>
          <iw-card title="家庭" extra="">
            <iw-simple-box slot="content" :data="familyData" />
          </iw-card>
        </div>
        <div class="iw-card-container">
          <iw-card title="工作行业" extra="">
            <iw-simple-box slot="content" :data="industryData" />
          </iw-card>
          <iw-card title="工作职位" extra="">
            <iw-simple-box slot="content" :data="positionData" />
          </iw-card>
          <iw-card title="家庭年收入" extra="">
            <iw-simple-box slot="content" :data="incomeData" />
          </iw-card>
        </div>
        <div class="iw-card-container">
          <result-unit :can-show-up="true" limit-height="300px" title="价值观" style="width: 400px">
            <iw-simple-box-extend :data="valueData" />
          </result-unit>
          <iw-card-extend title="家庭车库">
            <iw-simple-box slot="content" :data="positionData" />
            <div slot="content" style="margin: 16px -15px;border-top: 2px solid #D4EEFC" />
            <iw-simple-box slot="content" :data="positionData" />
          </iw-card-extend>
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
import { getSex, getAge, getEducation } from '@/api/board'
import { getFamily, getIndustry, getPosition, getIncome, getValue } from '@/api/user-background'
import { Chart } from '@/utils/echarts'

export default {
  name: 'UserBackground',
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
    IwCardExtend,
    IwChart,
    IwSimpleBox,
    IwSimpleBoxExtend,
    CustomSearch: CustomSearch,
    ResultUnit
  },
  data() {
    return {
      sexData: {},
      ageData: {},
      educationData: {},
      familyData: {},
      industryData: {},
      positionData: {},
      incomeData: {},
      valueData: {}
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.getSex()
      this.getAge()
      this.getEducation()
      this.getFamily()
      this.getIndustry()
      this.getPosition()
      this.getIncome()
      this.getValue()
    },
    getSex(params) {
      return getSex(params).then(res => {
        const data = res.data || {}
        this.sexData = new Chart('pie', data, {
          customColor: ['#467BF9', '#21D1D9'],
          backgroundColor: 'transparent'
        }).getChart()
      })
    },
    getAge(params) {
      return getAge(params).then(res => {
        const data = res.data || {}
        this.ageData = data
      })
    },
    getEducation(params) {
      return getEducation(params).then(res => {
        const data = res.data || {}
        this.educationData = data
      })
    },
    getFamily(params) {
      return getFamily(params).then(res => {
        const data = res.data || {}
        this.familyData = data
      })
    },
    getIndustry(params) {
      return getIndustry(params).then(res => {
        const data = res.data || {}
        this.industryData = data
      })
    },
    getPosition(params) {
      return getPosition(params).then(res => {
        const data = res.data || {}
        this.positionData = data
      })
    },
    getIncome(params) {
      return getIncome(params).then(res => {
        const data = res.data || {}
        this.incomeData = data
      })
    },
    getValue(params) {
      return getValue(params).then(res => {
        const data = res.data || {}
        this.valueData = data
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
