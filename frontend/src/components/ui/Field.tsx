import type { InputHTMLAttributes } from 'react';
import { useId } from 'react';
import './Field.css';

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  action?: { label: string; onClick: () => void };
}

export default function Field({
  label,
  action,
  id,
  ...rest
}: FieldProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div className="field">
      <div className="field__header">
        <label htmlFor={inputId} className="field__label">
          {label}
        </label>
        {action && (
          <button
            type="button"
            className="field__action"
            onClick={action.onClick}
          >
            {action.label}
          </button>
        )}
      </div>
      <input id={inputId} className="field__input" {...rest} />
    </div>
  );
}
