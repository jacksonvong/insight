<template>
  <div class="iw-board">
    <!-- 0--顶部筛选条件 -->
    <iw-banner :title="`看板`"/>
    <div class="main-content">
      <iw-search :tab-list="tabList" :tab-key="tabKey" @onTabChange="changeTab" @change="changeDataForm" />
      <a-card title="查询结果">
        <div class="">
          <div class="iw-card-name">用户特征</div>
          <div class="iw-card-container">
            <div v-for="item in 4" :key="item" class="iw-card">
              <div class="iw-card-title">性别[888]</div>
              <div class="iw-card-content">
                asdfadsf
              </div>
            </div>
            <div class="iw-card iw-card-add">
              <div class="iw-card-add_wrap">
                <div class="iw-card-add_icon"><a-icon type="plus" /></div>
                <div class="iw-card-add_text">新增用户特征</div>
              </div>
            </div>
          </div>
        </div>
      </a-card>
    </div>
  </div>
</template>

<script>
import { Card, Table, Checkbox, Button, Icon, Modal } from 'ant-design-vue'
import IwBanner from '@/components/banner/index'
import IwSearch from '@/page/components/search'

export default {
  name: 'Overview',
  components: {
    ACard: Card,
    ATable: Table,
    ACheckbox: Checkbox,
    AButton: Button,
    AIcon: Icon,
    AModal: Modal,
    IwBanner: IwBanner,
    IwSearch: IwSearch
  },
  data() {
    return {
      tabList: [
        {
          key: '1',
          tab: '看板'
        },
        {
          key: '2',
          tab: '看板2'
        }
      ],
      tabKey: '1',
      newTabIndex: 0,
      dataForm: {}
    }
  },
  created() {
    this.getData()
  },
  methods: {
    changeTab(key) {
      this.tabKey = key
    },
    changeDataForm(form) {
      this.dataForm = Object.assign(this.dataForm, form)
      this.getData()
    },
    // API
    getData() {
    }
  }
}
</script>

<style lang="less" scoped>
.iw-board {
  .iw-card-name {
    font-size: 20px;
    color: #2E5AA6;
    text-align: center;
    line-height: 20px;
    margin: 10px 20px 30px 20px;
  }
  .iw-card-container {
    display: flex;
    flex-wrap: wrap;
    .iw-card {
      width: 254px;
      height: 254px;
      margin: 0 20px 20px 0;
      .iw-card-title {
        height: 28px;
        line-height: 28px;
        padding-left: 10px;
        color: #fff;
        background: #6FC2EF;
        border-radius: 4px 4px 0 0;
      }
      .iw-card-content {
        height: 226px;
        padding: 10px;
        background: #EEF9FF;
        border-radius: 0 0 4px 4px;
      }
    }
    .iw-card-add {
      background: #FAFAFA;
      border: 1px dotted #E6E6E6;
      border-radius: 4px;
      border-radius: 4px;
      cursor: pointer;
      &:hover {
        border: 1px solid #6FC2EF;
      }
      .iw-card-add_wrap {
        position: relative;
        top: 50%;
        transform: translateY(-50%);
        .iw-card-add_icon {
          font-size: 64px;
          text-align: center;
          color: #D8D8D8;
        }
        .iw-card-add_text {
          font-size: 14px;
          color: #666666;
          text-align: center;
          line-height: 14px;
        }
      }
    }
  }
}
</style>
