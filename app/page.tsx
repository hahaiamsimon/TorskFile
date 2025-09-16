"use client";

import { useState } from "react";

export default function Home() {
  const [step, setStep] = useState<"upload" | "link" | "download">("upload");

  return (
    <div className="page">
      {/* Logga */}
      <img src="/torskfile-logo.svg" alt="TorskFile" className="logo" />
      {/* Vågen */}
      <img src="/wave.svg" alt="Wave" className="wave" />

      {step === "upload" && (
        <div className="box">
          <h2>Ladda upp en fil</h2>
          <input type="file" />
          <button onClick={() => setStep("link")}>Skapa en länk</button>
        </div>
      )}

      {step === "link" && (
        <div className="box">
          <h2>Din fil har laddats upp!</h2>
          <input
            type="text"
            readOnly
            value="https://torskfile.s3.eu..."
            className="linkfield"
          />
          <button onClick={() => setStep("download")}>Kopiera länk</button>
        </div>
      )}

      {step === "download" && (
        <>
          <div className="box">
            <h2>Du har fått en TorskFile!</h2>
            <p>Upphör om 7 dagar</p>
            <p>Fånga fisken eller klicka här:</p>
            <button>Hämta</button>
          </div>
          <a href="/din-fil.pdf" download>
            <img src="/fisk.png" alt="Fisk" className="fish" />
          </a>
        </>
      )}
    </div>
  );
}
