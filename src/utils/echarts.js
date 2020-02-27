import { color, fieldsMapper } from '@/utils/includes'
import { copyObject } from '@/utils/helper'
import { toThousand, toPercent } from '@/utils/filters'
import _ from 'lodash'
import map from '@/components/charts/json/china'
const echarts = require('echarts')
const params = {
  text: {},
  customColor: undefined, // 自定义图表颜色
  itemStyleColor: color,
  showTooltip: true,
  showTitle: false,
  tooltipColor: '#ADB0BA',
  tooltipHightLightColor: '#CD8E46',
  tooltipBackgroundColor: '#4E545E',
  tooltipFields: [],
  tooltipFormatter: undefined,
  tooltipTextColor: '#B2B4BF',
  tooltipTrigger: 'axis',
  tooltipZerofilter: false, // 过滤数值为0的系列
  defaultField: undefined,
  numPerPage: 6,
  legend: {},
  legendIcon: {
    bar: 'path://M512 512m-204.8 0a204.8 204.8 0 1 0 409.6 0 204.8 204.8 0 1 0-409.6 0Z',
    line: 'path://M16.5,4.2C16.1,1.8,14,0,11.6,0S7,1.8,6.7,4.2H3.2v2h3.5C7.3,8.4,9.2,10,11.6,10s4.3-1.6,4.8-3.8h3.8v-2H16.5z    M11.6,8c-1.7,0-3-1.3-3-3s1.3-3,3-3s3,1.3,3,3S13.2,8,11.6,8z'
  },
  selectedMode: true,
  grid: undefined,
  xAxisType: 'category', // X轴坐标轴类型
  xAxisTypeDouble: false, // 是否双X轴显示
  yAxisType: 'value', // Y轴坐标轴类型
  yAxisShow: true, // Y轴坐标轴类型
  yAxisInverse: false, // Y轴从上往下排序
  yAxisMax: undefined,
  xAxisName: [''],
  yAxisName: ['辆', '%'],
  barBorderRadius: 0,
  barMaxWidth: 20,
  barGap: '0%',
  itemShowIndex: [],
  itemStyle: undefined,
  labelColor: '#FEA740',
  axisLabelInterval: undefined,
  axisLabelRotate: undefined,
  rich: {},
  mapName: 'china',
  mapType: 1, // 1:国家,2:省份,3:城市
  geoJson: map,
  mapFeatures: map.features,
  maxSymbolSize: 30, // 直径30px
  dataZoom: {
    show: true,
    orient: 'horizontal',
    start: undefined,
    height: 14,
    bottom: 25
  },
  dataZoomShowDetail: true,
  clickEvent: () => {}
}

function titleUpperCase(str) {
  if (str) return str[0].toUpperCase() + str.substr(1)
  else return str
}

/**
 * 提示信息格式化
 * 针对散点图，地图等多个系列
 * 特殊处理可在本类外重写该方法
 * @params Object 返回参数
 * @params config 自定义参数
 */
function tooltipFormatter(params, config) {
  let html = ''
  let title = ''
  params.map((item, key) => {
    if (!title) title = item.name + '<br>'
    let val = ''
    if (item.value === undefined || isNaN(item.value)) val = '-'
    else {
      if (config.tooltipZerofilter && Number(item.value) === 0) return
      const field = config.tooltipFields.find(ele => { return item.seriesName.indexOf(ele.name) > -1 }) || fieldsMapper.find(ele => { return item.seriesName.indexOf(ele.name) > -1 }) || config.defaultField || {}
      val = `<em style="color:${config.tooltipHightLightColor};">`
      switch (field.type) {
        case 'normal': val += toThousand(item.value) + `</em>` + field.unit; break
        case 'percent': val += toPercent(item.value, 1) + `</em>`; break
        case 'decimal': val += Number(item.value).toFixed(1) + `</em>` + field.unit; break
        default: val += toThousand(item.value) + `</em>`; break
      }
    }
    html = html + `${item.marker}${item.seriesName}：${val}` + '<br>'
  })
  return title + html
}

