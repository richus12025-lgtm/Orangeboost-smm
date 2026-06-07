import { createSupabaseServerClient } from "@/lib/supabase/server";
import { ServiceManager } from "@/components/admin/service-manager";

export default async function AdminServicesPage() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("services")
    .select("id,platform,name,price_per_1000,min_qty,max_qty,speed,description,is_active")
    .order("platform");

  return <ServiceManager initial={(data as any) ?? []} />;
}
