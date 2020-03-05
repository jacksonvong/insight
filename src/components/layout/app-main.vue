<template>
  <keep-alive>
    <router-view :key="key" />
  </keep-alive>
</template>

<script>
export default {
  name: 'AppMain',
  provide() {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      isPageAlive: true
    }
  },
  computed: {
    key() {
      return this.$route.path
    }
  },
  methods: {
    reload() {
      this.isPageAlive = false
      this.$nextTick(() => {
        this.isPageAlive = true
      })
    }
  }
}
</script>
