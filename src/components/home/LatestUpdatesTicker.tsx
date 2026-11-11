import React from 'react';
import { Announcement } from '../../types';

interface LatestUpdatesTickerProps {
  announcements: Announcement[];
}

export const LatestUpdatesTicker: React.FC<LatestUpdatesTickerProps> = ({ announcements }) => {
  return (
    <div className="bg-[#eef4f9] border-y border-slate-200 py-2.5 px-4 sm:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-3">
        {/* Badge */}
        <div className="shrink-0">
          <span className="inline-block bg-[#0f766e] text-white text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded">
            LATEST UPDATES
          </span>
        </div>

        {/* Announcements text / ticker */}
        <div className="text-xs sm:text-sm text-slate-700 truncate w-full flex items-center overflow-x-auto no-scrollbar py-0.5">
          <div className="flex items-center space-x-3 whitespace-nowrap">
            {announcements.map((item, idx) => (
              <React.Fragment key={item.id}>
                <span className="hover:text-[#0b2344] cursor-pointer transition">
                  {item.text}
                </span>
                {idx < announcements.length - 1 && (
                  <span className="text-slate-400 font-bold">·</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

