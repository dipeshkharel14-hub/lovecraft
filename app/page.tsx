"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
export default function Login() {
  const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [msg, setMsg] = useState("");
  const go = () => (window.location.href = "/dashboard");
  const signIn = async () => { const { error } = await supabase.auth.signInWithPassword({ email, password }); error ? setMsg(error.message) : go(); };
  const signUp = async () => { const { error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: location.origin + "/dashboard" } }); setMsg(error ? error.message : "Check your email to confirm your account."); };
  const google = () => supabase.auth.signInWithOAuth({ provider: "google", options: { redirectTo: location.origin + "/dashboard" } });
  return (<main className="min-h-screen grid place-items-center p-5"><div className="card w-full max-w-sm space-y-3">
    <h1 className="font-serif text-3xl text-rose-700 text-center">Welcome to LoveCraft</h1>
    <input className="input" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
    <input className="input" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
    <button className="btn w-full" onClick={signIn}>Sign in</button>
    <button className="btn-ghost w-full justify-center" onClick={signUp}>Create account</button>
    <button className="btn-ghost w-full justify-center" onClick={google}>Continue with Google</button>
    {msg && <p className="text-sm text-center text-rose-600">{msg}</p>}</div></main>);
}
