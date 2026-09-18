"use client";

import Link from "next/link";

export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-100 p-8 text-center">
        <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold">
          ✕
        </div>
        <span className="inline-block px-3 py-1 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold rounded-full mb-3">
          Payment Cancelled
        </span>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Checkout Interrupted</h1>
        <p className="text-slate-500 text-sm mb-6">
          Your payment was not completed. No charges were made to your account.
        </p>

        <Link
          href="/dashboard/tenant"
          className="w-full block bg-slate-800 hover:bg-slate-900 text-white font-semibold py-3 px-4 rounded-xl text-sm shadow transition"
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
}
