import request from '@/utils/request'

export function getSex(params) {
  return request({
    url: '/consumer-insight/board/get-sex',
    method: 'post',
    data: {
      data: params
    }
  })
}

export function getAge(params) {
  return request({
    url: '/consumer-insight/board/get-age',
    method: 'post',
    data: {
      data: params
    }
  })
}

export function getEducation(params) {
  return request({
    url: '/consumer-insight/board/get-education',
    method: 'post',
    data: {
      data: params
    }
  })
}

export function getMedia(params) {
  return request({
    url: '/consumer-insight/board/get-media',
    method: 'post',
    data: {
      data: params
    }
  })
}

export function getReason(params) {
  return request({
    url: '/consumer-insight/board/get-reason',
    method: 'post',
    data: {
      data: params
    }
  })
}

