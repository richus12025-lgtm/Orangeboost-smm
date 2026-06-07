import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function AdminTicketsPage() {
  const supabase = await createSupabaseServerClient();
  const { data: tickets } = await supabase
    .from("tickets")
    .select("id,created_at,subject,status,category,priority,profiles(username)")
    .order("created_at", { ascending: false })
    .limit(200);

  return (
    <div>
      <div className="text-xl font-semibold tracking-tight">Tickets</div>
      <div className="mt-1 text-sm text-muted">Review and respond via Supabase table (MVP).</div>

      <div className="mt-5 overflow-hidden rounded-2xl border border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/5 text-xs text-muted-2">
            <tr>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Subject</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Priority</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {(tickets ?? []).map((t: any) => (
              <tr key={t.id} className="border-t border-white/10">
                <td className="px-4 py-3 text-muted">{new Date(t.created_at).toLocaleString()}</td>
                <td className="px-4 py-3">{t.profiles?.username ?? "—"}</td>
                <td className="px-4 py-3">
                  <Link className="text-primary hover:underline" href={`/dashboard/tickets/${t.id}`}>
                    {t.subject}
                  </Link>
                </td>
                <td className="px-4 py-3 text-muted">{t.category}</td>
                <td className="px-4 py-3 text-muted">{t.priority}</td>
                <td className="px-4 py-3 text-muted">{t.status}</td>
              </tr>
            ))}
            {(tickets ?? []).length === 0 && (
              <tr>
                <td className="px-4 py-6 text-muted" colSpan={6}>
                  No tickets yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
