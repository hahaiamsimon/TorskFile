import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Viktigt! Använd Service Role Key här
);

// POST /api/upload/complete
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { filePath } = body; // filens path i bucketen

    if (!filePath) {
      return NextResponse.json({ error: "filePath is required" }, { status: 400 });
    }

    // Kolla om filen faktiskt finns i Supabase bucket
    const { data, error } = await supabase.storage
      .from("your-bucket-name") // <-- byt till ditt riktiga bucket-namn
      .list("", { search: filePath });

    if (error) {
      console.error("Supabase list error:", error);
      return NextResponse.json({ error: "Could not verify file" }, { status: 500 });
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Upload complete",
      filePath,
      fileInfo: data[0],
    });
  } catch (err) {
    console.error("Complete route error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
