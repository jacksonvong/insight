<template>
  <div v-if="data.series" class="iw-charts-box">
    <div :style="'width: ' + (!isNaN(labelWidth) ? (labelWidth + 'px') : 'auto')" class="iw-charts-left">
      <div v-for="(item, key) in yAxisData" :key="key" class="iw-charts-name">{{ item }}</div>
    </div>
    <div class="iw-charts-center">
      <div v-for="(item, key) in data.series[0].data" :key="key" class="iw-charts-bar-wrap">
        <span :style="{width: item + '%'}" class="iw-charts-bar" />
      </div>
    </div>
    <div v-if="showNumber" class="iw-charts-right">
      <div v-for="(item, key) in data.series[0].data" :key="key" class="iw-charts-bar-number">{{ (item&&item.value?item.value:item)+ '%' }}</div>
    </div>
  </div>
</template>

<script>
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
    }
  },
  created() {
    console.log(this.data)
  },
  methods: {
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
      height: 20px;
      line-height: 20px;
      margin-right: 8px;
      font-size: 12px;
      color: #181C28;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .iw-charts-right {
    flex: 0 0 auto;
    text-align: right;
    .iw-charts-bar-number {
      font-family: PingFangSC-Regular;
      height: 20px;
      line-height: 20px;
      margin-left: 4px;
      font-size: 12px;
      color: #181C28;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
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
      }
    }
  }
}
</style>
