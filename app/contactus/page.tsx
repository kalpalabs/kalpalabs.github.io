"use client";

import { theme } from "@/lib/theme"

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";


export default function ContactUsPage() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ "namespace": "30min" });
      cal("ui", { "cssVarsPerTheme": { "light": { "cal-brand": "#514437" }, "dark": { "cal-brand": "#514437" } }, "hideEventTypeDetails": false, "layout": "month_view" });
    })();
  }, [])
  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.colors.background }}>
      <div className="mx-auto px-8 py-24">
        <div className="text-center">
          <h1 className="text-5xl font-serif mb-8" style={{ color: theme.colors.text }}>
            <p className="text-lg leading-relaxed mb-8" style={{ color: theme.colors.textMuted }}>
              Book a call or email us at pshishodia (at) kalpalabs (dot) ai
            </p>
            <Cal namespace="30min"
              calLink="pshishodia/30min"
              style={{ width: "100%", height: "100%", overflow: "scroll" }}
              config={{ "layout": "month_view" }}
            />
          </h1>
        </div>
      </div>
    </div>
  )
}
