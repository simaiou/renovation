var sendRequest = function(url, method, data = {}, header = {}) {
	var promise = new Promise(function(resolve, reject) {
		wx.request({
			url: url,
			data: data,
			method: method,
			header: header,
			success: function(res) {
				console.log(res)
				if(res.data.code==-1){
					wx.removeStorageSync('token')
					wx.showToast({
						mask:true,
						duration:3000,
						title:'登录失效,请重新登录！',
						icon:'none',
						success(){
							setTimeout(function(){
								wx.navigateTo({
									url:'/pages/login/login'
								})
							},3000)
						}
					})
				}else{
					resolve(res)
				}
			},
			fail: function(res) {
				reject(res);
			}
		})
	})

	return promise
}

// 导出
module.exports = {
	sendRequest: sendRequest
}
