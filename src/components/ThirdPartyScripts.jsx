// components/ThirdPartyScripts.tsx
"use client";
import Script from "next/script";
import { useEffect } from "react";

export default function ThirdPartyScripts() {
  // optional extra safety if you need it
  useEffect(() => {
    // e.g., post-load checks
  }, []);

  return (
    <>
      <Script
        src="https://app.youform.com/widgets/widget.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (window?.youform && typeof window.youform.init === "function") {
            window.youform.init();
          }
        }}
        onError={(e) => console.error("Failed to load YouForm script:", e)}
      />
    </>
  );
}
