// 引入封装请求
const request = require('../../utils/request')
// 请求接口地址
var config = wx.getStorageSync('config')
Page({
	data: {
		canIUse: wx.canIUse('button.open-type.getUserInfo') //获取用户信息是否在当前版本可用
	},
	onLoad: function(options) {},
	bindGetUserInfo: function(e) {
		if (e.detail.userInfo) { //点击了允许按钮，
			var that = this;
			var openId = wx.getStorageSync('openId')
			
			request.sendRequest(config.saveUserInfo, 'POST', {
					open_id: openId, 
					nick_name: e.detail.userInfo.nickName,
					avatar_url: e.detail.userInfo.avatarUrl,
					province: e.detail.userInfo.province,
					city: e.detail.userInfo.city
				}, {
					"Content-Type": "application/x-www-form-urlencoded"
				})
				.then(function(res) {
					if (res.data.code == 200) {
						wx.setStorageSync('token', res.data.token)
						wx.switchTab({
							url: '../my/my'
						})
					}
				}, function(error) {
					console.log(error)
				})
		}
	}
})
