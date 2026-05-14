import { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const { darkMode } = useStore();
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 300),   // circle draws
      setTimeout(() => setPhase(2), 900),   // P appears
      setTimeout(() => setPhase(3), 1200),  // PANDEMOS types
      setTimeout(() => setPhase(4), 1800),  // line extends
      setTimeout(() => setPhase(5), 2200),  // fade out
      setTimeout(() => onComplete(), 2500), // done
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  const bg = darkMode ? '#000000' : '#FFFFFF';
  const fg = darkMode ? '#F5F5F7' : '#1D1D1F';

  return (
    <div
      className="fixed inset-0 z-[500] flex flex-col items-center justify-center transition-opacity duration-300"
      style={{ backgroundColor: bg, opacity: phase >= 5 ? 0 : 1 }}
    >
      {/* Circle */}
      <svg width="80" height="80" viewBox="0 0 80 80" className="mb-4">
        <circle
          cx="40"
          cy="40"
          r="38"
          fill="none"
          stroke={fg}
          strokeWidth="1"
          strokeDasharray="239"
          strokeDashoffset={phase >= 1 ? '0' : '239'}
          style={{ transition: 'stroke-dashoffset 0.6s cubic-bezier(0.25, 0.1, 0.25, 1.0)' }}
        />
        {/* P monogram */}
        <text
          x="50%"
          y="52%"
          dominantBaseline="middle"
          textAnchor="middle"
          fill={fg}
          fontSize="28"
          fontWeight="600"
          fontFamily="-apple-system, BlinkMacSystemFont, sans-serif"
          style={{
            opacity: phase >= 2 ? 1 : 0,
            transform: phase >= 2 ? 'scale(1)' : 'scale(0.8)',
            transformOrigin: 'center',
            transition: 'opacity 0.3s ease, transform 0.3s ease',
          }}
        >
          P
        </text>
      </svg>

      {/* PANDEMOS text */}
      <div
        className="text-[13px] uppercase tracking-[0.1em] font-medium overflow-hidden"
        style={{
          color: fg,
          opacity: phase >= 3 ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      >
        PANDEMOS
      </div>

      {/* Expanding line */}
      <div
        className="h-[1px] mt-4 transition-all duration-500"
        style={{
          backgroundColor: fg,
          width: phase >= 4 ? '200px' : '0px',
          opacity: phase >= 4 ? 0.3 : 0,
        }}
      />
    </div>
  );
}
