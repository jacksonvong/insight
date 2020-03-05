import request from '@/utils/request'

export function getContactOrder(params) {
  return request({
    url: '/consumer-insight/comp-compare/get-contact-order',
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

export function getCompTop15(params) {
  return request({
    url: '/consumer-insight/comp-compare/get-comp-top15',
    method: 'post',
    data: {
      data: params
    }
  })
}

export function getCompCross(params) {
  return request({
    url: '/consumer-insight/comp-compare/get-comp-cross',
    method: 'post',
    data: {
      data: params
    }
  })
}

