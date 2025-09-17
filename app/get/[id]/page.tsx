"use client";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Hero from "@/components/Hero";

export default function GetPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [caught, setCaught] = useState(false);

  function catchFish() {
    setCaught(true);
    setTimeout(() => {
      router.push(`/f/${id}`);
    }, 1000);
  }

  return (
    <Hero>
      <div className="tf-catch-zone">
        {!caught ? (
          <button className="tf-fish" onClick={catchFish}>
            🐟
          </button>
        ) : (
          <div className="tf-caught">Du fångade fisken! 🎉</div>
        )}
      </div>
    </Hero>
  );
}
