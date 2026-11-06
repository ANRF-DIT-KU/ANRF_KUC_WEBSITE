import React from 'react';
import { Presentation, Department } from '../types';
import { PresentationsSection } from '../components/home/PresentationsSection';
import { PageContainer } from '../components/common/PageContainer';
import { BackLink } from '../components/common/BackLink';

interface PresentationsPageProps {
  presentations: Presentation[];
  departments: Department[];
}

export const PresentationsPage: React.FC<PresentationsPageProps> = ({
  presentations,
  departments,
}) => {
  return (
    <PageContainer>
      <BackLink to="/" label="Back to Home" />

      <PresentationsSection
        presentations={presentations}
        departments={departments}
      />
    </PageContainer>
  );
};

