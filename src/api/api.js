import axios from 'axios';

let base = '';

export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };

export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };

export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };

export const getBannerTap = params => { return axios.get(`${base}/bannerTapData/listpage`, { params: params }); };//获取banner点击数据

export const getPushMessage = params => { return axios.get(`${base}/mockData/listpage`, { params: params }); };//获取推送消息列表

export const removePushMessage = params => { return axios.get(`${base}/mockData/removePushMessage`, { params: params }); };//删除推送消息

export const addPushMessage = params => { return axios.get(`${base}/mockData/addPushMessage`, { params: params }); };//新增推送消息

export const getfeedBack = params => { return axios.get(`${base}/mockData/getfeedBack`, { params: params }); };//获取用户反馈列表

export const addReplyment = params => { return axios.get(`${base}/mockData/addReplyment`, { params: params }); };//新增回复

export const getOrderTap = params => { return axios.get(`${base}/mockData/getOrderTap`, { params: params }); };//获取订单点击数据

export const getNewUser = params => { return axios.get(`${base}/mockData/getNewUser`, { params: params }); };//获取注册用户数据

export const getUserOrder = params => { return axios.get(`${base}/mockData/getUserOrder`, { params: params }); };//获取用户订单数据

export const getChannel = params => { return axios.get(`${base}/mockData/getChannel`, { params: params }); };//获取渠道列表数据

export const addChannel = params => { return axios.get(`${base}/mockData/addChannel`, { params: params }); };//新增渠道

export const editChannel = params => { return axios.get(`${base}/mockData/editChannel`, { params: params }); };//新增渠道

export const getSpread = params => { return axios.get(`${base}/mockData/getSpread`, { params: params }); };//获取推广数据列表数据

export const getShowBanners = params => { return axios.get(`${base}/mockData/getShowBanners`, { params: params }); };//获取显示banner列表数据

export const addBanner = params => { return axios.get(`${base}/mockData/addBanner`, { params: params }); };//新增banner

export const removeBanner = params => { return axios.get(`${base}/mockData/removeBanner`, { params: params }); };//删除banner