"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: Array<string | undefined | null | false>) {
  return twMerge(clsx(inputs));
}

export function Accordion({
  items,
}: {
  items: Array<{ title: string; content: React.ReactNode }>;
}) {
  const [open, setOpen] = React.useState<number | null>(0);

  return (
    <div className="space-y-3">
      {items.map((it, idx) => {
        const isOpen = open === idx;
        return (
          <div key={idx} className="glass rounded-3xl overflow-hidden">
            <button
              onClick={() => setOpen(isOpen ? null : idx)}
              className="flex w-full items-center justify-between px-5 py-4 text-left"
            >
              <span className="font-medium">{it.title}</span>
              <ChevronDown
                className={cn(
                  "transition-transform",
                  isOpen ? "rotate-180" : "rotate-0"
                )}
                size={18}
              />
            </button>
            {isOpen && (
              <div className="px-5 pb-5 text-sm text-muted">{it.content}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}

