<template>
  <div class="overview">
    <!-- 0--顶部筛选条件 -->
    <iw-banner :title="`概览`"/>
    <div class="main-content">
      <iw-search :show-search="tabKey=='2'" :tab-list="tabList" :tab-key="tabKey" @onTabChange="changeTab" @change="changeDataForm" />
      <a-card v-if="tabKey=='1'" :body-style="{padding: '0'}" style="border-top-left-radius: 0; border-top-right-radius: 0;">
        <div class="overview-table_total">
          <span>样本量合计：999999</span>
        </div>
        <div class="ant-table-body">
          <table class="overview-table">
            <thead class="ant-table-thead">
              <tr>
                <th v-for="column in columns" :key="column.dataIndex">
                  <div>{{ column.title }}</div>
                </th>
              </tr>
            </thead>
            <tbody class="ant-table-tbody">
              <template v-for="(row, index) in data.slice(0, 10)">
                <tr :key="index">
                  <td v-for="column in columns" :key="column.dataIndex">
                    <template v-if="column.dataIndex=='subModel'">
                      <a href="javascript:;" @click="handleCellClick(index, 'subModel')">{{ row[column.dataIndex] }}</a>
                    </template>
                    <template v-else-if="column.dataIndex=='city'">
                      <a href="javascript:;" @click="handleCellClick(index, 'city')">{{ row[column.dataIndex] }}</a>
                    </template>
                    <template v-else>{{ row[column.dataIndex] }}</template>
                  </td>
                </tr>
                <template v-if="row.showChildren&&row.children&&row.children.length">
                  <tr v-for="(innerRow, innerIndex) in row.children" :key="'inner_'+innerIndex">
                    <td v-for="column in columns" :key="column.dataIndex">{{ innerRow[column.dataIndex] }}</td>
                  </tr>
                </template>
              </template>
            </tbody>
          </table>
        </div>
      </a-card>
      <a-card v-if="tabKey=='2'" :body-style="{padding: '0'}" style="border-top-left-radius: 0; border-top-right-radius: 0;">
        <div class="overview-table_total">
          <span>样本量合计：999999</span>
        </div>
        <a-table
          :row-selection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
          :columns="columns"
          :data-source="data"
          class="overview-table"
        >
          <a slot="amount" slot-scope="text, row, index" href="javascript:;" @click="handleCellClick(index, 'amount')">{{ text }}</a>
        </a-table>
      </a-card>
    </div>
    <div>
      <a-modal
        :visible="visible"
        :confirm-loading="confirmLoading"
        :title="false"
        :closable="false"
      >
        <template slot="footer">
          <a-button key="back" type="primary" @click="handleCancel">关闭</a-button>
        </template>
        <a-table
          :columns="innerColumns"
          :data-source="innerData"
          size="small"
        />
      </a-modal>
    </div>
  </div>
</template>

<script>
import { Card, Table, Button, Modal } from 'ant-design-vue'
import IwBanner from '@/components/banner/index'
import IwSearch from '@/page/components/search'

const columns = [{
  title: '模块',
  dataIndex: 'module'
}, {
  title: '月份',
  dataIndex: 'month'
}, {
  title: '车型',
  dataIndex: 'subModel'
}, {
  title: '城市',
  dataIndex: 'city'
}, {
  title: '现有样本量',
  dataIndex: 'amount',
  scopedSlots: { customRender: 'amount' }
}]

const innerColumns = [{
  title: '模块',
  dataIndex: 'module'
}, {
  title: '月份',
  dataIndex: 'month'
}, {
  title: '样本量',
  dataIndex: 'amount',
  scopedSlots: { customRender: 'amount' }
}]

const data = []
for (let i = 0; i < 46; i++) {
  data.push({
    module: '用户特征',
    month: '2019-01至2019-12',
    subModel: '蒙迪欧',
    city: '北京市',
    amount: 3399,
    showChildren: false,
    key: i
  })
}

const innerData = []
for (let i = 0; i < 3; i++) {
  innerData.push({
    month: '2019-01',
    amount: 1111,
    key: i
  })
}

export default {
  name: 'Overview',
  components: {
    ACard: Card,
    ATable: Table,
    AButton: Button,
    AModal: Modal,
    IwBanner: IwBanner,
    IwSearch: IwSearch
  },
  data() {
    return {
      tabList: [
        {
          key: '1',
          tab: '我已购买'
        }, {
          key: '2',
          tab: '全部功能'
        }
      ],
      tabKey: '1',
      data,
      columns,
      selectedRowKeys: [],

      visible: false,
      confirmLoading: false,
      innerColumns,
      innerData
    }
  },
  computed: {
    hasSelected() {
      return this.selectedRowKeys.length > 0
    }
  },
  methods: {
    changeTab(key) {
      this.tabKey = key
    },
    changeDataForm(form) {
      console.log('form', form)
    },
    onSelectChange(selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    },
    handleCellClick(index, column) {
      if (column === 'subModel') {
        this.$set(this.data[index], 'showChildren', !this.data[index]['showChildren'])
        this.$set(this.data[index], 'children', innerData)
      } else if (column === 'amount') {
        this.visible = true
      }
    },
    handleOk() {
      this.visible = false
    },
    handleCancel() {
      this.visible = false
    }
  }
}
</script>

<style lang="less" scoped>
.overview {
  .overview-table_total {
    display: flex;
    flex-direction: row-reverse;
    span {
      background: #7F8593;
      color: #FEFEFE;
      padding: 0 6px;
    }
  }
  .overview-table {
    margin: 30px;
  }
}
</style>
