"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { Building2, Lock, Mail, ArrowRight, UserCheck, Shield, KeyRound } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async (e?: React.FormEvent, customEmail?: string, customPass?: string) => {
    if (e) e.preventDefault();
    const loginEmail = customEmail || email;
    const loginPass = customPass || password;

    if (!loginEmail || !loginPass) {
      toast.error("Please provide both email and password.");
      return;
    }

    setLoading(true);
    const res = await login(loginEmail, loginPass);
    setLoading(false);

    if (res.success) {
      toast.success("Login successful! Redirecting to dashboard...");
      const cleanEmail = loginEmail.trim().toLowerCase();
      if (cleanEmail.includes("admin")) router.push("/dashboard/admin");
      else if (cleanEmail.includes("landlord")) router.push("/dashboard/landlord");
      else router.push("/dashboard/tenant");
    } else {
      toast.error(res.message || "Failed to log in.");
    }
  };

  const directDemoLogin = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    handleLogin(undefined, demoEmail, demoPass);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm max-w-md w-full space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex bg-blue-600 text-white p-3 rounded-2xl">
            <Building2 className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Welcome Back</h1>
          <p className="text-sm text-slate-500">Sign in to manage your rentals & properties</p>
        </div>

        {/* Demo Fast Login Buttons */}
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 text-center">One-Click Demo Access</p>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => directDemoLogin("tenant@rentnest.com", "tenant123")}
              className="py-2 px-3 bg-slate-50 hover:bg-blue-50 hover:text-blue-600 border border-slate-200 rounded-xl text-xs font-semibold transition flex flex-col items-center gap-1"
            >
              <UserCheck className="w-4 h-4 text-blue-500" />
              Tenant
            </button>
            <button
              type="button"
              onClick={() => directDemoLogin("landlord@rentnest.com", "landlord123")}
              className="py-2 px-3 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 border border-slate-200 rounded-xl text-xs font-semibold transition flex flex-col items-center gap-1"
            >
              <Building2 className="w-4 h-4 text-indigo-500" />
              Landlord
            </button>
            <button
              type="button"
              onClick={() => directDemoLogin("admin@rentnest.com", "admin123")}
              className="py-2 px-3 bg-slate-50 hover:bg-emerald-50 hover:text-emerald-600 border border-slate-200 rounded-xl text-xs font-semibold transition flex flex-col items-center gap-1"
            >
              <Shield className="w-4 h-4 text-emerald-500" />
              Admin
            </button>
          </div>
        </div>

        <div className="relative flex py-1 items-center">
          <div className="flex-grow border-t border-slate-200"></div>
          <span className="flex-shrink mx-4 text-xs uppercase text-slate-400 font-medium">Or enter credentials</span>
          <div className="flex-grow border-t border-slate-200"></div>
        </div>

        {/* Manual Form (Always Blank by Default) */}
        <form onSubmit={(e) => handleLogin(e)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                autoComplete="off"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl text-sm transition flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center">
          <p className="text-sm text-slate-500">
            Don't have an account?{" "}
            <Link href="/register" className="text-blue-600 font-semibold hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
