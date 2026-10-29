"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { L, N } from "./i18n-data";
import { templates } from "./templates";
const EXTRA: Record<string, string> = { cs: "Card style", secret: "Secret message (tap to reveal)", quizq: "Quiz question (optional)", quizo: "Options, comma separated", quiza: "Correct option number", cd: "Countdown date (optional)", voice: "Record voice note", rec: "Recording... tap to stop", correct: "Correct 💖", tryagain: "Try again", reveal: "Tap to reveal a secret", copy: "Copy link", del: "Delete", step: "Step", media: "Photos and videos" };
export const TH: [string, string][] = [["rose", "#f43f5e"], ["lavender", "#8b5cf6"], ["peach", "#fb923c"], ["ocean", "#0ea5e9"], ["sage", "#22c55e"], ["night", "#1a1033"]];
const Ctx = createContext<any>(null);
export function Prefs({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState("en"); const [theme, setTheme] = useState("rose");
  useEffect(() => { try { setLang(localStorage.getItem("lc_lang") || "en"); setTheme(localStorage.getItem("lc_theme") || "rose"); } catch {} }, []);
  useEffect(() => { const d = document.documentElement; d.lang = lang; d.dir = lang === "ar" ? "rtl" : "ltr"; d.dataset.theme = theme; try { localStorage.setItem("lc_lang", lang); localStorage.setItem("lc_theme", theme); } catch {} }, [lang, theme]);
  const t = (k: string) => L[lang]?.[k] ?? EXTRA[k] ?? L.en[k] ?? k;
  return <Ctx.Provider value={{ lang, setLang, theme, setTheme, t }}>{children}</Ctx.Provider>;
}
export const usePrefs = () => useContext(Ctx);
export const tname = (lang: string, i: number) => N[lang]?.names[i] || templates[i].name;
export const ttext = (lang: string, id: string): [string, string] => { const x = N[lang]?.t[id]; const d = templates.find(t => t.id === id)!; return [x?.[0] ?? d.title, x?.[1] ?? d.message]; };
