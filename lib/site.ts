const raw = (process.env.NEXT_PUBLIC_SITE_URL || "").trim() || "https://relationshipletter.vercel.app";
export const SITE = (/^https?:\/\//i.test(raw) ? raw : `https://${raw}`).replace(/\/$/, "");
