"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function DepositForm() {
  const [amount, setAmount] = React.useState(10);
  const [method, setMethod] = React.useState<"paystack" | "flutterwave">("paystack");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function startDeposit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(`/api/payments/${method}/initialize`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error ?? "Could not initialize payment");
      if (!json.authorization_url) throw new Error("Missing authorization_url from gateway");
      window.location.href = json.authorization_url;
    } catch (err: any) {
      setError(err?.message ?? "Payment initialization failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={startDeposit} className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="mb-1 text-xs text-muted-2">Amount (USD)</div>
          <Input
            type="number"
            min={1}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            required
          />
        </div>
        <div>
          <div className="mb-1 text-xs text-muted-2">Payment Method</div>
          <select
            className="h-11 w-full rounded-2xl border border-white/15 bg-white/5 px-4 text-sm outline-none focus:border-primary/70 focus:ring-2 focus:ring-primary/30"
            value={method}
            onChange={(e) => setMethod(e.target.value as any)}
          >
            <option value="paystack">Paystack</option>
            <option value="flutterwave">Flutterwave</option>
          </select>
        </div>
      </div>

      {error && <div className="text-sm text-danger">{error}</div>}

      <Button size="lg" className="w-full" disabled={loading}>
        {loading ? "Redirecting..." : "Deposit"}
      </Button>

      <p className="text-xs text-muted-2">
        For production: configure webhook endpoints to confirm payment before crediting wallet.
      </p>
    </form>
  );
}

