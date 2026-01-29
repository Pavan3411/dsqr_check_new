"use client";

import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

export default function FreeTrialForm({ open, setOpen, affiliate = false }) {
  // load embed.js once
  useEffect(() => {
    if (document.querySelector('script[src="https://app.youform.com/embed.js"]')) return;
    const s = document.createElement("script");
    s.src = "https://app.youform.com/embed.js";
    s.async = true;
    s.onload = () => { if (window.YouformEmbed?.init) window.YouformEmbed.init(); };
    document.body.appendChild(s);
  }, []);

  // re-init when opened
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => { if (window.YouformEmbed?.init) window.YouformEmbed.init(); }, 50);
    return () => clearTimeout(t);
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen} showCloseButton={false}>
      {/* Make DialogContent overflow-visible so negative-positioned/floating items are not clipped */}
      <DialogContent className="w-[90%] max-w-[1000px] p-0 bg-transparent shadow-none border-0 overflow-visible">
        <DialogHeader>
        </DialogHeader>

        {/* Inner wrapper clips the iframe and provides rounded corners */}
        <div className="rounded-2xl overflow-hidden w-full h-[70vh]">
          <div
            data-youform-embed
data-form={affiliate ? "tgjhwjmv" : "sqh67f5g"}
            data-width="100%"
            data-height="100%"
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
