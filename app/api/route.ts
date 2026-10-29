import { NextResponse } from "next/server";
import crypto from "crypto";
export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export async function GET() {
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const signature = crypto.createHash("sha1").update(`folder=lovecraft&timestamp=${timestamp}${process.env.CLOUDINARY_API_SECRET}`).digest("hex");
  return NextResponse.json({ timestamp, signature, apiKey: process.env.CLOUDINARY_API_KEY, cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME });
}
