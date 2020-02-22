<template>
  <div class="info">
    <!-- 0--顶部筛选条件 -->
    <iw-banner :title="`竞争对手`"/>
    <div class="main-content">
      <iw-search
        @change="changeDataForm"
      />
      <a-card title="查询结果">
        <div class="iw-card-container">
          <div class="iw-card-container iw-card-col2">
            <iw-card title="信息接触媒体" style="width: 100%;" body-style="height: 500px;">
              <iw-table-box slot="content" :data="infoMediaData" />
            </iw-card>
          </div>
          <div class="iw-card-container iw-card-col2">
            <iw-card title="门户网站">
              <iw-chart slot="content" :options="sexData" />
            </iw-card>
            <iw-card title="汽车垂直网站">
              <iw-simple-box slot="content" :data="ageData" />
            </iw-card>
            <iw-card title="视频媒体">
              <iw-simple-box slot="content" :data="educationData" />
            </iw-card>
          </div>
        </div>
      </a-card>
    </div>
  </div>
</template>

<script>
import { Card } from 'ant-design-vue'
import IwBanner from '@/components/banner/index'
import IwSearch from '@/page/components/search'
import IwCard from '@/page/components/card'
import IwSimpleBox from '@/page/components/simple-box'
import IwTableBox from '@/page/components/complex-table-box'
import { getInfoMedia } from '@/api/compete'
import { getSex, getAge, getEducation } from '@/api/board'
import IwChart from '@/components/charts'
import { Chart } from '@/utils/echarts'

export default {
  name: 'Info',
  components: {
    ACard: Card,
    IwBanner: IwBanner,
    IwSearch: IwSearch,
    IwCard,
    IwChart,
    IwSimpleBox,
    IwTableBox
  },
  data() {
    return {
      infoMediaData: {},
      sexData: {},
      ageData: {},
      educationData: {}
    }
  },
  created() {
    this.getData()
  },
  methods: {
    changeDataForm(form) {
      console.log(form)
    },
    // API
    getData() {
      this.getInfoMedia()
      this.getSex()
      this.getAge()
      this.getEducation()
    },
    getInfoMedia(params) {
      return getInfoMedia(params).then(res => {
        const data = res.data || {}
        this.infoMediaData = data
      })
    },
    getSex(params) {
      return getSex(params).then(res => {
        const data = res.data || {}
        console.log(data)
        this.sexData = new Chart('pie', data, {
          customColor: ['#467BF9', '#21D1D9'],
          backgroundColor: 'transparent'
        }).getChart()
      })
    },
    getAge(params) {
      return getAge(params).then(res => {
        const data = res.data || {}
        this.ageData = data
      })
    },
    getEducation(params) {
      return getEducation(params).then(res => {
        const data = res.data || {}
        this.educationData = data
      })
    }
  }
}
</script>

<style lang="less" scoped>
.info {
  .iw-card-container {
    display: flex;
    flex-wrap: wrap;
    &.iw-card-col2 {
      flex: 0 0 50%;
    }
  }
}
</style>
