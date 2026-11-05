import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download, FileText } from 'lucide-react';

export const BulletinsArchivePage: React.FC = () => {
  const archiveItems = [
    { vol: '02', issue: '04', date: 'November 2026', title: 'Antimicrobial Resistance & Multi-Omics Profiling in Coastal Kerala' },
    { vol: '02', issue: '03', date: 'August 2026', title: 'Metabolic Syndrome & Endocrine Disruptors: Regional Biomarkers' },
    { vol: '02', issue: '02', date: 'May 2026', title: 'Nanostructured Delivery Vehicles for Triple-Negative Breast Cancer' },
    { vol: '02', issue: '01', date: 'February 2026', title: 'PAIR Launch: Cross-Disciplinary Research Roadmap & Hub Integration' },
    { vol: '01', issue: '04', date: 'November 2025', title: 'Pilot Surveillance of Hospital Acquired Infections in Northern Malabar' },
    { vol: '01', issue: '03', date: 'August 2025', title: 'High-Throughput Computational Screening of Marine Alkaloids' },
  ];

  return (
    <div className="py-12 px-4 sm:px-8 max-w-7xl mx-auto">
      <div className="mb-6">
        <Link
          to="/bulletins"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0f766e] hover:text-[#0b2344] transition"
        >
          <ArrowLeft size={16} />
          <span>Back to Bulletins</span>
        </Link>
      </div>

      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#0b2344] font-display">
          Bulletin Archive
        </h1>
        <p className="text-slate-600 text-sm sm:text-base mt-2">
          Complete archive of published research bulletins, technical monographs, and PAIR progress reports.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg divide-y divide-slate-200 shadow-xs">
        {archiveItems.map((item, idx) => (
          <div key={idx} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition">
            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded bg-slate-100 text-[#0b2344]">
                <FileText size={20} />
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                  VOL. {item.vol} · ISSUE {item.issue} · {item.date}
                </div>
                <h3 className="text-base font-bold text-slate-900 font-display">
                  {item.title}
                </h3>
              </div>
            </div>
            <button
              onClick={() => alert(`Downloading PDF for Vol ${item.vol} Issue ${item.issue}`)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 border border-slate-300 rounded hover:bg-white text-slate-700 hover:text-[#0b2344] transition shrink-0"
            >
              <Download size={14} className="text-[#0f766e]" />
              <span>Download PDF</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

