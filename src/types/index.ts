export interface Department {
  id: string;
  name: string;
  focusArea: string;
  description?: string;
  leadInvestigator?: string;
  diseaseArea?: string;
  outputsCount?: number;
}

export interface Bulletin {
  id: string;
  volume: string;
  issue: string;
  title: string;
  summary: string;
  downloadUrl: string;
  publishDate?: string;
  themeColor: "teal" | "navy";
  fileName?: string;
}

export interface Presentation {
  id: string;
  date: string;
  venue: string;
  title: string;
  speaker?: string;
  department?: string;
  slidesUrl?: string;
  fileName?: string;
}

export interface SocialPost {
  id: string;
  platform: "facebook" | "instagram" | "x" | "linkedin" | "youtube";
  title: string;
  content: string;
  date: string;
  likes?: number;
  author: string;
}

export interface Announcement {
  id: string;
  text: string;
  date: string;
  link?: string;
}

/* ------------------------------------------------------------------ */
/* Project portal (PI / member accounts)                               */
/* ------------------------------------------------------------------ */

export const GENERAL_PROJECT = "general";

export type AccountRole = "pi" | "member";

export interface Project {
  id: string;
  title: string;
  departmentId: string;
}

export interface AuthUser {
  id: string;
  projectId: string;
  role: AccountRole;
  username: string;
  isDefaultPassword?: boolean;
  updatedAt: string;
}

export interface ProjectAccountInfo {
  projectId: string;
  role: AccountRole;
  username: string;
  isDefaultPassword?: boolean;
  updatedAt: string;
}

export interface ManagedBulletin extends Bulletin {
  projectId: string;
  createdAt?: string;
}

export interface ManagedPresentation extends Presentation {
  projectId: string;
  createdAt?: string;
}

export interface GalleryItem {
  id: string;
  projectId: string;
  src: string;
  caption?: string;
  uploadedBy?: AccountRole;
  createdAt: string;
}

export interface ProjectTeam {
  projectId: string;
  projectTitle: string;
  pi: { name: string; role: string; affiliation: string };
  coInvestigators: { name: string }[];
  members: { name: string; role: string; email: string }[];
}

export interface ContactQuery {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  projectId: string;
  createdAt: string;
  read: boolean;
}
