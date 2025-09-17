"use client";
import { PropsWithChildren } from "react";

export default function Hero({ children }: PropsWithChildren) {
  return (
    <div className="tf-hero">
      <img src="/torskfile-logo.svg" alt="TorskFile" className="tf-logo" />
      <div className="tf-sea">
        <img src="/wave.svg" alt="" className="tf-wave" />
      </div>
      <div className="tf-hero-content">{children}</div>
    </div>
  );
}
