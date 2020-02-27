<template>
  <div :class="['iw-card', {'iw-card-short': short}]" :style="{ width: width, height: height}">
    <div class="iw-card-title">
      <span class="iw-card-title--left">{{ title }}</span>
      <span class="iw-card-title--right">{{ extra }}</span>
    </div>
    <div :class="['iw-card-content', {'iw-card-content-short': short}]">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    title: {
      type: String,
      default: ''
    },
    extra: {
      type: String,
      default: ''
    },
    short: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: 'auto'
    },
    height: {
      type: String,
      default: 'auto'
    }
  }
}
</script>

<style lang="less" scoped>
.iw-card {
    min-width: 254px;
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
      padding: 10px 15px;
      background: #EEF9FF;
      border-radius: 0 0 4px 4px;
      &.iw-card-content-short {
        height: 100px;
      }
    }
  }
</style>
