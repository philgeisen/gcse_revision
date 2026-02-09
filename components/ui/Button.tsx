import { ButtonHTMLAttributes } from 'react';

export const Button = ({ className = '', ...props }: ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    {...props}
    className={`rounded border border-stroke bg-panel px-4 py-2 text-sm text-text transition ${className}`}
  />
);
