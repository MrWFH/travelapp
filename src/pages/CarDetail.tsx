import { useState } from 'react';
import {
  Users, DoorOpen, Settings2, Fuel, Snowflake, Gauge,
  Shield, Calendar, MapPin, ChevronRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import Rating from '@/components/Rating';
import Button from '@/components/Button';

const PHOTOS = Array.from({ length: 4 }, (_, i) => `https://picsum.photos/seed/cardet${i + 1}/800/600`);

const SPECS = [
  { icon: Users, label: '座位', value: '5座' },
  { icon: DoorOpen, label: '车门', value: '4门' },
  { icon: Settings2, label: '变速箱', value: '自动挡' },
  { icon: Fuel, label: '燃料', value: '汽油' },
  { icon: Snowflake, label: '空调', value: '有' },
  { icon: Gauge, label: '排量', value: '2.0T' },
];

const INSURANCE_OPTIONS = [
  { name: '基础保障', desc: '包含第三者责任险、车辆损失险', price: 0 },
  { name: '全面保障', desc: '基础保障 + 零免赔 + 玻璃单独破碎险', price: 68 },
  { name: '尊享保障', desc: '全面保障 + 道路救援 + 代驾服务', price: 128 },
];

const RENTAL_TERMS = [
  '取车时需出示有效驾照（至少持有1年）',
  '需携带与预订姓名一致的信用卡',
  '油量满取满还，否则按市场价补差',
  '超出里程按 ¥1.5/公里 计费',
  '免费提供儿童安全座椅（需提前预约）',
];

function CarDetail() {
  const [selectedInsurance, setSelectedInsurance] = useState(0);
  const [mainPhoto, setMainPhoto] = useState(0);

  const dailyPrice = 458;
  const days = 5;
  const insurancePrice = INSURANCE_OPTIONS[selectedInsurance].price * days;
  const total = dailyPrice * days + insurancePrice;

  return (
    <div className="min-h-screen bg-neutral-8">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumb
          items={[
            { label: '首页', path: '/' },
            { label: '租车', path: '/car-rentals' },
            { label: '宝马 3系' },
          ]}
          className="mb-6"
        />

        {/* Photo Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-8">
          <div className="md:col-span-3 rounded-2xl overflow-hidden aspect-[16/10]">
            <img src={PHOTOS[mainPhoto]} alt="car main" className="w-full h-full object-cover" />
          </div>
          <div className="md:col-span-2 grid grid-cols-2 gap-3">
            {PHOTOS.map((photo, i) => (
              <button
                key={i}
                onClick={() => setMainPhoto(i)}
                className={`rounded-xl overflow-hidden aspect-[4/3] cursor-pointer border-2 transition-colors ${
                  mainPhoto === i ? 'border-primary-1' : 'border-transparent'
                }`}
              >
                <img src={photo} alt={`car-${i}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: Details */}
          <div className="flex-1 min-w-0">
            <div className="mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-neutral-1 mb-2">宝马 3系 2025款</h1>
              <div className="flex items-center gap-4 text-sm text-neutral-4">
                <span>豪华型</span>
                <Rating score={4.8} count={112} />
              </div>
            </div>

            {/* Specs */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-neutral-1 mb-4">车辆参数</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {SPECS.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-3 p-4 rounded-xl bg-neutral-7">
                    <Icon size={20} className="text-primary-1" />
                    <div>
                      <div className="text-xs text-neutral-4">{label}</div>
                      <div className="text-sm font-semibold text-neutral-2">{value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Rental Terms */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-neutral-1 mb-4">租赁条款</h2>
              <div className="space-y-3">
                {RENTAL_TERMS.map((term) => (
                  <div key={term} className="flex items-start gap-3 text-sm text-neutral-3">
                    <ChevronRight size={16} className="text-primary-4 shrink-0 mt-0.5" />
                    <span>{term}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Insurance */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-neutral-1 mb-4">保险方案</h2>
              <div className="space-y-3">
                {INSURANCE_OPTIONS.map((opt, i) => (
                  <button
                    key={opt.name}
                    onClick={() => setSelectedInsurance(i)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all cursor-pointer ${
                      selectedInsurance === i
                        ? 'border-primary-1 bg-primary-1/5'
                        : 'border-neutral-6 hover:border-neutral-4'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <Shield size={16} className="text-primary-1" />
                        <span className="font-semibold text-neutral-2">{opt.name}</span>
                      </div>
                      <span className="font-bold text-primary-1">
                        {opt.price === 0 ? '免费' : `¥${opt.price}/天`}
                      </span>
                    </div>
                    <p className="text-sm text-neutral-4 ml-6">{opt.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Booking */}
          <div className="lg:w-96 shrink-0">
            <div className="sticky top-24 rounded-2xl border border-neutral-6 bg-white p-6 shadow-lg">
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-3xl font-bold text-primary-1">¥{dailyPrice}</span>
                <span className="text-neutral-4">/天</span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-neutral-7">
                  <MapPin size={18} className="text-primary-1" />
                  <div>
                    <div className="text-xs text-neutral-4">取/还车地点</div>
                    <div className="text-sm font-medium text-neutral-2">上海浦东国际机场</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-neutral-7">
                  <Calendar size={18} className="text-primary-1" />
                  <div>
                    <div className="text-xs text-neutral-4">租赁时间</div>
                    <div className="text-sm font-medium text-neutral-2">4月15日 — 4月20日 (5天)</div>
                  </div>
                </div>
              </div>

              <div className="space-y-3 text-sm mb-6">
                <div className="flex justify-between">
                  <span className="text-neutral-4">¥{dailyPrice} × {days} 天</span>
                  <span className="text-neutral-2">¥{dailyPrice * days}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-4">保险 ({INSURANCE_OPTIONS[selectedInsurance].name})</span>
                  <span className="text-neutral-2">¥{insurancePrice}</span>
                </div>
                <hr className="border-neutral-6" />
                <div className="flex justify-between font-bold text-lg">
                  <span className="text-neutral-1">合计</span>
                  <span className="text-primary-1">¥{total.toLocaleString()}</span>
                </div>
              </div>

              <Link to="/checkout">
                <Button className="w-full" size="lg">预订</Button>
              </Link>
              <p className="text-xs text-neutral-4 text-center mt-3">免费取消（取车前48小时）</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default CarDetail;
