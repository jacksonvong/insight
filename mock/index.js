const fs = require('fs')

function fromJSONFile(filename) {
  return (req, res) => {
    console.log(req)
    const data = fs.readFileSync(`mock/data/${filename}.json`).toString()
    const json = JSON.parse(data)
    return res.json(json)
  }
}
const proxy = {
  'POST /api/sales-analysis/manfbrand-analysis/get-default-manf-brand': fromJSONFile('manfbrand-analysis/get-default-manfbrand'),
  'POST /api/sales-analysis/submodel-analysis/get-default-submodel': fromJSONFile('submodel-analysis/get-default-submodel'),
  'POST /api/sales-analysis/submodel-analysis/get-comp-circle': fromJSONFile('submodel-analysis/get-comp-circle'),
  'POST /api/sales-analysis/manfbrand-analysis/get-comp-circle': fromJSONFile('manfbrand-analysis/get-comp-circle'),
  'POST /api/framework/getWordCloud': fromJSONFile('getWordCloud'),
  'POST /api/framework/getBubble': fromJSONFile('getBubble'),

  // 整体市场分析
  'POST /api/consumer-insight/common/get-brand-natis': fromJSONFile('common-option/get-brand-natis'),
  'POST /api/consumer-insight/common/get-brands': fromJSONFile('common-option/get-brands'),
  'POST /api/consumer-insight/common/get-city-levels': fromJSONFile('common-option/get-city-levels'),
  'POST /api/consumer-insight/common/get-dimensions': fromJSONFile('common-option/get-dimension'),
  'POST /api/consumer-insight/common/get-fuel-types': fromJSONFile('common-option/get-fuel-types'),
  'POST /api/consumer-insight/common/get-modules': fromJSONFile('common-option/get-modules'),
  'POST /api/consumer-insight/common/get-segments': fromJSONFile('common-option/get-segments'),
  'POST /api/consumer-insight/common/get-submodels': fromJSONFile('common-option/get-submodels'),
  'POST /api/consumer-insight/common/get-time-range': fromJSONFile('common-option/get-time-range'),
  'POST /api/consumer-insight/common/get-vehicle-types': fromJSONFile('common-option/get-vehicle-types'),

  'POST /api/consumer-insight/overview/get-purchase-data': fromJSONFile('overview/get-purchase-data'),
  'POST /api/consumer-insight/overview/get-all-functions': fromJSONFile('overview/get-all-functions'),
  'POST /api/consumer-insight/overview/apply-buy': fromJSONFile('overview/apply-buy'),
  'POST /api/consumer-insight/overview/get-submodel-data': fromJSONFile('overview/get-submodel-data'),
  'POST /api/consumer-insight/overview/get-city-data': fromJSONFile('overview/get-city-data'),

  'POST /api/consumer-insight/board/get-sex': fromJSONFile('board/get-sex'),
  'POST /api/consumer-insight/board/get-age': fromJSONFile('board/get-age'),
  'POST /api/consumer-insight/board/get-education': fromJSONFile('board/get-education'),
  'POST /api/consumer-insight/board/get-media': fromJSONFile('board/get-media'),
  'POST /api/consumer-insight/board/get-reason': fromJSONFile('board/get-reason'),

  'POST /api/consumer-insight/compete/get-info-media': fromJSONFile('compete/get-info-media'),
  'POST /api/consumer-insight/compete/get-select-reason': fromJSONFile('compete/get-select-reason'),
  'POST /api/consumer-insight/compete/get-bubble': fromJSONFile('compete/get-bubble2'),

  'POST /api/consumer-insight/user-background/get-sex': fromJSONFile('user-character/user-background/get-sex'),
  'POST /api/consumer-insight/user-background/get-family': fromJSONFile('user-character/user-background/get-family'),
  'POST /api/consumer-insight/user-background/get-industry': fromJSONFile('user-character/user-background/get-industry'),
  'POST /api/consumer-insight/user-background/get-position': fromJSONFile('user-character/user-background/get-position'),
  'POST /api/consumer-insight/user-background/get-income': fromJSONFile('user-character/user-background/get-income'),
  'POST /api/consumer-insight/user-background/get-value': fromJSONFile('user-character/user-background/get-value'),

  'POST /api/consumer-insight/user-preference/get-reason': fromJSONFile('user-character/user-preference/get-reason'),
  'POST /api/consumer-insight/user-preference/get-detail-reason': fromJSONFile('user-character/user-preference/get-detail-reason'),
}
module.exports = proxy
