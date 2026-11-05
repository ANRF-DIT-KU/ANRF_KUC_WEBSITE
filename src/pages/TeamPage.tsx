import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail, UserCheck, Users } from "lucide-react";

interface ProjectGroup {
  id: string;
  projectTitle: string;
  pi: {
    name: string;
    role: string;
    affiliation: string;
  };
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
      id: "blood-profiling",
      projectTitle: "Non-Invasive Blood Parameter Profiling",
      pi: {
        name: "Prof. Sreekanth N S",
        role: "Co-Investigator",
        affiliation: "ANRF PAIR, Kannur University",
      },
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
        role: "Co-Investigator",
        affiliation: "ANRF PAIR, Kannur University",
      },
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
        role: "Co-Investigator",
        affiliation: "ANRF PAIR, Kannur University",
      },
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
      id: "health-surveillance",
      projectTitle:
        "Interactive Citizen Driven Health Information System and Social wellbeing Frame work for Early Disease Surveillance, Healthcare and Health Promotion- Pilot study in Kerala",
      pi: {
        name: "Prof. Anil Ramachandran",
        role: "Co-Investigator",
        affiliation: "ANRF PAIR, Kannur University",
      },
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
      id: "vector-dynamics",
      projectTitle: "Vector Dynamics and Hotspot Mapping for Dengue/Malaria",
      pi: {
        name: "Dr. Joseph Erinjery",
        role: "Co-Investigator",
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
    <div className="py-12 px-4 sm:px-8 max-w-6xl mx-auto">
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0f766e] hover:text-[#0b2344] transition"
        >
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#0b2344] font-display">
          Our Team
        </h1>
      </div>

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
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-teal-100 text-[#0f766e]">
                        {group.pi.role}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500">
                      {group.pi.affiliation}
                    </div>
                  </div>
                </div>
              </div>

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
    </div>
  );
};
