import type { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return <div className="min-h-screen bg-neutral-50 text-neutral-900">{children}</div>;
}
