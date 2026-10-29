"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";
import { supabase } from "@/lib/supabase";
import { templates, STYLES } from "@/lib/templates";
import { usePrefs, tname, ttext } from "@/lib/i18n";
import PageView from "@/components/PageView";
import { SITE } from "@/lib/site";
function Creator() {
  const sp = useSearchParams(); const { t, lang } = usePrefs();
  const [step, setStep] = useState(sp.get("t") ? 2 : 1);
  const [f, setF] = useState<any>({ template: sp.get("t") || "custom", title: "", message: "", recipient: "", sender_name: "", music_url: "", password: "", expires_at: "", card_style: "glass", secret: "", quizQ: "", quizO: "", quizA: "1", countdown_at: "" });
  const [media, setMedia] = useState<{ url: string; type: string }[]>([]);
  const [busy, setBusy] = useState(false); const [link, setLink] = useState(""); const [err, setErr] = useState("");
  const pick = (id: string) => { const d = ttext(lang, id); setF((p: any) => ({ ...p, template: id, title: d[0], message: d[1] })); };
  useEffect(() => { if (sp.get("t")) pick(sp.get("t")!); }, [lang]);
  const set = (k: string) => (e: any) => setF({ ...f, [k]: e.target.value });
  const quiz = f.quizQ && f.quizO ? { q: f.quizQ, options: f.quizO.split(",").map((s: string) => s.trim()).filter(Boolean), answer: Math.max(0, (+f.quizA || 1) - 1) } : null;
  const iso = (v: string) => (v ? new Date(v).toISOString() : null);
  const upload = async (file: File) => {
    setBusy(true); const s = await (await fetch("/api/sign")).json(); const fd = new FormData();
    fd.append("file", file); fd.append("api_key", s.apiKey); fd.append("timestamp", s.timestamp); fd.append("signature", s.signature); fd.append("folder", "lovecraft");
    const r = await (await fetch(`https://api.cloudinary.com/v1_1/${s.cloudName}/auto/upload`, { method: "POST", body: fd })).json();
    if (r.secure_url) setMedia(m => [...m, { url: r.secure_url, type: r.resource_type }]); else setErr("Upload failed"); setBusy(false);
  };
  const publish = async () => {
    setBusy(true); setErr(""); const { data: { session } } = await supabase.auth.getSession();
    if (!session) { window.location.href = "/login"; return; }
    const res = await fetch("/api/pages", { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${session.access_token}` }, body: JSON.stringify({ ...f, media, quiz, expires_at: iso(f.expires_at), countdown_at: iso(f.countdown_at) }) });
    const j = await res.json(); setBusy(false); if (j.slug) setLink(`${SITE}/p/${j.slug}`); else setErr(j.error || "Failed");
  };
  const dlQR = () => {
    const svg = document.querySelector("#qrbox svg") as SVGSVGElement | null; if (!svg) return;
    const img = new Image();
    img.onload = () => { const c = document.createElement("canvas"); c.width = c.height = 600; const x = c.getContext("2d")!; x.fillStyle = "#fff"; x.fillRect(0, 0, 600, 600); x.drawImage(img, 30, 30, 540, 540); const a = document.createElement("a"); a.download = "lovecraft-qr.png"; a.href = c.toDataURL("image/png"); a.click(); };
    img.src = "data:image/svg+xml;base64," + btoa(new XMLSerializer().serializeToString(svg));
  };
  if (link) return (<main className="max-w-md mx-auto p-6 text-center"><div className="card space-y-4"><h1 className="serif text-3xl ta2">{t("ready")}</h1>
    <input className="input" readOnly value={link} onFocus={e => e.target.select()} /><div id="qrbox" className="flex justify-center bg-white p-3 rounded-2xl w-fit mx-auto"><QRCodeSVG value={link} size={170} /></div>
    <div className="flex gap-2 justify-center flex-wrap">
      <a className="btn-ghost" target="_blank" href={`https://wa.me/?text=${encodeURIComponent(link)}`}>WhatsApp</a>
      <a className="btn-ghost" target="_blank" href={`https://t.me/share/url?url=${encodeURIComponent(link)}`}>Telegram</a>
      <a className="btn-ghost" target="_blank" href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}`}>Facebook</a>
      <button className="btn-ghost" onClick={dlQR}>Download QR</button>
      <button className="btn-ghost" onClick={() => navigator.clipboard.writeText(link)}>{t("copy")} (Instagram)</button></div>
    <a href="/dashboard" className="btn">{t("n4")}</a></div></main>);
  return (<main className="max-w-6xl mx-auto p-5 grid md:grid-cols-2 gap-6">
    <div className="card space-y-3"><p className="text-sm ta2">{t("step")} {step} / 4</p>
      {step === 1 && <div className="grid grid-cols-2 gap-3">{templates.map((x, i) => <button key={x.id} onClick={() => { pick(x.id); setStep(2); }} className={`card text-center text-sm ${f.template === x.id ? "ring-2 ring-[var(--a)]" : ""}`}><div className="text-3xl">{x.emoji}</div>{tname(lang, i)}</button>)}</div>}
      {step === 2 && <><input className="input" placeholder={t("to")} value={f.recipient} onChange={set("recipient")} /><input className="input" placeholder={t("title")} value={f.title} onChange={set("title")} />
        <textarea className="input" rows={6} placeholder={t("msg")} value={f.message} onChange={set("message")} /><input className="input" placeholder={t("from")} value={f.sender_name} onChange={set("sender_name")} /></>}
      {step === 3 && <><p className="text-sm mute">{t("cs")}</p><div className="flex gap-2 flex-wrap">{STYLES.map(([s, e]) => <button key={s} className={`chip ${f.card_style === s ? "on" : ""}`} onClick={() => setF({ ...f, card_style: s })}>{e} {s}</button>)}</div>
        <input className="input" placeholder={t("secret")} value={f.secret} onChange={set("secret")} />
        <input className="input" placeholder={t("quizq")} value={f.quizQ} onChange={set("quizQ")} /><input className="input" placeholder={t("quizo")} value={f.quizO} onChange={set("quizO")} /><input className="input" type="number" min={1} placeholder={t("quiza")} value={f.quizA} onChange={set("quizA")} />
        <label className="text-sm mute">{t("cd")}</label><input className="input" type="datetime-local" value={f.countdown_at} onChange={set("countdown_at")} /></>}
      {step === 4 && <><label className="text-sm mute">{t("media")}</label><input type="file" accept="image/*,video/*" onChange={e => e.target.files?.[0] && upload(e.target.files[0])} />
        <input className="input" placeholder={t("music")} value={f.music_url} onChange={set("music_url")} /><input className="input" placeholder={t("pw")} value={f.password} onChange={set("password")} />
        <label className="text-sm mute">{t("exp")}</label><input className="input" type="datetime-local" value={f.expires_at} onChange={set("expires_at")} /></>}
      {err && <p className="text-red-600 text-sm">{err}</p>}
      <div className="flex justify-between pt-2">{step > 1 ? <button className="btn-ghost" onClick={() => setStep(step - 1)}>{t("back")}</button> : <span />}
        {step > 1 && step < 4 && <button className="btn" onClick={() => setStep(step + 1)}>{t("next")}</button>}{step === 4 && <button className="btn" disabled={busy} onClick={publish}>{busy ? "..." : t("pub")}</button>}</div></div>
    <div><p className="text-sm ta2 mb-2">{t("preview")}</p><PageView data={{ ...f, media, quiz }} /></div></main>);
}
export default function Create() { return <Suspense><Creator /></Suspense>; }
