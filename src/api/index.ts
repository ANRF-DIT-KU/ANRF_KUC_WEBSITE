import { apiClient } from "./client";
import {
  AccountRole,
  AuthUser,
  ContactQuery,
  GalleryItem,
  GENERAL_PROJECT,
  ManagedBulletin,
  ManagedPresentation,
  ProjectAccountInfo,
  ProjectTeam,
} from "../types";
import { mockBulletins, mockPresentations } from "../data/mockData";
import { DEFAULT_PASSWORD, projectsData, seedTeams } from "../data/projectsData";

import img1 from "../assets/images/18957.jpg.jpeg";
import img2 from "../assets/images/18963.jpg.jpeg";
import img3 from "../assets/images/18967.jpg.jpeg";
import img4 from "../assets/images/18979.jpg.jpeg";
import img5 from "../assets/images/IMG_6850.JPG";
import img6 from "../assets/images/IMG_6853.JPG";
import img7 from "../assets/images/IMG_6857.JPG";
import img8 from "../assets/images/IMG_6978.JPG";

// Expose apiClient so it is ready to be swapped in for each function below
export { apiClient };

/* ------------------------------------------------------------------ */
/* Hardcoded mock state (replace with apiClient calls when backend is ready) */
/* ------------------------------------------------------------------ */

const SEED_DATE = "2026-01-01T00:00:00.000Z";
const uid = (prefix = "id") => `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;

interface MockAccountRecord extends ProjectAccountInfo {
  id: string;
  password: string;
}

let mockAccountsStore: MockAccountRecord[] = projectsData.flatMap((p) => [
  {
    id: `acc-${p.id}-pi`,
    projectId: p.id,
    role: "pi" as AccountRole,
    username: `${p.id}-pi`,
    password: DEFAULT_PASSWORD,
    isDefaultPassword: true,
    updatedAt: SEED_DATE,
  },
  {
    id: `acc-${p.id}-member`,
    projectId: p.id,
    role: "member" as AccountRole,
    username: `${p.id}-team`,
    password: DEFAULT_PASSWORD,
    isDefaultPassword: true,
    updatedAt: SEED_DATE,
  },
]);

let mockBulletinsStore: ManagedBulletin[] = mockBulletins.filled.map((b) => ({
  ...b,
  projectId: GENERAL_PROJECT,
}));

let mockPresentationsStore: ManagedPresentation[] = mockPresentations.filled.map((p) => ({
  ...p,
  projectId: GENERAL_PROJECT,
}));

let mockGalleryStore: GalleryItem[] = [img1, img2, img3, img4, img5, img6, img7, img8].map(
  (src, i) => ({
    id: `seed-${i + 1}`,
    projectId: GENERAL_PROJECT,
    src,
    caption: `ANRF-PAIR Gallery Image ${i + 1}`,
    createdAt: SEED_DATE,
  }),
);

let mockTeamsStore: ProjectTeam[] = structuredClone(seedTeams);

let mockQueriesStore: ContactQuery[] = [
  {
    id: "query-seed-1",
    name: "Dr. Meera Nair",
    email: "meera.nair@cusat.ac.in",
    subject: "Collaborative sampling on Antimicrobial Resistance",
    message:
      "We would like to discuss potential sample sharing and joint workshops under the ANRF-PAIR coastal surveillance initiative.",
    projectId: GENERAL_PROJECT,
    createdAt: "2026-11-02T10:15:00.000Z",
    read: false,
  },
];

/* ------------------------------------------------------------------ */
/* Auth & Credentials API                                             */
/* ------------------------------------------------------------------ */

export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: AuthUser;
}

export async function loginApi(payload: LoginPayload): Promise<LoginResponse> {
  // Replace with:
  // const { data } = await apiClient.post<LoginResponse>("/auth/login", payload);
  // return data;

  const acc = mockAccountsStore.find(
    (a) => a.username.toLowerCase() === payload.username.trim().toLowerCase(),
  );
  if (!acc || acc.password !== payload.password) {
    throw new Error("Invalid username or password.");
  }

  const user: AuthUser = {
    id: acc.id,
    projectId: acc.projectId,
    role: acc.role,
    username: acc.username,
    isDefaultPassword: acc.isDefaultPassword,
    updatedAt: acc.updatedAt,
  };

  // Simulated signed JWT payload
  const fakeJwt = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(
    JSON.stringify({ sub: user.id, projectId: user.projectId, role: user.role }),
  )}.mock-signature`;

  return { token: fakeJwt, user };
}

