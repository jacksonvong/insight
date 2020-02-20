import request from '@/utils/request'

export function getPurchaseData(params) {
  return request({
    url: '/consumer-insight/overview/get-purchase-data',
    method: 'post',
    data: {
      data: params
    }
  })
}

export function getSubModelData(params) {
  return request({
    url: '/consumer-insight/overview/get-submodel-data',
    method: 'post',
    data: {
      data: params
    }
  })
}

export function getCityData(params) {
  return request({
    url: '/consumer-insight/overview/get-city-data',
    method: 'post',
    data: {
      data: params
    }
  })
}

export function getAllFunctions(params) {
  return request({
    url: '/consumer-insight/overview/get-all-functions',
    method: 'post',
    data: {
      data: params
    }
  })
}

export function applyBuy(params) {
  return request({
    url: '/consumer-insight/overview/apply-buy',
    method: 'post',
    data: {
      data: params
    }
  })
}
