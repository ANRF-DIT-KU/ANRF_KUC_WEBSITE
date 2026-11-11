import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";

import { HomePage } from "./pages/HomePage";
import { TeamPage } from "./pages/TeamPage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { BulletinsPage } from "./pages/BulletinsPage";
import { NewsEventsPage } from "./pages/NewsEventsPage";
import { DepartmentsPage } from "./pages/DepartmentsPage";
import { PresentationsPage } from "./pages/PresentationsPage";
import { DepartmentDetailPage } from "./pages/DepartmentDetailPage";
import { BulletinsArchivePage } from "./pages/BulletinsArchivePage";
import { GalleryPage } from "./pages/GalleryPage";
import { LoginPage } from "./pages/LoginPage";

import { DashboardLayout } from "./pages/dashboard/DashboardLayout";
import { DashboardHome } from "./pages/dashboard/DashboardHome";
import { ManageBulletins } from "./pages/dashboard/ManageBulletins";
import { ManageGallery } from "./pages/dashboard/ManageGallery";
import { ManagePresentations } from "./pages/dashboard/ManagePresentations";
import { ManageTeam } from "./pages/dashboard/ManageTeam";
import { ContactQueries } from "./pages/dashboard/ContactQueries";
import { AccountSettings } from "./pages/dashboard/AccountSettings";
import { RequireAuth } from "./components/auth/RequireAuth";

import { AuthProvider } from "./context/AuthContext";
import { fetchBulletinsApi, fetchPresentationsApi } from "./api";

import { mockSocialPosts, mockAnnouncements } from "./data/mockData";
import { departmentsData } from "./data/departmentsData";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      refetchOnWindowFocus: false,
    },
  },
});

const AppRoutes: React.FC = () => {
  const announcements = mockAnnouncements.filled;
  const departments = departmentsData;
  const socialPosts = mockSocialPosts.filled;

  const { data: bulletins = [] } = useQuery({
    queryKey: ["bulletins"],
    queryFn: () => fetchBulletinsApi(),
  });

  const { data: presentations = [] } = useQuery({
    queryKey: ["presentations"],
    queryFn: () => fetchPresentationsApi(),
  });

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      <div className="flex-1">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                announcements={announcements}
                departments={departments}
                bulletins={bulletins.slice(0, 3)}
                presentations={presentations.slice(0, 3)}
                socialPosts={socialPosts}
              />
            }
          />

          <Route path="/about" element={<AboutPage />} />
          <Route
            path="/departments"
            element={<DepartmentsPage departments={departments} />}
          />
          <Route
            path="/departments/:id"
            element={<DepartmentDetailPage departments={departments} />}
          />
          <Route
            path="/bulletins"
            element={<BulletinsPage bulletins={bulletins} />}
          />
          <Route
            path="/bulletins/archive"
            element={<BulletinsArchivePage />}
          />
          <Route
            path="/presentations"
            element={
              <PresentationsPage
                presentations={presentations}
                departments={departments}
              />
            }
          />
          <Route path="/news-events" element={<NewsEventsPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Project portal (PI & team accounts) */}
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <DashboardLayout />
              </RequireAuth>
            }
          >
            <Route index element={<DashboardHome />} />
            <Route path="gallery" element={<ManageGallery />} />
            <Route path="account" element={<AccountSettings />} />
            <Route
              path="bulletins"
              element={
                <RequireAuth piOnly>
                  <ManageBulletins />
                </RequireAuth>
              }
            />
            <Route
              path="presentations"
              element={
                <RequireAuth piOnly>
                  <ManagePresentations />
                </RequireAuth>
              }
            />
            <Route
              path="team"
              element={
                <RequireAuth piOnly>
                  <ManageTeam />
                </RequireAuth>
              }
            />
            <Route
              path="queries"
              element={
                <RequireAuth piOnly>
                  <ContactQueries />
                </RequireAuth>
              }
            />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
