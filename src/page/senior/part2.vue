<template>
  <div class="iw-board">
    <a-card title="指标选择">
      <div class="table-box--part2">
        <div class="table-slot__header">
          <label :class="{'is-checked': allChecked, 'is-indeterminate': allIsIndeterminate && !allChecked}" class="ways-checkbox">
            <span class="ways-checked_inner" />
            <span class="ways-checkbox_label">全选</span>
            <input v-model="allChecked" class="ways-checkbox_input" type="checkbox" @change="allChange()">
          </label>
        </div>
        <ElTable v-if="tableData" :span-method="setSpanMethod" :data="tableData" :border="true" size="small" header-row-class-name="table-head--part2">
          <el-table-column
            label="模块"
          >
            <template slot-scope="scope">
              <div>
                <label :class="{'is-checked': tableData[scope.$index]['firstChecked'], 'is-indeterminate': tableData[scope.$index]['isIndeterminateFirst'] && !tableData[scope.$index]['firstChecked']}" class="ways-checkbox">
                  <span class="ways-checked_inner" />
                  <span class="ways-checkbox_label">{{ scope.row.moduleName }}</span>
                  <input v-model="tableData[scope.$index]['firstChecked']" class="ways-checkbox_input" type="checkbox" @change="firstChange(tableData[scope.$index]['firstChecked'], tableData[scope.$index]['moduleName'], scope.$index)">
                </label>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="栏目"
          >
            <template slot-scope="scope">
              <div>
                <label :class="{'is-checked': tableData[scope.$index]['secondChecked'], 'is-indeterminate': tableData[scope.$index]['isIndeterminateSecond'] && !tableData[scope.$index]['secondChecked']}" class="ways-checkbox">
                  <span class="ways-checked_inner" />
                  <span class="ways-checkbox_label">{{ scope.row.columnName }}</span>
                  <input v-model="tableData[scope.$index]['secondChecked']" class="ways-checkbox_input" type="checkbox" @change="secondChange(tableData[scope.$index]['secondChecked'], tableData[scope.$index]['columnName'], scope.$index)">
                </label>
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
            label=""
            align="center"
            width="100"
          >
            <template slot="header">
              <!-- <label :class="{'is-checked': allChecked, 'is-indeterminate': allIsIndeterminate && !allChecked}" class="ways-checkbox">
                <span class="ways-checked_inner" />
                <span class="ways-checkbox_label">全选</span>
                <input v-model="allChecked" class="ways-checkbox_input" type="checkbox" @change="allChange()">
              </label> -->
            </template>
            <template slot-scope="scope">
              <label :class="{'is-checked': tableData[scope.$index]['thirdChecked']}" class="ways-checkbox">
                <span class="ways-checked_inner" />
                <input v-model="tableData[scope.$index]['thirdChecked']" class="ways-checkbox_input" type="checkbox" @change="thirdChange(tableData[scope.$index]['thirdChecked'], tableData[scope.$index]['aspectId'], scope.$index)">
              </label>
            </template>
          </el-table-column>
        </ElTable>
      </div>
      <div class="btnbox">
        <iw-button type="primary" @click="handleNext">确定</iw-button>
        <iw-button @click="handleCancel">上一步</iw-button>
      </div>
    </a-card>
  </div>
</template>

<script>
import { Card, Checkbox, Button, Icon, Modal } from 'ant-design-vue'
import $api from '@/api/senior'
import { Table } from 'element-ui'

