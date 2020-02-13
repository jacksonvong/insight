import request from '@/utils/request'

export function checkHealth() { // 检查接口是否健康
  return request({
    url: '/reward-tool/health',
    method: 'get'
  })
}

export function sendMail(params) {
  return request({
    url: '/message/message/sendError',
    method: 'post',
    data: {
      data: params
    }
  })
}

export function getFeedbackData() {
  return request({
    url: '/iways-front/freeback/getUnreadCount',
    method: 'get'
  })
}

export function getWordCloud(params) {
  return request({
    url: '/framework/getWordCloud',
    method: 'post',
    data: {
      data: params
    }
  })
}

export function getBubble(params) {
  return request({
    url: '/framework/getBubble',
    method: 'post',
    data: {
      data: params
    }
  })
}
