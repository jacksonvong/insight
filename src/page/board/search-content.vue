<template>
  <div>
    <custom-search>
      <iw-button type="primary" @click="onSearchData"> &nbsp;&nbsp;&nbsp;&nbsp;查询&nbsp;&nbsp;&nbsp;&nbsp;</iw-button>
      <iw-button>下载</iw-button>
    </custom-search>
    <a-divider />
    <a-card v-if="searchData !== null" title="查询结果">
      <a-card title="用户特征">
        <a-button slot="extra" icon="plus" @click="modalVisible0 = true"/>
        <a-card-grid style="width:25%;textAlign:'center'">Content</a-card-grid>
        <a-card-grid style="width:25%;textAlign:'center'">Content</a-card-grid>
        <a-card-grid style="width:25%;textAlign:'center'">Content</a-card-grid>
        <a-card-grid style="width:25%;textAlign:'center'">Content</a-card-grid>
        <a-card-grid style="width:25%;textAlign:'center'">Content</a-card-grid>
        <a-card-grid style="width:25%;textAlign:'center'">Content</a-card-grid>
        <a-card-grid style="width:25%;textAlign:'center'">Content</a-card-grid>
      </a-card>
      <a-card title="竞争对比">
        <a-button slot="extra" icon="plus"/>
        <a-card-grid style="width:25%;textAlign:'center'">Content</a-card-grid>
        <a-card-grid style="width:25%;textAlign:'center'">Content</a-card-grid>
        <a-card-grid style="width:25%;textAlign:'center'">Content</a-card-grid>
        <a-card-grid style="width:25%;textAlign:'center'">Content</a-card-grid>
        <a-card-grid style="width:25%;textAlign:'center'">Content</a-card-grid>
        <a-card-grid style="width:25%;textAlign:'center'">Content</a-card-grid>
        <a-card-grid style="width:25%;textAlign:'center'">Content</a-card-grid>
      </a-card>
      <a-card title="销售体验评价">
        <a-button slot="extra" icon="plus"/>
        <a-card-grid style="width:25%;textAlign:'center'">Content</a-card-grid>
        <a-card-grid style="width:25%;textAlign:'center'">Content</a-card-grid>
        <a-card-grid style="width:25%;textAlign:'center'">Content</a-card-grid>
        <a-card-grid style="width:25%;textAlign:'center'">Content</a-card-grid>
        <a-card-grid style="width:25%;textAlign:'center'">Content</a-card-grid>
        <a-card-grid style="width:25%;textAlign:'center'">Content</a-card-grid>
        <a-card-grid style="width:25%;textAlign:'center'">Content</a-card-grid>
      </a-card>
      <a-card title="周边产品需求">
        <a-button slot="extra" icon="plus"/>
        <a-card-grid style="width:25%;textAlign:'center'">Content</a-card-grid>
        <a-card-grid style="width:25%;textAlign:'center'">Content</a-card-grid>
        <a-card-grid style="width:25%;textAlign:'center'">Content</a-card-grid>
        <a-card-grid style="width:25%;textAlign:'center'">Content</a-card-grid>
        <a-card-grid style="width:25%;textAlign:'center'">Content</a-card-grid>
        <a-card-grid style="width:25%;textAlign:'center'">Content</a-card-grid>
        <a-card-grid style="width:25%;textAlign:'center'">Content</a-card-grid>
      </a-card>
    </a-card>
    <div v-else>
      点击上方查询后，查询数据
    </div>
    <a-modal v-model="modalVisible0" title="选择显示内容" @ok="handleOk">
      <a-card title="用户特征">
        <a-card-grid><a-checkbox>性别</a-checkbox></a-card-grid>
        <a-card-grid><a-checkbox>年龄</a-checkbox></a-card-grid>
        <a-card-grid><a-checkbox>学历</a-checkbox></a-card-grid>
        <a-card-grid><a-checkbox>职业</a-checkbox></a-card-grid>
        <a-card-grid><a-checkbox>收入水平</a-checkbox></a-card-grid>
        <a-card-grid><a-checkbox>性格</a-checkbox></a-card-grid>
        <a-card-grid><a-checkbox>现有车辆</a-checkbox></a-card-grid>
      </a-card>
    </a-modal>
  </div>
</template>

<script>
import { Card, Button, Modal, Tabs, Divider, Checkbox } from 'ant-design-vue'
const { TabPane } = Tabs
const { Grid } = Card
import CustomSearch from '@/page/components/CustomSearch'

export default {
  components: {
    ACard: Card,
    AButton: Button,
    AModal: Modal,
    ATabs: Tabs,
    ATabPane: TabPane,
    ADivider: Divider,
    ACardGrid: Grid,
    ACheckbox: Checkbox,
    CustomSearch: CustomSearch
  },
  data() {
    return {
      searchData: null,
      modalVisible0: false,
      modalVisible1: false,
      modalVisible2: false,
      modalVisible3: false
    }
  },
  methods: {
    onSearchData() {
      this.searchData = {}
    }
  }
}
</script>

<style></style>
