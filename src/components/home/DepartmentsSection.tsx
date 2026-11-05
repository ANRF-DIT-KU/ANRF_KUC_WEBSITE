import React from 'react';
import { Department } from '../../types';
import { User, Activity } from 'lucide-react';

interface DepartmentsSectionProps {
  departments: Department[];
}

export const DepartmentsSection: React.FC<DepartmentsSectionProps> = ({ departments }) => {
  return (
    <section className="py-16 px-4 sm:px-8 bg-white" id="departments">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0b2344] font-display">
            Our Six Departments
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Participating academic departments, investigators, and research focus areas under the initiative.
          </p>
        </div>

        {/* 3x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((dept) => (
            <div
              key={dept.id}
              className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col justify-between"
            >
              <div>
                <span className="text-[#0f766e] text-xs font-bold tracking-wider uppercase font-sans">
                  {dept.label}
                </span>

                <h3 className="text-lg font-bold text-slate-900 mt-2 mb-3 font-display">
                  {dept.name}
                </h3>

                <div className="space-y-2 mb-4">
                  <div className="flex items-start gap-2 text-xs text-slate-700">
                    <User size={15} className="text-[#0f766e] shrink-0 mt-0.5" />
                    <span className="font-semibold">{dept.leadInvestigator}</span>
                  </div>
                  {dept.diseaseArea && (
                    <div className="flex items-start gap-2 text-xs text-slate-600">
                      <Activity size={15} className="text-slate-400 shrink-0 mt-0.5" />
                      <span>Domain: {dept.diseaseArea}</span>
                    </div>
                  )}
                </div>

                {dept.description && (
                  <p className="text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {dept.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