/**
 * 提示信息格式化
 * 针对散点图，地图等单个系列
 * @params Object 返回参数
 * @params config 自定义参数
 */
function tooltipFormatterItem(params, config) {
  const fields = config.tooltipFields
  let html = ''
  let title = ''
  var value = params.value
  fields.forEach(item => {
    if (item.name && !title) title = `${params.marker}${value[item.key]}<br>`
    if (item.seriesName) {
      let val = ''
      const field = fieldsMapper.find(ele => { return ele.name === item.seriesName }) || {}
      val = `<em style="color:${config.tooltipHightLightColor};">`
      switch (field.type) {
        case 'normal': val += toThousand(value[item.key]) + `</em>` + field.unit; break
        case 'percent': val += toPercent(value[item.key], 1) + `</em>`; break
        case 'decimal': val += Number(value[item.key]).toFixed(1) + `</em>` + field.unit; break
        default: val += toPercent(value[item.key], 1) + `</em>`; break
      }
      html = html + `${item.seriesName}：${val}` + '<br>'
    }
  })
  return title + html
}

function labelFormatter(param, config) {
  let val = param.value
  var value = param.value
  const field = config.tooltipFields.find(field => { return param.seriesName.indexOf(field.name) > -1 }) || fieldsMapper.find(field => { return param.seriesName.indexOf(field.name) > -1 }) || config.defaultField || {}
  switch (field.type) {
    case 'normal': val = toThousand(value); break
    case 'percent': val = toPercent(value, 1); break
    case 'decimal': val = Number(value).toFixed(1); break
    default: val = toPercent(value, 1); break
  }
  return val
}

function iconFormatter(serie, config) {
  let val = ''
  switch (serie.type) {
    case 'pie':
    case 'bar': val = config.legendIcon.bar; break
    case 'line': val = config.legendIcon.line; break
    default: val = ''; break
  }
  return val
}

export class Chart {
  constructor(type, option, config = {}) {
    this.type = type
    this.option = copyObject(option)
    // 地图参数不能复制
    const mapFeatures = config.mapFeatures || params.mapFeatures
    const geoJson = config.geoJson || params.geoJson
    this.config = Object.assign(copyObject(params), config)
    this.config.mapFeatures = mapFeatures
    this.config.geoJson = geoJson
    // 排除异常
    if (this.config.dataZoom.start === undefined) {
      if (this.option.xAxis && this.option.xAxis[0].data) {
        const len = this.option.xAxis[0].data.length
        this.config.dataZoom.start = len <= this.config.numPerPage ? 0 : parseInt(((len - this.config.numPerPage) / len) * 100)
      }
    }
    if (this.config.dataZoom.start === undefined) {
      if (this.option.yAxis && this.option.yAxis[0].data && this.option.yAxis[0].type === 'category') {
        const len = this.option.yAxis[0].data.length
        this.config.dataZoom.start = len <= this.config.numPerPage ? 0 : parseInt(((len - this.config.numPerPage) / len) * 100)
      }
    }
  }

  getChart() {
    return this[`get${titleUpperCase(this.type)}Chart`]()
  }

