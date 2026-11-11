import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { LayoutDashboard, LogIn, Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import anrfLogo from '../../assets/logo/anrf_logo.png';
import uohLogo from '../../assets/logo/uoh_logo.png';
import kucLogo from '../../assets/logo/kuc_logo.png';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  // Project portal entry: Login, or Dashboard when already signed in
  const portalLink = isAuthenticated
    ? { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard }
    : { name: 'Login', path: '/login', icon: LogIn };

  // Hidden: 'Presentations', 'News & Events' as requested
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Departments', path: '/departments' },
    { name: 'Bulletins', path: '/bulletins' },
    { name: 'Team', path: '/team' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="w-full bg-white sticky top-0 z-50 shadow-xs">
      {/* Main Navigation Bar */}
      <div className="border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between">
          {/* Logo & Institution Branding */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="flex items-center gap-2 shrink-0">
              <img
                src={anrfLogo}
                alt="ANRF-PAIR Logo"
                className="h-8 sm:h-9 w-auto object-contain"
              />
              <img
                src={uohLogo}
                alt="University of Hyderabad (Hub) Logo"
                className="h-9 sm:h-10 w-auto object-contain"
              />
              <img
                src={kucLogo}
                alt="Kannur University Logo"
                className="h-9 sm:h-10 w-auto object-contain"
              />
            </div>
            <div className="border-l border-slate-200 pl-3 hidden sm:block">
              <div className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-tight group-hover:text-[#0b2344] transition">
                ANRF-PAIR · Kannur University
              </div>
              <div className="text-xs text-slate-500 font-normal leading-tight mt-0.5">
                Health and Medical Technologies research team
              </div>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 text-sm">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `relative py-2 font-medium transition-colors hover:text-[#0b2344] ${
                    isActive ? 'text-[#0b2344] font-semibold' : 'text-slate-600'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{link.name}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#0f766e] rounded-full" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
            <NavLink
              to={portalLink.path}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md border border-[#0b2344] text-[#0b2344] font-semibold hover:bg-[#0b2344] hover:text-white transition"
            >
              <portalLink.icon size={15} />
              <span>{portalLink.name}</span>
            </NavLink>
          </nav>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus:outline-hidden"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-slate-50 px-4 pt-3 pb-4 space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium transition ${
                    isActive
                      ? 'bg-[#0b2344] text-white'
                      : 'text-slate-700 hover:bg-slate-200 hover:text-slate-900'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            <NavLink
              to={portalLink.path}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-semibold text-[#0b2344] border border-[#0b2344]/30 mt-2"
            >
              <portalLink.icon size={16} />
              {portalLink.name}
            </NavLink>
          </div>
        )}
      </div>
    </header>
  );
};
