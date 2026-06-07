import { createSupabaseServerClient } from "@/lib/supabase/server";
import { NewOrderForm } from "@/components/orders/new-order-form";
import { Card } from "@/components/ui/card";

export default async function NewOrderPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const sp = await searchParams;
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("services")
    .select("id,platform,name,price_per_1000,min_qty,max_qty,description")
    .eq("is_active", true)
    .order("platform");

  const services = data ?? [];

  if (services.length === 0) {
    return (
      <Card>
        <div className="text-sm text-muted">
          No services available yet. Ask an admin to add services in the admin panel.
        </div>
      </Card>
    );
  }

  return <NewOrderForm services={services as any} initialServiceId={sp?.service ?? null} />;
}
