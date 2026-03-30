import { Link } from 'react-router-dom';
import { Plane, Globe, MessageCircle, Rss } from 'lucide-react';

const FOOTER_SECTIONS = [
  {
    title: '关于我们',
    links: [
      { label: '公司简介', path: '/about' },
      { label: '工作机会', path: '/careers' },
      { label: '新闻中心', path: '/news' },
      { label: '合作伙伴', path: '/partners' },
    ],
  },
  {
    title: '支持',
    links: [
      { label: '帮助中心', path: '/help' },
      { label: '安全信息', path: '/safety' },
      { label: '取消政策', path: '/cancellation' },
      { label: '无障碍服务', path: '/accessibility' },
    ],
  },
  {
    title: '房东',
    links: [
      { label: '发布房源', path: '/list-property' },
      { label: '房东指南', path: '/host-guide' },
      { label: '房东论坛', path: '/host-forum' },
      { label: '责任房东', path: '/responsible-hosting' },
    ],
  },
  {
    title: '发现',
    links: [
      { label: '信任与安全', path: '/trust' },
      { label: '旅行攻略', path: '/guides' },
      { label: '目的地', path: '/destinations' },
      { label: 'Fleet 杂志', path: '/magazine' },
    ],
  },
];

const SOCIAL_LINKS = [
  { icon: Globe, label: '官网', href: 'https://www.figma.com/' },
  { icon: MessageCircle, label: '微博', href: 'https://weibo.com/' },
  { icon: Rss, label: '订阅', href: 'https://github.com/MrWFH/travelapp' },
];

function Footer() {
  return (
    <footer className="bg-neutral-2 text-neutral-5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
          <div>
            <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-white">
              <Plane size={24} className="-rotate-45" />
              <span>Fleet</span>
            </Link>
            <p className="mt-2 text-sm text-neutral-4 max-w-xs">
              探索世界，从 Fleet 开始。为你的每一次旅行提供最佳体验。
            </p>
          </div>
          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-neutral-3 flex items-center justify-center text-neutral-5 hover:bg-primary-1 hover:text-white transition-colors"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title}>
              <h4 className="text-white font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-sm hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-neutral-3 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-neutral-4">
            © 2026 Fleet, Inc. 保留所有权利。
          </p>
          <div className="flex gap-6 text-sm">
            <Link to="/privacy" className="hover:text-white transition-colors">隐私政策</Link>
            <Link to="/terms" className="hover:text-white transition-colors">服务条款</Link>
            <Link to="/sitemap" className="hover:text-white transition-colors">网站地图</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
