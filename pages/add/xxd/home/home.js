Page({
  open: function () {
    wx.showActionSheet({
      itemList: ['校园卡', '身份证', '银行卡','学生证'],
      success: function (res) {
        //身份证
        if (res.tapIndex==0){
          wx.reLaunch({
            url: '/pages/add/xxd/ic_card/ic_card',
          })
        }
        //校园卡
        if (res.tapIndex == 1) {
          wx.reLaunch({
            url: '/pages/add/xxd/id_card/id_card',
          })
        }
        //银行卡
        if (res.tapIndex == 2) {
          wx.reLaunch({
            url: '/pages/add/xxd/credit_card/credit_card',
          })
        }
        //学生证
        if (res.tapIndex == 3) {
          wx.reLaunch({
            url: '/pages/add/xxd/stu_card/stu_card',
          })
        }
      }
    });
  }
});