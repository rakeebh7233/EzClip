import { BUNNY } from "@/constants";
import { getEnv } from "@/lib/utils";
import { NextResponse } from "next/server";

const VIDEO_STREAM_BASE_URL = BUNNY.STREAM_BASE_URL;
const BUNNY_LIBRARY_ID = getEnv("BUNNY_LIBRARY_ID");
const STREAMACCESSKEY = getEnv("BUNNY_STREAM_ACCESS_KEY");

export async function POST(req: Request) {
    const form = await req.formData();
    const file = form.get('file') as File;
    const videoId = form.get('videoId') as string;

    const uploadUrl = `${VIDEO_STREAM_BASE_URL}/${BUNNY_LIBRARY_ID}/videos/${videoId}`;

    const uploadRes = await fetch(uploadUrl, {
        method: 'PUT',
        headers: {
            AccessKey: STREAMACCESSKEY,
            "Content-Type": "application/octet-stream"
        }, 
        body: file
    });

    if (!uploadRes.ok) {
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    };
    return NextResponse.json({ success: true, videoId });
}