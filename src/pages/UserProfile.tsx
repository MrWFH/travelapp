import { Star, MapPin, Calendar, Settings, Shield, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import Rating from '@/components/Rating';

const REVIEWS = [
  { id: 1, author: 'Sarah Chen', avatar: 'https://picsum.photos/seed/rev1/100/100', date: '2026年3月', property: '海景豪华套房', rating: 5, text: '非常愉快的房客体验！房间整洁有序，沟通非常顺畅。期待下次再来。' },
  { id: 2, author: '田中优子', avatar: 'https://picsum.photos/seed/rev2/100/100', date: '2026年2月', property: '山景温泉旅馆', rating: 5, text: '很棒的旅客！非常有礼貌，退房时房间也保持得很干净。强烈推荐。' },
  { id: 3, author: 'David Kim', avatar: 'https://picsum.photos/seed/rev3/100/100', date: '2026年1月', property: '市中心现代公寓', rating: 4, text: '很不错的房客，准时入住和退房。唯一的小建议是入住时间可以提前沟通一下。' },
  { id: 4, author: '李雪', avatar: 'https://picsum.photos/seed/rev4/100/100', date: '2025年12月', property: '古典花园别墅', rating: 5, text: '超级好的住客！和家人一起来旅行，非常温馨。期待再次相会！' },
];

const STATS = [
  { label: '条评价', value: 23 },
  { label: '平均评分', value: 4.8 },
  { label: '次旅行', value: 15 },
];

function UserProfile() {
  return (
    <div className="min-h-screen bg-neutral-8">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Profile Sidebar */}
          <div className="lg:w-80 shrink-0">
            <div className="bg-white rounded-2xl border border-neutral-6 p-6 text-center sticky top-24">
              <img
                src="https://picsum.photos/seed/profile/200/200"
                alt="avatar"
                className="w-28 h-28 rounded-full mx-auto object-cover border-4 border-neutral-7 mb-4"
              />
              <h1 className="text-xl font-bold text-neutral-1 mb-1">李明</h1>
              <p className="text-sm text-neutral-4 mb-4">旅行爱好者 · 摄影达人</p>

              <div className="flex items-center justify-center gap-2 text-sm text-neutral-4 mb-6">
                <Calendar size={14} />
                <span>2024年6月加入</span>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-6">
                {STATS.map((stat) => (
                  <div key={stat.label} className="p-3 rounded-xl bg-neutral-7">
                    <div className="text-lg font-bold text-primary-1">{stat.value}</div>
                    <div className="text-xs text-neutral-4">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm text-neutral-3">
                  <Shield size={16} className="text-primary-4 shrink-0" />
                  <span>身份已验证</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-neutral-3">
                  <Award size={16} className="text-secondary-3 shrink-0" />
                  <span>超级旅行者</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-neutral-3">
                  <MapPin size={16} className="text-primary-1 shrink-0" />
                  <span>上海, 中国</span>
                </div>
              </div>

              <Link to="/account">
                <Button variant="outline" className="w-full" leftIcon={<Settings size={16} />}>
                  编辑资料
                </Button>
              </Link>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Bio */}
            <div className="bg-white rounded-2xl border border-neutral-6 p-6 mb-6">
              <h2 className="text-lg font-bold text-neutral-1 mb-3">关于我</h2>
              <p className="text-neutral-3 leading-relaxed">
                热爱旅行和摄影的自由职业者，去过20+个国家。喜欢探索当地文化和美食，
                热衷于寻找世界各地独特的住宿体验。平时也喜欢潜水和徒步，
                相信旅行是最好的教育方式。希望在 Fleet 上认识更多志同道合的朋友！
              </p>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-2xl border border-neutral-6 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-neutral-1">收到的评价</h2>
                <Rating score={4.8} count={23} />
              </div>

              <div className="space-y-6">
                {REVIEWS.map((review) => (
                  <div key={review.id} className="pb-6 border-b border-neutral-6 last:border-0 last:pb-0">
                    <div className="flex items-center gap-3 mb-3">
                      <img src={review.avatar} alt={review.author} className="w-10 h-10 rounded-full object-cover" />
                      <div className="flex-1">
                        <div className="font-medium text-sm text-neutral-2">{review.author}</div>
                        <div className="text-xs text-neutral-4">{review.date} · {review.property}</div>
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

export default UserProfile;
