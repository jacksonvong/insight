import request from '@/utils/request'

// 1.获取维度信息
export function getDimension(params) {
  return request({
    url: '/sales-analysis/common-option/get-dimension',
    method: 'post',
    data: {
      data: params
    }
  })
}

// POST 2.获取数据源和时间
export function getDataSourceAndTime(params) {
  return request({
    url: '/sales-analysis/common-option/get-datasource-and-time',
    method: 'post',
    data: {
      data: params
    }
  })
}

// 3.获取子车型信息
export function getSubModel(params) {
  return request({
    url: '/sales-analysis/common-option/get-submodel',
    method: 'post',
    data: {
      data: params
    }
  })
}

// 4.获取生产商品牌信息
export function getManfbrand(params) {
  return request({
    url: '/sales-analysis/common-option/get-manfbrand',
    method: 'post',
    data: {
      data: params
    }
  })
}

// 6.细分市场选项
export function getSegment(params) {
  return request({
    url: '/sales-analysis/common-option/segment',
    method: 'post',
    data: {
      data: params
    }
  })
}
