"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Copy, Check } from "lucide-react";

interface InviteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  partyCode: string;
}

export function InviteModal({ open, onOpenChange, partyCode }: InviteModalProps) {
  const [email, setEmail] = useState("");
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(partyCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleSendInvite = () => {
    // In a real app, this would send an email invite
    console.log("Sending invite to:", email);
    // For now, just close the modal
    setEmail("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Invite Friends</DialogTitle>
          <DialogDescription>
            Share your party code or send an email invite to friends.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Party Code Section */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Party Code</label>
            <div className="flex items-center gap-2">
              <div className="flex-1 px-4 py-2 bg-muted rounded-md text-center font-mono text-lg font-bold tracking-wider">
                {partyCode}
              </div>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handleCopy}
                className="shrink-0"
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Share this code with friends so they can join your party.
            </p>
          </div>

          {/* Email Invite Section */}
          <div className="space-y-2">
            <label htmlFor="invite-email" className="text-sm font-medium">
              Email Invite
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="invite-email"
                  type="email"
                  placeholder="friend@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Button
                type="button"
                onClick={handleSendInvite}
                disabled={!email || !email.includes("@")}
              >
                Send
              </Button>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
