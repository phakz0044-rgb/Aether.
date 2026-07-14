import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/brand/Logo';
import './AuthLayout.css';

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
}

export default function AuthLayout({
  title,
  subtitle,
  children,
  footer,
}: AuthLayoutProps) {
  return (
    <div className="auth-layout">
      <div className="auth-layout__glow" aria-hidden="true" />

      <Link to="/" className="auth-layout__brand">
        <Logo size="md" />
      </Link>

      <div className="auth-layout__card">
        <div className="auth-layout__heading">
          <h1 className="auth-layout__title">{title}</h1>
          <p className="auth-layout__subtitle">{subtitle}</p>
        </div>

        {children}

        {footer && <div className="auth-layout__footer">{footer}</div>}
      </div>
    </div>
  );
}
