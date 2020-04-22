// var host = 'http://192.168.31.137:3000/'  //家
var host = 'http://192.168.100.138:3000/'   //公司
// var host = 'http://192.168.43.172:3000/'  //手机热点
// var host = 'http://192.168.3.90:3000/'  //蹭网

var config = {
	host,
	publishRecruit: host + "publishRecruit",
	// 发布工人找活
	publishSeekJob: host + "publishSeekJob",
	// 获取所有招工信息
	getAllRecruit: host + "getAllRecruit",
	// 获取所有工人找活信息
	getAllSeekJob: host + "getAllSeekJob",
	// 筛选工人排序
	getSeekJobBySort: host + "getSeekJobBySort",
	// 筛选工作排序
	getRecruitBySort: host + "getRecruitBySort",
	// 根据id查招工信息
	getRecruitById: host + "getRecruitById",
	// 根据id查工人信息
	getSeekJobById: host + "getSeekJobById",
	// 获取openId&token
	getOpenId: host + "getOpenId",
	// 保存用户信息
	saveUserInfo: host + "saveUserInfo",
	// 获取用户信息
	getuserInfo: host + "getuserInfo",
	// 获取我发布的招工
	getMyRecruit: host + "getMyRecruit",
	// 设置我的招工状态为已招到
	setMyRecruitAlready:host+"setMyRecruitAlready",
	// 检查token
	checkToken:host+"checkToken",
	// 获取用户积分
	getUserMark:host+"getUserMark",
	// 设置用户积分
	setUserMark:host+"setUserMark",
	// 用户反馈留言
	userFeedback:host+"userFeedback",
	//搜索工人
	searchWork:host+"searchWork",
	// 搜索工作
	searchWorker:host+"searchWorker",
	// 通过用户id查找找活名片
	getSeekJobByUid:host+"getSeekJobByUid",
	// 切换我的找活名片
	toggleMySeekJobStatus:host+'toggleMySeekJobStatus',
	// 修改我的名片
	modifyMyCard:host+"modifyMyCard",
	// 工人名片点赞
	setWorkerPraise:host+"setWorkerPraise",
	// 获取工人名片点赞数
	getWorkerPraise:host+"getWorkerPraise",
	// 判断当前工人是否被点赞
	getIsPraise:host+"getIsPraise",
	// 收藏工人信息
	collectWorker:host+"collectWorker",
	// 收藏招工信息
	collectWork:host+"collectWork",
	// 判断当前工作是否被收藏
	getWorkIsCollect:host+"getWorkIsCollect",
	// 判断当前工人是否被收藏
	getWorkerIsCollect:host+"getWorkerIsCollect",
	// 获取我收藏的工作
	getMyCollectWork:host+'getMyCollectWork',
	// 获取我收藏的工人
	getMyCollectWorker:host+'getMyCollectWorker'
}
module.exports = config
