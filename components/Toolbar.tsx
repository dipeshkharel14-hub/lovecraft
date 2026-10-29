"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart } from "lucide-react";
import { usePrefs, TH } from "@/lib/i18n";
import { L } from "@/lib/i18n-data";
export default function Toolbar() {
  const { lang, setLang, theme, setTheme, t } = usePrefs(); const path = usePathname();
  return (<div className="bar"><Link href="/" className="serif text-xl font-bold ta2 flex gap-2 items-center"><Heart size={20} fill="currentColor" /> LoveCraft</Link>
    {!path.startsWith("/p/") && <div className="flex gap-4 text-sm"><Link href="/create">{t("n2")}</Link><Link href="/dashboard">{t("n4")}</Link></div>}
    <div className="flex gap-2 items-center">{TH.map(([n, c]) => <button key={n} title={n} aria-label={n} className={`dot ${theme === n ? "on" : ""}`} style={{ background: c }} onClick={() => setTheme(n)} />)}
      <select className="sel" value={lang} onChange={e => setLang(e.target.value)} aria-label="Language">{Object.keys(L).map(k => <option key={k} value={k}>{L[k].n}</option>)}</select></div></div>);
}
