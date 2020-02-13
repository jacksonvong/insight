const fs = require('fs')

function fromJSONFile(filename) {
  return (req, res) => {
    const data = fs.readFileSync(`mock/data/${filename}.json`).toString()
    const json = JSON.parse(data)
    return res.json(json)
  }
}
const proxy = {
  'POST /api/sales-analysis/common-option/get-dimension': fromJSONFile('common-option/get-dimension'),
  'POST /api/sales-analysis/common-option/get-datasource-and-time': fromJSONFile('common-option/get-datasource-and-time'),
  'POST /api/sales-analysis/manfbrand-analysis/get-default-manf-brand': fromJSONFile('manfbrand-analysis/get-default-manfbrand'),
  'POST /api/sales-analysis/submodel-analysis/get-default-submodel': fromJSONFile('submodel-analysis/get-default-submodel'),
  'POST /api/sales-analysis/common-option/get-manfbrand': fromJSONFile('common-option/get-manfbrand'),
  'POST /api/sales-analysis/common-option/get-submodel': fromJSONFile('common-option/get-submodel'),
  'POST /api/sales-analysis/submodel-analysis/get-comp-circle': fromJSONFile('submodel-analysis/get-comp-circle'),
  'POST /api/sales-analysis/manfbrand-analysis/get-comp-circle': fromJSONFile('manfbrand-analysis/get-comp-circle'),

  'POST /api/framework/getWordCloud': fromJSONFile('getWordCloud'),
  'POST /api/framework/getBubble': fromJSONFile('getBubble'),

  // 整体市场分析
  'POST /api/sales-analysis/market-overview/submodel-rank-': fromJSONFile('market-overview/get-submodel-rank')
}
module.exports = proxy
