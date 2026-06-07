import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function AdminOrdersPage() {
  const supabase = await createSupabaseServerClient();
  const { data: orders } = await supabase
    .from("orders")
    .select(
      "id,created_at,status,quantity,progress,target_url,profiles(username),services(platform,name)"
    )
    .order("created_at", { ascending: false })
    .limit(200);

  return (
    <div>
      <div className="text-xl font-semibold tracking-tight">Orders</div>
      <div className="mt-1 text-sm text-muted">Monitor and manage all orders.</div>

      <div className="mt-5 overflow-hidden rounded-2xl border border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/5 text-xs text-muted-2">
            <tr>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Service</th>
              <th className="px-4 py-3">Qty</th>
              <th className="px-4 py-3">Progress</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {(orders ?? []).map((o: any) => (
              <tr key={o.id} className="border-t border-white/10">
                <td className="px-4 py-3 text-muted">{new Date(o.created_at).toLocaleString()}</td>
                <td className="px-4 py-3">{o.profiles?.username ?? "—"}</td>
                <td className="px-4 py-3">
                  {o.services?.platform} • {o.services?.name}
                </td>
                <td className="px-4 py-3 text-muted">{o.quantity}</td>
                <td className="px-4 py-3 text-muted">
                  {o.progress ?? 0}/{o.quantity}
                </td>
                <td className="px-4 py-3 text-muted">{o.status}</td>
              </tr>
            ))}
            {(orders ?? []).length === 0 && (
              <tr>
                <td className="px-4 py-6 text-muted" colSpan={6}>
                  No orders yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
