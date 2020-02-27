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

