<template>
  <div class="iw-board">
    <a-card>
      <dl>
        <dt v-for="(itemList, index) in childPart1" :key="index">
          组合 {{ index + 1 }} :
          <span>时间:{{ itemList.startYm }} 至 {{ itemList.endYm }};</span>
          <span>区域: </span>
          <template v-for="(cityItem, index) in itemList.cityNames">
            <i :key="index">{{ cityItem }}</i>
          </template>
        </dt>
      </dl>
    </a-card>
    <a-card>
      <div class="btnbox btnbox--part3">
        <iw-button type="primary" @click="handleNext">返回筛选分析条件</iw-button>
        <iw-button>下载</iw-button>
      </div>
      <div class="table-box--part">
        <ElTable v-if="tableData" :span-method="setSpanMethod" :data="tableData" :border="true" size="small">
          <el-table-column
            label="模块"
          >
            <template slot-scope="scope">
              <div>
                <!-- <label :class="{'is-checked': tableData[scope.$index]['firstChecked'], 'is-indeterminate': tableData[scope.$index]['isIndeterminateFirst'] && !tableData[scope.$index]['firstChecked']}" class="ways-checkbox">
                  <span class="ways-checked_inner" />
                  <span class="ways-checkbox_label">{{ scope.row.moduleName }}</span>
                  <input v-model="tableData[scope.$index]['firstChecked']" class="ways-checkbox_input" type="checkbox" @change="firstChange(tableData[scope.$index]['firstChecked'], tableData[scope.$index]['moduleId'], scope.$index)">
                </label> -->
                {{ scope.row.moduleName }}
                <a-icon type="close-circle" class="close-list" @click="deleteModule(scope.row.moduleName )" />
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="栏目"
          >
            <template slot-scope="scope">
              <div>
                {{ scope.row.columnName }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="特征"
          >
            <template slot-scope="scope">
              <div>{{ scope.row.aspectName }}</div>
            </template>
          </el-table-column>
          <el-table-column
            label="指标"
          >
            <template slot-scope="scope">
              <div>{{ scope.row.quotaName }}</div>
            </template>
          </el-table-column>
          <el-table-column
            v-if="tableData && tableData.length > 0"
            :width="tableData[0].composeList.length * 80 + 25"
            align="center"
          >
            <template slot="header">
              <a-row>
                <template v-for="(itemCompose, indexCompose) in tableData[0].composeList">
                  <a-col :key="indexCompose" :span="1" :style="{'width': '80px'}">
                    {{ itemCompose.name }}
                    <a-icon type="close-circle" class="close-list" @click="composeClick(indexCompose)" />
                  </a-col>
                </template>
              </a-row>
            </template>
            <template slot-scope="scope">
              <a-row>
                <template v-for="(itemCompose, indexCompose) in scope.row.composeList">
                  <a-col :key="indexCompose" :span="1" :style="{'width': '80px'}">
                    <span>{{ itemCompose.value || itemCompose.value == 0 ? itemCompose.value * 100 + "%" : '-' }}</span>
                  </a-col>
                </template>
              </a-row>
            </template>
          </el-table-column>
        </ElTable>
      </div>
    </a-card>
  </div>
</template>

<script>
import { Card, Checkbox, Button, Icon, Modal, Row, Col } from 'ant-design-vue'
import { Table } from 'element-ui'

const oldData = [
  { moduleName: '用户特征', moduleId: 11, columnName: '用户背景', columnId: 1101, aspectName: '性别', aspectId: 1101001, quotaName: '男', composeList: [{ name: '组合一', value: 0.6 }, { name: '组合二', value: 0.6 }] },
  { moduleName: '用户特征', moduleId: 11, columnName: '用户背景', columnId: 1101, aspectName: '性别', aspectId: 1101001, quotaName: '女', composeList: [{ name: '组合一', value: 0.6 }, { name: '组合二', value: 0.6 }] },
  { moduleName: '用户特征', moduleId: 11, columnName: '用户背景', columnId: 1101, aspectName: '学历', aspectId: 1101002, quotaName: '博士', composeList: [{ name: '组合一', value: 0.6 }, { name: '组合二', value: 0.6 }] },
  { moduleName: '用户特征', moduleId: 11, columnName: '用户背景', columnId: 1101, aspectName: '学历', aspectId: 1101002, quotaName: '本科', composeList: [{ name: '组合一', value: 0.6 }, { name: '组合二', value: 0.6 }] },
  { moduleName: '用户特征', moduleId: 11, columnName: '需求偏好', columnId: 1102, aspectName: '操控性', aspectId: 1102001, quotaName: '优秀', composeList: [{ name: '组合一', value: 0.6 }, { name: '组合二', value: 0.6 }] },
  { moduleName: '竞争对比', moduleId: 12, columnName: '价格', columnId: 1201, aspectName: '性价比', aspectId: 1201001, quotaName: '高', composeList: [{ name: '组合一', value: 0.6 }, { name: '组合二', value: 0.6 }] }
]
export default {
  name: 'Part3',
  components: {
    ACard: Card,
    ACheckbox: Checkbox,
    ACheckboxGroup: Checkbox.Group,
    AButton: Button,
    AIcon: Icon,
    AModal: Modal,
    'a-row': Row,
    'a-col': Col,
    ElTable: Table
  },
  props: {
    partData1: {
      tips: '第一部分数据',
      type: Array,
      default() {
        return []
      }
    },
    partData2: {
      tips: '第二部分数据',
      type: Array,
      default() {
        return []
      }
    },
    keyList: {
      tips: '第二部分key数据',
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      oldData: oldData,
      tableData: [],
      // 查询结果
      resultList: [],
      columns: [],
      // 第三步相关数据
      childPart1: [],
      childPart2: [],
      childKeyList: [],
      partForm: {
        conditionList: [],
        keyList: []
      }
    }
  },
  mounted() {
    this.childPart1 = [...this.partData1]
    this.childPart2 = [...this.partData2]
    this.childKeyList = [...this.keyList]
    console.log(this.partData1, this.partData2, this.childKeyList)
    this.setTableData()
  },
  methods: {
    // 模块删除
    deleteModule(moduleName) {
      const newChildPart2 = []
      const newKeyList = []
      for (let i = 0; i < this.childPart2.length; i++) {
        if (this.childPart2[i].moduleName !== moduleName) {
          newChildPart2.push(this.childPart2[i])
          newKeyList.push(this.childPart2[i].moduleName)
        }
      }
      this.childPart2 = []
      this.childPart2 = [...newChildPart2]
      this.childKeyList = []
      this.childKeyList = [...newKeyList]
      console.log(this.childPart2, this.childKeyList)
    },
    // 组合删除
    composeClick(i) {
      if (this.childPart1.length <= 1) {
        this.$message.warning('最少保留一个组合！')
        return false
      }
      this.childPart1.splice(i, 1)
      console.log(this.childPart1)
    },
    // 模块值改变
    firstChange(check, id, index) {
      this.$nextTick(() => {
        this.tableData = this.tableData.map((item, index) => {
          if (item.moduleId === id) {
            const thisCheck = { firstChecked: check, secondChecked: check, thirdChecked: check, isIndeterminateFirst: false, isIndeterminateSecond: false }
            item = Object.assign({}, item, thisCheck)
          }
          return item
        })
      })
    },
    // 合并行
    setSpanMethod(all) {
      const row = all.row
      const columnIndex = all.columnIndex
      if (columnIndex === 0) {
        return [row.firstLen, 1]
      } else if (columnIndex === 1) {
        return [row.secondLen, 1]
      } else if (columnIndex === 2) {
        return [row.thirdLen, 1]
      } else {
        return [1, 1]
      }
    },
    setTableData() {
      const _this = this
      this.oldData = this.oldData.map((item, index) => {
        const len = this.oldData.length
        let firstLen = 0
        let secondLen = 0
        let thirdLen = 0
        // 统计第一项自己拥有的条数
        if (index === 0 || index !== 0 && item.moduleId !== _this.oldData[index - 1]['moduleId']) {
          const thisId = item.moduleId
          let thisLen = 0
          for (let i = 0; i < len; i++) {
            if (_this.oldData[i].moduleId === thisId) {
              thisLen += 1
            }
          }
          item = Object.assign({}, item, { firstChecked: false, isIndeterminateFirst: false })
          firstLen = thisLen
        }
        // // 统计第二项自己拥有的条数
        if (index === 0 || index !== 0 && item.columnId !== this.oldData[index - 1]['columnId']) {
          const thisId = item.columnId
          let thisLen = 0
          for (let i = 0; i < len; i++) {
            if (this.oldData[i].columnId === thisId) {
              thisLen += 1
            }
          }
          item = Object.assign({}, item, { secondChecked: false, isIndeterminateSecond: false })
          secondLen = thisLen
        }
        // // 统计第三项自己拥有的条数
        if (index === 0 || index !== 0 && item.aspectId !== this.oldData[index - 1]['aspectId']) {
          const thisId = item.aspectId
          let thisLen = 0
          for (let i = 0; i < len; i++) {
            if (this.oldData[i].aspectId === thisId) {
              thisLen += 1
            }
          }
          item = Object.assign({}, item, { thirdChecked: false })
          thirdLen = thisLen
        }
        const lenObject = { firstLen: firstLen, secondLen: secondLen, thirdLen: thirdLen }
        // 放默认选中状态
        item = Object.assign({}, item, lenObject, { key: index })
        return item
      })
      this.tableData = this.oldData
      // console.log(this.tableData)
    },
    // 返回筛选条件
    handleNext() {
      this.$emit('handleNext', 3)
    }
  }
}
</script>

<style lang="less" scoped>
.table-box--part2{
  position: relative;
  .el-table th, .el-table tr{ background: #fafafa; }
  .table-slot__header{ position: absolute; top: 0; right: 0; z-index: 99; width: 100px; height: 42px; padding-top: 12px; text-align: center; font-size: 12px; }
  .el-table{
    .sort-caret{
      &.ascending{
        top: 0;
      }
      &.descending{
        bottom: 0;
      }
    }
  }
}
.close-list{ font-size: 16px; color: #2e5aa6; cursor: pointer; }
.btnbox--part3{
  text-align: left; padding-top: 0; padding-bottom: 10px;
  .iw-button{ margin-left: 0; margin-right: 10px; }
}
</style>
