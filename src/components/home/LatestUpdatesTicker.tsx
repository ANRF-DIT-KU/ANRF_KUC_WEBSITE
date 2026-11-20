import React from "react";
import { Link } from "react-router-dom";
import { Bulletin, Presentation } from "../../types";

interface LatestUpdatesTickerProps {
  bulletins: Bulletin[];
  presentations: Presentation[];
}

interface TickerItem {
  id: string;
  tag: string;
  text: string;
  to: string;
}

export const LatestUpdatesTicker: React.FC<LatestUpdatesTickerProps> = ({
  bulletins,
  presentations,
}) => {
  const items: TickerItem[] = [
    ...bulletins.map((b) => ({
      id: `bulletin-${b.id}`,
      tag: `Bulletin · Vol. ${b.volume} Issue ${b.issue}`,
      text: b.title,
      to: "/bulletins",
    })),
    ...presentations.map((p) => ({
      id: `presentation-${p.id}`,
      tag: `Presentation · ${p.date}`,
      text: p.title,
      to: "/presentations",
    })),
  ];

  if (items.length === 0) return null;

  const renderTrack = (copyIndex: number) => (
    <div
      key={copyIndex}
      className="flex items-center shrink-0 gap-6 pr-6 whitespace-nowrap"
      aria-hidden={copyIndex > 0}
    >
      {items.map((item) => (
        <React.Fragment key={`${copyIndex}-${item.id}`}>
          <Link
            to={item.to}
            className="inline-flex items-center gap-2 text-xs sm:text-sm text-slate-700 hover:text-[#0b2344] transition group"
          >
            <span className="font-semibold text-[#0f766e] group-hover:underline">
              {item.tag}:
            </span>
            <span className="group-hover:underline">{item.text}</span>
          </Link>
          <span className="text-slate-400 font-bold select-none" aria-hidden="true">
            ·
          </span>
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <div className="bg-[#eef4f9] border-y border-slate-200 py-2.5 px-4 sm:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center gap-4">
        {/* Badge */}
        <div className="shrink-0">
          <span className="inline-block bg-[#0f766e] text-white text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded">
            LATEST UPDATES
          </span>
        </div>

        {/* Auto-scrolling Marquee */}
        <div className="flex-1 overflow-hidden py-0.5">
          <div className="flex w-max animate-ticker">
            {renderTrack(0)}
            {renderTrack(1)}
          </div>
        </div>
      </div>
    </div>
  );
};
