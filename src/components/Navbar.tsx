"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Building2, Home, Search, LayoutDashboard, LogOut, ShieldCheck, User as UserIcon } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout, isLoading } = useAuth();

  const getDashboardUrl = () => {
    if (!user) return "/login";
    return `/dashboard/${user.role}`;
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-blue-600 text-white p-2 rounded-xl">
              <Building2 className="w-5 h-5" />
            </div>
            <span className="text-xl font-black tracking-tight text-slate-900">
              Rent<span className="text-blue-600">Nest</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
                pathname === "/" ? "text-blue-600" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Home className="w-4 h-4" /> Home
            </Link>
            <Link
              href="/properties"
              className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
                pathname.startsWith("/properties") ? "text-blue-600" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Search className="w-4 h-4" /> Browse Properties
            </Link>
            {user && (
              <Link
                href={getDashboardUrl()}
                className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
                  pathname.startsWith("/dashboard") ? "text-blue-600" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <LayoutDashboard className="w-4 h-4" /> Dashboard
              </Link>
            )}
          </nav>

          <div className="flex items-center gap-3">
            {!isLoading && (
              <>
                {user ? (
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5">
                      <span className="capitalize text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                        {user.role}
                      </span>
                      <span className="text-xs font-medium text-slate-800 hidden sm:inline">
                        {user.name}
                      </span>
                    </div>
                    <button
                      onClick={logout}
                      title="Sign out"
                      className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors border border-transparent hover:border-red-100"
                    >
                      <LogOut className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Link
                      href="/login"
                      className="text-sm font-semibold text-slate-700 hover:text-slate-900 px-3 py-2 rounded-xl transition-colors"
                    >
                      Log In
                    </Link>
                    <Link
                      href="/register"
                      className="text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition-all shadow-sm"
                    >
                      Register
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
