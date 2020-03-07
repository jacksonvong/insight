<template>
  <div class="iw-board senior">
    <!-- 0--顶部筛选条件 -->
    <iw-banner :title="`高级查询分析`"/>
    <div class="main-content">
      <div v-if="partNum == 1" class="part1">
        <iw-search
          v-show="partNum == 1"
          :show-apply-buy="false"
          :show-contrast="false"
          :show-download="false"
          :tab-list="tabList"
          :tab-key="tabKey"
          default-part="advance"
          @change="handleFormChange"
        />
        <a-card>
          <div v-show="composeList.length > 0" class="select_listbox">
            <dl>
              <dt v-for="(itemList, index) in composeList" :key="index">
                组合 {{ index + 1 }} :
                <span>时间:{{ itemList.startYm }} 至 {{ itemList.endYm }};</span>
                <span>区域: </span>
                <template v-for="(cityItem, index) in itemList.cityNames">
                  <i :key="index">{{ cityItem }}</i>
                </template>
                <a-icon v-if="partNum == 1" type="close-circle" class="close-list" @click="deleteCompose(index)" />
              </dt>
            </dl>
            <div v-show="partNum == 1" class="btnbox">
              <iw-button type="primary" @click="partNext(1)">下一步</iw-button>
              <iw-button @click="part1Cancel">取消</iw-button>
            </div>
          </div>
        </a-card>
      </div>
      <Part2 v-if="partNum == 2" @handleNext="part2Next" @handleCancel="part2Cancel" />
      <Part3 v-if="partNum == 3" :part-data1="composeList" :part-data2="part2Data" :key-list="part2KeyList" @handleNext="partNext(3)" @deleteCompose="deleteCompose(index)" />
    </div>
  </div>
</template>

<script>
import { Card, Table, Checkbox, Button, Icon, Modal } from 'ant-design-vue'
import IwBanner from '@/components/banner/index'
import IwChart from '@/components/charts'
import IwSearch from '@/page/components/search'
import IwCard from '@/page/components/card'
import IwSimpleBox from '@/page/components/simple-box'
// import { getSex, getAge, getEducation, getMedia, getReason } from '@/api/board'
// import { Chart } from '@/utils/echarts'
import Part2 from './part2'
import Part3 from './part3'
import 'element-ui/lib/theme-chalk/index.css'

