"use client";

import * as React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: Array<string | undefined | null | false>) {
  return twMerge(clsx(inputs));
}

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-2xl font-medium transition-all outline-none focus-visible:ring-2 focus-visible:ring-primary/70 disabled:opacity-60 disabled:pointer-events-none",
        size === "sm" && "h-9 px-3 text-sm",
        size === "md" && "h-11 px-4 text-sm",
        size === "lg" && "h-12 px-5 text-base",
        variant === "primary" &&
          "bg-gradient-to-r from-primary to-primary-2 text-black hover:brightness-110 orange-glow",
        variant === "secondary" &&
          "glass text-foreground hover:border-white/25 hover:bg-white/10",
        variant === "ghost" &&
          "bg-transparent text-foreground hover:bg-white/10",
        variant === "danger" &&
          "bg-danger text-white hover:brightness-110",
        className
      )}
      {...props}
    />
  );
}

