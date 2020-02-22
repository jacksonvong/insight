<template>
  <div v-if="data.series" class="iw-simple-table-box">
    <div class="iw-table-box iw-table-col2">
      <div class="iw-table-left">
        <div v-for="item in data.yAxis.data" :key="item" class="iw-table-name">{{ item }}</div>
      </div>
      <div v-if="data.series" class="iw-table-center">
        <template v-for="(item, key) in data.series[0].data">
          <div :key="key" :class="['iw-table-bar-wrap', {active: key==activeKey}]" @click="getInnerData(item.data, key)">
            <span :style="{width: item.value + '%'}" class="iw-table-bar" />
          </div>
        </template>
      </div>
      <div v-if="data.series" class="iw-table-right">
        <div v-for="(item, key) in data.series[0].data" :key="key" class="iw-table-bar-number">{{ item.value + '%' }}</div>
      </div>
    </div>
    <div class="iw-table-box iw-table-col2">
      <div class="iw-table-inner">
        <div v-for="(item, key) in innerData" :key="key" class="iw-table-inner-item">
          <span class="iw-table-inner-name">{{ item.name }}</span>
          <span class="iw-table-inner-value">{{ item.value + '%' }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SimpleTableBox',
  props: {
    data: {
      type: Object,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      activeKey: 0,
      innerData: []
    }
  },
  watch: {
    data() {
      if (this.data.series && this.data.series[0].data[this.activeKey]) {
        this.innerData = this.data.series[0].data[this.activeKey].data
      }
    }
  },
  created() {
    console.log(this.data)
  },
  methods: {
    getInnerData(data, key) {
      this.activeKey = key
      this.innerData = data
    }
  }
}
</script>

<style lang="less" scope>
.iw-simple-table-box {
  display: flex;
  .iw-table-box {
    &.iw-table-col2 {
      flex: 0 0 50%;
    }
    &:first-child {
      padding-right: 10px;
    }
    display: flex;
    padding: 4px 0;
    flex-direction: row;
    .iw-table-left {
      flex: 0 0 14%;
      max-width: 70px;
      .iw-table-name {
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
    .iw-table-right {
      width: 40px;
      text-align: right;
      .iw-table-bar-number {
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
    .iw-table-center {
      width: calc(100% - 110px);
      .iw-table-bar-wrap {
        height: 20px;
        padding: 6px 0;
        &.active {
          background: #e7e7e7;
        }
        &:hover {
          background: #d7d7d7;
          cursor: pointer;
        }
        .iw-table-bar {
          display: block;
          background: #467BF9;
          border-radius: 2px;
          border-radius: 2px;
          height: 8px;
          max-width: 100%;
        }
      }
    }
    .iw-table-inner {
      width: 100%;
      padding-left: 25px;
      .iw-table-inner-item {
        display: flex;
        justify-content: space-between;
        padding: 6px 15px;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #181C28;
        &:nth-child(odd) {
          background: #DDF3FF;
          border-radius: 2px;
          border-radius: 2px;
        }
        .iw-table-inner-value {
          text-align: right;
        }
      }
    }
  }
}
</style>
