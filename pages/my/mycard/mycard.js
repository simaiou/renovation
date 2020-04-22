// 引入封装请求
const request = require('../../../utils/request')
// 请求接口地址
var config = wx.getStorageSync('config')
Page({
	data:{
		workerInfo:{},
		statusFlag:null,
		statusTip:null
	},

	getSeekJobByUid(){
		var that = this
			request.sendRequest(config.getSeekJobByUid, 'GET', {}, {
					'Accept': 'application/json',
					token:wx.getStorageSync('token')
				})
				.then(function(res) {
					if (res.data.code == 200) {
					that.setData({
						workerInfo:res.data.data[0],
						statusFlag:res.data.data[0].status==0?true:false,
						statusTip:res.data.data[0].status==0?'正在找工作':'已找到工作'
					})
					}
				}, function(error) {
					console.log(error)
				})
	},
	onLoad(){
		this.getSeekJobByUid()
	},
	statusChange(e){
		var that =this
		if(e.detail.value===false){
			this.setData({
				statusTip:'已找到工作'
			})
			request.sendRequest(config.toggleMySeekJobStatus, 'POST', {
				status:1
			}, {
					"Content-Type": "application/x-www-form-urlencoded",
					token:wx.getStorageSync('token')
				})
				.then(function(res) {
					if (res.data.code == 200) {
					wx.showToast({
						title:'更新成功！',
						icon:'none',
						mask:true,
						duration:2000
					})
					}
				}, function(error) {
					console.log(error)
				})
		}else{
			this.setData({
				statusTip:'正在找工作'
			})
			request.sendRequest(config.toggleMySeekJobStatus, 'POST', {
				status:0
			}, {
					"Content-Type": "application/x-www-form-urlencoded",
					token:wx.getStorageSync('token')
				})
				.then(function(res) {
					if (res.data.code == 200) {
					wx.showToast({
						title:'更新成功！',
						icon:'none',
						mask:true,
						duration:2000
					})
					}
				}, function(error) {
					console.log(error)
				})
		}
	},
	modify(){
		wx.navigateTo({
			url:`../modify/modify`
		})
	}
})