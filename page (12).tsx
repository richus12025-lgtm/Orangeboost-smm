"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export function ProfileForm({
  initial,
}: {
  initial: { full_name?: string | null; username?: string | null; phone?: string | null; country?: string | null };
}) {
  const [fullName, setFullName] = React.useState(initial.full_name ?? "");
  const [username, setUsername] = React.useState(initial.username ?? "");
  const [phone, setPhone] = React.useState(initial.phone ?? "");
  const [country, setCountry] = React.useState(initial.country ?? "");
  const [loading, setLoading] = React.useState(false);
  const [msg, setMsg] = React.useState<string | null>(null);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    try {
      const supabase = createSupabaseBrowserClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Not logged in");

      await supabase.from("profiles").upsert({
        id: user.id,
        full_name: fullName,
        username,
        phone,
        country,
      });
      setMsg("Saved.");
    } catch (e: any) {
      setMsg(e?.message ?? "Could not save");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={save} className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="mb-1 text-xs text-muted-2">Full Name</div>
          <Input value={fullName} onChange={(e) => setFullName(e.target.value)} />
        </div>
        <div>
          <div className="mb-1 text-xs text-muted-2">Username</div>
          <Input value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="mb-1 text-xs text-muted-2">Phone</div>
          <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div>
          <div className="mb-1 text-xs text-muted-2">Country</div>
          <Input value={country} onChange={(e) => setCountry(e.target.value)} />
        </div>
      </div>
      {msg && <div className="text-sm text-muted">{msg}</div>}
      <Button size="lg" disabled={loading}>
        {loading ? "Saving..." : "Save changes"}
      </Button>
    </form>
  );
}

