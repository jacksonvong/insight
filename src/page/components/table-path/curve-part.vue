<template>
  <div ref="curve-part" class="curve-part">
    <div class="title">{{ title }}</div>
    <svg ref="curve-part-svg" class="curve-part-svg" aria-hidden="true">
      <line
        v-for="( item, index ) in data"
        :key="index"
        :x1="0"
        :y1="index * 24 + 6"
        :x2="currBoxWidth"
        :y2="index * 24 + 6"
        :style="lineStyle"/>
      <template v-for="( item, index ) in (data.length - 1)">
        <path :key="index" :d="getCurveD(item,index,data)" :style="curveStyle"/>
      </template>
      <circle
        v-for="( item, index ) in data"
        :key="index"
        :cx="getPointPos(item,index).x"
        :cy="getPointPos(item,index).y"
        :style="pointStyle"
        r="4"/>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'CurvePart',
  props: {
    title: {
      type: String,
      default: ''
    },
    data: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      currBoxWidth: 0,
      lineStyle: {
        'stroke': '#D4EEFC',
        'stroke-width': 2
      },
      pointStyle: {
        'stroke': '#4283F4',
        'stroke-width': 2,
        'fill': 'white'
      },
      curveStyle: {
        'stroke': '#4283F4',
        'stroke-width': 2,
        'fill': 'none',
        'shape-rendering': 'geometricPrecision'
      }
    }
  },
  mounted() {
    this.getBoxWidth()
  },
  methods: {
    getBoxWidth() {
      this.currBoxWidth = this.$refs['curve-part-svg'].clientWidth
    },
    getPointPos(value, index, modify = 0) {
      return {
        x: value / 100 * (this.currBoxWidth - 20) + 10,
        y: index * 24 + 6
      }
    },
    getCurveD(item, index, data) {
      const startPoint = this.getPointPos(data[index], index)
      const endPoint = this.getPointPos(data[index + 1], index + 1, 3)
      const p1 = {
        x: startPoint.x,
        y: (startPoint.y + endPoint.y) / 2
      }
      const p2 = {
        x: endPoint.x,
        y: (startPoint.y + endPoint.y) / 2
      }
      return `M${startPoint.x} ${startPoint.y} C${p1.x} ${p1.y}, ${p2.x} ${p2.y}, ${endPoint.x} ${endPoint.y}`
    }
  }
}
</script>

<style lang="scss" scoped>
  .curve-part {
      .title {
        text-align: center;
        font-weight: bold;
        margin-bottom: 6px;
      }
  }
  .curve-part-svg{
    width: 100%;
  }
</style>
