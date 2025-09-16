"use client";

import { useSearchParams } from "next/navigation";
import Hero from "@/components/Hero";

export default function DownloadPage() {
  const search = useSearchParams();
  const fileUrl = decodeURIComponent(search.get("url") || "#");

  return (
    <Hero>
      <div className="tf-card tf-card--download">
        <h2>Du har fått en TorskFile!</h2>
        <p className="tf-subtle">Upphör om 7 dagar</p>
        <p>Fånga fisken eller klicka här:</p>
        <a className="tf-primary" href={fileUrl}>Hämta</a>
      </div>

      {/* Simmande fisk (klickbar) */}
      <a className="tf-fish-link" href={fileUrl} aria-label="Hämta fil genom att fånga fisken">
        <img src="/fisk.png" alt="Fisk" className="tf-fish" />
      </a>
    </Hero>
  );
}
