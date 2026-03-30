import { useState } from 'react';
import { MapPin, Calendar, Car, ChevronDown } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CarCard from '@/components/CarCard';
import Button from '@/components/Button';

const CAR_TYPES = ['经济型', '紧凑型', 'SUV', '豪华型', 'MPV', '跑车'];
const TRANSMISSIONS = ['自动挡', '手动挡'];
const FUEL_TYPES = ['汽油', '柴油', '混动', '纯电'];

const MOCK_CARS = [
  { id: 1, image: 'https://picsum.photos/seed/car1/600/400', name: '丰田卡罗拉', type: '紧凑型', seats: 5, transmission: '自动', fuel: '汽油', price: 198, rating: 4.7, reviewCount: 234 },
  { id: 2, image: 'https://picsum.photos/seed/car2/600/400', name: '特斯拉 Model 3', type: '豪华型', seats: 5, transmission: '自动', fuel: '纯电', price: 388, rating: 4.9, reviewCount: 156 },
  { id: 3, image: 'https://picsum.photos/seed/car3/600/400', name: '大众途观', type: 'SUV', seats: 5, transmission: '自动', fuel: '汽油', price: 268, rating: 4.6, reviewCount: 189 },
  { id: 4, image: 'https://picsum.photos/seed/car4/600/400', name: '宝马 3系', type: '豪华型', seats: 5, transmission: '自动', fuel: '汽油', price: 458, rating: 4.8, reviewCount: 112 },
  { id: 5, image: 'https://picsum.photos/seed/car5/600/400', name: '别克GL8', type: 'MPV', seats: 7, transmission: '自动', fuel: '汽油', price: 358, rating: 4.5, reviewCount: 98 },
  { id: 6, image: 'https://picsum.photos/seed/car6/600/400', name: '本田飞度', type: '经济型', seats: 5, transmission: '自动', fuel: '汽油', price: 138, rating: 4.6, reviewCount: 302 },
  { id: 7, image: 'https://picsum.photos/seed/car7/600/400', name: '奔驰 GLC', type: 'SUV', seats: 5, transmission: '自动', fuel: '汽油', price: 528, rating: 4.8, reviewCount: 87 },
  { id: 8, image: 'https://picsum.photos/seed/car8/600/400', name: '比亚迪汉', type: '豪华型', seats: 5, transmission: '自动', fuel: '纯电', price: 328, rating: 4.7, reviewCount: 145 },
];

