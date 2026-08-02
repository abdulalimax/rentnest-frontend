"use client";

import { useState } from "react";
import { initialUsers } from "@/lib/data";
import { User } from "@/types";
import { toast } from "sonner";
import { Ban, CheckCircle } from "lucide-react";

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>(initialUsers);

  const toggleBan = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, isBanned: !u.isBanned } : u))
    );
    toast.success("User status updated successfully!");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Admin Moderation Portal</h1>
        <p className="text-xs text-slate-500 mt-1">Platform overview and user account management</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <p className="text-xs font-medium text-slate-500">Total Users</p>
          <p className="text-3xl font-extrabold text-slate-900">{users.length}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <p className="text-xs font-medium text-slate-500">Active Properties</p>
          <p className="text-3xl font-extrabold text-blue-600">3</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <p className="text-xs font-medium text-slate-500">Platform Health</p>
          <p className="text-3xl font-extrabold text-green-600">100%</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-900">Platform Users Management</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-xs uppercase font-semibold text-slate-500 border-b border-slate-200">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Role</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50/50">
                  <td className="p-4 font-semibold text-slate-900">{u.name}</td>
                  <td className="p-4">{u.email}</td>
                  <td className="p-4"><span className="text-xs font-semibold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md">{u.role}</span></td>
                  <td className="p-4">
                    {u.isBanned ? (
                      <span className="text-xs text-red-600 font-semibold flex items-center gap-1"><Ban className="w-3 h-3" /> Banned</span>
                    ) : (
                      <span className="text-xs text-green-600 font-semibold flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Active</span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => toggleBan(u.id)}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${
                        u.isBanned ? "bg-green-100 text-green-800 hover:bg-green-200" : "bg-red-100 text-red-800 hover:bg-red-200"
                      }`}
                    >
                      {u.isBanned ? "Unban User" : "Ban User"}
                    </button>
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
