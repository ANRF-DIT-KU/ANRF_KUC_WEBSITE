import React from 'react';
import { Link } from 'react-router-dom';
import { Bulletin } from '../../types';
import { Download, ArrowRight } from 'lucide-react';

interface BulletinsSectionProps {
  bulletins: Bulletin[];
}

export const BulletinsSection: React.FC<BulletinsSectionProps> = ({ bulletins }) => {
  return (
    <section className="py-16 px-4 sm:px-8 bg-slate-50/50 border-t border-slate-200" id="bulletins">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0b2344] font-display">
              Research bulletins
            </h2>
          </div>
          <div>
            <Link
              to="/bulletins/archive"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0f766e] hover:text-[#0b2344] transition"
            >
              <span>Browse the archive</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* 3 Bulletin Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {bulletins.map((bulletin, index) => {
            // Alternating header colors as shown in the design:
            // Card 1: Teal, Card 2: Navy, Card 3: Teal
            const isNavy = bulletin.themeColor === 'navy' || index === 1;
            const headerBg = isNavy ? 'bg-[#0b2344]' : 'bg-[#006978]';

            return (
              <div
                key={bulletin.id}
                className="flex flex-col bg-white border border-slate-200 rounded-lg overflow-hidden shadow-xs hover:shadow-md transition-all duration-200"
              >
                {/* Colored Top Header Banner */}
                <div className={`${headerBg} text-white px-5 py-8 text-xs font-bold tracking-wider uppercase`}>
                  VOL. {bulletin.volume} · ISSUE {bulletin.issue}
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 font-display mb-2 leading-snug">
                      {bulletin.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-6">
                      {bulletin.summary}
                    </p>
                  </div>

                  {/* Download PDF Action */}
                  <div className="pt-2">
                    <a
                      href={bulletin.downloadUrl}
                      download={bulletin.fileName ?? true}
                      onClick={(e) => {
                        // Seed bulletins have no PDF attached yet.
                        if (bulletin.downloadUrl !== '#') return;
                        e.preventDefault();
                        alert(`Downloading Bulletin: Vol ${bulletin.volume} Issue ${bulletin.issue}`);
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
    </section>
  );
};

