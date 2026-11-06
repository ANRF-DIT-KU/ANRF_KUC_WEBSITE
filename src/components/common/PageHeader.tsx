import React from 'react';

interface PageHeaderProps {
  title: string;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, className = '' }) => {
  return (
    <div className={`mb-10 ${className}`}>
      <h1 className="text-3xl sm:text-4xl font-bold text-[#0b2344] font-display">
        {title}
      </h1>
    </div>
  );
};

