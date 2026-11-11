import React, { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, LogIn, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { DEFAULT_PASSWORD, projectsData } from "../data/projectsData";
import { Alert, Button, Field, inputCls } from "../components/dashboard/ui";
import anrfLogo from "../assets/logo/anrf_logo.png";
import uohLogo from "../assets/logo/uoh_logo.png";
import kucLogo from "../assets/logo/kuc_logo.png";

export const LoginPage: React.FC = () => {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from ?? "/dashboard";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  if (isAuthenticated) return <Navigate to={from} replace />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await login(username, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 bg-slate-50/60">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <div className="flex items-center justify-center gap-4">
            <img
              src={anrfLogo}
              alt="ANRF-PAIR Logo"
              className="h-10 w-auto object-contain"
            />
            <img
              src={uohLogo}
              alt="University of Hyderabad Logo"
              className="h-11 w-auto object-contain"
            />
            <img
              src={kucLogo}
              alt="Kannur University Logo"
              className="h-11 w-auto object-contain"
            />
          </div>
          <h1 className="mt-4 text-2xl sm:text-3xl font-bold text-[#0b2344] font-display">
            Project Portal Login
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            For Project Investigators and project team members of ANRF-PAIR, Kannur University.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white border border-slate-200 rounded-lg shadow-xs p-6 sm:p-8 space-y-5"
        >
          {error && <Alert kind="error">{error}</Alert>}

          <Field label="Username">
            <div className="relative">
              <User
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                required
                autoComplete="username"
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. chemistry-pi"
                className={`${inputCls} pl-9`}
              />
            </div>
          </Field>

          <Field label="Password">
            <div className="relative">
              <Lock
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`${inputCls} pl-9 pr-10`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </Field>

          <Button type="submit" disabled={busy} className="w-full">
            <LogIn size={16} />
            <span>{busy ? "Signing in…" : "Sign in"}</span>
          </Button>

          <p className="text-xs text-slate-500 text-center leading-relaxed">
            Each project has one <strong>PI account</strong> and one shared{" "}
            <strong>team account</strong>. Forgot your credentials? Members should contact their
            PI; PIs should contact the ANRF-PAIR office.
          </p>
        </form>

        <details className="bg-white border border-slate-200 rounded-lg p-4 text-xs text-slate-600 shadow-2xs">
          <summary className="font-semibold text-[#0b2344] cursor-pointer select-none">
            Default demo accounts (password: <code className="font-mono">{DEFAULT_PASSWORD}</code>)
          </summary>
          <div className="mt-3 grid grid-cols-2 gap-2 font-mono text-[11px]">
            {projectsData.map((p) => (
              <React.Fragment key={p.id}>
                <button
                  type="button"
                  onClick={() => {
                    setUsername(`${p.id}-pi`);
                    setPassword(DEFAULT_PASSWORD);
                  }}
                  className="text-left px-2 py-1 rounded bg-slate-50 hover:bg-teal-50 border border-slate-200 text-slate-700"
                >
                  {p.id}-pi (PI)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setUsername(`${p.id}-team`);
                    setPassword(DEFAULT_PASSWORD);
                  }}
                  className="text-left px-2 py-1 rounded bg-slate-50 hover:bg-teal-50 border border-slate-200 text-slate-700"
                >
                  {p.id}-team (Member)
                </button>
              </React.Fragment>
            ))}
          </div>
        </details>
      </div>
    </div>
  );
};
