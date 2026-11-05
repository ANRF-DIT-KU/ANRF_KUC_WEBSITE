import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { LatestUpdatesTicker } from '../components/home/LatestUpdatesTicker';
import { DepartmentsSection } from '../components/home/DepartmentsSection';
import { BulletinsSection } from '../components/home/BulletinsSection';
import { PresentationsSection } from '../components/home/PresentationsSection';
import { SocialUpdatesSection } from '../components/home/SocialUpdatesSection';
import { Department, Bulletin, Presentation, SocialPost, Announcement } from '../types';

interface HomePageProps {
  announcements: Announcement[];
  departments: Department[];
  bulletins: Bulletin[];
  presentations: Presentation[];
  socialPosts: SocialPost[];
}

export const HomePage: React.FC<HomePageProps> = ({
  announcements,
  departments,
  bulletins,
  presentations,
  socialPosts,
}) => {
  const scrollToPresentations = () => {
    const el = document.getElementById('presentations');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToBulletins = () => {
    const el = document.getElementById('bulletins');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen flex flex-col">
      {/* 1. Hero Section */}
      <HeroSection
        onScrollToPresentations={scrollToPresentations}
        onScrollToBulletins={scrollToBulletins}
      />

      {/* 2. Latest Updates Announcement Ticker */}
      <LatestUpdatesTicker announcements={announcements} />

      {/* 3. Our Six Departments Section */}
      <DepartmentsSection departments={departments} />

      {/* 4. Research Bulletins Section */}
      <BulletinsSection bulletins={bulletins} />

      {/* 5. Presentations & Submission Form Section */}
      <PresentationsSection
        presentations={presentations}
        departments={departments}
      />

      {/* 6. Follow Project Updates Social Section */}
      <SocialUpdatesSection socialPosts={socialPosts} />
    </main>
  );
};

