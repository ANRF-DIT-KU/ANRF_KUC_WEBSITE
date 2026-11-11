import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowDown, ArrowUp, Plus, Save, Trash2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { fetchProjectTeamApi, updateProjectTeamApi } from "../../api";
import { ProjectTeam } from "../../types";
import {
  Alert,
  Button,
  Card,
  DashboardTitle,
  EmptyState,
  Field,
  inputCls,
} from "../../components/dashboard/ui";

const move = <T,>(arr: T[], i: number, dir: -1 | 1): T[] => {
  const j = i + dir;
  if (j < 0 || j >= arr.length) return arr;
  const next = [...arr];
  [next[i], next[j]] = [next[j], next[i]];
  return next;
};

export const ManageTeam: React.FC = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const pid = user!.projectId;

  const { data: saved } = useQuery({
    queryKey: ["team", pid],
    queryFn: () => fetchProjectTeamApi(pid),
  });

  const [draft, setDraft] = useState<ProjectTeam | null>(saved ?? null);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (saved) setDraft(saved);
  }, [saved]);

  const saveMutation = useMutation({
    mutationFn: (payload: ProjectTeam) => updateProjectTeamApi(pid, payload),
    onSuccess: (updated) => {
      queryClient.invalidateQueries({ queryKey: ["team", pid] });
      queryClient.invalidateQueries({ queryKey: ["teams"] });
      setDraft(updated);
      setNotice("Team details saved. The public Team page is now updated.");
    },
    onError: (err: Error) => {
      setError(err.message || "Could not save team details.");
    },
  });

  if (!draft) return <EmptyState>Team details not found for this project.</EmptyState>;

  const dirty = JSON.stringify(draft) !== JSON.stringify(saved);

  const setMember = (i: number, patch: Partial<ProjectTeam["members"][number]>) =>
    setDraft({
      ...draft,
      members: draft.members.map((m, idx) => (idx === i ? { ...m, ...patch } : m)),
    });

  const setCoPi = (i: number, name: string) =>
    setDraft({
      ...draft,
      coInvestigators: draft.coInvestigators.map((c, idx) => (idx === i ? { name } : c)),
    });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setNotice("");
    saveMutation.mutate(draft);
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <DashboardTitle
        title="Team Members"
        subtitle="Add or update the people shown for your project on the public Team page."
      />

      {notice && <Alert kind="success">{notice}</Alert>}
      {error && <Alert kind="error">{error}</Alert>}

      <Card title="Project & Investigator">
        <div className="space-y-4">
          <Field label="Project title">
            <textarea
              required
              rows={2}
              value={draft.projectTitle}
              onChange={(e) => setDraft({ ...draft, projectTitle: e.target.value })}
              className={inputCls}
            />
          </Field>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Field label="Investigator name">
              <input
                required
                value={draft.pi.name}
                onChange={(e) => setDraft({ ...draft, pi: { ...draft.pi, name: e.target.value } })}
                className={inputCls}
              />
            </Field>
            <Field label="Role">
              <select
                value={draft.pi.role}
                onChange={(e) => setDraft({ ...draft, pi: { ...draft.pi, role: e.target.value } })}
                className={inputCls}
              >
                <option>Project Investigator</option>
                <option>Principal Investigator</option>
              </select>
            </Field>
            <Field label="Affiliation">
              <input
                value={draft.pi.affiliation}
                onChange={(e) =>
                  setDraft({ ...draft, pi: { ...draft.pi, affiliation: e.target.value } })
                }
                className={inputCls}
              />
            </Field>
          </div>
        </div>
      </Card>

      <Card
        title={`Co-Investigators (${draft.coInvestigators.length})`}
        actions={
          <Button
            type="button"
            size="sm"
            variant="secondary"
            onClick={() =>
              setDraft({ ...draft, coInvestigators: [...draft.coInvestigators, { name: "" }] })
            }
          >
            <Plus size={14} /> Add Co-PI
          </Button>
        }
      >
        {draft.coInvestigators.length === 0 ? (
          <EmptyState>No co-investigators listed.</EmptyState>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {draft.coInvestigators.map((c, i) => (
              <div key={i} className="flex gap-2">
                <input
                  value={c.name}
                  onChange={(e) => setCoPi(i, e.target.value)}
                  placeholder="Dr. Name"
                  className={inputCls}
                />
                <Button
                  type="button"
                  variant="danger"
                  size="sm"
                  aria-label="Remove co-investigator"
                  onClick={() =>
                    setDraft({
                      ...draft,
                      coInvestigators: draft.coInvestigators.filter((_, idx) => idx !== i),
                    })
                  }
                >
                  <Trash2 size={13} />
                </Button>
              </div>
            ))}
          </div>
        )}
      </Card>

      <Card
        title={`Project Members (${draft.members.length})`}
        actions={
          <Button
            type="button"
            size="sm"
            variant="secondary"
            onClick={() =>
              setDraft({
                ...draft,
                members: [...draft.members, { name: "", role: "Project Associate", email: "" }],
              })
            }
          >
            <Plus size={14} /> Add member
          </Button>
        }
      >
        {draft.members.length === 0 ? (
          <EmptyState>No project members listed.</EmptyState>
        ) : (
          <div className="space-y-3">
            {draft.members.map((m, i) => (
              <div
                key={i}
                className="grid grid-cols-1 md:grid-cols-12 gap-2 items-center border border-slate-200 rounded-md p-3 bg-slate-50/60"
              >
                <input
                  required
                  value={m.name}
                  onChange={(e) => setMember(i, { name: e.target.value })}
                  placeholder="Full name"
                  className={`${inputCls} md:col-span-4`}
                />
                <input
                  value={m.role}
                  onChange={(e) => setMember(i, { role: e.target.value })}
                  placeholder="Role"
                  list="member-roles"
                  className={`${inputCls} md:col-span-3`}
                />
                <input
                  type="email"
                  value={m.email}
                  onChange={(e) => setMember(i, { email: e.target.value })}
                  placeholder="email@example.com"
                  className={`${inputCls} md:col-span-3`}
                />
                <div className="flex gap-1 md:col-span-2 md:justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    aria-label="Move up"
                    disabled={i === 0}
                    onClick={() => setDraft({ ...draft, members: move(draft.members, i, -1) })}
                  >
                    <ArrowUp size={13} />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    aria-label="Move down"
                    disabled={i === draft.members.length - 1}
                    onClick={() => setDraft({ ...draft, members: move(draft.members, i, 1) })}
                  >
                    <ArrowDown size={13} />
                  </Button>
                  <Button
                    type="button"
                    variant="danger"
                    size="sm"
                    aria-label="Remove member"
                    onClick={() =>
                      setDraft({
                        ...draft,
                        members: draft.members.filter((_, idx) => idx !== i),
                      })
                    }
                  >
                    <Trash2 size={13} />
                  </Button>
                </div>
              </div>
            ))}
            <datalist id="member-roles">
              <option value="Project Associate" />
              <option value="Research Associate" />
              <option value="Technical Assistant" />
              <option value="Research Scholar" />
              <option value="Field Assistant" />
            </datalist>
          </div>
        )}
      </Card>

      <div className="sticky bottom-4 flex items-center justify-end gap-3 bg-white/90 backdrop-blur border border-slate-200 rounded-lg p-3 shadow-sm">
        {dirty && <span className="text-xs text-amber-700 mr-auto">You have unsaved changes.</span>}
        <Button
          type="button"
          variant="secondary"
          disabled={!dirty || saveMutation.isPending}
          onClick={() => saved && setDraft(saved)}
        >
          Discard
        </Button>
        <Button type="submit" disabled={!dirty || saveMutation.isPending}>
          <Save size={15} />
          {saveMutation.isPending ? "Saving…" : "Save team details"}
        </Button>
      </div>
    </form>
  );
};
