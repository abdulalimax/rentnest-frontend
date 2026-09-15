"use client";

import { useEffect } from "react";
import Link from "next/link";
import { XCircle, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

export default function PaymentCancelPage() {
  useEffect(() => {
    toast.error("Checkout process was cancelled. No charges were made.");
  }, []);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm max-w-md w-full text-center space-y-6">
        <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto">
          <XCircle className="w-10 h-10" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Payment Cancelled</h1>
          <p className="text-sm text-slate-600 mt-2">
            The checkout session was cancelled. You can retry anytime from your portal.
          </p>
        </div>
        <Link
          href="/dashboard/tenant"
          className="inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold px-6 py-3 rounded-xl transition-all text-sm w-full"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