function CarRentals() {
  const [pickupLocation, setPickupLocation] = useState('上海浦东机场');
  const [quickType, setQuickType] = useState('不限');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedTrans, setSelectedTrans] = useState<string[]>([]);
  const [selectedFuel, setSelectedFuel] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState(1000);
  const [showFilters, setShowFilters] = useState(false);
  const [actionMessage, setActionMessage] = useState('');

  const toggle = (item: string, list: string[], setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter(list.includes(item) ? list.filter((i) => i !== item) : [...list, item]);
  };

  return (
    <div className="min-h-screen bg-neutral-8">
      <Navbar />

      {/* Search */}
      <section className="bg-gradient-to-r from-primary-4 to-primary-1 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-6">租车服务</h1>
          <div className="bg-white rounded-2xl p-4 shadow-lg">
            <div className="flex flex-col md:flex-row items-stretch gap-3">
              <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl bg-neutral-7">
                <MapPin size={20} className="text-primary-1 shrink-0" />
                <div>
                  <div className="text-xs text-neutral-4 font-medium">取车地点</div>
                  <input
                    type="text"
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    className="w-full bg-transparent text-sm font-medium outline-none"
                  />
                </div>
              </div>
              <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl bg-neutral-7">
                <Calendar size={20} className="text-primary-1 shrink-0" />
                <div>
                  <div className="text-xs text-neutral-4 font-medium">取车 - 还车</div>
                  <div className="text-sm font-medium text-neutral-2">4月15日 10:00 — 4月20日 10:00</div>
                </div>
              </div>
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-neutral-7">
                <Car size={20} className="text-primary-1 shrink-0" />
                <div>
                  <div className="text-xs text-neutral-4 font-medium">车型</div>
                  <div className="relative">
                    <select
                      value={quickType}
                      onChange={(e) => setQuickType(e.target.value)}
                      className="appearance-none bg-transparent text-sm font-medium text-neutral-2 outline-none pr-6 cursor-pointer"
                    >
                      <option>不限</option>
                      {CAR_TYPES.map((t) => <option key={t}>{t}</option>)}
                    </select>
                    <ChevronDown size={14} className="absolute right-0 top-1/2 -translate-y-1/2 text-neutral-4 pointer-events-none" />
                  </div>
                </div>
              </div>
              <Button
                size="lg"
                onClick={() => setActionMessage(`已按 ${pickupLocation} ${quickType === '不限' ? '' : `· ${quickType}`} 更新车辆结果。`)}
              >
                搜索车辆
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Filters */}
          <aside className={`${showFilters ? 'fixed inset-0 z-50 bg-white p-6 overflow-y-auto' : 'hidden'} lg:block lg:static lg:w-64 shrink-0`}>
            {showFilters && (
              <div className="flex items-center justify-between mb-6 lg:hidden">
                <h3 className="text-lg font-bold">筛选</h3>
                <button onClick={() => setShowFilters(false)} className="text-sm text-primary-1 cursor-pointer">关闭</button>
              </div>
            )}

            <div className="mb-8">
              <h4 className="font-semibold text-neutral-2 mb-4">车型</h4>
              <div className="space-y-3">
                {CAR_TYPES.map((type) => (
                  <label key={type} className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" checked={selectedTypes.includes(type)} onChange={() => toggle(type, selectedTypes, setSelectedTypes)} className="w-4 h-4 accent-primary-1" />
                    <span className="text-sm text-neutral-3">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h4 className="font-semibold text-neutral-2 mb-4">每日最高价格</h4>
              <input type="range" min={50} max={2000} value={priceRange} onChange={(e) => setPriceRange(+e.target.value)} className="w-full accent-primary-1" />
              <div className="flex justify-between text-xs text-neutral-4 mt-1">
                <span>¥50</span>
                <span className="font-medium text-primary-1">¥{priceRange}</span>
                <span>¥2,000</span>
              </div>
            </div>

            <div className="mb-8">
              <h4 className="font-semibold text-neutral-2 mb-4">变速箱</h4>
              <div className="space-y-3">
                {TRANSMISSIONS.map((t) => (
                  <label key={t} className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" checked={selectedTrans.includes(t)} onChange={() => toggle(t, selectedTrans, setSelectedTrans)} className="w-4 h-4 accent-primary-1" />
                    <span className="text-sm text-neutral-3">{t}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h4 className="font-semibold text-neutral-2 mb-4">燃料类型</h4>
              <div className="space-y-3">
                {FUEL_TYPES.map((f) => (
                  <label key={f} className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" checked={selectedFuel.includes(f)} onChange={() => toggle(f, selectedFuel, setSelectedFuel)} className="w-4 h-4 accent-primary-1" />
                    <span className="text-sm text-neutral-3">{f}</span>
                  </label>
                ))}
              </div>
            </div>

            {showFilters && (
              <Button className="w-full lg:hidden" onClick={() => setShowFilters(false)}>查看结果</Button>
            )}
          </aside>

          {/* Results */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-neutral-4">共找到 {MOCK_CARS.length} 辆车</p>
              <button onClick={() => setShowFilters(true)} className="lg:hidden text-sm text-primary-1 font-medium cursor-pointer">筛选</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {MOCK_CARS.map((car) => (
                <CarCard key={car.id} {...car} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {actionMessage && (
        <div className="fixed bottom-5 left-5 rounded-full bg-primary-1 px-4 py-2 text-xs text-white shadow">
          {actionMessage}
        </div>
      )}
    </div>
  );
}

export default CarRentals;
