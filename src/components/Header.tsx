import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { BrandLogo } from './BrandLogo';
import { Phone, MessageCircle, Menu, X, Clock, MapPin, Shield } from 'lucide-react';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Courses', path: '/courses' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Admission', path: '/admission' },
    { name: 'Contact', path: '/contact' },
  ];

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#E5E7EB] shadow-xs">
      {/* Top Utility Information Strip */}
      <div className="bg-[#292F91] text-white text-xs py-2 px-4 sm:px-6 lg:px-8 border-b border-white/10 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5 text-blue-100">
              <MapPin className="w-3.5 h-3.5 text-[#D9272E]" />
              <span>109, 1st Floor, Urmila Tower, Bank More, Dhanbad</span>
            </div>
            <div className="flex items-center gap-1.5 text-blue-100">
              <Clock className="w-3.5 h-3.5 text-blue-200" />
              <span>Mon – Sat: 9:30 AM – 6:30 PM</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="tel:9661611350"
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#FACC15] hover:bg-[#FDE047] text-[#0F172A] font-bold text-xs transition-colors shadow-xs not-italic"
              title="Call MOBNET: 96616 11350"
            >
              <Phone className="w-3 h-3 text-[#0F172A] stroke-[2.5]" />
              <span className="font-bold not-italic tracking-normal">96616 11350</span>
            </a>
            <span className="text-white/40 font-bold">/</span>
            <a
              href="tel:7004838409"
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#FACC15] hover:bg-[#FDE047] text-[#0F172A] font-bold text-xs transition-colors shadow-xs not-italic"
              title="Call MOBNET: 70048 38409"
            >
              <Phone className="w-3 h-3 text-[#0F172A] stroke-[2.5]" />
              <span className="font-bold not-italic tracking-normal">70048 38409</span>
            </a>
            <a
              href="https://wa.me/919661611350?text=Hello%20MOBNET%20International,%20I%20am%20interested%20in%20mobile%20repairing%20courses."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-medium transition-colors"
              aria-label="Chat on WhatsApp"
            >
              <MessageCircle className="w-3 h-3" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-8">
          {/* Zone 1: Brand Wordmark & Logo */}
          <Link
            to="/"
            onClick={closeMobileMenu}
            className="flex items-center shrink-0 focus-visible:outline-2 focus-visible:outline-[#292F91] rounded-lg"
          >
            <BrandLogo />
          </Link>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav
            className="hidden lg:flex items-center gap-7 text-[15px] font-medium"
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `whitespace-nowrap transition-colors py-1 relative ${
                    isActive
                      ? 'text-[#292F91] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#D9272E]'
                      : 'text-[#333333] hover:text-[#292F91]'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Zone 3: Primary Action, Admin Login & Mobile Toggle */}
          <div className="flex items-center gap-2.5 shrink-0">
            <Link
              to="/admission"
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-semibold text-white bg-[#D9272E] hover:bg-[#b81f25] shadow-xs transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9272E]"
            >
              Apply for Admission
            </Link>

            {/* Professional Admin Login Button */}
            <Link
              to="/admin/login"
              className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-white bg-[#292F91] hover:bg-[#1e2372] shadow-xs transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#292F91]"
              title="Institute Staff & Administrator Portal"
            >
              <Shield className="w-3.5 h-3.5 text-blue-200" />
              <span>Admin Login</span>
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-[#333333] hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-[#292F91]"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E5E7EB] bg-white px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2">
          <nav className="flex flex-col space-y-2 mb-4" aria-label="Mobile Navigation">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-[#292F91] font-semibold border-l-2 border-[#292F91]'
                      : 'text-[#333333] hover:bg-slate-50'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          <div className="pt-3 border-t border-[#E5E7EB] space-y-2.5">
            <Link
              to="/admission"
              onClick={closeMobileMenu}
              className="w-full flex items-center justify-center px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#D9272E] hover:bg-[#b81f25] text-center"
            >
              Apply for Admission
            </Link>

            <Link
              to="/admin/login"
              onClick={closeMobileMenu}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#292F91] hover:bg-[#1e2372] text-center"
            >
              <Shield className="w-4 h-4 text-blue-200" />
              <span>Admin Login</span>
            </Link>

            <a
              href="https://wa.me/919661611350?text=Hello%20MOBNET%20International,%20I%20am%20interested%20in%20mobile%20repairing%20courses."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>Ask on WhatsApp (96616 11350)</span>
            </a>

            <div className="text-xs text-[#6B7280] space-y-1 pt-1">
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#292F91]" />
                <span>Call: 96616 11350 / 70048 38409</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#292F91]" />
                <span>Urmila Tower, Bank More, Dhanbad</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
