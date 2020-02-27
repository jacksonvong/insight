import request from '@/utils/request'

export function getEchartOption(params) {
  return request({
    url: '/consumer-insight/common-echart/get-echart-option',
    method: 'post',
    data: {
      data: params
    }
  })
}

