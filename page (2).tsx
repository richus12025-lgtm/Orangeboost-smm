"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";

export function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[calc(100vh-0px)] flex items-center justify-center px-4 py-14">
      <div className="w-full max-w-md">
        <Link href="/" className="mb-6 flex items-center justify-center gap-2">
          <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-primary to-primary-2 orange-glow" />
          <div className="text-sm font-semibold tracking-tight">OrangeBoost</div>
        </Link>
        <Card className="p-7">
          <div className="text-xl font-semibold tracking-tight">{title}</div>
          <div className="mt-1 text-sm text-muted">{subtitle}</div>
          <div className="mt-6">{children}</div>
        </Card>
        <p className="mt-6 text-center text-xs text-muted-2">
          By continuing you agree to our{" "}
          <Link className="text-primary hover:underline" href="/terms">
            Terms
          </Link>{" "}
          and{" "}
          <Link className="text-primary hover:underline" href="/privacy">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

