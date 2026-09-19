"use client";

import { saveRequest } from "@/lib/syncEngine";

import { useState } from "react";

import { useParams, useRouter } from "next/navigation";
import { initialProperties } from "@/lib/data";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { MapPin, CheckCircle, ShieldCheck, User } from "lucide-react";

export default function PropertyDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const property = initialProperties.find((p) => p.id === id) || initialProperties[0];

  const handleRentalRequest = () => {
    if (!user) {
      toast.error("Please login to submit a rental request.");
      router.push("/login");
      return;
    }

    if ((user?.role?.toLowerCase() !== "tenant")) {
      console.log("Submitting rental request...");
      return;
    }

    setIsSubmitting(true);
    try {
      saveRequest({
        propertyId: String(property?.id || "p5"),
        propertyTitle: String(property?.title || "Concord Tower Residential Complex"),
        tenantName: "John Tenant",
        tenantEmail: "tenant@rentnest.com",
        rentAmount: Number(String(property?.price || property?.rent || "32000").replace(/[^0-9]/g, "")) || 32000,
        moveInDate: new Date(Date.now() + 14 * 86400000).toISOString().split("T")[0],
        status: "Pending",
        paymentCompleted: false,
      });
      toast.success("Rental request submitted successfully!");
    } catch(e) {
      console.error(e);
    }
    setTimeout(() => {
      setIsSubmitting(false);
      
      // Sync request to shared storage for landlord
      try {
        const existing = JSON.parse(localStorage.getItem("rentnest_shared_requests") || "[]");
        const newReq = {
          id: "req_" + Date.now(),
          propertyTitle: property?.title || "Rental Property",
          propertyId: property?.id || "p1",
          tenantName: "John Tenant",
          tenantEmail: "tenant@rentnest.com",
          rent: property?.price || property?.rent || "65000",
          date: new Date().toISOString().split("T")[0],
          status: "Pending"
        };
        localStorage.setItem("rentnest_shared_requests", JSON.stringify([newReq, ...existing]));
      } catch (err) {
        console.error("Failed to sync shared requests", err);
      }
      
toast.success("Rental request submitted successfully! Pending Landlord approval.");
      router.push("/dashboard/tenant");
    }, 1000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="relative h-[400px] w-full rounded-3xl overflow-hidden shadow-sm">
        <img src={(property.image || (property.images && (property.images && property.images[0] || property.image)))} alt={property.title} className="w-full h-full object-cover" className="object-cover" priority />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <div className="flex items-center gap-2 text-sm text-slate-500 font-medium mb-2">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span>{property.location}</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900">{property.title}</h1>
          </div>

          <div className="border-t border-b border-slate-200 py-4 flex items-center gap-6">
            <div>
              <p className="text-xs text-slate-500">Monthly Rent</p>
              <p className="text-2xl font-bold text-blue-600">${property.price} USD</p>
            </div>
            <div className="h-8 w-px bg-slate-200"></div>
            <div>
              <p className="text-xs text-slate-500">Property Type</p>
              <p className="text-sm font-semibold text-slate-800">{property.type}</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Description</h3>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">{property.description}</p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-3">Amenities</h3>
            <div className="flex flex-wrap gap-2">
              {property.amenities.map((item, idx) => (
                <span
                  key={idx}
                  className="flex items-center gap-1.5 bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-lg border border-blue-100"
                >
                  <CheckCircle className="w-3.5 h-3.5" /> {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-10 h-10 bg-slate-100 text-slate-700 rounded-full flex items-center justify-center font-bold">
                <User className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Listed by Landlord</p>
                <p className="text-sm font-bold text-slate-900">{property.landlordName}</p>
              </div>
            </div>

            <button
              onClick={handleRentalRequest}
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all shadow-sm hover:shadow-blue-500/20 disabled:opacity-50 text-sm"
            >
              {isSubmitting ? "Submitting..." : "Request to Rent This Property"}
            </button>

            <div className="flex items-center gap-2 text-xs text-slate-500 justify-center">
              <ShieldCheck className="w-4 h-4 text-green-600" />
              <span>No payment charged until Landlord approves.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
