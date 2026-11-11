import React from "react";
import { useParams } from "react-router-dom";
import { Department } from "../types";
import { PageContainer } from "../components/common/PageContainer";
import { BackLink } from "../components/common/BackLink";
import { User, BookOpen, Activity } from "lucide-react";

interface DepartmentDetailPageProps {
  departments: Department[];
}

export const DepartmentDetailPage: React.FC<DepartmentDetailPageProps> = ({
  departments,
}) => {
  const { id } = useParams<{ id: string }>();
  const department = departments.find((d) => d.id === id) || departments[0];

  return (
    <PageContainer>
      <BackLink to="/departments" label="Back to All Departments" />

      <div className="bg-white border border-slate-200 rounded-lg p-8 sm:p-10 shadow-xs mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#0b2344] font-display mt-2 mb-4">
          {department.name}
        </h1>
        <p className="text-base text-slate-700 leading-relaxed max-w-3xl mb-8">
          {department.focusArea}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-200">
          <div className="flex items-start gap-3">
            <User className="text-[#0f766e] shrink-0 mt-0.5" size={20} />
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Lead Investigator
              </div>
              <div className="text-sm font-bold text-slate-800 mt-0.5">
                {department.leadInvestigator || "Senior Faculty PI"}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Activity className="text-[#0f766e] shrink-0 mt-0.5" size={20} />
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Disease Focus
              </div>
              <div className="text-sm font-bold text-slate-800 mt-0.5">
                {department.diseaseArea || "Translational Health"}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <BookOpen className="text-[#0f766e] shrink-0 mt-0.5" size={20} />
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Active Publications & Outputs
              </div>
              <div className="text-sm font-bold text-slate-800 mt-0.5">
                {department.outputsCount || 12} Indexed Research Works
              </div>
            </div>
          </div>
        </div>

        {department.description && (
          <div className="mt-8 pt-6 border-t border-slate-200">
            <h3 className="text-lg font-bold text-[#0b2344] font-display mb-3">
              Research Focus & Laboratory Mandate
            </h3>
            <p className="text-slate-600 leading-relaxed text-sm">
              {department.description}
            </p>
          </div>
        )}
      </div>
    </PageContainer>
  );
};
