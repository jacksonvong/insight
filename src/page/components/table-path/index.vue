<template>
  <div class="table-path">
    <div class="text-table">
      <div v-for="(item, index) in data" :title="item" :key="index" class="text-item">
        {{ item }}
      </div>
    </div>
    <div class="svg-part">
      <curve-part :data="percentData" title="对象一"/>
      <curve-part :data="percentData2" title="对象二"/>
      <curve-part :data="percentData" title="对象三"/>
    </div>
  </div>
</template>

<script>
import CurvePart from './curve-part'
export default {
  name: 'TablePath',
  components: {
    CurvePart
  },
  data() {
    return {
      data: [
        '农、林、牧、渔业、采矿业',
        '制造业、电力、热力、燃气、水生产、工业用水',
        '政府及社会组织',
        '科学研究及技术服务、教育、卫生医疗'
      ],
      percentData: [65, 25, 100, 45],
      percentData2: [100, 35, 15, 45]
    }
  }
}
</script>

<style lang="scss" scoped>
  .table-path {
    display: flex;

    .text-table {
      padding-top: 16px;
      margin-right: 10px;
      width: 40%;

      .text-item {
        font-size: 12px;
        margin: 6px 0;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }

    }

    .svg-part {
      width: 60%;
      display: flex;
      flex: 1;
    }

  }
</style>
