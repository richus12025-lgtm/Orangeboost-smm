"use client";

import * as React from "react";
import Link from "next/link";
import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [sent, setSent] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const supabase = createSupabaseBrowserClient();
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
      setSent(true);
    } catch (err: any) {
      setError(err?.message ?? "Could not send reset email");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell title="Reset password" subtitle="We’ll email you a secure reset link.">
      {sent ? (
        <div className="space-y-4">
          <p className="text-sm text-muted">
            If an account exists for <span className="text-foreground">{email}</span>, you’ll receive a reset link shortly.
          </p>
          <Link href="/login">
            <Button className="w-full" size="lg">
              Back to login
            </Button>
          </Link>
        </div>
      ) : (
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

          {error && <div className="text-sm text-danger">{error}</div>}

          <Button className="w-full" size="lg" disabled={loading}>
            {loading ? "Sending..." : "Send reset link"}
          </Button>
        </form>
      )}
    </AuthShell>
  );
}

