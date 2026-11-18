import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { TOKEN_STORAGE_KEY, USER_STORAGE_KEY } from "../api/client";
import {
  fetchMeApi,
  loginApi,
  updateCredentialsApi,
  UpdateCredentialsPayload,
} from "../api";
import { AccountRole, AuthUser, Project } from "../types";
import { projectsData } from "../data/projectsData";

interface CredentialUpdateInput {
  projectId?: string;
  target: AccountRole;
  currentPassword: string;
  newUsername?: string;
  newPassword?: string;
}

interface AuthContextValue {
  token: string | null;
  user: AuthUser | null;
  project: Project | null;
  activeProjectId: string;
  setActiveProjectId: (projectId: string) => void;
  isAdmin: boolean;
  isPI: boolean;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  updateCredentials: (input: CredentialUpdateInput) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const readInitialToken = (): string | null => {
  try {
    return localStorage.getItem(TOKEN_STORAGE_KEY);
  } catch {
    return null;
  }
};

const readInitialUser = (): AuthUser | null => {
  try {
    const raw = localStorage.getItem(USER_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const queryClient = useQueryClient();
  const [token, setToken] = useState<string | null>(readInitialToken);
  const [user, setUser] = useState<AuthUser | null>(readInitialUser);
  const [selectedProjectId, setSelectedProjectId] = useState<string>(
    projectsData[0]?.id ?? "biotech",
  );

  const persistAuth = useCallback((nextToken: string | null, nextUser: AuthUser | null) => {
    setToken(nextToken);
    setUser(nextUser);
    if (nextToken && nextUser) {
      localStorage.setItem(TOKEN_STORAGE_KEY, nextToken);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(nextUser));
    } else {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      localStorage.removeItem(USER_STORAGE_KEY);
    }
  }, []);

  // Verify stored token with backend on startup
  useEffect(() => {
    if (!token) return;
    fetchMeApi()
      .then((freshUser) => {
        persistAuth(token, freshUser);
      })
      .catch(() => {
        persistAuth(null, null);
      });
  }, [token, persistAuth]);

  const login = useCallback(
    async (username: string, password: string) => {
      const res = await loginApi({ username, password });
      persistAuth(res.token, res.user);
      queryClient.invalidateQueries();
    },
    [persistAuth, queryClient],
  );

  const logout = useCallback(() => {
    persistAuth(null, null);
    queryClient.clear();
  }, [persistAuth, queryClient]);

  const isAdmin = !!user && user.role === "admin";
  // Admin has all PI permissions as well
  const isPI = !!user && (user.role === "pi" || user.role === "admin");

  const activeProjectId = isAdmin
    ? selectedProjectId
    : (user?.projectId ?? projectsData[0]?.id ?? "biotech");

  const updateCredentials = useCallback(
    async ({
      projectId,
      target,
      currentPassword,
      newUsername,
      newPassword,
    }: CredentialUpdateInput) => {
      if (!user || !token) throw new Error("You are not logged in.");

      const targetProjectId = projectId || (target === "admin" ? "admin" : activeProjectId);

      const payload: UpdateCredentialsPayload = {
        projectId: targetProjectId,
        actorRole: user.role,
        targetRole: target,
        currentPassword,
        newUsername,
        newPassword,
      };

      const updatedAccount = await updateCredentialsApi(payload);

      if (target === user.role && targetProjectId === user.projectId) {
        const updatedUser: AuthUser = {
          ...user,
          username: updatedAccount.username,
          isDefaultPassword: updatedAccount.isDefaultPassword,
          updatedAt: updatedAccount.updatedAt,
        };
        persistAuth(token, updatedUser);
      }

      await queryClient.invalidateQueries({
        queryKey: ["project-accounts", targetProjectId],
      });
    },
    [user, token, activeProjectId, persistAuth, queryClient],
  );

  const project =
    projectsData.find((p) => p.id === activeProjectId) ?? null;

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        project,
        activeProjectId,
        setActiveProjectId: setSelectedProjectId,
        isAdmin,
        isPI,
        isAuthenticated: !!token && !!user,
        login,
        logout,
        updateCredentials,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
