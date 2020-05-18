//index.js
const app = getApp()

Page({
 data: {
  //轮播图图片路径
  // banner: [
  //  '/image/1.jpg', '/image/2.jpg', '/image/3.jpg'
  // ],
  banner: [
    {
      link: '/pages/index/index',
      url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567765156754&di=5592b8eedce5bf82b9c8802814734b9d&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fblog%2F201307%2F30%2F20130730104030_dHEML.jpeg'
    }, {
      link: '/pages/index/index',
      url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567765156753&di=ad890c8d0043c2c05d4518973da517b7&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fblog%2F201510%2F20%2F20151020195245_yU82G.jpeg'
    }, {
      link: '/pages/index/index',
      url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567765156753&di=7eaed84e521480d661328a6bc362af9c&imgtype=0&src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fphotoblog%2F1406%2F20%2Fc2%2F35489246_1403250875219_mthumb.jpg'
    }
  ],
  indicatorDots: true,  //小点
  autoplay: true,  //是否自动轮播
    interval: 3000,  //间隔时间
    duration: 8000,  //滑动时间
 },
//限制登陆
onLoad: function(options) {
  let that=this
  let userInfo = app.globalData.userInfo;
  if (!userInfo || !userInfo.nickName) {
   wx.showModal({
    title: '请登录',
    content: '请到个人中心登录',
    showCancel: false, //去掉取消按钮
    success: function(res) {
     if (res.confirm) {
      wx.switchTab({
       url: '../me/me',
      })
     }
    }
   })
   return;
  }
},
 

 //
 btnclick1: function() {
  let that = this;
  that.goToBuy("1号桌")
  
 },
 //去点餐页
 goToBuy(tableNum) {
  wx.navigateTo({
   url: '../buy/buy?tableNum=' + tableNum
  })
 },

 //菜品浏览
 btnclick2: function() {
  wx.navigateTo({
   url: '../buy/buy'
  })
 },

 //电话订座
 btnclick3: function() {
  wx.navigateTo({
    url: '../change/change'
   })
 },
 onLoad(){
  this.getTopBanner();
 },
 btnclick4: function() {
  wx.showModal({
    title: '公告',
    content: '凡在本店消费满20赠送饮料一瓶',
    showCancel: true, //去掉取消按钮
    success: function(res) {
     
    }
   })
 },
 
 getTopBanner(){
  let that=this;
  wx.request({
   url: app.globalData.baseUrl + '/picture/getAll',
   success: function (res) {
    if (res && res.data && res.data.data && res.data.data.length > 0) {
     let dataList = res.data.data;
     console.log(dataList)
     that.setData({
      banner: dataList
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