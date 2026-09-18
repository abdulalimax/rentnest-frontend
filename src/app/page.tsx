"use client";

import Link from "next/link";

import { initialProperties } from "@/lib/data";
import { Search, MapPin, DollarSign, Building, Shield, Star } from "lucide-react";

export default function Home() {
  return (
    <div className="space-y-16 pb-16">
      <section className="relative bg-slate-900 text-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1600&q=80"
            alt="Hero Background"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative max-w-5xl mx-auto text-center space-y-6">
          <span className="inline-block bg-blue-500/20 text-blue-300 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider border border-blue-400/30">
            Welcome to RentNest
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight">
            Find Your Dream Rental Property with Confidence
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto">
            Browse verified listings, submit instant rental requests, and complete secure payments all in one place.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Link
              href="/properties"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3.5 rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all text-base flex items-center justify-center gap-2"
            >
              <Search className="w-5 h-5" /> Explore Listings
            </Link>
            <Link
              href="/register"
              className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-3.5 rounded-xl backdrop-blur-md transition-all text-base border border-white/20"
            >
              List Your Property
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900">Featured Rental Properties</h2>
          <p className="text-slate-600 mt-2">Handpicked top-rated listings in prime locations</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {initialProperties.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col"
            >
              <div className="relative h-56 w-full">
                <img
                  src={property.image}
                  alt={property.title}
                  fill
                  className="object-cover"
                />
                <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-slate-800 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                  ${property.price}/mo
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 mb-2">
                    <MapPin className="w-3.5 h-3.5 text-blue-600" />
                    <span>{property.location}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 line-clamp-1">{property.title}</h3>
                  <p className="text-sm text-slate-600 mt-2 line-clamp-2">{property.description}</p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-medium bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md">
                    {property.type}
                  </span>
                  <Link
                    href={`/properties/${property.id}`}
                    className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    View Details ?
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center space-y-3">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mx-auto">
              <Building className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-slate-900">Verified Properties</h3>
            <p className="text-sm text-slate-600">All properties are carefully inspected to match high living standards.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center space-y-3">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mx-auto">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-slate-900">Secure Payments</h3>
            <p className="text-sm text-slate-600">Instant and secure checkout flow integrated with Stripe & SSLCommerz.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center space-y-3">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mx-auto">
              <Star className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-slate-900">Transparent Reviews</h3>
            <p className="text-sm text-slate-600">Read honest feedback from previous tenants before making a commitment.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

