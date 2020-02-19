import request from '@/utils/request'

export function getPurchaseData(params) {
  return request({
    url: '/insight/overview/get-purchase-data',
    method: 'post',
    data: {
      data: params
    }
  })
}

export function getSubModelData(params) {
  return request({
    url: '/insight/overview/get-submodel-data',
    method: 'post',
    data: {
      data: params
    }
  })
}

export function getCityData(params) {
  return request({
    url: '/insight/overview/get-city-data',
    method: 'post',
    data: {
      data: params
    }
  })
}
