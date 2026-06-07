"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export function TicketReplyBox({ ticketId }: { ticketId: string }) {
  const [message, setMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function send() {
    if (!message.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const supabase = createSupabaseBrowserClient();
      const { error } = await supabase.from("ticket_messages").insert({
        ticket_id: ticketId,
        sender: "user",
        message,
      });
      if (error) throw error;
      setMessage("");
      window.location.reload();
    } catch (err: any) {
      setError(err?.message ?? "Could not send message");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-4 space-y-2">
      <textarea
        className="min-h-28 w-full rounded-2xl border border-white/15 bg-white/5 p-4 text-sm outline-none focus:border-primary/70 focus:ring-2 focus:ring-primary/30"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
      />
      {error && <div className="text-sm text-danger">{error}</div>}
      <Button onClick={send} disabled={loading}>
        {loading ? "Sending..." : "Send"}
      </Button>
    </div>
  );
}

