import { useState } from 'react';
import { Plane, ArrowRightLeft, Calendar, Users, ChevronDown, Clock } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FlightCard from '@/components/FlightCard';
import Button from '@/components/Button';

const AIRLINES = ['中国国航', '东方航空', '南方航空', '海南航空', '国泰航空', '新加坡航空'];
const CABIN_CLASSES = ['经济舱', '商务舱', '头等舱'];

const MOCK_FLIGHTS = [
  { id: 1, airline: '中国国航', departureTime: '08:30', arrivalTime: '14:45', departureCity: '北京', arrivalCity: '东京', departureCode: 'PEK', arrivalCode: 'NRT', duration: '3h 15m', stops: 0, price: 2580 },
  { id: 2, airline: '东方航空', departureTime: '10:15', arrivalTime: '17:30', departureCity: '北京', arrivalCity: '东京', departureCode: 'PEK', arrivalCode: 'NRT', duration: '4h 15m', stops: 1, price: 1890 },
  { id: 3, airline: '南方航空', departureTime: '13:00', arrivalTime: '19:20', departureCity: '北京', arrivalCity: '东京', departureCode: 'PEK', arrivalCode: 'NRT', duration: '3h 20m', stops: 0, price: 2340 },
  { id: 4, airline: '海南航空', departureTime: '06:45', arrivalTime: '13:00', departureCity: '北京', arrivalCity: '东京', departureCode: 'PEK', arrivalCode: 'NRT', duration: '3h 15m', stops: 0, price: 2760 },
  { id: 5, airline: '国泰航空', departureTime: '15:30', arrivalTime: '23:10', departureCity: '北京', arrivalCity: '东京', departureCode: 'PEK', arrivalCode: 'NRT', duration: '4h 40m', stops: 1, price: 1650 },
  { id: 6, airline: '新加坡航空', departureTime: '20:00', arrivalTime: '02:15', departureCity: '北京', arrivalCity: '东京', departureCode: 'PEK', arrivalCode: 'NRT', duration: '3h 15m', stops: 0, price: 3100 },
];

