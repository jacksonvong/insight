<template>
  <div class="iw-board">
    <!-- 0--顶部筛选条件 -->
    <iw-banner :title="`看板`"/>
    <div class="main-content">
      <iw-search
        :tab-list="tabList"
        :tab-key="tabKey"
        tab-type="editable-card"
        @onTabChange="changeTab"
        @change="changeDataForm"/>
      <a-card title="查询结果">
        <div class="">
          <div class="iw-card-name">用户特征</div>
          <div class="iw-card-container">
            <iw-card title="性别" extra="男性：60%">
              <iw-chart slot="content" :options="sexData" />
            </iw-card>
            <iw-card title="年龄" extra="平均年龄：43">
              <iw-simple-box slot="content" :data="ageData" />
            </iw-card>
            <iw-card title="学历" extra="本科：35%">
              <iw-simple-box slot="content" :data="educationData" />
            </iw-card>
            <div class="iw-card iw-card-add" @click="addPlain(1, checkedList1)">
              <div class="iw-card-add_wrap">
                <div class="iw-card-add_icon"><a-icon type="plus" /></div>
                <div class="iw-card-add_text">新增用户特征</div>
              </div>
            </div>
          </div>
        </div>
        <div class="">
          <div class="iw-card-name">竞争对比</div>
          <div class="iw-card-container">
            <iw-card title="信息接触媒体">
              <iw-simple-box slot="content" :data="mediaData" />
            </iw-card>
            <iw-card title="战胜原因[666]">
              <iw-simple-box slot="content" :data="reasonData" />
            </iw-card>
            <div class="iw-card iw-card-add" @click="addPlain(2, checkedList2)">
              <div class="iw-card-add_wrap">
                <div class="iw-card-add_icon"><a-icon type="plus" /></div>
                <div class="iw-card-add_text">新增竞争对比</div>
              </div>
            </div>
          </div>
        </div>
        <div class="">
          <div class="iw-card-name">销售体验评价</div>
          <div class="iw-card-container">
            <iw-card short title="销售体验评价">
              <div slot="content">
                <div class="iw-card-wrap"><div class="iw-card-center">30%</div></div>
              </div>
            </iw-card>
            <iw-card short title="人员满意度[666]">
              <div slot="content">
                <div class="iw-card-wrap"><div class="iw-card-center">30%</div></div>
              </div>
            </iw-card>
            <iw-card short title="设施满意度[666]">
              <div slot="content">
                <div class="iw-card-wrap"><div class="iw-card-center">30%</div></div>
              </div>
            </iw-card>
            <div class="iw-card iw-card-add iw-card-short" @click="addPlain(2, checkedList2)">
              <div class="iw-card-add_wrap">
                <div class="iw-card-add_icon"><a-icon type="plus" /></div>
                <div class="iw-card-add_text">销售体验评价</div>
              </div>
            </div>
          </div>
        </div>
        <div class="">
          <div class="iw-card-name">周边产品需求</div>
          <div class="iw-card-container">
            <div class="iw-card iw-card-add iw-card-short" @click="addPlain(2, checkedList2)">
              <div class="iw-card-add_wrap">
                <div class="iw-card-add_icon"><a-icon type="plus" /></div>
                <div class="iw-card-add_text">周边产品需求</div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <a-modal
            :visible="visible"
            :title="false"
            :closable="false"
          >
            <template slot="footer">
              <a-button key="submit" type="primary" @click="handleSubmit">确定</a-button>
              <a-button key="back" @click="handleCancel">关闭</a-button>
            </template>
            <a-checkbox-group :options="plainOptions" v-model="checkedList" @change="handleChange" />
          </a-modal>
        </div>
      </a-card>
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
import { getSex, getAge, getEducation, getMedia, getReason } from '@/api/board'
import { Chart } from '@/utils/echarts'

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
    IwSimpleBox
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
      plainOptions2: ['信息接触媒体', '战胜原因']
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
    addPlain(group, checkedOption) {
      this.plainOptions = this['plainOptions' + group].map(item => item)
      this.checkedList = this['checkedList' + group].map(item => item)
      this.visible = true
    },
    handleChange() {},
    handleSubmit() {
      console.log('submit')
    },
    handleCancel() {
      this.visible = false
    },
    // API
    getData() {
      this.getSex()
      this.getAge()
      this.getEducation()
      this.getMedia()
      this.getReason()
    },
    getSex(params) {
      return getSex(params).then(res => {
        const data = res.data || {}
        console.log(data)
        this.sexData = new Chart('pie', data, {
          customColor: ['#467BF9', '#21D1D9'],
          backgroundColor: 'transparent'
        }).getChart()
      })
    },
    getAge(params) {
      return getAge(params).then(res => {
        const data = res.data || {}
        this.ageData = data
      })
    },
    getEducation(params) {
      return getEducation(params).then(res => {
        const data = res.data || {}
        this.educationData = data
      })
    },
    getMedia(params) {
      return getMedia(params).then(res => {
        const data = res.data || {}
        this.mediaData = data
      })
    },
    getReason(params) {
      return getReason(params).then(res => {
        const data = res.data || {}
        this.reasonData = data
      })
    }
  }
}
</script>

<style lang="less" scoped>
.iw-board {
  .iw-card-name {
    font-family: PingFangSC-Semibold;
    font-size: 20px;
    color: #2E5AA6;
    text-align: center;
    line-height: 20px;
    margin: 20px 20px 30px 20px;
  }
  .iw-card-container {
    display: flex;
    flex-wrap: wrap;
    .iw-card {
      width: 254px;
      height: 254px;
      margin: 0 20px 20px 0;
      &.iw-card-short {
        height: 128px;
      }
      .iw-card-wrap {
        height: 80px;
        .iw-card-center {
          position: relative;
          top: 50%;
          transform: translateY(-50%);
          font-family: BrandingSF-CndBlack;
          font-size: 30px;
          color: #467BF9;
          text-align: center;
          line-height: 30px;
        }
      }
    }
    .iw-card-add {
      background: #FAFAFA;
      border: 1px dashed #E6E6E6;
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
          font-size: 50px;
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
