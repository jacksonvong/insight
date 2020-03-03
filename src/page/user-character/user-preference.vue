<template>
  <div>
    <iw-banner title="需求偏好"/>
    <div class="main-content">
      <iw-search
        @change="changeDataForm"
        @download="onDownload"
      />
      <a-card title="查询结果" class="downloadPart">
        <div class="iw-card-container">
          <iw-card-extend title="购车考虑因素" extra="">
            <iw-simple-box :data="reasonData"/>
          </iw-card-extend>
          <div>
            <div class="iw-card-container">
              <iw-card-extend :can-show-up="true" limit-height="180px" style="width: 254px" title="外观" extra="">
                <iw-simple-box :data="appearanceData"/>
              </iw-card-extend>
              <iw-card-extend title="动力性" extra="">
                <iw-simple-box :data="powerData"/>
              </iw-card-extend>
              <iw-card-extend title="品质口碑" extra="">
                <iw-simple-box :data="qualityData"/>
              </iw-card-extend>
            </div>
            <div class="iw-card-container">
              <iw-card-extend title="空间" extra="">
                <iw-simple-box :data="spaceData"/>
              </iw-card-extend>
              <iw-card-extend title="操控性" extra="">
                <iw-simple-box :data="controllabilityData"/>
              </iw-card-extend>
              <iw-card-extend title="续航、充电、电池性能" extra="">
                <iw-simple-box :data="batteryData"/>
              </iw-card-extend>
            </div>
            <div class="iw-card-container">
              <iw-card-extend title="内饰" extra="">
                <iw-simple-box :data="upholsteryData"/>
              </iw-card-extend>
              <iw-card-extend title="安全性" extra="">
                <iw-simple-box :data="safetyData"/>
              </iw-card-extend>
              <iw-card-extend title="品牌关注" extra="">
                <iw-simple-box :data="brandData"/>
              </iw-card-extend>
            </div>
            <div class="iw-card-container">
              <iw-card-extend title="舒适型" extra="">
                <iw-simple-box :data="comfortData"/>
              </iw-card-extend>
              <iw-card-extend title="配置、智能网联" extra="">
                <iw-simple-box :data="configurationData"/>
              </iw-card-extend>
              <iw-card-extend title="购车价格、政策福利" extra="">
                <iw-simple-box :data="policyData"/>
              </iw-card-extend>
            </div>
            <div class="iw-card-container">
              <iw-card-extend title="使用成本、残值率" extra="">
                <iw-simple-box :data="usingCostData"/>
              </iw-card-extend>
              <iw-card-extend title="服务" extra="">
                <iw-simple-box :data="serverData"/>
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
import { downloadMixin } from '@/utils/mixin'

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
  mixins: [downloadMixin],
  data() {
    return {
      reasonData: {},
      appearanceData: {},
      spaceData: {},
      upholsteryData: {},
      comfortData: {},
      powerData: {},
      controllabilityData: {},
      safetyData: {},
      configurationData: {},
      // 品质口碑
      qualityData: {},
      // 电池性能
      batteryData: {},
      // 品牌关注
      brandData: {},
      // 购车价格、政策福利
      policyData: {},
      // 使用成本、残值率
      usingCostData: {},
      // 服务
      serverData: {}
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
      this.getQualityData(params)
      this.getBatteryData(params)
      this.getBrandData(params)
      this.getPolicyData(params)
      this.getUsingCostData(params)
      this.getServerData(params)
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
    getQualityData(params) {
      return getDetailReason(params, '10103').then(res => {
        const data = res.data || {}
        this.qualityData = data.option
      })
    },
    getBatteryData(params) {
      return getDetailReason(params, '10104').then(res => {
        const data = res.data || {}
        this.batteryData = data.option
      })
    },
    getBrandData(params) {
      return getDetailReason(params, '10105').then(res => {
        const data = res.data || {}
        this.brandData = data.option
      })
    },
    getPolicyData(params) {
      return getDetailReason(params, '10106').then(res => {
        const data = res.data || {}
        this.policyData = data.option
      })
    },
    getUsingCostData(params) {
      return getDetailReason(params, '10107').then(res => {
        const data = res.data || {}
        this.usingCostData = data.option
      })
    },
    getServerData(params) {
      return getDetailReason(params, '10108').then(res => {
        const data = res.data || {}
        this.serverData = data.option
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
