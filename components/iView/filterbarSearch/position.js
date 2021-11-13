const typeData = {
  value: '0',
  label: '类型',
  children: [{
    value: '0',
    label: '委托'
  }, {
    value: '1',
    label: '问答'
  }, {
    value: '2',
    label: '交易'
  }]
}

const objectData = {
  value: '1',
  label: '搜索对象',
  children: [{
    value: '0',
    label: '标题'
  }, {
    value: '1',
    label: '内容'
  }, {
    value: '2',
    label: '不限'
  }]
}

module.exports = {
  typeData: typeData,
  objectData: objectData
}