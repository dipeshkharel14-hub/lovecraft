"use client";
import { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import { Gift, Mic, Send } from "lucide-react";
import { templates } from "@/lib/templates";
import { usePrefs } from "@/lib/i18n";
export type Quiz = { q: string; options: string[]; answer: number };
export type PageData = { id?: string; template: string; title: string; message: string; recipient?: string; sender_name?: string; media: { url: string; type: string }[]; music_url?: string | null; card_style?: string; quiz?: Quiz | null; secret?: string | null; countdown_at?: string | null };
const RX = ["❤️", "😍", "🥹", "😂", "🙏", "💍"];
export default function PageView({ data, interactive = false }: { data: PageData; interactive?: boolean }) {
  const { t } = usePrefs();
  const [typed, setTyped] = useState(""); const [open, setOpen] = useState(false); const [secret, setSecret] = useState(false);
  const [pick, setPick] = useState<number | null>(null); const [now, setNow] = useState(Date.now());
  const [reaction, setReaction] = useState(""); const [text, setText] = useState(""); const [sent, setSent] = useState(false);
  const [recording, setRecording] = useState(false); const [voice, setVoice] = useState(""); const mr = useRef<MediaRecorder | null>(null);
  const reveal = templates.find(x => x.id === data.template)?.reveal;
  useEffect(() => { setTyped(""); let i = 0; const id = setInterval(() => { i++; setTyped(data.message.slice(0, i)); if (i >= data.message.length) clearInterval(id); }, 35); return () => clearInterval(id); }, [data.message]);
  useEffect(() => { if (!data.countdown_at) return; const id = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(id); }, [data.countdown_at]);
  const boom = () => confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
  const left = data.countdown_at ? new Date(data.countdown_at).getTime() - now : 0;
  const cd = (n: number, u: string) => <span className="px-2"><b className="text-2xl">{n}</b><small className="block">{u}</small></span>;
  const toggleRec = async () => {
    if (recording) { mr.current?.stop(); return; }
    const st = await navigator.mediaDevices.getUserMedia({ audio: true }); const chunks: Blob[] = []; const r = new MediaRecorder(st);
    r.ondataavailable = e => chunks.push(e.data);
    r.onstop = async () => { st.getTracks().forEach(x => x.stop()); setRecording(false);
      const s = await (await fetch("/api/sign")).json(); const fd = new FormData();
      fd.append("file", new Blob(chunks, { type: "audio/webm" })); fd.append("api_key", s.apiKey); fd.append("timestamp", s.timestamp); fd.append("signature", s.signature); fd.append("folder", "lovecraft");
      const j = await (await fetch(`https://api.cloudinary.com/v1_1/${s.cloudName}/auto/upload`, { method: "POST", body: fd })).json(); if (j.secure_url) setVoice(j.secure_url); };
    r.start(); mr.current = r; setRecording(true);
  };
  const reply = async () => { await fetch("/api/reply", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ page_id: data.id, reaction, text, voice_url: voice }) }); setSent(true); };
  return (<div className={`stage cs-${data.card_style || "glass"}`}>
    {Array.from({ length: 10 }).map((_, i) => <span key={i} className="heart" style={{ left: `${i * 10}%`, fontSize: 14 + (i % 4) * 8, animationDuration: `${7 + (i % 5)}s`, animationDelay: `${i * 0.7}s` }}>♥</span>)}
    <div className="relative">
      {data.recipient && <p style={{ color: "var(--h)" }}>{t("for")} {data.recipient}</p>}
      <h3>{data.title || "♥"}</h3>
      {data.countdown_at && <div className="my-3">{left > 0 ? <>{cd(Math.floor(left / 864e5), "d")}{cd(Math.floor(left / 36e5) % 24, "h")}{cd(Math.floor(left / 6e4) % 60, "m")}{cd(Math.floor(left / 1e3) % 60, "s")}</> : <span className="text-2xl">🎉</span>}</div>}
      <p className="text-lg leading-relaxed whitespace-pre-line min-h-[6rem]">{typed}<span className="animate-pulse">|</span></p>
      {reveal && (open ? <p className="mt-4 text-5xl">{reveal}</p> : <button onClick={() => { setOpen(true); boom(); }} className="btn mt-4"><Gift size={18} /> {t("tap")}</button>)}
      {data.secret && (secret ? <p className="mt-4 italic">“{data.secret}”</p> : <button className="btn-ghost mt-4" onClick={() => { setSecret(true); boom(); }}>{t("reveal")}</button>)}
      {data.quiz && data.quiz.options.length > 1 && <div className="mt-6"><p className="font-medium mb-2">{data.quiz.q}</p><div className="flex gap-2 justify-center flex-wrap">{data.quiz.options.map((o, i) => <button key={i} className="chip" onClick={() => { setPick(i); if (i === data.quiz!.answer) boom(); }}>{o}</button>)}</div>{pick !== null && <p className="mt-2">{pick === data.quiz.answer ? t("correct") : t("tryagain")}</p>}</div>}
      <div className="grid gap-3 mt-6">{data.media.map((m, i) => m.type === "video" ? <video key={i} src={m.url} controls className="rounded-2xl w-full" /> : <img key={i} src={m.url} alt="" className="rounded-2xl w-full" />)}</div>
      {data.music_url && <audio src={data.music_url} controls loop className="mt-6 mx-auto" />}
      {data.sender_name && <p className="serif mt-8 text-xl" style={{ color: "var(--h)" }}>{t("wl")} {data.sender_name}</p>}
      {interactive && <div className="card mt-8 text-start" style={{ color: "var(--ink)" }}>{sent ? <p className="text-center">{t("sent")}</p> : <>
        <p className="font-medium mb-2">{t("reply")}</p>
        <div className="flex gap-2 mb-3 flex-wrap">{RX.map(r => <button key={r} onClick={() => setReaction(r)} className={`text-2xl p-2 rounded-full ${reaction === r ? "bg-white/60" : ""}`}>{r}</button>)}</div>
        <textarea className="input" rows={3} placeholder={t("write")} value={text} onChange={e => setText(e.target.value)} />
        <div className="flex gap-2 items-center flex-wrap"><button className="btn-ghost" onClick={toggleRec}><Mic size={16} /> {recording ? t("rec") : t("voice")}</button>{voice && <audio src={voice} controls />}
          <button className="btn" disabled={!reaction && !text && !voice} onClick={reply}><Send size={16} /> {t("send")}</button></div></>}</div>}
    </div></div>);
}
