import { LoginForm } from "@/components/auth/login-form";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const sp = await searchParams;
  const nextPath = sp?.next ?? "/dashboard";
  return <LoginForm nextPath={nextPath} />;
}
