import { useEffect, useMemo, useState } from 'react';
import {
  Share2, Heart, MapPin, Wifi, UtensilsCrossed, Car, Snowflake,
  WashingMachine, Tv, ChevronLeft, ChevronRight, Images, Star,
  ShieldCheck, Bath, Dumbbell, TreePalm,
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import Rating from '@/components/Rating';
import PropertyCard from '@/components/PropertyCard';
import Button from '@/components/Button';
import Tag from '@/components/Tag';
import { getPropertyDetail, type PropertyDetailResponse } from '@/service/travelApi';

const amenityIcons = {
  高速WiFi: Wifi,
  厨房: UtensilsCrossed,
  免费停车: Car,
  空调: Snowflake,
  洗衣机: WashingMachine,
  电视: Tv,
  浴缸: Bath,
  健身房: Dumbbell,
  花园: TreePalm,
  安保系统: ShieldCheck,
} as const;

function ProductDetail() {
  const { id = '1' } = useParams();
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [guests, setGuests] = useState(2);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [detail, setDetail] = useState<PropertyDetailResponse | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [actionMessage, setActionMessage] = useState('');

  useEffect(() => {
    let mounted = true;

    async function loadPropertyDetail() {
      setLoading(true);
      setError('');
      try {
        const response = await getPropertyDetail(id);
        if (mounted) {
          setDetail(response);
        }
      } catch (err) {
        if (mounted) {
          const message = err instanceof Error ? err.message : '加载房源详情失败';
          setError(message);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadPropertyDetail();
    return () => {
      mounted = false;
    };
  }, [id]);

  const nights = 5;
  const roomTotal = useMemo(() => (detail ? detail.price * nights : 0), [detail]);
  const serviceFee = Math.round(roomTotal * 0.05);
  const cleaningFee = 100;
  const total = roomTotal + serviceFee + cleaningFee;

  return (
    <div className="min-h-screen bg-neutral-8">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumb
          items={[
            { label: '首页', path: '/' },
            { label: '住宿', path: '/stays' },
            { label: detail?.location.split(',')[0] || '目的地', path: '/stays' },
            { label: detail?.title || '房源详情' },
          ]}
          className="mb-4"
        />

        {/* Photo Gallery */}
        <div className="relative grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-2 rounded-2xl overflow-hidden h-[300px] md:h-[460px] mb-6">
          <div className="md:col-span-2 md:row-span-2">
            <img src={detail?.photos[0] || 'https://picsum.photos/seed/detail1/800/600'} alt="main" className="w-full h-full object-cover" />
          </div>
          {(detail?.photos.slice(1) || []).map((photo, i) => (
            <div key={i} className="hidden md:block">
              <img src={photo} alt={`photo-${i + 1}`} className="w-full h-full object-cover" />
            </div>
          ))}
          <button
            onClick={() => {
              const next = !showAllPhotos;
              setShowAllPhotos(next);
              setActionMessage(next ? '已切换为查看全部照片模式。' : '已返回精选照片视图。');
            }}
            className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur text-sm font-medium text-neutral-2 hover:bg-white transition-colors cursor-pointer"
          >
            <Images size={16} />
            {showAllPhotos ? '收起照片' : '显示所有照片'}
          </button>
        </div>

        {/* Title & Actions */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Tag>{detail?.tag || '精选'}</Tag>
              <Tag variant="ghost">整套房源</Tag>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-neutral-1 mb-2">
              {detail?.title || '房源详情'}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-4">
              <span className="flex items-center gap-1">
                <MapPin size={16} /> {detail?.location || '位置加载中'}
              </span>
              <Rating score={detail?.rating || 0} count={detail?.reviewCount || 0} />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                const pageUrl = window.location.href;
                if (navigator.clipboard?.writeText) {
                  void navigator.clipboard.writeText(pageUrl);
                  setActionMessage('链接已复制，可分享给朋友。');
                  return;
                }
                setActionMessage('当前浏览器不支持自动复制，请手动复制地址栏链接。');
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-6 text-sm font-medium text-neutral-2 hover:bg-neutral-7 cursor-pointer"
            >
              <Share2 size={16} /> 分享
            </button>
            <button
              onClick={() => {
                setIsFavorite((prev) => !prev);
                setActionMessage(isFavorite ? '已取消收藏该房源。' : '已收藏该房源。');
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium cursor-pointer ${
                isFavorite
                  ? 'border-red-200 bg-red-50 text-red-500'
                  : 'border-neutral-6 text-neutral-2 hover:bg-neutral-7'
              }`}
            >
              <Heart size={16} className={isFavorite ? 'fill-red-500 text-red-500' : ''} /> 收藏
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column */}
          <div className="flex-1 min-w-0">
            {/* Description */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-neutral-1 mb-4">关于此住宿</h2>
              {(detail?.description || []).map((item) => (
                <p key={item} className="text-neutral-3 leading-relaxed mb-4 last:mb-0">
                  {item}
                </p>
              ))}
            </div>

            {/* Amenities */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-neutral-1 mb-4">设施与服务</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {(detail?.amenities || []).map((label) => {
                  const Icon = amenityIcons[label as keyof typeof amenityIcons] || ShieldCheck;
                  return (
                  <div key={label} className="flex items-center gap-3 p-3 rounded-xl bg-neutral-7">
                    <Icon size={20} className="text-primary-1" />
                    <span className="text-sm font-medium text-neutral-2">{label}</span>
                  </div>
                  );
                })}
              </div>
            </div>

            {/* Host Info */}
            <div className="mb-8 p-6 rounded-2xl border border-neutral-6">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={detail?.host.avatar || 'https://picsum.photos/seed/host/100/100'}
                  alt="host"
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-neutral-2">由 {detail?.host.name || '房东'} 出租</h3>
                  <p className="text-sm text-neutral-4">{detail?.host.intro || '房东信息加载中'}</p>
                </div>
                <Link to="/host/1" className="ml-auto">
                  <Button variant="outline" size="sm">查看主页</Button>
                </Link>
              </div>
              <div className="flex items-center gap-6 text-sm text-neutral-4">
                <span className="flex items-center gap-1"><Star size={14} className="text-secondary-3" /> {detail?.host.rating || 0} 评分</span>
                <span>{detail?.reviewCount || 0} 条评价</span>
                <span className="flex items-center gap-1"><ShieldCheck size={14} className="text-primary-4" /> 身份已验证</span>
              </div>
            </div>

            {/* Reviews */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-neutral-1">住客评价</h2>
                <Rating score={detail?.rating || 0} count={detail?.reviewCount || 0} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(detail?.reviews || []).map((review) => (
                  <div key={review.id} className="p-5 rounded-2xl border border-neutral-6">
                    <div className="flex items-center gap-3 mb-3">
                      <img src={review.avatar} alt={review.name} className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <div className="font-medium text-sm text-neutral-2">{review.name}</div>
                        <div className="text-xs text-neutral-4">{review.date}</div>
                      </div>
                      <div className="ml-auto flex items-center gap-1">
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

            {/* Nearby */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-neutral-1 mb-4">附近景点</h2>
              <div className="space-y-3">
                {(detail?.nearby || []).map((place) => (
                  <div key={place.name} className="flex items-center justify-between py-3 border-b border-neutral-6 last:border-0">
                    <div className="flex items-center gap-3">
                      <MapPin size={16} className="text-primary-1" />
                      <div>
                        <span className="text-sm font-medium text-neutral-2">{place.name}</span>
                        <span className="ml-2 text-xs text-neutral-4">{place.type}</span>
                      </div>
                    </div>
                    <span className="text-sm text-neutral-4">{place.distance}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:w-96 shrink-0">
            <div className="sticky top-24 rounded-2xl border border-neutral-6 bg-white p-6 shadow-lg">
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-3xl font-bold text-primary-1">¥{detail?.price || 0}</span>
                <span className="text-neutral-4">/晚</span>
              </div>

              <div className="border border-neutral-6 rounded-xl overflow-hidden mb-4">
                <div className="grid grid-cols-2">
                  <div className="p-3 border-r border-neutral-6">
                    <div className="text-xs text-neutral-4 font-medium mb-1">入住</div>
                    <div className="text-sm font-medium text-neutral-2">2026年4月15日</div>
                  </div>
                  <div className="p-3">
                    <div className="text-xs text-neutral-4 font-medium mb-1">退房</div>
                    <div className="text-sm font-medium text-neutral-2">2026年4月20日</div>
                  </div>
                </div>
                <div className="p-3 border-t border-neutral-6">
                  <div className="text-xs text-neutral-4 font-medium mb-1">旅客</div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-neutral-2">{guests} 位旅客</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setGuests(Math.max(1, guests - 1))}
                        className="w-7 h-7 rounded-full border border-neutral-5 flex items-center justify-center text-neutral-4 hover:border-neutral-2 cursor-pointer"
                      >
                        <ChevronLeft size={14} />
                      </button>
                      <button
                        onClick={() => setGuests(Math.min(10, guests + 1))}
                        className="w-7 h-7 rounded-full border border-neutral-5 flex items-center justify-center text-neutral-4 hover:border-neutral-2 cursor-pointer"
                      >
                        <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <Link to="/checkout">
                <Button className="w-full mb-4" size="lg">预订</Button>
              </Link>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-4">¥{detail?.price || 0} × 5 晚</span>
                  <span className="text-neutral-2">¥{roomTotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-4">服务费</span>
                  <span className="text-neutral-2">¥{serviceFee}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-4">清洁费</span>
                  <span className="text-neutral-2">¥{cleaningFee}</span>
                </div>
                <hr className="border-neutral-6" />
                <div className="flex justify-between font-bold">
                  <span className="text-neutral-1">合计</span>
                  <span className="text-neutral-1">¥{total}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Properties */}
        <section className="py-12">
          <h2 className="text-xl font-bold text-neutral-1 mb-6">相似房源推荐</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(detail?.similar || []).map((prop) => (
              <PropertyCard key={prop.id} {...prop} />
            ))}
          </div>
        </section>
      </div>

      <Footer />

      {loading && (
        <div className="fixed bottom-5 right-5 rounded-full bg-neutral-2 px-4 py-2 text-xs text-white shadow">
          正在加载房源详情...
        </div>
      )}
      {error && (
        <div className="fixed bottom-5 left-5 rounded-full bg-red-500 px-4 py-2 text-xs text-white shadow">
          {error}
        </div>
      )}
      {actionMessage && !error && (
        <div className="fixed bottom-5 left-5 rounded-full bg-primary-1 px-4 py-2 text-xs text-white shadow">
          {actionMessage}
        </div>
      )}
    </div>
  );
}

export default ProductDetail;
