const destinations = [
  { id: 1, image: 'https://picsum.photos/seed/dest1/600/400', city: '巴厘岛', country: '印度尼西亚', count: 1243 },
  { id: 2, image: 'https://picsum.photos/seed/dest2/600/400', city: '东京', country: '日本', count: 2156 },
  { id: 3, image: 'https://picsum.photos/seed/dest3/600/400', city: '巴黎', country: '法国', count: 1879 },
  { id: 4, image: 'https://picsum.photos/seed/dest4/600/400', city: '三亚', country: '中国', count: 987 },
];

const properties = [
  { id: 1, image: 'https://picsum.photos/seed/prop1/600/400', title: '海景豪华套房', location: '巴厘岛, 印度尼西亚', city: '巴厘岛', price: 688, rating: 4.9, reviewCount: 128, tag: '超赞房东', type: '别墅', amenities: ['WiFi', '停车场', '游泳池', '空调', '厨房'] },
  { id: 2, image: 'https://picsum.photos/seed/prop2/600/400', title: '市中心现代公寓', location: '东京, 日本', city: '东京', price: 520, rating: 4.7, reviewCount: 89, tag: '热门', type: '公寓', amenities: ['WiFi', '空调', '厨房', '洗衣机'] },
  { id: 3, image: 'https://picsum.photos/seed/prop3/600/400', title: '古典花园别墅', location: '巴黎, 法国', city: '巴黎', price: 1280, rating: 4.8, reviewCount: 256, type: '别墅', amenities: ['WiFi', '停车场', '早餐', '健身房'] },
  { id: 4, image: 'https://picsum.photos/seed/prop4/600/400', title: '山景温泉旅馆', location: '箱根, 日本', city: '箱根', price: 960, rating: 4.9, reviewCount: 176, tag: '新上线', type: '酒店', amenities: ['WiFi', '停车场', '早餐', '空调'] },
  { id: 5, image: 'https://picsum.photos/seed/prop5/600/400', title: '海滨度假屋', location: '三亚, 中国', city: '三亚', price: 450, rating: 4.6, reviewCount: 64, type: '度假屋', amenities: ['WiFi', '游泳池', '空调', '厨房'] },
  { id: 6, image: 'https://picsum.photos/seed/prop6/600/400', title: '湖畔木屋', location: '大理, 中国', city: '大理', price: 380, rating: 4.8, reviewCount: 92, tag: '超值', type: '民宿', amenities: ['WiFi', '停车场', '厨房'] },
  { id: 7, image: 'https://picsum.photos/seed/prop7/600/400', title: '都市精品酒店', location: '上海, 中国', city: '上海', price: 760, rating: 4.5, reviewCount: 203, type: '酒店', amenities: ['WiFi', '早餐', '健身房', '空调'] },
  { id: 8, image: 'https://picsum.photos/seed/prop8/600/400', title: '热带雨林树屋', location: '清迈, 泰国', city: '清迈', price: 320, rating: 4.9, reviewCount: 147, tag: '独特体验', type: '民宿', amenities: ['WiFi', '厨房'] },
  { id: 9, image: 'https://picsum.photos/seed/prop9/600/400', title: '江景民宿', location: '重庆, 中国', city: '重庆', price: 290, rating: 4.7, reviewCount: 56, type: '民宿', amenities: ['WiFi', '空调', '洗衣机'] },
  { id: 10, image: 'https://picsum.photos/seed/prop10/600/400', title: '古镇客栈', location: '丽江, 中国', city: '丽江', price: 350, rating: 4.8, reviewCount: 88, type: '客栈', amenities: ['WiFi', '早餐'] },
  { id: 11, image: 'https://picsum.photos/seed/prop11/600/400', title: '城市loft', location: '成都, 中国', city: '成都', price: 420, rating: 4.6, reviewCount: 112, type: '公寓', amenities: ['WiFi', '厨房', '洗衣机'] },
  { id: 12, image: 'https://picsum.photos/seed/prop12/600/400', title: '海岛小屋', location: '普吉岛, 泰国', city: '普吉岛', price: 560, rating: 4.7, reviewCount: 75, type: '度假屋', amenities: ['WiFi', '游泳池', '空调'] },
];

const articles = [
  { id: 1, image: 'https://picsum.photos/seed/art1/600/400', title: '2026年最值得去的10个海岛', date: '2026年3月15日', readTime: '5分钟阅读' },
  { id: 2, image: 'https://picsum.photos/seed/art2/600/400', title: '日本赏樱终极指南', date: '2026年3月10日', readTime: '8分钟阅读' },
  { id: 3, image: 'https://picsum.photos/seed/art3/600/400', title: '带孩子旅行的20个实用技巧', date: '2026年3月5日', readTime: '6分钟阅读' },
];

const partners = ['Hilton', 'Marriott', 'Airbus', 'Emirates', 'Hertz', 'Visa'];

