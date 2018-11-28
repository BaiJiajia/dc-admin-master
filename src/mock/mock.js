import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { LoginUsers, Users } from './data/user';
import { BannerTap } from './data/bannerTapData';
import { messageList,feedBackList,OrderTap,NewUsers,UserOrders,Channels,SpreadData,ShowBanners } from './data/mockData';
let _Users = Users;
let _bannerTap = BannerTap;
let _messageList = messageList;
let _feedBackList = feedBackList;
let _OrderTap = OrderTap;
let _NewUsers = NewUsers;
let _UserOrders = UserOrders;
let _Channels = Channels;
let _SpreadData = SpreadData;
let _ShowBanners = ShowBanners;



export default {
  /**
   * mock bootstrap
   */
  bootstrap() {
    let mock = new MockAdapter(axios);

    // mock success request
    mock.onGet('/success').reply(200, {
      msg: 'success'
    });

    // mock error request
    mock.onGet('/error').reply(500, {
      msg: 'failure'
    });

    //登录
    mock.onPost('/login').reply(config => {
      let {username, password} = JSON.parse(config.data);
      return new Promise((resolve, reject) => {
        let user = null;
        setTimeout(() => {
          let hasUser = LoginUsers.some(u => {
            if (u.username === username && u.password === password) {
              user = JSON.parse(JSON.stringify(u));
              user.password = undefined;
              return true;
            }
          });

          if (hasUser) {
            resolve([200, { code: 200, msg: '请求成功', user }]);
          } else {
            resolve([200, { code: 500, msg: '账号或密码错误' }]);
          }
        }, 1000);
      });
    });

    //获取用户列表
    mock.onGet('/user/list').reply(config => {
      let {name} = config.params;
      let mockUsers = _Users.filter(user => {
        if (name && user.name.indexOf(name) == -1) return false;
        return true;
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            users: mockUsers
          }]);
        }, 1000);
      });
    });

    // 获取banner点击列表
      mock.onGet('/bannerTapData/listpage').reply(config => {
          let {page,times} = config.params;
          let mockTaps = _bannerTap.filter(bannerTapData => {
              if (times[0]<bannerTapData.times && times[1]>bannerTapData.times) return false;
              return true;
          });
          let total = mockTaps.length;
          mockTaps = mockTaps.filter((u, index) => index < 20 * page && index >= 20 * (page - 1));
          return new Promise((resolve, reject) => {
              setTimeout(() => {
                  resolve([200, {
                      total: total,
                      BannerTap: mockTaps
                  }]);
              }, 1000);
          });
      });

      // 获取推送信息列表
      mock.onGet('/mockData/listpage').reply(config => {
          let {page} = config.params;
          let total = _messageList.length;
          _messageList = _messageList.filter((u, index) => index < 20 * page && index >= 20 * (page - 1));
          return new Promise((resolve, reject) => {
              setTimeout(() => {
                  resolve([200, {
                      total: total,
                      messageList: _messageList
                  }]);
              }, 1000);
          });
      });

      //删除推送信息
      mock.onGet('/mockData/removePushMessage').reply(config => {
          let { id } = config.params;
          _messageList = _messageList.filter(u => u.id !== id);
          return new Promise((resolve, reject) => {
              setTimeout(() => {
                  resolve([200, {
                      code: 200,
                      msg: '删除成功'
                  }]);
              }, 500);
          });
      });
      //新增推送信息
      mock.onGet('/mockData/addPushMessage').reply(config => {
          let { time, title, content, targetPeople } = config.params;
          _messageList.push({
              time: time,
              title: title,
              content: content,
              targetPeople: targetPeople
          });
          return new Promise((resolve, reject) => {
              setTimeout(() => {
                  resolve([200, {
                      code: 200,
                      msg: '新增成功'
                  }]);
              }, 500);
          });
      });

      // 获取用户反馈列表
      mock.onGet('/mockData/getfeedBack').reply(config => {
          let {page} = config.params;
          let total = _feedBackList.length;
          _feedBackList = _feedBackList.filter((u, index) => index < 20 * page && index >= 20 * (page - 1));
          return new Promise((resolve, reject) => {
              setTimeout(() => {
                  resolve([200, {
                      total: total,
                      feedBackList: _feedBackList
                  }]);
              }, 1000);
          });
      });

      //回复用户反馈
      mock.onGet('/mockData/addReplyment').reply(config => {
          return new Promise((resolve, reject) => {
              setTimeout(() => {
                  resolve([200, {
                      code: 200,
                      msg: '编辑成功'
                  }]);
              }, 500);
          });
      })

      // 获取订单点击列表
      mock.onGet('/mockData/getOrderTap').reply(config => {
          let {page,times} = config.params;
          let mockTaps = _OrderTap.filter(bannerTapData => {
              if (times[0]<bannerTapData.times && times[1]>bannerTapData.times) return false;
              return true;
          });
          let total = mockTaps.length;
          mockTaps = mockTaps.filter((u, index) => index < 20 * page && index >= 20 * (page - 1));
          return new Promise((resolve, reject) => {
              setTimeout(() => {
                  resolve([200, {
                      total: total,
                      OrderTap: mockTaps
                  }]);
              }, 1000);
          });
      });

      // 获取注册用户列表
      mock.onGet('/mockData/getNewUser').reply(config => {
          let {page,times,number,channel} = config.params;
          let mockUsers = _NewUsers.filter(bannerTapData => {
              if (times[0]<bannerTapData.times && times[1]>bannerTapData.times) return false;
              return true;
          });
          let total = mockUsers.length;
          mockUsers = mockUsers.filter((u, index) => index < 20 * page && index >= 20 * (page - 1));
          return new Promise((resolve, reject) => {
              setTimeout(() => {
                  resolve([200, {
                      total: total,
                      NewUsers: mockUsers
                  }]);
              }, 1000);
          });
      });

      // 获取用户订单列表
      mock.onGet('/mockData/getUserOrder').reply(config => {
          let {page,times,number,orderType} = config.params;
          let mockUserOrders = _UserOrders.filter(bannerTapData => {
              if (times[0]<bannerTapData.times && times[1]>bannerTapData.times) return false;
              return true;
          });
          let total = mockUserOrders.length;
          mockUserOrders = mockUserOrders.filter((u, index) => index < 20 * page && index >= 20 * (page - 1));
          return new Promise((resolve, reject) => {
              setTimeout(() => {
                  resolve([200, {
                      total: total,
                      UserOrders: mockUserOrders
                  }]);
              }, 1000);
          });
      });
      // 获取渠道列表
      mock.onGet('/mockData/getChannel').reply(config => {
          let {page,times,status,cnlName} = config.params;
          let mockChannels = _Channels.filter(bannerTapData => {
              return true;
          });
          let total = mockChannels.length;
          mockChannels = mockChannels.filter((u, index) => index < 20 * page && index >= 20 * (page - 1));
          return new Promise((resolve, reject) => {
              setTimeout(() => {
                  resolve([200, {
                      total: total,
                      Channels: mockChannels
                  }]);
              }, 1000);
          });
      });
      //新增渠道
      mock.onGet('/mockData/addChannel').reply(config => {
          let { cnlName , tips } = config.params;
          _Channels.push({
              cnlName: cnlName,
              tips: tips,
          });
          return new Promise((resolve, reject) => {
              setTimeout(() => {
                  resolve([200, {
                      code: 200,
                      msg: '新增成功'
                  }]);
              }, 500);
          });
      });
      //编辑渠道信息
      mock.onGet('/mockData/editChannel').reply(config => {
          let { id,cnlName,tips } = config.params;
          _Channels.some(u => {
              if (u.id === id) {
                  u.cnlName = cnlName;
                  u.tips = tips;
                  return true;
              }
          });
          return new Promise((resolve, reject) => {
              setTimeout(() => {
                  resolve([200, {
                      code: 200,
                      msg: '编辑成功'
                  }]);
              }, 500);
          });
      });
      // 获取推广数据列表
      mock.onGet('/mockData/getSpread').reply(config => {
          let {page,times,checkedChannel} = config.params;
          let mockSpreads = _SpreadData.filter(bannerTapData => {
              if (times[0]<bannerTapData.times && times[1]>bannerTapData.times) return false;
              return true;
          });
          let total = mockSpreads.length;
          mockSpreads = mockSpreads.filter((u, index) => index < 20 * page && index >= 20 * (page - 1));
          return new Promise((resolve, reject) => {
              setTimeout(() => {
                  resolve([200, {
                      total: total,
                      SpreadData: mockSpreads
                  }]);
              }, 1000);
          });
      });
    //获取用户列表（分页）
    mock.onGet('/user/listpage').reply(config => {
      let {page, name} = config.params;
      let mockUsers = _Users.filter(user => {
        if (name && user.name.indexOf(name) == -1) return false;
        return true;
      });
      let total = mockUsers.length;
      mockUsers = mockUsers.filter((u, index) => index < 20 * page && index >= 20 * (page - 1));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            total: total,
            users: mockUsers
          }]);
        }, 1000);
      });
    });

    // 获取banner列表
      mock.onGet('/mockData/getShowBanners').reply(config => {
          let total = _ShowBanners.length;
          return new Promise((resolve, reject) => {
              setTimeout(() => {
                  resolve([200, {
                      total: total,
                      bannerList: _ShowBanners
                  }]);
              }, 1000);
          });
      });
      //新增banner
      mock.onGet('/mockData/addBanner').reply(config => {
          let { imageUrl, title, urlAddr, sort } = config.params;
          _ShowBanners.push({
              imageUrl: imageUrl,
              title: title,
              urlAddr: urlAddr,
              sort: sort
          });
          return new Promise((resolve, reject) => {
              setTimeout(() => {
                  resolve([200, {
                      code: 200,
                      msg: '新增成功'
                  }]);
              }, 500);
          });
      });
    //删除用户
    mock.onGet('/user/remove').reply(config => {
      let { id } = config.params;
      _Users = _Users.filter(u => u.id !== id);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功'
          }]);
        }, 500);
      });
    });

    //批量删除用户
    mock.onGet('/user/batchremove').reply(config => {
      let { ids } = config.params;
      ids = ids.split(',');
      _Users = _Users.filter(u => !ids.includes(u.id));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功'
          }]);
        }, 500);
      });
    });

    //编辑用户
    mock.onGet('/user/edit').reply(config => {
      let { id, name, addr, age, birth, sex } = config.params;
      _Users.some(u => {
        if (u.id === id) {
          u.name = name;
          u.addr = addr;
          u.age = age;
          u.birth = birth;
          u.sex = sex;
          return true;
        }
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '编辑成功'
          }]);
        }, 500);
      });
    });

    //新增用户
    mock.onGet('/user/add').reply(config => {
      let { name, addr, age, birth, sex } = config.params;
      _Users.push({
        name: name,
        addr: addr,
        age: age,
        birth: birth,
        sex: sex
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '新增成功'
          }]);
        }, 500);
      });
    });

  }
};