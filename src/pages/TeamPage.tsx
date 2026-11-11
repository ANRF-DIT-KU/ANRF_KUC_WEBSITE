import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Mail, UserCheck, Users } from "lucide-react";
import { PageContainer } from "../components/common/PageContainer";
import { PageHeader } from "../components/common/PageHeader";
import { BackLink } from "../components/common/BackLink";
import { fetchTeamsApi } from "../api";

export const TeamPage: React.FC = () => {
  const { data: teams = [] } = useQuery({
    queryKey: ["teams"],
    queryFn: fetchTeamsApi,
  });

  const projectGroups = teams.map((t) => ({ ...t, id: t.projectId }));

  return (
    <PageContainer>
      <BackLink to="/" label="Back to Home" />

      {/* Header */}
      <PageHeader title="Our Team" />

      <div className="space-y-8">
        {projectGroups.map((group) => (
          <div
            key={group.id}
            className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition"
          >
            <div className="bg-slate-50 border-b border-slate-200 px-6 py-4">
              <h2 className="text-lg font-bold text-[#0b2344] leading-snug">
                {group.projectTitle}
              </h2>
            </div>

            <div className="p-6">
              {/* Investigator (PI / Lead) Card */}
              <div className="mb-6 bg-teal-50/50 border border-teal-100 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#0b2344] text-white flex items-center justify-center font-bold text-sm shrink-0">
                    <UserCheck size={18} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-base">
                        {group.pi.name}
                      </span>
                      <span
                        className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                          group.pi.role === "Principal Investigator"
                            ? "bg-amber-100 text-amber-900 border border-amber-200"
                            : "bg-teal-100 text-[#0f766e]"
                        }`}
                      >
                        {group.pi.role}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500">
                      {group.pi.affiliation}
                    </div>
                  </div>
                </div>
              </div>

              {/* Co-Investigators (Co-PIs) if present */}
              {group.coInvestigators && group.coInvestigators.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                    <UserCheck size={14} className="text-[#0f766e]" />
                    <span>Co-Investigators</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                    {group.coInvestigators.map((coPi, idx) => (
                      <div
                        key={idx}
                        className="border border-slate-200 bg-slate-50/80 rounded-lg p-3 hover:bg-white hover:border-slate-300 transition flex items-center justify-between gap-2"
                      >
                        <div className="font-semibold text-slate-800 text-sm">
                          {coPi.name}
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 whitespace-nowrap">
                          Co-PI
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Project Members / Staff */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                  <Users size={14} />
                  <span>Project Members</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {group.members.map((member, idx) => (
                    <div
                      key={idx}
                      className="border border-slate-100 bg-slate-50/60 rounded-lg p-3 hover:bg-white hover:border-slate-300 transition"
                    >
                      <div className="font-semibold text-slate-800 text-sm">
                        {member.name}
                      </div>
                      <div className="text-xs text-[#0f766e] font-medium mt-0.5">
                        {member.role}
                      </div>
                      {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-[#0b2344] mt-2 transition break-all"
                        >
                          <Mail size={12} className="shrink-0" />
                          <span>{member.email}</span>
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </PageContainer>
  );
};
