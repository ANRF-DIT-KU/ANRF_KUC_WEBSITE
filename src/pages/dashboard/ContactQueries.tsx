import React, { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Mail, MailOpen, Reply, Trash2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import {
  deleteContactQueryApi,
  fetchContactQueriesApi,
  updateContactQueryReadApi,
} from "../../api";
import { ContactQuery, GENERAL_PROJECT } from "../../types";
import { Button, Card, DashboardTitle, EmptyState, formatDateTime } from "../../components/dashboard/ui";

type Filter = "all" | "unread" | "project" | "general";

export const ContactQueries: React.FC = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const pid = user!.projectId;
  const [filter, setFilter] = useState<Filter>("all");
  const [openId, setOpenId] = useState<string | null>(null);

  const { data: queries = [] } = useQuery({
    queryKey: ["queries", pid],
    queryFn: () => fetchContactQueriesApi(pid),
  });

  const readMutation = useMutation({
    mutationFn: ({ id, read }: { id: string; read: boolean }) =>
      updateContactQueryReadApi(id, read),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["queries"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteContactQueryApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["queries"] });
    },
  });

  const visible = useMemo(
    () =>
      queries.filter((q) =>
        filter === "unread"
          ? !q.read
          : filter === "project"
            ? q.projectId === pid
            : filter === "general"
              ? q.projectId === GENERAL_PROJECT
              : true,
      ),
    [queries, pid, filter],
  );

  const toggleOpen = (q: ContactQuery) => {
    setOpenId(openId === q.id ? null : q.id);
    if (!q.read) {
      readMutation.mutate({ id: q.id, read: true });
    }
  };

  const handleDelete = (q: ContactQuery) => {
    if (!confirm(`Delete the query from ${q.name}?`)) return;
    deleteMutation.mutate(q.id);
  };

  const filters: { id: Filter; label: string }[] = [
    { id: "all", label: "All" },
    { id: "unread", label: "Unread" },
    { id: "project", label: "Addressed to my project" },
    { id: "general", label: "General enquiries" },
  ];

  return (
    <div className="space-y-6">
      <DashboardTitle
        title="Contact Queries"
        subtitle="Messages submitted through the website's Contact form – those addressed to your project and general enquiries."
      />

      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition ${
              filter === f.id
                ? "bg-[#0b2344] text-white border-[#0b2344]"
                : "bg-white text-slate-600 border-slate-300 hover:border-slate-400"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <Card>
        {visible.length === 0 ? (
          <EmptyState>No queries to show.</EmptyState>
        ) : (
          <ul className="divide-y divide-slate-200 -my-2">
            {visible.map((q) => {
              const open = openId === q.id;
              const canDelete = q.projectId === pid;
              return (
                <li key={q.id} className="py-3">
                  <button
                    onClick={() => toggleOpen(q)}
                    className="w-full text-left flex items-start gap-3"
                  >
                    <span className={`mt-0.5 ${q.read ? "text-slate-300" : "text-[#0f766e]"}`}>
                      {q.read ? <MailOpen size={16} /> : <Mail size={16} />}
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="flex flex-wrap items-baseline gap-x-2">
                        <span
                          className={`text-sm ${q.read ? "text-slate-700" : "font-bold text-slate-900"}`}
                        >
                          {q.subject}
                        </span>
                        {q.projectId === GENERAL_PROJECT && (
                          <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-slate-100 text-slate-500">
                            General
                          </span>
                        )}
                      </span>
                      <span className="block text-xs text-slate-500 truncate">
                        {q.name} · {q.email}
                      </span>
                    </span>
                    <span className="text-[11px] text-slate-400 whitespace-nowrap">
                      {formatDateTime(q.createdAt)}
                    </span>
                  </button>

                  {open && (
                    <div className="mt-3 ml-7 space-y-3">
                      <p className="text-sm text-slate-700 whitespace-pre-wrap bg-slate-50 border border-slate-200 rounded-md p-4">
                        {q.message}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <a
                          href={`mailto:${q.email}?subject=${encodeURIComponent(`Re: ${q.subject}`)}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-[#0b2344] text-white hover:bg-[#071930]"
                        >
                          <Reply size={13} /> Reply by email
                        </a>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => readMutation.mutate({ id: q.id, read: false })}
                        >
                          <Mail size={13} /> Mark unread
                        </Button>
                        {canDelete && (
                          <Button variant="danger" size="sm" onClick={() => handleDelete(q)}>
                            <Trash2 size={13} /> Delete
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </Card>
    </div>
  );
};
