import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-16 text-center">
      <div className="max-w-md mx-auto space-y-4">
        <div className="text-6xl font-bold text-[#0b2344] font-display">404</div>
        <h1 className="text-2xl font-bold text-slate-800 font-display">Page Not Found</h1>
        <p className="text-sm text-slate-600">
          The requested page could not be located in the ANRF-PAIR portal directory.
        </p>
        <div className="pt-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-[#0b2344] text-white text-sm font-semibold hover:bg-[#071930] transition"
          >
            <Home size={16} />
            <span>Return to Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

