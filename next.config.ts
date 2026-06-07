import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/card";
import { DepositForm } from "@/components/wallet/deposit-form";

export default async function WalletPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [{ data: wallet }, { data: txs }] = await Promise.all([
    supabase.from("wallets").select("balance").eq("user_id", user?.id ?? "").maybeSingle(),
    supabase
      .from("wallet_transactions")
      .select("created_at,amount,method,status,type,reference")
      .eq("user_id", user?.id ?? "")
      .order("created_at", { ascending: false })
      .limit(50),
  ]);

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <div className="text-sm font-semibold">Wallet</div>
        <div className="mt-2 text-xs text-muted-2">Account Balance</div>
        <div className="mt-2 text-3xl font-semibold">
          ${Number(wallet?.balance ?? 0).toFixed(2)}
        </div>
        <div className="mt-6">
          <DepositForm />
        </div>
      </Card>

      <Card className="md:col-span-2">
        <div className="text-sm font-semibold">Wallet History</div>
        <div className="mt-1 text-xs text-muted-2">
          Date • Amount • Method • Status
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
                <tr key={t.created_at + t.reference} className="border-t border-white/10">
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
                    No wallet activity yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
