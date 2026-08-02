"use client";

import { useState } from "react";
import { initialRequests } from "@/lib/data";
import { RentalRequest } from "@/types";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { CreditCard, Clock, CheckCircle, XCircle } from "lucide-react";

export default function TenantDashboard() {
  const router = useRouter();
  const [requests, setRequests] = useState<RentalRequest[]>(initialRequests);
  const [review, setReview] = useState("");

  const handlePayNow = (reqId: string) => {
    toast.loading("Redirecting to Stripe Gateway...");
    setTimeout(() => {
      router.push("/payment/success");
    }, 1500);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!review) return;
    toast.success("Review submitted successfully! Thank you for your feedback.");
    setReview("");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PENDING":
        return <span className="bg-amber-100 text-amber-800 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 w-fit"><Clock className="w-3 h-3" /> Pending</span>;
      case "APPROVED":
        return <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 w-fit"><CheckCircle className="w-3 h-3" /> Approved</span>;
      case "ACTIVE":
        return <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 w-fit"><CheckCircle className="w-3 h-3" /> Active</span>;
      default:
        return <span className="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 w-fit"><XCircle className="w-3 h-3" /> Rejected</span>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Tenant Portal</h1>
        <p className="text-xs text-slate-500 mt-1">Manage rental requests and payments</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-900">My Rental Requests</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-xs uppercase font-semibold text-slate-500 border-b border-slate-200">
              <tr>
                <th className="p-4">Property</th>
                <th className="p-4">Monthly Rent</th>
                <th className="p-4">Date Requested</th>
                <th className="p-4">Status</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {requests.map((req) => (
                <tr key={req.id} className="hover:bg-slate-50/50">
                  <td className="p-4 font-semibold text-slate-900">{req.propertyTitle}</td>
                  <td className="p-4">${req.price} USD</td>
                  <td className="p-4">{req.createdAt}</td>
                  <td className="p-4">{getStatusBadge(req.status)}</td>
                  <td className="p-4">
                    {req.status === "APPROVED" ? (
                      <button
                        onClick={() => handlePayNow(req.id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-1.5 rounded-lg text-xs flex items-center gap-1.5 shadow-sm transition-all"
                      >
                        <CreditCard className="w-3.5 h-3.5" /> Pay Now
                      </button>
                    ) : (
                      <span className="text-xs text-slate-400">No Action Required</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-slate-900">Leave Property Review</h2>
        <form onSubmit={handleReviewSubmit} className="space-y-3">
          <textarea
            required
            rows={3}
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Write your review for completed rentals..."
            className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
          <button
            type="submit"
            className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors"
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
}
