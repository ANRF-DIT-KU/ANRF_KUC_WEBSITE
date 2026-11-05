import React from 'react';
import { Link } from 'react-router-dom';
import { Department } from '../types';
import { ArrowLeft, User, Activity } from 'lucide-react';

interface DepartmentsPageProps {
  departments: Department[];
}

export const DepartmentsPage: React.FC<DepartmentsPageProps> = ({ departments }) => {
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

      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#0b2344] font-display">
          Our Six Departments
        </h1>
        <p className="text-slate-600 text-sm sm:text-base mt-2">
          Participating academic departments, investigators, and research focus areas under the initiative.
        </p>
      </div>

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

              <h2 className="text-lg font-bold text-slate-900 mt-2 mb-3 font-display">
                {dept.name}
              </h2>

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
  );
};


