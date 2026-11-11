import React from 'react';
import { Department } from '../../types';
import { User } from 'lucide-react';

interface DepartmentCardProps {
  department: Department;
}

export const DepartmentCard: React.FC<DepartmentCardProps> = ({ department }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all duration-200">
      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-3 font-display">
          {department.name}
        </h3>

        <div className="space-y-2 mb-4">
          {department.leadInvestigator && (
            <div className="flex items-start gap-2 text-xs text-slate-700">
              <User size={15} className="text-[#0f766e] shrink-0 mt-0.5" />
              <span className="font-semibold">{department.leadInvestigator}</span>
            </div>
          )}
        </div>

        {department.description && (
          <p className="text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
            {department.description}
          </p>
        )}
      </div>
    </div>
  );
};
