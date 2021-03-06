<template>
  <a-card :class="'banner-card--'+status" :body-style="{padding: 0}" class="banner-card">
    <a-spin :spinning="spinning.params">
      <ul class="banner-filter">
        <li class="banner-filter-item">
          <span class="filter-item_label">维度</span>
          <span class="filter-item_text">
            <iw-cascader
              :value="dataForm.region"
              :default-value="defaultDataForm.region"
              :data="searchFormData.region"
              :column-name="['全国', '区域', '省份', '城市']"
              :select-on-leaf="false"
              :show-search="true"
              :multiple="false"
              :disabled="disabled.region"
              :height="240"
              title="选择维度"
              placement="bottomLeft"
              size="mini"
              style="width: 120px;"
              class="iw-text-bold"
              @change="handleRegionChange"
            />
          </span>
        </li>
        <li class="banner-filter-item">
          <span class="filter-item_label">数据源</span>
          <span class="filter-item_text">
            <iw-select
              v-model="dataForm.dataSource"
              :data="searchFormData.dataSource"
              :multiple="false"
              placeholder="请选择"
              align="left"
              size="mini"
              style="width: 150px;"
              class="iw-text-bold"
              @change="handleDataSourceChange"
            />
          </span>
        </li>
        <li class="banner-filter-item">
          <span class="filter-item_label">时间</span>
          <span class="filter-item_text">
            <iw-date-picker
              v-model="dataForm.dataTime"
              :clearable="false"
              :editable="false"
              type="month"
              size="mini"
              placeholder="请选择"
              align="right"
              style="width: 120px;"
              class="iw-text-bold"
              @change="handleDateTimeChange"
            />
          </span>
        </li>
        <li v-if="type==='manfBrand'" class="banner-filter-item">
          <span class="filter-item_label">厂商品牌</span>
          <span class="filter-item_text">
            <iw-manfbrand
              v-model="dataForm.manfBrand"
              :data="searchFormData.manfBrand"
              :show-search="true"
              :height="300"
              title="厂商品牌"
              placement="bottomLeft"
              size="mini"
              style="width: 170px;"
              class="iw-text-bold"
              @change="handleManfChange"
            />
          </span>
        </li>
        <li v-if="type==='subModel'" class="banner-filter-item">
          <span class="filter-item_label">车型</span>
          <span class="filter-item_text">
            <iw-submodel
              v-model="dataForm.subModel"
              :texts="dataForm.subModelText"
              :data="searchFormData.subModel"
              :multiple="false"
              :show-search="true"
              :show-letter="showLetter"
              :filters="[{key: 1, value: '细分市场'}, {key: 2, value: '厂商品牌'}]"
              :selected-filter="selectedFilter"
              :height="300"
              title="车型"
              placement="bottomLeft"
              size="mini"
              style="width: 120px;"
              class="iw-text-bold"
              @filterChange="handleFilterChange"
              @change="handleSubModelChange"
            >
              <span slot="desc" class="iw-footer-desc--right">
                <abbr class="font-gray">车型国别：</abbr>
                <abbr class="font-blue">■ 国产 </abbr>
                <abbr class="font-orange">■ 进口</abbr>
              </span>
            </iw-submodel>
          </span>
        </li>
        <li v-if="['manfBrand', 'subModel'].includes(type)" class="banner-filter-item">
          <span class="filter-item_label clearfix">
            <em class="filter-item_label--title">选择竞品</em>
            <em :title="dataForm.compCircleName" class="filter-item_label--circle">{{ dataForm.compCircleName }}</em>
          </span>
          <span class="filter-item_text">
            <iw-favorite
              ref="competitive-circle"
              v-model="dataForm.compCircle"
              :data="searchFormData.competitiveCircle"
              :type="type"
              :type-data="typeData"
              :loading="spinning.save"
              :show-folder="false"
              title="车型"
              placement="bottomLeft"
              style="width: 420px;"
              class="iw-text-bold"
              size="mini"
              require
              @change="handleJpChange"
              @save="handleJpSave"
            >
              <span slot="desc" class="iw-favorite__desc">
                <abbr class="font-blue">■ 国产 </abbr>
                <abbr class="font-orange">■ 进口</abbr>
              </span>
            </iw-favorite>
          </span>
        </li>
      </ul>
      <a-icon v-if="true" :class="'banner-pushpin--'+status" class="banner-pushpin" type="pushpin" @click="changeStatus()" />
    </a-spin>
  </a-card>
