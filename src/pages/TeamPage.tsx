import React from "react";
import { Mail, UserCheck, Users } from "lucide-react";
import { PageContainer } from "../components/common/PageContainer";
import { PageHeader } from "../components/common/PageHeader";
import { BackLink } from "../components/common/BackLink";

interface ProjectGroup {
  id: string;
  projectTitle: string;
  pi: {
    name: string;
    role: string;
    affiliation: string;
  };
  coInvestigators?: {
    name: string;
    role?: string;
  }[];
  members: {
    name: string;
    role: string;
    email: string;
  }[];
}

export const TeamPage: React.FC = () => {
  const projectGroups: ProjectGroup[] = [
    {
      id: "dengue-vaccine",
      projectTitle:
        "Next Generation approach to develop tetravalent vaccine against Dengue Virus using Engineered Dendritic cells derived nanodexosomes",
      pi: {
        name: "Prof. Anup Kumar Kesavan",
        role: "Principal Investigator",
        affiliation: "ANRF PAIR, Kannur University",
      },
      members: [
        {
          name: "Yadhu Krishna Menon",
          role: "Project Associate",
          email: "yadhukrishna469@gmail.com",
        },
      ],
    },
    {
      id: "health-surveillance",
      projectTitle:
        "Interactive Citizen Driven Health Information System and Social wellbeing Frame work for Early Disease Surveillance, Healthcare and Health Promotion- Pilot study in Kerala",
      pi: {
        name: "Prof. Anil Ramachandran",
        role: "Project Investigator",
        affiliation: "ANRF PAIR, Kannur University",
      },
      coInvestigators: [
        { name: "Dr. Shijila P S" },
        { name: "Dr. Johnson Alex" },
        { name: "Dr. Seetha Kakkoth" },
        { name: "Prof. N S Sreekanth" },
      ],
      members: [
        {
          name: "Sravan Sasikumar",
          role: "Project Associate",
          email: "sravanunni5@gmail.com",
        },
        {
          name: "Jyothi N",
          role: "Technical Assistant",
          email: "nssjyothi@gmail.com",
        },
      ],
    },
    {
      id: "blood-profiling",
      projectTitle: "Non-Invasive Blood Parameter Profiling",
      pi: {
        name: "Prof. N S Sreekanth",
        role: "Project Investigator",
        affiliation: "ANRF PAIR, Kannur University",
      },
      coInvestigators: [
        { name: "Prof. Anup Kumar Kesavan" },
        { name: "Dr. Baiju K V" },
        { name: "Dr. Soorej M Basheer" },
      ],
      members: [
        {
          name: "Ms. Sreya C",
          role: "Project Associate",
          email: "sreyamorazha@gmail.com",
        },
        {
          name: "Mr. Vivek Ram M J",
          role: "Project Associate",
          email: "vrammj00@gmail.com",
        },
        {
          name: "Mr. Sanal V",
          role: "Project Associate",
          email: "sanalv.phy@gmail.com",
        },
        {
          name: "Mr. Aswin K",
          role: "Technical Assistant",
          email: "aswinkorothpc@gmail.com",
        },
      ],
    },
    {
      id: "water-treatment",
      projectTitle:
        "Development of solar light driven g-C3N4 based photocatalytic system and fabrication of CPC photoreactor for Hospital waste water treatment",
      pi: {
        name: "Dr. Baiju K V",
        role: "Project Investigator",
        affiliation: "ANRF PAIR, Kannur University",
      },
      coInvestigators: [{ name: "Dr. Soorej M Basheer" }],
      members: [
        {
          name: "Mr. Akshay P K",
          role: "Project Associate",
          email: "akshaykannuruniv@gmail.com",
        },
        {
          name: "Mr. Karthikeyan E",
          role: "Project Associate",
          email: "karthikeyan03042002@gmail.com",
        },
        {
          name: "Dr. Anjali Paravannoor",
          role: "Research Associate",
          email: "anjali.nano@gmail.com",
        },
      ],
    },
    {
      id: "marine-microbes",
      projectTitle:
        "Exploring novel bioactive compounds from marine microbes and their Antimicrobial, Antiviral, and Anticancer Properties",
      pi: {
        name: "Dr. Soorej M Basheer",
        role: "Project Investigator",
        affiliation: "ANRF PAIR, Kannur University",
      },
      coInvestigators: [
        { name: "Dr. Arun Kumar" },
        { name: "Dr. Anupama K P" },
        { name: "Dr. Sreeja Chellappan" },
        { name: "Prof. Sabu A" },
      ],
      members: [
        {
          name: "Ms. Tiya Mathai",
          role: "Project Associate",
          email: "tiyamathai11@gmail.com",
        },
        {
          name: "Mr. Ajay L Manoj",
          role: "Project Associate",
          email: "ajaylekhamanoj@gmail.com",
        },
        {
          name: "Mr. Gokuljith S",
          role: "Project Associate",
          email: "i.amgjs045@gmail.com",
        },
      ],
    },

    {
      id: "vector-dynamics",
      projectTitle: "Vector Dynamics and Hotspot Mapping for Dengue/Malaria",
      pi: {
        name: "Dr. Joseph Erinjery",
        role: "Project Investigator",
        affiliation: "ANRF PAIR, Kannur University",
      },
      members: [
        {
          name: "Abhina P",
          role: "Project Associate",
          email: "pabhina3824@gmail.com",
        },
        {
          name: "Anusree C R",
          role: "Project Associate",
          email: "anusreecr02@gmail.com",
        },
      ],
    },
  ];

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
                      <a
                        href={`mailto:${member.email}`}
                        className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-[#0b2344] mt-2 transition break-all"
                      >
                        <Mail size={12} className="shrink-0" />
                        <span>{member.email}</span>
                      </a>
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
