import { useState } from 'react';
import { User, Lock, CreditCard, Bell, Camera } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Button from '@/components/Button';

const SIDEBAR_ITEMS = [
  { id: 'personal', label: '个人信息', icon: User },
  { id: 'security', label: '安全设置', icon: Lock },
  { id: 'payment', label: '支付方式', icon: CreditCard },
  { id: 'notifications', label: '通知设置', icon: Bell },
];

const SAVED_CARDS = [
  { id: 1, type: 'Visa', last4: '4242', expiry: '12/27' },
  { id: 2, type: 'Mastercard', last4: '8888', expiry: '06/28' },
];

const NOTIFICATION_SETTINGS = [
  { id: 'booking', label: '预订确认', desc: '接收预订成功和变更通知', enabled: true },
  { id: 'messages', label: '新消息', desc: '接收房东和旅客的消息提醒', enabled: true },
  { id: 'promotions', label: '优惠活动', desc: '接收独家优惠和促销信息', enabled: false },
  { id: 'newsletter', label: '旅行通讯', desc: '每周精选目的地和旅行灵感', enabled: true },
  { id: 'reviews', label: '评价提醒', desc: '旅行结束后提醒你留下评价', enabled: true },
  { id: 'price_alerts', label: '降价提醒', desc: '收藏房源价格变动通知', enabled: false },
];