const propertyDetails = {
  1: {
    id: 1,
    title: '海景豪华套房',
    location: '巴厘岛金巴兰, 印度尼西亚',
    rating: 4.9,
    reviewCount: 128,
    price: 688,
    tag: '超赞房东',
    photos: Array.from({ length: 5 }, (_, i) => `https://picsum.photos/seed/detail${i + 1}/800/600`),
    description: [
      '坐落在巴厘岛金巴兰海岸悬崖之上，这间豪华海景套房为您提供无与伦比的印度洋全景。套房面积120平方米，配备私人无边泳池、开放式厨房和宽敞的观景阳台。',
      '室内采用巴厘岛传统木雕与现代极简设计相结合的风格，营造出温馨而不失格调的居住空间。每天清晨，您可以在阳台上享用有机早餐，伴着海浪声开启美好的一天。',
    ],
    amenities: ['高速WiFi', '厨房', '免费停车', '空调', '洗衣机', '电视', '浴缸', '健身房', '花园', '安保系统'],
    host: { id: 1, name: 'Sarah', avatar: 'https://picsum.photos/seed/host/100/100', intro: '超赞房东 · 2020年加入', rating: 4.9, verified: true },
    reviews: [
      { id: 1, name: '王小明', avatar: 'https://picsum.photos/seed/user1/100/100', date: '2026年2月', rating: 5, text: '非常棒的住宿体验！房间宽敞明亮，设施齐全。房东很热情，还推荐了很多当地美食。下次还会再来！' },
      { id: 2, name: '王小芳', avatar: 'https://picsum.photos/seed/user2/100/100', date: '2026年1月', rating: 4, text: '位置很好，离海滩步行只需5分钟。早餐很丰盛，景色也非常美。唯一不足的是隔音稍差。' },
      { id: 3, name: '张小伟', avatar: 'https://picsum.photos/seed/user3/100/100', date: '2025年12月', rating: 5, text: '完美的度假体验！泳池很大很干净，日落时分坐在阳台上看海简直太惬意了。强烈推荐！' },
      { id: 4, name: '陈小静', avatar: 'https://picsum.photos/seed/user4/100/100', date: '2025年11月', rating: 4, text: '环境优美，设施完善，性价比很高。适合情侣和家庭出游。' },
    ],
    nearby: [
      { name: '金巴兰海滩', distance: '1.2 km', type: '景点' },
      { name: '乌鲁瓦图神庙', distance: '5.8 km', type: '文化' },
      { name: 'Rock Bar', distance: '2.3 km', type: '餐饮' },
      { name: 'Padang Padang 海滩', distance: '3.5 km', type: '景点' },
    ],
    similar: [2, 3, 5, 8],
  },
};

const conversations = [
  { id: 1, name: 'Sarah Chen', avatar: 'https://picsum.photos/seed/msg1/100/100', lastMessage: '好的，入住当天我会在门口等你们！', time: '10:30', unread: 2, online: true },
  { id: 2, name: '张明', avatar: 'https://picsum.photos/seed/msg2/100/100', lastMessage: '请问可以提前入住吗？', time: '昨天', unread: 0, online: false },
  { id: 3, name: 'Yuki Tanaka', avatar: 'https://picsum.photos/seed/msg3/100/100', lastMessage: '非常感谢你的推荐！那个餐厅太棒了', time: '周二', unread: 0, online: true },
  { id: 4, name: '王丽', avatar: 'https://picsum.photos/seed/msg4/100/100', lastMessage: '退房已完成，期待下次再来', time: '3月20日', unread: 0, online: false },
];

const messages = {
  1: [
    { id: 1, sender: 'them', text: '你好！我是你预订的海景豪华套房的房东 Sarah 🏖️', time: '09:15' },
    { id: 2, sender: 'them', text: '很高兴你选择了我们的房源，提前欢迎你来巴厘岛！', time: '09:15' },
    { id: 3, sender: 'me', text: '你好 Sarah！非常期待这次旅行，想问一下从机场到住所大概多久？', time: '09:20' },
    { id: 4, sender: 'them', text: '从机场开车大约25分钟。我可以帮你安排接机服务，费用是 ¥150', time: '09:22' },
  ],
  2: [{ id: 1, sender: 'them', text: '请问可以提前入住吗？', time: '18:02' }],
  3: [{ id: 1, sender: 'them', text: '非常感谢你的推荐！那个餐厅太棒了', time: '11:40' }],
  4: [{ id: 1, sender: 'them', text: '退房已完成，期待下次再来', time: '12:12' }],
};

const state = {
  wishlist: [1, 2, 3, 4, 5, 6],
  orders: [],
};

export {
  articles,
  conversations,
  destinations,
  messages,
  partners,
  properties,
  propertyDetails,
  state,
};
