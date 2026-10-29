import type { Config } from "tailwindcss";
export default { content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: { colors: { rose: { 50:"#fff1f3",100:"#ffe4e8",400:"#fb7185",500:"#f43f5e",600:"#e11d48",700:"#be123c" } }, fontFamily: { serif: ["Georgia","serif"] } } },
  plugins: [] } satisfies Config;
