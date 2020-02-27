<template>
  <div>
    <a-card :title="title" :body-style="{padding: '0'}" style="margin-bottom: 0; border-bottom: 0; border-bottom-left-radius: 0; border-bottom-right-radius: 0;">
      <a-tabs v-if="panes&&panes.length" v-model="activeKey" :type="tabType" @edit="onEdit" @change="onTabChange">
        <a-tab-pane v-for="pane in panes" :tab="pane.tab" :key="pane.key" :closable="panes.length>1"/>
      </a-tabs>
    </a-card>
    <a-card :style="'border-top-left-radius: 0; border-top-right-radius: 0;'+styles" class="search-card">
      <div v-if="showSearch">
        <div class="search-item">
          <span class="search-item_label">时间: </span>
          <span class="search-item_box">
            <iw-date-picker
              v-model="dataForm.dataTime"
              :picker-options="pickerOptions"
              :clearable="false"
              :editable="false"
              value-format="yyyyMM"
              type="monthrange"
              align="right"
              style="width: 160px;"
              class="iw-text-bold"
              @change="handleDateTimeChange"
            />
          </span>
        </div>
        <div class="search-item">
          <span class="search-item_label">模块: </span>
          <span class="search-item_box">
            <iw-select
              v-model="dataForm.module"
              :data="searchFormData.module"
              multiple
              show-check-all
              style="width: 120px;"
              class="iw-text-bold"
            />
          </span>
        </div>
        <div class="search-item">
          <span class="search-item_label">区域: </span>
          <span class="search-item_box">
            <iw-cascader
              v-model="dataForm.region"
              :texts="dataForm.regionTexts"
              :data="searchFormData.region"
              :column-name="['区域', '省份', '城市']"
              :height="200"
              multiple
              title="区域"
              placeholder="请选择"
              style="width: 120px;"
              class="iw-text-bold"
              @change="handleRegionChange"
            />
          </span>
          <span class="search-item_box">
            <iw-select
              v-model="dataForm.cityLevel"
              :data="searchFormData.cityLevel"
              multiple
              show-check-all
              style="width: 120px;"
              class="iw-text-bold"
            />
          </span>
        </div>
        <div class="search-item">
          <span class="search-item_label">市场: </span>
          <span class="search-item_box">
            <iw-select
              v-model="dataForm.fuelType"
              :data="searchFormData.fuelType"
              multiple
              show-check-all
              placeholder="能源"
              style="width: 120px;"
              class="iw-text-bold"
            />
          </span>
          <span class="search-item_box">
            <iw-select
              v-model="dataForm.vehicleType"
              :data="searchFormData.vehicleType"
              multiple
              show-check-all
              placeholder="车身"
              style="width: 120px;"
              class="iw-text-bold"
            />
          </span>
          <span class="search-item_box">
            <iw-select
              v-model="dataForm.segment"
              :data="searchFormData.segment"
              multiple
              show-check-all
              placeholder="级别"
              style="width: 120px;"
              class="iw-text-bold"
            />
          </span>
          <span class="search-item_box">
            <iw-select
              v-model="dataForm.brandNati"
              :data="searchFormData.brandNati"
              multiple
              show-check-all
              placeholder="车系"
              style="width: 120px;"
              class="iw-text-bold"
            />
          </span>
          <span class="search-item_box">
            <iw-manfbrand
              v-model="dataForm.brand"
              :data="searchFormData.brand"
              multiple
              title="品牌"
              placeholder="品牌"
              style="width: 120px;"
              class="iw-text-bold"
              @change="handleManfBrandChange"
            />
          </span>
          <span class="search-item_box">
            <iw-submodel
              v-model="dataForm.subModel"
              :default-value="[]"
              :data="searchFormData.subModel"
              :show-letter="showLetter"
              :filters="[{key: 1, value: '细分市场'}, {key: 2, value: '品牌'}]"
              :selected-filter="selectedFilter"
              title="车型"
              placeholder="车型"
              size="mini"
              placement="bottomLeft"
              style="width: 120px;"
              @filterChange="handleFilterChange"
              @change="handleSubModelChange"
            />
          </span>
        </div>
        <div class="search-item">
          <span class="search-item_label"/>
          <span class="search-item_box">
            <iw-button type="primary" @click="handleFormChange"> &nbsp;&nbsp;&nbsp;&nbsp;查询&nbsp;&nbsp;&nbsp;&nbsp;</iw-button>
            <iw-button :disabled="postDisabled" @click="handleApplyBuy">申请购买</iw-button>
          </span>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script>
