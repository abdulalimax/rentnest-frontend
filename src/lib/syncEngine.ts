"use client";

export interface RentalRequest {
  id: string;
  propertyId: string;
  propertyTitle: string;
  tenantName: string;
  tenantEmail: string;
  rent: string;
  moveInDate: string;
  status: "Pending" | "Approved" | "Rejected" | "Active";
  paymentCompleted?: boolean;
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  role: "tenant" | "landlord" | "admin";
  status: "active" | "banned";
  createdAt: string;
}

const DEFAULT_REQUESTS: RentalRequest[] = [
  {
    id: "req_demo_1",
    propertyId: "p1",
    propertyTitle: "Modern Luxury Apartment in Gulshan-2",
    tenantName: "John Tenant",
    tenantEmail: "tenant@rentnest.com",
    rent: "65,000",
    moveInDate: "2026-10-01",
    status: "Approved",
    paymentCompleted: false,
  },
  {
    id: "req_demo_2",
    propertyId: "p2",
    propertyTitle: "Elegant Residential Flat in Banani",
    tenantName: "John Tenant",
    tenantEmail: "tenant@rentnest.com",
    rent: "52,000",
    moveInDate: "2026-11-01",
    status: "Pending",
    paymentCompleted: false,
  },
];

const DEFAULT_USERS: UserAccount[] = [
  { id: "u1", name: "John Tenant", email: "tenant@rentnest.com", role: "tenant", status: "active", createdAt: "2026-01-10" },
  { id: "u2", name: "David Landlord", email: "landlord@rentnest.com", role: "landlord", status: "active", createdAt: "2026-01-12" },
  { id: "u3", name: "Admin Moderator", email: "admin@rentnest.com", role: "admin", status: "active", createdAt: "2026-01-01" },
];

export const getStoredRequests = (): RentalRequest[] => {
  if (typeof window === "undefined") return DEFAULT_REQUESTS;
  const data = localStorage.getItem("rentnest_all_requests");
  if (!data) {
    localStorage.setItem("rentnest_all_requests", JSON.stringify(DEFAULT_REQUESTS));
    return DEFAULT_REQUESTS;
  }
  try {
    return JSON.parse(data);
  } catch {
    return DEFAULT_REQUESTS;
  }
};

export const saveRequest = (req: Omit<RentalRequest, "id">) => {
  const all = getStoredRequests();
  const newReq: RentalRequest = {
    ...req,
    id: "req_" + Date.now(),
  };
  const updated = [newReq, ...all];
  localStorage.setItem("rentnest_all_requests", JSON.stringify(updated));
  window.dispatchEvent(new Event("rentnest_requests_updated"));
  return newReq;
};

export const updateRequestStatus = (id: string, status: "Pending" | "Approved" | "Rejected" | "Active", paymentCompleted = false) => {
  const all = getStoredRequests();
  const updated = all.map((r) =>
    r.id === id ? { ...r, status, paymentCompleted: paymentCompleted !== undefined ? paymentCompleted : r.paymentCompleted } : r
  );
  localStorage.setItem("rentnest_all_requests", JSON.stringify(updated));
  window.dispatchEvent(new Event("rentnest_requests_updated"));
};

export const getStoredUsers = (): UserAccount[] => {
  if (typeof window === "undefined") return DEFAULT_USERS;
  const data = localStorage.getItem("rentnest_all_users");
  if (!data) {
    localStorage.setItem("rentnest_all_users", JSON.stringify(DEFAULT_USERS));
    return DEFAULT_USERS;
  }
  try {
    return JSON.parse(data);
  } catch {
    return DEFAULT_USERS;
  }
};

export const saveUser = (user: Omit<UserAccount, "id" | "status" | "createdAt">) => {
  const all = getStoredUsers();
  const newUser: UserAccount = {
    ...user,
    id: "usr_" + Date.now(),
    status: "active",
    createdAt: new Date().toISOString().split("T")[0],
  };
  const updated = [newUser, ...all];
  localStorage.setItem("rentnest_all_users", JSON.stringify(updated));
  window.dispatchEvent(new Event("rentnest_users_updated"));
  return newUser;
};

export const toggleUserStatus = (id: string) => {
  const all = getStoredUsers();
  const updated = all.map((u) => (u.id === id ? { ...u, status: u.status === "active" ? "banned" : "active" } : u));
  localStorage.setItem("rentnest_all_users", JSON.stringify(updated));
  window.dispatchEvent(new Event("rentnest_users_updated"));
};
