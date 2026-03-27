import { useEffect, useState } from 'react';
import { ArrowRight, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SearchBar from '@/components/SearchBar';
import CategoryTabs from '@/components/CategoryTabs';
import PropertyCard from '@/components/PropertyCard';
import Button from '@/components/Button';
import { getHomeData, type HomeData } from '@/service/travelApi';

function Home() {
  const [homeData, setHomeData] = useState<HomeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;

    async function loadHomeData() {
      setLoading(true);
      setError('');
      try {
        const data = await getHomeData();
        if (mounted) {
          setHomeData(data);
        }
      } catch (err) {
        if (mounted) {
          const message = err instanceof Error ? err.message : '加载首页数据失败';
          setError(message);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadHomeData();
    return () => {
      mounted = false;
    };
  }, []);

  const destinations = homeData?.destinations ?? [];
  const properties = homeData?.featuredProperties ?? [];
  const articles = homeData?.articles ?? [];
  const partners = homeData?.partners ?? [];

  return (
    <div className="min-h-screen bg-neutral-8">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[600px] md:h-[680px] overflow-hidden">
        <img
          src={homeData?.hero.image || 'https://picsum.photos/seed/hero/1920/1080'}
          alt="hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 max-w-2xl leading-tight">
            {homeData?.hero.title || '探索世界的美丽'}
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-8 max-w-xl">
            {homeData?.hero.subtitle || '发现独特的住宿体验，开启难忘的旅程。超过 100,000+ 个精选房源等你探索。'}
          </p>
          <SearchBar className="max-w-4xl" />
        </div>
      </section>

      {/* Category Tabs */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <CategoryTabs />
      </section>

      {/* Popular Destinations */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-1">热门目的地</h2>
            <p className="text-neutral-4 mt-1">探索最受欢迎的旅行目的地</p>
          </div>
          <Link to="/stays" className="hidden md:flex items-center gap-1 text-sm font-medium text-primary-1 hover:underline">
            查看全部 <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {destinations.map((dest) => (
            <Link
              key={dest.id}
              to="/stays"
              className="group relative rounded-2xl overflow-hidden aspect-[3/4]"
            >
              <img
                src={dest.image}
                alt={dest.city}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-lg font-bold">{dest.city}</h3>
                <p className="text-sm text-white/70">{dest.country} · {dest.count} 处住宿</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Stays */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-1">精选住宿</h2>
            <p className="text-neutral-4 mt-1">旅行者评分最高的房源推荐</p>
          </div>
          <Link to="/stays" className="hidden md:flex items-center gap-1 text-sm font-medium text-primary-1 hover:underline">
            查看全部 <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {properties.map((prop) => (
            <PropertyCard key={prop.id} {...prop} />
          ))}
        </div>
      </section>

      {/* Best Deals Banner */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="rounded-3xl bg-gradient-to-r from-primary-1 to-primary-3 p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <span className="inline-block bg-white/20 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-4">
              限时优惠
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">最佳优惠</h2>
            <p className="text-white/80 mb-6 max-w-lg">
              春季特惠来袭！精选目的地低至5折，更有免费取消保障。立即预订，开启你的完美假期。
            </p>
            <Button variant="neutral" size="lg" className="bg-white text-primary-1 hover:bg-white/90">
              立即查看优惠
            </Button>
          </div>
          <div className="w-full md:w-80 aspect-square rounded-2xl overflow-hidden">
            <img
              src="https://picsum.photos/seed/deal/600/600"
              alt="deals"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Travel Inspiration */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-1">旅行灵感</h2>
            <p className="text-neutral-4 mt-1">阅读我们的旅行故事与攻略</p>
          </div>
          <Link to="/stays" className="hidden md:flex items-center gap-1 text-sm font-medium text-primary-1 hover:underline">
            更多文章 <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article) => (
            <article
              key={article.id}
              className="group rounded-2xl bg-white border border-neutral-6 overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-neutral-2 mb-2 group-hover:text-primary-1 transition-colors">
                  {article.title}
                </h3>
                <div className="flex items-center gap-3 text-xs text-neutral-4">
                  <span>{article.date}</span>
                  <span>·</span>
                  <span>{article.readTime}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Partner Logos */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <h3 className="text-center text-neutral-4 text-sm font-medium mb-8">值得信赖的合作伙伴</h3>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {partners.map((partner) => (
            <div
              key={partner}
              className="w-28 h-12 rounded-lg bg-neutral-7 flex items-center justify-center text-neutral-4 font-bold text-sm"
            >
              {partner}
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="rounded-3xl bg-neutral-2 p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">订阅我们的旅行通讯</h2>
          <p className="text-neutral-5 mb-8 max-w-lg mx-auto">
            每周获取精选目的地、独家优惠和旅行灵感。加入 200,000+ 旅行爱好者的行列。
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="输入你的邮箱地址"
              className="w-full px-5 py-3 rounded-full bg-neutral-3 text-white placeholder:text-neutral-5 outline-none focus:ring-2 focus:ring-primary-1"
            />
            <Button size="lg" leftIcon={<Send size={16} />} className="shrink-0 w-full sm:w-auto">
              订阅
            </Button>
          </div>
        </div>
      </section>

      <Footer />

      {loading && (
        <div className="fixed bottom-5 right-5 rounded-full bg-neutral-2 px-4 py-2 text-xs text-white shadow">
          正在加载首页数据...
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

export default Home;
