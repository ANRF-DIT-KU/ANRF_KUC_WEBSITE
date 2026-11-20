import React from "react";
import { Presentation } from "../types";
import { PageContainer } from "../components/common/PageContainer";
import { PageHeader } from "../components/common/PageHeader";
import { BackLink } from "../components/common/BackLink";
import { Download, Presentation as PresentationIcon } from "lucide-react";

interface PresentationsPageProps {
  presentations: Presentation[];
}

export const PresentationsPage: React.FC<PresentationsPageProps> = ({
  presentations,
}) => {
  return (
    <PageContainer>
      <BackLink to="/" label="Back to Home" />

      <PageHeader title="Presentations" />

      {presentations.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-lg p-12 text-center text-sm text-slate-500 shadow-xs">
          No presentations have been published yet.
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-lg divide-y divide-slate-200 shadow-xs">
          {presentations.map((item) => (
            <div
              key={item.id}
              className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/70 transition"
            >
              <div className="flex items-start gap-4 min-w-0">
                <div className="p-2.5 rounded bg-slate-100 text-[#0b2344] shrink-0 mt-0.5">
                  <PresentationIcon size={20} />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 flex flex-wrap items-center gap-x-1.5 gap-y-0.5">
                    <span>{item.date}</span>
                    <span>·</span>
                    <span>{item.venue}</span>
                  </div>

                  <h2 className="text-base sm:text-lg font-bold text-slate-900 font-display leading-snug">
                    {item.title}
                  </h2>

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5 text-xs text-slate-500">
                    {item.speaker && (
                      <span>
                        Presented by:{" "}
                        <span className="text-slate-700 font-medium">
                          {item.speaker}
                        </span>
                      </span>
                    )}
                    {item.department && (
                      <span className="px-2 py-0.5 rounded bg-teal-50 text-[#0f766e] font-medium">
                        {item.department}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {item.slidesUrl && (
                <a
                  href={item.slidesUrl}
                  download={item.fileName ?? true}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 border border-slate-300 rounded-md hover:bg-white text-slate-700 hover:text-[#0b2344] hover:border-slate-400 transition shrink-0 self-start sm:self-center"
                >
                  <Download size={14} className="text-[#0f766e]" />
                  <span>Download slides</span>
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </PageContainer>
  );
};
