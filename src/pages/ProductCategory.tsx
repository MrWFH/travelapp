import { useEffect, useState } from 'react';
import { SlidersHorizontal, ChevronDown, LayoutGrid, List, Star } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import PropertyCard from '@/components/PropertyCard';
import Button from '@/components/Button';
import { getProperties, type Property, type PropertyListResponse } from '@/service/travelApi';

const BREADCRUMBS = [
  { label: '首页', path: '/' },
  { label: '住宿', path: '/stays' },
  { label: '搜索结果' },
];

function toggleSelection(item: string, list: string[], setter: (value: string[]) => void) {
  setter(list.includes(item) ? list.filter((i) => i !== item) : [...list, item]);
}

function ProductCategory() {
  const [searchParams] = useSearchParams();
  const queryKeyword = searchParams.get('q') || '';
  const [activeNav, setActiveNav] = useState(0);
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('recommended');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [properties, setProperties] = useState<Property[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState<PropertyListResponse['filters']>({
    subNavs: ['住宿', '公寓', '别墅', '度假屋'],
    propertyTypes: ['酒店', '公寓', '别墅', '民宿', '度假屋', '青年旅舍'],
    amenities: ['WiFi', '停车场', '游泳池', '空调', '厨房', '洗衣机', '健身房', '早餐'],
  });
  const [actionMessage, setActionMessage] = useState('');

  const handleSubNavClick = (nav: string, index: number) => {
    setActiveNav(index);
    setCurrentPage(1);
    if (nav === '住宿') {
      setSelectedTypes([]);
      setActionMessage('已切换为全部住宿类型。');
      return;
    }
    setSelectedTypes((prev) => {
      if (prev.length === 1 && prev[0] === nav) {
        setActiveNav(0);
        setActionMessage('已取消子分类筛选，恢复全部住宿。');
        return [];
      }
      setActionMessage(`已按“${nav}”筛选房源。`);
      return [nav];
    });
  };

  useEffect(() => {
    let mounted = true;

    async function loadProperties() {
      setLoading(true);
      setError('');
      try {
        const response = await getProperties({
          q: queryKeyword,
          minPrice: priceRange[0],
          maxPrice: priceRange[1],
          minRating,
          sortBy,
          page: currentPage,
          pageSize: 12,
          propertyType: selectedTypes,
          amenities: selectedAmenities,
        });
        if (mounted) {
          setProperties(response.list);
          setTotal(response.total);
          setTotalPages(response.totalPages);
          setFilters(response.filters);
        }
      } catch (err) {
        if (mounted) {
          const message = err instanceof Error ? err.message : '加载房源失败';
          setError(message);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadProperties();
    return () => {
      mounted = false;
    };
  }, [currentPage, minRating, priceRange, queryKeyword, selectedAmenities, selectedTypes, sortBy]);

  useEffect(() => {
    setCurrentPage(1);
  }, [sortBy, minRating, selectedTypes, selectedAmenities, priceRange]);

  return (
    <div className="min-h-screen bg-neutral-8">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumb items={BREADCRUMBS} className="mb-4" />

        {/* Sub Navigation */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto">
          {filters.subNavs.map((nav, i) => (
            <button
              key={nav}
              onClick={() => handleSubNavClick(nav, i)}
              className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors cursor-pointer ${
                activeNav === i
                  ? 'bg-primary-1 text-white'
                  : 'bg-neutral-7 text-neutral-4 hover:bg-neutral-6'
              }`}
            >
              {nav}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-neutral-1">住宿</h1>
            <p className="text-sm text-neutral-4 mt-1">共找到 {total} 个结果</p>
            {queryKeyword && (
              <p className="text-xs text-primary-1 mt-1">关键词：{queryKeyword}</p>
            )}
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-6 text-sm font-medium text-neutral-2 hover:bg-neutral-7 cursor-pointer"
            >
              <SlidersHorizontal size={16} /> 筛选
            </button>
            <div className="hidden md:flex items-center gap-2 border border-neutral-6 rounded-full p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-full cursor-pointer ${viewMode === 'grid' ? 'bg-primary-1 text-white' : 'text-neutral-4'}`}
              >
                <LayoutGrid size={16} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-full cursor-pointer ${viewMode === 'list' ? 'bg-primary-1 text-white' : 'text-neutral-4'}`}
              >
                <List size={16} />
              </button>
            </div>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none pl-4 pr-8 py-2 rounded-full border border-neutral-6 text-sm font-medium text-neutral-2 bg-white outline-none cursor-pointer"
              >
                <option value="recommended">推荐排序</option>
                <option value="price_low">价格从低到高</option>
                <option value="price_high">价格从高到低</option>
                <option value="rating">评分最高</option>
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-4 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside className={`${showFilters ? 'fixed inset-0 z-50 bg-white p-6 overflow-y-auto' : 'hidden'} lg:block lg:static lg:w-64 shrink-0`}>
            {showFilters && (
              <div className="flex items-center justify-between mb-6 lg:hidden">
                <h3 className="text-lg font-bold">筛选</h3>
                <button onClick={() => setShowFilters(false)} className="text-sm text-primary-1 cursor-pointer">关闭</button>
              </div>
            )}

            {/* Price Range */}
            <div className="mb-8">
              <h4 className="font-semibold text-neutral-2 mb-4">价格范围</h4>
              <div className="flex items-center gap-3 mb-3">
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-6 text-sm outline-none focus:border-primary-1"
                  placeholder="最低"
                />
                <span className="text-neutral-4">—</span>
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-6 text-sm outline-none focus:border-primary-1"
                  placeholder="最高"
                />
              </div>
              <input
                type="range"
                min={0}
                max={5000}
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
                className="w-full accent-primary-1"
              />
            </div>

            {/* Property Type */}
            <div className="mb-8">
              <h4 className="font-semibold text-neutral-2 mb-4">房源类型</h4>
              <div className="space-y-3">
                {filters.propertyTypes.map((type) => (
                  <label key={type} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedTypes.includes(type)}
                      onChange={() => toggleSelection(type, selectedTypes, setSelectedTypes)}
                      className="w-4 h-4 rounded border-neutral-5 accent-primary-1"
                    />
                    <span className="text-sm text-neutral-3">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div className="mb-8">
              <h4 className="font-semibold text-neutral-2 mb-4">设施</h4>
              <div className="space-y-3">
                {filters.amenities.map((amenity) => (
                  <label key={amenity} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedAmenities.includes(amenity)}
                      onChange={() => toggleSelection(amenity, selectedAmenities, setSelectedAmenities)}
                      className="w-4 h-4 rounded border-neutral-5 accent-primary-1"
                    />
                    <span className="text-sm text-neutral-3">{amenity}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Rating */}
            <div className="mb-8">
              <h4 className="font-semibold text-neutral-2 mb-4">最低评分</h4>
              <div className="flex items-center gap-2">
                {[0, 3, 3.5, 4, 4.5].map((r) => (
                  <button
                    key={r}
                    onClick={() => setMinRating(r)}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors cursor-pointer ${
                      minRating === r
                        ? 'border-primary-1 bg-primary-1/10 text-primary-1'
                        : 'border-neutral-6 text-neutral-4 hover:border-neutral-4'
                    }`}
                  >
                    {r === 0 ? '全部' : <><Star size={12} className="fill-secondary-3 text-secondary-3" /> {r}+</>}
                  </button>
                ))}
              </div>
            </div>

            {showFilters && (
              <Button className="w-full lg:hidden" onClick={() => setShowFilters(false)}>
                查看结果
              </Button>
            )}
          </aside>

          {/* Results */}
          <div className="flex-1 min-w-0">
            <div className={`grid gap-6 ${
              viewMode === 'grid'
                ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'
                : 'grid-cols-1'
            }`}>
              {properties.map((prop) => (
                <PropertyCard key={prop.id} {...prop} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 mt-10">
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                    currentPage === page
                      ? 'bg-primary-1 text-white'
                      : 'text-neutral-4 hover:bg-neutral-7'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {loading && (
        <div className="fixed bottom-5 right-5 rounded-full bg-neutral-2 px-4 py-2 text-xs text-white shadow">
          正在加载房源...
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

export default ProductCategory;
