// 引入封装请求
const request = require('../../../utils/request')
// 请求接口地址
var config = wx.getStorageSync('config')
import Dialog from '@vant/weapp/dialog/dialog';
Page({
	data: {
		active: 0,
		myRecruitList: []
	},
	// 获取我的招工
	getMyRecruit() {
		var that = this
		request.sendRequest(config.getMyRecruit, 'GET', {}, {
				'Accept': 'application/json',
				token:wx.getStorageSync('token')||''
			})
			.then(function(res) {
				console.log(res)
				if (res.data.code == 200) {
			that.setData({
				myRecruitList: res.data.data
			})
				}
			}, function(error) {
				console.log(error)
			})
	},
	// 设置我的招工状态为已招到
	setMyRecruitAlready(recruitId) {
		var that = this
		request.sendRequest(config.setMyRecruitAlready, 'GET', {
			recruitId:recruitId
		}, {
				'Accept': 'application/json',
				token:wx.getStorageSync('token')||''
			})
			.then(function(res) {
				if (res.data.code == 200) {
					wx.showToast({
						title:'设置成功',
						icon:'none',
						mask:true,
						duration:2000
					})
				that.getMyRecruit()
				}
			}, function(error) {
				console.log(error)
			})
		
	},
	onLoad() {
	this.getMyRecruit()
	},
	setStatu(event) {
		var that = this
	  const { position, instance } = event.detail;
	  switch (position) {
	    case 'left':
	    case 'cell':
	      instance.close();
	      break;
	    case 'right':
	      Dialog.confirm({
	        message: '修改招工为已招到吗？'
	      }).then(() => {
					that.setMyRecruitAlready(event.detail.name)
	        instance.close();
	      }).catch(()=>{
					 instance.close();
				});
	      break;
	  }
	},
	delMyRecruit(event) {
	  const { position, instance } = event.detail;
	  switch (position) {
	    case 'left':
	    case 'cell':
	      instance.close();
	      break;
	    case 'right':
	      Dialog.confirm({
	        message: '确定删除吗？'
	      }).then(() => {
	        instance.close();
	      }).catch(()=>{
					 instance.close();
				});
	      break;
	  }
	},
	onShow(){
		if(!wx.getStorageSync('token')){
				wx.navigateTo({
				  url: '../login/login',//授权页面
				})
		}
	}


});
