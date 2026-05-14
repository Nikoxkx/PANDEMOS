import { getSeverityColor, getSeverityLabel } from '../data/diseases';

interface SeverityBadgeProps {
  severity: string;
  size?: 'sm' | 'md';
}

export default function SeverityBadge({ severity, size = 'sm' }: SeverityBadgeProps) {
  const color = getSeverityColor(severity);
  const label = getSeverityLabel(severity);

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-medium ${
        size === 'sm' ? 'text-[11px] px-2.5 py-0.5 uppercase tracking-[0.04em]' : 'text-[12px] px-3 py-1 uppercase tracking-[0.04em]'
      }`}
      style={{
        backgroundColor: `${color}15`,
        color: color,
      }}
    >
      <span
        className="inline-block w-1.5 h-1.5 rounded-full"
        style={{ backgroundColor: color }}
      />
      {label}
    </span>
  );
}
