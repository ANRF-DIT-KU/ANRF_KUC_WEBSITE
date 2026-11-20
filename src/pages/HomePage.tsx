import React from "react";
import { HeroSection } from "../components/home/HeroSection";
import { LatestUpdatesTicker } from "../components/home/LatestUpdatesTicker";
import { DepartmentsSection } from "../components/home/DepartmentsSection";
import { BulletinsSection } from "../components/home/BulletinsSection";
import { PresentationsSection } from "../components/home/PresentationsSection";
import { SocialUpdatesSection } from "../components/home/SocialUpdatesSection";
import { Department, Bulletin, Presentation, Announcement } from "../types";

interface HomePageProps {
  announcements: Announcement[];
  departments: Department[];
  bulletins: Bulletin[];
  presentations: Presentation[];
}

export const HomePage: React.FC<HomePageProps> = ({
  announcements,
  departments,
  bulletins,
  presentations,
}) => {
  const scrollToBulletins = () => {
    const el = document.getElementById("bulletins");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen flex flex-col">
      <HeroSection onScrollToBulletins={scrollToBulletins} />
      <LatestUpdatesTicker announcements={announcements} />
      <DepartmentsSection departments={departments} />
      <BulletinsSection bulletins={bulletins} />
      <PresentationsSection presentations={presentations} />
      <SocialUpdatesSection />
    </main>
  );
};
