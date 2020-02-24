<template>
  <div class="top10-box">
    <div :class="{ 'selected': currKey === -1 }" class="top10-item top10-all" @click="onChangeItem(-1,'all')">
      <span>总体</span>
      <span class="top10-icon"><a-icon type="right"/></span>
    </div>
    <div
      v-for="(item , index) in data"
      :key="index"
      :class="{ 'selected': currKey === index }"
      class="top10-item"
      @click="onChangeItem(index , item.name)">
      <span class="top10-left">
        <span>{{ index + 1 }}. {{ item.name }}</span>
        <span>{{ item.data }}%</span>
      </span>
      <span class="top10-icon"><a-icon type="right"/></span>
    </div>
  </div>
</template>

<script>
import { Icon } from 'ant-design-vue'

export default {
  name: 'Top10Box',
  components: {
    AIcon: Icon
  },
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      currKey: -1
    }
  },
  methods: {
    onChangeItem(key, item) {
      this.currKey = key
      this.$emit('change', item)
    }
  }
}
</script>

<style lang="scss" scoped>
  .top10-box {

    .top10-item {
      display: flex;
      height: 30px;
      line-height: 30px;
      border-radius: 2px;
      background: #DDF3FF;
      margin-bottom: 8px;
      font-size: 14px;
      position: relative;
      cursor: pointer;

      &.selected, &:hover {
        background: #4182F3;
        color: white;
        cursor: pointer;
      }

      .top10-left{
        display: inline-flex;
        width: calc(100% - 35px);
        padding-left: 14px;
        justify-content: space-between;
      }

      .top10-icon {
        box-sizing: border-box;
        display: inline-block;
        padding: 0 10px;
        width: 34px;
        height: 100%;
      }

    }

    .top10-all {
      justify-content: center;

      .top10-icon {
        position: absolute;
        right: 0;
        top: 0;
      }

    }

  }
</style>
