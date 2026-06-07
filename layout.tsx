"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingCart,
  ListChecks,
  Wallet,
  LifeBuoy,
  User,
  Shield,
} from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: Array<string | undefined | null | false>) {
  return twMerge(clsx(inputs));
}

const links = [
  { href: "/dashboard", label: "Overview", icon: <LayoutDashboard size={18} /> },
  { href: "/dashboard/services", label: "Services", icon: <ListChecks size={18} /> },
  { href: "/dashboard/new-order", label: "New Order", icon: <ShoppingCart size={18} /> },
  { href: "/dashboard/orders", label: "Orders", icon: <ListChecks size={18} /> },
  { href: "/dashboard/wallet", label: "Wallet", icon: <Wallet size={18} /> },
  { href: "/dashboard/tickets", label: "Support", icon: <LifeBuoy size={18} /> },
  { href: "/dashboard/profile", label: "Profile", icon: <User size={18} /> },
];

export function AppSidebar({ isAdmin }: { isAdmin?: boolean }) {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex md:w-72 md:flex-col md:gap-4 md:p-4">
      <Link href="/" className="flex items-center gap-2 px-2 py-2">
        <div className="h-9 w-9 rounded-2xl bg-gradient-to-br from-primary to-primary-2 orange-glow" />
        <div className="leading-tight">
          <div className="text-sm font-semibold tracking-tight">OrangeBoost</div>
          <div className="text-xs text-muted-2">SMM Panel</div>
        </div>
      </Link>

      <div className="glass rounded-3xl p-2">
        {links.map((l) => {
          const active = pathname === l.href;
          return (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "flex items-center gap-3 rounded-2xl px-3 py-2 text-sm text-muted hover:bg-white/10 hover:text-foreground",
                active && "bg-white/10 text-foreground"
              )}
            >
              <span className="text-primary">{l.icon}</span>
              {l.label}
            </Link>
          );
        })}
        {isAdmin && (
          <Link
            href="/admin"
            className={cn(
              "mt-1 flex items-center gap-3 rounded-2xl px-3 py-2 text-sm text-muted hover:bg-white/10 hover:text-foreground",
              pathname.startsWith("/admin") && "bg-white/10 text-foreground"
            )}
          >
            <span className="text-primary">
              <Shield size={18} />
            </span>
            Admin
          </Link>
        )}
      </div>
    </aside>
  );
}

