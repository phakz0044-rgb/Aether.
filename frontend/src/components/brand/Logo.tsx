import './Logo.css';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  withWordmark?: boolean;
  className?: string;
}

const SIZES: Record<NonNullable<LogoProps['size']>, number> = {
  sm: 22,
  md: 28,
  lg: 40,
};

export default function Logo({
  size = 'md',
  withWordmark = true,
  className = '',
}: LogoProps) {
  const px = SIZES[size];

  return (
    <div className={`aether-logo aether-logo--${size} ${className}`}>
      <svg
        width={px}
        height={px}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="aether-logo__mark"
      >
        <path
          d="M16 2 L29 24 L3 24 Z"
          stroke="var(--color-white)"
          strokeWidth="2"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M16 12 L22.5 24 L9.5 24 Z"
          fill="var(--color-accent)"
        />
      </svg>
      {withWordmark && <span className="aether-logo__word">Aether</span>}
    </div>
  );
}
