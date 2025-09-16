"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Hero from "@/components/Hero";

export default function Page() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dirInputRef = useRef<HTMLInputElement>(null);

  const [fileName, setFileName] = useState<string>("filens-namn.pdf");
  const [fish, setFish] = useState<string>("/fisk.png");
  const [selectedFiles, setSelectedFiles] = useState<File[] | null>(null);
  const [selectedDir, setSelectedDir] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);

  function onChooseFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setSelectedFiles(files);
    if (files[0]) setFileName(files[0].name);
  }

  function onChooseDir(e: React.ChangeEvent<HTMLInputElement>) {
    setSelectedDir(e.target.files);
  }

  async function onCreateLink() {
    setLoading(true);

    // ✳️ Koppla in din befintliga upload-logik här.
    // Skicka selectedFiles/selectedDir & ev. valt "fish" till ditt API.
    // Anta att API svarar med en publikt delbar URL (fileUrl) och ett id/token.

    // Demo: fejkad URL & id – byt till svar från ditt API
    const fileUrl = "https://torskfile.s3.eu.../dinfil.pdf";
    const id = "abc123";

    // Visa länkvyn och skicka med URL i query
    router.push(`/link?url=${encodeURIComponent(fileUrl)}&id=${id}`);
  }

  return (
    <Hero>
      <div className="tf-card tf-card--upload">
        <div className="tf-upload-row">
          <button
            type="button"
            className="tf-upload-tile"
            onClick={() => fileInputRef.current?.click()}
          >
            <span className="tf-plus">+</span>
            <span>Lägg till filer</span>
          </button>

          <button
            type="button"
            className="tf-upload-tile"
            onClick={() => dirInputRef.current?.click()}
          >
            <span className="tf-plus">+</span>
            <span>Lägg till mappar</span>
          </button>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="tf-hidden"
            onChange={onChooseFiles}
          />

          {/* mappar (webkitdirectory funkar i Chromium-baserade & Safari) */}
          {/* TS bryr sig inte om custom-attribut → @ts-expect-error för att slippa fel */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {/* @ts-expect-error */}
          <input
            ref={dirInputRef}
            type="file"
            className="tf-hidden"
            webkitdirectory=""
            directory=""
            onChange={onChooseDir}
          />
        </div>

        <div className="tf-fields">
          <div className="tf-field">
            <label>Titel</label>
            <div className="tf-title">{fileName}</div>
          </div>

          <div className="tf-field">
            <label>Välj fisk</label>
            <button className="tf-fish-picker" onClick={() => setFish("/fisk.png")}>
              <img src={fish} alt="Fisk" />
            </button>
          </div>
        </div>

        <button className="tf-primary" onClick={onCreateLink} disabled={loading}>
          {loading ? "Skapar..." : "Skapa en länk"}
        </button>
      </div>
    </Hero>
  );
}
