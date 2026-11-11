import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Download, Trash2, Upload } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import {
  createPresentationApi,
  deletePresentationApi,
  fetchPresentationsApi,
  fetchProjectTeamApi,
} from "../../api";
import { ManagedPresentation } from "../../types";
import { departmentsData } from "../../data/departmentsData";
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

const MAX_FILE = 25 * 1024 * 1024;

/** "2026-11-18" -> "18 NOV 2026" (matches existing presentation date format). */
const formatPresentationDate = (iso: string) =>
  new Date(iso)
    .toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
    .toUpperCase();

export const ManagePresentations: React.FC = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const pid = user!.projectId;
  const department = departmentsData.find((d) => d.id === pid);

  const { data: mine = [] } = useQuery({
    queryKey: ["presentations", pid],
    queryFn: () => fetchPresentationsApi(pid),
  });

  const { data: team } = useQuery({
    queryKey: ["team", pid],
    queryFn: () => fetchProjectTeamApi(pid),
  });

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [venue, setVenue] = useState("");
  const [speaker, setSpeaker] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    if (!speaker && team?.pi.name) {
      setSpeaker(team.pi.name);
    }
  }, [team, speaker]);

  const uploadMutation = useMutation({
    mutationFn: () =>
      createPresentationApi({
        projectId: pid,
        title,
        date: formatPresentationDate(date),
        venue,
        speaker,
        department: department?.name,
        file,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["presentations"] });
      setNotice("Presentation uploaded and published.");
      setTitle("");
      setDate("");
      setVenue("");
      setFile(null);
    },
    onError: (err: Error) => {
      setError(err.message || "Upload failed.");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deletePresentationApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["presentations"] });
      setNotice("Presentation deleted.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setNotice("");
    if (!file) {
      setError("Please choose a PDF or PowerPoint file.");
      return;
    }
    if (file.size > MAX_FILE) {
      setError(`File is too large (max ${formatBytes(MAX_FILE)}).`);
      return;
    }
    uploadMutation.mutate();
  };

  const handleDelete = (p: ManagedPresentation) => {
    if (!confirm(`Delete presentation "${p.title}"?`)) return;
    deleteMutation.mutate(p.id);
  };

  return (
    <div className="space-y-6">
      <DashboardTitle
        title="Upload Presentations"
        subtitle="Share seminar, review and conference slides from your project."
      />

      {notice && <Alert kind="success">{notice}</Alert>}

      <Card title="New presentation">
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <Alert kind="error">{error}</Alert>}
          <Field label="Presentation title">
            <input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Molecular Mechanisms in Oncology"
              className={inputCls}
            />
          </Field>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Field label="Date">
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={inputCls}
              />
            </Field>
            <Field label="Venue" className="sm:col-span-2">
              <input
                required
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                placeholder="Seminar Complex · Auditorium A / Online"
                className={inputCls}
              />
            </Field>
          </div>
          <Field label="Presented by">
            <input
              value={speaker}
              onChange={(e) => setSpeaker(e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label="File (PDF or PPTX)" hint={`Max ${formatBytes(MAX_FILE)}.`}>
            <FilePicker
              accept=".pdf,.ppt,.pptx"
              label={file ? `${file.name} (${formatBytes(file.size)})` : "No file chosen"}
              onFiles={(f) => setFile(f[0] ?? null)}
            />
          </Field>
          <Button type="submit" disabled={uploadMutation.isPending}>
            <Upload size={15} />
            {uploadMutation.isPending ? "Uploading…" : "Upload presentation"}
          </Button>
        </form>
      </Card>

      <Card title={`Your presentations (${mine.length})`}>
        {mine.length === 0 ? (
          <EmptyState>No presentations uploaded yet.</EmptyState>
        ) : (
          <ul className="divide-y divide-slate-200">
            {mine.map((p) => (
              <li key={p.id} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row gap-3">
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    {p.date} · {p.venue}
                  </div>
                  <div className="font-semibold text-slate-900 mt-0.5">{p.title}</div>
                  {p.speaker && <div className="text-xs text-slate-500">By {p.speaker}</div>}
                  {p.slidesUrl && p.fileName && (
                    <a
                      href={p.slidesUrl}
                      download={p.fileName}
                      className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-[#0b2344] mt-1"
                    >
                      <Download size={12} /> {p.fileName}
                    </a>
                  )}
                </div>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(p)}
                  className="self-start"
                >
                  <Trash2 size={13} /> Delete
                </Button>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
};
