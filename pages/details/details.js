// page/component/details/details.js
let stid = null;//商品id为空
var app=getApp();
Page({
  data:{
    goods: {
      categoryType: 123,
      createTime: 1583819931000,
      productDescription: "好吃",
      productIcon: "http://www.gdbylm.com/hong/15/sj/index_files/cupid_5d537b1ef6882e727bea05be_default.jpg",
      productId: "1583819931821200110",
      productName: "豆芽",
      productPrice: 4.5,
      productStatus: 0,
      productStock: 972,
      updateTime: 1584103798000,
      stock: '有货',
      parameter: '125g/个',
    },
    num: 1,
    totalNum: 0,
    hasCarts: false,
    curIndex: 0,
    show: false,
    list: []
  },
  onLoad: function(options) {
    let that=this
    let getgoods = that.data.goods
    console.log(getgoods.productName)
    if (options.stid) {
     stid = options.stid;
     console.log("商品id:", stid)
    }
    wx.request({
      url: app.globalData.baseUrl + '/buyer/product/getproduct',
      data: {
        productid: stid,
      },
      success: function(res) {
       console.log(res.data.data.productName);
       that.setData({
        goods: res.data.data,
       })
       console.log(getgoods)
      }
     })
     
    //  this.setData({
    //   goods: res.data.data,
    //  })
  },
  addCount() {
    let num = this.data.num;
    num++;
    this.setData({
      num : num
    })
  },

  addToCart() {
    const self = this;
    const num = this.data.num;
    let total = this.data.totalNum;

    self.setData({
      show: true
    })
    setTimeout( function() {
      self.setData({
        show: false,
        scaleCart : true
      })
      setTimeout( function() {
        self.setData({
          scaleCart: false,
          hasCarts : true,
          totalNum: num + total
        })
      }, 200)
    }, 300)

  },

  bindTap(e) {
    const index = parseInt(e.currentTarget.dataset.index);
  //  console.log(this.data.goods)
    //console.log(getgoods.productName)
    console.log(this.data.curIndex)
    this.setData({
      curIndex: index
    })
    if (index == 1) {
      this.getMyCommentList();
     }
    console.log(this.data.curIndex)
  },
  getMyCommentList(){
    console.log(stid);
    let that = this;
    wx.request({
      url: app.globalData.baseUrl + '/buyer/product/productComment',
      data: {
        productId: stid,
      },
      success: function(res) {
       if (res && res.data && res.data.data && res.data.data.length > 0) {
        let dataList = res.data.data;
        console.log(dataList)
        that.setData({
         list: dataList
        })
       } else {
        that.setData({
         list: []
        })
       }
      }
     })
  }
    
})