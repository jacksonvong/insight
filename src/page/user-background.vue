<template>
  <div>
    <iw-banner title="用户背景"/>
    <div class="main-content">
      <a-card>
        <custom-search>
          <iw-button type="primary" @click="onSearchData"> &nbsp;&nbsp;&nbsp;&nbsp;查询&nbsp;&nbsp;&nbsp;&nbsp;</iw-button>
          <iw-button @click="onSearchData"> &nbsp;&nbsp;&nbsp;&nbsp;对比分析&nbsp;&nbsp;&nbsp;&nbsp;</iw-button>
          <iw-button>下载</iw-button>
        </custom-search>
      </a-card>
      <a-card title="查询结果">
        <a-row>
          <a-col :span="6">
            <result-unit :can-show-up="true" limit-height="10px" title="性别" desc="男性：60%">
              123
              <br>
              456
              <br>
              789
            </result-unit>
          </a-col>
        </a-row>
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
    CustomSearch: CustomSearch,
    ResultUnit
  }
}
</script>

<style>

</style>
