"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, ListChecks, Users, Wrench, LifeBuoy, ArrowLeft } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: Array<string | undefined | null | false>) {
  return twMerge(clsx(inputs));
}

const links = [
  { href: "/admin", label: "Analytics", icon: <BarChart3 size={18} /> },
  { href: "/admin/services", label: "Services", icon: <Wrench size={18} /> },
  { href: "/admin/orders", label: "Orders", icon: <ListChecks size={18} /> },
  { href: "/admin/users", label: "Users", icon: <Users size={18} /> },
  { href: "/admin/tickets", label: "Tickets", icon: <LifeBuoy size={18} /> },
];

export function AdminSidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden md:flex md:w-72 md:flex-col md:gap-4 md:p-4">
      <Link href="/dashboard" className="flex items-center gap-2 px-2 py-2 text-sm text-muted hover:text-foreground">
        <ArrowLeft size={16} /> Back to Dashboard
      </Link>

      <div className="glass rounded-3xl p-2">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={cn(
              "flex items-center gap-3 rounded-2xl px-3 py-2 text-sm text-muted hover:bg-white/10 hover:text-foreground",
              pathname === l.href && "bg-white/10 text-foreground"
            )}
          >
            <span className="text-primary">{l.icon}</span>
            {l.label}
          </Link>
        ))}
      </div>
    </aside>
  );
}

