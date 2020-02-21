<template>
  <div class="board">
    <iw-banner :title="`看板`"/>
    <div class="main-content">
      <a-card >
        <a-tabs v-model="activeKey" type="editable-card" @edit="onEdit">
          <a-tab-pane v-for="pane in panes" :tab="pane.title" :key="pane.key" :closable="pane.closable">
            <search-content/>
          </a-tab-pane>
        </a-tabs>
      </a-card>
    </div>
  </div>
</template>

<script>
import { Card, Table, Button, Modal, Tabs, Divider } from 'ant-design-vue'
const { TabPane } = Tabs
const { Grid } = Card
import IwBanner from '@/components/banner/index'
import CustomSearch from '@/page/components/CustomSearch'
import SearchContent from './search-content'

export default {
  name: 'Board',
  components: {
    ACard: Card,
    ATable: Table,
    AButton: Button,
    AModal: Modal,
    ATabs: Tabs,
    ATabPane: TabPane,
    ADivider: Divider,
    ACardGrid: Grid,
    IwBanner: IwBanner,
    CustomSearch: CustomSearch,
    SearchContent
  },
  data() {
    const panes = [
      { title: '看板 1', content: 'Content of Tab 1', key: '1', closable: false }
    ]
    return {
      activeKey: panes[0].key,
      panes,
      newTabIndex: 1,
      gridData: []
    }
  },

  methods: {
    onEdit(targetKey, action) {
      this[action](targetKey)
    },

    add() {
      const panes = this.panes
      const activeKey = `${++this.newTabIndex}`
      panes.push({ title: `看板 ${activeKey}`, content: 'Content of new Tab', key: activeKey })
      this.panes = panes
      this.activeKey = activeKey
    },
    remove(targetKey) {
      let activeKey = this.activeKey
      let lastIndex
      this.panes.forEach((pane, i) => {
        if (pane.key === targetKey) {
          lastIndex = i - 1
        }
      })
      const panes = this.panes.filter(pane => pane.key !== targetKey)
      if (panes.length && activeKey === targetKey) {
        if (lastIndex >= 0) {
          activeKey = panes[lastIndex].key
        } else {
          activeKey = panes[0].key
        }
      }
      this.panes = panes
      this.activeKey = activeKey
    }
  }
}
</script>

<style>

</style>
