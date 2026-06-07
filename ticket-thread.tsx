"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

type Service = {
  id: string;
  platform: string;
  name: string;
  price_per_1000: number;
  min_qty: number;
  max_qty: number;
  speed?: string | null;
  description?: string | null;
  is_active: boolean;
};

export function ServiceManager({ initial }: { initial: Service[] }) {
  const [services, setServices] = React.useState<Service[]>(initial);
  const [form, setForm] = React.useState({
    platform: "Instagram",
    name: "",
    price_per_1000: 2.5,
    min_qty: 50,
    max_qty: 10000,
    speed: "Fast",
    description: "",
  });
  const [loading, setLoading] = React.useState(false);
  const [msg, setMsg] = React.useState<string | null>(null);

  async function refresh() {
    const supabase = createSupabaseBrowserClient();
    const { data } = await supabase
      .from("services")
      .select("id,platform,name,price_per_1000,min_qty,max_qty,speed,description,is_active")
      .order("platform");
    setServices((data as any) ?? []);
  }

  async function create(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    try {
      const supabase = createSupabaseBrowserClient();
      const { error } = await supabase.from("services").insert({
        ...form,
        is_active: true,
      });
      if (error) throw error;
      setForm({ ...form, name: "", description: "" });
      setMsg("Service added.");
      await refresh();
    } catch (e: any) {
      setMsg(e?.message ?? "Could not create service");
    } finally {
      setLoading(false);
    }
  }

  async function toggle(id: string, is_active: boolean) {
    const supabase = createSupabaseBrowserClient();
    await supabase.from("services").update({ is_active }).eq("id", id);
    await refresh();
  }

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="md:col-span-2">
        <div className="text-xl font-semibold tracking-tight">Services</div>
        <div className="mt-1 text-sm text-muted">Add, disable, and price your offerings.</div>

        <div className="mt-5 overflow-hidden rounded-2xl border border-white/10">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 text-xs text-muted-2">
              <tr>
                <th className="px-4 py-3">Platform</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Price/1k</th>
                <th className="px-4 py-3">Min</th>
                <th className="px-4 py-3">Max</th>
                <th className="px-4 py-3">Active</th>
              </tr>
            </thead>
            <tbody>
              {services.map((s) => (
                <tr key={s.id} className="border-t border-white/10">
                  <td className="px-4 py-3 text-muted">{s.platform}</td>
                  <td className="px-4 py-3">{s.name}</td>
                  <td className="px-4 py-3 font-semibold">${Number(s.price_per_1000).toFixed(2)}</td>
                  <td className="px-4 py-3 text-muted">{s.min_qty}</td>
                  <td className="px-4 py-3 text-muted">{s.max_qty}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggle(s.id, !s.is_active)}
                      className={
                        s.is_active
                          ? "rounded-full bg-success/15 px-3 py-1 text-xs text-success"
                          : "rounded-full bg-danger/15 px-3 py-1 text-xs text-danger"
                      }
                    >
                      {s.is_active ? "Enabled" : "Disabled"}
                    </button>
                  </td>
                </tr>
              ))}
              {services.length === 0 && (
                <tr>
                  <td className="px-4 py-6 text-muted" colSpan={6}>
                    No services yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="glass rounded-3xl p-5">
        <div className="text-sm font-semibold">Add Service</div>
        <form className="mt-4 space-y-3" onSubmit={create}>
          <div>
            <div className="mb-1 text-xs text-muted-2">Platform</div>
            <Input
              value={form.platform}
              onChange={(e) => setForm({ ...form, platform: e.target.value })}
            />
          </div>
          <div>
            <div className="mb-1 text-xs text-muted-2">Name</div>
            <Input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="mb-1 text-xs text-muted-2">Price/1k</div>
              <Input
                type="number"
                value={form.price_per_1000}
                onChange={(e) =>
                  setForm({ ...form, price_per_1000: Number(e.target.value) })
                }
                required
              />
            </div>
            <div>
              <div className="mb-1 text-xs text-muted-2">Speed</div>
              <Input
                value={form.speed}
                onChange={(e) => setForm({ ...form, speed: e.target.value })}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="mb-1 text-xs text-muted-2">Min Qty</div>
              <Input
                type="number"
                value={form.min_qty}
                onChange={(e) => setForm({ ...form, min_qty: Number(e.target.value) })}
              />
            </div>
            <div>
              <div className="mb-1 text-xs text-muted-2">Max Qty</div>
              <Input
                type="number"
                value={form.max_qty}
                onChange={(e) => setForm({ ...form, max_qty: Number(e.target.value) })}
              />
            </div>
          </div>
          <div>
            <div className="mb-1 text-xs text-muted-2">Description</div>
            <textarea
              className="min-h-24 w-full rounded-2xl border border-white/15 bg-white/5 p-4 text-sm outline-none focus:border-primary/70 focus:ring-2 focus:ring-primary/30"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>
          {msg && <div className="text-sm text-muted">{msg}</div>}
          <Button className="w-full" disabled={loading}>
            {loading ? "Saving..." : "Add Service"}
          </Button>
        </form>
      </div>
    </div>
  );
}

