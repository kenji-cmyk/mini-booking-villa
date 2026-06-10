import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
  helperText?: string;
  label: string;
};

export function Input({ className = "", error, helperText, id, label, ...props }: InputProps) {
  const inputId = id ?? props.name ?? label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="grid gap-2">
      <label className="text-sm font-semibold text-neutral-700" htmlFor={inputId}>
        {label}
      </label>
      <input
        className={`h-12 rounded-xl border bg-white px-4 text-base text-neutral-900 transition duration-180 ease-out placeholder:text-neutral-500 ${
          error ? "border-error" : "border-neutral-200 hover:border-neutral-300 focus:border-primary-600"
        } ${className}`}
        id={inputId}
        {...props}
      />
      {error ? <p className="text-sm text-error">{error}</p> : null}
      {!error && helperText ? <p className="text-sm text-neutral-500">{helperText}</p> : null}
    </div>
  );
}
