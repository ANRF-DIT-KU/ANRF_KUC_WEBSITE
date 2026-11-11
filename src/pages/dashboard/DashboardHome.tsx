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
import { Alert, DashboardTitle } from "../../components/dashboard/ui";

export const DashboardHome: React.FC = () => {
  const { user, isPI } = useAuth();
  const pid = user!.projectId;

  const { data: team } = useQuery({
    queryKey: ["team", pid],
    queryFn: () => fetchProjectTeamApi(pid),
  });

  const { data: bulletins = [] } = useQuery({
    queryKey: ["bulletins", pid],
    queryFn: () => fetchBulletinsApi(pid),
    enabled: isPI,
  });

  const { data: gallery = [] } = useQuery({
    queryKey: ["gallery", pid],
    queryFn: () => fetchGalleryApi(pid),
  });

  const { data: presentations = [] } = useQuery({
    queryKey: ["presentations", pid],
    queryFn: () => fetchPresentationsApi(pid),
    enabled: isPI,
  });

  const { data: queries = [] } = useQuery({
    queryKey: ["queries", pid],
    queryFn: () => fetchContactQueriesApi(pid),
    enabled: isPI,
  });

  const unread = queries.filter((q) => !q.read).length;

  const tiles = [
    {
      to: "/dashboard/bulletins",
      label: "Bulletins",
      value: bulletins.length,
      icon: FileText,
      pi: true,
    },
    {
      to: "/dashboard/gallery",
      label: "Gallery photos",
      value: gallery.length,
      icon: Image,
      pi: false,
    },
    {
      to: "/dashboard/presentations",
      label: "Presentations",
      value: presentations.length,
      icon: Presentation,
      pi: true,
    },
    {
      to: "/dashboard/team",
      label: "Team members",
      value: team ? team.members.length + team.coInvestigators.length + 1 : 0,
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
        title={isPI ? `Welcome, ${team?.pi.name ?? "Investigator"}` : "Welcome, team"}
        subtitle={team?.projectTitle}
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
