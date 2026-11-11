import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Check, Pencil, Trash2, Upload, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import {
  deleteGalleryImageApi,
  fetchGalleryApi,
  updateGalleryCaptionApi,
  uploadGalleryImagesApi,
} from "../../api";
import { GalleryItem } from "../../types";
import {
  Alert,
  Button,
  Card,
  DashboardTitle,
  EmptyState,
  Field,
  FilePicker,
  formatDateTime,
  inputCls,
} from "../../components/dashboard/ui";

const MAX_FILES = 20;

export const ManageGallery: React.FC = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const pid = user!.projectId;

  const { data: mine = [] } = useQuery({
    queryKey: ["gallery", pid],
    queryFn: () => fetchGalleryApi(pid),
  });

  const [files, setFiles] = useState<File[]>([]);
  const [caption, setCaption] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [editCaption, setEditCaption] = useState("");

  const uploadMutation = useMutation({
    mutationFn: (images: File[]) =>
      uploadGalleryImagesApi({
        projectId: pid,
        uploadedBy: user!.role,
        files: images.slice(0, MAX_FILES),
        caption,
      }),
    onSuccess: (items) => {
      queryClient.invalidateQueries({ queryKey: ["gallery"] });
      setNotice(`${items.length} photo${items.length > 1 ? "s" : ""} added to the gallery.`);
      setFiles([]);
      setCaption("");
    },
    onError: (err: Error) => {
      setError(err.message || "Upload failed.");
    },
  });

  const captionMutation = useMutation({
    mutationFn: ({ id, nextCaption }: { id: string; nextCaption: string }) =>
      updateGalleryCaptionApi(id, nextCaption),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gallery"] });
      setEditId(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteGalleryImageApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gallery"] });
      setNotice("Photo removed.");
    },
  });

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setNotice("");
    const images = files.filter((f) => f.type.startsWith("image/"));
    if (images.length === 0) {
      setError("Please choose at least one image file.");
      return;
    }
    uploadMutation.mutate(images);
  };

  const saveCaption = (id: string) => {
    captionMutation.mutate({ id, nextCaption: editCaption });
  };

  const handleDelete = (item: GalleryItem) => {
    if (!confirm("Remove this photo from the gallery?")) return;
    deleteMutation.mutate(item.id);
  };

  return (
    <div className="space-y-6">
      <DashboardTitle
        title="Manage Gallery"
        subtitle="Photos you upload appear on the public Gallery page."
      />

      {notice && <Alert kind="success">{notice}</Alert>}

      <Card title="Upload photos">
        <form onSubmit={handleUpload} className="space-y-4">
          {error && <Alert kind="error">{error}</Alert>}
          <Field
            label="Images"
            hint={`JPG / PNG / WEBP, up to ${MAX_FILES} at a time. Large images are resized automatically.`}
          >
            <FilePicker
              accept="image/*"
              multiple
              label={
                files.length === 0
                  ? "No files chosen"
                  : files.length === 1
                    ? files[0].name
                    : `${files.length} files selected`
              }
              onFiles={setFiles}
            />
          </Field>
          <Field label="Caption" hint="Optional. Applied to all photos in this upload.">
            <input
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="e.g. Field visit, Kannur coast – Nov 2026"
              className={inputCls}
            />
          </Field>
          <Button type="submit" disabled={uploadMutation.isPending || files.length === 0}>
            <Upload size={15} />
            {uploadMutation.isPending ? "Uploading…" : "Upload"}
          </Button>
        </form>
      </Card>

      <Card title={`Your project's photos (${mine.length})`}>
        {mine.length === 0 ? (
          <EmptyState>No photos uploaded by your project yet.</EmptyState>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {mine.map((g) => (
              <figure
                key={g.id}
                className="border border-slate-200 rounded-lg overflow-hidden bg-white"
              >
                <img
                  src={g.src}
                  alt={g.caption ?? "Gallery photo"}
                  className="w-full h-44 object-cover"
                  loading="lazy"
                />
                <figcaption className="p-3 space-y-2">
                  {editId === g.id ? (
                    <div className="flex gap-1.5">
                      <input
                        autoFocus
                        value={editCaption}
                        onChange={(e) => setEditCaption(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && saveCaption(g.id)}
                        className={`${inputCls} py-1.5 text-xs`}
                      />
                      <Button size="sm" onClick={() => saveCaption(g.id)} aria-label="Save">
                        <Check size={13} />
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => setEditId(null)}
                        aria-label="Cancel"
                      >
                        <X size={13} />
                      </Button>
                    </div>
                  ) : (
                    <div className="text-sm text-slate-800 min-h-5">
                      {g.caption ?? <span className="text-slate-400 italic">No caption</span>}
                    </div>
                  )}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] text-slate-400">
                      {formatDateTime(g.createdAt)}
                      {g.uploadedBy && ` · ${g.uploadedBy === "pi" ? "PI" : "Team"}`}
                    </span>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setEditId(g.id);
                          setEditCaption(g.caption ?? "");
                        }}
                        aria-label="Edit caption"
                      >
                        <Pencil size={13} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(g)}
                        aria-label="Delete photo"
                        className="text-red-600! hover:bg-red-50!"
                      >
                        <Trash2 size={13} />
                      </Button>
                    </div>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};
