import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function AdminPage() {
  const supabase = await createSupabaseServerClient();
  const [{ count: users }, { count: orders }, { count: txs }] = await Promise.all([
    supabase.from("profiles").select("id", { count: "exact", head: true }),
    supabase.from("orders").select("id", { count: "exact", head: true }),
    supabase.from("wallet_transactions").select("id", { count: "exact", head: true }),
  ]);

  return (
    <div>
      <div className="text-2xl font-semibold tracking-tight">Admin Analytics</div>
      <div className="mt-1 text-sm text-muted">High-level metrics (MVP).</div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {[
          { label: "Users", value: users ?? 0 },
          { label: "Orders", value: orders ?? 0 },
          { label: "Transactions", value: txs ?? 0 },
        ].map((m) => (
          <div key={m.label} className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <div className="text-xs text-muted-2">{m.label}</div>
            <div className="mt-1 text-3xl font-semibold">{m.value}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 h-56 rounded-3xl border border-white/10 bg-gradient-to-r from-primary/15 to-primary-2/5" />
    </div>
  );
}
