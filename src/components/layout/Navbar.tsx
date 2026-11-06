import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
            {/* KU Badge */}
            <div className="w-10 h-10 rounded bg-[#0b2344] text-white flex items-center justify-center font-bold text-base tracking-wider shadow-sm group-hover:bg-[#071930] transition">
              KU
            </div>
            <div>
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
          </div>
        )}
      </div>
    </header>
  );
};
