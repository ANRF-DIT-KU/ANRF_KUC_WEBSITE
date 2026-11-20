import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, FileText, Image, Inbox, KeyRound, Presentation, Users } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import {
  fetchBulletinsApi,
  fetchContactQueriesApi,
  fetchGalleryApi,
  fetchPresentationsApi,
  fetchProjectTeamApi,
} from "../../api";
import { GENERAL_PROJECT } from "../../types";
import { Alert, DashboardTitle } from "../../components/dashboard/ui";

export const DashboardHome: React.FC = () => {
  const { user, activeProjectId, isAdmin, isPI } = useAuth();
  const pid = activeProjectId;

  const { data: team } = useQuery({
    queryKey: ["team", pid],
    queryFn: () => fetchProjectTeamApi(pid),
    enabled: pid !== GENERAL_PROJECT,
  });

  const { data: bulletins = [] } = useQuery({
    queryKey: ["bulletins", isAdmin ? "all" : pid],
    queryFn: () => fetchBulletinsApi(isAdmin ? undefined : pid),
    enabled: isPI,
  });

  const { data: gallery = [] } = useQuery({
    queryKey: ["gallery", isAdmin ? "all" : pid],
    queryFn: () => fetchGalleryApi(isAdmin ? undefined : pid),
  });

  const { data: presentations = [] } = useQuery({
    queryKey: ["presentations", isAdmin ? "all" : pid],
    queryFn: () => fetchPresentationsApi(isAdmin ? undefined : pid),
    enabled: isPI,
  });

  const { data: queries = [] } = useQuery({
    queryKey: ["queries", isAdmin ? "all" : pid],
    queryFn: () => fetchContactQueriesApi(isAdmin ? undefined : pid),
    enabled: isPI,
  });

  const unread = queries.filter((q) => !q.read).length;

  const tiles = [
    {
      to: "/dashboard/bulletins",
      label: isAdmin ? "All Bulletins" : "Bulletins",
      value: bulletins.length,
      icon: FileText,
      pi: true,
    },
    {
      to: "/dashboard/gallery",
      label: isAdmin ? "All Gallery photos" : "Gallery photos",
      value: gallery.length,
      icon: Image,
      pi: false,
    },
    {
      to: "/dashboard/presentations",
      label: isAdmin ? "All Presentations" : "Presentations",
      value: presentations.length,
      icon: Presentation,
      pi: true,
    },
    {
      to: "/dashboard/team",
      label: "Team members (selected project)",
      value: team
        ? team.members.length +
          team.coInvestigators.length +
          (team.uohPis?.length ?? 0) +
          1
        : 0,
      icon: Users,
      pi: true,
    },
    {
      to: "/dashboard/queries",
      label: "Unread queries",
      value: unread,
      icon: Inbox,
      pi: true,
    },
    {
      to: "/dashboard/account",
      label: "Login details",
      value: null,
      icon: KeyRound,
      pi: false,
    },
  ].filter((t) => isPI || !t.pi);

  return (
    <div className="space-y-6">
      <DashboardTitle
        title={
          isAdmin
            ? "Welcome, Administrator"
            : isPI
              ? `Welcome, ${team?.pi.name ?? "Investigator"}`
              : "Welcome, team"
        }
        subtitle={
          isAdmin
            ? "Full administrative access across all ANRF-PAIR projects. Use the sidebar project selector to switch projects."
            : team?.projectTitle
        }
      />

      {user?.isDefaultPassword && (
        <Alert kind="info">
          You are still using the default password.{" "}
          <Link to="/dashboard/account" className="font-semibold underline">
            Change your login details
          </Link>{" "}
          to secure this account.
        </Alert>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {tiles.map(({ to, label, value, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className="group bg-white border border-slate-200 rounded-lg p-5 shadow-xs hover:shadow-md hover:border-slate-300 transition flex items-center gap-4"
          >
            <div className="w-11 h-11 rounded-md bg-teal-50 text-[#0f766e] flex items-center justify-center shrink-0">
              <Icon size={20} />
            </div>
            <div className="flex-1">
              {value !== null && (
                <div className="text-2xl font-bold text-[#0b2344] font-display">{value}</div>
              )}
              <div className="text-sm text-slate-600">{label}</div>
            </div>
            <ArrowRight
              size={16}
              className="text-slate-300 group-hover:text-[#0f766e] transition"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};
