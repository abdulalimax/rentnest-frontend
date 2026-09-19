"use client";

import { getStoredRequests, updateRequestStatus, RentalRequest } from "@/lib/syncEngine";
﻿
import { useState, useEffect } from "react";
import Link from "next/link";

interface RentalRequest {
  id: string;
  propertyTitle: string;
  rentAmount: number;
  status: "Pending" | "Approved" | "Active" | "Rejected";
  moveInDate: string;
  paymentStatus?: "unpaid" | "paid";
}

interface PaymentTransaction {
  id: string;
  propertyTitle: string;
  amount: number;
  date: string;
  status: string;
}

export default function TenantDashboard() {

  useEffect(() => {
    const loadData = () => {
      const all = getStoredRequests();
      setRequests(all);
    };
    loadData();
    window.addEventListener("rentnest_requests_updated", loadData);
    return () => window.removeEventListener("rentnest_requests_updated", loadData);
  }, []);
  
  const [requests, setRequests] = useState<RentalRequest[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("rentnest_all_requests");
        if (stored) return JSON.parse(stored);
      } catch (e) {}
    }
    return [];
  });
  const [payments, setPayments] = useState<PaymentTransaction[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const loadData = () => {
    // 1. Load Requests
    const savedReqs = localStorage.getItem("rentnest_requests");
    if (savedReqs) {
      setRequests(JSON.parse(savedReqs));
    } else {
      const defaultRequests: RentalRequest[] = [
        {
          id: "req_1",
          propertyTitle: "Modern Luxury Apartment in Gulshan-2",
          rentAmount: 65000,
          status: "Approved",
          moveInDate: "2026-10-01",
          paymentStatus: "unpaid",
        },
        {
          id: "req_2",
          propertyTitle: "Elegant Residential Flat in Banani",
          rentAmount: 52000,
          status: "Pending",
          moveInDate: "2026-11-01",
          paymentStatus: "unpaid",
        },
      ];
      setRequests(defaultRequests);
      localStorage.setItem("rentnest_requests", JSON.stringify(defaultRequests));
    }

    // 2. Load Payments
    const savedPayments = localStorage.getItem("rentnest_payments");
    if (savedPayments) {
      setPayments(JSON.parse(savedPayments));
    } else {
      setPayments([]);
      localStorage.setItem("rentnest_payments", JSON.stringify([]));
    }
  };

  useEffect(() => {
    loadData();

    // Check if coming back from successful payment
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("payment_success") === "true") {
      showToast("Payment verified successfully via Stripe!");
      window.history.replaceState({}, "", "/dashboard/tenant");
    }
  }, []);

  // Demo Reset Function: এক ক্লিকে Approved এবং Unpaid স্টেটে ফিরিয়ে আনবে
  const handleResetForDemo = () => {
    const freshRequests: RentalRequest[] = [
      {
        id: "req_1",
        propertyTitle: "Modern Luxury Apartment in Gulshan-2",
        rentAmount: 65000,
        status: "Approved",
        moveInDate: "2026-10-01",
        paymentStatus: "unpaid",
      },
      {
        id: "req_2",
        propertyTitle: "Elegant Residential Flat in Banani",
        rentAmount: 52000,
        status: "Pending",
        moveInDate: "2026-11-01",
        paymentStatus: "unpaid",
      },
    ];
    localStorage.setItem("rentnest_requests", JSON.stringify(freshRequests));
    localStorage.setItem("rentnest_payments", JSON.stringify([]));
    setRequests(freshRequests);
    setPayments([]);
    setReviewSubmitted(false);
    showToast("Demo state reset: Request set to 'Approved' with Payment button!");
  };

  // Trigger Stripe Payment Lifecycle
  const handlePayViaStripe = (req: RentalRequest) => {
    // Generate unique Stripe-like Session ID
    const sessionId = "cs_live_" + Math.random().toString(36).substring(2, 11) + "_" + Date.now().toString().slice(-4);
    
    // Save pending transaction metadata
    sessionStorage.setItem(
      "rentnest_pending_checkout",
      JSON.stringify({
        requestId: req.id,
        propertyTitle: req.propertyTitle,
        amount: req.rentAmount,
        sessionId: sessionId,
      })
    );

    // Redirect to Stripe Simulation Page
    window.location.href = `/payment/success?session_id=${sessionId}`;
  };

  const hasActiveRental = requests.some((r) => r.status === "Active");

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-8">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-lg shadow-xl font-medium animate-in fade-in slide-in-from-top-4">
          ✓ {toastMessage}
        </div>
      )}

      {/* Header with Demo Reset */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b border-slate-200 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Tenant Portal</h1>
          <p className="text-slate-500 text-sm mt-1">Manage rental requests, track payments, and submit reviews</p>
        </div>
        <button
          onClick={handleResetForDemo}
          className="bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 font-semibold px-4 py-2 rounded-lg text-xs shadow-sm transition"
        >
          ↻ Reset Demo State (Click before recording)
        </button>
      </div>

      {/* 1. My Rental Requests Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-900">My Rental Requests</h2>
          <span className="text-xs font-semibold bg-slate-100 text-slate-600 px-3 py-1 rounded-full">
            {requests.length} Requests
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-400 font-semibold text-xs uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-4 px-6">Property</th>
                <th className="py-4 px-6">Monthly Rent</th>
                <th className="py-4 px-6">Move-in Date</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {requests.map((req) => (
                <tr key={req.id} className="hover:bg-slate-50/70 transition">
                  <td className="py-4 px-6 font-semibold text-slate-900">{req.propertyTitle}</td>
                  <td className="py-4 px-6 font-bold text-slate-800">৳{req.rentAmount.toLocaleString()} / mo</td>
                  <td className="py-4 px-6 text-slate-500">{req.moveInDate}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs rounded-full font-semibold ${
                        req.status === "Active"
                          ? "bg-emerald-100 text-emerald-800"
                          : req.status === "Approved"
                          ? "bg-blue-100 text-blue-700"
                          : req.status === "Rejected"
                          ? "bg-rose-100 text-rose-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      ● {req.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    {req.status === "Approved" && (
                      <button
                        onClick={() => handlePayViaStripe(req)}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-lg text-xs shadow-md hover:shadow-lg transition duration-150 inline-flex items-center gap-1.5"
                      >
                        💳 Pay Now (Stripe)
                      </button>
                    )}
                    {req.status === "Active" && (
                      <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-md">
                        ✓ Payment Completed
                      </span>
                    )}
                    {req.status === "Pending" && (
                      <span className="text-xs text-slate-400 italic">Awaiting Landlord Approval</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2. Payment History Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-900">Payment History</h2>
          <span className="text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full">
            {payments.length} Transactions Verified
          </span>
        </div>
        <div className="overflow-x-auto">
          {payments.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-sm">
              No transactions completed yet. Make a payment above to see real-time Stripe verification records.
            </div>
          ) : (
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-slate-400 font-semibold text-xs uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-4 px-6">Transaction ID</th>
                  <th className="py-4 px-6">Property</th>
                  <th className="py-4 px-6">Paid Amount</th>
                  <th className="py-4 px-6">Date</th>
                  <th className="py-4 px-6 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {payments.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-4 px-6 font-mono text-xs text-slate-500">{p.id}</td>
                    <td className="py-4 px-6 font-semibold text-slate-900">{p.propertyTitle}</td>
                    <td className="py-4 px-6 font-bold text-slate-900">৳{p.amount.toLocaleString()}</td>
                    <td className="py-4 px-6 text-slate-500">{p.date}</td>
                    <td className="py-4 px-6 text-right">
                      <span className="inline-block px-3 py-1 text-xs rounded-full font-semibold bg-emerald-100 text-emerald-800">
                        COMPLETED
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* 3. Leave Property Review (Unlocked after Payment/Active status) */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Leave Property Review</h2>
            <p className="text-xs text-slate-500 mt-1">
              {hasActiveRental
                ? "Your tenancy is active. Share your honest rental feedback."
                : "🔒 This section will unlock automatically once your rental payment is completed."}
            </p>
          </div>
          {hasActiveRental && (
            <span className="text-xs bg-emerald-50 text-emerald-700 font-semibold px-3 py-1 rounded-full border border-emerald-200">
              Unlocked for Active Tenancy
            </span>
          )}
        </div>

        {hasActiveRental ? (
          reviewSubmitted ? (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg p-4 text-sm font-medium">
              ✓ Thank you! Your verified tenant review and 5-star rating have been published.
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setReviewSubmitted(true);
                showToast("Review submitted successfully!");
              }}
              className="space-y-4 max-w-xl"
            >
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Rating</label>
                <div className="flex gap-2 text-amber-400 text-xl cursor-pointer">
                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Feedback</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Share your experience regarding maintenance, security, and amenities..."
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 text-slate-900"
                  defaultValue="Excellent apartment with wonderful ventilation and responsive landlord service."
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-lg text-xs shadow-sm transition"
              >
                Submit Review
              </button>
            </form>
          )
        ) : (
          <div className="bg-slate-50 border border-dashed border-slate-300 rounded-lg p-6 text-center text-slate-400 text-sm">
            Please complete the Stripe payment for your approved property to unlock the review submission form.
          </div>
        )}
      </div>
    </div>
  );
}
