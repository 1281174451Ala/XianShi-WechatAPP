// component/Tabs/Tabs.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        // 接收父组件的属性，并设置默认值为空“”
        tabs:{
            type:Array,
            value:[]
        }
        },

    /**
     * 组件的初始数据
     */
    data:{},

    /**
     * 组件的方法列表
     */
    methods: {
        handleItemTap(e){
            const {index}=e.currentTarget.dataset;//获取索引，知道了索引就知道了这次点击来自哪个item
            //通过绑定itemChange，子组件向父组件传递数据index，父组件自己用逻辑处理数据
            this.triggerEvent('itemChange',{index});
            // let tabs=this.data.tabs;//获取数组
            // //[].forEach(v,i)表示数组的遍历，v是每一项（item），i是索引（index），v的修改会作用到原数组上
            // tabs.forEach((v,i)=>v.isActive=(i===index));
            // this.setData({
            //     tabs//将新的数组返回
            // });
        }
    }
})
