// pages/register/register.js
var config = (wx.getStorageSync("config"));
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picker: ['校园卡', '身份证', '银行卡','其他'],
    ic_card:'',
    id_card:'',
    credit_card:'',
    isSelect:'',
    item:'',
    losterName:'',
    tel:'',
    id:'',
    describe:''
  },
  getTime: function () {
    var nowYear = new Date().getFullYear().toString()
    var nowMonth = (new Date().getMonth() + 1).toString()
    var nowDay = new Date().getDate().toString();
    var nowHours = new Date().getHours().toString();       //获取当前小时数(0-23)
    var nowMin = new Date().getMinutes().toString();     //获取当前分钟数(0-59)
    var nowSeconds = new Date().getSeconds().toString();     //获取当前秒数(0-59)
    function timeAdd0(str) {
      if (str.length <= 1) {
        str = '0' + str;
      }
      return str
    }
    nowYear = timeAdd0(nowYear)
    nowMonth = timeAdd0(nowMonth)
    nowDay = timeAdd0(nowDay)
    nowHours = timeAdd0(nowHours)
    nowMin = timeAdd0(nowMin)
    nowSeconds = timeAdd0(nowSeconds)
    //console.log(nowYear + nowMonth + nowDay + nowHours + nowMin + nowSeconds)
    //获取完整年月日
    var newDay = nowYear + "/" + nowMonth + "/" + nowDay + "  " + nowHours + ":" + nowMin + ":" + nowSeconds;
    console.log(newDay)
    return newDay;
  },
  PickerChange(e) {
    console.log(e);
    this.setData({
      index: e.detail.value,
      isSelect: parseInt(e.detail.value) + 1
    });
    //标记物品，并传送至data数组
    switch(this.data.isSelect){
      case 1 :
        this.setData({
          item:"ic_card"
        })
        break;
      case 2 :
        this.setData({
          item:"id_card"
        })
        break;
      case 3:
      this.setData({
          item:"credit_card"
      })
      break;
      case 4: 
      this.setData({
          item:"other"
      })
    }
  },
  formSubmit(e){
    if(e.detail.value.losterName.length == 0 || e.detail.value.tel.length == 0 || this.data.isSelect.length == 0){
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请填写好完整信息'
      });
    }else{
    if(e.detail.value.id){
      this.setData({
        id:e.detail.value.id
      })
    }
    this.setData({
      losterName:e.detail.value.losterName,
      tel:e.detail.value.tel,
    })
    //数据库添加操作开始
    wx.showLoading({
      title: '正在提交...',
    })
      wx.request({
        url: config.register,
        data: {
          time: this.getTime(),
          losterName:this.data.losterName,
          tel:this.data.tel,
          item:this.data.item,
          id:this.data.id,
          describe:this.data.describe
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          // console.log(res.data)
          wx.hideLoading();
          wx.redirectTo({
            url: '../add/feedback/feedback?register=' + 'register',
          })
          console.log(res)
        }
      })
    // const db = wx.cloud.database()
    // db.collection('register').add({
    //   data:{
    //     losterName:this.data.losterName,
    //     tel:this.data.tel,
    //     item:this.data.item,
    //     id:this.data.id,
    //     describe:this.data.describe
    //   },
    //   success:function(res){
    //     wx.hideLoading()
    //     wx.redirectTo({
    //       url: '/pages/add/feedback/feedback?register=' + 'register',
    //     })
    //   }
    // })
    }
  },
  textareaAInput(e) {
    this.setData({
      describe: e.detail.value
    })
  }
})