export default {
  name: 'Overview',
  components: {
    ACard: Card,
    ATable: Table,
    ACheckbox: Checkbox,
    ACheckboxGroup: Checkbox.Group,
    AButton: Button,
    AIcon: Icon,
    AModal: Modal,
    IwBanner,
    IwSearch,
    IwCard,
    IwChart,
    IwSimpleBox,
    // 本页
    Part2: Part2,
    Part3: Part3
  },
  data() {
    return {
      tabList: [
        {
          key: '1',
          tab: '组合选择'
        }
      ],
      tabKey: '1',
      newTabIndex: 0,
      dataForm: {},
      sexData: {},
      ageData: {},
      educationData: {},
      mediaData: {},
      reasonData: {},

      visible: false,
      checkedList: [],
      plainOptions: [],
      checkedList1: ['性别', '年龄', '学历'],
      plainOptions1: ['性别', '年龄', '学历', '职业', '收入水平', '性格', '现有车辆'],
      checkedList2: ['信息接触媒体', '战胜原因'],
      plainOptions2: ['信息接触媒体', '战胜原因'],

      // 查询结果
      composeList: [
        // { startYm: 201802, endYm: 201903, areaIds: [10, 12], areaList: [{ key: 10, value: '深圳' }, { key: 15, value: '广州' }] },
        // { startYm: 201804, endYm: 201905, areaIds: [10, 12], areaList: [{ key: 10, value: '深圳' }, { key: 15, value: '广州' }] }
      ],
      part2Data: [],
      part2KeyList: [],
      partNum: 1
    }
  },
  created() {
    // this.getData()
  },
  methods: {
    // 添加方案
    handleFormChange(data) {
      const thisPlain = { ...data }
      if (!thisPlain.startYm || !thisPlain.endYm) {
        this.$message.warning('起始时间或结束时间有误！')
        return false
      }
      if (!thisPlain.cityNames) {
        this.$message.warning('城市不能为空！')
        return false
      }
      this.composeList.push(thisPlain)
    },
    // 删除某个组合
    deleteCompose(i) {
      this.composeList.splice(i, 1)
    },
    // 取消查询结果
    part1Cancel() {
      this.composeList = []
    },
    // 第二步下一步
    part2Next(data) {
      const part2Data = []
      const part2KeyList = []
      data.map((item, index) => {
        if (item.thirdChecked) {
          part2KeyList.push(item.aspectId)
          part2Data.push(item)
        }
      })
      if (part2KeyList.length <= 0) {
        this.$message.warning('至少选择一个指标！')
        return false
      }
      this.part2Data = []
      this.part2KeyList = []
      this.part2Data = part2Data
      this.part2KeyList = part2KeyList
      this.partNext(2)
    },
    // 第二步取消
    part2Cancel() {
      this.partPre(2)
    },

    // 上一步
    partPre(i) {
      this.partNum -= 1
    },
    // 下一步
    partNext(i) {
      this.partNum += 1
      if (this.partNum > 3) {
        this.partNum = 1
      }
    }
    // addPlain(group, checkedOption) {
    //   this.plainOptions = this['plainOptions' + group].map(item => item)
    //   this.checkedList = this['checkedList' + group].map(item => item)
    //   this.visible = true
    // },
    // handleChange() {},
    // handleSubmit() {
    //   console.log('submit')
    // },
    // handleCancel() {
    //   this.visible = false
    // },
    // // API
    // getData() {
    //   this.getSex()
    //   this.getAge()
    //   this.getEducation()
    //   this.getMedia()
    //   this.getReason()
    // },
    // getSex(params) {
    //   return getSex(params).then(res => {
    //     const data = res.data || {}
    //     console.log(data)
    //     this.sexData = new Chart('pie', data, {
    //       customColor: ['#467BF9', '#21D1D9'],
    //       backgroundColor: 'transparent'
    //     }).getChart()
    //   })
    // },
    // getAge(params) {
    //   return getAge(params).then(res => {
    //     const data = res.data || {}
    //     this.ageData = data
    //   })
    // },
    // getEducation(params) {
    //   return getEducation(params).then(res => {
    //     const data = res.data || {}
    //     this.educationData = data
    //   })
    // },
    // getMedia(params) {
    //   return getMedia(params).then(res => {
    //     const data = res.data || {}
    //     this.mediaData = data
    //   })
    // },
    // getReason(params) {
    //   return getReason(params).then(res => {
    //     const data = res.data || {}
    //     this.reasonData = data
    //   })
    // }
  }
}
</script>

<style lang="less">
.ways-checkbox{
  *{ box-sizing: border-box; }
  .ways-checked_inner{ display: inline-block;  position: relative; width: 14px; height: 14px; overflow: hidden; margin-right: -3px; margin-bottom: 1px; border: 1px solid #c3c3c3; vertical-align: middle; user-select: none; cursor: pointer; background: #fff; transition: all .08s; }
  &.is-checked,
  &.is-indeterminate{
    .ways-checked_inner{ box-sizing: border-box; border-color: #2e5aa6; background: #2e5aa6; }
  }
  &.is-indeterminate{
    .ways-checked_inner:after{ display: block; position: absolute; top: 5px; left: 0; right: 0; height: 2px; background-color: #fff; content: ""; transform: scale(.5); }
  }
  &.is-checked{
    .ways-checked_inner:after{ box-sizing: content-box; position: absolute; top: 1px; left: 4px; width: 3px; height: 7px; border: 1px solid #fff; border-left: 0; border-top: 0; content: ""; transform: rotate(45deg) scaleY(1); }
  }
  .ways-checkbox_input{ position: absolute; top: 0; left: 0; z-index: -1; width: 0; height: 0; opacity: 0; }
  .ways-checkbox_label{ padding-left: 5px; vertical-align: middle; font-size: 14px; }
}
.senior{
  .btnbox{
    padding-top: 10px; text-align: center;
    .iw-button{ margin:  5px; }
  }
}
</style>
