import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/card";

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.auth.getUser();
  const user = data.user;

  const [{ data: orders }, { data: txs }] = await Promise.all([
    supabase
      .from("orders")
      .select("status")
      .eq("user_id", user?.id ?? "")
      .limit(500),
    supabase
      .from("wallet_transactions")
      .select("created_at,amount,method,status,type")
      .eq("user_id", user?.id ?? "")
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  const counts = (orders ?? []).reduce(
    (acc: Record<string, number>, o: any) => {
      acc[o.status] = (acc[o.status] ?? 0) + 1;
      return acc;
    },
    {}
  );

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <div className="text-sm font-semibold">Total Orders</div>
        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
          {[
            ["pending", "Pending"],
            ["processing", "Processing"],
            ["completed", "Completed"],
            ["cancelled", "Cancelled"],
          ].map(([key, label]) => (
            <div key={key as string} className="rounded-2xl border border-white/10 bg-white/5 p-3">
              <div className="text-xs text-muted-2">{label}</div>
              <div className="text-lg font-semibold">{counts[key as string] ?? 0}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="md:col-span-2">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold">Recent Transactions</div>
            <div className="text-xs text-muted-2">Wallet deposits, transfers, withdrawals.</div>
          </div>
        </div>
        <div className="mt-4 overflow-hidden rounded-2xl border border-white/10">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 text-xs text-muted-2">
              <tr>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Method</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {(txs ?? []).map((t: any) => (
                <tr key={t.created_at} className="border-t border-white/10">
                  <td className="px-4 py-3 text-muted">{new Date(t.created_at).toLocaleString()}</td>
                  <td className="px-4 py-3">{t.type}</td>
                  <td className="px-4 py-3 font-semibold">${Number(t.amount).toFixed(2)}</td>
                  <td className="px-4 py-3 text-muted">{t.method ?? "-"}</td>
                  <td className="px-4 py-3 text-muted">{t.status}</td>
                </tr>
              ))}
              {(txs ?? []).length === 0 && (
                <tr>
                  <td className="px-4 py-6 text-muted" colSpan={5}>
                    No transactions yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <Card className="md:col-span-3">
        <div className="text-sm font-semibold">Service Usage Graph</div>
        <div className="mt-2 text-sm text-muted">
          Demo placeholder — connect to your analytics pipeline or aggregate orders by day/week/month.
        </div>
        <div className="mt-5 h-40 w-full rounded-3xl border border-white/10 bg-gradient-to-r from-primary/15 to-primary-2/5" />
      </Card>
    </div>
  );
}
