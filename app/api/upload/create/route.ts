import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// POST /api/upload/create
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { filename, size } = body;

    if (!filename || !size) {
      return NextResponse.json(
        { error: "filename and size are required" },
        { status: 400 }
      );
    }

    // Skapa en rad i Supabase (tabell: files)
    const { data, error } = await supabase
      .from("files")
      .insert([
        {
          filename,
          size,
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: "Could not create file record" }, { status: 500 });
    }

    return NextResponse.json({
      message: "Upload initialized",
      file: data,
    });
  } catch (err) {
    console.error("Create route error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
