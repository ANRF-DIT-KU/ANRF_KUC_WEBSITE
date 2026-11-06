import React from "react";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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

import {
  mockBulletins,
  mockSocialPosts,
  mockPresentations,
  mockAnnouncements,
} from "./data/mockData";
import { departmentsData } from "./data/departmentsData";

export const App: React.FC = () => {
  // Use actual filled data directly
  const announcements = mockAnnouncements.filled;
  const departments = departmentsData;
  const bulletins = mockBulletins.filled;
  const presentations = mockPresentations.filled;
  const socialPosts = mockSocialPosts.filled;

  return (
    <BrowserRouter>
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
                  bulletins={bulletins}
                  presentations={presentations}
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
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