export async function fetchMeApi(): Promise<AuthUser> {
  // Replace with:
  // const { data } = await apiClient.get<AuthUser>("/auth/me");
  // return data;

  const raw = localStorage.getItem("anrf_auth_user");
  if (!raw) throw new Error("Not authenticated");
  const parsed = JSON.parse(raw) as AuthUser;
  const fresh = mockAccountsStore.find(
    (a) => a.projectId === parsed.projectId && a.role === parsed.role,
  );
  if (!fresh) throw new Error("Account not found");
  return {
    id: fresh.id,
    projectId: fresh.projectId,
    role: fresh.role,
    username: fresh.username,
    isDefaultPassword: fresh.isDefaultPassword,
    updatedAt: fresh.updatedAt,
  };
}

export async function fetchProjectAccountsApi(
  projectId: string,
): Promise<ProjectAccountInfo[]> {
  // Replace with:
  // const { data } = await apiClient.get<ProjectAccountInfo[]>(`/projects/${projectId}/accounts`);
  // return data;

  return mockAccountsStore
    .filter((a) => a.projectId === projectId)
    .map(({ password: _p, id: _id, ...info }) => info);
}

export interface UpdateCredentialsPayload {
  projectId: string;
  actorRole: AccountRole;
  targetRole: AccountRole;
  currentPassword: string;
  newUsername?: string;
  newPassword?: string;
}

export async function updateCredentialsApi(
  payload: UpdateCredentialsPayload,
): Promise<ProjectAccountInfo> {
  // Replace with:
  // const { data } = await apiClient.put<ProjectAccountInfo>(
  //   `/projects/${payload.projectId}/accounts/${payload.targetRole}`,
  //   payload
  // );
  // return data;

  const { projectId, actorRole, targetRole, currentPassword, newUsername, newPassword } =
    payload;

  if (actorRole !== "pi" && targetRole !== actorRole) {
    throw new Error("You can only change the credentials of your own account.");
  }

  const actorAcc = mockAccountsStore.find(
    (a) => a.projectId === projectId && a.role === actorRole,
  );
  if (!actorAcc || actorAcc.password !== currentPassword) {
    throw new Error("Your current password is incorrect.");
  }

  const targetAcc = mockAccountsStore.find(
    (a) => a.projectId === projectId && a.role === targetRole,
  );
  if (!targetAcc) {
    throw new Error("Target account not found.");
  }

  const nextUsername = newUsername?.trim() || targetAcc.username;
  if (!/^[a-zA-Z0-9._-]{3,32}$/.test(nextUsername)) {
    throw new Error("Username must be 3–32 characters (letters, numbers, . _ -).");
  }

  const clash = mockAccountsStore.some(
    (a) => a.id !== targetAcc.id && a.username.toLowerCase() === nextUsername.toLowerCase(),
  );
  if (clash) {
    throw new Error("That username is already taken.");
  }

  if (newPassword && newPassword.length < 8) {
    throw new Error("Password must be at least 8 characters.");
  }

  const updated: MockAccountRecord = {
    ...targetAcc,
    username: nextUsername,
    password: newPassword ? newPassword : targetAcc.password,
    isDefaultPassword: newPassword ? false : targetAcc.isDefaultPassword,
    updatedAt: new Date().toISOString(),
  };

  mockAccountsStore = mockAccountsStore.map((a) => (a.id === targetAcc.id ? updated : a));

  const { password: _p, id: _id, ...info } = updated;
  return info;
}

/* ------------------------------------------------------------------ */
/* Bulletins API                                                      */
/* ------------------------------------------------------------------ */

export async function fetchBulletinsApi(projectId?: string): Promise<ManagedBulletin[]> {
  // Replace with:
  // const { data } = await apiClient.get<ManagedBulletin[]>("/bulletins", { params: { projectId } });
  // return data;

  if (projectId) {
    return mockBulletinsStore.filter((b) => b.projectId === projectId);
  }
  return [...mockBulletinsStore];
}

export interface UpsertBulletinPayload {
  projectId: string;
  volume: string;
  issue: string;
  title: string;
  summary: string;
  publishDate?: string;
  themeColor: "teal" | "navy";
  file?: File | null;
}

