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
}

export interface Presentation {
  id: string;
  date: string;
  venue: string;
  title: string;
  speaker?: string;
  department?: string;
  slidesUrl?: string;
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
