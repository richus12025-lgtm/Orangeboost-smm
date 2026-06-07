"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";

export function ApiKeyCard({ initialKey }: { initialKey?: string | null }) {
  const [key, setKey] = React.useState(initialKey ?? null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function rotate() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/internal/api-key/rotate", { method: "POST" });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error ?? "Could not rotate key");
      setKey(json.key);
    } catch (e: any) {
      setError(e?.message ?? "Failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-3">
      <div>
        <div className="text-xs text-muted-2">Active API Key</div>
        <div className="mt-1 rounded-2xl border border-white/10 bg-white/5 p-3 font-mono text-xs break-all">
          {key ?? "No API key yet."}
        </div>
      </div>
      {error && <div className="text-sm text-danger">{error}</div>}
      <Button variant="secondary" onClick={rotate} disabled={loading}>
        {loading ? "Generating..." : key ? "Rotate API Key" : "Generate API Key"}
      </Button>
      <p className="text-xs text-muted-2">
        Use this key in API requests as <span className="text-foreground">x-api-key</span>.
      </p>
    </div>
  );
}

