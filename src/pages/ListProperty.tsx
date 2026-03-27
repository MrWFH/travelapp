import { useState } from 'react';
import {
  Home, Building2, TreePalm, Tent, Castle, Mountain,
  MapPin, Upload, Plus, Minus, Wifi, UtensilsCrossed, Car,
  Snowflake, WashingMachine, Tv, Bath, Dumbbell, TreePalm as Garden,
  ShieldCheck, Camera, DollarSign, CheckCircle,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Button from '@/components/Button';

const PROPERTY_TYPES = [
  { icon: Building2, label: '酒店' },
  { icon: Home, label: '公寓' },
  { icon: TreePalm, label: '度假村' },
  { icon: Tent, label: '露营地' },
  { icon: Castle, label: '城堡' },
  { icon: Mountain, label: '山间小屋' },
];

const AMENITY_OPTIONS = [
  { icon: Wifi, label: 'WiFi' },
  { icon: UtensilsCrossed, label: '厨房' },
  { icon: Car, label: '停车场' },
  { icon: Snowflake, label: '空调' },
  { icon: WashingMachine, label: '洗衣机' },
  { icon: Tv, label: '电视' },
  { icon: Bath, label: '浴缸' },
  { icon: Dumbbell, label: '健身房' },
  { icon: Garden, label: '花园' },
  { icon: ShieldCheck, label: '安保系统' },
];

function ListProperty() {
  const [selectedType, setSelectedType] = useState('');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [rooms, setRooms] = useState({ bedrooms: 1, beds: 1, bathrooms: 1 });
  const [guests, setGuests] = useState(2);

  const toggleAmenity = (label: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(label) ? prev.filter((a) => a !== label) : [...prev, label]
    );
  };

  const updateCount = (field: keyof typeof rooms, delta: number) => {
    setRooms((prev) => ({ ...prev, [field]: Math.max(1, prev[field] + delta) }));
  };

  return (
    <div className="min-h-screen bg-neutral-8">
      <Navbar />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-10">
          <h1 className="text-2xl md:text-3xl font-bold text-neutral-1 mb-2">发布你的房源</h1>
          <p className="text-neutral-4">在 Fleet 上分享你的空间，开始赚取收入</p>
        </div>

        <div className="space-y-8">
          {/* Step 1: Property Type */}
          <section className="bg-white rounded-2xl border border-neutral-6 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-8 rounded-full bg-primary-1 text-white flex items-center justify-center text-sm font-bold">1</span>
              <h2 className="text-lg font-bold text-neutral-1">房源类型</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {PROPERTY_TYPES.map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  onClick={() => setSelectedType(label)}
                  className={`flex flex-col items-center gap-2 p-5 rounded-xl border-2 transition-all cursor-pointer ${
                    selectedType === label
                      ? 'border-primary-1 bg-primary-1/5 text-primary-1'
                      : 'border-neutral-6 text-neutral-3 hover:border-neutral-4'
                  }`}
                >
                  <Icon size={28} />
                  <span className="text-sm font-medium">{label}</span>
                </button>
              ))}
            </div>
          </section>

          {/* Step 2: Location */}
          <section className="bg-white rounded-2xl border border-neutral-6 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-8 rounded-full bg-primary-1 text-white flex items-center justify-center text-sm font-bold">2</span>
              <h2 className="text-lg font-bold text-neutral-1">位置信息</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-3 mb-1.5">详细地址</label>
                <div className="relative">
                  <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-4" />
                  <input
                    type="text"
                    placeholder="请输入房源地址"
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-neutral-6 text-sm outline-none focus:border-primary-1 transition-colors"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-3 mb-1.5">城市</label>
                  <input type="text" placeholder="所在城市" className="w-full px-4 py-3 rounded-xl border border-neutral-6 text-sm outline-none focus:border-primary-1 transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-3 mb-1.5">国家/地区</label>
                  <input type="text" placeholder="所在国家" className="w-full px-4 py-3 rounded-xl border border-neutral-6 text-sm outline-none focus:border-primary-1 transition-colors" />
                </div>
              </div>
            </div>
          </section>

          {/* Step 3: Rooms & Guests */}
          <section className="bg-white rounded-2xl border border-neutral-6 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-8 rounded-full bg-primary-1 text-white flex items-center justify-center text-sm font-bold">3</span>
              <h2 className="text-lg font-bold text-neutral-1">房间与客容量</h2>
            </div>
            <div className="space-y-5">
              {([
                { label: '卧室', field: 'bedrooms' as const },
                { label: '床位', field: 'beds' as const },
                { label: '卫生间', field: 'bathrooms' as const },
              ]).map(({ label, field }) => (
                <div key={field} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-neutral-2">{label}</span>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => updateCount(field, -1)}
                      className="w-8 h-8 rounded-full border border-neutral-5 flex items-center justify-center text-neutral-4 hover:border-neutral-2 cursor-pointer"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center font-semibold text-neutral-2">{rooms[field]}</span>
                    <button
                      onClick={() => updateCount(field, 1)}
                      className="w-8 h-8 rounded-full border border-neutral-5 flex items-center justify-center text-neutral-4 hover:border-neutral-2 cursor-pointer"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              ))}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-neutral-2">最大入住人数</span>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setGuests(Math.max(1, guests - 1))}
                    className="w-8 h-8 rounded-full border border-neutral-5 flex items-center justify-center text-neutral-4 hover:border-neutral-2 cursor-pointer"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-8 text-center font-semibold text-neutral-2">{guests}</span>
                  <button
                    onClick={() => setGuests(guests + 1)}
                    className="w-8 h-8 rounded-full border border-neutral-5 flex items-center justify-center text-neutral-4 hover:border-neutral-2 cursor-pointer"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Step 4: Amenities */}
          <section className="bg-white rounded-2xl border border-neutral-6 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-8 rounded-full bg-primary-1 text-white flex items-center justify-center text-sm font-bold">4</span>
              <h2 className="text-lg font-bold text-neutral-1">设施与服务</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {AMENITY_OPTIONS.map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  onClick={() => toggleAmenity(label)}
                  className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                    selectedAmenities.includes(label)
                      ? 'border-primary-1 bg-primary-1/5 text-primary-1'
                      : 'border-neutral-6 text-neutral-3 hover:border-neutral-4'
                  }`}
                >
                  <Icon size={20} />
                  <span className="text-sm font-medium">{label}</span>
                  {selectedAmenities.includes(label) && (
                    <CheckCircle size={16} className="ml-auto" />
                  )}
                </button>
              ))}
            </div>
          </section>

          {/* Step 5: Photos */}
          <section className="bg-white rounded-2xl border border-neutral-6 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-8 rounded-full bg-primary-1 text-white flex items-center justify-center text-sm font-bold">5</span>
              <h2 className="text-lg font-bold text-neutral-1">房源照片</h2>
            </div>
            <div className="border-2 border-dashed border-neutral-5 rounded-2xl p-10 text-center hover:border-primary-1 transition-colors cursor-pointer">
              <div className="w-16 h-16 rounded-full bg-primary-1/10 flex items-center justify-center mx-auto mb-4">
                <Camera size={28} className="text-primary-1" />
              </div>
              <p className="font-semibold text-neutral-2 mb-1">拖拽照片到这里或点击上传</p>
              <p className="text-sm text-neutral-4 mb-4">支持 JPG、PNG、WebP，单张最大10MB</p>
              <Button variant="outline" size="sm" leftIcon={<Upload size={14} />}>
                选择照片
              </Button>
            </div>
            <div className="grid grid-cols-4 gap-3 mt-4">
              {Array.from({ length: 4 }, (_, i) => (
                <div key={i} className="aspect-square rounded-xl bg-neutral-7 flex items-center justify-center">
                  <Plus size={20} className="text-neutral-4" />
                </div>
              ))}
            </div>
          </section>

          {/* Step 6: Title & Description */}
          <section className="bg-white rounded-2xl border border-neutral-6 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-8 rounded-full bg-primary-1 text-white flex items-center justify-center text-sm font-bold">6</span>
              <h2 className="text-lg font-bold text-neutral-1">标题与描述</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-3 mb-1.5">房源标题</label>
                <input
                  type="text"
                  placeholder="例如: 海景豪华套房 · 含早餐 · 免费停车"
                  className="w-full px-4 py-3 rounded-xl border border-neutral-6 text-sm outline-none focus:border-primary-1 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-3 mb-1.5">房源描述</label>
                <textarea
                  rows={5}
                  placeholder="描述你的房源特色、周边环境、交通便利程度等信息..."
                  className="w-full px-4 py-3 rounded-xl border border-neutral-6 text-sm outline-none focus:border-primary-1 transition-colors resize-none"
                />
              </div>
            </div>
          </section>

          {/* Step 7: Pricing */}
          <section className="bg-white rounded-2xl border border-neutral-6 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-8 rounded-full bg-primary-1 text-white flex items-center justify-center text-sm font-bold">7</span>
              <h2 className="text-lg font-bold text-neutral-1">定价</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-3 mb-1.5">每晚价格 (¥)</label>
                <div className="relative">
                  <DollarSign size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-4" />
                  <input
                    type="number"
                    placeholder="0"
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-neutral-6 text-sm outline-none focus:border-primary-1 transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-3 mb-1.5">清洁费 (¥)</label>
                <div className="relative">
                  <DollarSign size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-4" />
                  <input
                    type="number"
                    placeholder="0"
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-neutral-6 text-sm outline-none focus:border-primary-1 transition-colors"
                  />
                </div>
              </div>
            </div>
            <div className="mt-4 p-4 rounded-xl bg-primary-1/5 text-sm text-primary-1">
              <p className="font-medium mb-1">Fleet 服务费</p>
              <p className="text-primary-1/80">每笔成功预订，Fleet 收取 3% 的房东服务费用于平台运营和推广。</p>
            </div>
          </section>

          {/* Submit */}
          <div className="text-center pt-4 pb-8">
            <Button size="lg" className="px-16">发布房源</Button>
            <p className="text-xs text-neutral-4 mt-3">发布前，我们的团队会进行审核，通常在 24 小时内完成。</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default ListProperty;
