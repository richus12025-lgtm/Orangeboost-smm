"use client";

import * as React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: Array<string | undefined | null | false>) {
  return twMerge(clsx(inputs));
}

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-2xl border border-white/15 bg-white/5 px-4 text-sm text-foreground placeholder:text-muted-2 outline-none focus:border-primary/70 focus:ring-2 focus:ring-primary/30",
        className
      )}
      {...props}
    />
  );
}
