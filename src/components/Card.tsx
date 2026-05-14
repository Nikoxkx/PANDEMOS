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

  return (
    <div
      onClick={onClick}
      className={`rounded-2xl p-8 md:p-10 text-center relative overflow-hidden ${
        hoverable ? 'transition-all duration-300 cursor-pointer' : ''
      } ${onClick ? 'cursor-pointer' : ''} ${darkMode ? 'glass-card' : 'glass-card-light'} ${className}`}
      style={{
        animationDelay: `${delay}ms`,
      }}
      onMouseEnter={(e) => {
        if (hoverable) {
          e.currentTarget.style.transform = 'translateY(-4px)';
        }
      }}
      onMouseLeave={(e) => {
        if (hoverable) {
          e.currentTarget.style.transform = 'translateY(0)';
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
