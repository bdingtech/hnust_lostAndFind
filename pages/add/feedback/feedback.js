Page({
  data:{
    num:'',
    year:'',
    uploadData:'',
    register:false,
    location:'',
    item:''//信息队页面传来的物品
  },
  //页面加载时接收由信息队提交页面传来的数据个数
  onLoad:function(options){
    if(options.register){
      this.setData({
        register:true
      })
    }
    if (options.item) {
      this.setData({
        item: options.item
      })
    }
    if (options.isSelect) {
      this.setData({
        location: options.isSelect
      })
    }
    if(options.times){
      this.setData({
        num:options.times - 1
      })
    }
    //获取当前年份
    var myDate = new Date();
    var year = myDate.getFullYear();
    //console.log(year);
    this.setData({
      year:year
    })
  },
  //跳转到首页
navigate:function(){
  wx.reLaunch({
    url: '/pages/index/index',
  })
},
  getData:function(){
    var that = this;
    //console.log(this.data.num)
    var arr = new Array()
    for (var i = 0; i < this.data.num + 1; i++){
      wx.getStorage({
        key: i.toString(),
        success(res) {
          arr.push(res.data)
          that.setData({
            uploadData: arr
          })
          //导出数据成功
        }
      })
    }
    wx.clearStorage();//清楚本地缓存
  }
  
});