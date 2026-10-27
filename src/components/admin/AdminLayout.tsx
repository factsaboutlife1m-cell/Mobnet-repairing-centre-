import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { BrandLogo } from '../BrandLogo';
import {
  LayoutDashboard,
  GraduationCap,
  BookOpen,
  Image as ImageIcon,
  Mail,
  FileText,
  Users,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ShieldCheck,
  Bell
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title, subtitle }) => {
  const { admin, logout, authFetch } = useAdminAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [badgeCounts, setBadgeCounts] = useState<{ newAdmissions: number; unreadMessages: number }>({
    newAdmissions: 0,
    unreadMessages: 0
  });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const fetchBadges = async () => {
      try {
        const res = await authFetch('/api/admin/overview');
        if (res.ok) {
          const data = await res.json();
          if (isMounted && data.success && data.stats) {
            setBadgeCounts({
              newAdmissions: data.stats.newAdmissions || 0,
              unreadMessages: data.stats.unreadMessages || 0
            });
          }
        }
      } catch (err) {
        // Silent badge error
      }
    };

    fetchBadges();
    const interval = setInterval(fetchBadges, 30000); // Polling badge counts every 30s
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [authFetch, location.pathname]);

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const navItems = [
    {
      name: 'Dashboard',
      path: '/admin/dashboard',
      icon: LayoutDashboard
    },
    {
      name: 'Admissions',
      path: '/admin/admissions',
      icon: GraduationCap,
      badge: badgeCounts.newAdmissions > 0 ? badgeCounts.newAdmissions : undefined,
      badgeColor: 'bg-[#D9272E]'
    },
    {
      name: 'Courses',
      path: '/admin/courses',
      icon: BookOpen
    },
    {
      name: 'Gallery',
      path: '/admin/gallery',
      icon: ImageIcon
    },
    {
      name: 'Contact Messages',
      path: '/admin/messages',
      icon: Mail,
      badge: badgeCounts.unreadMessages > 0 ? badgeCounts.unreadMessages : undefined,
      badgeColor: 'bg-emerald-600'
    },
    {
      name: 'Site Content',
      path: '/admin/content',
      icon: FileText
    },
    {
      name: 'Faculty & Team',
      path: '/admin/team',
      icon: Users
    },
    {
      name: 'Settings & Profile',
      path: '/admin/settings',
      icon: Settings
    }
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#181D3B] text-slate-200">
      {/* Brand Header */}
      <div className="p-4 border-b border-slate-700/60 bg-[#12162E]">
        <Link to="/" target="_blank" className="block focus:outline-none" title="Visit Public Website">
          <div className="bg-white p-2 rounded-lg inline-block shadow-sm">
            <BrandLogo />
          </div>
        </Link>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">
              Admin Portal
            </span>
          </div>
          <span className="text-[10px] bg-[#292F91] text-white px-2 py-0.5 rounded font-medium border border-blue-400/30">
            Dhanbad Campus
          </span>
        </div>
      </div>

      {/* Nav List */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto" aria-label="Admin Navigation">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path || (item.path !== '/admin/dashboard' && location.pathname.startsWith(item.path));
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? 'bg-[#292F91] text-white shadow-md shadow-blue-900/40 font-semibold'
                  : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.name}</span>
              </div>
              {item.badge !== undefined && (
                <span className={`text-[11px] font-bold text-white px-2 py-0.5 rounded-full ${item.badgeColor}`}>
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer Info & User */}
      <div className="p-4 border-t border-slate-700/60 bg-[#12162E]">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-[#292F91] text-white font-semibold flex items-center justify-center text-xs border border-blue-400/40">
            {admin?.name ? admin.name.substring(0, 2).toUpperCase() : 'AD'}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-white truncate">{admin?.name || 'Administrator'}</p>
            <p className="text-[11px] text-slate-400 truncate">{admin?.email || 'admin@mobnetinternational.com'}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-2 border-t border-slate-700/40">
          <Link
            to="/"
            target="_blank"
            className="flex-1 flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Live Site</span>
          </Link>
          <button
            onClick={handleLogout}
            type="button"
            className="flex-1 flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium bg-red-950/60 hover:bg-red-900/80 text-red-200 border border-red-800/40 transition-colors"
            title="Log Out of Admin Panel"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F0F2F7] flex flex-col md:flex-row">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 shrink-0 fixed inset-y-0 z-40 shadow-xl">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => setMobileOpen(false)} />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-[#181D3B] z-10 shadow-2xl">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-3 right-3 p-2 text-slate-400 hover:text-white focus:outline-none"
              aria-label="Close Admin Menu"
            >
              <X className="w-5 h-5" />
            </button>
            {sidebarContent}
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 md:pl-64 flex flex-col min-h-screen">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-xs px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
              aria-label="Open Admin Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-lg font-bold text-slate-900 leading-tight">
                {title || 'MOBNET Administration'}
              </h1>
              {subtitle && <p className="text-xs text-slate-500 hidden sm:block">{subtitle}</p>}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#292F91] bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Preview Live Site</span>
            </Link>

            <div className="h-6 w-px bg-slate-200 hidden sm:block" />

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#292F91] text-white font-semibold flex items-center justify-center text-xs shadow-xs">
                <ShieldCheck className="w-4 h-4 text-blue-100" />
              </div>
              <div className="hidden lg:block text-left">
                <p className="text-xs font-semibold text-slate-800">{admin?.name}</p>
                <p className="text-[10px] text-slate-500">{admin?.role || 'Administrator'}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};
