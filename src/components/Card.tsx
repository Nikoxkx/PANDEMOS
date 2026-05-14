import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  severity?: string;
  delay?: number;
  hoverable?: boolean;
}

export default function Card({ children, className = '', onClick, severity, delay = 0, hoverable = true }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`rounded-2xl p-8 md:p-10 text-center relative overflow-hidden ${
        hoverable ? 'transition-all duration-300 cursor-pointer' : ''
      } ${onClick ? 'cursor-pointer' : ''} ${className}`}
      style={{
        background: 'rgba(28, 28, 30, 0.5)',
        backdropFilter: 'blur(40px)',
        WebkitBackdropFilter: 'blur(40px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        animationDelay: `${delay}ms`,
      }}
      onMouseEnter={(e) => {
        if (hoverable) {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
          e.currentTarget.style.boxShadow = '0 16px 48px rgba(0, 0, 0, 0.4)';
        }
      }}
      onMouseLeave={(e) => {
        if (hoverable) {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.background = 'rgba(28, 28, 30, 0.5)';
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
          e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
        }
      }}
    >
      {severity && (
        <div
          className="absolute top-0 left-0 right-0 h-1"
          style={{ backgroundColor: severity }}
        />
      )}
      {children}
    </div>
  );
}
