import { Link, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Button from '@/components/Button';

const CONTENT_MAP: Record<
  string,
  {
    title: string;
    description: string;
    primaryAction?: { label: string; to: string };
  }
> = {
  '/experiences': {
    title: '精选体验',
    description: '体验频道正在完善中，先去看看住宿和航班吧。',
    primaryAction: { label: '查看住宿', to: '/stays' },
  },
  '/forgot-password': {
    title: '找回密码',
    description: '请联系在线客服协助重置密码，后续会提供邮件重置流程。',
    primaryAction: { label: '前往帮助中心', to: '/help' },
  },
  '/privacy': {
    title: '隐私政策',
    description: '我们重视你的隐私与数据安全，本页面为演示版内容入口。',
  },
  '/terms': {
    title: '服务条款',
    description: '使用本平台前请阅读服务条款，本页面为演示版内容入口。',
  },
  '/sitemap': {
    title: '网站地图',
    description: '站点导航正在整理中，你可以先通过首页进入各主流程。',
  },
  '/about': {
    title: '公司简介',
    description: 'Fleet 专注旅游预订体验，正在持续完善产品内容。',
  },
  '/careers': {
    title: '工作机会',
    description: '招聘页面建设中，欢迎关注后续更新。',
  },
  '/news': {
    title: '新闻中心',
    description: '品牌动态与公告将陆续发布。',
  },
  '/partners': {
    title: '合作伙伴',
    description: '合作伙伴专区正在搭建中。',
  },
  '/safety': {
    title: '安全信息',
    description: '旅行与支付安全说明页面正在整理中。',
  },
  '/cancellation': {
    title: '取消政策',
    description: '取消与退款政策说明页面正在整理中。',
  },
  '/accessibility': {
    title: '无障碍服务',
    description: '无障碍能力建设中，后续将持续优化。',
  },
  '/host-guide': {
    title: '房东指南',
    description: '房东运营指南正在编写中。',
  },
  '/host-forum': {
    title: '房东论坛',
    description: '房东社区功能即将上线。',
  },
  '/responsible-hosting': {
    title: '责任房东',
    description: '责任房东规范页面正在完善中。',
  },
  '/trust': {
    title: '信任与安全',
    description: '平台信任机制和保障说明将持续更新。',
  },
  '/guides': {
    title: '旅行攻略',
    description: '攻略内容持续建设中。',
  },
  '/destinations': {
    title: '目的地',
    description: '更多目的地内容即将上线。',
  },
  '/magazine': {
    title: 'Fleet 杂志',
    description: '旅行杂志栏目正在搭建。',
  },
};

function ContentPage() {
  const { pathname } = useLocation();
  const content = CONTENT_MAP[pathname];
  const isNotFound = !content;

  return (
    <div className="min-h-screen bg-neutral-8">
      <Navbar />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="rounded-3xl border border-neutral-6 bg-white p-8 md:p-12 text-center">
          <h1 className="text-3xl font-bold text-neutral-1 mb-4">
            {isNotFound ? '页面不存在' : content.title}
          </h1>
          <p className="text-neutral-4 mb-8">
            {isNotFound
              ? `未找到路径：${pathname}，你可以返回首页继续浏览。`
              : content.description}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link to="/">
              <Button>返回首页</Button>
            </Link>
            {content?.primaryAction && (
              <Link to={content.primaryAction.to}>
                <Button variant="outline">{content.primaryAction.label}</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ContentPage;
