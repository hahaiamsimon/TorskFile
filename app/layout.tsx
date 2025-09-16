import "../styles/global.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TorskFile",
  description: "Dela filer på ett lekfullt sätt – fånga fisken för att hämta filen.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv">
      <body>
        {children}
        <footer className="tf-footer">©2025 TorskFile</footer>
      </body>
    </html>
  );
}
