import request from '@/utils/request'

export function getSex(params) {
  return request({
    url: '/consumer-insight/common-echart/get-echart-option',
    method: 'post',
    data: {
      data: {
        key: 'SEX_ID',
        ...params
      }
    }
  })
}

export function getAge(params) {
  return request({
    url: '/consumer-insight/common-echart/get-echart-option',
    method: 'post',
    data: {
      data: {
        key: 'NCBS_AGE_ID',
        ...params
      }
    }
  })
}

export function getEducation(params) {
  return request({
    url: '/consumer-insight/common-echart/get-echart-option',
    method: 'post',
    data: {
      data: {
        key: 'QUALIFICATIONS_ID',
        ...params
      }
    }
  })
}

export function getFamily(params) {
  return request({
    url: '/consumer-insight/common-echart/get-echart-option',
    method: 'post',
    data: {
      data: {
        key: 'MARRIAGE_ID',
        ...params
      }
    }
  })
}

export function getIndustry(params) {
  return request({
    url: '/consumer-insight/common-echart/get-echart-option',
    method: 'post',
    data: {
      data: {
        key: 'INDUSTRY_ID',
        ...params
      }
    }
  })
}

export function getPosition(params) {
  return request({
    url: '/consumer-insight/common-echart/get-echart-option',
    method: 'post',
    data: {
      data: {
        key: 'OCCUPATION_ID',
        ...params
      }
    }
  })
}

export function getIncome(params) {
  return request({
    url: '/consumer-insight/common-echart/get-echart-option',
    method: 'post',
    data: {
      data: {
        key: 'INCOME_ID',
        ...params
      }
    }
  })
}

export function getValue(params) {
  return request({
    url: '/consumer-insight/common-echart/get-echart-option',
    method: 'post',
    data: {
      data: {
        key: '10110',
        ...params
      }
    }
  })
}

export function getHomeCarNumber(params) {
  return request({
    url: '/consumer-insight/common-echart/get-echart-option',
    method: 'post',
    data: {
      data: {
        key: '20889',
        ...params
      }
    }
  })
}

export function getDetailCar(params) {
  return request({
    url: '/consumer-insight/common-echart/get-echart-option',
    method: 'post',
    data: {
      data: {
        key: '20889',
        ...params
      }
    }
  })
}
