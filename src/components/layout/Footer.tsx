import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0b2344] text-slate-300 pt-12 pb-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 pb-10 border-b border-slate-700/60">
          {/* Column 1: Institution Info */}
          <div>
            <h3 className="text-white text-base font-bold tracking-tight mb-2 font-display">
              Kannur University ANRF-PAIR
            </h3>
            <div className="text-slate-400 text-sm space-y-1">
              <p>Thavakkara, Civil Station P.O.</p>
              <p>Kannur, Kerala 670002, India</p>
              <p className="pt-1 text-slate-300">
                <span className="text-slate-400">Email:</span> pair-hub@kannuruniv.ac.in
              </p>
              <p className="text-slate-300">
                <span className="text-slate-400">Tel:</span> +91 497 2715185 / 2715200
              </p>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white text-base font-bold tracking-tight mb-2 font-display">
              Quick links
            </h3>
            <div className="text-slate-300 text-sm flex flex-wrap items-center gap-x-2 gap-y-1">
              <Link to="/about" className="hover:text-amber-300 transition">About</Link>
              <span className="text-slate-600">·</span>
              <Link to="/departments" className="hover:text-amber-300 transition">Departments</Link>
              <span className="text-slate-600">·</span>
              <Link to="/bulletins" className="hover:text-amber-300 transition">Bulletins</Link>
              <span className="text-slate-600">·</span>
              <Link to="/team" className="hover:text-amber-300 transition">Team</Link>
              <span className="text-slate-600">·</span>
              <Link to="/contact" className="hover:text-amber-300 transition">Contact</Link>
            </div>
          </div>

          {/* Column 3: Partners */}
          <div>
            <h3 className="text-white text-base font-bold tracking-tight mb-2 font-display">
              Partners
            </h3>
            <div className="text-slate-300 text-sm flex flex-wrap items-center gap-x-2 gap-y-1">
              <a
                href="https://anrf.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-300 transition underline underline-offset-2"
              >
                ANRF
              </a>
              <span className="text-slate-600">·</span>
              <a
                href="https://uohyd.ac.in"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-300 transition underline underline-offset-2"
              >
                University of Hyderabad (Hub)
              </a>
            </div>
          </div>
        </div>

        {/* Sub-footer copyright */}
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} Kannur University ANRF-PAIR Spoke. All rights reserved.</p>
          <p className="text-slate-400 text-xs">
            Partnerships for Accelerated Innovation and Research (PAIR) Scheme
          </p>
        </div>
      </div>
    </footer>
  );
};


