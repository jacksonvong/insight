<template>
  <div>
    <iw-banner title="需求偏好"/>
    <div class="main-content">
      <iw-search
        @change="changeDataForm"
      />
      <a-card title="查询结果">
        <div class="iw-card-container">
          <iw-card-extend title="购车考虑因素" extra="">
            <iw-simple-box :data="reasonData"/>
          </iw-card-extend>
          <div>
            <div class="iw-card-container">
              <iw-card-extend title="外观" extra="">
                <iw-simple-box :data="appearanceData"/>
              </iw-card-extend>
              <iw-card-extend title="动力性" extra="">
                <iw-simple-box :data="powerData"/>
              </iw-card-extend>
            </div>
            <div class="iw-card-container">
              <iw-card-extend title="空间" extra="">
                <iw-simple-box :data="spaceData"/>
              </iw-card-extend>
              <iw-card-extend title="操控性" extra="">
                <iw-simple-box :data="controllabilityData"/>
              </iw-card-extend>
            </div>
            <div class="iw-card-container">
              <iw-card-extend title="内饰" extra="">
                <iw-simple-box :data="upholsteryData"/>
              </iw-card-extend>
              <iw-card-extend title="安全性" extra="">
                <iw-simple-box :data="safetyData"/>
              </iw-card-extend>
            </div>
            <div class="iw-card-container">
              <iw-card-extend title="舒适型" extra="">
                <iw-simple-box :data="comfortData"/>
              </iw-card-extend>
              <iw-card-extend title="配置" extra="">
                <iw-simple-box :data="configurationData"/>
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
import { getReason, getDetailReason } from '@/api/user-preference'

export default {
  name: 'UserPreference',
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
      appearanceData: {},
      spaceData: {},
      upholsteryData: {},
      comfortData:{},
      powerData:{},
      controllabilityData:{},
      safetyData:{},
      configurationData:{}
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
      this.getAppearanceData(params)
      this.getSpaceData(params)
      this.getUpholsteryData(params)
      this.getComfortData(params)
      this.getPowerData(params)
      this.getControllabilityData(params)
      this.getSafetyData(params)
      this.getConfigurationData(params)
    },
    getReason(params) {
      return getReason(params).then(res => {
        const data = res.data || {}
        this.reasonData = data.option
      })
    },
    getAppearanceData(params) {
      return getDetailReason(params, '10095').then(res => {
        const data = res.data || {}
        this.appearanceData = data.option
      })
    },
    getSpaceData(params) {
      return getDetailReason(params, '10096').then(res => {
        const data = res.data || {}
        this.spaceData = data.option
      })
    },
    getUpholsteryData(params) {
      return getDetailReason(params, '10097').then(res => {
        const data = res.data || {}
        this.upholsteryData = data.option
      })
    },
    getComfortData(params) {
      return getDetailReason(params, '10098').then(res => {
        const data = res.data || {}
        this.comfortData = data.option
      })
    },
    getPowerData(params) {
      return getDetailReason(params, '10099').then(res => {
        const data = res.data || {}
        this.powerData = data.option
      })
    },
    getControllabilityData(params) {
      return getDetailReason(params, '10100').then(res => {
        const data = res.data || {}
        this.controllabilityData = data.option
      })
    },
    getSafetyData(params) {
      return getDetailReason(params, '10101').then(res => {
        const data = res.data || {}
        this.safetyData = data.option
      })
    },
    getConfigurationData(params) {
      return getDetailReason(params, '10102').then(res => {
        const data = res.data || {}
        this.configurationData = data.option
      })
    },
  }
}
</script>

<style>
  .iw-card-container {
    display: flex;
    align-items: flex-start;
  }
</style>
