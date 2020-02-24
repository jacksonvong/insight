import request from '@/utils/request'

export function getInfoMedia(params) {
  return request({
    url: '/consumer-insight/compete/get-info-media',
    method: 'post',
    data: {
      data: params
    }
  })
}

export function getSelectReason(params) {
  return request({
    url: '/consumer-insight/compete/get-select-reason',
    method: 'post',
    data: {
      data: params
    }
  })
}

export function getBubble(params) {
  return request({
    url: '/consumer-insight/compete/get-bubble',
    method: 'post',
    data: {
      data: params
    }
  })
}
