Page({
  data: {
    // 字数限制
       current: 0,
      max: 300,
      detail:''
  },
   // 文本框字数限制
    limit: function (e)  {
      this.setData({
        detail:e.detail.value
      })
      var value = e.detail.value;
      var length = parseInt(value.length);
      if  (length > this.data.noteMaxLen) {
        return;
      }
     
    },
    onLoad(e){
      this.setData({
        detail:e.value
      })
    },
    submit(){
      let pages = getCurrentPages(); //获取当前页面pages里的所有信息。
      let prevPage = pages[pages.length - 2];                                                          
      prevPage.setData({  
         detail: this.data.detail
      })
      wx.navigateBack({
        delta:1
      })
    },
})