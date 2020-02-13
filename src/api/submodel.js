import request from '@/utils/request'

// 1.市场竞争信息
export function getSubmodelCompMarket(params) {
  return request({
    url: '/sales-analysis/submodel-analysis/get-comp-market',
    method: 'post',
    data: {
      data: params
    }
  })
}

// 2.竞争圈竞争格局分析图[气泡图]
export function getSubmodelCompLandscape(params) {
  return request({
    url: '/sales-analysis/submodel-analysis/get-comp-landscape',
    method: 'post',
    data: { data: params }
  })
}

// 3.区域销量信息[分页]
export function getSubmodelRegionSalesPage(params) {
  return request({
    url: '/sales-analysis/submodel-analysis/get-region-sales-page',
    method: 'post',
    data: { data: params }
  })
}

// 4.区域销量信息分布
export function getSubmodelRegionSalesDistribution(params) {
  return request({
    url: '/sales-analysis/submodel-analysis/get-region-sales-distribution',
    method: 'post',
    data: { data: params }
  })
}

// 5.区域销量信息分析图[气泡图]
export function getSubmodelRegionSalesAnalysis(params) {
  return request({
    url: '/sales-analysis/submodel-analysis/get-region-sales-analysis',
    method: 'post',
    data: { data: params }
  })
}

// 6.子车型销量信息
export function getSubmodelSales(params) {
  return request({
    url: '/sales-analysis/submodel-analysis/get-submodel-sales',
    method: 'post',
    data: { data: params }
  })
}

// 7.子车型销量趋势图[柱形图+折线图]
export function getSubmodelSalesTrend(params) {
  return request({
    url: '/sales-analysis/submodel-analysis/get-submodel-sales-trend',
    method: 'post',
    data: { data: params }
  })
}

// 8.市场销量和子车型份额信息
export function getMarketSubmodelShare(params) {
  return request({
    url: '/sales-analysis/submodel-analysis/get-market-submodel-share',
    method: 'post',
    data: { data: params }
  })
}

// 9.市场销量趋势图[柱形图]
export function getModelMarketSalesTrend(params) {
  return request({
    url: '/sales-analysis/submodel-analysis/get-market-sales-trend',
    method: 'post',
    data: { data: params }
  })
}

// 10.市场和子车型(同比/份额)趋势图[折线图]
export function getMarketSubmodelTrend(params) {
  return request({
    url: '/sales-analysis/submodel-analysis/get-market-submodel-trend',
    method: 'post',
    data: { data: params }
  })
}

// 11.竞品市场的销量信息[分页]
export function getSubmodelCompCircleSalesPage(params) {
  return request({
    url: '/sales-analysis/submodel-analysis/get-comp-circle-sales-page',
    method: 'post',
    data: { data: params }
  })
}

// 12.竞品市场的销量趋势[折线图]
export function getSubmodelCompCircleTrend(params) {
  return request({
    url: '/sales-analysis/submodel-analysis/get-comp-circle-trend',
    method: 'post',
    data: { data: params }
  })
}

// 13.获取子车型竞争圈
export function getCompCircle(params) {
  return request({
    url: '/sales-analysis/submodel-analysis/get-comp-circle',
    method: 'post',
    data: {
      data: params
    }
  })
}

// 17.获取默认本品子车型
export function getDefaultSubModel(params) {
  return request({
    url: '/sales-analysis/submodel-analysis/get-default-submodel',
    method: 'post',
    data: {
      data: params
    }
  })
}

// 17.设置默认本品子车型
export function setDefaultSubModel(params) {
  return request({
    url: '/sales-analysis/submodel-analysis/set-default-submodel',
    method: 'post',
    data: {
      data: params
    }
  })
}

// 14.保存子车型竞争圈
export function saveCompCircle(params) {
  return request({
    url: '/sales-analysis/submodel-analysis/save-comp-circle',
    method: 'post',
    data: {
      data: params
    }
  })
}

// 15.设置默认子车型竞争圈
export function setDefaultCompCircle(params) {
  return request({
    url: '/sales-analysis/submodel-analysis/set-default-comp-circle',
    method: 'post',
    data: {
      data: params
    }
  })
}
