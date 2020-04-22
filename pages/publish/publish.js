// 引入封装请求
const request = require('../../utils/request')
// 请求接口地址
var config = wx.getStorageSync('config')
Page({
	data: {

	},
	toRecruit() {
				if (wx.getStorageSync('token')) {
					wx.navigateTo({
						url: '../recruit/recruit',
					})
				} else {
					wx.navigateTo({
						url: '../login/login', //授权页面
					})
				}
	},
	toSeekJob() {
				if (wx.getStorageSync('token')) {
					this.getSeekJobByUid()
				} else { //未授权，跳到授权页面
					wx.navigateTo({
						url: '../login/login', //授权页面
					})
				}
	},
	getSeekJobByUid() {
		var that = this
		request.sendRequest(config.getSeekJobByUid, 'GET', {}, {
				token:wx.getStorageSync('token'),
				'Accept': 'application/json'
			})
			.then(function(res) {
				if(res.data.code==200){
					if (res.data&& res.data.data.length!==0) {
						wx.navigateTo({
							url: '../my/mycard/mycard',
						})
					} else {
						wx.navigateTo({
							url: '../seekjob/seekjob',
						})
					}
				}
			}, function(error) {
				console.log(error)
			})
	}
})
