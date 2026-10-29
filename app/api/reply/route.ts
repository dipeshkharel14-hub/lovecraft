import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { admin } from "@/lib/admin";
import { SITE } from "@/lib/site";
export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export async function POST(req: NextRequest) {
  const { page_id, reaction, text, voice_url } = await req.json().catch(() => ({} as any));
  const voice = typeof voice_url === "string" && voice_url.startsWith("https://res.cloudinary.com/") ? voice_url : null;
  if (!page_id || (!reaction && !text && !voice)) return NextResponse.json({ error: "Invalid" }, { status: 400 });
  const db = admin();
  const { data: page } = await db.from("pages").select("title,user_id").eq("id", page_id).single();
  if (!page) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const { error: insErr } = await db.from("replies").insert({ page_id, reaction, voice_url: voice, text: String(text || "").slice(0, 2000) });
  if (insErr) return NextResponse.json({ error: insErr.message }, { status: 500 });
  const { data: u } = await db.auth.admin.getUserById(page.user_id);
  if (u.user?.email) {
    try { await new Resend(process.env.RESEND_API_KEY).emails.send({ from: "LoveCraft <onboarding@resend.dev>", to: u.user.email, subject: `💌 New reply on "${page.title}"`, html: `<p><a href="${SITE}/dashboard">Open your dashboard</a></p><p>${reaction || ""} ${String(text || "").replace(/</g, "&lt;")}</p>` }); } catch {}
  }
  return NextResponse.json({ ok: true });
}
