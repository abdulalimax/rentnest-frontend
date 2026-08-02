"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { User, Role } from "@/types";
import { initialUsers } from "@/lib/data";

interface AuthContextType {
  user: User | null;
  login: (email: string, role: Role) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("rentnest_user");
    if (saved) {
      setUser(JSON.parse(saved));
    } else {
      const defaultUser = initialUsers[0];
      setUser(defaultUser);
      localStorage.setItem("rentnest_user", JSON.stringify(defaultUser));
    }
  }, []);

  const login = (email: string, role: Role) => {
    const found = initialUsers.find((u) => u.email === email && u.role === role);
    const newUser: User = found || {
      id: "u_" + Date.now(),
      name: email.split("@")[0],
      email,
      role,
      isBanned: false,
    };

    setUser(newUser);
    localStorage.setItem("rentnest_user", JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("rentnest_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

