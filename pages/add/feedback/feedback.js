Page({
  data:{
    num:'',
    year:'',
    uploadData:''
  },
  //页面加载时接收由信息队提交页面传来的数据个数
  onLoad:function(options){
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
  CopyLink(e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.link,
      success: res => {
        wx.showToast({
          title: '已复制',
          duration: 1000,
        })
      }
    })
  },
  getData:function(){
    var that = this;
    //console.log(this.data.num)
    var arr = new Array()
    for (var i = 0; i < 3; i++){
      wx.getStorage({
        key: i.toString(),
        success(res) {
          arr.push(res.data)
          that.setData({
            uploadData: arr
          })
          //console.log(arr)
          //console.log(arr[1])
          //console.log(res.data)
          //导出数据成功
        }
      })
    }
    console.log(arr[2])
  }
  
});