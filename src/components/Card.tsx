import { ReactNode } from 'react';
import { useStore } from '../store/useStore';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  severity?: string;
  delay?: number;
  hoverable?: boolean;
}

export default function Card({ children, className = '', onClick, severity, delay = 0, hoverable = true }: CardProps) {
  const { darkMode } = useStore();

  const bg = darkMode ? '#1C1C1E' : '#FFFFFF';
  const border = darkMode ? '1px solid #2C2C2E' : '1px solid #D2D2D7';
  const shadow = darkMode ? '0 2px 12px rgba(0,0,0,0.3)' : '0 2px 12px rgba(0,0,0,0.08)';

  return (
    <div
      onClick={onClick}
      className={`rounded-2xl p-8 md:p-10 text-center relative overflow-hidden ${
        hoverable ? 'transition-all duration-300 cursor-pointer' : ''
      } ${onClick ? 'cursor-pointer' : ''} ${className}`}
      style={{
        backgroundColor: bg,
        border,
        boxShadow: shadow,
        animationDelay: `${delay}ms`,
      }}
      onMouseEnter={(e) => {
        if (hoverable) {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = darkMode
            ? '0 8px 32px rgba(0,0,0,0.3)'
            : '0 4px 24px rgba(0,0,0,0.12)';
        }
      }}
      onMouseLeave={(e) => {
        if (hoverable) {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = shadow;
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
