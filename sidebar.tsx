import { MarketingNavbar } from "@/components/marketing/navbar";
import { MarketingFooter } from "@/components/marketing/footer";

export function MarketingPageShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-full">
      <MarketingNavbar />
      <main className="mx-auto max-w-4xl px-4 py-14">
        <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
        {subtitle && <p className="mt-2 text-sm text-muted">{subtitle}</p>}
        <div className="mt-8 glass rounded-[32px] p-6 md:p-8">{children}</div>
      </main>
      <MarketingFooter />
    </div>
  );
}

