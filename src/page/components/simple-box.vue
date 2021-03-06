<template>
  <div v-if="data.series" class="iw-charts-box">
    <div :style="'width: ' + (!isNaN(labelWidth) ? (labelWidth + 'px') : 'auto')" class="iw-charts-left">
      <div v-for="(item, key) in yAxisData" :key="key" :title="item" :class="['iw-charts-name', {'high-bar': highBar}]">{{ item }}</div>
    </div>
    <div class="iw-charts-center">
      <div v-for="(item, key) in seriesData" :key="key" :title="item.value" :class="['iw-charts-bar-wrap', {'high-bar': highBar}]" >
        <span :style="{width: item.width}" class="iw-charts-bar" />
      </div>
    </div>
    <div v-if="showNumber" class="iw-charts-right">
      <div v-for="(item, key) in seriesData" :key="key" :class="['iw-charts-bar-number', {'high-bar': highBar}]">{{ item.value }}</div>
    </div>
  </div>
</template>

<script>
import { toPercent, toThousand } from '@/utils/filters'
export default {
  name: 'SimpleBox',
  props: {
    data: {
      type: Object,
      default() {
        return []
      }
    },
    labelWidth: {
      type: [Number, String],
      default: ''
    },
    isPercent: {
      type: Boolean,
      default: false
    },
    highBar: {
      type: Boolean,
      default: false
    },
    showNumber: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    yAxisData() {
      if (!this.data.yAxis) return []
      const data = this.data.yAxis instanceof Array ? this.data.yAxis[0].data : this.data.yAxis.data
      return data
    },
    seriesData() {
      if (!this.data.series) return []
      const data = this.data.series instanceof Array ? this.data.series[0].data : this.data.series.data
      const maxValue = this.maxValue
      return data.map(item => {
        const value = item && item.hasOwnProperty('value') ? item.value : item
        const i = {
          ...item,
          value: this.isPercent ? toPercent(value, 1) : toThousand(value),
          width: this.isPercent ? (value ? toPercent(value, 1) : '0%') : toPercent(maxValue && value ? value / maxValue : 0, 1)
        }
        return i
      })
    },
    maxValue() {
      const data = this.data.series instanceof Array ? this.data.series[0].data : this.data.series.data
      return Math.max(...data.map(item => {
        const value = item && item.hasOwnProperty('value') ? item.value : item
        return value
      })) || 0
    }
  },
  created() {
  },
  methods: {
    toPercent() {
      return toPercent(...arguments)
    },
    toThousand() {
      return toThousand(...arguments)
    }
  }
}
</script>

<style lang="less" scope>
.iw-charts-box {
  display: flex;
  width: 100%;
  .iw-charts-left {
    flex: 0 0 auto;
    width: 70px;
    .iw-charts-name {
      font-family: PingFangSC-Regular;
      text-align: right;
      height: 20px;
      line-height: 20px;
      margin-right: 8px;
      font-size: 12px;
      color: #181C28;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      &.high-bar {
        height: 40px;
        padding: 12px 0;
      }
    }
  }
  .iw-charts-right {
    flex: 0 0 auto;
    width: 46px;
    .iw-charts-bar-number {
      font-family: PingFangSC-Regular;
      text-align: center;
      height: 20px;
      line-height: 20px;
      margin-left: 4px;
      font-size: 12px;
      color: #181C28;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      &.high-bar {
        height: 40px;
        padding: 12px 0;
      }
    }
  }
  .iw-charts-center {
    flex: 1 1 auto;
    .iw-charts-bar-wrap {
      height: 20px;
      padding: 6px 0;
      &:hover {
        background: #d7d7d7;
        cursor: pointer;
      }
      .iw-charts-bar {
        display: block;
        background: #467BF9;
        border-radius: 2px;
        border-radius: 2px;
        height: 8px;
        max-width: 100%;
        width: 0%;
      }
      &.high-bar {
        height: 40px;
        padding: 12px 0;
        .iw-charts-bar {
          height: 16px;
        }
      }
    }
  }
}
</style>
