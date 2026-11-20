import React from "react";
import { Link } from "react-router-dom";
import { Presentation } from "../../types";
import { ArrowRight, Download } from "lucide-react";

interface PresentationsSectionProps {
  presentations: Presentation[];
}

export const PresentationsSection: React.FC<PresentationsSectionProps> = ({
  presentations,
}) => {
  const recentPresentations = presentations.slice(0, 3);
  if (recentPresentations.length === 0) return null;

  return (
    <section
      className="py-16 px-4 sm:px-8 bg-white border-t border-slate-200"
      id="presentations"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0b2344] font-display">
            Presentations
          </h2>

          <Link
            to="/presentations"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0f766e] hover:text-[#0b2344] transition"
          >
            <span>View all presentations</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        {recentPresentations.length === 0 ? (
          <p className="text-sm text-slate-500 py-6">
            No presentations have been published yet.
          </p>
        ) : (
          <div className="divide-y divide-slate-200">
            {recentPresentations.map((item) => (
              <div key={item.id} className="py-6 first:pt-0 last:pb-0">
                {/* Meta: Date & Venue */}
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <span>{item.date}</span>
                  <span>·</span>
                  <span>{item.venue}</span>
                </div>

                {/* Seminar / Review Title */}
                <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display leading-snug hover:text-[#0b2344] transition">
                  {item.title}
                </h3>

                {item.speaker && (
                  <p className="text-xs text-slate-500 mt-1">
                    Presented by:{" "}
                    <span className="text-slate-700 font-medium">
                      {item.speaker}
                    </span>
                  </p>
                )}

                {item.slidesUrl && (
                  <a
                    href={item.slidesUrl}
                    download={item.fileName ?? true}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0f766e] hover:text-[#0b2344] mt-2 transition"
                  >
                    <Download size={13} />
                    <span>Download slides</span>
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
