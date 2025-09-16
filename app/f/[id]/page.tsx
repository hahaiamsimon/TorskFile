import { notFound } from "next/navigation";
import { BUCKET, s3 } from "@/lib/s3";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { createClient } from "@supabase/supabase-js";

type FilePageProps = {
  params: { id: string };
};

// Supabase client (server-side)
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE!
);

export default async function FilePage({ params }: FilePageProps) {
  const { id } = params;

  // hämta metadata från Supabase
  const { data: file, error } = await supabase
    .from("files")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !file) {
    console.error("File not found in Supabase:", error);
    return notFound();
  }

  // skapa signerad URL från Backblaze (giltig i 1h)
  const command = new GetObjectCommand({
    Bucket: BUCKET,
    Key: id,
  });

  const url = await getSignedUrl(s3, command, { expiresIn: 3600 });

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Ladda ner fil</h1>
      <p><b>Filnamn:</b> {file.filename}</p>
      <p><b>Storlek:</b> {(file.size / (1024 * 1024)).toFixed(2)} MB</p>
      <a
        href={url}
        style={{
          display: "inline-block",
          marginTop: "1rem",
          padding: "0.75rem 1.5rem",
          backgroundColor: "black",
          color: "white",
          borderRadius: "8px",
          textDecoration: "none",
        }}
      >
        ⬇️ Ladda ner
      </a>
    </main>
  );
}
