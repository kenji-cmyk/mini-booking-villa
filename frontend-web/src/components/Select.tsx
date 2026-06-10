import type { SelectHTMLAttributes } from "react";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
};

export function Select({ children, className = "", id, label, ...props }: SelectProps) {
  const selectId = id ?? props.name ?? label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="grid gap-2">
      <label className="text-sm font-semibold text-neutral-700" htmlFor={selectId}>
        {label}
      </label>
      <select
        className={`h-12 rounded-xl border border-neutral-200 bg-white px-4 text-base text-neutral-900 transition duration-180 ease-out hover:border-neutral-300 focus:border-primary-600 ${className}`}
        id={selectId}
        {...props}
      >
        {children}
      </select>
    </div>
  );
}
