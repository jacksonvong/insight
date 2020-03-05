<template>
  <div class="iw-card-inner">
    <div v-if="title" class="iw-card-inner-title">
      {{ title }}
      <span class="iw-card-inner-extra">{{ extra }}</span>
    </div>
    <div class="iw-card-inner-content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'IwCardInner',
  props: {
    title: {
      type: String,
      default: ''
    },
    extra: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="less" scoped>
.iw-card-inner {
  padding: 0 15px;
  width: 100%;
  flex-direction: column;
  overflow: hidden;
  .iw-card-inner-title {
    font-size: 14px;
    line-height: 22px;
    color: #467BF9;
    margin-bottom: 6px;
    &::before {
      content: '';
      float: left;
      display: block;
      width: 4px;
      height: 16px;
      margin-top: 3px;
      margin-right: 8px;
      background-color: #467BF9;
    }
    .iw-card-inner-extra {
      font-size: 12px;
      color: #fff;
      float: right;
      padding: 0px 4px;
      border-radius: 2px;
      background: #989eac;
    }
  }
  .iw-card-inner-content {
    width: 100%;
  }
}
</style>