export async function createBulletinApi(
  payload: UpsertBulletinPayload,
): Promise<ManagedBulletin> {
  // Replace with FormData + apiClient.post<ManagedBulletin>("/bulletins", formData)
  const fileData = payload.file
    ? {
        downloadUrl: URL.createObjectURL(payload.file),
        fileName: payload.file.name,
      }
    : { downloadUrl: "#" };

  const created: ManagedBulletin = {
    id: uid("bulletin"),
    projectId: payload.projectId,
    volume: payload.volume,
    issue: payload.issue,
    title: payload.title,
    summary: payload.summary,
    publishDate: payload.publishDate,
    themeColor: payload.themeColor,
    createdAt: new Date().toISOString(),
    ...fileData,
  };

  mockBulletinsStore = [created, ...mockBulletinsStore];
  return created;
}

export async function updateBulletinApi(
  id: string,
  payload: UpsertBulletinPayload,
): Promise<ManagedBulletin> {
  // Replace with FormData + apiClient.put<ManagedBulletin>(`/bulletins/${id}`, formData)
  const existing = mockBulletinsStore.find((b) => b.id === id);
  if (!existing) throw new Error("Bulletin not found.");

  const fileData = payload.file
    ? {
        downloadUrl: URL.createObjectURL(payload.file),
        fileName: payload.file.name,
      }
    : {
        downloadUrl: existing.downloadUrl,
        fileName: existing.fileName,
      };

  const updated: ManagedBulletin = {
    ...existing,
    volume: payload.volume,
    issue: payload.issue,
    title: payload.title,
    summary: payload.summary,
    publishDate: payload.publishDate,
    themeColor: payload.themeColor,
    ...fileData,
  };

  mockBulletinsStore = mockBulletinsStore.map((b) => (b.id === id ? updated : b));
  return updated;
}

export async function deleteBulletinApi(id: string): Promise<void> {
  // Replace with: await apiClient.delete(`/bulletins/${id}`);
  mockBulletinsStore = mockBulletinsStore.filter((b) => b.id !== id);
}

/* ------------------------------------------------------------------ */
/* Gallery API                                                        */
/* ------------------------------------------------------------------ */

export async function fetchGalleryApi(projectId?: string): Promise<GalleryItem[]> {
  // Replace with:
  // const { data } = await apiClient.get<GalleryItem[]>("/gallery", { params: { projectId } });
  // return data;

  if (projectId) {
    return mockGalleryStore.filter((g) => g.projectId === projectId);
  }
  return [...mockGalleryStore];
}

export interface UploadGalleryPayload {
  projectId: string;
  uploadedBy: AccountRole;
  files: File[];
  caption?: string;
}

export async function uploadGalleryImagesApi(
  payload: UploadGalleryPayload,
): Promise<GalleryItem[]> {
  // Replace with FormData + apiClient.post<GalleryItem[]>("/gallery", formData)
  const now = new Date().toISOString();
  const created: GalleryItem[] = [];
  for (const file of payload.files) {
    created.push({
      id: uid("img"),
      projectId: payload.projectId,
      src: URL.createObjectURL(file),
      caption: payload.caption?.trim() || undefined,
      uploadedBy: payload.uploadedBy,
      createdAt: now,
    });
  }
  mockGalleryStore = [...created, ...mockGalleryStore];
  return created;
}

export async function updateGalleryCaptionApi(
  id: string,
  caption: string,
): Promise<GalleryItem> {
  // Replace with:
  // const { data } = await apiClient.patch<GalleryItem>(`/gallery/${id}`, { caption });
  // return data;

  const existing = mockGalleryStore.find((g) => g.id === id);
  if (!existing) throw new Error("Gallery photo not found.");
  const updated: GalleryItem = { ...existing, caption: caption.trim() || undefined };
  mockGalleryStore = mockGalleryStore.map((g) => (g.id === id ? updated : g));
  return updated;
}

export async function deleteGalleryImageApi(id: string): Promise<void> {
  // Replace with: await apiClient.delete(`/gallery/${id}`);
  mockGalleryStore = mockGalleryStore.filter((g) => g.id !== id);
}

/* ------------------------------------------------------------------ */
/* Presentations API                                                  */
/* ------------------------------------------------------------------ */

export async function fetchPresentationsApi(
  projectId?: string,
): Promise<ManagedPresentation[]> {
  // Replace with:
  // const { data } = await apiClient.get<ManagedPresentation[]>("/presentations", { params: { projectId } });
  // return data;

  if (projectId) {
    return mockPresentationsStore.filter((p) => p.projectId === projectId);
  }
  return [...mockPresentationsStore];
}

export interface CreatePresentationPayload {
  projectId: string;
  title: string;
  date: string;
  venue: string;
  speaker?: string;
  department?: string;
  file?: File | null;
}

