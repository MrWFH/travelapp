import { useState } from 'react';
import { Plane, Clock, Luggage, UtensilsCrossed, Wifi, Armchair, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import Button from '@/components/Button';

const FARE_OPTIONS = [
  {
    name: '经济舱',
    price: 2580,
    features: ['23kg 托运行李', '标准座位', '机上餐食', '免费改签（起飞前24h）'],
    highlight: false,
  },
  {
    name: '商务舱',
    price: 5860,
    features: ['32kg 托运行李 ×2', '宽敞平躺座位', '精选餐食 + 酒水', '贵宾休息室', '免费改签', '优先登机'],
    highlight: true,
  },
  {
    name: '头等舱',
    price: 12800,
    features: ['40kg 托运行李 ×3', '独立套房座位', '米其林主厨餐食', '头等舱贵宾室', '专车接送', '无限制改签退票'],
    highlight: false,
  },
];

function FlightDetail() {
  const [selectedFare, setSelectedFare] = useState(0);

  return (
    <div className="min-h-screen bg-neutral-8">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumb
          items={[
            { label: '首页', path: '/' },
            { label: '机票', path: '/flights' },
            { label: '北京 → 东京' },
          ]}
          className="mb-6"
        />

        {/* Flight Itinerary */}
        <div className="bg-white rounded-2xl border border-neutral-6 p-6 md:p-8 mb-8">
          <h2 className="text-xl font-bold text-neutral-1 mb-6">航班详情</h2>

          {/* Outbound */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-primary-1/10 text-primary-1 rounded-full text-xs font-semibold">去程</span>
              <span className="text-sm text-neutral-4">2026年4月15日 · 周三</span>
            </div>

            <div className="flex items-center gap-6 md:gap-12">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-neutral-1">08:30</div>
                <div className="text-sm font-medium text-neutral-2 mt-1">北京 (PEK)</div>
                <div className="text-xs text-neutral-4">首都国际机场 T3</div>
              </div>

              <div className="flex-1 flex flex-col items-center gap-2">
                <div className="flex items-center gap-2 text-sm text-neutral-4">
                  <Clock size={14} />
                  <span>3小时15分</span>
                </div>
                <div className="w-full relative">
                  <div className="h-0.5 bg-neutral-6 w-full" />
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-primary-1 bg-white" />
                  <Plane size={16} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-primary-1" />
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary-1" />
                </div>
                <div className="text-xs text-neutral-4">直飞 · 中国国航 CA925</div>
              </div>

              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-neutral-1">14:45</div>
                <div className="text-sm font-medium text-neutral-2 mt-1">东京 (NRT)</div>
                <div className="text-xs text-neutral-4">成田国际机场 T1</div>
              </div>
            </div>

            <div className="flex items-center gap-6 mt-4 text-xs text-neutral-4">
              <span className="flex items-center gap-1"><Plane size={12} /> 波音 787-9</span>
              <span className="flex items-center gap-1"><Luggage size={12} /> 23kg 托运</span>
              <span className="flex items-center gap-1"><UtensilsCrossed size={12} /> 含餐</span>
              <span className="flex items-center gap-1"><Wifi size={12} /> WiFi</span>
            </div>
          </div>

          {/* Return */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-primary-4/10 text-primary-4 rounded-full text-xs font-semibold">返程</span>
              <span className="text-sm text-neutral-4">2026年4月22日 · 周三</span>
            </div>

            <div className="flex items-center gap-6 md:gap-12">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-neutral-1">16:00</div>
                <div className="text-sm font-medium text-neutral-2 mt-1">东京 (NRT)</div>
                <div className="text-xs text-neutral-4">成田国际机场 T1</div>
              </div>

              <div className="flex-1 flex flex-col items-center gap-2">
                <div className="flex items-center gap-2 text-sm text-neutral-4">
                  <Clock size={14} />
                  <span>3小时30分</span>
                </div>
                <div className="w-full relative">
                  <div className="h-0.5 bg-neutral-6 w-full" />
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-primary-1 bg-white" />
                  <Plane size={16} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-primary-1 rotate-180" />
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary-1" />
                </div>
                <div className="text-xs text-neutral-4">直飞 · 中国国航 CA926</div>
              </div>

              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-neutral-1">19:30</div>
                <div className="text-sm font-medium text-neutral-2 mt-1">北京 (PEK)</div>
                <div className="text-xs text-neutral-4">首都国际机场 T3</div>
              </div>
            </div>

            <div className="flex items-center gap-6 mt-4 text-xs text-neutral-4">
              <span className="flex items-center gap-1"><Plane size={12} /> 空客 A350-900</span>
              <span className="flex items-center gap-1"><Luggage size={12} /> 23kg 托运</span>
              <span className="flex items-center gap-1"><UtensilsCrossed size={12} /> 含餐</span>
              <span className="flex items-center gap-1"><Wifi size={12} /> WiFi</span>
            </div>
          </div>
        </div>

        {/* Fare Options */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-neutral-1 mb-6">选择舱位</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {FARE_OPTIONS.map((fare, i) => (
              <button
                key={fare.name}
                onClick={() => setSelectedFare(i)}
                className={`text-left p-6 rounded-2xl border-2 transition-all cursor-pointer ${
                  selectedFare === i
                    ? 'border-primary-1 bg-primary-1/5 shadow-md'
                    : 'border-neutral-6 bg-white hover:border-neutral-4'
                } ${fare.highlight ? 'relative' : ''}`}
              >
                {fare.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-secondary-4 text-white text-xs font-semibold rounded-full">
                    推荐
                  </span>
                )}
                <div className="flex items-center gap-2 mb-1">
                  <Armchair size={18} className="text-primary-1" />
                  <h3 className="font-bold text-neutral-1">{fare.name}</h3>
                </div>
                <div className="text-2xl font-bold text-primary-1 mb-4">
                  ¥{fare.price.toLocaleString()}
                  <span className="text-sm font-normal text-neutral-4">/人</span>
                </div>
                <ul className="space-y-2">
                  {fare.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-neutral-3">
                      <ChevronRight size={14} className="text-primary-4 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </button>
            ))}
          </div>
        </div>

        {/* Price Breakdown & CTA */}
        <div className="bg-white rounded-2xl border border-neutral-6 p-6 md:p-8">
          <h2 className="text-xl font-bold text-neutral-1 mb-6">价格明细</h2>
          <div className="space-y-3 text-sm mb-6">
            <div className="flex justify-between">
              <span className="text-neutral-4">机票 ({FARE_OPTIONS[selectedFare].name}) × 2 人</span>
              <span className="text-neutral-2">¥{(FARE_OPTIONS[selectedFare].price * 2).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-4">税费及附加费</span>
              <span className="text-neutral-2">¥580</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-4">燃油附加费</span>
              <span className="text-neutral-2">¥320</span>
            </div>
            <hr className="border-neutral-6" />
            <div className="flex justify-between text-lg font-bold">
              <span className="text-neutral-1">总计</span>
              <span className="text-primary-1">¥{(FARE_OPTIONS[selectedFare].price * 2 + 580 + 320).toLocaleString()}</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link to="/checkout" className="w-full sm:w-auto">
              <Button size="lg" className="w-full">继续预订</Button>
            </Link>
            <p className="text-xs text-neutral-4">
              价格含税。支持免费取消（起飞前24小时）。
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default FlightDetail;
