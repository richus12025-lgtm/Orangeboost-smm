import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function AdminUsersPage() {
  const supabase = await createSupabaseServerClient();
  const { data: users } = await supabase
    .from("profiles")
    .select("id,created_at,username,full_name,is_admin")
    .order("created_at", { ascending: false })
    .limit(200);

  return (
    <div>
      <div className="text-xl font-semibold tracking-tight">Users</div>
      <div className="mt-1 text-sm text-muted">View registered users (MVP).</div>

      <div className="mt-5 overflow-hidden rounded-2xl border border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/5 text-xs text-muted-2">
            <tr>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Username</th>
              <th className="px-4 py-3">Full name</th>
              <th className="px-4 py-3">Role</th>
            </tr>
          </thead>
          <tbody>
            {(users ?? []).map((u: any) => (
              <tr key={u.id} className="border-t border-white/10">
                <td className="px-4 py-3 text-muted">{new Date(u.created_at).toLocaleString()}</td>
                <td className="px-4 py-3">{u.username ?? "—"}</td>
                <td className="px-4 py-3 text-muted">{u.full_name ?? "—"}</td>
                <td className="px-4 py-3 text-muted">{u.is_admin ? "Admin" : "User"}</td>
              </tr>
            ))}
            {(users ?? []).length === 0 && (
              <tr>
                <td className="px-4 py-6 text-muted" colSpan={4}>
                  No users yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
