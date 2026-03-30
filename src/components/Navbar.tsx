import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  Plane,
  Globe,
  Bell,
  ChevronDown,
} from 'lucide-react';
import Button from '@/components/Button';

const TRAVELER_LINKS = [
  { label: '住宿', path: '/stays' },
  { label: '机票', path: '/flights' },
  { label: '租车', path: '/car-rentals' },
  { label: '体验', path: '/experiences' },
];

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [travelerOpen, setTravelerOpen] = useState(false);
  const [actionMessage, setActionMessage] = useState('');
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-neutral-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left: Logo + Nav */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-primary-1">
              <Plane size={24} className="-rotate-45" />
              <span>Fleet</span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {/* 旅行者 dropdown */}
              <div className="relative">
                <button
                  onClick={() => setTravelerOpen(!travelerOpen)}
                  onBlur={() => setTimeout(() => setTravelerOpen(false), 150)}
                  className="flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium text-neutral-4 hover:text-neutral-2 hover:bg-neutral-7 transition-colors cursor-pointer"
                >
                  旅行者
                  <ChevronDown size={16} className={`transition-transform ${travelerOpen ? 'rotate-180' : ''}`} />
                </button>
                {travelerOpen && (
                  <div className="absolute top-full left-0 mt-1 w-40 bg-white rounded-xl border border-neutral-6 shadow-lg py-2 z-50">
                    {TRAVELER_LINKS.map((link) => (
                      <Link
                        key={link.label}
                        to={link.path}
                        className={`block px-4 py-2 text-sm transition-colors ${
                          location.pathname === link.path
                            ? 'text-primary-1 bg-primary-1/5 font-medium'
                            : 'text-neutral-4 hover:text-neutral-2 hover:bg-neutral-7'
                        }`}
                        onClick={() => setTravelerOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            <span className="text-sm font-medium text-neutral-4 hover:text-neutral-2 cursor-pointer transition-colors">
              <Link to="/help">支持</Link>
            </span>
            <button
              onClick={() => setActionMessage('多语言切换功能已启用筹备，当前先展示中文界面。')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full hover:bg-neutral-7 text-neutral-4 text-sm font-medium transition-colors cursor-pointer"
              aria-label="language"
              title="语言设置"
            >
              <Globe size={18} />
              <span>语言</span>
            </button>
            <Link to="/list-property">
              <Button variant="outline" size="sm">列出你的财产</Button>
            </Link>
            <Link to="/messages" className="relative p-2 rounded-full hover:bg-neutral-7 text-neutral-4 transition-colors cursor-pointer">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-secondary-4" />
            </Link>
            <Link
              to="/profile"
              className="w-9 h-9 rounded-full bg-primary-1/10 flex items-center justify-center text-primary-1 font-semibold text-sm hover:bg-primary-1/20 transition-colors"
            >
              W
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-neutral-7 cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-neutral-6 bg-white">
          <div className="px-4 py-4 space-y-2">
            {TRAVELER_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                className="block px-4 py-2.5 rounded-lg text-sm font-medium text-neutral-2 hover:bg-neutral-7"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <hr className="border-neutral-6 my-2" />
            <Link to="/help" className="block px-4 py-2.5 text-sm text-neutral-4 hover:bg-neutral-7 rounded-lg">支持</Link>
            <button
              onClick={() => {
                setActionMessage('多语言切换功能已启用筹备，当前先展示中文界面。');
                setMobileOpen(false);
              }}
              className="flex items-center gap-2 px-4 py-2.5 text-sm text-neutral-4 hover:bg-neutral-7 rounded-lg w-full cursor-pointer"
              title="语言设置"
            >
              <Globe size={16} />
              语言
            </button>
            <div className="flex gap-2 pt-2">
              <Link to="/list-property" className="flex-1">
                <Button variant="outline" className="w-full" size="sm">列出你的财产</Button>
              </Link>
              <Link to="/profile" className="flex-1">
                <Button className="w-full" size="sm">个人中心</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
      {actionMessage && (
        <div className="absolute left-1/2 top-full mt-2 -translate-x-1/2 rounded-full bg-primary-1 px-4 py-2 text-xs text-white shadow">
          {actionMessage}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
