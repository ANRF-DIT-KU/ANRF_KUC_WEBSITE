import React from 'react';
import { Link } from 'react-router-dom';

interface HeroSectionProps {
  onScrollToPresentations?: () => void;
  onScrollToBulletins?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onScrollToPresentations,
  onScrollToBulletins,
}) => {
  return (
    <section className="relative bg-[#0b2344] text-white pt-16 pb-20 px-4 sm:px-8 overflow-hidden">
      {/* Background academic pattern/radial glow */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-teal-500 blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-amber-500 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Heading, Subtitle & Buttons */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-6">
            {/* Eyebrow / Scheme Header */}
            <div className="text-[#e5a83b] text-xs sm:text-sm font-semibold tracking-wider uppercase font-sans">
              PARTNERSHIPS FOR ACCELERATED INNOVATION AND RESEARCH
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-bold text-white tracking-tight leading-[1.15] font-display">
              Innovations in Health<br />
              and Medical<br />
              Technologies
            </h1>

            {/* Subtitle Description */}
            <p className="text-slate-200 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl font-normal">
              Sustainable Health for a Resilient Future. Six Kannur University departments working
              together on metabolic diseases, infectious diseases and cancers.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/bulletins"
                onClick={onScrollToBulletins}
                className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-[#e5a83b] hover:bg-[#d4972c] text-slate-950 font-semibold text-sm transition shadow-sm hover:shadow-md"
              >
                Read the latest bulletin
              </Link>
              <Link
                to="/presentations"
                onClick={onScrollToPresentations}
                className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-transparent border border-white/70 hover:border-white hover:bg-white/10 text-white font-medium text-sm transition"
              >
                Submit a presentation
              </Link>
            </div>
          </div>

          {/* Right Column: 3 Key Metrics */}
          <div className="lg:col-span-5 xl:col-span-4 lg:pl-4">
            <div className="grid grid-cols-3 gap-2 sm:gap-4 py-6 border-t lg:border-t-0 lg:border-l border-white/20 lg:pl-8">
              {/* Stat 1 */}
              <div className="space-y-1">
                <div className="text-4xl sm:text-5xl font-light tracking-tight text-white font-sans">
                  6
                </div>
                <div className="text-xs sm:text-sm text-slate-300 font-normal leading-snug">
                  Departments
                </div>
              </div>

              {/* Stat 2 */}
              <div className="space-y-1 border-l border-white/20 pl-4 sm:pl-6">
                <div className="text-4xl sm:text-5xl font-light tracking-tight text-white font-sans">
                  3
                </div>
                <div className="text-xs sm:text-sm text-slate-300 font-normal leading-snug">
                  Disease areas
                </div>
              </div>

              {/* Stat 3 */}
              <div className="space-y-1 border-l border-white/20 pl-4 sm:pl-6">
                <div className="text-4xl sm:text-5xl font-light tracking-tight text-white font-sans">
                  1
                </div>
                <div className="text-xs sm:text-sm text-slate-300 font-normal leading-snug">
                  Hub: Univ. of Hyderabad
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

