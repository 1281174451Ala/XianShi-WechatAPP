Component({
    externalClasses: ['i-class'],

    options: {
        multipleSlots: true
    },

    properties: {
        full: {
            type: Boolean,
            value: false
        },
        thumb: {
            type: String,
            value: ''
        },
        title: {
            type: String,
            value: ''
        },
        extra: {
            type: String,
            value: ''
        },
        price: {
            type: String,
            value: '',
            observer: 'updatePrice',
        },
        other:{
            type: String,
            value: ''
        }
    },

    methods: {
        updatePrice() {
            const { price } = this.data;
            const priceArr = price.toString().split('.');
            this.setData({
                integerStr: priceArr[0],
                decimalStr: priceArr[1] ? `.${priceArr[1]}` : '',
            });
        },
        onClickThumb() {
            this.jumpLink('thumbLink');
        },
    }
});
