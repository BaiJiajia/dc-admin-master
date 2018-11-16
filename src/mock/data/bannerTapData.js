import Mock from 'mockjs';

const BannerTap = [];

for (let i = 0; i < 41; i++) {
    BannerTap.push(Mock.mock({
        id: Mock.Random.guid(),
        times: Mock.Random.date(),
        banner1:Mock.Random.natural(0,30),
        banner2:Mock.Random.natural(0,30),
        banner3:Mock.Random.natural(0,30),
        summary:Mock.Random.natural(0,30)
    }));
}
export { BannerTap};