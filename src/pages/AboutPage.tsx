import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="py-12 px-4 sm:px-8 max-w-7xl mx-auto">
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0f766e] hover:text-[#0b2344] transition"
        >
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </Link>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg p-8 sm:p-12 shadow-xs">
        <div className="text-xs font-semibold text-[#e5a83b] uppercase tracking-wider mb-2 font-sans">
          ANRF · PARTNERSHIPS FOR ACCELERATED INNOVATION AND RESEARCH
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#0b2344] font-display mb-6">
          About the ANRF-PAIR Initiative at Kannur University
        </h1>

        <div className="prose prose-slate max-w-none space-y-6 text-slate-700 leading-relaxed">
          <p className="text-lg text-slate-800 font-medium">
            The Anusandhan National Research Foundation (ANRF) PAIR scheme fosters high-impact research
            collaboration between premier hub institutions and spoke universities across India.
          </p>

          <p>
            Kannur University serves as an active spoke institution in partnership with the University of
            Hyderabad (Hub), catalyzing cross-disciplinary research in Health and Medical Technologies.
            Our joint mandate focuses on solving urgent healthcare challenges across three primary domains:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-lg">
              <h3 className="text-base font-bold text-[#0b2344] font-display mb-2">
                Metabolic Diseases
              </h3>
              <p className="text-sm text-slate-600">
                Elucidating cellular signaling, biomarker discovery, and early therapeutics for diabetes,
                fatty liver disorders, and metabolic syndrome in regional populations.
              </p>
            </div>

            <div className="p-6 bg-slate-50 border border-slate-200 rounded-lg">
              <h3 className="text-base font-bold text-[#0b2344] font-display mb-2">
                Infectious Diseases
              </h3>
              <p className="text-sm text-slate-600">
                Surveillance and mechanistic elucidation of antimicrobial resistance (AMR), viral genomics,
                and targeted drug development.
              </p>
            </div>

            <div className="p-6 bg-slate-50 border border-slate-200 rounded-lg">
              <h3 className="text-base font-bold text-[#0b2344] font-display mb-2">
                Oncology & Cancers
              </h3>
              <p className="text-sm text-slate-600">
                Engineering smart nano-delivery platforms and discovering natural product cytotoxic agents
                against refractory carcinomas.
              </p>
            </div>
          </div>

          <h2 className="text-xl font-bold text-[#0b2344] font-display pt-4">
            Hub & Spoke Synergy
          </h2>
          <p>
            Through state-of-the-art shared instrumentation, joint PhD mentorship, and bi-monthly review colloquia,
            the spoke labs at Kannur University work hand-in-hand with leading faculty at the University of Hyderabad.
          </p>
        </div>
      </div>
    </div>
  );
};
