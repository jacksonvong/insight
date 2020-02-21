<template>
  <div class="old-car">
    <iw-banner title="旧车处理"/>
    <div class="main-content">
      <a-card
        :tab-list="tabListNoTitle"
        :active-tab-key="noTitleKey"
        style="width:100%"
        @tabChange="key => onTabChange(key, 'noTitleKey')"
      >
        <custom-search>
          <iw-button type="primary" @click="onSearchData"> &nbsp;&nbsp;&nbsp;&nbsp;查询&nbsp;&nbsp;&nbsp;&nbsp;</iw-button>
          <iw-button @click="onSearchData"> &nbsp;&nbsp;&nbsp;&nbsp;对比分析&nbsp;&nbsp;&nbsp;&nbsp;</iw-button>
          <iw-button>下载</iw-button>
        </custom-search>
      </a-card>
      <a-card title="查询结果">
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
import ResultUnit from '@/page/components/ResultUnit'

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
    CustomSearch: CustomSearch,
    ResultUnit
  },
  data() {
    return {
      tabListNoTitle: [
        {
          key: '旧车信息',
          tab: '旧车信息'
        },
        {
          key: '处理渠道',
          tab: '处理渠道'
        }
      ],
      noTitleKey: '旧车信息'
    }
  },
  methods: {
    onTabChange(key, type) {
      console.log(key, type);
      this[type] = key;
    },
  },
}
</script>

<style>

</style>
