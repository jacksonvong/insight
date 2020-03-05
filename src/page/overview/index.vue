<template>
  <div class="overview">
    <!-- 0--顶部筛选条件 -->
    <iw-banner/>
    <div class="main-content">
      <iw-search
        :show-search="tabKey=='2'"
        :tab-list="tabList"
        :tab-key="tabKey"
        :post-disabled="selectedRowKeys.length==0"
        :show-module="tabKey=='2'"
        :show-contrast="false"
        :show-download="false"
        :show-apply-buy="true"
        styles="margin-bottom: 0; border-bottom: 0; "
        @onTabChange="changeTab"
        @change="changeDataForm"
        @post="openDataForm"
      />
      <a-card v-if="tabKey=='1'" :body-style="{padding: '0'}" style="border-top: 0; border-top-left-radius: 0; border-top-right-radius: 0;">
        <div class="overview-table_total">
          <span>{{ $t('overview.sampleNumTotal') }}：{{ purchaseNum }}</span>
        </div>
        <div class="overview-table">
          <div class="ant-table-body">
            <table>
              <thead class="ant-table-thead">
                <tr>
                  <th v-for="column in columns" :key="column.dataIndex">
                    <div>{{ column.title }}</div>
                  </th>
                </tr>
              </thead>
              <tbody class="ant-table-tbody">
                <template v-if="purchaseData.length">
                  <template v-for="(row, index) in purchaseData">
                    <tr :key="index">
                      <td v-for="column in columns" :key="column.dataIndex">
                        <template v-if="column.dataIndex=='subModel'">
                          <a href="javascript:;" @click="handleCellClick('subModel', index)">查看详情</a>
                        </template>
                        <template v-else-if="column.dataIndex=='city'">
                          <a v-if="false" href="javascript:;" @click="handleCellClick('city', index)">查看详情</a>
                        </template>
                        <template v-else-if="['module'].includes(column.dataIndex)">
                          {{ row[column.dataIndex].name }}
                        </template>
                        <template v-else-if="column.dataIndex=='month'">
                          {{ moment(row.startYm, 'YYYYMM').format('YYYY-MM') }} 至 {{ moment(row.endYm, 'YYYYMM').format('YYYY-MM') }}
                        </template>
                        <template v-else-if="column.dataIndex=='sampleNum'">
                          <a href="javascript:;" @click="handleSampleClick(row.module.name, row.ymSamples)">{{ row[column.dataIndex] }}</a>
                        </template>
                        <template v-else>{{ row[column.dataIndex] }}</template>
                      </td>
                    </tr>
                    <template v-if="row.showChildren&&row.children_subModel&&row.children_subModel.length">
                      <template v-for="(innerRow, innerIndex) in row.children_subModel">
                        <tr :key="'inner_'+innerIndex">
                          <td v-for="column in columns" :key="'row1_'+column.dataIndex">
                            <template v-if="column.dataIndex=='city'">
                              <a href="javascript:;" @click="handleCellClick('city', index, innerRow.subModelId)">查看详情</a>
                            </template>
                            <template v-else>{{ innerRow[column.dataIndex] }}</template>
                          </td>
                        </tr>
                        <template v-if="innerRow.showChildren&&innerRow.children&&innerRow.children.length">
                          <tr v-for="(innerRow2, innerIndex2) in innerRow.children" :key="'inner_'+innerIndex+'_'+innerIndex2">
                            <td v-for="column in columns" :key="'row2_'+column.dataIndex">
                              <template>{{ innerRow2[column.dataIndex] }}</template>
                            </td>
                          </tr>
                        </template>
                      </template>
                    </template>
                  </template>
                </template>
              </tbody>
            </table>
            <iw-empty v-if="purchaseData.length==0" :status="status.purchase" style="height: 300px;" />
          </div>
        </div>
      </a-card>
      <a-card v-if="tabKey=='2'" :body-style="{padding: '0'}" style="border-top: 0; border-top-left-radius: 0; border-top-right-radius: 0;">
        <div class="overview-table_total">
          <span>{{ $t('overview.sampleNumTotal') }}：{{ sampleNum }}</span>
        </div>
        <div class="overview-table">
          <div class="ant-table-body">
            <table>
              <thead class="ant-table-thead">
                <tr>
                  <th><a-checkbox v-model="checkAll" @change="handleCheckAllChage" /></th>
                  <th v-for="column in columns" :key="column.dataIndex">
                    <div>{{ column.title }}</div>
                  </th>
                </tr>
              </thead>
              <tbody v-if="sampleList.length" class="ant-table-tbody">
                <template v-for="(row, index) in sampleList">
                  <tr :key="'row_'+index">
                    <td><a-checkbox :checked="selectedRowKeys.includes(index)" @change="event => onChange(event, index)" /></td>
                    <td v-for="column in columns" :key="column.dataIndex">
                      <template v-if="['module', 'subModel', 'city'].includes(column.dataIndex)">
                        {{ row[column.dataIndex].name }}
                      </template>
                      <template v-else-if="column.dataIndex=='month'">
                        {{ moment(row.startYm, 'YYYYMM').format('YYYY-MM') }} 至 {{ moment(row.endYm, 'YYYYMM').format('YYYY-MM') }}
                      </template>
                      <template v-else-if="column.dataIndex=='sampleNum'">
                        <a href="javascript:;" @click="handleSampleClick(row.module.name, row.ymSamples)">{{ row[column.dataIndex] }}</a>
                      </template>
                      <template v-else>{{ row[column.dataIndex] }}</template>
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
            <iw-empty v-if="sampleList.length==0" :status="status.sample" style="height: 300px;" />
          </div>
        </div>
      </a-card>
    </div>
    <div>
      <a-modal
        :visible="visible.post"
        :confirm-loading="confirmLoading"
        :title="false"
        :closable="false"
      >
        <template slot="footer">
          <a-button key="submit" type="primary" @click="postDataForm">确定</a-button>
          <a-button key="back" @click="visible.post=false">取消</a-button>
        </template>
        <div class="overview-post-form">
          <div class="post-form_row"><h3>申请购买所选的功能内容？</h3></div>
          <div class="post-form_row">
            <span class="search-item_label">时间: </span>
            <span class="search-item_box">
              <iw-date-picker
                v-model="dataTime"
                :clearable="false"
                :editable="false"
                value-format="yyyyMM"
                type="monthrange"
                align="right"
                style="width: 160px;"
              />
            </span>
          </div>
        </div>
      </a-modal>
    </div>
    <div>
      <a-modal
        :visible="visible.detail"
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
import { Card, Table, Checkbox, Button, Modal, message } from 'ant-design-vue'
import moment from 'moment'
import IwBanner from '@/components/banner/index'
import IwSearch from '@/page/components/search'
import { getPurchaseData, getSubModelData, getCityData, getAllFunctions, applyBuy } from '@/api/overview'

