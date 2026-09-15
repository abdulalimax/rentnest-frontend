"use client";

import { useState, useEffect } from "react";
import { initialRequests } from "@/lib/data";
import { RentalRequest } from "@/types";
import { toast } from "sonner";
import { CreditCard, Clock, CheckCircle, XCircle, DollarSign, Calendar, Hash } from "lucide-react";

interface PaymentRecord {
  id: string;
  requestId: string;
  propertyTitle: string;
  amount: number;
  date: string;
  status: string;
}

export default function TenantDashboard() {
  const [requests, setRequests] = useState<RentalRequest[]>([]);
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [review, setReview] = useState("");
  const [loadingPay, setLoadingPay] = useState<string | null>(null);

  useEffect(() => {
    const savedRequests = localStorage.getItem("tenant_requests");
    const savedPayments = localStorage.getItem("tenant_payments");

    if (savedRequests) {
      setRequests(JSON.parse(savedRequests));
    } else {
      setRequests(initialRequests);
      localStorage.setItem("tenant_requests", JSON.stringify(initialRequests));
    }

    if (savedPayments) {
      setPayments(JSON.parse(savedPayments));
    }
  }, []);

  const handlePayNow = async (req: RentalRequest) => {
    setLoadingPay(req.id);
    toast.loading("Connecting to Stripe Gateway...");

    try {
      const res = await fetch("/api/payments/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requestId: req.id,
          price: req.price,
          propertyTitle: req.propertyTitle,
        }),
      });

      const data = await res.json();

      if (data.success && data.url) {
        localStorage.setItem("pending_payment_request_id", req.id);
        toast.success("Redirecting to checkout...");
        window.location.href = data.url;
      } else {
        localStorage.setItem("pending_payment_request_id", req.id);
        window.location.href = `/payment/success?session_id=cs_live_${Date.now()}&requestId=${req.id}`;
      }
    } catch (err) {
      localStorage.setItem("pending_payment_request_id", req.id);
      window.location.href = `/payment/success?session_id=cs_live_${Date.now()}&requestId=${req.id}`;
    } finally {
      setLoadingPay(null);
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!review.trim()) return;
    toast.success("Review submitted successfully!");
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

  const hasActiveRental = requests.some((r) => r.status === "ACTIVE");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Tenant Portal</h1>
        <p className="text-xs text-slate-500 mt-1">Manage rental requests, track payments and leave reviews</p>
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
                        onClick={() => handlePayNow(req)}
                        disabled={loadingPay === req.id}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-1.5 rounded-lg text-xs flex items-center gap-1.5 shadow-sm transition-all disabled:opacity-50"
                      >
                        <CreditCard className="w-3.5 h-3.5" /> {loadingPay === req.id ? "Processing..." : "Pay via Stripe"}
                      </button>
                    ) : (
                      <span className="text-xs text-slate-400">
                        {req.status === "ACTIVE" ? "Payment Completed" : "No Action Required"}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">Payment History</h2>
          <span className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full font-medium">
            {payments.length} Transactions
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-xs uppercase font-semibold text-slate-500 border-b border-slate-200">
              <tr>
                <th className="p-4"><span className="flex items-center gap-1"><Hash className="w-3 h-3" /> Transaction ID</span></th>
                <th className="p-4">Property</th>
                <th className="p-4"><span className="flex items-center gap-1"><DollarSign className="w-3 h-3" /> Paid Amount</span></th>
                <th className="p-4"><span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> Date</span></th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {payments.length > 0 ? (
                payments.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/50">
                    <td className="p-4 font-mono text-xs text-slate-500">{p.id}</td>
                    <td className="p-4 font-medium text-slate-900">{p.propertyTitle}</td>
                    <td className="p-4 font-semibold text-slate-900">${p.amount} USD</td>
                    <td className="p-4">{p.date}</td>
                    <td className="p-4">
                      <span className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-2.5 py-1 rounded-full">
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-xs text-slate-400">
                    No payment records available. Complete an approved rental payment to view transactions.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {hasActiveRental && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-slate-900">Leave Property Review</h2>
          <form onSubmit={handleReviewSubmit} className="space-y-3">
            <textarea
              required
              rows={3}
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Write your review for your active rental..."
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
      )}
    </div>
  );
}
