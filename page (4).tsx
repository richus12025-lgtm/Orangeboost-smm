"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

type Service = {
  id: string;
  platform: string;
  name: string;
  price_per_1000: number;
  min_qty: number;
  max_qty: number;
  description?: string | null;
};

export function NewOrderForm({
  services,
  initialServiceId,
}: {
  services: Service[];
  initialServiceId?: string | null;
}) {
  const router = useRouter();

  const [serviceId, setServiceId] = React.useState(
    initialServiceId ?? services[0]?.id ?? ""
  );
  const [targetUrl, setTargetUrl] = React.useState("");
  const [quantity, setQuantity] = React.useState<number>(1000);
  const [comments, setComments] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const service = services.find((s) => s.id === serviceId);
  const estimated =
    service && quantity
      ? ((Number(service.price_per_1000) / 1000) * Number(quantity)).toFixed(2)
      : "0.00";

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!service) return;
    if (quantity < service.min_qty || quantity > service.max_qty) {
      setError(`Quantity must be between ${service.min_qty} and ${service.max_qty}.`);
      return;
    }
    setLoading(true);
    try {
      const supabase = createSupabaseBrowserClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Not logged in.");

      const { error } = await supabase.from("orders").insert({
        user_id: user.id,
        service_id: service.id,
        target_url: targetUrl,
        quantity,
        notes: comments ? { comments } : null,
        status: "pending",
        progress: 0,
      });
      if (error) throw error;

      router.push("/dashboard/orders");
      router.refresh();
    } catch (err: any) {
      setError(err?.message ?? "Could not place order");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="grid gap-4 md:grid-cols-3">
      <Card className="md:col-span-2">
        <div className="text-sm font-semibold">New Order</div>
        <div className="mt-6 grid gap-3">
          <div>
            <div className="mb-1 text-xs text-muted-2">Service</div>
            <select
              className="h-11 w-full rounded-2xl border border-white/15 bg-white/5 px-4 text-sm outline-none focus:border-primary/70 focus:ring-2 focus:ring-primary/30"
              value={serviceId}
              onChange={(e) => setServiceId(e.target.value)}
            >
              {services.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.platform} • {s.name}
                </option>
              ))}
            </select>
            {service?.description && (
              <div className="mt-2 text-xs text-muted">{service.description}</div>
            )}
          </div>

          <div>
            <div className="mb-1 text-xs text-muted-2">Target URL</div>
            <Input
              value={targetUrl}
              onChange={(e) => setTargetUrl(e.target.value)}
              placeholder="https://instagram.com/username"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="mb-1 text-xs text-muted-2">Quantity</div>
              <Input
                type="number"
                min={service?.min_qty ?? 1}
                max={service?.max_qty ?? 1000000}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                required
              />
              {service && (
                <div className="mt-1 text-xs text-muted-2">
                  Min {service.min_qty} • Max {service.max_qty}
                </div>
              )}
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs text-muted-2">Estimated Cost</div>
              <div className="mt-1 text-2xl font-semibold">${estimated}</div>
              <div className="mt-1 text-xs text-muted-2">
                Based on price per 1,000.
              </div>
            </div>
          </div>

          <div>
            <div className="mb-1 text-xs text-muted-2">
              Comments (optional, one per line)
            </div>
            <textarea
              className="min-h-28 w-full rounded-2xl border border-white/15 bg-white/5 p-4 text-sm outline-none focus:border-primary/70 focus:ring-2 focus:ring-primary/30"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder={"Awesome content!\nGreat work!\nLove this post!"}
            />
          </div>

          {error && <div className="text-sm text-danger">{error}</div>}

          <Button size="lg" disabled={loading}>
            {loading ? "Placing..." : "Place Order"}
          </Button>
        </div>
      </Card>

      <Card>
        <div className="text-sm font-semibold">Tips</div>
        <ul className="mt-4 space-y-2 text-sm text-muted">
          <li>• Use the exact post/profile link.</li>
          <li>• For comment orders, put one comment per line.</li>
          <li>• Track progress live in the Orders page.</li>
        </ul>
      </Card>
    </form>
  );
}
