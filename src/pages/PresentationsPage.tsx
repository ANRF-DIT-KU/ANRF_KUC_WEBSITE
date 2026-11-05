import React from 'react';
import { Link } from 'react-router-dom';
import { Presentation, Department } from '../types';
import { PresentationsSection } from '../components/home/PresentationsSection';
import { ArrowLeft } from 'lucide-react';

interface PresentationsPageProps {
  presentations: Presentation[];
  departments: Department[];
}

export const PresentationsPage: React.FC<PresentationsPageProps> = ({
  presentations,
  departments,
}) => {
  return (
    <div className="py-12 max-w-7xl mx-auto">
      <div className="px-4 sm:px-8 mb-4">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0f766e] hover:text-[#0b2344] transition"
        >
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </Link>
      </div>

      <PresentationsSection
        presentations={presentations}
        departments={departments}
      />
    </div>
  );
};

