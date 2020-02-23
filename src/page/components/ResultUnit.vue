<template>
  <div class="result-unit">
    <div class="header">
      <div class="left">{{ title }}</div>
      <div class="right">{{ desc }}</div>
    </div>
    <div
      :style="{
        'overflow': canShowUp ? 'hidden' : 'visible',
        'height': getHeight
      }"
      class="body"
    >
      <slot></slot>
    </div>
    <div v-if="canShowUp" class="expand-bar" @click="isExpand = !isExpand">
      <span v-if="!isExpand">展开 + </span>
      <span v-else>收起 - </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ResultUnit',
  props: {
    title: {
      type: String,
      default() {
        return ''
      }
    },
    desc: {
      type: String,
      default() {
        return ''
      }
    },
    canShowUp: {
      type: Boolean,
      default() {
        return false
      }
    },
    limitHeight: {
      type: String,
      default() {
        return 'auto'
      }
    }
  },
  data() {
    return {
      isExpand: false
    }
  },
  computed: {
    getHeight() {
      if (this.canShowUp === false) return 'auto'
      return this.isExpand ? 'auto' : this.limitHeight
    }
  }
}
</script>

<style lang="scss" scoped>
  .result-unit {
    border-radius: 4px;
    background: #eef9ff;
    margin: 0 20px 20px 0;

    .header {
      border-radius: 4px 4px 0 0;
      height: 28px;
      line-height: 28px;
      background: #6fc2ef;

      .left {
        float: left;
        height: 28px;
        font-weight: bold;
        font-size: 14px;
        color: white;
        padding-left: 8px;
      }

      .right {
        float: right;
        height: 28px;
        font-size: 12px;
        color: white;
        padding-right: 8px;
      }

    }

    .body {
      padding: 14px;
    }

    .expand-bar {
      cursor: pointer;
      background: #e5f6ff;
      height: 28px;
      line-height: 28px;
      text-align: center;
      color: #6fc2ef;
      font-size: 12px;
      font-weight: bold;
      border-radius: 0 0 4px 4px;

      &:hover {
        background: #d5f5ff;
      }

    }

  }
</style>
