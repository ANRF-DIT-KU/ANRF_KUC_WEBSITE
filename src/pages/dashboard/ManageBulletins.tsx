import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Download, Pencil, Plus, Trash2, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import {
  createBulletinApi,
  deleteBulletinApi,
  fetchBulletinsApi,
  updateBulletinApi,
} from "../../api";
import { ManagedBulletin } from "../../types";
import {
  Alert,
  Button,
  Card,
  DashboardTitle,
  EmptyState,
  Field,
  FilePicker,
  formatBytes,
  inputCls,
} from "../../components/dashboard/ui";

const MAX_PDF = 15 * 1024 * 1024;

type Form = Pick<
  ManagedBulletin,
  "volume" | "issue" | "title" | "summary" | "publishDate" | "themeColor"
>;

const emptyForm: Form = {
  volume: "",
  issue: "",
  title: "",
  summary: "",
  publishDate: "",
  themeColor: "teal",
};

export const ManageBulletins: React.FC = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const pid = user!.projectId;

  const { data: mine = [] } = useQuery({
    queryKey: ["bulletins", pid],
    queryFn: () => fetchBulletinsApi(pid),
  });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Form>(emptyForm);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const editing = editingId ? mine.find((b) => b.id === editingId) : undefined;

  const saveMutation = useMutation({
    mutationFn: async () => {
      if (editing) {
        return updateBulletinApi(editing.id, { projectId: pid, ...form, file });
      }
      return createBulletinApi({ projectId: pid, ...form, file });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bulletins"] });
      setNotice(editing ? "Bulletin updated." : "Bulletin published.");
      close();
    },
    onError: (err: Error) => {
      setError(err.message || "Could not save bulletin.");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteBulletinApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bulletins"] });
      setNotice("Bulletin deleted.");
    },
  });

  const openNew = () => {
    setEditingId(null);
    setForm(emptyForm);
    setFile(null);
    setError("");
    setShowForm(true);
  };

  const openEdit = (b: ManagedBulletin) => {
    setEditingId(b.id);
    setForm({
      volume: b.volume,
      issue: b.issue,
      title: b.title,
      summary: b.summary,
      publishDate: b.publishDate ?? "",
      themeColor: b.themeColor,
    });
    setFile(null);
    setError("");
    setShowForm(true);
  };

  const close = () => {
    setShowForm(false);
    setEditingId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (file && file.size > MAX_PDF) {
      setError(`PDF is too large (max ${formatBytes(MAX_PDF)}).`);
      return;
    }
    saveMutation.mutate();
  };

  const handleDelete = (b: ManagedBulletin) => {
    if (!confirm(`Delete bulletin "${b.title}"? This cannot be undone.`)) return;
    deleteMutation.mutate(b.id);
  };

  return (
    <div className="space-y-6">
      <DashboardTitle
        title="Manage Bulletins"
        subtitle="Publish research bulletins for your project. They appear on the public Bulletins page."
      />

      {notice && <Alert kind="success">{notice}</Alert>}

      {showForm && (
        <Card
          title={editing ? "Edit bulletin" : "New bulletin"}
          actions={
            <Button variant="ghost" size="sm" onClick={close} aria-label="Close form">
              <X size={14} />
            </Button>
          }
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <Alert kind="error">{error}</Alert>}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Field label="Volume">
                <input
                  required
                  value={form.volume}
                  onChange={(e) => setForm({ ...form, volume: e.target.value })}
                  placeholder="02"
                  className={inputCls}
                />
              </Field>
              <Field label="Issue">
                <input
                  required
                  value={form.issue}
                  onChange={(e) => setForm({ ...form, issue: e.target.value })}
                  placeholder="05"
                  className={inputCls}
                />
              </Field>
              <Field label="Publish date">
                <input
                  value={form.publishDate}
                  onChange={(e) => setForm({ ...form, publishDate: e.target.value })}
                  placeholder="December 2026"
                  className={inputCls}
                />
              </Field>
              <Field label="Header colour">
                <select
                  value={form.themeColor}
                  onChange={(e) =>
                    setForm({ ...form, themeColor: e.target.value as Form["themeColor"] })
                  }
                  className={inputCls}
                >
                  <option value="teal">Teal</option>
                  <option value="navy">Navy</option>
                </select>
              </Field>
            </div>
            <Field label="Title">
              <input
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className={inputCls}
              />
            </Field>
            <Field label="Summary">
              <textarea
                required
                rows={3}
                value={form.summary}
                onChange={(e) => setForm({ ...form, summary: e.target.value })}
                className={inputCls}
              />
            </Field>
            <Field
              label="Bulletin PDF"
              hint={`Optional. Max ${formatBytes(MAX_PDF)}.${
                editing?.fileName && !file ? ` Current file: ${editing.fileName}` : ""
              }`}
            >
              <FilePicker
                accept="application/pdf,.pdf"
                label={file ? `${file.name} (${formatBytes(file.size)})` : "No file chosen"}
                onFiles={(f) => setFile(f[0] ?? null)}
              />
            </Field>
            <div className="flex gap-3 pt-2">
              <Button type="submit" disabled={saveMutation.isPending}>
                {saveMutation.isPending
                  ? "Saving…"
                  : editing
                    ? "Save changes"
                    : "Publish bulletin"}
              </Button>
              <Button type="button" variant="secondary" onClick={close}>
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      <Card
        title={`Your bulletins (${mine.length})`}
        actions={
          !showForm && (
            <Button size="sm" onClick={openNew}>
              <Plus size={14} />
              New bulletin
            </Button>
          )
        }
      >
        {mine.length === 0 ? (
          <EmptyState>No bulletins published by your project yet.</EmptyState>
        ) : (
          <ul className="divide-y divide-slate-200">
            {mine.map((b) => (
              <li key={b.id} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row gap-3">
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#0f766e]">
                    Vol. {b.volume} · Issue {b.issue}
                    {b.publishDate && <span className="text-slate-400"> · {b.publishDate}</span>}
                  </div>
                  <div className="font-semibold text-slate-900 mt-0.5">{b.title}</div>
                  <p className="text-sm text-slate-600 line-clamp-2">{b.summary}</p>
                  {b.fileName && (
                    <a
                      href={b.downloadUrl}
                      download={b.fileName}
                      className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-[#0b2344] mt-1"
                    >
                      <Download size={12} /> {b.fileName}
                    </a>
                  )}
                </div>
                <div className="flex gap-2 shrink-0 items-start">
                  <Button variant="secondary" size="sm" onClick={() => openEdit(b)}>
                    <Pencil size={13} /> Edit
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(b)}>
                    <Trash2 size={13} /> Delete
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
};
