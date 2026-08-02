import Link from "next/link";
import { Home, Mail, Phone, MapPin, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 text-white font-bold text-xl">
              <Home className="w-6 h-6 text-blue-500" />
              <span>Rent<span className="text-blue-500">Nest</span></span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              Simplifying rental management for tenants and landlords with modern solutions and seamless payments.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Quick Links</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/properties" className="hover:text-blue-400 transition-colors">Browse Properties</Link></li>
              <li><Link href="/about" className="hover:text-blue-400 transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-blue-400 transition-colors">Contact Support</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">User Roles</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/login" className="hover:text-blue-400 transition-colors">Tenant Dashboard</Link></li>
              <li><Link href="/login" className="hover:text-blue-400 transition-colors">Landlord Portal</Link></li>
              <li><Link href="/login" className="hover:text-blue-400 transition-colors">Admin Panel</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Contact</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-blue-500" /> Dhaka, Bangladesh</li>
              <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-blue-500" /> +880 1700-000000</li>
              <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-blue-500" /> support@rentnest.com</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 text-center text-xs text-slate-500 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} RentNest. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> for Next.js Developers
          </p>
        </div>
      </div>
    </footer>
  );
}