Page({
  open: function () {
    wx.showActionSheet({
      itemList: ['校园卡', '身份证', '银行卡'],
      success: function (res) {
        //身份证
        if (res.tapIndex==0){
          wx.navigateTo({
            url: '/pages/add/xxd/ic_card/ic_card',
          })
        }
        //校园卡
        if (res.tapIndex == 1) {
          wx.navigateTo({
            url: '/pages/add/xxd/id_card/id_card',
          })
        }
        //银行卡
        if (res.tapIndex == 2) {
          wx.navigateTo({
            url: '/pages/add/xxd/credit_card/credit_card',
          })
        }
      }
    });
  }
});