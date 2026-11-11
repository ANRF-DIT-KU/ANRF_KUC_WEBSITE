import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  FileText,
  Image,
  Inbox,
  KeyRound,
  LayoutDashboard,
  LogOut,
  Presentation,
  Users,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { fetchContactQueriesApi } from "../../api";

export const DashboardLayout: React.FC = () => {
  const { user, project, isPI, logout } = useAuth();
  const navigate = useNavigate();

  const { data: queries = [] } = useQuery({
    queryKey: ["queries", user?.projectId],
    queryFn: () => fetchContactQueriesApi(user!.projectId),
    enabled: !!user && isPI,
  });

  const unread = queries.filter((q) => !q.read).length;

  const links = [
    { to: "/dashboard", label: "Overview", icon: LayoutDashboard, end: true, show: true },
    { to: "/dashboard/bulletins", label: "Bulletins", icon: FileText, show: isPI },
    { to: "/dashboard/gallery", label: "Gallery", icon: Image, show: true },
    { to: "/dashboard/presentations", label: "Presentations", icon: Presentation, show: isPI },
    { to: "/dashboard/team", label: "Team Members", icon: Users, show: isPI },
    {
      to: "/dashboard/queries",
      label: "Contact Queries",
      icon: Inbox,
      show: isPI,
      badge: unread,
    },
    { to: "/dashboard/account", label: "Login Details", icon: KeyRound, show: true },
  ].filter((l) => l.show);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="bg-slate-50/60 min-h-[80vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sidebar */}
        <aside className="lg:col-span-3">
          <div className="bg-white border border-slate-200 rounded-lg shadow-xs overflow-hidden lg:sticky lg:top-24">
            <div className="bg-[#0b2344] text-white px-5 py-4">
              <div className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
                {isPI ? "Project Investigator" : "Project Team"}
              </div>
              <div className="text-sm font-semibold mt-1 leading-snug line-clamp-3">
                {project?.title}
              </div>
              <div className="text-xs text-slate-300 mt-2">
                Signed in as <span className="font-mono">{user?.username}</span>
              </div>
            </div>
            <nav className="p-2 flex lg:flex-col gap-1 overflow-x-auto">
              {links.map(({ to, label, icon: Icon, end, badge }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end}
                  className={({ isActive }) =>
                    `flex items-center gap-2.5 px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap transition ${
                      isActive
                        ? "bg-teal-50 text-[#0f766e]"
                        : "text-slate-600 hover:bg-slate-100 hover:text-[#0b2344]"
                    }`
                  }
                >
                  <Icon size={16} />
                  <span className="flex-1">{label}</span>
                  {!!badge && (
                    <span className="text-[10px] font-bold bg-[#0f766e] text-white rounded-full px-1.5 py-0.5">
                      {badge}
                    </span>
                  )}
                </NavLink>
              ))}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2.5 px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap text-red-700 hover:bg-red-50 transition lg:mt-2 lg:border-t lg:border-slate-100 lg:rounded-t-none"
              >
                <LogOut size={16} />
                <span>Log out</span>
              </button>
            </nav>
          </div>
        </aside>

        {/* Content */}
        <main className="lg:col-span-9 min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
