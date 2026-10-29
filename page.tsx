"use client";
import Link from "next/link";
import { templates } from "@/lib/templates";
import { usePrefs, tname } from "@/lib/i18n";
export default function Home() {
  const { t, lang } = usePrefs();
  return (<main className="max-w-5xl mx-auto px-5 pb-16">
    <section className="text-center py-16"><p className="tracking-widest text-sm ta2 mb-4">{t("tag")}</p>
      <h1 className="serif text-4xl md:text-6xl leading-tight" dangerouslySetInnerHTML={{ __html: t("h1") }} />
      <p className="mute mt-6 text-lg max-w-xl mx-auto">{t("sub")}</p><Link href="/create" className="btn mt-8">{t("cta")}</Link></section>
    <div className="grid md:grid-cols-3 gap-4 mb-10">{["f1", "f2", "f3"].map(k => <div key={k} className="card"><b className="font-medium">{t(k + "t")}</b><p className="mute text-sm mt-1">{t(k + "d")}</p></div>)}</div>
    <h2 className="serif text-3xl text-center mb-6">{t("pick")}</h2>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">{templates.map((x, i) => <Link key={x.id} href={`/create?t=${x.id}`} className="card text-center text-sm hover:-translate-y-1 transition"><div className="text-4xl mb-2">{x.emoji}</div>{tname(lang, i)}</Link>)}</div></main>);
}
