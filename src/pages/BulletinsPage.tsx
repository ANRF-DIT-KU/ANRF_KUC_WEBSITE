import React from 'react';
import { Link } from 'react-router-dom';
import { Bulletin } from '../types';
import { ArrowLeft, Download, ArrowRight } from 'lucide-react';

interface BulletinsPageProps {
  bulletins: Bulletin[];
}

export const BulletinsPage: React.FC<BulletinsPageProps> = ({ bulletins }) => {
  return (
    <div className="py-12 px-4 sm:px-8 max-w-7xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0f766e] hover:text-[#0b2344] transition"
        >
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </Link>
        <Link
          to="/bulletins/archive"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0f766e] hover:text-[#0b2344] transition"
        >
          <span>View Archive</span>
          <ArrowRight size={16} />
        </Link>
      </div>

      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#0b2344] font-display">
          Research Bulletins
        </h1>
        <p className="text-slate-600 text-sm sm:text-base mt-2">
          Official quarterly research communications and discovery highlights from the ANRF-PAIR Kannur Spoke.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {bulletins.map((bulletin, index) => {
          const isNavy = bulletin.themeColor === 'navy' || index === 1;
          const headerBg = isNavy ? 'bg-[#0b2344]' : 'bg-[#006978]';

          return (
            <div
              key={bulletin.id}
              className="flex flex-col bg-white border border-slate-200 rounded-lg overflow-hidden shadow-xs hover:shadow-md transition-all duration-200"
            >
              <div className={`${headerBg} text-white px-5 py-8 text-xs font-bold tracking-wider uppercase`}>
                VOL. {bulletin.volume} · ISSUE {bulletin.issue}
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 font-display mb-2 leading-snug">
                    {bulletin.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {bulletin.summary}
                  </p>
                </div>

                <div className="pt-2">
                  <a
                    href={bulletin.downloadUrl}
                    onClick={(e) => {
                      e.preventDefault();
                      alert(`Downloading PDF for Volume ${bulletin.volume} Issue ${bulletin.issue}`);
                    }}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-slate-800 hover:text-[#0f766e] transition"
                  >
                    <Download size={15} className="text-[#0f766e]" />
                    <span>Download PDF</span>
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

