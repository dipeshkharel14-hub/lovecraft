# LoveCraft (relationshipletter.vercel.app)
1. Local: `npm install` then `npm run dev`.
2. Supabase SQL Editor: run `supabase/schema.sql` (or `supabase/upgrade.sql` if you already ran an older version).
3. Supabase > Auth > URL Configuration: set Site URL to `https://relationshipletter.vercel.app` and add Redirect URLs `https://relationshipletter.vercel.app/dashboard` and `http://localhost:3000/dashboard`. Enable Email and Google providers.
4. GitHub: `git init && git add . && git commit -m "LoveCraft" && git branch -M main && git remote add origin <repo-url> && git push -u origin main` (`.env.local` is gitignored).
5. Vercel: import the repo, add every variable from `.env.example` (including `NEXT_PUBLIC_SITE_URL=https://relationshipletter.vercel.app`) under Settings > Environment Variables, then redeploy.
6. Resend: `onboarding@resend.dev` only delivers to your own Resend account email; verify a domain for real notifications.
Share links and QR codes are generated from `NEXT_PUBLIC_SITE_URL`.
