import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { admin } from "@/lib/admin";
export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export async function POST(req: NextRequest) {
  const token = req.headers.get("authorization")?.replace("Bearer ", "") || "";
  const db = admin(); const { data: { user } } = await db.auth.getUser(token);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const b = await req.json().catch(() => ({} as any));
  if (!b.title || !b.message) return NextResponse.json({ error: "Title and message are required" }, { status: 400 });
  const slug = crypto.randomBytes(6).toString("base64url");
  let ph: string | null = null;
  if (b.password) { const s = crypto.randomBytes(8).toString("hex"); ph = `${s}:${crypto.scryptSync(b.password, s, 32).toString("hex")}`; }
  const { error } = await db.from("pages").insert({ user_id: user.id, slug, template: b.template, title: b.title, message: b.message, recipient: b.recipient, sender_name: b.sender_name, media: b.media || [], music_url: b.music_url || null, password_hash: ph, expires_at: b.expires_at || null, card_style: b.card_style || "glass", quiz: b.quiz || null, secret: b.secret || null, countdown_at: b.countdown_at || null });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ slug });
}
