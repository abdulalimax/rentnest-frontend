"use client";

import { useState } from "react";
import { initialRequests, initialProperties } from "@/lib/data";
import { RentalRequest } from "@/types";
import { toast } from "sonner";
import { PlusCircle, Check, X } from "lucide-react";

export default function LandlordDashboard() {
  const [requests, setRequests] = useState<RentalRequest[]>(initialRequests);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");

  const handleStatus = (id: string, newStatus: "APPROVED" | "REJECTED") => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
    toast.success(`Request ${newStatus.toLowerCase()} successfully!`);
  };

  const handleAddProperty = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("New Property listing created successfully!");
    setShowForm(false);
    setTitle("");
    setPrice("");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Landlord Portal</h1>
          <p className="text-xs text-slate-500 mt-1">Manage incoming tenant requests & listings</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-colors shadow-sm"
        >
          <PlusCircle className="w-4 h-4" /> {showForm ? "Close Form" : "Add Property"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAddProperty} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-slate-900">Create Property Listing</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              required
              placeholder="Property Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="p-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              required
              placeholder="Price per month ($)"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="p-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-medium px-5 py-2 rounded-xl text-xs transition-colors">
            Publish Listing
          </button>
        </form>
      )}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-900">Incoming Rental Requests</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-xs uppercase font-semibold text-slate-500 border-b border-slate-200">
              <tr>
                <th className="p-4">Property</th>
                <th className="p-4">Tenant</th>
                <th className="p-4">Rent Price</th>
                <th className="p-4">Current Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {requests.map((req) => (
                <tr key={req.id} className="hover:bg-slate-50/50">
                  <td className="p-4 font-semibold text-slate-900">{req.propertyTitle}</td>
                  <td className="p-4">{req.tenantName}</td>
                  <td className="p-4">${req.price} USD</td>
                  <td className="p-4 font-semibold text-xs text-blue-600">{req.status}</td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleStatus(req.id, "APPROVED")}
                        className="bg-green-100 hover:bg-green-200 text-green-800 p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
                      >
                        <Check className="w-3.5 h-3.5" /> Approve
                      </button>
                      <button
                        onClick={() => handleStatus(req.id, "REJECTED")}
                        className="bg-red-100 hover:bg-red-200 text-red-800 p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
                      >
                        <X className="w-3.5 h-3.5" /> Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
