"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MarketingNavbar() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-2xl bg-gradient-to-br from-primary to-primary-2 orange-glow" />
          <div className="leading-tight">
            <div className="text-sm font-semibold tracking-tight">OrangeBoost</div>
            <div className="text-xs text-muted-2">SMM Panel</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-muted md:flex">
          <a href="#services" className="hover:text-foreground">
            Services
          </a>
          <a href="#features" className="hover:text-foreground">
            Why Us
          </a>
          <a href="#faq" className="hover:text-foreground">
            FAQ
          </a>
          <Link href="/login" className="hover:text-foreground">
            Login
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </Button>
          <Link href="/signup">
            <Button size="sm">Get Started</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

