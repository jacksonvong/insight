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
          <span class="search-item_label">{{ $t('search.dateTime') }}: </span>
          <span class="search-item_box">
            <iw-date-picker
              v-model="dataForm.dataTime"
              :picker-options="pickerOptions"
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
        <div v-if="showModule" class="search-item">
          <span class="search-item_label">{{ $t('search.module') }}: </span>
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
          <span class="search-item_label">{{ $t('search.region') }}: </span>
          <span class="search-item_box">
            <iw-cascader
              v-model="dataForm.region"
              :texts="dataForm.regionTexts"
              :default-value="[]"
              :default-texts="[]"
              :data="searchFormData.region"
              :column-name="[$t('search.region'), $t('search.province'), $t('search.city')]"
              :title="$t('search.region')"
              :height="200"
              multiple
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
          <span class="search-item_label">{{ $t('search.market') }}: </span>
          <span class="search-item_box">
            <iw-select
              v-model="dataForm.fuelType"
              :data="searchFormData.fuelType"
              :placeholder="$t('search.fuel')"
              multiple
              show-check-all
              style="width: 120px;"
              class="iw-text-bold"
            />
          </span>
          <span class="search-item_box">
            <iw-select
              v-model="dataForm.vehicleType"
              :data="searchFormData.vehicleType"
              :placeholder="$t('search.vehicleType')"
              multiple
              show-check-all
              style="width: 120px;"
              class="iw-text-bold"
            />
          </span>
          <span class="search-item_box">
            <iw-select
              v-model="dataForm.segment"
              :data="searchFormData.segment"
              :placeholder="$t('search.segment')"
              multiple
              show-check-all
              style="width: 120px;"
              class="iw-text-bold"
            />
          </span>
          <span class="search-item_box">
            <iw-select
              v-model="dataForm.brandNati"
              :data="searchFormData.brandNati"
              :placeholder="$t('search.brandNati')"
              multiple
              show-check-all
              style="width: 120px;"
              class="iw-text-bold"
            />
          </span>
          <span class="search-item_box">
            <iw-manfbrand
              v-model="dataForm.brand"
              :default-value="[]"
              :data="searchFormData.brand"
              :title="$t('search.brand')"
              :placeholder="$t('search.brand')"
              :height="276"
              multiple
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
              :filters="[{key: 1, value: $t('search.subModel')}, {key: 2, value: $t('search.brand')}]"
              :selected-filter="selectedFilter"
              :multiple="multiple.submodel"
              :title="$t('search.subModel')"
              :placeholder="$t('search.subModel')"
              :height="276"
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
            <iw-button type="primary" @click="handleFormChange"> &nbsp;&nbsp;&nbsp;&nbsp;{{ $t('search.search') }}&nbsp;&nbsp;&nbsp;&nbsp;</iw-button>
            <iw-button v-if="showApplyBuy" :disabled="postDisabled" @click="handleApplyBuy">{{ $t('search.applyBuy') }}</iw-button>
            <iw-button v-if="showContrast" @click="handleComparison">{{ $t('search.compare') }}</iw-button>
            <iw-button v-if="showDownload" @click="handleDownload">{{ $t('search.download') }}</iw-button>
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
import moment from 'moment'
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
    multiple: {
      type: Object,
      default() {
        return {
          submodel: true
        }
      }
    },
    showSearch: {
      type: Boolean,
      default: true
    },
    showModule: {
      type: Boolean,
      default: false
    },
    showApplyBuy: {
      type: Boolean,
      default: false
    },
    showContrast: {
      type: Boolean,
      default: true
    },
    showDownload: {
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
      activeKey: this.tabKey,
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
        brand: [],
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
      const startYm = this.searchFormData.timeRange.startYm + ''
      const endYm = this.searchFormData.timeRange.endYm + ''
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
      panes.push({ tab: `${this.$t('search.board')} ${activeKey}`, key: activeKey })
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
      const form = {
        brandIds: dataForm.brand[0],
        brandNatiIds: dataForm.brandNati,
        cityIds: this.cityIds,
        cityLevelIds: dataForm.cityLevel,
        endYm: dataForm.dataTime ? dataForm.dataTime[1] : '',
        fuelTypeIds: dataForm.fuelType,
        modules: dataForm.module,
        provinceIds: this.provinceIds,
        regionIds: this.regionIds,
        segmentIds: dataForm.segment,
        startYm: dataForm.dataTime ? dataForm.dataTime[0] : '',
        subModelIds: dataForm.subModel,
        vehicleTypeIds: dataForm.vehicleType
      }
      this.$emit('change', form)
    },
    handleApplyBuy() {
      const dataForm = this.dataForm
      this.$emit('post', dataForm)
    },
    handleComparison() {
      this.$emit('comparison')
    },
    handleDownload() {
      this.$emit('download')
    },
    handleDateTimeChange(value) {
      console.log(value)
    },
    handleRegionChange(value, texts) {
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
      this.dataForm.brand = value
    },
    handleSubModelChange(value, texts) {
      this.dataForm.subModel = value
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
    async getData() {
      this.getTimeRange()
      this.getBrand()
      this.getCityLevel()
      this.getModule()
      this.getDimension()
      this.getFuelType()
      this.getVehicleType()
      this.getSegment()
      this.getBrandNatis()
      const subModel = this.getSubModel()
      if (this.multiple.submodel === false) {
        await subModel
        console.log(this.subModelData)
        this.handleSubModelChange([this.subModelData[0][0]['children'][0]['children'][0]['key']])
        this.handleFormChange()
      }
    },
    getTimeRange() {
      return getTimeRange()
        .then(response => {
          const data = response.data || []
          this.searchFormData.timeRange = data
          // set default value
          this.dataForm.dataTime = [
            moment(data.endYm, 'YYYYMM').format('YYYY01'),
            moment(data.endYm, 'YYYYMM').format('YYYYMM')
          ]
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
          const subModelData = data[0]
          this.subModelData = data
          this.searchFormData.subModel = subModelData
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
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .search-item_box {
      margin: 0 10px 10px 0;
    }
  }
}
</style>
