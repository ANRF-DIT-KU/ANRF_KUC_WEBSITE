import { Project, ProjectTeam } from "../types";

/** Default password assigned to every seeded account (must be changed on first login). */
export const DEFAULT_PASSWORD = "Anrf@2026";

/** Seed team details (previously hard-coded in TeamPage). Project ids match department ids. */
export const seedTeams: ProjectTeam[] = [
  {
    projectId: "biotech",
    projectTitle:
      "Next Generation approach to develop tetravalent vaccine against Dengue Virus using Engineered Dendritic cells derived nanodexosomes",
    pi: {
      name: "Prof. Anup Kumar Kesavan",
      role: "Principal Investigator",
      affiliation: "ANRF PAIR, Kannur University",
    },
    coInvestigators: [],
    members: [
      {
        name: "Yadhu Krishna Menon",
        role: "Project Associate",
        email: "yadhukrishna469@gmail.com",
      },
    ],
  },
  {
    projectId: "sports-science",
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
    projectId: "it",
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
    projectId: "chemistry",
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
    projectId: "mol-bio",
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
    projectId: "zoology",
    projectTitle: "Vector Dynamics and Hotspot Mapping for Dengue/Malaria",
    pi: {
      name: "Dr. Joseph Erinjery",
      role: "Project Investigator",
      affiliation: "ANRF PAIR, Kannur University",
    },
    coInvestigators: [],
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

export const projectsData: Project[] = seedTeams.map((t) => ({
  id: t.projectId,
  title: t.projectTitle,
  departmentId: t.projectId,
}));