</template>

<script>
import { Card, Icon, Spin } from 'ant-design-vue'
import moment from 'moment'
import { getDimension, getDataSourceAndTime, getManfbrand, getSubModel } from '@/api/option'
import {
  getDefaultSubModel,
  setDefaultSubModel,
  getCompCircle as getSubModelCompCircle,
  saveCompCircle as saveSubModelCompCircle,
  setDefaultCompCircle as setDefaultSubModelCompCircle
} from '@/api/submodel'
import {
  getDefaultManfBrand,
  setDefaultManfBrand,
  getCompCircle as getManfBrandCompCircle,
  saveCompCircle as saveManfBrandCompCircle,
  setDefaultCompCircle as setDefaultManfBrandCompCircle
} from '@/api/manfbrand'

export default {
  name: 'BannerFilter',
  components: {
    ACard: Card,
    AIcon: Icon,
    ASpin: Spin
  },
  data() {
    return {
      status: this.$store.state.app.filter, // false：默认，true：固定
      type: 'subModel',
      regionType: '',
      dataForm: {
        region: [-1],
        dimension: 0,
        dimensionName: '全国', // 维度名称
        dataSource: undefined,
        dataTime: undefined,
        manfBrand: [],
        manfBrandText: [],
        manfBrandName: undefined,
        subModel: [],
        subModelText: [],
        subModelName: undefined,
        compCircle: undefined,
        compCircleName: '',
        jp: []
      },
      defaultDataForm: {
        region: [-1]
      },
      searchFormData: {
        region: [],
        dataSource: [],
        dataTime: [],
        manfBrand: [],
        subModel: [],
        competitiveCircle: []
      },
      showType: 1,
      loading: false,
      showLetter: false,
      columnName: ['细分市场', '二级细分市场', '车型'],
      selectedFilter: 1,
      // 竞争圈
      showModal: false,
      spinning: {
        params: false,
        save: false
      },
      typeData: [] // 编辑状态下的[manfBrand, subModel]数据源
    }
  },
  computed: {
    disabled() {
      return {
        region: ['market-overview'].includes(this.$route.path.split('/')[this.$route.path.split('/').length - 1])
      }
    }
  },
  watch: {
    // $route() {
    //   if (this.$route.params.page !== this.type || this.$route.params.type !== this.regionType) {
    //     this.init()
    //     this.getData()
    //   }
    // },
    'spinning.params'(cur) {
      this.$store.dispatch('changeCommonParamsLoading', cur || this.spinning.save)
    },
    'spinning.save'(cur) {
      this.$store.dispatch('changeCommonParamsLoading', cur || this.spinning.params)
    }
  },
  mounted() {
    // this.init()
    this.getData()
  },
  methods: {
    init() {
      this.type = ''
      if (this.$route.params.page) {
        if (this.$route.params.page.indexOf('manfbrand') > -1) this.type = 'manfBrand'
        if (this.$route.params.page.indexOf('submodel') > -1) this.type = 'subModel'
      }
      this.regionType = this.$route.params.type
    },
    changeStatus() {
      this.status = this.status === 'fixed' ? 'default' : 'fixed'
      this.$store.dispatch('toggleFilter', this.status)
    },
    async handleRegionChange(value, text, emitChange = true) {
      this.dataForm.region = value
      this.dataForm.dimension = value.length - 1
      this.dataForm.dimensionName = text instanceof Array ? text[text.length - 1].value : text
      this.$store.dispatch('changeDimensionStatus', {
        region: this.dataForm.region,
        dimension: this.dataForm.dimension,
        dimensionName: this.dataForm.dimensionName
      })
      this.spinning.params = true
      const dataTime = this.getDataSourceAndTime()
      await dataTime
      if (this.type === 'manfBrand') {
        await this.getManfbrand()
      } else if (this.type === 'subModel') {
        await this.getSubModel()
      }
      if (['manfBrand', 'subModel'].includes(this.type)) {
        await this.getCompCircle()
      }
      this.spinning.params = false
      if (emitChange) {
        this.$emit('change', this.dataFormFilter())
      }
    },
    async handleDataSourceChange(value) {
      this.dataForm.dataSource = value
      this.$store.dispatch('setDataSource', value)
      this.setDateTime(value)
      this.spinning.params = true
      if (this.type === 'manfBrand') {
        await this.getManfbrand()
      } else if (this.type === 'subModel') {
        await this.getSubModel()
      }
      if (['manfBrand', 'subModel'].includes(this.type)) {
        await this.getCompCircle()
      }
      this.spinning.params = false
      this.$emit('change', this.dataFormFilter())
    },
    setDateTime(value) {
      const dataSource = this.searchFormData.dataSource.find(item => {
        return item.key === value
      })
      if (dataSource && dataSource.startYm && dataSource.endYm) {
        this.searchFormData.dataTime = [
          moment(dataSource.startYm + '01').format('YYYY/MM'),
          moment(dataSource.endYm + '01').format('YYYY/MM')
        ]
        const storeDataTime = this.$store.state.app.dataTime
        let dataTime = Math.min(dataSource.endYm, Math.max(moment().format('YYYYMM'), dataSource.startYm))
        dataTime = storeDataTime >= dataSource.startYm && storeDataTime <= dataSource.endYm
          ? storeDataTime : dataTime

        this.$store.dispatch('setDataTime', dataTime)
        this.dataForm.dataTime = moment(dataTime + '01').format('YYYY/MM')
      } else {
        this.searchFormData.dataTime = []
      }
    },
    async handleDateTimeChange(value) {
      this.dataForm.dataTime = value
      this.$store.dispatch('setDataTime', Number(value.replace('/', '')))
      this.spinning.params = true
      if (this.type === 'manfBrand') {
        await this.getManfbrand()
      } else if (this.type === 'subModel') {
        await this.getSubModel()
      }
      if (['manfBrand', 'subModel'].includes(this.type)) {
        await this.getCompCircle()
      }
      this.spinning.params = false
      this.$emit('change', this.dataFormFilter())
    },
    async handleManfChange(value, text) {
      this.dataForm.manfBrand = value
      this.dataForm.manfBrandText = text
      this.dataForm.manfBrandName = text[0].value
      this.$store.dispatch('setManfBrand', text)
      this.spinning.params = true
      this.setDefaultManfBrand()
      await this.getCompCircle()
      this.spinning.params = false
      this.$emit('change', this.dataFormFilter())
    },
    async handleSubModelChange(value, text) {
      this.dataForm.subModel = value
      this.dataForm.subModelText = text
      this.dataForm.subModelName = text[0].value
      this.$store.dispatch('setSubModel', text)
      this.spinning.params = true
      this.setDefaultSubModel()
      await this.getCompCircle()
      this.spinning.params = false
      this.$emit('change', this.dataFormFilter())
    },
    handleJpChange(value, text) {
      this.dataForm.compCircle = value
      this.dataForm.compCircleName = text.value
      this.dataForm.jp = text.children.map(item => item.key)
      this.setDefaultCompCircle()
      this.$emit('change', this.dataFormFilter())
    },
    handleFilterChange(value) {
      this.loading = true
      this.selectedFilter = value
      if (value === 1) {
        this.searchFormData.subModel = this.segmentSubModel
        // this.columnName = ['细分市场', '二级细分市场', '车型']
        // this.dataForm.subModel = ['', '', this.dataForm.subModel[this.dataForm.subModel.length - 1]]
        this.showLetter = false
      } else if (value === 2) {
        this.searchFormData.subModel = this.brandSubModel
        // this.columnName = ['品牌', '车型']
        // this.dataForm.subModel = ['', '', this.dataForm.subModel[this.dataForm.subModel.length - 1]]
        this.showLetter = true
      }
      this.loading = false
    },
    dataFormFilter() {
      const dataForm = {
        region: this.dataForm.region,
        areaId: this.dataForm.region ? this.dataForm.region[this.dataForm.region.length - 1] : 0, // 地方Id,当选择的维度不同时,这个地方Id的含义也会不同,如：维度选了省份，地方Id就是省份Id
        dimensionId: this.dataForm.dimension, // 维度Id,全国:0,区域:1,省份:2,城市:3
        dimensionName: this.dataForm.dimensionName, // 维度名称
        dataSourceId: this.dataForm.dataSource, // 数据源Id,开票数:5,上险数:6
        ym: this.dataForm.dataTime ? Number(this.dataForm.dataTime.replace('/', '')) : null, // 年月
        manfId: this.dataForm.manfBrand ? this.dataForm.manfBrand[this.dataForm.manfBrand.length - 1] : 0, // 本品厂商Id
        manfName: this.dataForm.manfBrandName,
        subModelId: this.dataForm.subModel ? this.dataForm.subModel[this.dataForm.subModel.length - 1] : 0, // 本品子车型Id
        subModelName: this.dataForm.subModelName,
        jpId: this.dataForm.jp
      }
      return dataForm
    },
    async getData() {
      this.spinning.params = true
      const dimension = this.getDimension()
      const dataSource = this.getDataSourceAndTime()
      await dimension
      await dataSource
      if (this.type === 'manfBrand') {
        await this.getDefaultManfBrand()
        await this.getManfbrand()
      }
      if (this.type === 'subModel') {
        await this.getDefaultSubModel()
        await this.getSubModel()
      }
      if (['manfBrand', 'subModel'].includes(this.type)) {
        await this.getCompCircle()
      }
      this.spinning.params = false
      this.$emit('change', this.dataFormFilter())
    },

    // API
    getDimension() {
      return new Promise((resolve, reject) => {
        getDimension().then(response => {
          const data = response.data || []
          this.$set(this.searchFormData, 'region', data)
          this.$store.dispatch('setDimensionDatasource', this.searchFormData.region)
          this.setDefaultDimension()
          resolve(response)
        }).catch(response => {
          reject(response)
        })
      })
    },
    setDefaultDimension() {
      // 设置维度默认值的前提条件和顺序：
      // 1.路由参数中存在区分维度参数
      // 2.先设置为上次选择的维度值
      // 3.再设置为指定的维度值
      if (this.$route.params.type === 'contry') {
        // 对应维度默认选择结果
        this.dataForm.region = [-1]
        this.dataForm.dimension = 0
        this.dataForm.dimensionName = '全国'
        if (this.$store.state.app.dimension === 0) { // 上次选择结果
          this.dataForm.region = this.$store.state.app.region
          this.dataForm.dimension = this.$store.state.app.dimension
          this.dataForm.dimensionName = this.$store.state.app.dimensionName
        }
      }
      if (this.$route.params.type === 'area') {
        // 对应维度默认选择结果
        this.dataForm.region = [-1, 1]
        this.dataForm.dimension = 1
        this.dataForm.dimensionName = '华北区域'
        if (this.$store.state.app.dimension === 1) { // 上次选择结果
          this.dataForm.region = this.$store.state.app.region
          this.dataForm.dimension = this.$store.state.app.dimension
          this.dataForm.dimensionName = this.$store.state.app.dimensionName
        }
      }
      if (this.$route.params.type === 'province') {
        // 对应维度默认选择结果
        this.dataForm.region = [-1, 1, 1]
        this.dataForm.dimension = 2
        this.dataForm.dimensionName = '北京市'
        if (this.$store.state.app.dimension === 2) { // 上次选择结果
          this.dataForm.region = this.$store.state.app.region
          this.dataForm.dimension = this.$store.state.app.dimension
          this.dataForm.dimensionName = this.$store.state.app.dimensionName
        }
      }
      if (this.$route.params.type === 'city') {
        // 对应维度默认选择结果
        this.dataForm.region = [-1, 1, 1, 194]
        this.dataForm.dimension = 3
        this.dataForm.dimensionName = '北京市'
        if (this.$store.state.app.dimension === 3) { // 上次选择结果
          this.dataForm.region = this.$store.state.app.region
          this.dataForm.dimension = this.$store.state.app.dimension
          this.dataForm.dimensionName = this.$store.state.app.dimensionName
        }
      }
    },
    getDataSourceAndTime() {
      return new Promise((resolve, reject) => {
        getDataSourceAndTime({
          areaId: this.dataFormFilter().areaId,
          dataSourceId: this.dataFormFilter().dataSourceId,
          dimensionId: this.dataFormFilter().dimensionId
        }).then(response => {
          const data = response.data || []

          this.$set(this.searchFormData, 'dataSource', data.map(item => {
            return {
              key: item.dataSourceId,
              value: item.dataSourceName,
              startYm: item.startYm,
              endYm: item.endYm
            }
          }))
          const dataSource = data.find(item => {
            return item.selected === true
          }) || data[0]
          const dataSourceId = this.$store.state.app.dataSource || dataSource.dataSourceId
          this.$set(this.dataForm, 'dataSource', dataSourceId)
          this.$store.dispatch('setDataSource', dataSourceId)
          this.setDateTime(dataSource.dataSourceId)
          resolve(response)
        }).catch(response => {
          reject(response)
        })
      })
    },
    setDefaultManfBrand() {
      return new Promise((resolve, reject) => {
        if (!this.dataFormFilter().ym) reject()
        setDefaultManfBrand({
          key: this.dataForm.manfBrand[this.dataForm.manfBrand.length - 1]
        }).then(response => {
          resolve(response)
        }).catch(response => {
          reject(response)
        })
      })
    },
    getDefaultManfBrand() {
      return new Promise((resolve, reject) => {
        if (!this.dataFormFilter().ym) reject()
        getDefaultManfBrand().then(response => {
          const data = response.data
          const manfBrand = this.$store.state.app.manfBrand || [data]
          this.$store.dispatch('setManfBrand', manfBrand)
          this.$set(this.dataForm, 'manfBrand', [manfBrand.map(item => item.key)])
          this.$set(this.dataForm, 'manfBrandText', manfBrand)
          resolve(response)
        }).catch(response => {
          reject(response)
        })
      })
    },
    setDefaultSubModel() {
      return new Promise((resolve, reject) => {
        if (!this.dataFormFilter().ym) reject()
        setDefaultSubModel({
          key: this.dataForm.subModel[this.dataForm.subModel.length - 1]
        }).then(response => {
          resolve(response)
        }).catch(response => {
          reject(response)
        })
      })
    },
    getDefaultSubModel() { // 获取上次选择的车型
      return new Promise((resolve, reject) => {
        if (!this.dataFormFilter().ym) reject()
        getDefaultSubModel().then(response => {
          const data = response.data
          const subModel = this.$store.state.app.subModel || ['', '', data]
          this.$store.dispatch('setSubModel', subModel)
          this.$set(this.dataForm, 'subModel', subModel.map(item => { return item ? item.key : '' }))
          this.$set(this.dataForm, 'subModelText', subModel)
          // 通过传参指定默认选择车型
          const targetSubmodelId = this.$route.query.submodelId
          const targetSubmodelText = this.$route.query.submodelName
          if (targetSubmodelId !== undefined && targetSubmodelText !== undefined) {
            this.$set(this.dataForm, 'subModel', ['', '', targetSubmodelId])
            this.$set(this.dataForm, 'subModelText', ['', '', { key: targetSubmodelId, value: targetSubmodelText }])
          }
          resolve(response)
        }).catch(response => {
          reject(response)
        })
      })
    },
    getManfbrand() {
      return new Promise((resolve, reject) => {
        if (!this.dataFormFilter().ym) reject()
        getManfbrand({
          areaId: this.dataFormFilter().areaId,
          dataSourceId: this.dataFormFilter().dataSourceId,
          dimensionId: this.dataFormFilter().dimensionId,
          ym: this.dataFormFilter().ym
        }).then(response => {
          const data = response.data || []
          this.typeData = data
          this.$set(this.searchFormData, 'manfBrand', data)
          resolve(response)
        }).catch(response => {
          reject(response)
        })
      })
    },
    getSubModel() { // 获取竞争圈的车型选项数据源
      return new Promise((resolve, reject) => {
        if (!this.dataFormFilter().ym) reject()
        getSubModel({
          areaId: this.dataFormFilter().areaId,
          dataSourceId: this.dataFormFilter().dataSourceId,
          dimensionId: this.dataFormFilter().dimensionId,
          ym: this.dataFormFilter().ym
        }).then(response => {
          const data = response.data || []
          this.typeData = data
          this.segmentSubModel = data[0]
          this.brandSubModel = data[1]
          this.competitorSubModel = data.competitorSubModel
          this.$set(this.searchFormData, 'subModel', this.segmentSubModel)
          this.showLetter = false
          this.columnName = ['细分市场', '二级细分市场', '车型']
          this.selectedFilter = 1
          resolve(response)
        }).catch(response => {
          reject(response)
        })
      })
    },
    getCompCircle() {
      return new Promise((resolve, reject) => {
        if (!['manfBrand', 'subModel'].includes(this.type)) return
        if (!this.dataForm[this.type].length) reject()
        let compCircle = null
        if (this.type === 'subModel') {
          const subModel = this.dataForm.subModel[this.dataForm.subModel.length - 1]
          compCircle = getSubModelCompCircle({ key: subModel })
        }
        if (this.type === 'manfBrand') {
          const manfBrand = this.dataForm.manfBrand[0][this.dataForm.manfBrand.length - 1]
          compCircle = getManfBrandCompCircle({ key: manfBrand })
        }
        compCircle.then(response => {
          const data = response.data || []
          if (data && data.length) {
            this.$set(this.searchFormData, 'competitiveCircle', data)
            const compCircle = data.find(item => {
              return item.selected
            }) || data[0]
            this.$set(this.dataForm, 'compCircle', compCircle.key)
            this.$set(this.dataForm, 'compCircleName', compCircle.value)
            this.$set(this.dataForm, 'jp', compCircle.children.map(item => item.key))
          }
          resolve(response)
        }).catch(response => {
          reject(response)
        })
      })
    },
    handleJpSave(tableList) {
      const params = []
      tableList.forEach(row => {
        const item = {}
        for (const x in row) {
          if (x === 'key') {
            continue
          } else {
            item[x] = row[x]
          }
        }
        if (tableList.length === 1) {
          item['selected'] = 1
        }
        params.push(item)
      })
      if (!['manfBrand', 'subModel'].includes(this.type)) return
      return new Promise((resolve, reject) => {
        this.spinning.save = true
        let compCircle = null
        if (this.type === 'subModel') {
          compCircle = saveSubModelCompCircle(params)
        }
        if (this.type === 'manfBrand') {
          compCircle = saveManfBrandCompCircle(params)
        }
        compCircle.then(response => {
          const data = response.data
          if (data) {
            this.getCompCircle()
          }
          this.spinning.save = false
          resolve(response)
        }).catch(response => {
          this.spinning.save = false
          reject(response)
        })
      })
    },
    setDefaultCompCircle() {
      return new Promise((resolve, reject) => {
        let compCircle = null
        if (this.type === 'manfBrand') {
          compCircle = setDefaultManfBrandCompCircle({
            compCircleId: this.dataForm.compCircle,
            bp: { key: this.dataForm.manfBrand[0][this.dataForm.manfBrand.length - 1] }
          })
        }
        if (this.type === 'subModel') {
          compCircle = setDefaultSubModelCompCircle({
            compCircleId: this.dataForm.compCircle,
            bp: { key: this.dataForm.subModel[this.dataForm.subModel.length - 1] }
          })
        }
        compCircle.then(response => {
          const data = response.data
          if (data && data === true) {
            this.getCompCircle()
          }
          resolve(response)
        }).catch(response => {
          reject(response)
        })
      })
    }
  }
}
</script>