import { Card, Tabs } from 'ant-design-vue'
import { getTimeRange, getDimension, getCityLevel, getFuelType, getVehicleType, getSegment,
  getBrand, getBrandNatis, getModule, getSubModel } from '@/api/option'
export default {
  name: 'Search',
  components: {
    ACard: Card,
    ATabs: Tabs,
    ATabPane: Tabs.TabPane
  },
  props: {
    title: {
      type: [String, Boolean],
      default: ''
    },
    showSearch: {
      type: Boolean,
      default: true
    },
    styles: {
      type: String,
      default: ''
    },
    tabList: {
      type: Array,
      default() {
        return []
      }
    },
    tabType: {
      type: String,
      default: 'line'
    },
    tabKey: {
      type: [String, Number],
      default() {
        return undefined
      }
    },
    postDisabled: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      // tabs
      activeKey: '1',
      panes: this.tabList,
      newTabIndex: this.tabList.length,

      // search
      dataForm: {
        dataTime: undefined,
        module: undefined,
        region: -1,
        regionIds: [],
        provinceIds: [],
        cityIds: [],
        cityLevel: undefined,
        regionTexts: undefined,
        fuelType: undefined,
        vehicleType: undefined,
        segment: undefined,
        brandNati: undefined,
        brand: undefined,
        subModel: undefined
      },
      searchFormData: {
        timeRange: {},
        module: [
        ],
        region: [],
        cityLevel: [
        ],
        fuelType: [
        ],
        vehicleType: [
        ],
        segment: [
        ],
        brandNati: [
        ],
        brand: [],
        subModel: []
      },
      showLetter: false,
      selectedFilter: 1,
      subModelData: []
    }
  },
  computed: {
    pickerOptions() { // 日期选择控制
      const startYm = this.searchFormData.timeRange.startYm
      const endYm = this.searchFormData.timeRange.endYm
      if (!startYm || !endYm) return
      const months = [
        new Date(startYm.substr(0, 4) + '/' + startYm.substr(4, 2) + '/01'),
        new Date(endYm.substr(0, 4) + '/' + endYm.substr(4, 2) + '/01')
      ].map(item => {
        return item.valueOf()
      })
      return {
        disabledDate(time) {
          return months[1] < time.getTime() || time.getTime() < months[0]
        }
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    // tabs
    onEdit(targetKey, action) {
      this[action](targetKey)
    },
    onTabChange(key) {
      this.$emit('onTabChange', key)
    },
    add() {
      const panes = this.panes
      const activeKey = `${++this.newTabIndex}`
      panes.push({ tab: `看板 ${activeKey}`, key: activeKey })
      this.panes = panes
      this.activeKey = activeKey
    },
    remove(targetKey) {
      let activeKey = this.activeKey
      let lastIndex
      this.panes.forEach((pane, i) => {
        if (pane.key === targetKey) {
          lastIndex = i - 1
        }
      })
      if (this.panes.length === 1) return
      const panes = this.panes.filter(pane => pane.key !== targetKey)
      if (panes.length && activeKey === targetKey) {
        if (lastIndex >= 0) {
          activeKey = panes[lastIndex].key
        } else {
          activeKey = panes[0].key
        }
      }
      this.panes = panes
      this.activeKey = activeKey
    },

    // search
    handleFormChange() {
      const dataForm = this.dataForm
      this.$emit('change', {
        brandIds: dataForm.brand,
        brandNatiIds: dataForm.brandNati,
        cityIds: dataForm.cityIds,
        cityLevel: dataForm.cityLevel,
        endYm: dataForm.dataTime ? dataForm.dataTime[1] : 0,
        fuelTypeIds: dataForm.fuelType,
        modules: dataForm.module,
        provinceIds: dataForm.provinceIds,
        regionIds: dataForm.regionIds,
        segmentIds: dataForm.segment,
        startYm: dataForm.dataTime ? dataForm.dataTime[0] : 0,
        subModelIds: dataForm.subModel,
        vehicleTypeIds: dataForm.vehicleType
      })
    },
    handleApplyBuy() {
      const dataForm = this.dataForm
      this.$emit('post', dataForm)
    },
    handleDateTimeChange(value) {
      console.log(value)
    },
    handleRegionChange(value, texts) {
      console.log(value, texts)
      this.dataForm.region = value
      this.dataForm.regionTexts = texts
      const regionIds = []
      const provinceIds = []
      const cityIds = []
      texts.forEach(item => {
        if (item.level === 0) {
          regionIds.push(item.key)
        } else if (item.level === 1) {
          provinceIds.push(item.key)
        } else {
          cityIds.push(item.key)
        }
      })
      this.regionIds = regionIds
      this.provinceIds = provinceIds
      this.cityIds = cityIds
    },
    handleManfBrandChange(value) {
      console.log(value)
      this.dataForm.brand = value
    },
    handleSubModelChange(value, texts) {
      console.log(value, texts)
      // this.dataForm.subModel = value
    },
    handleFilterChange(key) {
      this.selectedFilter = key
      if (key === 2) {
        this.showLetter = true
        this.searchFormData.subModel = this.subModelData[1]
      } else {
        this.showLetter = false
        this.searchFormData.subModel = this.subModelData[0]
      }
    },
    getData() {
      this.getTimeRange()
      this.getBrand()
      this.getCityLevel()
      this.getModule()
      this.getDimension()
      this.getSubModel()
      this.getFuelType()
      this.getVehicleType()
      this.getSegment()
      this.getBrandNatis()
    },
    getTimeRange() {
      return getTimeRange()
        .then(response => {
          const data = response.data || []
          this.searchFormData.timeRange = data
        })
    },
    getDimension() {
      return getDimension()
        .then(response => {
          const data = response.data || []
          this.searchFormData.region = data
        })
    },
    getCityLevel() {
      return getCityLevel()
        .then(response => {
          const data = response.data || []
          this.searchFormData.cityLevel = data
        })
    },
    getBrand() {
      return getBrand()
        .then(response => {
          const data = response.data || []
          this.searchFormData.brand = data
        })
    },
    getModule() {
      return getModule()
        .then(response => {
          const data = response.data || []
          this.searchFormData.module = data
        })
    },
    getSubModel() {
      return getSubModel()
        .then(response => {
          const data = response.data || []
          this.subModelData = data
          this.searchFormData.subModel = data[0]
        })
    },
    getFuelType() {
      return getFuelType()
        .then(response => {
          const data = response.data || []
          this.searchFormData.fuelType = data
        })
    },
    getVehicleType() {
      return getVehicleType()
        .then(response => {
          const data = response.data || []
          this.searchFormData.vehicleType = data
        })
    },
    getSegment() {
      return getSegment()
        .then(response => {
          const data = response.data || []
          this.searchFormData.segment = data
        })
    },
    getBrandNatis() {
      return getBrandNatis()
        .then(response => {
          const data = response.data || []
          this.searchFormData.brandNati = data
        })
    }
  }
}
</script>

<style lang="less" scoped>
.search-card {
  .search-item {
    display: flex;
    flex-wrap: wrap;
    .search-item_label {
      width: 80px;
    }
    .search-item_box {
      margin: 0 10px 10px 0;
    }
  }
}
</style>
