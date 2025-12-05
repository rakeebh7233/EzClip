import { BUNNY } from "@/constants";
import { getEnv } from "@/lib/utils";
import { NextResponse } from "next/server";

const THUMBNAIL_STORAGE_BASE_URL = BUNNY.STORAGE_BASE_URL;

export async function POST(req: Request) {
  const form = await req.formData();
  const file = form.get("file") as File;
  const path = form.get("path") as string;

  console.log(THUMBNAIL_STORAGE_BASE_URL, file, path)
  if (!file || !path) {
    return NextResponse.json({ error: "Missing file or path" }, { status: 400 });
  }

  const uploadRes = await fetch(
    `${THUMBNAIL_STORAGE_BASE_URL}/${path}`,
    {
      method: "PUT",
      headers: {
        AccessKey: getEnv("BUNNY_STORAGE_ACCESS_KEY"),
        "Content-Type": file.type,
      },
      body: file,
    }
  );

  if (!uploadRes.ok) {
    const text = await uploadRes.text();
    console.error("Thumbnail upload failed:", text);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
