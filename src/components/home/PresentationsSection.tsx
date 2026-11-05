import React, { useState } from 'react';
import { Presentation, Department } from '../../types';
import { CheckCircle2 } from 'lucide-react';

interface PresentationsSectionProps {
  presentations: Presentation[];
  departments: Department[];
}

export const PresentationsSection: React.FC<PresentationsSectionProps> = ({
  presentations,
  departments,
}) => {
  const [selectedDept, setSelectedDept] = useState('');
  const [title, setTitle] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDept || !title) {
      alert('Please select a department and enter a presentation title.');
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setSelectedDept('');
      setTitle('');
      setFile(null);
    }, 800);
  };

  return (
    <section className="py-16 px-4 sm:px-8 bg-white border-t border-slate-200" id="presentations">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left Column: Presentations List */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0b2344] font-display mb-8">
              Presentations
            </h2>

            <div className="divide-y divide-slate-200">
              {presentations.map((item) => (
                <div key={item.id} className="py-6 first:pt-0 last:pb-0">
                  {/* Meta: Date & Venue */}
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <span>{item.date}</span>
                    <span>·</span>
                    <span>{item.venue}</span>
                  </div>

                  {/* Seminar / Review Title */}
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display leading-snug hover:text-[#0b2344] transition cursor-pointer">
                    {item.title}
                  </h3>

                  {item.speaker && (
                    <p className="text-xs text-slate-500 mt-1">
                      Presented by: <span className="text-slate-700 font-medium">{item.speaker}</span>
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Submit Your Presentation Card */}
          <div className="lg:col-span-5">
            <div className="bg-white border border-slate-200 rounded-lg p-6 sm:p-7 shadow-xs">
              <h3 className="text-xl font-bold text-[#0b2344] font-display mb-6">
                Submit your presentation
              </h3>

              {submitted ? (
                <div className="p-6 bg-teal-50 border border-teal-200 rounded-md text-center space-y-3">
                  <CheckCircle2 size={36} className="text-[#0f766e] mx-auto" />
                  <h4 className="text-base font-bold text-slate-900 font-display">
                    Presentation Submitted!
                  </h4>
                  <p className="text-xs text-slate-600">
                    Your presentation file has been successfully uploaded for academic review by the ANRF-PAIR editorial team.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="inline-block mt-2 text-xs font-semibold text-[#0f766e] hover:underline"
                  >
                    Submit another file
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Department Field */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                      Department
                    </label>
                    <select
                      value={selectedDept}
                      onChange={(e) => setSelectedDept(e.target.value)}
                      required
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md bg-white focus:outline-hidden focus:ring-2 focus:ring-[#0b2344] focus:border-transparent text-slate-800"
                    >
                      <option value="">Select department</option>
                      {departments.map((d) => (
                        <option key={d.id} value={d.id}>
                          {d.label}: {d.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Presentation Title Field */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                      Presentation title
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Molecular Mechanisms in Oncology"
                      required
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md bg-white focus:outline-hidden focus:ring-2 focus:ring-[#0b2344] focus:border-transparent text-slate-800"
                    />
                  </div>

                  {/* File Upload Field */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                      File (PDF or PPTX)
                    </label>
                    <div className="flex items-center">
                      <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-2 border border-slate-300 rounded-l-md text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 transition">
                        <span>Choose File</span>
                        <input
                          type="file"
                          accept=".pdf,.pptx,.ppt"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              setFile(e.target.files[0]);
                            }
                          }}
                          className="sr-only"
                        />
                      </label>
                      <span className="flex-1 px-3 py-2 border-y border-r border-slate-300 rounded-r-md text-xs text-slate-500 bg-white truncate">
                        {file ? file.name : 'No file chosen'}
                      </span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-3 px-4 bg-[#0b2344] hover:bg-[#071930] text-white font-medium text-sm rounded-md transition shadow-xs flex items-center justify-center gap-2"
                    >
                      {submitting ? (
                        <span>Processing upload...</span>
                      ) : (
                        <span>Upload for review</span>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
