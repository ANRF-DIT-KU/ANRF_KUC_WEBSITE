import React from 'react';
import { PageContainer } from '../components/common/PageContainer';
import { PageHeader } from '../components/common/PageHeader';
import { BackLink } from '../components/common/BackLink';
import { Calendar, MapPin } from 'lucide-react';

export const NewsEventsPage: React.FC = () => {
  const events = [
    {
      id: '1',
      type: 'Conference',
      title: 'National Symposium on Frontiers in Cellular Therapeutics & Omics',
      date: 'November 24-25, 2026',
      location: 'Seminar Complex, Kannur University & Hybrid Virtual',
      desc: 'Joint conference gathering PIs, research scholars, and industry partners under the ANRF-PAIR network.',
    },
    {
      id: '2',
      type: 'Workshop',
      title: 'Hands-on Workshop: High-Resolution Mass Spectrometry for Metabolite Profiling',
      date: 'December 8-10, 2026',
      location: 'Central Instrumentation Facility (CIF), Kannur',
      desc: 'Three-day technical workshop for graduate scholars on sample preparation and spectral analysis.',
    },
    {
      id: '3',
      type: 'Guest Lecture',
      title: 'Emerging Arboviruses in the Western Ghats: Surveillance and Genomic Epidemiology',
      date: 'December 18, 2026',
      location: 'Auditorium Hall B',
      desc: 'Distinguished lecture delivered by Hub visiting faculty from the University of Hyderabad.',
    },
  ];

  return (
    <PageContainer>
      <BackLink to="/" label="Back to Home" />

      <PageHeader title="News & Events" />

      <div className="space-y-6">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white border border-slate-200 rounded-lg p-6 sm:p-7 shadow-xs hover:shadow-md transition"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wider uppercase bg-teal-50 text-[#0f766e] border border-teal-200">
                {event.type}
              </span>
            </div>

            <h2 className="text-xl font-bold text-slate-900 font-display mb-3">
              {event.title}
            </h2>

            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              {event.desc}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-3 border-t border-slate-100">
              <div className="flex items-center gap-1.5">
                <Calendar size={14} className="text-[#0f766e]" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin size={14} className="text-[#0f766e]" />
                <span>{event.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </PageContainer>
  );
};