function AccountSettings() {
  const [activeSection, setActiveSection] = useState('personal');
  const [notifications, setNotifications] = useState(
    Object.fromEntries(NOTIFICATION_SETTINGS.map((n) => [n.id, n.enabled]))
  );

  const toggleNotification = (id: string) => {
    setNotifications((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen bg-neutral-8">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-neutral-1 mb-8">账户设置</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 shrink-0">
            <nav className="bg-white rounded-2xl border border-neutral-6 overflow-hidden">
              {SIDEBAR_ITEMS.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveSection(id)}
                  className={`w-full flex items-center gap-3 px-5 py-4 text-sm font-medium transition-colors cursor-pointer text-left ${
                    activeSection === id
                      ? 'bg-primary-1/5 text-primary-1 border-l-2 border-l-primary-1'
                      : 'text-neutral-3 hover:bg-neutral-7'
                  }`}
                >
                  <Icon size={18} />
                  {label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {activeSection === 'personal' && (
              <div className="bg-white rounded-2xl border border-neutral-6 p-6 md:p-8">
                <h2 className="text-lg font-bold text-neutral-1 mb-6">个人信息</h2>

                <div className="flex items-center gap-6 mb-8">
                  <div className="relative">
                    <img
                      src="https://picsum.photos/seed/avatar/200/200"
                      alt="avatar"
                      className="w-24 h-24 rounded-full object-cover"
                    />
                    <button className="absolute bottom-0 right-0 p-2 rounded-full bg-primary-1 text-white hover:bg-primary-1/90 cursor-pointer">
                      <Camera size={14} />
                    </button>
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-2">头像照片</p>
                    <p className="text-sm text-neutral-4">支持 JPG、PNG，最大 5MB</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-neutral-3 mb-1.5">姓名</label>
                    <input type="text" defaultValue="李明" className="w-full px-4 py-3 rounded-xl border border-neutral-6 text-sm outline-none focus:border-primary-1 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-3 mb-1.5">手机号</label>
                    <input type="tel" defaultValue="+86 138****8888" className="w-full px-4 py-3 rounded-xl border border-neutral-6 text-sm outline-none focus:border-primary-1 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-3 mb-1.5">邮箱</label>
                    <input type="email" defaultValue="liming@email.com" className="w-full px-4 py-3 rounded-xl border border-neutral-6 text-sm outline-none focus:border-primary-1 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-3 mb-1.5">生日</label>
                    <input type="date" defaultValue="1990-06-15" className="w-full px-4 py-3 rounded-xl border border-neutral-6 text-sm outline-none focus:border-primary-1 transition-colors" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-neutral-3 mb-1.5">居住城市</label>
                    <input type="text" defaultValue="上海" className="w-full px-4 py-3 rounded-xl border border-neutral-6 text-sm outline-none focus:border-primary-1 transition-colors" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-neutral-3 mb-1.5">个人简介</label>
                    <textarea
                      rows={4}
                      defaultValue="热爱旅行和摄影的自由职业者，去过20+个国家。喜欢探索当地文化和美食。"
                      className="w-full px-4 py-3 rounded-xl border border-neutral-6 text-sm outline-none focus:border-primary-1 transition-colors resize-none"
                    />
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <Button>保存更改</Button>
                </div>
              </div>
            )}

            {activeSection === 'security' && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl border border-neutral-6 p-6 md:p-8">
                  <h2 className="text-lg font-bold text-neutral-1 mb-6">修改密码</h2>
                  <div className="space-y-4 max-w-lg">
                    <div>
                      <label className="block text-sm font-medium text-neutral-3 mb-1.5">当前密码</label>
                      <input type="password" placeholder="请输入当前密码" className="w-full px-4 py-3 rounded-xl border border-neutral-6 text-sm outline-none focus:border-primary-1 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-3 mb-1.5">新密码</label>
                      <input type="password" placeholder="至少8位字符" className="w-full px-4 py-3 rounded-xl border border-neutral-6 text-sm outline-none focus:border-primary-1 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-3 mb-1.5">确认新密码</label>
                      <input type="password" placeholder="再次输入新密码" className="w-full px-4 py-3 rounded-xl border border-neutral-6 text-sm outline-none focus:border-primary-1 transition-colors" />
                    </div>
                    <Button>更新密码</Button>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-neutral-6 p-6 md:p-8">
                  <h2 className="text-lg font-bold text-neutral-1 mb-4">两步验证</h2>
                  <p className="text-sm text-neutral-4 mb-4">为你的账户增加额外的安全保障</p>
                  <Button variant="outline">启用两步验证</Button>
                </div>
              </div>
            )}

            {activeSection === 'payment' && (
              <div className="bg-white rounded-2xl border border-neutral-6 p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-neutral-1">支付方式</h2>
                  <Button size="sm" variant="outline">添加新卡</Button>
                </div>

                <div className="space-y-4">
                  {SAVED_CARDS.map((card) => (
                    <div key={card.id} className="flex items-center justify-between p-4 rounded-xl border border-neutral-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-8 rounded bg-neutral-7 flex items-center justify-center">
                          <CreditCard size={20} className="text-neutral-4" />
                        </div>
                        <div>
                          <div className="font-medium text-sm text-neutral-2">{card.type} ···· {card.last4}</div>
                          <div className="text-xs text-neutral-4">有效期 {card.expiry}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button className="text-sm text-primary-1 hover:underline cursor-pointer">编辑</button>
                        <button className="text-sm text-red-500 hover:underline cursor-pointer">删除</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'notifications' && (
              <div className="bg-white rounded-2xl border border-neutral-6 p-6 md:p-8">
                <h2 className="text-lg font-bold text-neutral-1 mb-6">通知设置</h2>

                <div className="space-y-1">
                  {NOTIFICATION_SETTINGS.map((setting) => (
                    <div key={setting.id} className="flex items-center justify-between py-4 border-b border-neutral-6 last:border-0">
                      <div>
                        <div className="font-medium text-sm text-neutral-2">{setting.label}</div>
                        <div className="text-xs text-neutral-4 mt-0.5">{setting.desc}</div>
                      </div>
                      <button
                        onClick={() => toggleNotification(setting.id)}
                        className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer ${
                          notifications[setting.id] ? 'bg-primary-1' : 'bg-neutral-5'
                        }`}
                      >
                        <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                          notifications[setting.id] ? 'translate-x-5.5' : 'translate-x-0.5'
                        }`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default AccountSettings;
