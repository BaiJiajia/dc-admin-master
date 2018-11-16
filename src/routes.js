import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import allLoan from './views/APPManage/all-loan.vue'
import bannerManage from './views/APPManage/banner-manage.vue'
import indexLoan from './views/APPManage/index-loan.vue'
import pushMessage from './views/APPManage/push-message.vue'
import userFeedback from './views/APPManage/user-feedback.vue'
import bannerTap from './views/operateData/banner-tap.vue'
import channelList from './views/operateData/channel-list.vue'
import channelSet from './views/operateData/channel-set.vue'
import newUser from './views/operateData/new-user.vue'
import orderTap from './views/operateData/order-tap.vue'
import spreadData from './views/operateData/spread-data.vue'
import userOrder from './views/operateData/user-order.vue'

import newUserDetail from './views/operateData/new-user-detail.vue'

import Table from './views/nav1/Table.vue'
import Form from './views/nav1/Form.vue'
import user from './views/nav1/user.vue'

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: 'APP管理',
        iconCls: 'el-icon-message',//图标样式class
        meta:{index:'/'},
        children: [
            { path: '/main', component: Main, name: '主页', hidden: true },
            { path: '/bannerManage', component: bannerManage, name: 'banner管理',meta:{index:'/bannerManage'} },
            { path: '/allLoan', component: allLoan, name: '所有小贷管理',meta:{index:'/allLoan'} },
            { path: '/indexLoan', component: indexLoan, name: '首页小贷管理',meta:{index:'/indexLoan'} },
            { path: '/pushMessage', component: pushMessage, name: '推送消息',meta:{index:'/pushMessage'} },
            { path: '/userFeedback', component: userFeedback, name: '用户反馈',meta:{index:'/userFeedback'} }
        ]


    },
    {
        path: '/',
        component: Home,
        name: '运营数据',
        iconCls: 'el-icon-message',//图标样式class
        meta:{index:'/'},
        children: [
            { path: '/bannerTap', component: bannerTap, name: 'banner点击数据',meta:{index:'/bannerTap'} },
            { path: '/channelList', component: channelList, name: '推广渠道数据',meta:{index:'/channelList'} },
            { path: '/newUser', component: newUser, name: '注册用户数据',meta:{index:'/newUser'}},
            { path: '/newUserDetail', component: newUserDetail, name: '注册用户详情',meta:{index:'/newUser'}, hidden: true},
            { path: '/orderTap', component: orderTap, name: '订单点击数据',meta:{index:'/orderTap'}},
            { path: '/spreadData', component: spreadData, name: '推广统计数据',meta:{index:'/spreadData'} },
            { path: '/channelSet', component: channelSet, name: '推广渠道设置',meta:{index:'/channelSet'} },
            { path: '/userOrder', component: userOrder, name: '用户订单数据',meta:{index:'/userOrder'} },
        ]
    },
    // {
    //     path: '/',
    //     component: Home,
    //     name: '导航一',
    //     iconCls: 'el-icon-message',//图标样式class
    //     children: [
    //         { path: '/main', component: Main, name: '主页', hidden: true },
    //         { path: '/table', component: Table, name: 'Table' },
    //         { path: '/form', component: Form, name: 'Form' },
    //         { path: '/user', component: user, name: '列表' },
    //     ]
    // },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;