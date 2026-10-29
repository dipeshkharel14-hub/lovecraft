import "./globals.css";
import { Prefs } from "@/lib/i18n";
import Toolbar from "@/components/Toolbar";
import { SITE } from "@/lib/site";
export const metadata = { metadataBase: new URL(SITE), openGraph: { title: "LoveCraft", description: "A page for every chapter of love.", url: SITE }, title: "LoveCraft: craft a page for every chapter of love", description: "Create interactive romantic pages and share them privately." };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><head><meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700&family=Poppins:wght@300;400;500&family=Noto+Sans+Devanagari:wght@400;600&family=Noto+Sans+JP:wght@400;700&family=Noto+Sans+SC:wght@400;700&family=Noto+Naskh+Arabic:wght@400;700&display=swap" /></head>
    <body><Prefs><Toolbar />{children}</Prefs></body></html>);
}
