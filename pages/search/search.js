let timeId = null;
Page({
    data: {
        history: [],
        hot: ['豆芽', '红烧牛肉', '麻婆豆腐'],
        result: [
            {
                id: 1,
                url: '../details/details',
                thumb: '/image/s4.png',
                title: '瓜子 100g',
                price: 0.01
            },
            {
                id: 2,
                url: '../details/details',
                thumb: '/image/s5.png',
                title: '新鲜芹菜 500g',
                price: 0.02
            }
        ],
        showKeywords: false,
   //     keywords: ['山东肚脐橙', '湖南冰糖橙', '麻涌香蕉', '冰糖心苹果'],
        value: '',
        showResult: false,
    },
    cancelSearch() {
        console.log(this.data.value)
    
            var storid= this.data.value;
             
             console.log(storid) 
            // console.log(menu_list)
             let that = this;
             that.goTodeta(storid)
          
        },
         goTodeta(storid)  {
             console.log('商品')
                 wx.navigateTo({
                  url: '../buy/buy?storid=' + storid
                 })
                
         },
        // this.setData({
        //     showResult: false,
        //     showKeywords: false,
        //     value: ''
        // })
    
    searchInput(e) {
        this.setData({
            //     showResult: false,
            //     showKeywords: false,
                 value: e.detail.value
             })
    },
    keywordHandle(e) {
        const text = e.target.dataset.text;
        this.setData({
            value: text,
        })
        this.historyHandle(text);
    },
    historyHandle(value) {
        let history = this.data.history;
        const idx = history.indexOf(value);
        if (idx === -1) {
            // 搜索记录只保留8个
            if (history.length > 7) {
                history.pop();
            }
        } else {
            history.splice(idx, 1);
        }
        history.unshift(value);
        wx.setStorageSync('history', JSON.stringify(history));
        this.setData({
            history
        });
    },
    onLoad() {
        const history = wx.getStorageSync('history');
        if (history) {
            this.setData({
                history: JSON.parse(history)
            })
            console.log(this.data.history);
        }
    }
})