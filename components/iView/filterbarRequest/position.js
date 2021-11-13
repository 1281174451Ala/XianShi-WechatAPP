const typeData = {
  value: '2',
  label: '类型',
  children: [{
    value: '0',
    label: '不限'
  }, {
    value: '1',
    label: '委托'
  }, {
    value: '2',
    label: '问答'
  }, {
    value: '3',
    label: '交易'
  }]
}

const radioData = {
  value: '2',
  label: '类型',
  children: [{
    value: '0',
    label: '不限'
  }, {
    value: '1',
    label: '委托'
  }, {
    value: '2',
    label: '问答'
  }, {
    value: '3',
    label: '交易'
  }]
}

const sortData = {
  value: '3',
  label: '排序',
  children: [{
    value: '0',
    label: '最新发布'
  }, {
    value: '1',
    label: '价格升序'
  }, {
    value: '2',
    label: '价格降序'
  }, {
    value: '3',
    label: '距离最近'
  }]
}

const multiData = {
  label: '筛选',
  children: [{
      value: '4',
      label: '学历',
      children: [{
          value: '0',
          label: '不限'
        }, {
          value: '1',
          label: '高中及以下'
        }, {
          value: '2',
          label: '大专'
        },
        {
          value: '3',
          label: '本科'
        }, {
          value: '4',
          label: '硕士'
        }, {
          value: '5',
          label: '博士'
        }
      ]
    },
    {
      value: '5',
      label: '规模',
      children: [{
          value: '0',
          label: '不限',
        }, {
          value: '1',
          label: '0-50人'
        }, {
          value: '2',
          label: '50-100人'
        },
        {
          value: '3',
          label: '100-500人'
        }, {
          value: '4',
          label: '500-1000人'
        }, {
          value: '5',
          label: '1000人以上'
        }
      ]
    },
    {
      value: '6',
      label: '薪资',
      children: [{
        value: '0',
        label: '不限'
      }, {
        value: '1',
        label: '5k以下'
      }, {
        value: '2',
        label: '5K~10K'
      }, {
        value: '3',
        label: '10K以上'
      }]
    },
    {
      value: '7',
      label: '工作经验',
      children: [{
          value: '0',
          label: '不限'
        }, {
          value: '1',
          label: '应届'
        }, {
          value: '2',
          label: '1年以下'
        },
        {
          value: '3',
          label: '1-3年'
        }, {
          value: '4',
          label: '3-5年'
        }, {
          value: '5',
          label: '5-10年'
        }, {
          value: '6',
          label: '10年以上'
        }
      ]
    }
  ]
}

module.exports = {
  typeData: typeData,
  radioData: radioData,
  sortData: sortData,
  multiData: multiData
}