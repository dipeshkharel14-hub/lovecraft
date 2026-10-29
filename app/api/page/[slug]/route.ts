import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { admin } from "@/lib/admin";
export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export async function POST(req: NextRequest, { params }: { params: { slug: string } }) {
  const { pw } = await req.json().catch(() => ({ pw: "" }));
  const db = admin(); const { data: p } = await db.from("pages").select("*").eq("slug", params.slug).single();
  if (!p) return NextResponse.json({}, { status: 404 });
  if (p.expires_at && new Date(p.expires_at) < new Date()) return NextResponse.json({}, { status: 410 });
  if (p.password_hash) {
    const [s, h] = p.password_hash.split(":");
    const ok = pw && crypto.timingSafeEqual(Buffer.from(h, "hex"), crypto.scryptSync(pw, s, 32));
    if (!ok) return NextResponse.json({}, { status: 401 });
  }
  await db.from("pages").update({ views: p.views + 1 }).eq("id", p.id);
  const { password_hash, user_id, ...pub } = p;
  return NextResponse.json(pub);
}
