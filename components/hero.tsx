"use client";

import Image from "next/image";
import { PropsWithChildren } from "react";

export default function Hero({ children }: PropsWithChildren) {
  return (
    <div className="tf-hero">
      {/* Stor logga */}
      <img src="/torskfile-logo.svg" alt="TorskFile" className="tf-logo" />

      {/* Våg + hav */}
      <div className="tf-sea">
        <img src="/wave.svg" alt="Wave" className="tf-wave" />
      </div>

      {/* Innehåll (kort/box) ovanpå havet */}
      <div className="tf-hero-content">{children}</div>
    </div>
  );
}
