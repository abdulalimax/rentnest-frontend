"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { Building2, Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in both email and password.");
      return;
    }

    setLoading(true);
    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      toast.success("Login successful! Redirecting to dashboard...");
      const cleanEmail = email.trim().toLowerCase();
      if (cleanEmail.includes("admin")) router.push("/dashboard/admin");
      else if (cleanEmail.includes("landlord")) router.push("/dashboard/landlord");
      else router.push("/dashboard/tenant");
    } else {
      toast.error(res.message || "Failed to log in.");
    }
  };

  const setDemoAccount = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm max-w-md w-full space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex bg-blue-600 text-white p-3 rounded-2xl">
            <Building2 className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Sign in to RentNest</h1>
          <p className="text-xs text-slate-500">Enter your verified credentials to access your portal</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@rentnest.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl text-sm transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Sign In"} <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="border-t border-slate-100 pt-4">
          <p className="text-xs font-semibold text-slate-600 mb-2 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" /> Quick Demo Login (1-Click Fill):
          </p>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setDemoAccount("tenant@rentnest.com", "tenant123")}
              className="px-2 py-1.5 bg-slate-50 hover:bg-blue-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 hover:text-blue-600 transition-colors text-center"
            >
              Tenant
            </button>
            <button
              type="button"
              onClick={() => setDemoAccount("landlord@rentnest.com", "landlord123")}
              className="px-2 py-1.5 bg-slate-50 hover:bg-blue-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 hover:text-blue-600 transition-colors text-center"
            >
              Landlord
            </button>
            <button
              type="button"
              onClick={() => setDemoAccount("admin@rentnest.com", "admin123")}
              className="px-2 py-1.5 bg-slate-50 hover:bg-blue-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 hover:text-blue-600 transition-colors text-center"
            >
              Admin
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-slate-500">
          Do not have an account?{" "}
          <Link href="/register" className="text-blue-600 font-semibold hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
