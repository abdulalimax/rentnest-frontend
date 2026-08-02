"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserRole } from "@/types";
import { toast } from "sonner";
import { Home, ArrowRight, ShieldCheck, UserCheck, Shield } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<UserRole>("TENANT");
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleQuickLogin = (selectedRole: UserRole) => {
    let email = "tenant@rentnest.com";
    if (selectedRole === "LANDLORD") email = "landlord@rentnest.com";
    if (selectedRole === "ADMIN") email = "admin@rentnest.com";

    setRole(selectedRole);
    setFormData({ email, password: "password123" });
    toast.info(`Pre-filled credentials for ${selectedRole}`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      toast.success(`Logged in as ${role}! Redirecting...`);
      setTimeout(() => {
        if (role === "TENANT") router.push("/dashboard/tenant");
        else if (role === "LANDLORD") router.push("/dashboard/landlord");
        else router.push("/dashboard/admin");
      }, 1000);
    } catch (err) {
      toast.error("Invalid credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center gap-2 text-2xl font-bold text-slate-900 mb-2">
          <Home className="w-7 h-7 text-blue-600" />
          <span>Rent<span className="text-blue-600">Nest</span></span>
        </Link>
        <h2 className="text-2xl font-extrabold text-slate-900">Welcome Back</h2>
        <p className="mt-1 text-xs text-slate-500">Sign in to access your dashboard</p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-sm border border-slate-200 sm:rounded-2xl sm:px-10 space-y-6">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">Select Account Role:</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickLogin("TENANT")}
                className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1 transition-all ${
                  role === "TENANT"
                    ? "border-blue-600 bg-blue-50 text-blue-700 shadow-sm"
                    : "border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                <UserCheck className="w-4 h-4" /> Tenant
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin("LANDLORD")}
                className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1 transition-all ${
                  role === "LANDLORD"
                    ? "border-blue-600 bg-blue-50 text-blue-700 shadow-sm"
                    : "border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                <ShieldCheck className="w-4 h-4" /> Landlord
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin("ADMIN")}
                className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1 transition-all ${
                  role === "ADMIN"
                    ? "border-blue-600 bg-blue-50 text-blue-700 shadow-sm"
                    : "border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                <Shield className="w-4 h-4" /> Admin
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="you@example.com"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Password</label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition-all disabled:opacity-50"
            >
              {loading ? "Signing In..." : "Sign In"} <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="text-center pt-2">
            <p className="text-xs text-slate-500">
              Don't have an account?{" "}
              <Link href="/register" className="font-semibold text-blue-600 hover:underline">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}