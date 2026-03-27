import { Star, Shield, Award, MapPin, Calendar, MessageSquare, Flag } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/PropertyCard';
import Button from '@/components/Button';
import Rating from '@/components/Rating';

const HOST_PROPERTIES = [
  { id: 10, image: 'https://picsum.photos/seed/hp1/600/400', title: '海景豪华套房', location: '巴厘岛, 印度尼西亚', price: 688, rating: 4.9, reviewCount: 128, tag: '超赞房东' },
  { id: 11, image: 'https://picsum.photos/seed/hp2/600/400', title: '热带花园别墅', location: '巴厘岛, 印度尼西亚', price: 780, rating: 4.8, reviewCount: 96 },
  { id: 12, image: 'https://picsum.photos/seed/hp3/600/400', title: '悬崖无边泳池屋', location: '巴厘岛, 印度尼西亚', price: 1100, rating: 4.9, reviewCount: 67, tag: '新上线' },
  { id: 13, image: 'https://picsum.photos/seed/hp4/600/400', title: '丛林静谧小屋', location: '巴厘岛, 印度尼西亚', price: 560, rating: 4.6, reviewCount: 88 },
];

const GUEST_REVIEWS = [
  { id: 1, name: '李明', avatar: 'https://picsum.photos/seed/gr1/100/100', date: '2026年2月', rating: 5, text: '非常棒的住宿体验！Sarah 非常热心，提前发了详细的入住指南，还推荐了很多当地好去处。房间比照片上还美！' },
  { id: 2, name: '王芳', avatar: 'https://picsum.photos/seed/gr2/100/100', date: '2026年1月', rating: 5, text: '完美的假期！Sarah 帮我们安排了接机和一日游，省去了很多麻烦。房源设施一流，泳池太棒了。' },
  { id: 3, name: '张伟', avatar: 'https://picsum.photos/seed/gr3/100/100', date: '2025年12月', rating: 4, text: '房间干净整洁，位置优越。Sarah 回复消息很及时，是非常负责的房东。唯一建议是增加一些中文指引。' },
  { id: 4, name: '陈静', avatar: 'https://picsum.photos/seed/gr4/100/100', date: '2025年11月', rating: 5, text: '连续第三年入住 Sarah 的房源了！每次都有惊喜。强烈推荐给所有来巴厘岛的朋友。' },
  { id: 5, name: 'David Kim', avatar: 'https://picsum.photos/seed/gr5/100/100', date: '2025年10月', rating: 5, text: 'Amazing host! Very responsive and helpful. The property exceeded our expectations.' },
];

const BADGES = [
  { icon: Shield, label: '身份已验证', color: 'text-primary-4' },
  { icon: Award, label: '超赞房东', color: 'text-secondary-3' },
  { icon: Star, label: '4.9 评分', color: 'text-secondary-3' },
];

function HostProfile() {
  return (
    <div className="min-h-screen bg-neutral-8">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Host Sidebar */}
          <div className="lg:w-80 shrink-0">
            <div className="bg-white rounded-2xl border border-neutral-6 p-6 text-center sticky top-24">
              <img
                src="https://picsum.photos/seed/host/200/200"
                alt="host avatar"
                className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-neutral-7 mb-4"
              />
              <h1 className="text-xl font-bold text-neutral-1 mb-1">Sarah Chen</h1>
              <p className="text-sm text-neutral-4 flex items-center justify-center gap-1 mb-4">
                <MapPin size={14} /> 巴厘岛, 印度尼西亚
              </p>

              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {BADGES.map(({ icon: Icon, label, color }) => (
                  <span key={label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-7 text-xs font-medium text-neutral-2">
                    <Icon size={14} className={color} />
                    {label}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="p-3 rounded-xl bg-neutral-7">
                  <div className="text-lg font-bold text-primary-1">291</div>
                  <div className="text-xs text-neutral-4">条评价</div>
                </div>
                <div className="p-3 rounded-xl bg-neutral-7">
                  <div className="text-lg font-bold text-primary-1">4.9</div>
                  <div className="text-xs text-neutral-4">平均评分</div>
                </div>
                <div className="p-3 rounded-xl bg-neutral-7">
                  <div className="text-lg font-bold text-primary-1">6</div>
                  <div className="text-xs text-neutral-4">年经验</div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-neutral-4 justify-center mb-6">
                <Calendar size={14} />
                <span>2020年加入 Fleet</span>
              </div>

              <div className="space-y-3">
                <Link to="/messages">
                  <Button className="w-full" leftIcon={<MessageSquare size={16} />}>联系房东</Button>
                </Link>
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium text-neutral-4 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer">
                  <Flag size={14} /> 举报此房东
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* About */}
            <div className="bg-white rounded-2xl border border-neutral-6 p-6 mb-6">
              <h2 className="text-lg font-bold text-neutral-1 mb-3">关于 Sarah</h2>
              <p className="text-neutral-3 leading-relaxed mb-4">
                大家好！我是 Sarah，来自加拿大，2018年爱上巴厘岛后便定居于此。
                我热衷于为每一位旅客打造难忘的住宿体验，从精心设计的房源到贴心的入住服务，
                每一个细节都是用心准备的。
              </p>
              <p className="text-neutral-3 leading-relaxed">
                我自己也是一位资深旅行者，去过40多个国家。我深知旅行中住宿体验的重要性，
                所以我的每一套房源都融入了我对旅行和生活美学的理解。希望你在这里能感受到家一般的温暖，
                同时享受巴厘岛独特的热带风情！
              </p>
            </div>

            {/* Listed Properties */}
            <div className="mb-6">
              <h2 className="text-lg font-bold text-neutral-1 mb-4">Sarah 的房源</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {HOST_PROPERTIES.map((prop) => (
                  <PropertyCard key={prop.id} {...prop} />
                ))}
              </div>
            </div>

            {/* Guest Reviews */}
            <div className="bg-white rounded-2xl border border-neutral-6 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-neutral-1">房客评价</h2>
                <Rating score={4.9} count={291} />
              </div>

              <div className="space-y-6">
                {GUEST_REVIEWS.map((review) => (
                  <div key={review.id} className="pb-6 border-b border-neutral-6 last:border-0 last:pb-0">
                    <div className="flex items-center gap-3 mb-3">
                      <img src={review.avatar} alt={review.name} className="w-10 h-10 rounded-full object-cover" />
                      <div className="flex-1">
                        <div className="font-medium text-sm text-neutral-2">{review.name}</div>
                        <div className="text-xs text-neutral-4">{review.date}</div>
                      </div>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: review.rating }, (_, i) => (
                          <Star key={i} size={12} className="fill-secondary-3 text-secondary-3" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-neutral-3 leading-relaxed">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default HostProfile;
