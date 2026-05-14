import { ReactNode } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useStore } from '../store/useStore';

interface SectionProps {
  label?: string;
  heading?: string;
  body?: string;
  children?: ReactNode;
  alt?: boolean;
  dark?: boolean;
  wide?: boolean;
  fullBleed?: boolean;
  className?: string;
  id?: string;
}

export default function Section({
  label,
  heading,
  body,
  children,
  alt = false,
  dark = false,
  wide = false,
  fullBleed = false,
  className = '',
  id,
}: SectionProps) {
  const { ref, isVisible } = useScrollReveal(0.1);
  const { darkMode } = useStore();

  const isDark = dark || darkMode;

  let bgColor = 'transparent';
  if (dark) {
    bgColor = '#000000';
  } else if (alt) {
    bgColor = isDark ? '#0A0A0A' : '#F5F5F7';
  } else {
    bgColor = isDark ? '#000000' : '#FFFFFF';
  }

  const textPrimary = isDark || dark ? '#F5F5F7' : '#1D1D1F';
  const textSecondary = isDark || dark ? '#A1A1A6' : '#6E6E73';
  const textTertiary = isDark || dark ? '#6E6E73' : '#86868B';

  return (
    <section
      ref={ref}
      id={id}
      className={`w-full py-[80px] md:py-[120px] ${className}`}
      style={{ backgroundColor: bgColor }}
    >
      <div
        className={`mx-auto px-6 md:px-10 lg:px-16 ${
          fullBleed ? 'max-w-full' : wide ? 'max-w-[1440px]' : 'max-w-[1200px]'
        }`}
      >
        {/* Header */}
        {(label || heading || body) && (
          <div className="text-center mb-12 md:mb-16">
            {label && (
              <p
                className="text-[12px] uppercase tracking-[0.1em] font-medium mb-4"
                style={{
                  color: textTertiary,
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'opacity 0.5s cubic-bezier(0.25,0.1,0.25,1), transform 0.5s cubic-bezier(0.25,0.1,0.25,1)',
                }}
              >
                {label}
              </p>
            )}
            {heading && (
              <h2
                className="text-[32px] md:text-[40px] font-semibold leading-[1.2] tracking-tight max-w-[700px] mx-auto whitespace-pre-line"
                style={{
                  color: textPrimary,
                  letterSpacing: '-0.02em',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'opacity 0.5s cubic-bezier(0.25,0.1,0.25,1) 0.1s, transform 0.5s cubic-bezier(0.25,0.1,0.25,1) 0.1s',
                }}
              >
                {heading}
              </h2>
            )}
            {body && (
              <p
                className="text-[17px] md:text-[19px] leading-[1.5] max-w-[580px] mx-auto mt-5"
                style={{
                  color: textSecondary,
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'opacity 0.5s cubic-bezier(0.25,0.1,0.25,1) 0.2s, transform 0.5s cubic-bezier(0.25,0.1,0.25,1) 0.2s',
                }}
              >
                {body}
              </p>
            )}
          </div>
        )}

        {/* Content */}
        <div
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.6s cubic-bezier(0.25,0.1,0.25,1) 0.3s, transform 0.6s cubic-bezier(0.25,0.1,0.25,1) 0.3s',
          }}
        >
          {children}
        </div>
      </div>
    </section>
  );
}