const oldData = [
  { moduleName: '用户特征', moduleName: 11, columnName: '用户背景', columnName: 1101, aspectName: '性别', aspectId: 1101001 },
  { moduleName: '用户特征', moduleName: 11, columnName: '用户背景', columnName: 1101, aspectName: '年龄', aspectId: 1101002 },
  { moduleName: '用户特征', moduleName: 11, columnName: '需求偏好', columnName: 1102, aspectName: '操控性', aspectId: 1102001 },
  { moduleName: '竞争对比', moduleName: 12, columnName: '价格', columnName: 1201, aspectName: '性价比', aspectId: 1201001 }
]
export default {
  name: 'Part2',
  components: {
    ACard: Card,
    ACheckbox: Checkbox,
    ACheckboxGroup: Checkbox.Group,
    AButton: Button,
    AIcon: Icon,
    AModal: Modal,
    ElTable: Table
  },
  data() {
    return {
      oldData: [],
      tableData: [],
      // 查询结果
      resultList: [],
      columns: [],
      allChecked: false,
      allIsIndeterminate: false
    }
  },
  mounted() {
    this.getModuls()
  },
  methods: {
    // 获取模块
    getModuls(params) {
      return $api.getModuls(params).then(res => {
        const data = res.data || {}
        this.resetOldData(data)
        this.setTableData()
      })
    },
    // 重置旧数据
    resetOldData(data) {
      this.oldData = []
      data.map((firstItem, index) => {
        const thisObj = {}
        thisObj.moduleName = firstItem.name || ''
        firstItem.list.map((secondItem, index) => {
          thisObj.columnName = secondItem.name || ''
          secondItem.list.map((thirdItem, index) => {
            thisObj.aspectName = thirdItem.name
            thisObj.aspectId = thirdItem.id
            this.oldData.push(Object.assign({}, thisObj))
          })
        })
      })
    },
    // 模块值改变
    firstChange(check, id, index) {
      this.$nextTick(() => {
        this.tableData = this.tableData.map((item, index) => {
          if (item.moduleName === id) {
            const thisCheck = { firstChecked: check, secondChecked: check, thirdChecked: check, isIndeterminateFirst: false, isIndeterminateSecond: false }
            item = Object.assign({}, item, thisCheck)
          }
          return item
        })
        this.setAllChecked()
      })
    },
    // 栏目选中值改变
    secondChange(check, id, index) {
      this.$nextTick(() => {
        const parentId = this.tableData[index].moduleName
        let parentChecked = true
        let parentIsIndeterminate = false
        this.tableData = this.tableData.map((item, index) => {
          if (item.columnName === id) {
            const thisCheck = { secondChecked: check, thirdChecked: check, isIndeterminateSecond: check }
            item = Object.assign({}, item, thisCheck)
          }
          return item
        })
        // 父层状态
        this.tableData.map((item, index) => {
          if (item.moduleName === parentId) {
            if (!item.secondChecked) {
              parentChecked = false
            } else {
              parentIsIndeterminate = true
            }
          }
        })
        this.tableData = this.tableData.map((item, index) => {
          if (item.moduleName === parentId) {
            item.firstChecked = parentChecked
            item.isIndeterminateFirst = parentIsIndeterminate
          }
          return item
        })
        this.setAllChecked()
      })
    },
    // 特征选中值改变
    thirdChange(check, id, index) {
      this.$nextTick(() => {
        const secondId = this.tableData[index].columnName
        const firstId = this.tableData[index].moduleName
        let secondChecked = true
        let secondIsIndeterminate = false
        let firstChecked = true
        let firstIsIndeterminate = false

        // 父层状态
        this.tableData.map((item, index) => {
          if (item.columnName === secondId) {
            if (!item.thirdChecked) {
              secondChecked = false
            } else {
              secondIsIndeterminate = true
            }
          }
          if (item.moduleName === firstId) {
            if (!item.thirdChecked) {
              firstChecked = false
            } else {
              firstIsIndeterminate = true
            }
          }
        })
        this.tableData = this.tableData.map((item, index) => {
          if (item.columnName === secondId) {
            item.secondChecked = secondChecked
            item.isIndeterminateSecond = secondIsIndeterminate
          }
          if (item.moduleName === firstId) {
            item.firstChecked = firstChecked
            item.isIndeterminateFirst = firstIsIndeterminate
          }
          return item
        })
        this.setAllChecked()
      })
    },
    // 全选改变
    allChange() {
      this.$nextTick(() => {
        const check = this.allChecked
        if (this.allChecked) {
          this.allIsIndeterminate = true
        } else {
          this.allIsIndeterminate = false
        }
        this.tableData = this.tableData.map((item, index) => {
          const thisCheck = { firstChecked: check, secondChecked: check, thirdChecked: check, isIndeterminateFirst: check, isIndeterminateSecond: check }
          item = Object.assign({}, item, thisCheck)
          return item
        })
      })
    },
    // 全选设置
    setAllChecked() {
      let allChecked = true
      let allIsIndeterminate = false
      this.tableData.map((item, index) => {
        if (!item.firstChecked) {
          allChecked = false
        }
        if (item.firstIsIndeterminate) {
          allIsIndeterminate = true
        }
      })
      this.allChecked = allChecked
      this.allIsIndeterminate = allIsIndeterminate
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
      }
    },
    setTableData() {
      const _this = this
      console.log(this.oldData)
      this.oldData = this.oldData.map((item, index) => {
        const len = this.oldData.length
        let firstLen = 0
        let secondLen = 0
        let thirdLen = 0
        // 统计第一项自己拥有的条数
        if (index === 0 || index !== 0 && item.moduleName !== _this.oldData[index - 1]['moduleName']) {
          const thisName = item.moduleName
          let thisLen = 0
          for (let i = 0; i < len; i++) {
            if (_this.oldData[i].moduleName === thisName) {
              thisLen += 1
            }
          }
          item = Object.assign({}, item, { firstChecked: false, isIndeterminateFirst: false })
          firstLen = thisLen
        }
        // // 统计第二项自己拥有的条数
        if (index === 0 || index !== 0 && item.columnName !== this.oldData[index - 1]['columnName']) {
          const thisName = item.columnName
          let thisLen = 0
          for (let i = 0; i < len; i++) {
            if (this.oldData[i].columnName === thisName) {
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
      console.log(this.tableData)
    },
    // 下一步
    handleNext() {
      this.$emit('handleNext', ...this.tableData)
    },
    // 上一步
    handleCancel() {
      this.$emit('handleCancel')
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
</style>
