const positionData = require('position.js')

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    mode: {
      type: String,
      value: ''
    },
    top: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 显示控制，false不显示，true显示下拉列表
    type: false,
    radio: false,
    sort: false,
    multi: false,
    // 筛选栏的数据来源
    typeData: {},
    radioData: {},
    sortData: {},
    multiData: {},
    typeSelected: '0',
    radioSelected: '0',
    sortSelected: '0',
    multiSelected: [],
    // 返回筛选下来的参数对象数组
    selectedArray: []
  },

  /**
   * 组件生命周期
   */
  attached() {
    if (this.properties.mode === 'position') {
      this.setData({
        typeData: positionData.typeData,
        radioData: positionData.radioData,
        sortData: positionData.sortData,
        multiData: positionData.multiData
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 第一项类型的下拉列表激活（同时隐藏其他的下拉列表）
    onTypeActive: function(e) {
      this.setData({
        type: !this.data.type,//取反，点一下打开，再点一下关闭
        radio: false,
        sort: false,
        multi: false
      })
    },
    // 第二项单选的下拉列表的激活
    onRadioActive: function(e) {
      this.setData({
        type: false,
        radio: !this.data.radio,//取反，点一下打开，再点一下关闭
        sort: false,
        multi: false
      })
    },
    // 第三项的排序的下拉列表的激活
    onSortActive: function(e) {
      this.setData({
        type: false,
        radio: false,
        sort: !this.data.sort,//取反，点一下打开，再点一下关闭
        multi: false
      })
    },
    // 第四项的筛选下拉列表的激活
    onMultiActive: function(e) {
      this.setData({
        type: false,
        radio: false,
        sort: false,
        multi: !this.data.multi//取反，点一下打开，再点一下关闭
      })
    },
    // 向数组添加唯一参数（小程序没有集合set对象）
    addUnique2Array: function(array, args) {
      const _args = args.target ? args.target.dataset : args
      const value = _args.group.value + ':' + _args.item.value
      const label = _args.group.label + ':' + _args.item.label
      let flag = false
      for (let i = 0; i < array.length; i++) {
        const group = value.split(':')[0]
        const arrayGroup = array[i].value.split(':')[0]
        // 找到该组
        if (arrayGroup === group) {
          array[i].value = value
          array[i].label = label
          flag = true
        }
      }
      if (!flag) {
        array.push({
          value: value,
          label: label
        })
      }
    },
 
     // 单选
     onType: function(e) {
      this.closeFilter()
      this.setData({
        typeSelected: e.target.dataset.item.value
      })
      this.addUnique2Array(this.data.selectedArray, e)
      this.triggerEvent('confirm', {
        selectedArray: this.data.selectedArray
      })
    },

    // 单选
    onRadio: function(e) {
      this.closeFilter()
      this.setData({
        radioSelected: e.target.dataset.item.value
      })
      this.addUnique2Array(this.data.selectedArray, e)
      this.triggerEvent('confirm', {
        selectedArray: this.data.selectedArray
      })
    },
    // 排序
    onSort: function(e) {
      this.closeFilter()
      this.setData({
        sortSelected: e.target.dataset.item.value
      })
      this.addUnique2Array(this.data.selectedArray, e)
      this.triggerEvent('confirm', {
        selectedArray: this.data.selectedArray
      })
    },
    // 多项筛选
    onMultiChange: function(e) {
      this.addUnique2Array(this.data.multiSelected, {
        group: {
          value: e.target.dataset.group.value,
          label: e.target.dataset.group.label
        },
        item: {
          value: e.target.dataset.item.value,
          label: e.target.dataset.item.label
        }
      })
      this.setData({
        multiSelected: this.data.multiSelected
      })
      this.addUnique2Array(this.data.selectedArray, e)
      this.triggerEvent('multiChange', {
        selectedArray: this.data.selectedArray
      })
    },
    onMultiReset: function() {},
    onMultiConfirm: function() {
      this.closeFilter()
      this.triggerEvent('confirm', {
        selectedArray: this.data.selectedArray
      })
    },
    // 关闭筛选
    closeFilter: function() {
      this.setData({
        type: false,
        radio: false,
        sort: false,
        multi: false,
      })
    },
  }
})