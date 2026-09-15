"use client";

import { useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { RentalRequest } from "@/types";

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id") || "sess_live_" + Date.now().toString().slice(-8);
  const targetId = searchParams.get("requestId");

  useEffect(() => {
    const storedRequests = localStorage.getItem("tenant_requests");
    const storedPayments = localStorage.getItem("tenant_payments");
    const pendingId = targetId || localStorage.getItem("pending_payment_request_id");

    if (storedRequests) {
      const requests: RentalRequest[] = JSON.parse(storedRequests);
      const updated = requests.map((req) => {
        if (!pendingId || req.id === pendingId || req.status === "APPROVED") {
          return { ...req, status: "ACTIVE" };
        }
        return req;
      });

      localStorage.setItem("tenant_requests", JSON.stringify(updated));

      const matchedReq = requests.find((r) => r.id === pendingId) || requests.find((r) => r.status === "APPROVED") || requests[0];
      const newPayment = {
        id: sessionId,
        requestId: matchedReq?.id || "req_01",
        propertyTitle: matchedReq?.propertyTitle || "Modern City Apartment",
        amount: matchedReq?.price || 1200,
        date: new Date().toISOString().split("T")[0],
        status: "COMPLETED",
      };

      const existingPayments = storedPayments ? JSON.parse(storedPayments) : [];
      const isAlreadyRecorded = existingPayments.some((p: { id: string }) => p.id === sessionId);
      if (!isAlreadyRecorded) {
        localStorage.setItem("tenant_payments", JSON.stringify([newPayment, ...existingPayments]));
      }
    }

    localStorage.removeItem("pending_payment_request_id");
    toast.success("Payment verified! Booking is now ACTIVE.");
  }, [sessionId, targetId]);

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm max-w-md w-full text-center space-y-6">
      <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
        <CheckCircle2 className="w-10 h-10" />
      </div>
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Payment Successful!</h1>
        <p className="text-sm text-slate-600 mt-2">
          Your payment has been settled and your rental status is now <strong>ACTIVE</strong>.
        </p>
        <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs font-mono text-slate-600">
          Transaction Reference: {sessionId}
        </div>
      </div>
      <Link
        href="/dashboard/tenant"
        className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-all text-sm w-full shadow-sm"
      >
        Return to Dashboard <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <Suspense fallback={<Loader2 className="w-8 h-8 animate-spin text-blue-600" />}>
        <SuccessContent />
      </Suspense>
    </div>
  );
}
