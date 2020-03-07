<template>
  <a-card title="查询结果">
    <a-row :gutter="20" class="iw-card-container">
      <a-col :span="6" class="iw-card-container">
        <iw-card :title="top10Data.title+'['+toThousand(top10Data.sampleNum)+']'" :loading="top10Data.loading" style="width: 100%; height: 100%;" body-style="height: auto;">
          <iw-top10-box v-if="top10Data.option&&top10Data.option.length" :data="top10Data.option" :active-key="top10Data.activeKey" :show-total="false" @change="changeReason" />
          <iw-empty v-else :status="top10Data.status" style="height: 380px" />
        </iw-card>
      </a-col>
      <a-col :span="9" class="iw-card-container">
        <iw-card :title="leftData.title+'['+toThousand(leftData.sampleNum)+']'" style="width: 100%; height: 100%;" body-style="height: 400px;">
          <iw-table-box :data="leftData.option" :active-key="leftData.activeKey" is-percent @click="item=>getReasonItem(item, 'left')" />
        </iw-card>
      </a-col>
      <a-col :span="9" class="iw-card-container">
        <iw-card :title="rightData.title+'['+toThousand(rightData.sampleNum)+']'" style="width: 100%; height: 100%;" body-style="height: 400px;">
          <iw-table-box :data="rightData.option" :active-key="rightData.activeKey" is-percent @click="item=>getReasonItem(item, 'right')" />
        </iw-card>
      </a-col>
    </a-row>
    <a-row class="iw-card-container">
      <iw-card :title="bottomData.title+'['+toThousand(bottomData.sampleNum)+']'" style="width: 100%; height: 100%;" body-style="height: 540px;">
        <div v-if="bottomData.option.series" style="height: 100%; position: relative;">
          <iw-chart :options="bottomData.option" chart-id="chart-b" style="height: 510px;" />
          <span class="chart-title-tips left-top">劣势点</span>
          <span class="chart-title-tips right-top"> 争议点</span>
          <span class="chart-title-tips left-bottom">低关注</span>
          <span class="chart-title-tips right-bottom">优势点</span>
        </div>
      </iw-card>
    </a-row>
  </a-card>
</template>

<script>
import { Card, Row, Col } from 'ant-design-vue'
import IwCard from '@/page/components/card'
import IwTableBox from '@/page/components/simple-table-box'
import Top10Box from '@/page/components/top10-box'
import IwChart from '@/components/charts'
import { Chart } from '@/utils/echarts'
import { toThousand } from '@/utils/filters'
import { getCompTop10, getReasonSports, getReasonItem, getChooseAbandonReason } from '@/api/compete'

