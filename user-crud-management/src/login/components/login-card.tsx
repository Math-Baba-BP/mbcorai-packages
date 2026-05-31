import * as React from "react";

import { cn } from "../../utils/cn";

type LoginCardProps = {
  children: React.ReactNode;
  className?: string;
};

export function LoginCard({
  children,
  className,
}: LoginCardProps) {
  return (
    <div
      className={cn(
        "w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-sm",
        className,
      )}
    >
      {children}
    </div>
  );
}