function Flights() {
  const [tripType, setTripType] = useState<'round' | 'oneway'>('round');
  const [cabinClass, setCabinClass] = useState('经济舱');
  const [selectedStops, setSelectedStops] = useState<number[]>([]);
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState(5000);
  const [showFilters, setShowFilters] = useState(false);

  const toggleStop = (stop: number) => {
    setSelectedStops(selectedStops.includes(stop) ? selectedStops.filter((s) => s !== stop) : [...selectedStops, stop]);
  };

  const toggleAirline = (airline: string) => {
    setSelectedAirlines(selectedAirlines.includes(airline) ? selectedAirlines.filter((a) => a !== airline) : [...selectedAirlines, airline]);
  };

  return (
    <div className="min-h-screen bg-neutral-8">
      <Navbar />

      {/* Search Section */}
      <section className="bg-primary-1 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-6">搜索机票</h1>

          {/* Trip Type Toggle */}
          <div className="flex items-center gap-2 mb-6">
            <button
              onClick={() => setTripType('round')}
              className={`px-5 py-2 rounded-full text-sm font-medium cursor-pointer transition-colors ${
                tripType === 'round' ? 'bg-white text-primary-1' : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              往返
            </button>
            <button
              onClick={() => setTripType('oneway')}
              className={`px-5 py-2 rounded-full text-sm font-medium cursor-pointer transition-colors ${
                tripType === 'oneway' ? 'bg-white text-primary-1' : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              单程
            </button>
            <div className="relative ml-4">
              <select
                value={cabinClass}
                onChange={(e) => setCabinClass(e.target.value)}
                className="appearance-none bg-white/20 text-white pl-4 pr-8 py-2 rounded-full text-sm font-medium outline-none cursor-pointer"
              >
                {CABIN_CLASSES.map((c) => (
                  <option key={c} value={c} className="text-neutral-2">{c}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-white pointer-events-none" />
            </div>
          </div>

          {/* Search Form */}
          <div className="bg-white rounded-2xl p-4 shadow-lg">
            <div className="flex flex-col md:flex-row items-stretch gap-3">
              <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl bg-neutral-7">
                <Plane size={20} className="text-primary-1 shrink-0 rotate-[-45deg]" />
                <div>
                  <div className="text-xs text-neutral-4 font-medium">出发城市</div>
                  <input
                    type="text"
                    defaultValue="北京"
                    className="w-full bg-transparent text-sm font-medium outline-none"
                  />
                </div>
              </div>
              <button className="self-center p-2 rounded-full bg-primary-1/10 text-primary-1 hover:bg-primary-1/20 cursor-pointer shrink-0">
                <ArrowRightLeft size={18} />
              </button>
              <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl bg-neutral-7">
                <Plane size={20} className="text-primary-1 shrink-0 rotate-45" />
                <div>
                  <div className="text-xs text-neutral-4 font-medium">到达城市</div>
                  <input
                    type="text"
                    defaultValue="东京"
                    className="w-full bg-transparent text-sm font-medium outline-none"
                  />
                </div>
              </div>
              <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl bg-neutral-7">
                <Calendar size={20} className="text-primary-1 shrink-0" />
                <div>
                  <div className="text-xs text-neutral-4 font-medium">
                    {tripType === 'round' ? '去程 - 返程' : '出发日期'}
                  </div>
                  <div className="text-sm font-medium text-neutral-2">4月15日 — 4月22日</div>
                </div>
              </div>
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-neutral-7">
                <Users size={20} className="text-primary-1 shrink-0" />
                <div>
                  <div className="text-xs text-neutral-4 font-medium">乘客</div>
                  <div className="text-sm font-medium text-neutral-2">2 位成人</div>
                </div>
              </div>
              <Button size="lg">搜索航班</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Filter Sidebar */}
          <aside className={`${showFilters ? 'fixed inset-0 z-50 bg-white p-6 overflow-y-auto' : 'hidden'} lg:block lg:static lg:w-64 shrink-0`}>
            {showFilters && (
              <div className="flex items-center justify-between mb-6 lg:hidden">
                <h3 className="text-lg font-bold">筛选</h3>
                <button onClick={() => setShowFilters(false)} className="text-sm text-primary-1 cursor-pointer">关闭</button>
              </div>
            )}

            <div className="mb-8">
              <h4 className="font-semibold text-neutral-2 mb-4">中转</h4>
              <div className="space-y-3">
                {[{ label: '直飞', value: 0 }, { label: '1次中转', value: 1 }, { label: '2次以上', value: 2 }].map((stop) => (
                  <label key={stop.value} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedStops.includes(stop.value)}
                      onChange={() => toggleStop(stop.value)}
                      className="w-4 h-4 accent-primary-1"
                    />
                    <span className="text-sm text-neutral-3">{stop.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h4 className="font-semibold text-neutral-2 mb-4">航空公司</h4>
              <div className="space-y-3">
                {AIRLINES.map((airline) => (
                  <label key={airline} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedAirlines.includes(airline)}
                      onChange={() => toggleAirline(airline)}
                      className="w-4 h-4 accent-primary-1"
                    />
                    <span className="text-sm text-neutral-3">{airline}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h4 className="font-semibold text-neutral-2 mb-4">出发时段</h4>
              <div className="grid grid-cols-2 gap-2">
                {['凌晨 00-06', '上午 06-12', '下午 12-18', '晚上 18-24'].map((time) => (
                  <button
                    key={time}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-neutral-6 text-xs text-neutral-3 hover:border-primary-1 hover:text-primary-1 cursor-pointer"
                  >
                    <Clock size={12} />
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h4 className="font-semibold text-neutral-2 mb-4">最高价格</h4>
              <input
                type="range"
                min={500}
                max={10000}
                value={priceRange}
                onChange={(e) => setPriceRange(+e.target.value)}
                className="w-full accent-primary-1"
              />
              <div className="flex justify-between text-xs text-neutral-4 mt-1">
                <span>¥500</span>
                <span className="font-medium text-primary-1">¥{priceRange}</span>
                <span>¥10,000</span>
              </div>
            </div>

            {showFilters && (
              <Button className="w-full lg:hidden" onClick={() => setShowFilters(false)}>
                查看结果
              </Button>
            )}
          </aside>

          {/* Flight Results */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-neutral-4">共找到 {MOCK_FLIGHTS.length} 个航班</p>
              <button
                onClick={() => setShowFilters(true)}
                className="lg:hidden text-sm text-primary-1 font-medium cursor-pointer"
              >
                筛选
              </button>
            </div>
            <div className="space-y-4">
              {MOCK_FLIGHTS.map((flight) => (
                <FlightCard key={flight.id} {...flight} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Flights;
