"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

function passwordScore(pw: string) {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score; // 0..4
}

export default function SignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirm, setConfirm] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const score = passwordScore(password);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const supabase = createSupabaseBrowserClient();
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName, username, phone, country },
        },
      });
      if (error) throw error;

      // Best-effort profile upsert (requires schema + RLS policy).
      if (data.user) {
        await supabase.from("profiles").upsert({
          id: data.user.id,
          full_name: fullName,
          username,
          phone,
          country,
        });
      }

      router.push("/dashboard");
      router.refresh();
    } catch (err: any) {
      setError(err?.message ?? "Signup failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell title="Create your account" subtitle="Start placing orders from your OrangeBoost dashboard.">
      <form className="space-y-3" onSubmit={onSubmit}>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="mb-1 text-xs text-muted-2">Full Name</div>
            <Input value={fullName} onChange={(e) => setFullName(e.target.value)} required />
          </div>
          <div>
            <div className="mb-1 text-xs text-muted-2">Username</div>
            <Input value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
        </div>

        <div>
          <div className="mb-1 text-xs text-muted-2">Email</div>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="mb-1 text-xs text-muted-2">Phone</div>
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+234..." />
          </div>
          <div>
            <div className="mb-1 text-xs text-muted-2">Country</div>
            <Input value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Nigeria" />
          </div>
        </div>

        <div>
          <div className="mb-1 text-xs text-muted-2">Password</div>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary to-primary-2 transition-all"
              style={{ width: `${(score / 4) * 100}%` }}
            />
          </div>
          <div className="mt-1 text-xs text-muted-2">
            Strength: {["Very weak", "Weak", "Okay", "Strong", "Very strong"][score]}
          </div>
        </div>

        <div>
          <div className="mb-1 text-xs text-muted-2">Confirm Password</div>
          <Input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required />
        </div>

        {error && <div className="text-sm text-danger">{error}</div>}

        <Button className="w-full" size="lg" disabled={loading}>
          {loading ? "Creating..." : "Create Account"}
        </Button>

        <div className="text-center text-sm text-muted">
          Already have an account?{" "}
          <Link className="text-primary hover:underline" href="/login">
            Login
          </Link>
        </div>
      </form>
    </AuthShell>
  );
}

