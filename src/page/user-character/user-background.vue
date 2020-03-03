<template>
  <div>
    <iw-banner title="用户背景"/>
    <div class="main-content">
      <iw-search
        @change="changeDataForm"
        @download="onDownload"
      />
      <a-card title="查询结果" class="downloadPart">
        <div class="iw-card-container">
          <iw-card title="性别" extra="男性：60%">
            <iw-chart :options="sexData" />
          </iw-card>
          <iw-card title="年龄" extra="平均年龄：43">
            <iw-simple-box :data="ageData" />
          </iw-card>
          <iw-card title="学历" extra="本科：35%">
            <iw-simple-box :data="educationData" />
          </iw-card>
          <iw-card title="家庭婚姻状况" extra="">
            <iw-simple-box :data="familyData" />
          </iw-card>
        </div>
        <div class="iw-card-container">
          <iw-card-extend title="工作行业" extra="">
            <iw-simple-box :data="industryData" />
          </iw-card-extend>
          <iw-card-extend title="工作职位" extra="" style="padding-bottom: 4px">
            <iw-simple-box :data="positionData" />
          </iw-card-extend>
          <iw-card-extend title="家庭年收入" extra="">
            <iw-simple-box :data="incomeData" />
          </iw-card-extend>
        </div>
        <div class="iw-card-container">
          <result-unit :can-show-up="true" limit-height="300px" title="价值观" style="width: 400px">
            <iw-simple-box-extend :data="valueData" />
          </result-unit>
          <iw-card-extend title="家庭车库">
            <iw-simple-box :data="homeCarData" />
            <div style="margin: 16px -15px;border-top: 2px solid #D4EEFC" />
            <iw-simple-box :data="positionData" />
          </iw-card-extend>
        </div>
        <div class="iw-card-container">
          <result-unit title="工作行业" style="width: 520px">
            <table-path/>
          </result-unit>
          <!--          <result-unit title="学历" extra="" style="width: 300px; " >-->
          <!--            <iw-chart :options="sexData" :style="{ width: '100%',height: '500px' }"/>-->
          <!--          </result-unit>-->
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
import { getSex, getAge, getEducation, getFamily, getIndustry, getPosition, getIncome, getValue, getHomeCarNumber, getDetailCar } from '@/api/user-background'
import { Chart } from '@/utils/echarts'
import TablePath from '@/page/components/table-path'
import { downloadMixin } from '@/utils/mixin'

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
    ResultUnit,
    TablePath
  },
  mixins: [downloadMixin],
  data() {
    return {
      sexData: {},
      ageData: {},
      educationData: {},
      familyData: {},
      industryData: {},
      positionData: {},
      incomeData: {},
      valueData: {},
      homeCarData: {},
      detailCarData: {}
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
      this.getSex(params)
      this.getAge(params)
      this.getEducation(params)
      this.getFamily(params)
      this.getIndustry(params)
      this.getPosition(params)
      this.getIncome(params)
      this.getValue(params)
      this.getHomeCarNumber(params)
      this.getDetailCar(params)
    },
    getSex(params) {
      return getSex(params).then(res => {
        const data = res.data || {}
        this.sexData = new Chart('pie', data.option, {
          customColor: ['#467BF9', '#21D1D9'],
          backgroundColor: 'transparent'
        }).getChart()
      })
    },
    getAge(params) {
      return getAge(params).then(res => {
        const data = res.data || {}
        this.ageData = data.option
      })
    },
    getEducation(params) {
      return getEducation(params).then(res => {
        const data = res.data || {}
        this.educationData = data.option
      })
    },
    getFamily(params) {
      return getFamily(params).then(res => {
        const data = res.data || {}
        this.familyData = data.option
      })
    },
    getIndustry(params) {
      return getIndustry(params).then(res => {
        const data = res.data || {}
        this.industryData = data.option
      })
    },
    getPosition(params) {
      return getPosition(params).then(res => {
        const data = res.data || {}
        this.positionData = data.option
      })
    },
    getIncome(params) {
      return getIncome(params).then(res => {
        const data = res.data || {}
        this.incomeData = data.option
      })
    },
    getValue(params) {
      return getValue(params).then(res => {
        const data = res.data || {}
        this.valueData = data.option
      })
    },
    getHomeCarNumber(params) {
      return getHomeCarNumber(params).then(res => {
        const data = res.data || {}
        this.homeCarData = data.option
      })
    },
    getDetailCar(params) {
      return getDetailCar(params).then(res => {
        const data = res.data || {}
        this.detailCarData = data.option
      })
    }

  }
}
</script>

<style lang="less" scoped>
  .iw-card-container {
    display: flex;
    align-items: flex-start;
    .iw-card {
      margin: 0 20px 20px 0;
    }
  }
</style>
