"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export function CreateTicketForm() {
  const [subject, setSubject] = React.useState("");
  const [category, setCategory] = React.useState("payment");
  const [priority, setPriority] = React.useState("normal");
  const [message, setMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);
    try {
      const supabase = createSupabaseBrowserClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Not logged in");

      const { data: ticket, error } = await supabase
        .from("tickets")
        .insert({
          user_id: user.id,
          subject,
          category,
          priority,
          status: "open",
        })
        .select("id")
        .single();
      if (error) throw error;

      await supabase.from("ticket_messages").insert({
        ticket_id: ticket.id,
        sender: "user",
        message,
      });

      setSuccess("Ticket created. Refresh to see it in the list.");
      setSubject("");
      setMessage("");
    } catch (err: any) {
      setError(err?.message ?? "Could not create ticket");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div>
        <div className="mb-1 text-xs text-muted-2">Subject</div>
        <Input value={subject} onChange={(e) => setSubject(e.target.value)} required />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="mb-1 text-xs text-muted-2">Category</div>
          <select
            className="h-11 w-full rounded-2xl border border-white/15 bg-white/5 px-4 text-sm outline-none focus:border-primary/70 focus:ring-2 focus:ring-primary/30"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="payment">Payment</option>
            <option value="order">Order Issue</option>
            <option value="refund">Refund</option>
            <option value="technical">Technical</option>
          </select>
        </div>
        <div>
          <div className="mb-1 text-xs text-muted-2">Priority</div>
          <select
            className="h-11 w-full rounded-2xl border border-white/15 bg-white/5 px-4 text-sm outline-none focus:border-primary/70 focus:ring-2 focus:ring-primary/30"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="low">Low</option>
            <option value="normal">Normal</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      <div>
        <div className="mb-1 text-xs text-muted-2">Message</div>
        <textarea
          className="min-h-28 w-full rounded-2xl border border-white/15 bg-white/5 p-4 text-sm outline-none focus:border-primary/70 focus:ring-2 focus:ring-primary/30"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </div>

      {error && <div className="text-sm text-danger">{error}</div>}
      {success && <div className="text-sm text-success">{success}</div>}

      <Button size="lg" className="w-full" disabled={loading}>
        {loading ? "Creating..." : "Create Ticket"}
      </Button>
    </form>
  );
}

