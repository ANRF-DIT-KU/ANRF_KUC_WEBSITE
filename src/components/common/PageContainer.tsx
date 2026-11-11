import React from 'react';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`py-12 px-4 sm:px-8 max-w-7xl mx-auto ${className}`}>
      {children}
    </div>
  );
};