<style lang="less" scope>
@import '~@/assets/style/mixins';
.banner-card {
  &.banner-card--fixed {
    position: fixed;
    top: 111px;
    right: 26px;
    bottom: 0;
    left: 20px;
    z-index: 990;
    height: 54px;
    background: #fff;
  }
  .banner-filter {
    height: 54px;
    background: #fff;
    overflow: hidden;
    .banner-filter-item {
      display: block;
      float: left;
      border-right: 1px solid #eee;
      > span {
        display: block;
        &.filter-item_label {
          color: #b2b2b2;
          font-size: 12px;
          padding: 8px 15px 0;
          .filter-item_label--title {
            float: left;
          }
          .filter-item_label--circle {
            .text-hide();
            float: left;
            display: block;
            color: #000;
            font-weight: bold;
            margin-left: 10px;
            padding: 0 10px;
            height: 18px;
            line-height: 16px;
            color: #5D90EA;
            border: 1px solid #5D90EA;
            border-radius: 2px;
          }
        }
        &.filter-item_text {
          .iw-input .iw-input__inner {
            border: 0;
            box-shadow: none;
            padding: 0 15px;
            height: 28px;
            line-height: 28px;
          }
          .iw-text-bold {
            input {
              color: #333;
              font-weight: bold;
              font-size: 13px;
            }
          }
        }
      }
      .iw-footer-desc {
        font-size: 12px;
        float: left;
      }
      .iw-footer-desc--right {
        font-size: 12px;
        float: right;
      }
    }
  }
  .banner-pushpin {
    position: absolute;
    right: 6px;
    top: 6px;
    width: 20px;
    height: 20px;
    line-height: 24px;
    cursor: pointer;
    &.banner-pushpin--fixed {
      transform: rotate(-45deg);
    }
  }
}
.in-frame .banner-card {
  &.banner-card--fixed {
    top: 47px;
    left: 20px;
  }
}
.leftmenu-expand .banner-card {
  &.banner-card--fixed {
    left: 220px;
  }
}
</style>

