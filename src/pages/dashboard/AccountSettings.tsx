import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { KeyRound, ShieldCheck } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { fetchProjectAccountsApi } from "../../api";
import { AccountRole, ProjectAccountInfo } from "../../types";
import {
  Alert,
  Button,
  Card,
  DashboardTitle,
  Field,
  formatDateTime,
  inputCls,
} from "../../components/dashboard/ui";

const CredentialsForm: React.FC<{
  target: AccountRole;
  accountInfo?: ProjectAccountInfo;
}> = ({ target, accountInfo }) => {
  const { user, updateCredentials } = useAuth();
  const isSelf = user!.role === target;

  const [username, setUsername] = useState(accountInfo?.username ?? "");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (accountInfo?.username) {
      setUsername(accountInfo.username);
    }
  }, [accountInfo?.username]);

  if (!accountInfo) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setNotice("");
    if (newPassword !== confirmPassword) {
      setError("New password and confirmation do not match.");
      return;
    }
    if (username.trim() === accountInfo.username && !newPassword) {
      setError("Nothing to update – change the username and/or enter a new password.");
      return;
    }
    setBusy(true);
    try {
      await updateCredentials({
        target,
        currentPassword,
        newUsername: username,
        newPassword: newPassword || undefined,
      });
      setNotice("Login details updated.");
      setNewPassword("");
      setConfirmPassword("");
      setCurrentPassword("");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Card title={target === "pi" ? "PI account" : "Team (member) account"}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
          {accountInfo.isDefaultPassword ? (
            <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-semibold">
              Default password in use
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-teal-50 text-[#0f766e] font-semibold">
              <ShieldCheck size={12} /> Custom password set
            </span>
          )}
          <span>Last updated {formatDateTime(accountInfo.updatedAt)}</span>
        </div>

        {error && <Alert kind="error">{error}</Alert>}
        {notice && <Alert kind="success">{notice}</Alert>}

        <Field label="Username" hint="3–32 characters: letters, numbers, dot, underscore or hyphen.">
          <input
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete={isSelf ? "username" : "off"}
            className={inputCls}
          />
        </Field>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="New password" hint="Leave blank to keep the current password. Min 8 characters.">
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              autoComplete="new-password"
              minLength={8}
              className={inputCls}
            />
          </Field>
          <Field label="Confirm new password">
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
              className={inputCls}
            />
          </Field>
        </div>
        <Field
          label={isSelf ? "Current password" : "Your (PI) password"}
          hint={isSelf ? undefined : "Confirm your identity to change the team account."}
        >
          <input
            type="password"
            required
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            autoComplete="current-password"
            className={inputCls}
          />
        </Field>
        <Button type="submit" disabled={busy}>
          <KeyRound size={15} />
          {busy ? "Updating…" : "Update login details"}
        </Button>
      </form>
    </Card>
  );
};

export const AccountSettings: React.FC = () => {
  const { user, isPI } = useAuth();
  const pid = user!.projectId;

  const { data: accounts = [] } = useQuery({
    queryKey: ["project-accounts", pid],
    queryFn: () => fetchProjectAccountsApi(pid),
  });

  const piAccount = accounts.find((a) => a.role === "pi");
  const memberAccount = accounts.find((a) => a.role === "member");

  return (
    <div className="space-y-6">
      <DashboardTitle
        title="Login Details"
        subtitle={
          isPI
            ? "Manage the username and password for your PI account and your project's shared team account."
            : "Manage the username and password for your project's shared team account."
        }
      />
      {isPI && <CredentialsForm target="pi" accountInfo={piAccount} />}
      <CredentialsForm target="member" accountInfo={memberAccount} />
      {isPI && (
        <p className="text-xs text-slate-500">
          After changing the team account details, share the new credentials with your project
          members.
        </p>
      )}
    </div>
  );
};
