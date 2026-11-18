import { apiClient, resolveBackendUrl } from "./client";
import {
  AccountRole,
  AuthUser,
  ContactQuery,
  GalleryItem,
  ManagedBulletin,
  ManagedPresentation,
  ProjectAccountInfo,
  ProjectTeam,
} from "../types";

export { apiClient, resolveBackendUrl };

const mapBulletin = (b: ManagedBulletin): ManagedBulletin => ({
  ...b,
  downloadUrl: resolveBackendUrl(b.downloadUrl) || "#",
});

const mapGalleryItem = (g: GalleryItem): GalleryItem => ({
  ...g,
  src: resolveBackendUrl(g.src),
});

const mapPresentation = (p: ManagedPresentation): ManagedPresentation => ({
  ...p,
  slidesUrl: p.slidesUrl ? resolveBackendUrl(p.slidesUrl) : undefined,
});

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
  const { data } = await apiClient.post<LoginResponse>("/auth/login", payload);
  return data;
}

export async function fetchMeApi(): Promise<AuthUser> {
  const { data } = await apiClient.get<AuthUser>("/auth/me");
  return data;
}

export async function fetchProjectAccountsApi(
  projectId: string,
): Promise<ProjectAccountInfo[]> {
  const { data } = await apiClient.get<ProjectAccountInfo[]>(
    `/projects/${projectId}/accounts`,
  );
  return data;
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
  const { data } = await apiClient.put<ProjectAccountInfo>(
    `/projects/${payload.projectId}/accounts/${payload.targetRole}`,
    {
      currentPassword: payload.currentPassword,
      newUsername: payload.newUsername,
      newPassword: payload.newPassword,
    },
  );
  return data;
}

/* ------------------------------------------------------------------ */
/* Bulletins API                                                      */
/* ------------------------------------------------------------------ */

export async function fetchBulletinsApi(projectId?: string): Promise<ManagedBulletin[]> {
  const { data } = await apiClient.get<ManagedBulletin[]>("/bulletins", {
    params: projectId ? { projectId } : undefined,
  });
  return data.map(mapBulletin);
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
  const formData = new FormData();
  formData.append("projectId", payload.projectId);
  formData.append("volume", payload.volume);
  formData.append("issue", payload.issue);
  formData.append("title", payload.title);
  formData.append("summary", payload.summary);
  if (payload.publishDate) formData.append("publishDate", payload.publishDate);
  formData.append("themeColor", payload.themeColor);
  if (payload.file) formData.append("file", payload.file);

  const { data } = await apiClient.post<ManagedBulletin>("/bulletins", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return mapBulletin(data);
}

export async function updateBulletinApi(
  id: string,
  payload: UpsertBulletinPayload,
): Promise<ManagedBulletin> {
  const formData = new FormData();
  formData.append("projectId", payload.projectId);
  formData.append("volume", payload.volume);
  formData.append("issue", payload.issue);
  formData.append("title", payload.title);
  formData.append("summary", payload.summary);
  if (payload.publishDate) formData.append("publishDate", payload.publishDate);
  formData.append("themeColor", payload.themeColor);
  if (payload.file) formData.append("file", payload.file);

  const { data } = await apiClient.put<ManagedBulletin>(`/bulletins/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return mapBulletin(data);
}

export async function deleteBulletinApi(id: string): Promise<void> {
  await apiClient.delete(`/bulletins/${id}`);
}

/* ------------------------------------------------------------------ */
/* Gallery API                                                        */
/* ------------------------------------------------------------------ */

export async function fetchGalleryApi(projectId?: string): Promise<GalleryItem[]> {
  const { data } = await apiClient.get<GalleryItem[]>("/gallery", {
    params: projectId ? { projectId } : undefined,
  });
  return data.map(mapGalleryItem);
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
  const formData = new FormData();
  formData.append("projectId", payload.projectId);
  for (const file of payload.files) {
    formData.append("files", file);
  }
  if (payload.caption) {
    formData.append("caption", payload.caption);
  }

  const { data } = await apiClient.post<GalleryItem[]>("/gallery", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data.map(mapGalleryItem);
}

export async function updateGalleryCaptionApi(
  id: string,
  caption: string,
): Promise<GalleryItem> {
  const { data } = await apiClient.patch<GalleryItem>(`/gallery/${id}`, { caption });
  return mapGalleryItem(data);
}

export async function deleteGalleryImageApi(id: string): Promise<void> {
  await apiClient.delete(`/gallery/${id}`);
}

/* ------------------------------------------------------------------ */
/* Presentations API                                                  */
/* ------------------------------------------------------------------ */

export async function fetchPresentationsApi(
  projectId?: string,
): Promise<ManagedPresentation[]> {
  const { data } = await apiClient.get<ManagedPresentation[]>("/presentations", {
    params: projectId ? { projectId } : undefined,
  });
  return data.map(mapPresentation);
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
  const formData = new FormData();
  formData.append("projectId", payload.projectId);
  formData.append("title", payload.title);
  formData.append("date", payload.date);
  formData.append("venue", payload.venue);
  if (payload.speaker) formData.append("speaker", payload.speaker);
  if (payload.department) formData.append("department", payload.department);
  if (payload.file) formData.append("file", payload.file);

  const { data } = await apiClient.post<ManagedPresentation>("/presentations", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return mapPresentation(data);
}

export async function deletePresentationApi(id: string): Promise<void> {
  await apiClient.delete(`/presentations/${id}`);
}

/* ------------------------------------------------------------------ */
/* Team Members API                                                   */
/* ------------------------------------------------------------------ */

export async function fetchTeamsApi(): Promise<ProjectTeam[]> {
  const { data } = await apiClient.get<ProjectTeam[]>("/teams");
  return data;
}

export async function fetchProjectTeamApi(projectId: string): Promise<ProjectTeam> {
  const { data } = await apiClient.get<ProjectTeam>(`/teams/${projectId}`);
  return data;
}

export async function updateProjectTeamApi(
  projectId: string,
  payload: ProjectTeam,
): Promise<ProjectTeam> {
  const { data } = await apiClient.put<ProjectTeam>(`/teams/${projectId}`, payload);
  return data;
}

/* ------------------------------------------------------------------ */
/* Contact Queries API                                                */
/* ------------------------------------------------------------------ */

export async function fetchContactQueriesApi(
  projectId?: string,
): Promise<ContactQuery[]> {
  const { data } = await apiClient.get<ContactQuery[]>("/queries", {
    params: projectId ? { projectId } : undefined,
  });
  return data;
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
  const { data } = await apiClient.post<ContactQuery>("/queries", payload);
  return data;
}

export async function updateContactQueryReadApi(
  id: string,
  read: boolean,
): Promise<ContactQuery> {
  const { data } = await apiClient.patch<ContactQuery>(`/queries/${id}`, { read });
  return data;
}

export async function deleteContactQueryApi(id: string): Promise<void> {
  await apiClient.delete(`/queries/${id}`);
}
