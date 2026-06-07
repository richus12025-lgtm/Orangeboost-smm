"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  BadgeCheck,
  Clock,
  CreditCard,
  Headset,
  Plug,
  ShieldCheck,
} from "lucide-react";
import { MarketingNavbar } from "@/components/marketing/navbar";
import { MarketingFooter } from "@/components/marketing/footer";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion } from "@/components/ui/accordion";

export default function Home() {
  return (
    <div className="min-h-full">
      <MarketingNavbar />

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pt-16 pb-10 md:pt-24">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-muted">
              Premium • Fast • Secure • API-ready
            </div>
            <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
              Grow Your Social Media Presence{" "}
              <span className="bg-gradient-to-r from-primary to-primary-2 bg-clip-text text-transparent">
                Instantly
              </span>
            </h1>
            <p className="mt-4 max-w-xl text-base text-muted md:text-lg">
              Buy followers, likes, comments, views, reposts and more from one powerful dashboard — with
              real-time tracking and secure payments.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/signup">
                <Button size="lg">Get Started</Button>
              </Link>
              <a href="#services">
                <Button variant="secondary" size="lg">
                  View Services
                </Button>
              </a>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
              {[
                { k: "500K+", v: "Orders Delivered" },
                { k: "50K+", v: "Customers" },
                { k: "99.9%", v: "Uptime" },
                { k: "24/7", v: "Support" },
              ].map((s) => (
                <div key={s.v} className="glass rounded-3xl px-4 py-4">
                  <div className="text-lg font-semibold">{s.k}</div>
                  <div className="text-xs text-muted-2">{s.v}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 rounded-[40px] bg-gradient-to-br from-primary/20 to-primary-2/5 blur-2xl" />
            <div className="relative glass orange-glow rounded-[40px] p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold">Live Order Feed</div>
                  <div className="text-xs text-muted-2">Real-time activity (demo)</div>
                </div>
                <div className="h-9 w-9 rounded-2xl bg-gradient-to-br from-primary to-primary-2" />
              </div>
              <div className="mt-6 space-y-3">
                {[
                  { title: "Instagram Followers", meta: "1,000 • Processing", pct: 72 },
                  { title: "TikTok Views", meta: "10,000 • Completed", pct: 100 },
                  { title: "YouTube Subscribers", meta: "500 • Pending", pct: 18 },
                ].map((o) => (
                  <div key={o.title} className="rounded-3xl border border-white/10 bg-black/20 p-4">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">{o.title}</div>
                      <div className="text-xs text-muted-2">{o.meta}</div>
                    </div>
                    <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${o.pct}%` }}
                        transition={{ duration: 1.2, delay: 0.2 }}
                        className="h-full rounded-full bg-gradient-to-r from-primary to-primary-2"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="mx-auto max-w-6xl px-4 pt-10">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              Services that convert
            </h2>
            <p className="mt-2 text-sm text-muted">
              Instagram, Facebook, TikTok, YouTube, X (Twitter), Telegram — all in one place.
            </p>
          </div>
          <Link href="/services" className="hidden md:block">
            <Button variant="secondary">Browse All</Button>
          </Link>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            {
              platform: "Instagram",
              items: ["Followers", "Likes", "Comments", "Story Views", "Reels Views", "Shares", "Saves"],
            },
            {
              platform: "TikTok",
              items: ["Followers", "Likes", "Views", "Shares", "Saves", "Comments"],
            },
            {
              platform: "YouTube",
              items: ["Subscribers", "Views", "Likes", "Comments", "Watch Time"],
            },
            { platform: "Facebook", items: ["Likes", "Followers", "Post Shares", "Comments", "Reactions"] },
            { platform: "X (Twitter)", items: ["Followers", "Retweets", "Likes", "Comments", "Bookmarks"] },
            { platform: "Telegram", items: ["Members", "Views", "Reactions"] },
          ].map((p) => (
            <Card key={p.platform}>
              <CardHeader>
                <CardTitle>{p.platform}</CardTitle>
                <CardDescription>High-quality delivery with smart limits.</CardDescription>
              </CardHeader>
              <div className="flex flex-wrap gap-2">
                {p.items.map((x) => (
                  <span
                    key={x}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted"
                  >
                    {x}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-6 md:hidden">
          <Link href="/services">
            <Button variant="secondary" className="w-full">
              Browse All Services
            </Button>
          </Link>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="features" className="mx-auto max-w-6xl px-4 pt-20">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Instant Delivery",
              desc: "Start orders in seconds and track progress live.",
              icon: <Clock size={18} />,
            },
            {
              title: "Affordable Prices",
              desc: "Smart pricing tiers with loyalty discounts.",
              icon: <BadgeCheck size={18} />,
            },
            {
              title: "Secure Payments",
              desc: "Paystack + Flutterwave support, with ledger history.",
              icon: <CreditCard size={18} />,
            },
            {
              title: "24/7 Support",
              desc: "Ticket-based support with chat-style threads.",
              icon: <Headset size={18} />,
            },
            {
              title: "Real-Time Tracking",
              desc: "Order status, delivery progress, and ETA.",
              icon: <ShieldCheck size={18} />,
            },
            {
              title: "API Integration",
              desc: "Reseller-ready API keys and endpoints (MVP).",
              icon: <Plug size={18} />,
            },
          ].map((f) => (
            <Card key={f.title} className="p-0 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-2xl bg-white/5 flex items-center justify-center text-primary">
                    {f.icon}
                  </div>
                  <div className="text-base font-semibold">{f.title}</div>
                </div>
                <p className="mt-3 text-sm text-muted">{f.desc}</p>
              </div>
              <div className="h-[2px] w-full bg-gradient-to-r from-primary/60 to-transparent" />
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-6xl px-4 pt-20">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              Loved by creators and agencies
            </h2>
            <p className="mt-2 text-sm text-muted">A premium experience from landing page to delivery.</p>
          </div>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            {
              name: "Aisha O.",
              rating: "★★★★★",
              review: "Fast delivery and the dashboard looks insanely clean. Wallet history is super clear.",
            },
            {
              name: "Tunde K.",
              rating: "★★★★★",
              review: "The order tracking progress bar is a game changer. Support replies quickly too.",
            },
            {
              name: "Mariam S.",
              rating: "★★★★☆",
              review: "Great value and the API makes it easy for my reseller workflow.",
            },
          ].map((t) => (
            <Card key={t.name}>
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold">{t.name}</div>
                <div className="text-xs text-primary">{t.rating}</div>
              </div>
              <p className="mt-3 text-sm text-muted">{t.review}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-4xl px-4 pt-20">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">FAQ</h2>
        <p className="mt-2 text-sm text-muted">Quick answers to the most common questions.</p>
        <div className="mt-8">
          <Accordion
            items={[
              {
                title: "How does the platform work?",
                content:
                  "Choose a service, paste your target link/username, set quantity, and place your order. You can track status and progress in your dashboard.",
              },
              {
                title: "Is payment secure?",
                content:
                  "Yes. Deposits are handled via Paystack/Flutterwave. Your wallet ledger records every transaction.",
              },
              {
                title: "How fast is delivery?",
                content:
                  "Delivery speed depends on the service. Many services start instantly; others may take longer based on quantity and platform limits.",
              },
              {
                title: "Can I get a refund?",
                content:
                  "Refund eligibility depends on the service and delivery status. You can open a support ticket for review.",
              },
            ]}
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-20">
        <div className="glass orange-glow rounded-[40px] p-8 md:p-10">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <div className="text-2xl font-semibold tracking-tight">
                Ready to boost your growth?
              </div>
              <p className="mt-2 text-sm text-muted">
                Create an account in under a minute and start your first order.
              </p>
            </div>
            <Link href="/signup">
              <Button size="lg">Create Account</Button>
            </Link>
          </div>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}
