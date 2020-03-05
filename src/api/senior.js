import request from '@/utils/request'

const getModuls = function(params) {
  return request({
    url: '/consumer-insight/query-analy/index-list',
    method: 'post',
    data: {
      data: params
    }
  })
}

export default {
  getModuls
}
