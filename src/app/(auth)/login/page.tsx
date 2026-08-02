"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Role } from "@/types";
import { toast } from "sonner";
import { Lock, Mail, ShieldAlert } from "lucide-react";

export default function LoginPage() {
  const router = Router();
  const { login } = useAuth();
  const [email, setEmail] = useState("tenant@rentnest.com");
  const [password, setPassword] = useState("password123");
  const [role, setRole] = useState<Role>("Tenant");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    login(email, role);
    toast.success(`Logged in successfully as ${role}`);

    if (role === "Tenant") router.push("/dashboard/tenant");
    else if (role === "Landlord") router.push("/dashboard/landlord");
    else if (role === "Admin") router.push("/dashboard/admin");
  };

  const handleQuickAdmin = () => {
    setEmail("admin@rentnest.com");
    setPassword("admin123");
    setRole("Admin");
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm max-w-md w-full space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900">Sign In to RentNest</h1>
          <p className="text-xs text-slate-500 mt-1">Select your role and enter credentials</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Account Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as Role)}
              className="w-full p-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Tenant">Tenant (Rent Properties)</option>
              <option value="Landlord">Landlord (List Properties)</option>
              <option value="Admin">Admin (Moderation)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl transition-all text-sm shadow-sm"
          >
            Sign In
          </button>
        </form>

        <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
          <button
            type="button"
            onClick={handleQuickAdmin}
            className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-amber-600" /> Load Working Admin Credentials
          </button>
        </div>
      </div>
    </div>
  );
}

