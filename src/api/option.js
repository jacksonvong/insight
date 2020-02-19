import request from '@/utils/request'

// POST 2.获取数据源和时间
export function getTimeRange(params) {
  return request({
    url: '/consumer-insight/common/get-time-range',
    method: 'post',
    data: {
      data: params
    }
  })
}

// 4.获取生产商品牌信息
export function getBrand(params) {
  return request({
    url: '/consumer-insight/common/get-brands',
    method: 'post',
    data: {
      data: params
    }
  })
}

// 6.系别选项
export function getBrandNatis(params) {
  return request({
    url: '/consumer-insight/common/get-brand-natis',
    method: 'post',
    data: {
      data: params
    }
  })
}

// 1.获取维度信息
export function getDimension(params) {
  return request({
    url: '/consumer-insight/common/get-dimensions',
    method: 'post',
    data: {
      data: params
    }
  })
}

// 1.获取城市等级信息
export function getCityLevel(params) {
  return request({
    url: '/consumer-insight/common/get-city-levels',
    method: 'post',
    data: {
      data: params
    }
  })
}

// 1.获取模块信息
export function getModule(params) {
  return request({
    url: '/consumer-insight/common/get-modules',
    method: 'post',
    data: {
      data: params
    }
  })
}

// 6.细分市场选项
export function getSegment(params) {
  return request({
    url: '/consumer-insight/common/get-segments',
    method: 'post',
    data: {
      data: params
    }
  })
}

// 3.获取子车型信息
export function getSubModel(params) {
  return request({
    url: '/consumer-insight/common/get-submodels',
    method: 'post',
    data: {
      data: params
    }
  })
}

// 3.获取子车型信息
export function getFuelType(params) {
  return request({
    url: '/consumer-insight/common/get-fuel-types',
    method: 'post',
    data: {
      data: params
    }
  })
}

// 3.获取子车型信息
export function getVehicleType(params) {
  return request({
    url: '/consumer-insight/common/get-vehicle-types',
    method: 'post',
    data: {
      data: params
    }
  })
}

