<template>
  <a-spin :spinning="loading" :class="['iw-card', {'iw-card-short': short}]">
    <div class="iw-card-title">
      <span class="iw-card-title--left">{{ title }}</span>
      <span class="iw-card-title--right">{{ extra }}</span>
    </div>
    <div :class="['iw-card-content', {'iw-card-content-short': short}]" :style="bodyStyle">
      <slot />
    </div>
  </a-spin>
</template>

<script>
import { Spin } from 'ant-design-vue'
export default {
  name: 'Card',
  components: {
    ASpin: Spin
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    },
    extra: {
      type: String,
      default: ''
    },
    short: {
      type: Boolean,
      default: false
    },
    bodyStyle: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="less" scoped>
.iw-card {
    width: 254px;
    &.iw-card-short {
      height: 100px;
    }
    .iw-card-title {
      height: 28px;
      line-height: 28px;
      padding-left: 10px;
      color: #fff;
      background: #6FC2EF;
      border-radius: 4px 4px 0 0;
      .iw-card-title--right {
        font-size: 12px;
        color: #FFFFFF;
        float: right;
        padding-right: 8px;
        line-height: 28px;
      }
    }
    .iw-card-content {
      height: 226px;
      padding: 10px 15px;
      background: #EEF9FF;
      border-radius: 0 0 4px 4px;
      overflow: hidden;
      &.iw-card-content-short {
        height: 100px;
      }
    }
  }
</style>