  /*
   *  获取散点图
   */
  getScatterChart() {
    const _this = this
    const config = this.config
    const labelIndex = config.labelIndex || 2
    const option = {
      backgroundColor: config.backgroundColor || '#ffffff',
      color: config.customColor || config.itemStyleColor.pie,
      tooltip: {
        color: config.tooltipColor,
        backgroundColor: config.tooltipBackgroundColor,
        textStyle: {
          color: config.tooltipTextColor,
          fontSize: 12
        },
        formatter: params => tooltipFormatterItem(params, config)
      },
      legend: {
        show: true,
        data: _this.option.legend.data,
        bottom: 10,
        left: 'center'
      },
      title: [
        (_this.option.title && _this.option.title[0] ? {
          text: _this.option.title[0].text,
          x: 0,
          y: 0,
          textStyle: {
            fontSize: 17,
            color: '#181c28'
          }
        } : {}),
        (_this.option.title && _this.option.title[1] ? {
          text: _this.option.title[1].text,
          x: '51%',
          y: 120,
          textStyle: {
            fontSize: 12,
            color: '#7f8593',
            fontWeight: 100
          }
        } : {}),
        (_this.option.title && _this.option.title[2] ? {
          text: _this.option.title[2].text,
          x: '90%',
          y: 250,
          textStyle: {
            fontSize: 12,
            color: '#7f8593',
            fontWeight: 100
          }
        } : {})
      ],
      grid: {
        top: 60,
        left: 80,
        right: 30,
        bottom: 60,
        ...config.grid
      },
      xAxis: {
        show: true,
        scale: true,
        name: '购买卡罗拉的原因',
        nameLocation: 'center',
        nameGap: 35,
        nameTextStyle: {
          fontSize: 14,
          color: '#181C28'
        },
        axisLabel: {
          show: true,
          color: '#181C28',
          formatter: (value, index) => {
            return toPercent(value)
          }
        },
        axisLine: {
          lineStyle: {
            color: '#6FC2EF'
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false,
          lineStyle: {
            color: '#6FC2EF'
          }
        }
      },
      yAxis: {
        show: true,
        scale: true,
        name: '放弃对象的原因',
        nameLocation: 'middle',
        nameGap: 45,
        nameTextStyle: {
          fontSize: 14,
          color: '#181C28'
        },
        axisLabel: {
          show: true,
          interval: 0,
          color: '#181C28',
          formatter: (value, index) => {
            return toPercent(value)
          }
        },
        axisLine: {
          lineStyle: {
            color: '#6FC2EF'
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false,
          lineStyle: {
            color: '#6FC2EF'
          }
        }
      },
      series: _this.option.series.map(item => {
        item.symbol = 'path://M512 512m-204.8 0a204.8 204.8 0 1 0 409.6 0 204.8 204.8 0 1 0-409.6 0Z'
        item.symbolSize = 16
        item.label = {
          normal: {
            color: '#000',
            show: true,
            position: 'outside',
            formatter: function(param) {
              return param.data[labelIndex]
            }
          }
        }
        item.markLine = config.markLine || item.markLine
        return item
      })
    }
    return option
  }

  /*
   *  获取折线图
   */
  getLineChart() {
    const _this = this
    const config = this.config
    const option = {
      backgroundColor: '#fff',
      title: _this.option.title ? [
        {
          show: config.showTitle,
          text: _this.option.title.text || config.text.title,
          x: 20,
          y: 20,
          textStyle: {
            fontSize: 16,
            color: '#181c2b'
          }
        }
      ] : '',
      tooltip: {
        trigger: 'axis',
        color: config.tooltipColor,
        backgroundColor: config.tooltipBackgroundColor,
        textStyle: {
          color: config.tooltipTextColor,
          fontSize: 12
        },
        formatter: (params) => tooltipFormatter(params, config)
      },
      grid: {
        borderWidth: 0,
        top: 30,
        right: 20,
        bottom: 84
      },
      legend: {
        bottom: '10',
        type: 'scroll',
        textStyle: {
          color: '#5a5a5a'
        },
        data: this.option.legend && this.option.legend.data.map((item, key) => {
          return {
            name: item,
            icon: iconFormatter(this.option.series[key], config)
          }
        })
      },
      xAxis: this.option.xAxis ? [
        {
          type: 'category',
          axisLine: {
            lineStyle: {
              color: '#dfdfdf'
            }
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitArea: {
            show: false
          },
          axisLabel: {
            fontSize: 12,
            color: '#7f8593'
          },
          data: this.option.xAxis[0]['data']
        }
      ] : [],
      yAxis: [
        {
          name: config.yAxisName[0],
          type: 'value',
          nameTextStyle: {
            color: '#7f8593'
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#ececec',
              type: 'dashed'
            }
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitArea: {
            show: false
          },
          axisLabel: {
            fontSize: 12,
            color: '#7f8593',
            formatter: (val) => {
              return config.yAxisName[0] === '%' ? toPercent(val, 1) : toThousand(val)
            }
          }
        }
      ],
      dataZoom: [
        {
          show: config.dataZoom.show,
          showDetail: config.dataZoomShowDetail,
          showDataShadow: config.dataZoomShowDataShadow,
          height: 14,
          bottom: 40,
          start: config.dataZoom.start,
          end: 100,
          handleIcon:
            'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z',
          handleSize: '50%',
          handleStyle: {
            color: '#82cbc5'
          },
          textStyle: {
            color: '#fff'
          },
          backgroundColor: '#f7f7f7',
          borderColor: '#f7f7f7'
        }
      ],
      series: this.option.series ? this.option.series.map((item, key) => {
        return {
          type: 'line',
          name: item.name,
          markPoint: item.markPoint,
          yAxisIndex: item.yAxisIndex || 0,
          symbolSize: 10,
          itemStyle: {
            normal: {
              color: config.customColor.length ? config.customColor[key] : color.line[key % 6],
              barBorderRadius: config.barBorderRadius,
              label: {
                show: true,
                position: 'top',
                formatter: param => labelFormatter(param, config)
              }
            }
          },
          data: item.data
        }
      }) : {}
    }
    return option
  }

  /*
   *  获取柱线图
   */
  getBarLineChart() {
    // 计算Bar的系列个数
    const _this = this
    const config = this.config
    const option = {
      backgroundColor: '#fff',
      title: _this.option.title ? [
        {
          show: config.showTitle,
          text: _this.option.title.text || config.text.title,
          x: 20,
          y: 20,
          textStyle: {
            fontSize: 16,
            color: '#181c2b'
          }
        }
      ] : config.text.title,
      tooltip: {
        trigger: 'axis',
        color: config.tooltipColor,
        backgroundColor: config.tooltipBackgroundColor,
        textStyle: {
          color: config.tooltipTextColor,
          fontSize: 12
        },
        formatter: (params) => tooltipFormatter(params, this.config)
      },
      grid: {
        borderWidth: 0,
        top: 40,
        bottom: 105
      },
      legend: {
        orient: 'horizontal',
        bottom: '5%',
        type: 'scroll',
        textStyle: {
          color: '#5a5a5a'
        },
        data: _this.option.legend.data.map((item, key) => {
          return {
            name: item,
            icon: iconFormatter(this.option.series[key], config)
          }
        })
      },
      color: config.customColor.length ? config.customColor : color.line,
      itemStyle: {
        barBorderRadius: config.barBorderRadius
      },
      xAxis: [
        {
          type: 'category',
          axisLine: {
            lineStyle: {
              color: '#dfdfdf'
            }
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitArea: {
            show: false
          },
          axisLabel: {
            fontSize: 12,
            color: '#7f8593'
          },
          data: this.option.xAxis[0]['data']
        }
      ],
      yAxis: [
        this.option.yAxis && this.option.yAxis[0] ? {
          name: config.yAxisName[0],
          nameTextStyle: {
            color: '#7f8593'
          },
          axisLine: {
            lineStyle: {
              color: '#dfdfdf'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#ececec',
              type: 'dashed'
            }
          },
          axisLabel: {
            fontSize: 12,
            color: '#7f8593',
            formatter: (val) => {
              return config.yAxisName[0] === '%' ? toPercent(val, 1) : toThousand(val)
            }
          },
          show: !!this.option.yAxis[0],
          type: this.option.yAxis[0].type || config.yAxisType,
          data: this.option.yAxis[0] ? this.option.yAxis[0].data : []
        } : {},
        this.option.yAxis && this.option.yAxis[1] ? {
          name: config.yAxisName[1],
          nameTextStyle: {
            color: '#7f8593'
          },
          axisLine: {
            lineStyle: {
              color: '#dfdfdf'
            }
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            fontSize: 12,
            color: '#7f8593',
            formatter: (val) => {
              return config.yAxisName[1] === '%' ? toPercent(val, 1) : toThousand(val)
            }
          },
          show: !!this.option.yAxis[1],
          type: this.option.yAxis[1].type || config.yAxisType
        } : {}
      ],
      dataZoom: [
        {
          show: this.config.dataZoom.show,
          showDetail: config.dataZoomShowDetail,
          showDataShadow: config.dataZoomShowDataShadow,
          height: 14,
          bottom: 55,
          start: this.config.dataZoom.start,
          end: 100,
          handleIcon:
            'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z',
          handleSize: '50%',
          handleStyle: {
            color: '#82cbc5'
          },
          textStyle: {
            color: '#fff'
          },
          backgroundColor: '#f7f7f7',
          borderColor: '#f7f7f7'
        }
      ],
      series: this.option.series.map((item, key) => {
        if (item.type === 'bar') {
          item.barMaxWidth = config.barMaxWidth
          item.barGap = config.barGap
        }
        if (item.type === 'line') {
          item.symbolSize = 8
          item.yAxisIndex = 1
          item.itemStyle = {
            normal: {
              label: {
                show: true,
                position: 'top',
                formatter: param => labelFormatter(param, config)
              }
            }
          }
        }
        return item
      })
    }
    return option
  }

  /**
   * 获取地图
   */
  getMapChart() {
    const _this = this
    const config = _this.config
    const item = _this.option.series[0]
    let maxValue = ''
    let minValue = ''
    if (item) {
      maxValue = item.value instanceof Array ? Number(item.value[2]) : item.value
      minValue = item.value instanceof Array ? Number(item.value[2]) : item.value
      _this.option.series.forEach(item => {
        maxValue = Math.max(maxValue, item.value instanceof Array ? Number(item.value[2]) : item.value)
        minValue = Math.min(minValue, item.value instanceof Array ? Number(item.value[2]) : item.value)
      })
    }

    echarts.parseGeoJson(config.geoJson)
    echarts.registerMap(config.mapName, {
      'type': 'FeatureCollection',
      'features': config.mapFeatures,
      'UTF8Encoding': false
    })

    const option = {
      backgroundColor: '#FFFFFF',
      title: _this.option.title ? [
        {
          show: config.showTitle,
          text: _this.option.title.text || config.text.title,
          x: 20,
          y: 20,
          textStyle: {
            fontSize: 16,
            color: '#181c2b'
          }
        }
      ] : config.text.title,
      tooltip: {
        trigger: 'item',
        color: config.tooltipColor,
        backgroundColor: config.tooltipBackgroundColor,
        textStyle: {
          color: config.tooltipTextColor,
          fontSize: 12
        },
        formatter: params => {
          const fields = config.tooltipFields
          let html = ''
          let title = ''
          var value = params.data
          fields.forEach(item => {
            if (!value) return
            const name = value.regionName || value.name
            if (name && !title) title = `${params.marker}${name}<br>`
            if (name) {
              let val = ''
              val = `<em style="color:${config.tooltipHightLightColor};">`
              switch (item.type) {
                case 'normal': val += toThousand(value[item.key]) + `</em>` + item.unit; break
                case 'percent': val += toPercent(value[item.key], 1) + `</em>`; break
                case 'decimal': val += Number(value[item.key]).toFixed(1) + `</em>` + item.unit; break
                default: val += toPercent(value[item.key], 1) + `</em>`; break
              }
              html = html + `${item.name}：${val}` + '<br>'
            }
          })
          return title + html
        }
      },
      dataRange: {
        show: false,
        min: 0,
        max: maxValue,
        text: ['High', 'Low'],
        realtime: true,
        calculable: true,
        color: ['#4182F3', '#CADCFC']
      },
      geo: {
        map: config.mapName || 'china',
        roam: false,
        top: 20,
        bottom: 20,
        label: {
          show: true,
          textStyle: {
            color: '#fff'
          },
          textShadowColor: 'rgba(0,0,0,0.4)',
          textShadowBlur: 10,
          formatter: function(params) {
            return undefined
          }
        },
        itemStyle: {
          normal: {
            areaColor: '#ECF2FE',
            borderColor: '#fff'
          },
          emphasis: {
            areaColor: '#FB982A',
            opacity: 0.7,
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowBlur: 10,
            borderWidth: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
            label: {
              color: 'auto'
            }
          }
        }
      },
      series: [
        {
          type: 'map',
          geoIndex: 0,
          data: _this.option.series,
          label: {
            show: true,
            formatter: (params) => {
            }
          }
        }
      ]
    }
    let mouseoverEvent = () => {}
    let mouseoutEvent = () => {}
    if (config.mapType === 1) {
      mouseoverEvent = (params, myChart) => {
        const regionName = params.data ? params.data.regionName : ''
        _this.option.series.forEach(function(item) {
          if (!!item && regionName === item.regionName) {
            myChart.dispatchAction({
              type: 'highlight',
              name: item.name
            })
          }
        })
      }
      mouseoutEvent = (params, myChart) => {
        const regionName = params.data ? params.data.regionName : ''
        _this.option.series.forEach(function(item) {
          if (!!item && regionName === item.regionName) {
            myChart.dispatchAction({
              type: 'downplay',
              name: item.name
            })
          }
        })
      }
    }
    if (config.mapType === 3) {
      option.series = [
        {
          type: 'scatter',
          coordinateSystem: 'geo',
          data: _this.option.series,
          symbolSize: function(value) {
            return value[2] * config.maxSymbolSize / maxValue
          },
          label: {
            normal: {
              formatter: '{b}',
              position: 'right',
              show: false
            },
            emphasis: {
              show: true
            }
          },
          itemStyle: {
            normal: {
              color: '#4182F3'
            }
          }
        }
      ]
      option.dataRange = false
    }
    const events = {
      'mouseover': ['this', mouseoverEvent],
      'mouseout': ['this', mouseoutEvent],
      'click': config.clickEvent
    }
    return { option, events }
  }

  /*
  *  获取柱图
  */
  getBarChart() {
    const _this = this
    const config = this.config
    const option = {
      backgroundColor: config.backgroundColor || '#fff',
      title: _this.option.title ? [
        {
          show: config.showTitle,
          text: _this.option.title.text || config.text.title,
          x: 'center',
          y: 10,
          textStyle: {
            fontSize: 16,
            color: '#181c2b'
          }
        }
      ] : config.text.title,
      tooltip: {
        show: config.showTooltip,
        trigger: config.tooltipTrigger,
        axisPointer: {
          type: 'shadow'
        },
        color: config.tooltipColor,
        backgroundColor: config.tooltipBackgroundColor,
        textStyle: {
          color: config.tooltipTextColor,
          fontSize: 12
        },
        formatter: (params) => {
          if (config.tooltipFormatter) {
            return config.tooltipFormatter(params, config)
          } else {
            return tooltipFormatter(params, config)
          }
        }
      },
      color: (config.customColor && config.customColor.length) ? config.customColor : color.bar[Math.min(_this.option.series[0].data.length, 12) - 1],
      legend: _this.option.legend && config.legend === false ? {
        orient: 'horizontal',
        bottom: '5%',
        ...config.legend,
        type: 'scroll',
        data: _this.option.legend.data.map(item => {
          return {
            name: item,
            icon: config.legendIcon.bar
          }
        })
      } : { show: false },
      grid: {
        top: 10,
        bottom: 110,
        left: 50,
        right: 50,
        borderWidth: 0,
        ...config.grid
      },
      // grid: {
      //   borderWidth: 0,
      //   ..._this.config.grid
      // },
      xAxis: [
        _this.option.xAxis && _this.option.xAxis[0] ? {
          name: config.xAxisName[0],
          nameTextStyle: {
            color: '#7f8593'
          },
          axisLine: {
            lineStyle: {
              color: '#dfdfdf'
            }
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            fontSize: 12,
            color: '#7f8593',
            interval: config.axisLabelInterval,
            rotate: config.axisLabelRotate
          },
          show: !!_this.option.xAxis[0],
          type: _this.option.xAxis[0].type || config.xAxisType,
          data: (_this.option.xAxis[0] && _this.option.xAxis[0].data) ? _this.option.xAxis[0].data.map(item => { return item || '' }) : []
        } : {}
        // this.option.xAxis && this.option.xAxis[1] ? {
        //   show: !!this.option.xAxis[1],
        //   type: this.option.xAxis[1].type || config.xAxisType
        // } : {}
      ],
      yAxis: [
        config.yAxisShow && _this.option.yAxis && _this.option.yAxis[0] ? {
          name: config.yAxisName[0],
          nameLocation: config.yAxisInverse ? 'start' : 'end',
          nameTextStyle: {
            color: '#7f8593'
          },
          axisLine: {
            lineStyle: {
              color: '#dfdfdf'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#ececec'
            }
          },
          axisLabel: {
            fontSize: 12,
            color: '#7f8593'
          },
          max: config.yAxisMax,
          show: _this.option.yAxis[0].show,
          type: _this.option.yAxis[0].type || config.yAxisType,
          inverse: config.yAxisInverse,
          data: _this.option.yAxis[0] ? _this.option.yAxis[0].data : []
        } : { max: config.yAxisShow, show: false }
      ],
      dataZoom: config.dataZoom.show ? [
        {
          ...config.dataZoom,
          bottom: 60,
          showDetail: config.dataZoomShowDetail,
          showDataShadow: config.dataZoomShowDataShadow,
          handleIcon:
            'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z',
          handleSize: '50%',
          handleStyle: {
            color: '#82cbc5'
          },
          textStyle: {
            color: '#fff'
          },
          backgroundColor: '#f7f7f7',
          borderColor: '#f7f7f7'
        }
      ] : false,
      series: _this.option.series.map((item, key) => {
        return {
          type: 'bar',
          name: item.name,
          stack: item.stack,
          yAxisIndex: item.yAxisIndex,
          barMaxWidth: config.barMaxWidth,
          barGap: config.barGap,
          itemStyle: !config.itemShowIndex.includes(key) && config.itemStyle ? config.itemStyle : {
            normal: {
              barBorderRadius: config.barBorderRadius
            }
          },
          markLine: config.itemShowIndex.includes(key) ? config.markLine : {},
          label: {
            normal: {
              show: config.itemShowIndex.includes(key),
              color: config.labelColor,
              formatter: (params) => {
                if (config.labelFormatter) {
                  return config.labelFormatter(params, config)
                } else {
                  return labelFormatter(params, config)
                }
              },
              rich: config.rich
            }
          },
          data: item.data
        }
      })
    }
    return option
  }

  /*
  *  获取饼图
  */
  getPieChart() {
    const _this = this
    const config = this.config
    const data = this.option.series[0]['data']
    const seriesData = []
    const sum = _.reduce(data, (sum, item) => {
      return !item ? sum : (sum + item.value)
    }, 0)
    data.map((item, key) => {
      if (item && item.value) {
        seriesData.push({
          name: item.name,
          value: item.value || 0,
          percent: item.value ? item.value / sum : 0,
          itemStyle: { normal: { color: (this.config.customColor && this.config.customColor[key]) || this.config.itemStyleColor.pie[key] }}
        })
      }
    })

    const option = {
      backgroundColor: config.backgroundColor || '#fff',
      title: _this.option.title ? [
        {
          show: config.showTitle,
          text: _this.option.title.text || config.text.title,
          x: _.get(config, 'title.x', 20),
          y: _.get(config, 'title.y', 20),
          textStyle: {
            fontSize: _.get(config, 'title.fontSize', 16),
            color: '#181c2b'
          }
        }
      ] : config.text.title,
      tooltip: {
        show: config.showTooltip,
        trigger: 'item',
        color: config.tooltipColor,
        backgroundColor: config.tooltipBackgroundColor,
        textStyle: {
          color: config.tooltipTextColor,
          fontSize: 12
        },
        formatter: params => {
          const fields = config.tooltipFields
          let html = ''
          let title = ''
          fields.forEach(item => {
            const name = params.name
            if (name && !title) title = `${params.marker}${name}<br>`
            if (name) {
              let val = ''
              val = `<em style="color:${config.tooltipHightLightColor};">`
              switch (item.type) {
                case 'normal': val += toThousand(params.data[item.key]) + `</em>` + item.unit; break
                case 'percent': val += toPercent(params.data[item.key], 1) + `</em>`; break
                case 'decimal': val += Number(params.data[item.key]).toFixed(1) + `</em>` + item.unit; break
                default: val += toPercent(params.data[item.key], 1) + `</em>`; break
              }
              html = html + `${item.name}：${val}` + '<br>'
            }
          })
          return title + html
        }
      },
      color: (config.customColor && config.customColor.length) ? config.customColor : color.pie,
      legend: this.option.legend && config.legend.show !== false ? {
        orient: config.legend.orient,
        top: 0,
        left: 0,
        selectedMode: config.selectedMode,
        data: this.option.legend.data.map(item => {
          return {
            name: item ? (item.name || item) : item,
            icon: iconFormatter({ type: 'pie' }, config)
          }
        })
      } : { show: false },
      grid: {
        ...config.grid
      },
      itemStyle: {
        borderWidth: 1,
        borderColor: '#fff'
      },
      series: [
        {
          name: '',
          type: 'pie',
          radius: ['40%', '80%'],
          center: ['50%', '50%'],
          // roseType: 'area',
          label: {
            normal: {
              position: 'inner',
              formatter: (param, config) => {
                return param.data.name + '\n' + (param.data.percent < 0.0495 ? '' : toPercent(param.data.percent, 1))
              },
              textStyle: {
                color: '#fff',
                fontSize: 12
              },
              padding: [3, 4],
              backgroundColor: '#999'
            }
          },
          data: seriesData
        }
      ]
    }
    return option
  }

  /*
  *  获取饼图
  */
  getRadarChart() {
    const _this = this
    const data = _this.option.series[0]['data']
    const config = _this.config

    const option = {
      backgroundColor: '#fff',
      tooltip: {
        show: true,
        trigger: 'item',
        color: config.tooltipColor,
        backgroundColor: config.tooltipBackgroundColor,
        textStyle: {
          color: config.tooltipTextColor,
          fontSize: 12
        },
        formatter: params => {
          const fields = _this.option.polar[0].indicator
          let html = ''
          let title = ''
          fields.forEach((item, key) => {
            const name = params.name
            if (name && !title) title = `${params.marker}${name}<br>`
            if (name) {
              let val = ''
              val = `<em style="color:${config.tooltipHightLightColor};">`
              val += toThousand(params.value[key]) + `</em>`
              html = html + `${item.text}：${val}` + '<br>'
            }
          })
          return title + html
        }
      },
      series: [
        {
          type: 'radar',
          color: config.customColor.length ? config.customColor : color.line[0],
          itemStyle: { normal: { areaStyle: { type: 'default' }}},
          data: [
            {
              value: data[0].value,
              name: data[0].name,
              label: {
                normal: {
                  show: true,
                  color: config.labelColor,
                  formatter: function(params) {
                    return params.value
                  }
                }
              }
            }
          ]
        }
      ],
      polar: [
        {
          indicator: _this.option.polar[0].indicator,
          radius: 60
        }
      ]
    }
    return option
  }

  /**
   * 获取词云
   */
  getWordCloudChart() {
    const _this = this
    const data = _this.option.series[0]['data']
    const config = _this.config

    const option = {
      backgroundColor: '#fff',
      tooltip: _this.option.tooltip,
      series: [
        {
          type: 'wordCloud',
          gridSize: 6,
          shape: 'circle',
          sizeRange: [12, 50],
          width: 600,
          height: 300,
          textStyle: {
            normal: {
              color: function() {
                return 'rgb(' + [
                  Math.round(Math.random() * 160),
                  Math.round(Math.random() * 160),
                  Math.round(Math.random() * 160)
                ].join(',') + ')'
              }
            },
            emphasis: {
              shadowBlur: 10,
              shadowColor: '#333'
            }
          },
          data: data.map(item => {
            return {
              value: item.value,
              name: item.name,
              label: {
                normal: {
                  show: true,
                  color: config.labelColor,
                  formatter: function(params) {
                    return params.value
                  }
                }
              }
            }
          })
        }
      ]
    }
    return option
  }
}
