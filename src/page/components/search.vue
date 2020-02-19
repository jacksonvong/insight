<template>
  <a-card
    :tab-list="tabList"
    :active-tab-key="tabKey"
    :head-style="{padding: 0}"
    class="search-card ant-card-shortline"
    style="margin-bottom: 0; border-bottom: 0; border-bottom-left-radius: 0; border-bottom-right-radius: 0;"
    @tabChange="key => onTabChange(key)"
  >
    <div v-if="showSearch">
      <div class="search-item">
        <span class="search-item_label">时间: </span>
        <span class="search-item_box">
          <iw-date-picker
            v-model="dataForm.dataTime"
            :picker-options="pickerOptions"
            :clearable="false"
            :editable="false"
            value-format="yyyy-"
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
            placeholder="能源"
            style="width: 120px;"
            class="iw-text-bold"
          />
        </span>
        <span class="search-item_box">
          <iw-select
            v-model="dataForm.vehicleType"
            :data="searchFormData.vehicleType"
            placeholder="车身"
            style="width: 120px;"
            class="iw-text-bold"
          />
        </span>
        <span class="search-item_box">
          <iw-select
            v-model="dataForm.segment"
            :data="searchFormData.segment"
            placeholder="级别"
            style="width: 120px;"
            class="iw-text-bold"
          />
        </span>
        <span class="search-item_box">
          <iw-select
            v-model="dataForm.brandNatis"
            :data="searchFormData.brandNatis"
            placeholder="车系"
            style="width: 120px;"
            class="iw-text-bold"
          />
        </span>
        <span class="search-item_box">
          <iw-manfbrand
            v-model="dataForm.brand"
            :data="searchFormData.brand"
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
            :data="searchFormData.subModel"
            :show-letter="showLetter"
            :filters="[{key: 1, value: '细分市场'}, {key: 2, value: '品牌'}]"
            :selected-filter="selectedFilter"
            title="车型"
            placeholder="车型"
            style="width: 120px;"
            class="iw-text-bold"
            @filterChange="handleFilterChange"
            @change="handleSubModelChange"
          />
        </span>
      </div>
      <div class="search-item">
        <span class="search-item_label"/>
        <span class="search-item_box">
          <iw-button type="primary"> &nbsp;&nbsp;&nbsp;&nbsp;查询&nbsp;&nbsp;&nbsp;&nbsp;</iw-button>
          <iw-button >申请购买</iw-button>
        </span>
      </div>
    </div>
  </a-card>
</template>

<script>
import { Card } from 'ant-design-vue'
import { getTimeRange, getDimension, getCityLevel, getFuelType, getVehicleType, getSegment,
  getBrand, getBrandNatis, getModule, getSubModel } from '@/api/option'
export default {
  name: 'Search',
  components: {
    ACard: Card
  },
  props: {
    showSearch: {
      type: Boolean,
      default: true
    },
    tabList: {
      type: Array,
      default() {
        return []
      }
    },
    tabKey: {
      type: [String, Number],
      default() {
        return undefined
      }
    }
  },
  data() {
    return {
      dataForm: {
        dataTime: undefined,
        module: undefined,
        region: -1,
        cityLevel: undefined,
        regionTexts: undefined,
        fuelType: undefined,
        vehicleType: undefined,
        segment: undefined,
        brandNatis: undefined,
        brand: undefined,
        subModel: undefined
      },
      searchFormData: {
        timeRange: {},
        module: [
          { key: 1, value: '用户需求' },
          { key: 2, value: '竞争对比' }
        ],
        region: [],
        cityLevel: [
          { key: 1, value: '一级' },
          { key: 2, value: '二级' },
          { key: 3, value: '三级' },
          { key: 4, value: '四级' }
        ],
        fuelType: [
          { key: 1, value: '燃油车' },
          { key: 2, value: '纯电动车' }
        ],
        vehicleType: [
          { key: 1, value: 'CAR' },
          { key: 2, value: 'SUV' },
          { key: 3, value: 'MPV' }
        ],
        segment: [
          { key: 1, value: 'A级' },
          { key: 2, value: 'B级' },
          { key: 3, value: 'C级' },
          { key: 4, value: 'D级' }
        ],
        brandNatis: [
          { key: 1, value: '自主' },
          { key: 2, value: '德系' },
          { key: 3, value: '美系' },
          { key: 4, value: '日系' },
          { key: 5, value: '韩系' }
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
    onTabChange(key) {
      this.$emit('onTabChange', key)
    },
    handleDateTimeChange() {},
    handleRegionChange(value, texts) {
      this.dataForm.region = value
      this.dataForm.regionTexts = texts
    },
    handleManfBrandChange(value) {
      console.log(value)
      this.dataForm.brand = value
    },
    handleSubModelChange(value) {
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
          this.searchFormData.brandNatis = data
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
