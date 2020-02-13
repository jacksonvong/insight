<template>
  <div>
    <iw-date-picker
      v-model="value"
      type="date"
      size="small"
      style="width: 120px;"
      align="right"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      placeholder="选择日期"
    />
  </div>
</template>
<script>
export default {
  name: '',
  data() {
    return {
      value: ''
    }
  },
  mounted() {
  },
  methods: {
    handleChange(value) {
      console.log('value', value)
      this.value = value
    }
  }
}
</script>
