<template>
  <div v-if="data.series" class="iw-complex-table-box">
    <div class="iw-table-box">
      <div class="iw-table-left"/>
      <div class="iw-table-center"/>
      <div class="iw-table-right">
        <div class="iw-table-container">
          <div class="iw-table-column">接触顺序</div>
          <div class="iw-table-column-sub">
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
          </div>
        </div>
        <div class="iw-table-container iw-table-col3">
          <div class="iw-table-column">购买影响</div>
          <div class="iw-table-column-sub">
            <span>TOP2</span>
            <span>Mean</span>
          </div>
        </div>
      </div>
    </div>
    <div class="iw-table-box">
      <div class="iw-table-left">
        <div v-for="item in data.answerOrders" :key="item" class="iw-table-name">{{ item.name }}</div>
      </div>
      <div class="iw-table-center">
        <div v-for="(item, key) in data.answerOrders" :key="key" class="iw-table-bar-wrap">
          <span :style="{width: item.sortOneRate + '%'}" class="iw-table-bar" />
        </div>
      </div>
      <div class="iw-table-right">
        <div class="iw-table-container">
          <div v-for="(item, key) in data.answerOrders" :key="key" class="iw-table-row">
            <div class="iw-table-number">{{ item.sortOneRate + '%' }}</div>
            <div class="iw-table-number">{{ item.sortTwoRate + '%' }}</div>
            <div class="iw-table-number">{{ item.sortThreeRate + '%' }}</div>
            <div class="iw-table-number">{{ item.sortFourRate + '%' }}</div>
          </div>
        </div>
        <div v-if="false" class="iw-table-container iw-table-col3">
          <div v-for="(item, key) in answerOrders" :key="key" class="iw-table-row">
            <div class="iw-table-number">{{ item.data5 + '%' }}</div>
            <div class="iw-table-number">{{ item.data6 }}</div>
          </div>
        </div>
      </div>
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
.iw-complex-table-box {
  .iw-table-box {
    display: flex;
    padding: 4px 0;
    &:first-child {
      border-bottom: 1px solid #D4EEFC;
    }
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
      flex: 0 0 60%;
      text-align: right;
      display: flex;
      .iw-table-number {
        font-family: PingFangSC-Regular;
        height: 20px;
        line-height: 20px;
        font-size: 12px;
        color: #181C28;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .iw-table-center {
      flex: 0 0 26%;
      .iw-table-bar-wrap {
        height: 20px;
        padding: 6px 0;
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
    .iw-table-container {
      flex: 1;
      text-align: center;
      .iw-table-column {
        background: #DDF3FF;
        border-radius: 2px;
        font-size: 12px;
        color: #467BF9;
        line-height: 12px;
        padding: 6px;
        margin: 2px 4px;
      }
      .iw-table-column-sub {
        display: flex;
        span {
          flex: 1;
          margin: 2px 4px;
          border-radius: 2px;
          background: #eee;
          font-size: 12px;
          color: #181C28;
          text-align: center;
          line-height: 20px;
          cursor: pointer;
        }
      }
      .iw-table-row {
        display: flex;
        .iw-table-number {
          flex: 0 0 25%;
        }
      }
      &.iw-table-col3 {
        flex: 0 0 33.3333%;
        .iw-table-row {
          .iw-table-number {
            flex: 0 0 50%;
          }
        }
      }
    }
  }
}
</style>
