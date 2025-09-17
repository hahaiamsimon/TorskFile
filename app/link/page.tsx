"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Hero from "@/components/Hero";

export default function LinkPage() {
  const search = useSearchParams();
  const router = useRouter();
  const id = search.get("id") || "";

  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (id) setUrl(`${window.location.origin}/f/${id}`);
  }, [id]);

  async function copy() {
    if (!url) return;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  return (
    <Hero>
      <div className="tf-card tf-card--link">
        <div className="tf-check">✓</div>
        <h3>Din fil har laddats upp!</h3>

        <div className="tf-link-row">
          <input className="tf-link-input" value={url} readOnly />
          <button className="tf-primary" onClick={copy}>
            {copied ? "Kopierad!" : "Kopiera länk"}
          </button>
        </div>

        <button className="tf-secondary" onClick={() => router.push(`/get/${id}`)}>
          Förhandsvisa mottagarvyn
        </button>
      </div>
    </Hero>
  );
}
