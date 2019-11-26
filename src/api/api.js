import {get,post,postForm,postFile} from './request';
//登陆
export const  login= (login)=>post('adminUser/login',login)
//登出
export const  logout= ()=>get('adminUser/logout')
//上传
export const  upload= (upload)=>postFile('adminGoods/imageUpload',upload)
//删除
export const  del= (del)=>postForm('adminGoods/imageDelete',del)

// 用户列表
export const userList= ()=>get('user/list')
// 查询指定用户的订单
export const orderListByUserId = (userId) => get('userOrder/list',{userId: userId})
// 获得首页轮播图列表
export const swipperList = () => get('userIndex/bannerlist')
// 增加首页轮播图
export const saveSwipper = (swipper) => post('adminIndex/saveBanner',swipper)
// 删除首页轮播图
export const delSwipper = (swipperId) => postForm('adminIndex/delBanner',{id: swipperId})
// 欢迎页图片
export const welcomeList = () => get('userIndex/welcomeList')
// 创建欢迎页图片
export const saveWelcome = (welcome) => post("adminIndex/saveWelcome",welcome)
// 删除欢迎页图片
export const delWelcome = (welcomeId) => postForm("adminIndex/delWelcome",{id: welcomeId})
