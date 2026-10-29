"use client";
import { useEffect, useState } from "react";
import PageView, { PageData } from "@/components/PageView";
export default function Public({ params }: { params: { slug: string } }) {
  const [data, setData] = useState<PageData | null>(null); const [status, setStatus] = useState("loading"); const [pw, setPw] = useState("");
  const load = async (p = "") => {
    const r = await fetch(`/api/page/${params.slug}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ pw: p }) });
    if (r.ok) { setData(await r.json()); setStatus("ok"); } else if (r.status === 401) setStatus("locked"); else if (r.status === 410) setStatus("expired"); else setStatus("missing");
  };
  useEffect(() => { load(); }, []);
  if (status === "loading") return <p className="p-10 text-center">💗</p>;
  if (status === "expired") return <p className="p-10 text-center font-serif text-2xl">This page has expired.</p>;
  if (status === "missing") return <p className="p-10 text-center font-serif text-2xl">Page not found.</p>;
  if (status === "locked") return (<main className="min-h-screen grid place-items-center p-5"><div className="card space-y-3 w-full max-w-sm text-center"><p className="font-serif text-2xl">🔒 This page is private</p>
    <input className="input" type="password" placeholder="Password" value={pw} onChange={e => setPw(e.target.value)} /><button className="btn w-full" onClick={() => load(pw)}>Open</button></div></main>);
  return <main className="max-w-xl mx-auto p-4"><PageView data={data!} interactive /></main>;
}
