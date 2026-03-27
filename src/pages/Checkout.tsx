import { useState } from 'react';
import { CreditCard, Lock, ShieldCheck, MapPin, Calendar, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import Button from '@/components/Button';
import { createCheckoutOrder } from '@/service/travelApi';

function Checkout() {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'wechat' | 'alipay'>('card');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setSubmitting(true);
    setError('');
    try {
      const order = await createCheckoutOrder({
        name,
        phone,
        email,
        paymentMethod,
        propertyId: 1,
        guests: 2,
      });
      navigate(`/checkout/complete?orderId=${order.orderId}`);
    } catch (err) {
      const message = err instanceof Error ? err.message : '支付失败，请重试';
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-8">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumb
          items={[
            { label: '首页', path: '/' },
            { label: '住宿', path: '/stays' },
            { label: '确认与支付' },
          ]}
          className="mb-6"
        />

        <h1 className="text-2xl md:text-3xl font-bold text-neutral-1 mb-8">确认与支付</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: Forms */}
          <div className="flex-1 min-w-0 space-y-6">
            {/* Personal Info */}
            <div className="bg-white rounded-2xl border border-neutral-6 p-6">
              <h2 className="text-lg font-bold text-neutral-1 mb-5">个人信息</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-3 mb-1.5">姓名</label>
                  <input
                    type="text"
                    placeholder="请输入姓名"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-neutral-6 text-sm outline-none focus:border-primary-1 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-3 mb-1.5">手机号</label>
                  <input
                    type="tel"
                    placeholder="+86"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-neutral-6 text-sm outline-none focus:border-primary-1 transition-colors"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-neutral-3 mb-1.5">邮箱</label>
                  <input
                    type="email"
                    placeholder="example@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-neutral-6 text-sm outline-none focus:border-primary-1 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-2xl border border-neutral-6 p-6">
              <h2 className="text-lg font-bold text-neutral-1 mb-5">支付方式</h2>

              <div className="flex gap-3 mb-6">
                {[
                  { id: 'card' as const, label: '信用卡', icon: CreditCard },
                  { id: 'wechat' as const, label: '微信支付', icon: Lock },
                  { id: 'alipay' as const, label: '支付宝', icon: ShieldCheck },
                ].map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setPaymentMethod(id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 text-sm font-medium cursor-pointer transition-all ${
                      paymentMethod === id
                        ? 'border-primary-1 bg-primary-1/5 text-primary-1'
                        : 'border-neutral-6 text-neutral-4 hover:border-neutral-4'
                    }`}
                  >
                    <Icon size={18} />
                    {label}
                  </button>
                ))}
              </div>

              {paymentMethod === 'card' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-3 mb-1.5">卡号</label>
                    <input
                      type="text"
                      placeholder="0000 0000 0000 0000"
                      className="w-full px-4 py-3 rounded-xl border border-neutral-6 text-sm outline-none focus:border-primary-1 transition-colors"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-3 mb-1.5">有效期</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full px-4 py-3 rounded-xl border border-neutral-6 text-sm outline-none focus:border-primary-1 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-3 mb-1.5">CVV</label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full px-4 py-3 rounded-xl border border-neutral-6 text-sm outline-none focus:border-primary-1 transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-3 mb-1.5">持卡人姓名</label>
                    <input
                      type="text"
                      placeholder="与卡片上的姓名一致"
                      className="w-full px-4 py-3 rounded-xl border border-neutral-6 text-sm outline-none focus:border-primary-1 transition-colors"
                    />
                  </div>
                </div>
              )}

              {paymentMethod === 'wechat' && (
                <div className="text-center py-8">
                  <div className="w-48 h-48 mx-auto bg-neutral-7 rounded-2xl flex items-center justify-center mb-4">
                    <span className="text-neutral-4 text-sm">微信支付二维码</span>
                  </div>
                  <p className="text-sm text-neutral-4">请使用微信扫描二维码完成支付</p>
                </div>
              )}

              {paymentMethod === 'alipay' && (
                <div className="text-center py-8">
                  <div className="w-48 h-48 mx-auto bg-neutral-7 rounded-2xl flex items-center justify-center mb-4">
                    <span className="text-neutral-4 text-sm">支付宝二维码</span>
                  </div>
                  <p className="text-sm text-neutral-4">请使用支付宝扫描二维码完成支付</p>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 text-xs text-neutral-4">
              <Lock size={14} />
              <span>您的支付信息将通过256位SSL加密保护</span>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:w-96 shrink-0">
            <div className="sticky top-24 rounded-2xl border border-neutral-6 bg-white p-6 shadow-lg">
              <h2 className="text-lg font-bold text-neutral-1 mb-5">订单摘要</h2>

              <div className="flex gap-4 mb-6 pb-6 border-b border-neutral-6">
                <img
                  src="https://picsum.photos/seed/checkout/200/200"
                  alt="property"
                  className="w-24 h-24 rounded-xl object-cover"
                />
                <div>
                  <h3 className="font-semibold text-neutral-2 mb-1">海景豪华套房</h3>
                  <p className="text-xs text-neutral-4 flex items-center gap-1">
                    <MapPin size={12} /> 巴厘岛, 印度尼西亚
                  </p>
                </div>
              </div>

              <div className="space-y-3 text-sm mb-6">
                <div className="flex items-center gap-2 text-neutral-4">
                  <Calendar size={14} />
                  <span>4月15日 — 4月20日 (5晚)</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-4">
                  <Users size={14} />
                  <span>2 位旅客</span>
                </div>
              </div>

              <div className="space-y-3 text-sm mb-6">
                <div className="flex justify-between">
                  <span className="text-neutral-4">¥688 × 5 晚</span>
                  <span className="text-neutral-2">¥3,440</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-4">服务费</span>
                  <span className="text-neutral-2">¥172</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-4">清洁费</span>
                  <span className="text-neutral-2">¥100</span>
                </div>
                <hr className="border-neutral-6" />
                <div className="flex justify-between text-lg font-bold">
                  <span className="text-neutral-1">合计</span>
                  <span className="text-primary-1">¥3,712</span>
                </div>
              </div>

              <Button
                className="w-full"
                size="lg"
                onClick={() => {
                  void handleSubmit();
                }}
                disabled={submitting}
              >
                {submitting ? '提交中...' : '确认支付 ¥3,712'}
              </Button>

              <p className="text-xs text-neutral-4 text-center mt-4">
                点击确认即表示您同意我们的
                <a href="#" className="text-primary-1 underline">服务条款</a>和
                <a href="#" className="text-primary-1 underline">退订政策</a>
              </p>
            </div>
          </div>
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

export default Checkout;
