import { Bulletin, Presentation, SocialPost, Announcement } from "../types";

export const mockAnnouncements = {
  template: [
    { id: "1", text: "[Announcement headline, date]", date: "2026-11-01" },
    { id: "2", text: "[Announcement headline, date]", date: "2026-10-28" },
    { id: "3", text: "[Announcement headline, date]", date: "2026-10-24" },
  ] as Announcement[],
  filled: [
    {
      id: "1",
      text: "ANRF-PAIR Joint Research Symposium on Metabolic Disorders announced for Nov 24, 2026",
      date: "2026-11-01",
    },
    {
      id: "2",
      text: "Call for PAIR Inter-Departmental Seed Grant Proposals open until Dec 15, 2026",
      date: "2026-10-28",
    },
    {
      id: "3",
      text: "Kannur University & Univ. of Hyderabad initiate collaborative High-Resolution Bio-Imaging cluster",
      date: "2026-10-24",
    },
  ] as Announcement[],
};

export const mockBulletins = {
  template: [
    {
      id: "bulletin-1",
      volume: "[ ]",
      issue: "[ ]",
      title: "[Bulletin title]",
      summary: "[Short summary of this issue]",
      downloadUrl: "#",
      publishDate: "Quarterly · Issue 01",
      themeColor: "teal",
    },
    {
      id: "bulletin-2",
      volume: "[ ]",
      issue: "[ ]",
      title: "[Bulletin title]",
      summary: "[Short summary of this issue]",
      downloadUrl: "#",
      publishDate: "Quarterly · Issue 02",
      themeColor: "navy",
    },
    {
      id: "bulletin-3",
      volume: "[ ]",
      issue: "[ ]",
      title: "[Bulletin title]",
      summary: "[Short summary of this issue]",
      downloadUrl: "#",
      publishDate: "Quarterly · Issue 03",
      themeColor: "teal",
    },
  ] as Bulletin[],
  filled: [
    {
      id: "bulletin-1",
      volume: "02",
      issue: "04",
      title:
        "Antimicrobial Resistance & Multi-Omics Profiling in Coastal Kerala",
      summary:
        "Quarterly highlights on microbial resistance surveillance, genomic sequencing of nosocomial isolates, and clinical cohort outcomes.",
      downloadUrl: "#",
      publishDate: "November 2026",
      themeColor: "teal",
    },
    {
      id: "bulletin-2",
      volume: "02",
      issue: "03",
      title: "Metabolic Syndrome & Endocrine Disruptors: Regional Biomarkers",
      summary:
        "Investigating micro-pollutant exposure pathways and hepatic insulin sensitivity markers in rural agricultural zones.",
      downloadUrl: "#",
      publishDate: "August 2026",
      themeColor: "navy",
    },
    {
      id: "bulletin-3",
      volume: "02",
      issue: "02",
      title:
        "Nanostructured Delivery Vehicles for Triple-Negative Breast Cancer",
      summary:
        "Pre-clinical assessments of folate-conjugated chitosan nanoparticles synthesized jointly with the University of Hyderabad hub.",
      downloadUrl: "#",
      publishDate: "May 2026",
      themeColor: "teal",
    },
  ] as Bulletin[],
};

export const mockPresentations = {
  template: [
    {
      id: "pres-1",
      date: "[DATE]",
      venue: "[VENUE / ONLINE]",
      title: "[Review or seminar title]",
      speaker: "Invited Keynote Speaker",
      department: "Department 1",
    },
    {
      id: "pres-2",
      date: "[DATE]",
      venue: "[VENUE / ONLINE]",
      title: "[Review or seminar title]",
      speaker: "Research Scholar Fellow",
      department: "Department 2",
    },
    {
      id: "pres-3",
      date: "[DATE]",
      venue: "[VENUE / ONLINE]",
      title: "[Review or seminar title]",
      speaker: "Principal Investigator",
      department: "Department 3",
    },
  ] as Presentation[],
  filled: [
    {
      id: "pres-1",
      date: "18 NOV 2026",
      venue: "SEMINAR COMPLEX · AUDITORIUM A & HYBRID",
      title:
        "Targeting Oncogenic Signaling Cascades in Triple-Negative Breast Cancer: A Multi-Omics Perspective",
      speaker: "Dr. K. Baiju (Dept of Chemistry)",
      department: "Department of Chemistry",
    },
    {
      id: "pres-2",
      date: "27 NOV 2026",
      venue: "HYBRID VIRTUAL / UoH HUB CONNECTION",
      title:
        "Genomic Surveillance of Multi-Drug Resistant Enterobacteriaceae: 2026 Surveillance Report",
      speaker: "Prof. A. Sabu (Dept of Biotechnology)",
      department: "Department of Biotechnology & Microbiology",
    },
    {
      id: "pres-3",
      date: "04 DEC 2026",
      venue: "CENTRAL AUDITORIUM · KANNUR CAMPUS",
      title:
        "Machine Learning Architectures for De Novo Peptide Design Against Viral Spike Glycoproteins",
      speaker: "Dr. C. Baburaj (Dept of Bioinformatics)",
      department: "Department of Mathematical Sciences & Bioinformatics",
    },
  ] as Presentation[],
};

export const mockSocialPosts = {
  template: [
    {
      id: "post-1",
      platform: "x",
      title: "ANRF-PAIR Updates",
      content: "[Latest social post]",
      date: "2h ago",
      author: "@KannurUniv_PAIR",
    },
    {
      id: "post-2",
      platform: "linkedin",
      title: "Research Dissemination",
      content: "[Latest social post]",
      date: "1d ago",
      author: "ANRF-PAIR Kannur Spoke",
    },
  ] as SocialPost[],
  filled: [
    {
      id: "post-1",
      platform: "instagram",
      title: "Lab Milestone Reached",
      content:
        "Excited to announce the installation of our automated benchtop Flow Cytometer at Kannur University central instrumentation facility under the ANRF-PAIR initiative! Joint training with @UnivOfHyderabad begins next week. #ResearchIndia #Biotech",
      date: "2 hours ago",
      likes: 84,
      author: "@anrfkuc",
    },
    {
      id: "post-2",
      platform: "youtube",
      title: "PAIR Scholar Fellowship",
      content:
        "Applications are now officially open for the ANRF-PAIR Postdoctoral Fellowship in Translational Health Technologies. Watch our overview session and learn about the research spokes.",
      date: "Yesterday at 4:30 PM",
      likes: 142,
      author: "ANRF KUC",
    },
  ] as SocialPost[],
};
