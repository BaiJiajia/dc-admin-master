import Mock from 'mockjs';
const LoginUsers = [
  {
    id: 1,
    username: 'admin',
    password: '123456',
    avatar: 'https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png',
    name: '张某某'
  }
];

const Users = [];

for (let i = 0; i < 86; i++) {
  Users.push(Mock.mock({
    id: Mock.Random.guid(),
    name: Mock.Random.cname(),
    addr: Mock.mock('@county(true)'),
    'age|18-60': 1,
    birth: Mock.Random.date(),
    sex: Mock.Random.integer(0, 1)
  }));
}
// const BannerTap = [];
//
// for (let i = 0; i < 20; i++) {
//     BannerTap.push(Mock.mock({
//         id: Mock.Random.guid(),
//         times: Mock.Random.date(),
//         banner1:Mock.Random.natural(0,30),
//         banner2:Mock.Random.natural(0,30),
//         banner3:Mock.Random.natural(0,30),
//     }));
// }

export { LoginUsers,Users};
