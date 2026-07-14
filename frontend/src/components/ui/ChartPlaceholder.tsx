import './ChartPlaceholder.css';

interface ChartPlaceholderProps {
  variant?: 'bars' | 'line' | 'donut';
}

export default function ChartPlaceholder({
  variant = 'bars',
}: ChartPlaceholderProps) {
  if (variant === 'line') {
    return (
      <svg
        className="chart-placeholder"
        viewBox="0 0 220 100"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M4 70 L40 50 L76 62 L112 30 L148 42 L184 18 L216 26"
          stroke="var(--color-accent)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.9"
        />
        <path
          d="M4 70 L40 50 L76 62 L112 30 L148 42 L184 18 L216 26 L216 96 L4 96 Z"
          fill="var(--color-accent)"
          opacity="0.08"
        />
      </svg>
    );
  }

  if (variant === 'donut') {
    return (
      <svg
        className="chart-placeholder"
        viewBox="0 0 100 100"
        aria-hidden="true"
      >
        <circle
          cx="50"
          cy="50"
          r="38"
          fill="none"
          stroke="var(--color-border-strong)"
          strokeWidth="12"
        />
        <circle
          cx="50"
          cy="50"
          r="38"
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="12"
          strokeDasharray="145 239"
          strokeLinecap="round"
          transform="rotate(-90 50 50)"
        />
      </svg>
    );
  }

  return (
    <svg
      className="chart-placeholder"
      viewBox="0 0 220 100"
      aria-hidden="true"
    >
      {[38, 58, 30, 72, 46, 64, 24].map((h, i) => (
        <rect
          key={i}
          x={i * 30 + 4}
          y={100 - h}
          width="18"
          height={h}
          rx="4"
          fill={i === 3 ? 'var(--color-accent)' : 'var(--color-border-strong)'}
        />
      ))}
    </svg>
  );
}
