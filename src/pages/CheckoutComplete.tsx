import { useEffect, useState } from 'react';
import { CheckCircle, Calendar, MapPin, Users, Download, Mail } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import { getOrder, type Order } from '@/service/travelApi';

function CheckoutComplete() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!orderId) return;
    let mounted = true;
    void getOrder(orderId)
      .then((response) => {
        if (mounted) {
          setOrder(response);
        }
      })
      .catch((err: unknown) => {
        if (mounted) {
          const message = err instanceof Error ? err.message : '读取订单失败';
          setError(message);
        }
      });
    return () => {
      mounted = false;
    };
  }, [orderId]);

  return (
    <div className="min-h-screen bg-neutral-8">
      <Navbar />

      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="mb-6">
          <CheckCircle size={72} className="mx-auto text-primary-4" strokeWidth={1.5} />
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-neutral-1 mb-3">预订成功！</h1>
        <p className="text-neutral-4 mb-10 max-w-md mx-auto">
          您的预订已确认。确认邮件已发送至 user@example.com，请注意查收。
        </p>

        {/* Booking Details */}
        <div className="bg-white rounded-2xl border border-neutral-6 p-6 md:p-8 text-left mb-8">
          <div className="flex items-center justify-between mb-6 pb-6 border-b border-neutral-6">
            <div>
              <div className="text-sm text-neutral-4 mb-1">预订编号</div>
              <div className="text-lg font-bold text-neutral-1">{order?.orderId || 'FL-2026041523'}</div>
            </div>
            <span className="px-3 py-1.5 bg-primary-4/10 text-primary-4 rounded-full text-xs font-semibold">
              已确认
            </span>
          </div>

          <div className="flex gap-4 mb-6">
            <img
              src={order?.property.image || 'https://picsum.photos/seed/complete/200/200'}
              alt="property"
              className="w-20 h-20 rounded-xl object-cover"
            />
            <div>
              <h3 className="font-semibold text-neutral-2">{order?.property.title || '海景豪华套房'}</h3>
              <p className="text-sm text-neutral-4 flex items-center gap-1 mt-1">
                <MapPin size={14} /> {order?.property.location || '巴厘岛金巴兰, 印度尼西亚'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="p-4 rounded-xl bg-neutral-7">
              <div className="flex items-center gap-2 text-neutral-4 text-xs mb-1">
                <Calendar size={14} /> 入住
              </div>
              <div className="font-semibold text-neutral-2">2026年4月15日</div>
              <div className="text-xs text-neutral-4">15:00 后</div>
            </div>
            <div className="p-4 rounded-xl bg-neutral-7">
              <div className="flex items-center gap-2 text-neutral-4 text-xs mb-1">
                <Calendar size={14} /> 退房
              </div>
              <div className="font-semibold text-neutral-2">2026年4月20日</div>
              <div className="text-xs text-neutral-4">12:00 前</div>
            </div>
            <div className="p-4 rounded-xl bg-neutral-7">
              <div className="flex items-center gap-2 text-neutral-4 text-xs mb-1">
                <Users size={14} /> 旅客
              </div>
              <div className="font-semibold text-neutral-2">{order?.guests || 2} 位成人</div>
              <div className="text-xs text-neutral-4">5 晚</div>
            </div>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-neutral-4">房费小计</span>
              <span className="text-neutral-2">¥{order?.breakdown.roomTotal || 3440}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-4">服务费 + 清洁费</span>
              <span className="text-neutral-2">¥{(order?.breakdown.serviceFee || 172) + (order?.breakdown.cleaningFee || 100)}</span>
            </div>
            <hr className="border-neutral-6" />
            <div className="flex justify-between font-bold text-lg">
              <span className="text-neutral-1">已支付</span>
              <span className="text-primary-1">¥{order?.breakdown.total || 3712}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <Button size="lg" leftIcon={<Download size={16} />} variant="outline">
            下载确认单
          </Button>
          <Button size="lg" leftIcon={<Mail size={16} />} variant="outline">
            重发确认邮件
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/profile">
            <Button size="lg">查看订单</Button>
          </Link>
          <Link to="/">
            <Button size="lg" variant="ghost">返回首页</Button>
          </Link>
        </div>
      </div>

      <Footer />

      {error && (
        <div className="fixed bottom-5 left-5 rounded-full bg-red-500 px-4 py-2 text-xs text-white shadow">
          {error}
        </div>
      )}
    </div>
  );
}

export default CheckoutComplete;