export default {
  name: 'Overview',
  components: {
    ACard: Card,
    ATable: Table,
    ACheckbox: Checkbox,
    AButton: Button,
    AModal: Modal,
    IwBanner: IwBanner,
    IwSearch: IwSearch
  },
  data() {
    return {
      tabList: [
        // { key: '1', tab: this.$t('overview.own') },
        { key: '2', tab: this.$t('overview.all') }
      ],
      tabKey: '2',
      dataForm: {},
      status: {
        purchase: 200,
        sample: 200
      },
      purchaseData: [],
      purchaseNum: [],
      innerPurchaseData: [],
      sampleList: [],
      sampleNum: 0,
      checkAll: false,
      selectedRowKeys: [],

      visible: {
        detail: false,
        post: false
      },
      dataTime: [
        moment([moment().year(), 0]).format('YYYYMM'),
        moment([moment().year(), 0]).add(11, 'months').format('YYYYMM')
      ],
      confirmLoading: false,
      innerData: [],

      columns: [{
        title: this.$t('overview.module'),
        dataIndex: 'module'
      }, {
        title: this.$t('overview.month'),
        dataIndex: 'month'
      }, {
        title: this.$t('overview.subModel'),
        dataIndex: 'subModel'
      }, {
        title: this.$t('overview.city'),
        dataIndex: 'city'
      }, {
        title: this.$t('overview.sampleNum'),
        dataIndex: 'sampleNum',
        scopedSlots: { customRender: 'sampleNum' }
      }],

      innerColumns: [{
        title: this.$t('overview.module'),
        dataIndex: 'module'
      }, {
        title: this.$t('overview.month'),
        dataIndex: 'month'
      }, {
        title: this.$t('overview.sampleNum'),
        dataIndex: 'sampleNum',
        scopedSlots: { customRender: 'sampleNum' }
      }]
    }
  },
  computed: {
    hasSelected() {
      return this.selectedRowKeys.length > 0
    }
  },
  created() {
    this.getData()
  },
  methods: {
    moment() {
      return moment(...arguments)
    },
    changeTab(key) {
      this.tabKey = key
    },
    changeDataForm(form) {
      this.dataForm = Object.assign(this.dataForm, form)
      this.getData()
    },
    openDataForm() {
      this.visible.post = true
    },
    postDataForm() {
      if (!this.dataTime || !this.dataTime[0] || !this.dataTime[1]) {
        message.error('选择时间')
        return
      }
      const selectedSampleList = this.sampleList.filter((item, key) => this.selectedRowKeys.includes(key))
      const params = { startYm: this.dataTime[0], endYm: this.dataTime[1] }
      params.sampleList = selectedSampleList
      this.applyBuy(params)
      this.visible.post = false
    },
    handleCheckAllChage(event) {
      const checked = event.target.checked
      if (checked) {
        this.selectedRowKeys = this.sampleList.map((item, key) => key)
      } else {
        this.selectedRowKeys = []
      }
    },
    onChange(event, key) {
      const checked = event.target.checked
      if (checked) {
        this.selectedRowKeys.push(key)
      } else {
        const index = this.selectedRowKeys.findIndex(item => item === key)
        this.selectedRowKeys.splice(index, 1)
      }
      const keys = new Set(this.selectedRowKeys)
      this.selectedRowKeys = [...keys]
      this.checkAll = this.selectedRowKeys.length === this.sampleList.length
    },
    async handleCellClick(column, index, key) {
      console.log(column, index, key)
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
      }
    },
    handleSampleClick(moduleName, data) {
      this.innerData = data.map(item => {
        item.module = moduleName
        item.month = moment(item.ymId, 'YYYYMM').format('YYYY-MM')
        return item
      })
      this.visible.detail = true
    },
    handleOk() {
      this.visible.detail = false
    },
    handleCancel() {
      this.visible.detail = false
    },
    // API
    getData() {
      this.getPurchaseData()
      this.getAllFunctions()
    },
    getPurchaseData() {
      return getPurchaseData({
        subModel: 1
      }).then(res => {
        const data = res.data || []
        this.purchaseData = data
        this.purchaseData = data.sampleList || []
        this.purchaseNum = data.sampleNum || 0
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
    },
    getAllFunctions() {
      return getAllFunctions(this.dataForm).then(res => {
        const data = res.data || {}
        this.sampleList = data.sampleList || []
        this.sampleNum = data.sampleNum || 0
        this.status.sample = 200
      }).catch(res => {
        this.status.sample = 500
      })
    },
    applyBuy(params) {
      return applyBuy(params).then(res => {
        const data = res.data
        if (data) {
          this.selectedRowKeys = []
          this.dataTime = []
          message.success('申请成功')
        } else {
          message.error('申请失败')
        }
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
.overview-post-form {
  text-align: center;
  .post-form_row {
    margin-bottom: 20px;
  }
}
</style>
