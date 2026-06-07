"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export function LoginForm({ nextPath }: { nextPath: string }) {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const supabase = createSupabaseBrowserClient();
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      router.push(nextPath);
      router.refresh();
    } catch (err: any) {
      setError(err?.message ?? "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell title="Welcome back" subtitle="Login to your OrangeBoost dashboard.">
      <form className="space-y-3" onSubmit={onSubmit}>
        <div>
          <div className="mb-1 text-xs text-muted-2">Email</div>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
        </div>
        <div>
          <div className="mb-1 flex items-center justify-between text-xs text-muted-2">
            <span>Password</span>
            <Link className="text-primary hover:underline" href="/forgot-password">
              Forgot password?
            </Link>
          </div>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </div>

        {error && <div className="text-sm text-danger">{error}</div>}

        <Button className="w-full" size="lg" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>

        <div className="text-center text-sm text-muted">
          New here?{" "}
          <Link className="text-primary hover:underline" href="/signup">
            Create an account
          </Link>
        </div>
      </form>
    </AuthShell>
  );
}

