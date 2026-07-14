import type { ReactNode } from 'react';
import './Card.css';

interface CardProps {
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
}

export default function Card({
  title,
  description,
  children,
  className = '',
}: CardProps) {
  return (
    <div className={`card ${className}`}>
      <div className="card__header">
        <h3 className="card__title">{title}</h3>
        {description && <p className="card__description">{description}</p>}
      </div>
      <div className="card__body">{children}</div>
    </div>
  );
}
