import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface BackLinkProps {
  to?: string;
  label?: string;
  className?: string;
}

export const BackLink: React.FC<BackLinkProps> = ({
  to = '/',
  label = 'Back to Home',
  className = '',
}) => {
  return (
    <div className={`mb-6 ${className}`}>
      <Link
        to={to}
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0f766e] hover:text-[#0b2344] transition-colors"
      >
        <ArrowLeft size={16} />
        <span>{label}</span>
      </Link>
    </div>
  );
};

