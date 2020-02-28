import request from '@/utils/request'

export function getReason(params) {
  return request({
    url: '/consumer-insight/common-echart/get-echart-option',
    method: 'post',
    data: {
      data: {
        key: '10094',
        ...params
      }
    }
  })
}

export function getDetailReason(params, key) {
  return request({
    url: '/consumer-insight/common-echart/get-echart-option',
    method: 'post',
    data: {
      data: {
        key: key,
        ...params
      }
    }
  })
}
