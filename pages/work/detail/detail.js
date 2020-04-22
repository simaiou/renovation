// 引入封装请求
const request = require('../../../utils/request')
// 请求接口地址
var config = wx.getStorageSync('config')
Page({
	data: {
		recruitInfoId: 0,
		recruit: {},
		telFlag: true, //手机打码标志
		telTip: '查看电话',
		mark:null,
		isCollect:null
	},
	onLoad: function(options) {
		this.setData({
			recruitInfoId: options.id,
		})
	},
	// 获取招工详细信息
	getRecruitById() {
		var that = this
		request.sendRequest(config.getRecruitById, 'GET', {
				id: that.data.recruitInfoId
			}, {
				'Accept': 'application/json',
				token:wx.getStorageSync('token')||''
			})
			.then(function(res) {
				if (res.data.code == 200) {
					that.setData({
						recruit: res.data.data[0]
					})
				}
			}, function(error) {
				console.log(error)
			})
	},
	// 导航
	toNav(e) {
		console.log(e)
		wx.getLocation({
			type: 'gcj02', //返回可以用于wx.openLocation的经纬度
			success(res) {
				wx.openLocation({
					latitude: parseFloat(e.currentTarget.dataset.location.split(',')[0]),
					longitude: parseFloat(e.currentTarget.dataset.location.split(',')[1]),
					scale: 18
				})
			}
		})
	},
	onShow() {
		// 获取招工详情
		this.getRecruitById(),
		// 显示页面获取用户积分
		this.getUserMark()
		// 判断当前工作是否被收藏
		this.getWorkIsCollect()
	},
	// 获取手机号
	showTel(e) {
		var that = this
				if (wx.getStorageSync('token')) {
					if(this.data.telTip !== '拨打电话'&& this.data.mark===0){
						console.log('积分不够')
					}else{
						if (this.data.telTip === '拨打电话') {
							wx.makePhoneCall({
								phoneNumber: e.currentTarget.dataset.tel,
							})
						} else {
							this.setData({
								telFlag: false,
								telTip: '拨打电话'
							})
							var mark = --this.data.mark
							//用户积分信息-1
						 this.setUserMark(mark)
						}
					}
				} else {
					wx.navigateTo({
						url: "../../login/login"
					})
				}
			},
			// 获取用户积分
	getUserMark(){
		var that = this
		request.sendRequest(config.getUserMark, 'GET', {
			}, {
				'Accept': 'application/json',
				token:wx.getStorageSync('token')||''
			})
			.then(function(res) {
				console.log(res)
				if (res.data.code == 200) {
					
					that.setData({
						mark:res.data.data[0].mark
					})
				}
			}, function(error) {
				console.log(error)
			})
	},
	// 设置用户积分
	setUserMark(mark){
		request.sendRequest(config.setUserMark, 'POST', {
				mark:mark
			}, {
				"Content-Type": "application/x-www-form-urlencoded",
				token:wx.getStorageSync('token')||''
			})
			.then(function(res) {
				if (res.data.code == 200) {
					console.log('积分设置成功！')
				}
			}, function(error) {
				console.log(error)
			})
	},
	// 收藏工作
	collectWork(){
		var that = this
		request.sendRequest(config.collectWork, 'POST', {
				recruit_id:this.data.recruitInfoId
			}, {
				'Accept': 'application/json',
				token:wx.getStorageSync('token')||''
			})
			.then(function(res) {
				if (res.data.code == 200) {
					var isCollect = !that.data.isCollect
					that.setData({
						isCollect:isCollect
					})
					if(that.data.isCollect){
						wx.showToast({
							title:'收藏成功!',
							duration:1000,
							icon:'none'
						})
					}else{
						wx.showToast({
							title:'取消收藏!',
							duration:1000,
							icon:'none'
						})
					}
					console.log('收藏工作成功！')
				}
			}, function(error) {
				console.log(error)
			})
	},
	// 判断当前工作是否被收藏
	getWorkIsCollect(){
		var that = this
		request.sendRequest(config.getWorkIsCollect, 'GET', {
				recruit_id:this.data.recruitInfoId,
			}, {
				'Accept': 'application/json',
				token:wx.getStorageSync('token')||''
			})
			.then(function(res) {
			if(res.data.code===1){
				that.setData({
					isCollect:true
				})
			}else{
				that.setData({
					isCollect:false
				})
			}
			}, function(error) {
				console.log(error)
			})
	},
	// 分享
	  onShareAppMessage: function() {
	    let openId = wx.getStorageSync('openId');
	    return {
	      title: '转发',
	      path: `/pages/work/detail/detail?id=${this.data.recruitInfoId}&openId=${openId}`,
	      success: function(res) {
					console.log(res)
				},
				fail:function(err){
					console.log(err)
				}
	    }
	  }
})
