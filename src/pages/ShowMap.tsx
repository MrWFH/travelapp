import { useState } from 'react';
import { Map, List, MapPin, Star, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Button from '@/components/Button';

const MAP_PROPERTIES = [
  { id: 1, title: '海景豪华套房', price: 688, rating: 4.9, image: 'https://picsum.photos/seed/map1/400/300', location: '巴厘岛', x: 25, y: 35 },
  { id: 2, title: '市中心现代公寓', price: 520, rating: 4.7, image: 'https://picsum.photos/seed/map2/400/300', location: '东京', x: 55, y: 20 },
  { id: 3, title: '古典花园别墅', price: 1280, rating: 4.8, image: 'https://picsum.photos/seed/map3/400/300', location: '巴黎', x: 15, y: 55 },
  { id: 4, title: '山景温泉旅馆', price: 960, rating: 4.9, image: 'https://picsum.photos/seed/map4/400/300', location: '箱根', x: 65, y: 45 },
  { id: 5, title: '海滨度假屋', price: 450, rating: 4.6, image: 'https://picsum.photos/seed/map5/400/300', location: '三亚', x: 40, y: 65 },
  { id: 6, title: '湖畔木屋', price: 380, rating: 4.8, image: 'https://picsum.photos/seed/map6/400/300', location: '大理', x: 80, y: 30 },
  { id: 7, title: '都市精品酒店', price: 760, rating: 4.5, image: 'https://picsum.photos/seed/map7/400/300', location: '上海', x: 35, y: 80 },
  { id: 8, title: '热带雨林树屋', price: 320, rating: 4.9, image: 'https://picsum.photos/seed/map8/400/300', location: '清迈', x: 72, y: 60 },
];

function ShowMap() {
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [selectedProperty, setSelectedProperty] = useState<number | null>(null);
  const [hoveredPin, setHoveredPin] = useState<number | null>(null);

  const selected = MAP_PROPERTIES.find((p) => p.id === selectedProperty);

  return (
    <div className="min-h-screen bg-neutral-8 flex flex-col">
      <Navbar />

      <div className="flex-1 flex flex-col">
        {/* Controls */}
        <div className="bg-white border-b border-neutral-6 px-4 sm:px-6 lg:px-8 py-3">
          <div className="mx-auto max-w-7xl flex items-center justify-between">
            <div>
              <h1 className="text-lg font-bold text-neutral-1">地图查看</h1>
              <p className="text-xs text-neutral-4">{MAP_PROPERTIES.length} 个房源</p>
            </div>
            <div className="flex items-center gap-2 border border-neutral-6 rounded-full p-1">
              <button
                onClick={() => setViewMode('map')}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium cursor-pointer transition-colors ${
                  viewMode === 'map' ? 'bg-primary-1 text-white' : 'text-neutral-4 hover:text-neutral-2'
                }`}
              >
                <Map size={14} /> 地图
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium cursor-pointer transition-colors ${
                  viewMode === 'list' ? 'bg-primary-1 text-white' : 'text-neutral-4 hover:text-neutral-2'
                }`}
              >
                <List size={14} /> 列表
              </button>
            </div>
          </div>
        </div>

        {viewMode === 'map' ? (
          <div className="flex-1 relative">
            {/* Map Placeholder */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-2/30 via-primary-1/10 to-primary-3/20">
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: 'radial-gradient(circle, #3B71FE 1px, transparent 1px)',
                backgroundSize: '30px 30px',
              }} />
            </div>

            {/* Property Pins */}
            {MAP_PROPERTIES.map((prop) => (
              <button
                key={prop.id}
                onClick={() => setSelectedProperty(prop.id)}
                onMouseEnter={() => setHoveredPin(prop.id)}
                onMouseLeave={() => setHoveredPin(null)}
                className="absolute z-10 cursor-pointer group"
                style={{ left: `${prop.x}%`, top: `${prop.y}%`, transform: 'translate(-50%, -100%)' }}
              >
                <div className={`px-3 py-1.5 rounded-full font-bold text-sm shadow-lg transition-all ${
                  selectedProperty === prop.id || hoveredPin === prop.id
                    ? 'bg-primary-1 text-white scale-110'
                    : 'bg-white text-neutral-1 hover:scale-105'
                }`}>
                  ¥{prop.price}
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-white" />
              </button>
            ))}

            {/* Selected Property Card */}
            {selected && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[340px] z-20">
                <div className="bg-white rounded-2xl shadow-xl border border-neutral-6 overflow-hidden">
                  <button
                    onClick={() => setSelectedProperty(null)}
                    className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-white/80 backdrop-blur text-neutral-4 hover:text-neutral-2 cursor-pointer"
                  >
                    <X size={16} />
                  </button>
                  <img src={selected.image} alt={selected.title} className="w-full h-40 object-cover" />
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-neutral-2">{selected.title}</h3>
                      <div className="flex items-center gap-1">
                        <Star size={14} className="fill-secondary-3 text-secondary-3" />
                        <span className="text-sm font-semibold text-neutral-2">{selected.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-neutral-4 flex items-center gap-1 mb-3">
                      <MapPin size={14} /> {selected.location}
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold text-primary-1">¥{selected.price}</span>
                        <span className="text-sm text-neutral-4"> /晚</span>
                      </div>
                      <Link to={`/stays/${selected.id}`}>
                        <Button size="sm">查看详情</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Map attribution placeholder */}
            <div className="absolute bottom-4 right-4 text-xs text-neutral-4/50 bg-white/50 px-2 py-1 rounded">
              Fleet 地图 · 仅供演示
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {MAP_PROPERTIES.map((prop) => (
                  <Link
                    key={prop.id}
                    to={`/stays/${prop.id}`}
                    className="bg-white rounded-2xl border border-neutral-6 overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <img src={prop.image} alt={prop.title} className="w-full aspect-[4/3] object-cover" />
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-neutral-2 text-sm">{prop.title}</h3>
                        <div className="flex items-center gap-1">
                          <Star size={12} className="fill-secondary-3 text-secondary-3" />
                          <span className="text-xs font-semibold text-neutral-2">{prop.rating}</span>
                        </div>
                      </div>
                      <p className="text-xs text-neutral-4 flex items-center gap-1 mb-2">
                        <MapPin size={12} /> {prop.location}
                      </p>
                      <div>
                        <span className="font-bold text-primary-1">¥{prop.price}</span>
                        <span className="text-sm text-neutral-4"> /晚</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default ShowMap;
