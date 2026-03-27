import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import {
  articles,
  conversations,
  destinations,
  messages,
  partners,
  properties,
  propertyDetails,
  state,
} from './data.js';

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 4000);

app.use(
  cors({
    origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : '*',
  }),
);
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ ok: true, service: 'travelapp-server' });
});

app.get('/api/home', (_req, res) => {
  res.json({
    hero: {
      title: '探索世界的美丽',
      subtitle: '发现独特的住宿体验，开启难忘的旅程。超过 100,000+ 个精选房源等你探索。',
      image: 'https://picsum.photos/seed/hero/1920/1080',
    },
    destinations,
    featuredProperties: properties.slice(0, 8),
    articles,
    partners,
  });
});

app.get('/api/properties', (req, res) => {
  const {
    minPrice,
    maxPrice,
    minRating,
    sortBy = 'recommended',
    page = '1',
    pageSize = '12',
    propertyType,
    amenities,
  } = req.query;

  let list = [...properties];

  if (minPrice) {
    list = list.filter((item) => item.price >= Number(minPrice));
  }
  if (maxPrice) {
    list = list.filter((item) => item.price <= Number(maxPrice));
  }
  if (minRating) {
    list = list.filter((item) => item.rating >= Number(minRating));
  }
  if (propertyType) {
    const types = String(propertyType).split(',');
    list = list.filter((item) => types.includes(item.type));
  }
  if (amenities) {
    const amenityList = String(amenities).split(',');
    list = list.filter((item) => amenityList.every((amenity) => item.amenities.includes(amenity)));
  }

  switch (sortBy) {
    case 'price_low':
      list.sort((a, b) => a.price - b.price);
      break;
    case 'price_high':
      list.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      list.sort((a, b) => b.rating - a.rating);
      break;
    default:
      list.sort((a, b) => b.reviewCount - a.reviewCount);
      break;
  }

  const p = Math.max(1, Number(page));
  const size = Math.max(1, Number(pageSize));
  const start = (p - 1) * size;
  const total = list.length;

  res.json({
    list: list.slice(start, start + size),
    total,
    page: p,
    pageSize: size,
    totalPages: Math.ceil(total / size),
    filters: {
      subNavs: ['住宿', '公寓', '别墅', '度假屋'],
      propertyTypes: ['酒店', '公寓', '别墅', '民宿', '度假屋', '客栈', '青年旅舍'],
      amenities: ['WiFi', '停车场', '游泳池', '空调', '厨房', '洗衣机', '健身房', '早餐'],
    },
  });
});

app.get('/api/properties/:id', (req, res) => {
  const id = Number(req.params.id);
  const baseDetail = propertyDetails[id];
  const property = properties.find((item) => item.id === id);
  if (!baseDetail && !property) {
    return res.status(404).json({ message: '房源不存在' });
  }

  const detail = baseDetail || {
    id,
    title: property.title,
    location: property.location,
    rating: property.rating,
    reviewCount: property.reviewCount,
    price: property.price,
    tag: property.tag || '精选',
    photos: Array.from({ length: 5 }, (_, i) => `https://picsum.photos/seed/detail${id}-${i + 1}/800/600`),
    description: [
      `${property.title} 位于 ${property.location}，装修现代，环境舒适，适合家庭与朋友出行。`,
      '周边交通便利，附近配套齐全，支持自助入住与灵活退房。',
    ],
    amenities: property.amenities,
    host: {
      id: 1,
      name: 'Fleet Host',
      avatar: 'https://picsum.photos/seed/host-default/100/100',
      intro: '认证房东 · 2021年加入',
      rating: property.rating,
      verified: true,
    },
    reviews: [
      {
        id: 1,
        name: '住客A',
        avatar: 'https://picsum.photos/seed/review-a/100/100',
        date: '2026年3月',
        rating: Math.max(4, Math.round(property.rating)),
        text: '整体体验很好，交通方便，房东回复及时。',
      },
    ],
    nearby: [
      { name: '城市中心', distance: '1.0 km', type: '商圈' },
      { name: '地铁站', distance: '700 m', type: '交通' },
    ],
    similar: properties.slice(0, 4).map((item) => item.id),
  };

  const similar = detail.similar
    .map((itemId) => properties.find((item) => item.id === itemId))
    .filter(Boolean);

  return res.json({
    ...detail,
    similar,
  });
});

app.get('/api/wishlist', (_req, res) => {
  const items = properties.filter((item) => state.wishlist.includes(item.id));
  res.json({
    tabs: ['住宿', '体验'],
    stays: items,
    experiences: [],
  });
});

app.post('/api/wishlist/toggle', (req, res) => {
  const { propertyId } = req.body;
  if (!propertyId) {
    return res.status(400).json({ message: 'propertyId 不能为空' });
  }

  const id = Number(propertyId);
  const exists = state.wishlist.includes(id);
  if (exists) {
    state.wishlist = state.wishlist.filter((itemId) => itemId !== id);
  } else {
    state.wishlist.push(id);
  }

  return res.json({
    success: true,
    wishlist: state.wishlist,
  });
});

app.get('/api/messages/conversations', (_req, res) => {
  res.json(conversations);
});

app.get('/api/messages/:conversationId', (req, res) => {
  const id = Number(req.params.conversationId);
  const list = messages[id] ?? [];
  res.json(list);
});

app.post('/api/messages/:conversationId', (req, res) => {
  const id = Number(req.params.conversationId);
  const { text } = req.body;
  if (!text || !String(text).trim()) {
    return res.status(400).json({ message: '消息内容不能为空' });
  }

  const list = messages[id] ?? [];
  const newMessage = {
    id: list.length + 1,
    sender: 'me',
    text: String(text).trim(),
    time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
  };
  messages[id] = [...list, newMessage];

  return res.status(201).json(newMessage);
});

app.post('/api/checkout', (req, res) => {
  const {
    name,
    phone,
    email,
    paymentMethod,
    propertyId = 1,
    checkIn = '2026-04-15',
    checkOut = '2026-04-20',
    guests = 2,
  } = req.body;

  if (!name || !phone || !email || !paymentMethod) {
    return res.status(400).json({ message: '请完整填写姓名、手机号、邮箱和支付方式' });
  }

  const property = properties.find((item) => item.id === Number(propertyId));
  if (!property) {
    return res.status(404).json({ message: '房源不存在' });
  }

  const orderId = `FL-${Date.now()}`;
  const nights = 5;
  const roomTotal = property.price * nights;
  const serviceFee = Math.round(roomTotal * 0.05);
  const cleaningFee = 100;
  const total = roomTotal + serviceFee + cleaningFee;

  const order = {
    orderId,
    status: 'confirmed',
    property: {
      id: property.id,
      title: property.title,
      location: property.location,
      image: property.image,
    },
    checkIn,
    checkOut,
    guests,
    breakdown: { roomTotal, serviceFee, cleaningFee, total },
    customer: { name, phone, email },
    paymentMethod,
    createdAt: new Date().toISOString(),
  };

  state.orders.push(order);
  return res.status(201).json(order);
});

app.get('/api/orders/:orderId', (req, res) => {
  const order = state.orders.find((item) => item.orderId === req.params.orderId);
  if (!order) {
    return res.status(404).json({ message: '订单不存在' });
  }
  return res.json(order);
});

app.use((_req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

app.listen(port, () => {
  console.log(`API server running at http://localhost:${port}`);
});
