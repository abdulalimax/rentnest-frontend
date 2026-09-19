"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "landlord" | "tenant";
}

interface AuthContextType {
  user: User | null;
  login: (email: string, pass: string) => Promise<{ success: boolean; message?: string }>;
  register: (name: string, email: string, pass: string, role: "tenant" | "landlord") => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USERS: Record<string, { pass: string; user: User }> = {
  "admin@rentnest.com": {
    pass: "admin123",
    user: { id: "u_admin", name: "Super Admin", email: "admin@rentnest.com", role: "admin" },
  },
  "landlord@rentnest.com": {
    pass: "landlord123",
    user: { id: "u_landlord", name: "David Landlord", email: "landlord@rentnest.com", role: "landlord" },
  },
  "tenant@rentnest.com": {
    pass: "tenant123",
    user: { id: "u_tenant", name: "John Tenant", email: "tenant@rentnest.com", role: "tenant" },
  },
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("rentnest_auth_user");
      if (savedUser && savedUser !== "undefined" && savedUser !== "null") {
        const parsed = JSON.parse(savedUser);
        // নিশ্চিত করা যে এটি কোনো ডেমো বা হার্ডকোড করা সুপার অ্যাডমিন সেশন নয় যদি না ইউজার নিজে লগইন করে
        setUser(parsed);
      } else {
        setUser(null);
      }
    } catch (e) {
      setUser(null);
    }
    setIsLoading(false);
  }, []);

  const setAuthCookies = (u: User) => {
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = `token=auth_token_${u.id}; path=/; expires=${expires}; SameSite=Lax`;
    document.cookie = `role=${u.role}; path=/; expires=${expires}; SameSite=Lax`;
    localStorage.setItem("rentnest_auth_user", JSON.stringify(u));
    setUser(u);
  };

  const login = async (email: string, pass: string) => {
    const cleanEmail = email.trim().toLowerCase();
    const registeredUsers = JSON.parse(localStorage.getItem("rentnest_registered_users") || "{}");
    const account = DEMO_USERS[cleanEmail] || registeredUsers[cleanEmail];

    if (!account) {
      return { success: false, message: "No account found with this email." };
    }

    if (account.pass !== pass) {
      return { success: false, message: "Invalid password credentials." };
    }

    setAuthCookies(account.user);
    return { success: true };
  };

  const register = async (name: string, email: string, pass: string, role: "tenant" | "landlord") => {
    const cleanEmail = email.trim().toLowerCase();
    const registeredUsers = JSON.parse(localStorage.getItem("rentnest_registered_users") || "{}");

    // শুধুমাত্র যদি এই ইমেইলে পাসওয়ার্ড সহ অ্যাকাউন্ট তৈরি থাকে তবেই duplicate বলবে
    if (registeredUsers[cleanEmail]) {
      return { success: false, message: "Email is already registered. Please login." };
    }

    const newUser: User = {
      id: "u_" + Date.now().toString().slice(-6),
      name: name.trim(),
      email: cleanEmail,
      role,
    };

    registeredUsers[cleanEmail] = { pass, user: newUser };
    localStorage.setItem("rentnest_registered_users", JSON.stringify(registeredUsers));

    // Admin Dashboard-এর rentnest_all_users অ্যারেতে সাথে সাথে সেভ
    try {
      const allUsers = JSON.parse(localStorage.getItem("rentnest_all_users") || "[]");
      const filtered = allUsers.filter((u: any) => u.email?.toLowerCase() !== cleanEmail);
      const adminEntry = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        status: "Active"
      };
      localStorage.setItem("rentnest_all_users", JSON.stringify([adminEntry, ...filtered]));
      window.dispatchEvent(new Event("rentnest_users_updated"));
      window.dispatchEvent(new Event("storage"));
    } catch (err) {
      console.error(err);
    }

    // রেজিস্ট্রেশনের পর অটো-লগইন হবে না, ইউজারকে লগইন করতে হবে
    return { success: true };
  };

  const logout = () => {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    document.cookie = "role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    localStorage.removeItem("rentnest_auth_user");
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
