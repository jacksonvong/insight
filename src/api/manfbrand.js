import request from '@/utils/request'

// 13.获取厂商品牌竞争圈
export function getCompCircle(params) {
  return request({
    url: '/sales-analysis/manfbrand-analysis/get-comp-circle',
    method: 'post',
    data: {
      data: params
    }
  })
}

// 18.获取默认使用的厂商品牌
export function getDefaultManfBrand(params) {
  return request({
    url: '/sales-analysis/manfbrand-analysis/get-default-manf-brand',
    method: 'post',
    data: {
      data: params
    }
  })
}

// 17.设置默认使用的厂商品牌
export function setDefaultManfBrand(params) {
  return request({
    url: '/sales-analysis/manfbrand-analysis/set-default-manf-brand',
    method: 'post',
    data: {
      data: params
    }
  })
}

// 14.保存厂商品牌竞争圈
export function saveCompCircle(params) {
  return request({
    url: '/sales-analysis/manfbrand-analysis/save-comp-circle',
    method: 'post',
    data: {
      data: params
    }
  })
}

// 15.设置默认厂商品牌竞争圈
export function setDefaultCompCircle(params) {
  return request({
    url: '/sales-analysis/manfbrand-analysis/set-default-comp-circle',
    method: 'post',
    data: {
      data: params
    }
  })
}