export default {
  name: 'IwTab1',
  components: {
    ACard: Card,
    ARow: Row,
    ACol: Col,
    IwCard,
    IwTableBox,
    IwTop10Box: Top10Box,
    IwChart
  },
  props: {
    dataForm: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      answerNum: '', // 问题ID
      competitorName: '', // 竞争对手
      objectName: '', // 对象
      top10Data: { key: '10042-top10', title: this.$t('compete.title.majorCompetitors'), status: 0, loading: false, activeKey: '', option: [] },
      leftData: { key: '10024', title: this.$t('compete.title.reasonToChooseObject'), status: 0, loading: false, activeKey: '', option: {}},
      rightData: { key: '10043', title: this.$t('compete.title.reasonToQuitCompetitor'), status: 0, loading: false, activeKey: '', option: {}},
      bottomData: { key: 'competitors', title: this.$t('compete.title.objectsCompetitiveAdvantageOverComp'), status: 0, option: {}}
    }
  },
  watch: {
    dataForm(to, from) {
      if (this.dataForm.startYm && this.dataForm.endYm && this.dataForm.subModelIds) {
        this.getData()
      }
    },
    deep: true
  },
  mounted() {
    if (this.dataForm.startYm && this.dataForm.endYm && this.dataForm.subModelIds) {
      this.getData()
    }
  },
  methods: {
    toThousand() {
      return toThousand(...arguments)
    },
    // API
    getData() {
      this.getCompTop10(Object.assign({}, this.dataForm, { key: this.leftData.key })).then((res) => {
        const data = this.top10Data.option
        if (data && data.length) {
          this.top10Data.activeKey = 0
          this.answerNum = data[0].key
          this.competitorName = data[0].name
          this.objectName = this.dataForm.subModelTexts[0].value
          this.leftData.title = this.$t('compete.title.reasonToChooseObject', { competitor: this.competitorName, object: this.objectName })
          this.rightData.title = this.$t('compete.title.reasonToQuitCompetitor', { competitor: this.competitorName })
          this.bottomData.title = this.$t('compete.title.objectsCompetitiveAdvantageOverComp', { competitor: this.competitorName, object: this.objectName })
          this.changeReason(data[0])
        }
      })
      this.getChooseAbandonReason(Object.assign({}, this.dataForm, { key: this.bottomData.key }), 'bottom')
    },
    changeReason(item) {
      this.answerNum = item.key
      this.getReasonSports(Object.assign({}, this.dataForm, { key: this.leftData.key, answerNum: this.answerNum }), 'left').then(res => {
        const data = this.leftData.option.series
        if (data && data.length && data[0].data && data[0].data.length) {
          const item = data[0].data[0]
          this.getReasonItem(item, 'left')
        }
      })
      this.getReasonSports(Object.assign({}, this.dataForm, { key: this.rightData.key, answerNum: this.answerNum }), 'right').then(res => {
        const data = this.rightData.option.series
        if (data && data.length && data[0].data && data[0].data.length) {
          const item = data[0].data[0]
          this.getReasonItem(item, 'right')
        }
      })
    },
    getCompTop10(params) {
      this.top10Data.loading = true
      params.subModelId = params.subModelIds[0]
      return new Promise((resolve, reject) => {
        getCompTop10(params).then(res => {
          const data = res.data || {}
          this.top10Data.option = data.answerList
          this.top10Data.avgNum = data.avgNum
          this.top10Data.sampleNum = data.totalSampleSize
          this.top10Data.status = 200
          resolve(res)
        }).catch(res => {
          this.top10Data.status = 500
          reject(res)
        }).finally(res => {
          this.top10Data.loading = false
        })
      })
    },
    getReasonSports(params, group) {
      params.subModelId = params.subModelIds[0]
      return new Promise((resolve, reject) => {
        getReasonSports(params).then(res => {
          const data = res.data || {}
          this[group + 'Data'].option = data.option
          this[group + 'Data'].avgNum = data.avgNum
          this[group + 'Data'].sampleNum = data.sampleNum
          this[group + 'Data'].status = 200
          resolve(res)
        }).catch(res => {
          this[group + 'Data'].status = 500
          reject(res)
        })
      })
    },
    getReasonItem(item, group) {
      const params = Object.assign({}, this.dataForm, {
        subModelId: this.dataForm.subModelIds[0],
        answerNum: this.answerNum,
        key: item.key
      })
      return getReasonItem(params).then(res => {
        const data = res.data || {}
        this.$set(item, 'data', data.answerList)
        this[group + 'Data'].activeKey = item.key
      })
    },
    getChooseAbandonReason(params, group) {
      params.subModelId = params.subModelIds[0]
      return new Promise((resolve, reject) => {
        getChooseAbandonReason(params)
          .then(res => {
            const data = res.data || {}
            // const xAxisMax = 0.7
            // const yAxisMax = 0.5
            const option = new Chart('scatter', data.option, {
              customColor: ['#467BF9'],
              backgroundColor: 'transparent',
              tooltipFields: [
                { key: '0', seriesName: '购买卡罗拉的原因' },
                { key: '1', seriesName: '放弃对象的原因' },
                { key: '2', name: true }
              ]
              // markLine: {
              //   show: false,
              //   silent: true,
              //   symbol: 'none',
              //   animation: false,
              //   label: { show: false },
              //   data: [
              //     {
              //       xAxis: xAxisMax / 2,
              //       lineStyle: {
              //         color: '#6FC2EF',
              //         type: 'solid'
              //       }
              //     },
              //     {
              //       xAxis: xAxisMax,
              //       lineStyle: {
              //         color: '#6FC2EF',
              //         type: 'solid'
              //       }
              //     },
              //     {
              //       yAxis: yAxisMax / 2,
              //       lineStyle: {
              //         color: '#6FC2EF',
              //         type: 'solid'
              //       }
              //     },
              //     {
              //       yAxis: yAxisMax,
              //       lineStyle: {
              //         color: '#6FC2EF',
              //         type: 'solid'
              //       }
              //     }
              //   ]
              // }
            }).getScatterChart()
            this[group + 'Data'].option = option
            this[group + 'Data'].avgNum = data.avgNum
            this[group + 'Data'].sampleNum = data.sampleNum
            this[group + 'Data'].status = 200
            resolve(res)
          }).catch(res => {
            this[group + 'Data'].status = 500
            reject(res)
          })
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/assets/style/mixins';
.tab2 {
  .chart-title-tips {
    position: absolute;
    display: block;
    padding: 4px 10px;
    border-radius: 2px;
    background: #467BF9;
    .font-adjust(14px, inherit, #fff);
    &.left-top { top: 68px; left: 88px; }
    &.right-top { top: 68px; right: 38px; }
    &.left-bottom { bottom: 77px; left: 88px; }
    &.right-bottom { bottom: 77px;  right: 38px; }
  }
}
</style>
