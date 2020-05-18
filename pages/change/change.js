const app = getApp();

Page({
 //页面的初始数据
 data: {
  username: '',
  phone: '',
  zhuohao: '',
  renshu: '',
  isShowComment: false, 
  list: [
     
  ],
  cartime:[

  ],
 },
 
 bindinputusername: function(e) {
  this.setData({
   username: e.detail.value
  })
 },

 bindinputphone: function(e) {
  this.setData({
   phone: e.detail.value
  })
 },

 bindinputzhuohao: function(e) {
  this.setData({
   zhuohao: e.detail.value
  })
 },
 bindinputrenshu: function(e) {
  this.setData({
   renshu: e.detail.value
  })
 },


 //修改个人信息
//  formSubmit: function() {
//   var that = this;
//   //如果openid不存在，就重新请求接口获取openid
//   var openid = app.globalData.userInfo.nickName;
//   if (openid === 0 || openid === undefined) {
//    app.getOpenid();
//    wx.showToast({ //这里提示失败原因
//     title: '您还没有登陆！',
//     duration: 1500
//    })
//    return;
//   }

//   let username = that.data.username;
//   let phone = that.data.phone;
//   let zhuohao = that.data.zhuohao;
//   let renshu = that.data.renshu;

//   if (username === '') {
//    wx.showToast({
//     title: '用户名不能为空',
//     icon: 'none'
//    })
//    return;
//   }
//   if (phone === '') {
//    wx.showToast({
//     title: '手机号不能为空',
//     icon: 'none'
//    })
//    return;
//   }


//   wx.request({
//    url: app.globalData.baseUrl + '/user/save',
//    method: "POST",
//    header: {
//     "Content-Type": "application/x-www-form-urlencoded"
//    },
//    data: {
//     openid: openid,
//     username: username,
//     phone: phone,
//     zhuohao: zhuohao,
//     renshu: renshu
//    },
//    success: function(res) {
//     wx.showToast({
//      title: '修改成功',
//     })
//     app._getMyUserInfo();
//     wx.switchTab({
//      url: '../index/index'
//     })
//    }
//   })

//  },

 //生命周期函数--监听页面加载
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
  
 
  console.log("zzzz")
  
    //请求自己心愿菜单
  wx.request({
   url: app.globalData.baseUrl + '/wishMenu/list',
   data:{
    nickname: app.globalData.userInfo.nickName,
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
 },
 //点赞
//  zan(e){
//    let userInfo = app.globalData.userInfo;
//    if (!userInfo || !userInfo.nickName) {
//     wx.showModal({
//      title: '请登录',
//      content: '请到个人中心登录',
//      showCancel: false, //去掉取消按钮
//      success: function(res) {
//       if (res.confirm) {
//        wx.switchTab({
//         url: '../me/me',
//        })
//       }
//      }
//     })
//     return;
//    }
//    var muid= e.currentTarget.dataset.id;
//    var status= e.currentTarget.dataset.status;
//    status=1
//    console.log(muid);
//    console.log(status)
//    console.log(e.currentTarget.dataset.status)
//    wx.request({
//       url: app.globalData.baseUrl + '/wishMenu/giveLike',
//       data:{
//          nickname:app.globalData.userInfo.nickName,
//           menuId: muid,
//           likeStatus:status
//       },
//       success: function(res) {
//        if (res && res.data && res.data.data && res.data.data.length > 0) {
//         let dataList = res.data.data;
//         console.log(dataList)
//         console.log('zan')
//       //  that.setData({
//         // list: dataList
//       //  })
//        }
//       }
//    })
//  },
/**zan
* 点赞yi
*/
// 点赞
yizan(e) {
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
   console.log(e);
   let id = e.currentTarget.dataset.id
   let index = e.currentTarget.dataset.index
   console.log(index, this.data.list[index]);
   let list = this.data.list
   
//  like_status=0 是未点赞    1是点赞
   if (list[index].like_status == 0) {
    console.log("dian")
      wx.request({
                url: app.globalData.baseUrl + '/wishMenu/giveLike',
             data:{
                nickname:app.globalData.userInfo.nickName,
                 menuId: id,
                 likeStatus:list[index].like_status
                },
             success: function(res) {
                 console.log(res) 
       wx.showToast({
         title: '点赞成功',
         icon: 'none',    //如果要纯文本，不要icon，将值设为'none'
         duration: 2000
       })
       //  先改变值，然后赋给整个对象
       let nummm=list[index].giveLike
       console.log(nummm)
       nummm++
       console.log(nummm)
       list[index].like_status = 1,
      list[index].giveLike=nummm
       that.setData({
         list: list
       })
   }
     })
   } else if (list[index].like_status == 1) {
      console.log("budian")
      wx.request({
         url: app.globalData.baseUrl + '/wishMenu/giveLike',
      data:{
         nickname:app.globalData.userInfo.nickName,
          menuId: id,
          likeStatus:list[index].like_status
         },
      success: function(res) {
       wx.showToast({
         title: '取消点赞成功',
         icon: 'none',    //如果要纯文本，不要icon，将值设为'none'
         duration: 2000
       })
       let numm=list[index].giveLike
       console.log(numm)
       numm--
       console.log(numm)
       list[index].like_status = 0,
   list[index].giveLike=numm
       that.setData({
         list: list
       })
      }
     })
     
   }
 },
//  zan: function (options){
//    var item_id = options.currentTarget.dataset.id;//此处找到列表的id
//    let index = options.currentTarget.dataset.index
//    console.log(item_id);//列表id
//    console.log(index);
//    this.zan(item_id);
//  },

 formatDate(date){
    console.log("zhixinl")
    let that=this;
   date = new Date(date);
   var y=date.getFullYear();
   var m=date.getMonth()+1;
   var d=date.getDate();
   var h=date.getHours();
   var m1=date.getMinutes();
   var s=date.getSeconds();
   m = m<10?("0"+m):m;
   d = d<10?("0"+d):d;
   let yang = y+"-"+m+"-"+d+" "+h+":"+m1+":"+s;
   console.log(yang)
  // this.date.cartime.push(yang)
  that.setData({
   cartime:yang
  })
   return yang;
},
  //弹起评论框
  formSubmit(event) {
   // let orderId = event.currentTarget.dataset.orderid;
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
   this.setData({
     isShowComment: true,
    // orderId: orderId
    })
   },
   //隐藏评论框
   cancelComment() {
    this.setData({
     isShowComment: false
    })
   },
    //获取评论内容
 setValue(input) {
   this.setData({
    comment: input.detail.value
   })
  },
 //提交心愿菜单
 submitComment() {
    let that = this;
    that.cancelComment();
    let content = that.data.comment;
    let orderId = that.data.orderId;
    if (!content) {
     wx.showToast({
      title: '评论内容为空',
     })
     return;
    }
    let openid = app._checkOpenid();
    if (!openid) {
     return;
    }
  
    wx.request({
     url: app.globalData.baseUrl + '/wishMenu/create',
    

     data: {
      nickname: app.globalData.userInfo.nickName,
      dishName: content
     },
     success: function(res) {
        console.log(res)
      that.getMyOrderList();
      wx.showToast({
       title: '发布成功',
      })
     }
    })
   },
   //获取菜单
   getMyOrderList() {
    let that = this;
      wx.request({
         url: app.globalData.baseUrl + '/wishMenu/list',
         data:{
          nickname: app.globalData.userInfo.nickName,
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