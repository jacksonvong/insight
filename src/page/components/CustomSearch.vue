<template>
  <div class="search-card">
    <div class="search-item">
      <span class="search-item_label">时间: </span>
      <span class="search-item_box">
        <iw-date-picker
          v-model="dataForm.dataTime"
          :clearable="false"
          :editable="false"
          value-format="yyyy-"
          type="monthrange"
          beginplaceholder="开始日期"
          endplaceholder="结束日期"
          align="right"
          style="width: 160px;"
          class="iw-text-bold"
          @change="handleDateTimeChange"
        />
      </span>
    </div>
    <div v-if="showModule" class="search-item">
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
          v-model="dataForm.level"
          :data="searchFormData.level"
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
          v-model="dataForm.bodyForm"
          :data="searchFormData.bodyForm"
          placeholder="车身"
          style="width: 120px;"
          class="iw-text-bold"
        />
      </span>
      <span class="search-item_box">
        <iw-select
          v-model="dataForm.classify"
          :data="searchFormData.classify"
          placeholder="级别"
          style="width: 120px;"
          class="iw-text-bold"
        />
      </span>
      <span class="search-item_box">
        <iw-select
          v-model="dataForm.series"
          :data="searchFormData.series"
          placeholder="车系"
          style="width: 120px;"
          class="iw-text-bold"
        />
      </span>
      <span class="search-item_box">
        <iw-manfbrand
          v-model="dataForm.manfBrand"
          :data="searchFormData.manfBrand"
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
          :show-letter="false"
          title="车型"
          placeholder="车型"
          style="width: 120px;"
          class="iw-text-bold"
          @change="handleSubModelChange"
        />
      </span>
    </div>
    <div class="search-item">
      <span class="search-item_label"/>
      <span class="search-item_box">
        <!--          <iw-button type="primary"> &nbsp;&nbsp;&nbsp;&nbsp;查询&nbsp;&nbsp;&nbsp;&nbsp;</iw-button>-->
        <!--          <iw-button >申请购买</iw-button>-->
        <iw-button type="primary" @click="onSearchData"> &nbsp;&nbsp;&nbsp;&nbsp;查询&nbsp;&nbsp;&nbsp;&nbsp;</iw-button>
        <iw-button @click="onSearchData"> &nbsp;&nbsp;&nbsp;&nbsp;对比分析&nbsp;&nbsp;&nbsp;&nbsp;</iw-button>
        <iw-button>下载</iw-button>
        <slot/>
      </span>
    </div>
  </div>
</template>

<script>
import { Card } from 'ant-design-vue'
import { getDimension, getManfbrand, getSubModel } from '@/api/option'
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
    },
    showModule: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    return {
      dataForm: {
        dataTime: undefined,
        module: undefined,
        region: -1,
        level: undefined,
        regionTexts: undefined,
        fuelType: undefined,
        bodyForm: undefined,
        classify: undefined,
        series: undefined,
        manfBrand: undefined,
        subModel: undefined
      },
      searchFormData: {
        module: [
          { key: 1, value: '用户需求' },
          { key: 2, value: '竞争对比' }
        ],
        region: [],
        level: [
          { key: 1, value: '一级' },
          { key: 2, value: '二级' },
          { key: 3, value: '三级' },
          { key: 4, value: '四级' }
        ],
        fuelType: [
          { key: 1, value: '燃油车' },
          { key: 2, value: '纯电动车' }
        ],
        bodyForm: [
          { key: 1, value: 'CAR' },
          { key: 2, value: 'SUV' },
          { key: 3, value: 'MPV' }
        ],
        classify: [
          { key: 1, value: 'A级' },
          { key: 2, value: 'B级' },
          { key: 3, value: 'C级' },
          { key: 4, value: 'D级' }
        ],
        series: [
          { key: 1, value: '自主' },
          { key: 2, value: '德系' },
          { key: 3, value: '美系' },
          { key: 4, value: '日系' },
          { key: 5, value: '韩系' }
        ],
        manfBrand: [],
        subModel: []
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
      this.dataForm.manfBrand = value
    },
    handleSubModelChange(value) {
      this.dataForm.subModel = value
    },
    getData() {
      this.getRegion()
      this.getManfbrand()
      this.getSubModel()
    },
    getRegion() {
      return getDimension()
        .then(response => {
          const data = response.data || []
          this.searchFormData.region = data
        })
    },
    getManfbrand() {
      return getManfbrand()
        .then(response => {
          const data = response.data || []
          this.searchFormData.manfBrand = data
        })
    },
    getSubModel() {
      return getSubModel()
        .then(response => {
          const data = response.data || []
          this.searchFormData.subModel = data[0]
        })
    },
    getSearchFormData() {
      return this.dataForm
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
