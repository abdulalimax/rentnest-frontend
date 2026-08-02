import Link from "next/link";
import { Building2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-white mb-4">
            <Building2 className="w-6 h-6 text-blue-500" />
            <span>RentNest</span>
          </Link>
          <p className="text-sm leading-relaxed">
            Find and list premium rental properties with ease. Trusted by thousands of tenants and landlords nationwide.
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold text-sm mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/properties" className="hover:text-white transition-colors">Browse Rentals</Link></li>
            <li><Link href="/login" className="hover:text-white transition-colors">Sign In</Link></li>
            <li><Link href="/register" className="hover:text-white transition-colors">Create Account</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold text-sm mb-4">Roles & Dashboards</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/dashboard/tenant" className="hover:text-white transition-colors">Tenant Dashboard</Link></li>
            <li><Link href="/dashboard/landlord" className="hover:text-white transition-colors">Landlord Portal</Link></li>
            <li><Link href="/dashboard/admin" className="hover:text-white transition-colors">Admin Portal</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold text-sm mb-4">Contact & Support</h4>
          <p className="text-sm">Support: support@rentnest.com</p>
          <p className="text-sm mt-1">Dhaka, Bangladesh</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-slate-800 text-xs text-center">
        © 2026 RentNest Platform Inc. All rights reserved.
      </div>
    </footer>
  );
}

