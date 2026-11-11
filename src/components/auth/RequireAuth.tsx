import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

/** Protects dashboard routes. Set `piOnly` for PI-exclusive pages. */
export const RequireAuth: React.FC<{ children: React.ReactNode; piOnly?: boolean }> = ({
  children,
  piOnly,
}) => {
  const { isAuthenticated, isPI } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  if (piOnly && !isPI) {
    return <Navigate to="/dashboard" replace />;
  }
  return <>{children}</>;
};
