import request from '@/utils/request'

export function getSex(params) {
  return request({
    url: '/consumer-insight/user-background/get-sex',
    method: 'post',
    data: {
      data: params
    }
  })
}

export function getFamily(params) {
  return request({
    url: '/consumer-insight/user-background/get-family',
    method: 'post',
    data: {
      data: params
    }
  })
}

export function getIndustry(params) {
  return request({
    url: '/consumer-insight/user-background/get-industry',
    method: 'post',
    data: {
      data: params
    }
  })
}

export function getPosition(params) {
  return request({
    url: '/consumer-insight/user-background/get-position',
    method: 'post',
    data: {
      data: params
    }
  })
}

export function getIncome(params) {
  return request({
    url: '/consumer-insight/user-background/get-income',
    method: 'post',
    data: {
      data: params
    }
  })
}

export function getValue(params) {
  return request({
    url: '/consumer-insight/user-background/get-value',
    method: 'post',
    data: {
      data: params
    }
  })
}

