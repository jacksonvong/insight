import request from '@/utils/request'

export function getTop10(params) {
  return request({
    url: '/consumer-insight/old-car/get-top10',
    method: 'post',
    data: {
      data: params
    }
  })
}

export function getMileage(params) {
  return request({
    url: '/consumer-insight/old-car/get-mileage',
    method: 'post',
    data: {
      data: params
    }
  })
}

export function getUsedCar(params) {
  return request({
    url: '/consumer-insight/old-car/get-used-car',
    method: 'post',
    data: {
      data: params
    }
  })
}

export function getDealMethods(params) {
  return request({
    url: '/consumer-insight/old-car/get-deal-methods',
    method: 'post',
    data: {
      data: params
    }
  })
}

export function getBar(params) {
  return request({
    url: '/consumer-insight/old-car/get-bar',
    method: 'post',
    data: {
      data: params
    }
  })
}

