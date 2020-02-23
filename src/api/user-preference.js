import request from '@/utils/request'

export function getReason(params) {
  return request({
    url: '/consumer-insight/user-preference/get-reason',
    method: 'post',
    data: {
      data: params
    }
  })
}

export function getDetailReason(params) {
  return request({
    url: '/consumer-insight/user-preference/get-detail-reason',
    method: 'post',
    data: {
      data: params
    }
  })
}
