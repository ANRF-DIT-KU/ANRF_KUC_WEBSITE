import React from 'react';
import { Department } from '../../types';
import { DepartmentCard } from '../departments/DepartmentCard';

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
            <DepartmentCard key={dept.id} department={dept} />
          ))}
        </div>
      </div>
    </section>
  );
};


