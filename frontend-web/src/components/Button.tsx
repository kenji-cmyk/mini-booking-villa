import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  isLoading?: boolean;
  size?: "small" | "medium" | "large";
  variant?: "danger" | "ghost" | "primary" | "secondary";
};

export function Button({
  children,
  className = "",
  disabled,
  isLoading = false,
  size = "large",
  type = "button",
  variant = "primary",
  ...props
}: ButtonProps) {
  const sizeClassName = {
    small: "h-9 px-4 text-sm",
    medium: "h-11 px-5 text-sm",
    large: "h-[52px] px-6 text-sm"
  }[size];
  const variantClassName = {
    danger: "bg-error text-white hover:opacity-90",
    ghost: "bg-transparent text-primary-700 hover:bg-neutral-100",
    primary: "bg-primary-600 text-white hover:bg-primary-700",
    secondary: "border border-primary-600 bg-white text-primary-700 hover:bg-neutral-50"
  }[variant];

  return (
    <button
      className={`${sizeClassName} inline-flex items-center justify-center rounded-xl font-semibold transition duration-180 ease-out active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 ${variantClassName} ${className}`}
      disabled={disabled || isLoading}
      type={type}
      {...props}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
}
