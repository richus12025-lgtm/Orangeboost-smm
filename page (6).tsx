"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export function AppTopbar({
  fullName,
  balance,
}: {
  fullName?: string | null;
  balance?: number | null;
}) {
  const router = useRouter();

  async function logout() {
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <div className="text-sm text-muted-2">Welcome</div>
        <div className="text-xl font-semibold tracking-tight">
          {fullName ?? "OrangeBoost User"}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden sm:block glass rounded-3xl px-4 py-3">
          <div className="text-xs text-muted-2">Balance</div>
          <div className="text-sm font-semibold">
            ${typeof balance === "number" ? balance.toFixed(2) : "0.00"}
          </div>
        </div>
        <Link href="/dashboard/wallet">
          <Button variant="secondary" size="sm">
            Deposit
          </Button>
        </Link>
        <Button variant="ghost" size="sm" onClick={logout}>
          <LogOut size={16} />
        </Button>
      </div>
    </div>
  );
}

