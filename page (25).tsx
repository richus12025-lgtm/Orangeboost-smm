import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile?.is_admin) redirect("/dashboard");

  return (
    <div className="min-h-[calc(100vh-0px)] md:flex">
      <AdminSidebar />
      <main className="flex-1 p-4 md:p-8">
        <div className="glass rounded-[32px] p-6 md:p-7">{children}</div>
      </main>
    </div>
  );
}
