import { Source } from '../data/diseases';
import { useStore } from '../store/useStore';

interface SourceCitationProps {
  source: Source;
  inline?: boolean;
}

const tierColors: Record<number, string> = {
  1: '#34C759',
  2: '#007AFF',
  3: '#FF9500',
  4: '#FFCC00',
  5: '#FF3B30',
};

export default function SourceCitation({ source, inline = true }: SourceCitationProps) {
  const { darkMode } = useStore();
  const textTertiary = darkMode ? '#6E6E73' : '#86868B';

  if (inline) {
    return (
      <span className="text-[13px] inline-flex items-center gap-1.5 flex-wrap justify-center" style={{ color: textTertiary }}>
        <span
          className="inline-block w-[6px] h-[6px] rounded-full"
          style={{ backgroundColor: tierColors[source.tier] }}
        />
        {source.name} · T{source.tier} · {source.date} ·{' '}
        <a
          href={source.url}
          target="_blank"
          rel="noopener noreferrer"
          className="underline-offset-2 hover:underline"
          style={{ color: textTertiary }}
        >
          View original ↗
        </a>
      </span>
    );
  }

  return (
    <div
      className="rounded-2xl p-6 text-center max-w-[400px] mx-auto"
      style={{
        backgroundColor: darkMode ? '#1C1C1E' : '#FFFFFF',
        border: darkMode ? 'none' : '1px solid #D2D2D7',
        boxShadow: darkMode ? 'none' : '0 2px 12px rgba(0,0,0,0.08)',
      }}
    >
      <p className="text-[17px] font-semibold" style={{ color: darkMode ? '#F5F5F7' : '#1D1D1F' }}>
        {source.name}
      </p>
      <div className="mt-2 flex items-center justify-center gap-2">
        <span
          className="inline-flex items-center gap-1 text-[12px] px-2.5 py-0.5 rounded-full font-medium"
          style={{
            backgroundColor: `${tierColors[source.tier]}20`,
            color: tierColors[source.tier],
          }}
        >
          <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ backgroundColor: tierColors[source.tier] }} />
          Tier {source.tier}
        </span>
      </div>
      <p className="text-[15px] mt-4" style={{ color: darkMode ? '#A1A1A6' : '#6E6E73' }}>
        Published: {source.date}
      </p>
      <a
        href={source.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-4 text-[15px] font-medium"
        style={{ color: '#007AFF' }}
      >
        Read original report ↗
      </a>
    </div>
  );
}
