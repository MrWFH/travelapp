import { useState } from 'react';
import {
  Search, CreditCard, Calendar, Home, Shield, HelpCircle,
  ChevronDown, ChevronUp, Phone, Mail, MessageCircle,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Button from '@/components/Button';

const FAQ_CATEGORIES = [
  { icon: Calendar, label: '预订相关', desc: '预订流程、修改与取消' },
  { icon: CreditCard, label: '支付与退款', desc: '支付方式、退款政策' },
  { icon: Home, label: '住宿问题', desc: '入住、退房、设施问题' },
  { icon: Shield, label: '安全保障', desc: '账户安全、隐私保护' },
  { icon: HelpCircle, label: '账户管理', desc: '注册、登录、个人设置' },
  { icon: MessageCircle, label: '房东帮助', desc: '发布房源、管理预订' },
];

const POPULAR_FAQS = [
  {
    question: '如何取消预订？',
    answer: '您可以在"我的订单"中找到对应预订，点击"取消预订"。取消政策因房源而异，免费取消期限通常为入住前24-48小时。超出免费取消期限可能会收取部分费用，具体请查看预订详情中的取消政策。',
  },
  {
    question: '支持哪些支付方式？',
    answer: 'Fleet 目前支持信用卡（Visa、Mastercard、JCB、American Express）、微信支付和支付宝。部分地区还支持银联卡支付。所有支付均通过256位SSL加密保护。',
  },
  {
    question: '如何联系房东？',
    answer: '在预订确认后，您可以通过"消息"功能直接与房东沟通。进入订单详情页面，点击"联系房东"按钮即可发送消息。我们建议在入住前与房东确认入住时间和注意事项。',
  },
  {
    question: '退款多久能到账？',
    answer: '退款将原路返回至您的支付账户。信用卡退款通常需要5-10个工作日，微信支付和支付宝退款通常在1-3个工作日内到账。具体时间取决于您的银行或支付平台。',
  },
  {
    question: '如何成为房东？',
    answer: '点击页面顶部的"成为房东"按钮，按照提示填写房源信息、上传照片并设置价格。审核通过后即可接受预订。成为房东是免费的，Fleet 仅在成功预订后收取服务费。',
  },
  {
    question: '入住时遇到问题怎么办？',
    answer: '如果入住时发现房源与描述不符或存在问题，请先联系房东协商解决。如果无法达成一致，可以在24小时内通过"帮助中心"联系Fleet客服团队，我们将协助您处理，包括提供替代住宿或退款。',
  },
];

function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-neutral-8">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-1 to-primary-3 py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">我们可以帮助你</h1>
          <p className="text-white/80 mb-8">搜索你的问题，或浏览下方的常见问题分类</p>
          <div className="relative max-w-xl mx-auto">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-4" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索帮助文章..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl text-sm outline-none shadow-lg focus:ring-2 focus:ring-white/30"
            />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* FAQ Categories */}
        <section className="mb-16">
          <h2 className="text-xl font-bold text-neutral-1 mb-6">帮助分类</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FAQ_CATEGORIES.map(({ icon: Icon, label, desc }) => (
              <button
                key={label}
                className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-neutral-6 hover:border-primary-1 hover:shadow-md transition-all cursor-pointer text-left"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-1/10 flex items-center justify-center shrink-0">
                  <Icon size={22} className="text-primary-1" />
                </div>
                <div>
                  <div className="font-semibold text-neutral-2">{label}</div>
                  <div className="text-sm text-neutral-4">{desc}</div>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Popular FAQs */}
        <section className="mb-16">
          <h2 className="text-xl font-bold text-neutral-1 mb-6">常见问题</h2>
          <div className="bg-white rounded-2xl border border-neutral-6 overflow-hidden">
            {POPULAR_FAQS.map((faq, i) => (
              <div key={faq.question} className="border-b border-neutral-6 last:border-0">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer hover:bg-neutral-7/50 transition-colors"
                >
                  <span className="font-medium text-neutral-2 pr-4">{faq.question}</span>
                  {openFaq === i ? (
                    <ChevronUp size={18} className="text-neutral-4 shrink-0" />
                  ) : (
                    <ChevronDown size={18} className="text-neutral-4 shrink-0" />
                  )}
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5">
                    <p className="text-sm text-neutral-3 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Contact Support */}
        <section>
          <h2 className="text-xl font-bold text-neutral-1 mb-6">联系我们</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl border border-neutral-6 p-6 text-center">
              <div className="w-14 h-14 rounded-full bg-primary-1/10 flex items-center justify-center mx-auto mb-4">
                <Phone size={24} className="text-primary-1" />
              </div>
              <h3 className="font-semibold text-neutral-2 mb-2">电话支持</h3>
              <p className="text-sm text-neutral-4 mb-4">7×24小时全天候服务</p>
              <p className="font-semibold text-primary-1">400-888-9999</p>
            </div>
            <div className="bg-white rounded-2xl border border-neutral-6 p-6 text-center">
              <div className="w-14 h-14 rounded-full bg-primary-4/10 flex items-center justify-center mx-auto mb-4">
                <MessageCircle size={24} className="text-primary-4" />
              </div>
              <h3 className="font-semibold text-neutral-2 mb-2">在线客服</h3>
              <p className="text-sm text-neutral-4 mb-4">平均响应时间 &lt; 5分钟</p>
              <Button size="sm">开始对话</Button>
            </div>
            <div className="bg-white rounded-2xl border border-neutral-6 p-6 text-center">
              <div className="w-14 h-14 rounded-full bg-secondary-3/10 flex items-center justify-center mx-auto mb-4">
                <Mail size={24} className="text-secondary-4" />
              </div>
              <h3 className="font-semibold text-neutral-2 mb-2">邮件支持</h3>
              <p className="text-sm text-neutral-4 mb-4">24小时内回复</p>
              <p className="font-semibold text-primary-1">support@fleet.com</p>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}

export default HelpCenter;
