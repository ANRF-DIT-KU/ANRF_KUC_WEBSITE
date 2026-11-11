import React from "react";

export const formatBytes = (n: number) =>
  n < 1024 * 1024 ? `${(n / 1024).toFixed(0)} KB` : `${(n / 1024 / 1024).toFixed(1)} MB`;

export const formatDateTime = (iso: string) =>
  new Date(iso).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

export const inputCls =
  "w-full px-3.5 py-2 text-sm border border-slate-300 rounded-md bg-white text-slate-800 focus:ring-2 focus:ring-[#0b2344] focus:border-transparent focus:outline-hidden";

export const Field: React.FC<{
  label: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}> = ({ label, hint, children, className = "" }) => (
  <label className={`block ${className}`}>
    <span className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
      {label}
    </span>
    {children}
    {hint && <span className="block text-xs text-slate-500 mt-1">{hint}</span>}
  </label>
);

export const Card: React.FC<{
  title?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}> = ({ title, actions, children, className = "" }) => (
  <section
    className={`bg-white border border-slate-200 rounded-lg shadow-xs ${className}`}
  >
    {(title || actions) && (
      <div className="flex items-center justify-between gap-3 px-5 sm:px-6 py-4 border-b border-slate-200">
        {title && <h2 className="text-base font-bold text-[#0b2344] font-display">{title}</h2>}
        {actions}
      </div>
    )}
    <div className="p-5 sm:p-6">{children}</div>
  </section>
);

type BtnVariant = "primary" | "secondary" | "danger" | "ghost";

const variantCls: Record<BtnVariant, string> = {
  primary: "bg-[#0b2344] hover:bg-[#071930] text-white",
  secondary: "bg-white border border-slate-300 text-slate-700 hover:bg-slate-50",
  danger: "bg-white border border-red-200 text-red-700 hover:bg-red-50",
  ghost: "text-slate-600 hover:text-[#0b2344] hover:bg-slate-100",
};

export const Button: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: BtnVariant; size?: "sm" | "md" }
> = ({ variant = "primary", size = "md", className = "", ...rest }) => (
  <button
    {...rest}
    className={`inline-flex items-center justify-center gap-2 font-medium rounded-md transition shadow-xs disabled:opacity-60 disabled:cursor-not-allowed ${
      size === "sm" ? "px-3 py-1.5 text-xs" : "px-5 py-2.5 text-sm"
    } ${variantCls[variant]} ${className}`}
  />
);

export const Alert: React.FC<{ kind: "error" | "success" | "info"; children: React.ReactNode }> = ({
  kind,
  children,
}) => {
  const cls = {
    error: "bg-red-50 border-red-200 text-red-800",
    success: "bg-teal-50 border-teal-200 text-[#0f766e]",
    info: "bg-amber-50 border-amber-200 text-amber-900",
  }[kind];
  return <div className={`border rounded-md px-4 py-3 text-sm ${cls}`}>{children}</div>;
};

export const EmptyState: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="text-center text-sm text-slate-500 py-10 border border-dashed border-slate-300 rounded-lg">
    {children}
  </div>
);

export const DashboardTitle: React.FC<{ title: string; subtitle?: string }> = ({
  title,
  subtitle,
}) => (
  <div className="mb-6">
    <h1 className="text-2xl sm:text-3xl font-bold text-[#0b2344] font-display">{title}</h1>
    {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
  </div>
);

export const FilePicker: React.FC<{
  accept: string;
  multiple?: boolean;
  label: string;
  onFiles: (files: File[]) => void;
}> = ({ accept, multiple, label, onFiles }) => (
  <div className="flex items-center">
    <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-2 border border-slate-300 rounded-l-md text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 transition">
      <span>Choose File{multiple ? "s" : ""}</span>
      <input
        type="file"
        accept={accept}
        multiple={multiple}
        className="sr-only"
        onChange={(e) => {
          onFiles(Array.from(e.target.files ?? []));
          e.target.value = "";
        }}
      />
    </label>
    <span className="flex-1 px-3 py-2 border-y border-r border-slate-300 rounded-r-md text-xs text-slate-500 bg-white truncate">
      {label}
    </span>
  </div>
);

