import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/PropertyCard';
import Button from '@/components/Button';
import {
  getWishlist,
  toggleWishlist,
  type Property,
  type WishlistResponse,
} from '@/service/travelApi';

function Wishlist() {
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [tabs, setTabs] = useState(['住宿', '体验']);
  const [stays, setStays] = useState<Property[]>([]);
  const [experiences, setExperiences] = useState<Property[]>([]);

  useEffect(() => {
    let mounted = true;

    async function loadWishlist() {
      setLoading(true);
      setError('');
      try {
        const response: WishlistResponse = await getWishlist();
        if (mounted) {
          setTabs(response.tabs);
          setStays(response.stays);
          setExperiences(response.experiences);
        }
      } catch (err) {
        if (mounted) {
          const message = err instanceof Error ? err.message : '加载收藏失败';
          setError(message);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadWishlist();
    return () => {
      mounted = false;
    };
  }, []);

  const items = activeTab === 0 ? stays : experiences;

  const handleRemove = (id: number) => {
    void toggleWishlist(id)
      .then(() => {
        setStays((prev) => prev.filter((item) => item.id !== id));
      })
      .catch((err: unknown) => {
        const message = err instanceof Error ? err.message : '取消收藏失败';
        setError(message);
      });
  };

  return (
    <div className="min-h-screen bg-neutral-8">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-3 mb-2">
          <Heart size={28} className="text-primary-1" />
          <h1 className="text-2xl md:text-3xl font-bold text-neutral-1">我的收藏</h1>
        </div>
        <p className="text-neutral-4 mb-8">你收藏的住宿和体验都在这里</p>

        <div className="flex items-center gap-2 mb-8">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                activeTab === i
                  ? 'bg-primary-1 text-white'
                  : 'bg-neutral-7 text-neutral-4 hover:bg-neutral-6'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <div key={item.id} className="relative group/card">
                <PropertyCard {...item} isFavorite onToggleLike={() => handleRemove(item.id)} />
                <button
                  onClick={() => handleRemove(item.id)}
                  className="absolute top-3 right-14 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-red-50 text-neutral-4 hover:text-red-500 transition-colors opacity-0 group-hover/card:opacity-100 cursor-pointer z-10"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <Heart size={64} className="mx-auto text-neutral-5 mb-6" strokeWidth={1} />
            <h2 className="text-xl font-bold text-neutral-2 mb-2">
              {activeTab === 0 ? '还没有收藏的住宿' : '还没有收藏的体验'}
            </h2>
            <p className="text-neutral-4 mb-6 max-w-md mx-auto">
              浏览我们的精选推荐，点击心形图标即可将喜欢的内容加入收藏。
            </p>
            <Link to="/stays">
              <Button>去看看</Button>
            </Link>
          </div>
        )}
      </div>

      <Footer />

      {loading && (
        <div className="fixed bottom-5 right-5 rounded-full bg-neutral-2 px-4 py-2 text-xs text-white shadow">
          正在加载收藏...
        </div>
      )}
      {error && (
        <div className="fixed bottom-5 left-5 rounded-full bg-red-500 px-4 py-2 text-xs text-white shadow">
          {error}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
