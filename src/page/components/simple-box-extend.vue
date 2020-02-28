<template>
  <div v-if="data.series" class="iw-charts-box-extend">
    <div v-for="( item, index ) in data.yAxis[0].data" :key="index" class="bar-unit">
      <div class="text-part">
        <div class="title">{{ item.split('：')[0] }}</div>
        <div class="desc">{{ item.split('：')[1] }}</div>
        <!--<div class="desc"></div>-->
      </div>
      <div class="bar-part">
        <span class="bar-item-wrap">
          <span :style="{ width : toPercent(data.series[0].data[index].value) }" class="bar-item"/>
        </span>
        <span style="width: 40px" class="bar-item-text"> {{ toPercent(data.series[0].data[index].value) }} </span>
      </div>
    </div>
  </div>
</template>

<script>
import { toPercent } from '@/utils/filters'

export default {
  name: 'SimpleBoxExtend',
  desc: '在SimpleBox的基础上，添加了标题',
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
  },
  methods: {
    toPercent() {
      return toPercent(...arguments)
    }
  }
}
</script>

<style lang="scss" scoped>
  .iw-charts-box-extend {
    .bar-unit {
      display: flex;
      align-items: stretch;
      margin-bottom: 18px;

      .text-part {
        width: 40%;
        margin-right: 10px;

        .title {
          font-weight: bold;
          font-size: 12px;
          color: #181c28;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
        }

        .desc {
          font-size: 12px;
          color: #666666;
        }

      }

      .bar-part {
        display: flex;
        width: calc(100% - 40% - 10px);
        height: 100%;
        padding-top: 18px;

        .title {
          font-weight: bold;
          font-size: 12px;
          color: #181c28;
          visibility: hidden;
        }

        .bar-item-wrap {
          height: 20px;
          padding: 2px 0;
          cursor: pointer;
          display: inline-block;
          width: calc(100% - 40px);

          &:hover{
            background: #d7d7d7;
          }

          .bar-item {
            display: inline-block;
            border-radius: 2px;
            background: #467BF9;
            height: 16px;
          }
        }

        .bar-item-text {
          display: inline-block;
          width: 40px;
          height: 20px;
          line-height: 20px;
          text-align: right;
        }
      }
    }
  }
</style>
