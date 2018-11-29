import Mock from 'mockjs';

const messageList = [];
for (let i = 0; i < 15; i++) {
    messageList.push(Mock.mock({
        id: Mock.Random.guid(),
        time: Mock.Random.datetime('yyyy-MM-dd HH:mm:ss'),
        title:Mock.Random.cword(3),
        content:Mock.Random.cword(13),
        targetPeople:Mock.Random.cword(3),
        pushStatus:Mock.Random.cword(3)
    }));
}

const feedBackList = [];
for (let i = 0; i < 15; i++) {
    feedBackList.push(Mock.mock({
        id: Mock.Random.guid(),
        time: Mock.Random.datetime('yyyy-MM-dd HH:mm:ss'),
        content:Mock.Random.cword(10),
        number:13212341234,
        status:Mock.Random.cword(3)
    }));
}

const OrderTap = [];
for (let i = 0; i < 41; i++) {
    OrderTap.push(Mock.mock({
        id: Mock.Random.guid(),
        times: Mock.Random.date(),
        shenxian:Mock.Random.natural(0,30),
        keyi:Mock.Random.natural(0,30),
        chaoji:Mock.Random.natural(0,30),
        henkuai:Mock.Random.natural(0,30),
        summary:Mock.Random.natural(0,30)
    }));
}

const NewUsers = [];
for (let i = 0; i < 41; i++) {
    NewUsers.push(Mock.mock({
        id: Mock.Random.guid(),
        times: Mock.Random.date(),
        number:13212341234,
        channel:Mock.Random.cword(3)
    }));
}

const UserOrders = [];
for (let i = 0; i < 41; i++) {
    UserOrders.push(Mock.mock({
        id: Mock.Random.guid(),
        times: Mock.Random.date(),
        number:13212341234,
        applyLoan:Mock.Random.cword(3),
        returnLoan:Mock.Random.cword(3),
        howmoney:Mock.Random.natural(0,30),
        deadline:Mock.Random.datetime('yyyy-MM-dd HH:mm:ss'),
    }));
}

const Channels = [];
for (let i = 0; i < 16; i++) {
    Channels.push(Mock.mock({
        id: Mock.Random.guid(),
        times: Mock.Random.date(),
        number:13212341234,
        cnlName:Mock.Random.cword(3),
        cnlIndex:Mock.Random.natural(0,30),
        loanRate:Mock.Random.natural(0,30),
        channelStatus:'下线',
    }));
}

const SpreadData = [];
for (let i = 0; i < 16; i++) {
    SpreadData.push(Mock.mock({
        id: Mock.Random.guid(),
        times: Mock.Random.date(),
        number:13212341234,
        cnlName:Mock.Random.cword(3),
        tapCount:Mock.Random.natural(0,30),
        tapPeople:Mock.Random.natural(0,30),
        registCount:Mock.Random.natural(0,30),
    }));
}
const ShowBanners = [];
for (let i = 0; i < 5; i++) {
    ShowBanners.push(Mock.mock({
        id: Mock.Random.guid(),
        imageUrl:'/assets/logo.png',
        title:Mock.Random.cword(3),
        urlAddr:'http://www.baidu.com',
        sort:Mock.Random.natural(0,30),
    }));
}

export { messageList,feedBackList,OrderTap,NewUsers,UserOrders,Channels,SpreadData,ShowBanners };