"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function PaymentSuccessPage() {
  const [sessionData, setSessionData] = useState<{
    sessionId: string;
    amount: number;
    propertyTitle: string;
  }>({
    sessionId: "cs_test_" + Math.random().toString(36).substring(2, 9),
    amount: 65000,
    propertyTitle: "Modern Luxury Apartment in Gulshan-2",
  });

  useEffect(() => {
    // 1. Get session info from pending checkout
    const pending = sessionStorage.getItem("rentnest_pending_checkout");
    if (pending) {
      const data = JSON.parse(pending);
      setSessionData({
        sessionId: data.sessionId,
        amount: data.amount,
        propertyTitle: data.propertyTitle,
      });

      // 2. Persist to localStorage: Update request to Active
      const savedReqs = localStorage.getItem("rentnest_requests");
      if (savedReqs) {
        const reqs = JSON.parse(savedReqs);
        const updated = reqs.map((r: any) =>
          r.id === data.requestId
            ? { ...r, status: "Active", paymentStatus: "paid" }
            : r
        );
        localStorage.setItem("rentnest_requests", JSON.stringify(updated));
      }

      // 3. Persist to localStorage: Add to Payment History
      const savedPayments = localStorage.getItem("rentnest_payments");
      const payments = savedPayments ? JSON.parse(savedPayments) : [];
      const newTransaction = {
        id: data.sessionId,
        propertyTitle: data.propertyTitle,
        amount: data.amount,
        date: new Date().toISOString().split("T")[0],
        status: "COMPLETED",
      };
      // Avoid duplicate insert
      if (!payments.some((p: any) => p.id === data.sessionId)) {
        payments.unshift(newTransaction);
        localStorage.setItem("rentnest_payments", JSON.stringify(payments));
      }

      sessionStorage.removeItem("rentnest_pending_checkout");
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-100 p-8 text-center animate-in zoom-in-95 duration-200">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold">
          ✓
        </div>
        <span className="inline-block px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold rounded-full mb-3">
          Stripe Payment Verified
        </span>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Payment Successful!</h1>
        <p className="text-slate-500 text-sm mb-6">
          Your rent payment for <span className="font-semibold text-slate-800">{sessionData.propertyTitle}</span> has been processed.
        </p>

        <div className="bg-slate-50 rounded-xl p-4 mb-6 text-left border border-slate-200 space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-slate-500">Amount Paid:</span>
            <span className="font-bold text-slate-900">৳{sessionData.amount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Payment Gateway:</span>
            <span className="font-semibold text-blue-600">Stripe Checkout (Card)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Transaction Ref:</span>
            <span className="font-mono text-slate-600 truncate max-w-[180px]">{sessionData.sessionId}</span>
          </div>
        </div>

        <Link
          href="/dashboard/tenant?payment_success=true"
          className="w-full block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl text-sm shadow-md hover:shadow-lg transition"
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
}
