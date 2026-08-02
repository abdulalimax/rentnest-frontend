"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Building2, UserCircle, LogOut, Home, Search, LayoutDashboard } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();

  const getDashboardPath = () => {
    if (!user) return "/login";
    switch (user.role) {
      case "Tenant":
        return "/dashboard/tenant";
      case "Landlord":
        return "/dashboard/landlord";
      case "Admin":
        return "/dashboard/admin";
      default:
        return "/dashboard/tenant";
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-blue-600">
          <Building2 className="w-6 h-6" />
          <span>RentNest</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <Link href="/" className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
            <Home className="w-4 h-4" /> Home
          </Link>
          <Link href="/properties" className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
            <Search className="w-4 h-4" /> Browse Properties
          </Link>
          {user && (
            <Link href={getDashboardPath()} className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
              <LayoutDashboard className="w-4 h-4" /> Dashboard
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-xs bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full font-semibold">
                {user.role}
              </span>
              <span className="text-sm font-medium text-slate-700 hidden sm:inline">{user.name}</span>
              <button
                onClick={logout}
                className="flex items-center gap-1 text-sm font-medium text-red-600 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="text-sm font-medium text-slate-700 hover:text-blue-600 px-3 py-2 rounded-lg transition-colors"
              >
                Log In
              </Link>
              <Link
                href="/register"
                className="text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-sm transition-colors"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

