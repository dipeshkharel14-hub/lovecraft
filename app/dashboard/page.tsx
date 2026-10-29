"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Copy, Eye, MessageCircle, Trash2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { usePrefs } from "@/lib/i18n";
import { SITE } from "@/lib/site";
export default function Dashboard() {
  const { t } = usePrefs(); const [pages, setPages] = useState<any[]>([]); const [replies, setReplies] = useState<any[]>([]); const [toast, setToast] = useState("");
  const load = async () => {
    const { data: { session } } = await supabase.auth.getSession(); if (!session) { window.location.href = "/login"; return; }
    setPages((await supabase.from("pages").select("*").order("created_at", { ascending: false })).data || []);
    setReplies((await supabase.from("replies").select("*").order("created_at", { ascending: false })).data || []);
  };
  useEffect(() => {
    load();
    const ch = supabase.channel("replies").on("postgres_changes", { event: "INSERT", schema: "public", table: "replies" }, (p: any) => { setReplies(r => [p.new, ...r]); setToast(`${t("notif")} ${p.new.reaction || ""}`); setTimeout(() => setToast(""), 5000); }).subscribe();
    return () => { supabase.removeChannel(ch); };
  }, []);
  const del = async (id: string) => { await supabase.from("pages").delete().eq("id", id); setPages(p => p.filter(x => x.id !== id)); };
  return (<main className="max-w-3xl mx-auto p-5">
    {toast && <div className="fixed top-20 right-4 card z-50">{toast}</div>}
    <div className="flex justify-between items-center mb-6"><h1 className="serif text-3xl ta2">{t("yp")}</h1><div className="flex gap-2"><Link href="/create" className="btn">{t("np")}</Link><button className="btn-ghost" onClick={async () => { await supabase.auth.signOut(); window.location.href = "/"; }}>↩</button></div></div>
    <div className="space-y-4">{pages.map(p => { const rs = replies.filter(r => r.page_id === p.id); return (
      <div key={p.id} className="card"><div className="flex justify-between gap-3 flex-wrap"><div><a className="font-medium ta2" href={`/p/${p.slug}`} target="_blank">{p.title}</a><p className="text-sm mute">{t("for")} {p.recipient} · {p.card_style}</p></div>
        <div className="flex gap-3 text-sm items-center"><span className="flex gap-1"><Eye size={16} />{p.views}</span><span className="flex gap-1"><MessageCircle size={16} />{rs.length}</span>
          <button title={t("copy")} onClick={() => navigator.clipboard.writeText(`${SITE}/p/${p.slug}`)}><Copy size={16} /></button><button title={t("del")} onClick={() => del(p.id)}><Trash2 size={16} /></button></div></div>
        {rs.map(r => <div key={r.id} className="mt-2 text-sm bg-white/40 rounded-xl p-2">{r.reaction} {r.text}{r.voice_url && <audio className="mt-1" src={r.voice_url} controls />}</div>)}</div>); })}</div></main>);
}
