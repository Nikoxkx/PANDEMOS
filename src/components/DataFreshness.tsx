import { useStore } from '../store/useStore';

export default function DataFreshness() {
  const { darkMode } = useStore();
  const textTertiary = darkMode ? '#6E6E73' : '#86868B';

  const now = new Date();
  const timeStr = now.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <div className="text-center py-2">
      <span className="text-[13px] inline-flex items-center gap-1.5" style={{ color: textTertiary }}>
        <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: '#34C759' }} />
        Data current as of {timeStr}
      </span>
    </div>
  );
}
