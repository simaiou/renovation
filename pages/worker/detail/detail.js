// 引入封装请求
const request = require('../../../utils/request')
// 请求接口地址
var config = wx.getStorageSync('config')
Page({
  data: {
		seekJobInfoId:0,
		seekJob:{},
		telFlag: true, //手机打码标志
		telTip: '查看电话',
		mark:null,
		praiseCount:0,
		isPraise:null,
		isCollect:null
  },
  onLoad: function (options) {
	this.setData({
		seekJobInfoId:options.id
	})
	// 获取工人详情
	this.getSeekJobById()
	// 显示页面获取用户积分
	this.getUserMark()
	// 获取用户点赞数
	this.getWorkerPraise()
	// 判断当前工人是否被点赞
	this.getIsPraise()
	// 判断当前工人是否被收藏
	this.getWorkerIsCollect()
  },
	// 获取工人信息详情
	getSeekJobById(){
		var that = this
		request.sendRequest(config.getSeekJobById, 'GET', {
				id:that.data.seekJobInfoId
			}, {
				'Accept': 'application/json'
			})
			.then(function(res) {
				if (res.data.code == 200) {
					that.setData({
						seekJob: res.data.data[0]
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
	onShow(){
	},
	// 获取手机号
	showTel(e) {
		var that = this
				if (wx.getStorageSync('token')||'') {
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
					wx.removeStorageSync('userInfo')
					wx.navigateTo({
						url: "../../login/login"
					})
				}
			
	},
	// 设置积分
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
	//获取用户积分信息
	getUserMark(){
		var that = this
		request.sendRequest(config.getUserMark, 'GET', {
			}, {
				'Accept': 'application/json',
				token:wx.getStorageSync('token')||''
			})
			.then(function(res) {
				if (res.data.code == 200) {
					that.setData({
						mark:res.data.data[0].mark
					})
				}
			}, function(error) {
				console.log(error)
			})
	},
	// 点赞
	setWorkerPraise(){
		var that = this
		request.sendRequest(config.setWorkerPraise, 'POST', {
				seek_job_id:this.data.seekJobInfoId
			}, {
				"Content-Type": "application/x-www-form-urlencoded",
				token:wx.getStorageSync('token')||''
			})
			.then(function(res) {
				if (res.data.code == 200) {
					var isPraise=!that.data.isPraise
					that.setData({
						isPraise:isPraise
					})
					that.getWorkerPraise()
				}
			}, function(error) {
				console.log(error)
			})
	},
	// 获取点赞数
	getWorkerPraise(){
		var that = this
		request.sendRequest(config.getWorkerPraise, 'GET', {
				seek_job_id:this.data.seekJobInfoId
			}, {
				'Accept': 'application/json',
				token:wx.getStorageSync('token')||''
			})
			.then(function(res) {
				console.log(res)
				if (res.data.code == 200) {
					that.setData({
						praiseCount:res.data.data[0].count
					})
				}
			}, function(error) {
				console.log(error)
			})
	},
	// 判断当前是否被点赞
	getIsPraise(){
		var that = this
		request.sendRequest(config.getIsPraise, 'GET', {
			seek_job_id:this.data.seekJobInfoId,
			}, {
				'Accept': 'application/json',
				token:wx.getStorageSync('token')||''
			})
			.then(function(res) {
				if (res.data.code == 200) {
					if(res.data.status===0){
						that.setData({
							isPraise:true
						})
					}else{
						that.setData({
							isPraise:false
						})
					}
				}
			}, function(error) {
				console.log(error)
			})
	},
	// 收藏工人
	collectWorker(){
		var that = this
		request.sendRequest(config.collectWorker, 'POST', {
			seek_job_id:this.data.seekJobInfoId
			}, {
				"Content-Type": "application/x-www-form-urlencoded",
				token:wx.getStorageSync('token')||''
			})
			.then(function(res) {
				if(res.data.code==200){
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
				}
			}, function(error) {
				console.log(error)
			})
	},
		// 判断当前工人是否被收藏
	getWorkerIsCollect(){
		var that = this
		request.sendRequest(config.getWorkerIsCollect, 'GET', {
			seek_job_id:this.data.seekJobInfoId,
			}, {
				'Accept': 'application/json',
				token:wx.getStorageSync('token')||''
			})
			.then(function(res) {
			if(res.data.code==200){
				if(res.data.status===1){
					that.setData({
						isCollect:true
					})
				}else{
					that.setData({
						isCollect:false
					})
				}
			}
			}, function(error) {
				console.log(error)
			})
	}
})