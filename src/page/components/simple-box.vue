<template>
  <div v-if="data.series" class="iw-charts-box">
    <div class="iw-charts-left">
      <div v-for="item in data.yAxis.data" :key="item" class="iw-charts-name">{{ item }}</div>
    </div>
    <div class="iw-charts-center">
      <div v-for="item in data.series[0].data" :key="item" class="iw-charts-bar-wrap">
        <span :style="{width: item + '%'}" class="iw-charts-bar" />
      </div>
    </div>
    <div class="iw-charts-right">
      <div v-for="item in data.series[0].data" :key="item" class="iw-charts-bar-number">{{ item + '%' }}</div>
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
    }
  },
  created() {
    console.log(this.data)
  }
}
</script>

<style lang="less" scope>
.iw-charts-box {
  display: flex;
  .iw-charts-left {
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
    width: 40px;
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
    width: calc(100% - 110px);
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
