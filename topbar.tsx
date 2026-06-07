import Link from "next/link";
import { AtSign, Globe, Send, Camera } from "lucide-react";

export function MarketingFooter() {
  return (
    <footer className="mt-24 border-t border-white/10">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="text-lg font-semibold tracking-tight">OrangeBoost SMM</div>
          <p className="mt-2 max-w-md text-sm text-muted">
            Premium SMM panel with real-time tracking, secure payments, and API access for resellers.
          </p>
        </div>

        <div>
          <div className="text-sm font-semibold">Links</div>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li>
              <Link href="/about" className="hover:text-foreground">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-foreground">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-foreground">
                Terms
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-foreground">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/api-docs" className="hover:text-foreground">
                API Docs
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <div className="text-sm font-semibold">Social</div>
          <div className="mt-3 flex items-center gap-3 text-muted">
            <a className="hover:text-foreground" href="#" aria-label="Facebook">
              <Globe size={18} />
            </a>
            <a className="hover:text-foreground" href="#" aria-label="Instagram">
              <Camera size={18} />
            </a>
            <a className="hover:text-foreground" href="#" aria-label="X">
              <AtSign size={18} />
            </a>
            <a className="hover:text-foreground" href="#" aria-label="Telegram">
              <Send size={18} />
            </a>
          </div>
          <p className="mt-4 text-xs text-muted-2">© {new Date().getFullYear()} OrangeBoost. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