export async function createPresentationApi(
  payload: CreatePresentationPayload,
): Promise<ManagedPresentation> {
  // Replace with FormData + apiClient.post<ManagedPresentation>("/presentations", formData)
  const fileData = payload.file
    ? {
        slidesUrl: URL.createObjectURL(payload.file),
        fileName: payload.file.name,
      }
    : {};

  const created: ManagedPresentation = {
    id: uid("pres"),
    projectId: payload.projectId,
    title: payload.title.trim(),
    date: payload.date,
    venue: payload.venue.trim().toUpperCase(),
    speaker: payload.speaker?.trim() || undefined,
    department: payload.department,
    createdAt: new Date().toISOString(),
    ...fileData,
  };

  mockPresentationsStore = [created, ...mockPresentationsStore];
  return created;
}

export async function deletePresentationApi(id: string): Promise<void> {
  // Replace with: await apiClient.delete(`/presentations/${id}`);
  mockPresentationsStore = mockPresentationsStore.filter((p) => p.id !== id);
}

/* ------------------------------------------------------------------ */
/* Team Members API                                                   */
/* ------------------------------------------------------------------ */

export async function fetchTeamsApi(): Promise<ProjectTeam[]> {
  // Replace with:
  // const { data } = await apiClient.get<ProjectTeam[]>("/teams");
  // return data;

  return structuredClone(mockTeamsStore);
}

export async function fetchProjectTeamApi(projectId: string): Promise<ProjectTeam> {
  // Replace with:
  // const { data } = await apiClient.get<ProjectTeam>(`/teams/${projectId}`);
  // return data;

  const found = mockTeamsStore.find((t) => t.projectId === projectId);
  if (!found) throw new Error("Project team not found.");
  return structuredClone(found);
}

export async function updateProjectTeamApi(
  projectId: string,
  payload: ProjectTeam,
): Promise<ProjectTeam> {
  // Replace with:
  // const { data } = await apiClient.put<ProjectTeam>(`/teams/${projectId}`, payload);
  // return data;

  const cleaned: ProjectTeam = {
    ...payload,
    projectId,
    projectTitle: payload.projectTitle.trim(),
    pi: {
      name: payload.pi.name.trim(),
      role: payload.pi.role.trim(),
      affiliation: payload.pi.affiliation.trim(),
    },
    coInvestigators: payload.coInvestigators
      .map((c) => ({ name: c.name.trim() }))
      .filter((c) => c.name),
    members: payload.members
      .map((m) => ({
        name: m.name.trim(),
        role: m.role.trim(),
        email: m.email.trim(),
      }))
      .filter((m) => m.name),
  };

  mockTeamsStore = mockTeamsStore.map((t) => (t.projectId === projectId ? cleaned : t));
  return structuredClone(cleaned);
}

/* ------------------------------------------------------------------ */
/* Contact Queries API                                                */
/* ------------------------------------------------------------------ */

export async function fetchContactQueriesApi(
  projectId: string,
): Promise<ContactQuery[]> {
  // Replace with:
  // const { data } = await apiClient.get<ContactQuery[]>("/queries", { params: { projectId } });
  // return data;

  return mockQueriesStore
    .filter((q) => q.projectId === projectId || q.projectId === GENERAL_PROJECT)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export interface CreateContactQueryPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
  projectId: string;
}

export async function createContactQueryApi(
  payload: CreateContactQueryPayload,
): Promise<ContactQuery> {
  // Replace with:
  // const { data } = await apiClient.post<ContactQuery>("/queries", payload);
  // return data;

  const created: ContactQuery = {
    id: uid("query"),
    name: payload.name.trim(),
    email: payload.email.trim(),
    subject: payload.subject.trim(),
    message: payload.message.trim(),
    projectId: payload.projectId,
    createdAt: new Date().toISOString(),
    read: false,
  };
  mockQueriesStore = [created, ...mockQueriesStore];
  return created;
}

export async function updateContactQueryReadApi(
  id: string,
  read: boolean,
): Promise<ContactQuery> {
  // Replace with:
  // const { data } = await apiClient.patch<ContactQuery>(`/queries/${id}`, { read });
  // return data;

  const existing = mockQueriesStore.find((q) => q.id === id);
  if (!existing) throw new Error("Query not found.");
  const updated: ContactQuery = { ...existing, read };
  mockQueriesStore = mockQueriesStore.map((q) => (q.id === id ? updated : q));
  return updated;
}

export async function deleteContactQueryApi(id: string): Promise<void> {
  // Replace with: await apiClient.delete(`/queries/${id}`);
  mockQueriesStore = mockQueriesStore.filter((q) => q.id !== id);
}

