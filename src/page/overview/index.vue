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
              <template v-for="(row, index) in purchaseData">
                <tr :key="'row_'+index">
                  <td v-for="column in columns" :key="column.dataIndex">
                    <template v-if="column.dataIndex=='subModel'">
                      <a href="javascript:;" @click="handleCellClick('subModel', index)">查看详情</a>
                    </template>
                    <template v-else>{{ row[column.dataIndex] }}</template>
                  </td>
                </tr>
                <template v-if="row.showChildren&&row.children_subModel&&row.children_subModel.length">
                  <template v-for="(row2, index2) in row.children_subModel">
                    <tr :key="'row2_subModel_'+index2" class="background-gray">
                      <td v-for="column in columns" :key="column.dataIndex">
                        <template v-if="['subModel', 'city'].includes(column.dataIndex)">
                          <span v-if="row2[column.dataIndex]&&column.dataIndex=='subModel'">{{ row2[column.dataIndex] }}</span>
                          <a v-else href="javascript:;" @click="handleCellClick('city', index, row2['subModelId'])">查看详情</a>
                        </template>
                        <template v-else>{{ row2[column.dataIndex] }}</template>
                      </td>
                    </tr>
                    <template v-if="row2.showChildren&&row2.children&&row2.children.length">
                      <tr v-for="(row3, index3) in row2.children" :key="'row3_'+index2+'_'+index3" class="background-gray-2">
                        <td v-for="column in columns" :key="column.dataIndex">{{ row3[column.dataIndex] }}</td>
                      </tr>
                    </template>
                  </template>
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
          <a slot="amount" slot-scope="text, row, index" href="javascript:;" @click="handleCellClick('amount', index)">{{ text }}</a>
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
import { getPurchaseData, getSubModelData, getCityData } from '@/api/overview'

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
for (let i = 0; i < 10; i++) {
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
      purchaseData: [],
      innerPurchaseData: [],
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
  created() {
    console.log('created')
    this.getData(2)
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
    async handleCellClick(column, index, key) {
      if (column === 'subModel' && key === undefined) {
        if (!this.purchaseData[index]['children_subModel'] || !this.purchaseData[index]['children_subModel'].length) {
          const innerData = this.getSubModelData(index, key)
          await innerData
          this.$set(this.purchaseData[index], 'children_subModel', this.innerPurchaseData)
        }
        this.$set(this.purchaseData[index], 'showChildren', !this.purchaseData[index]['showChildren'])
      } else if (column === 'city' && key === undefined) {
        if (!this.purchaseData[index]['children_city'] || !this.purchaseData[index]['children_city'].length) {
          const innerData = this.getCityData(index)
          await innerData
          this.$set(this.purchaseData[index], 'children_city', this.innerPurchaseData)
        }
        this.$set(this.purchaseData[index], 'showChildren', !this.purchaseData[index]['showChildren'])
      } else if (column === 'subModel' && key !== undefined) {
        const i = this.purchaseData[index]['children_city'].findIndex(item => item.cityId === key)
        if (i === -1) return
        if (!this.purchaseData[index]['children_city'][i] ||
          !this.purchaseData[index]['children_city'][i]['children'] ||
          !this.purchaseData[index]['children_city'][i]['children'].length) {
          const innerData = this.getSubModelData(index, i)
          await innerData
          this.$set(this.purchaseData[index]['children_city'][i], 'children', this.innerPurchaseData)
        }
        this.$set(this.purchaseData[index]['children_city'][i], 'showChildren', !this.purchaseData[index]['children_city'][i]['showChildren'])
      } else if (column === 'city' && key !== undefined) {
        const i = this.purchaseData[index]['children_subModel'].findIndex(item => item.subModelId === key)
        if (i === -1) return
        if (!this.purchaseData[index]['children_subModel'][i] ||
          !this.purchaseData[index]['children_subModel'][i]['children'] ||
          !this.purchaseData[index]['children_subModel'][i]['children'].length) {
          const innerData = this.getCityData(index, i)
          await innerData
          this.$set(this.purchaseData[index]['children_subModel'][i], 'children', this.innerPurchaseData)
        }
        this.$set(this.purchaseData[index]['children_subModel'][i], 'showChildren', !this.purchaseData[index]['children_subModel'][i]['showChildren'])
      } else if (column === 'amount') {
        this.visible = true
      }
    },
    handleOk() {
      this.visible = false
    },
    handleCancel() {
      this.visible = false
    },
    // API
    getData() {
      this.getPurchaseData()
    },
    getPurchaseData() {
      return getPurchaseData({
        subModel: 1
      }).then(res => {
        const data = res.data || []
        this.purchaseData = data
      })
    },
    getSubModelData(index, key) {
      return getSubModelData({
        id: index,
        key
      }).then(res => {
        const data = res.data || []
        this.innerPurchaseData = data
      })
    },
    getCityData(index, key) {
      return getCityData({
        id: index,
        key
      }).then(res => {
        const data = res.data || []
        this.innerPurchaseData = data
      })
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
    .background-gray {
      background-color: #f3f3f3;
    }
    .background-gray-2 {
      background-color: #f9f9f9;
    }
  }
}
</style>
