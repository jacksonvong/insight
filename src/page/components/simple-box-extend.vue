<template>
  <div v-if="data.data" class="iw-charts-box-extend">
    <div v-for="( item, index ) in data.data" :key="index" class="bar-unit">
      <div class="text-part">
        <div class="title">{{ data.title[index] }}</div>
        <div class="desc">{{ data.desc[index] }}</div>
        <!--<div class="desc"></div>-->
      </div>
      <div class="bar-part">
        <span class="bar-item-wrap">
          <span :style="{ width : item + '%' }" class="bar-item"/>
        </span>
        <span style="width: 40px" class="bar-item-text"> {{ item }}% </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SimpleBoxExtend',
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
