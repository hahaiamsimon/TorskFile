import { NextRequest, NextResponse } from "next/server";
import { s3, BUCKET } from "@/lib/s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { nanoid } from "nanoid";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE!
);

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file) return NextResponse.json({ error: "Ingen fil skickad" }, { status: 400 });

    const id = nanoid(10);
    const buffer = Buffer.from(await file.arrayBuffer());

    await s3.send(new PutObjectCommand({
      Bucket: BUCKET,
      Key: id,
      Body: buffer,
      ContentType: file.type,
    }));

    await supabase.from("files").insert({
      id,
      filename: file.name,
      mimetype: file.type,
      size: file.size,
    });

    return NextResponse.json({ id }, { status: 201 });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "Fel vid uppladdning" }, { status: 500 });
  }
}
