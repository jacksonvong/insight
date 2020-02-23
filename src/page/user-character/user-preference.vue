<template>
  <div>
    <iw-banner title="需求偏好"/>
    <div class="main-content">
      <a-card>
        <custom-search/>
      </a-card>
      <a-card title="查询结果">
        <div class="iw-card-container">
          <iw-card-extend title="购车考虑因素" extra="">
            <iw-simple-box slot="content" :data="reasonData" />
          </iw-card-extend>
          <div>
            <div class="iw-card-container">
              <iw-card-extend title="外观" extra="">
                <iw-simple-box slot="content" :data="detailReasonData" />
              </iw-card-extend>
              <iw-card-extend title="动力性" extra="">
                <iw-simple-box slot="content" :data="detailReasonData" />
              </iw-card-extend>
            </div>
            <div class="iw-card-container">
              <iw-card-extend title="空间" extra="">
                <iw-simple-box slot="content" :data="detailReasonData" />
              </iw-card-extend>
              <iw-card-extend title="操控性" extra="">
                <iw-simple-box slot="content" :data="detailReasonData" />
              </iw-card-extend>
            </div>
            <div class="iw-card-container">
              <iw-card-extend title="内饰" extra="">
                <iw-simple-box slot="content" :data="detailReasonData" />
              </iw-card-extend>
              <iw-card-extend title="安全性" extra="">
                <iw-simple-box slot="content" :data="detailReasonData" />
              </iw-card-extend>
            </div>
            <div class="iw-card-container">
              <iw-card-extend title="舒适型" extra="">
                <iw-simple-box slot="content" :data="detailReasonData" />
              </iw-card-extend>
              <iw-card-extend title="配置" extra="">
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
// import { getSex, getAge, getEducation } from '@/api/board'
import { getReason, getDetailReason } from '@/api/user-preference'
// import { Chart } from '@/utils/echarts'

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
      detailReasonData: {}
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.getReason()
      this.getDetailReason()
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
