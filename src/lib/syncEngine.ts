export interface RentalRequest {
  id: string;
  propertyId: string;
  propertyTitle: string;
  tenantName: string;
  tenantEmail: string;
  rentAmount: number;
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
    rentAmount: 65000,
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
    rentAmount: 52000,
    moveInDate: "2026-11-01",
    status: "Pending",
    paymentCompleted: false,
  },
];

export const getStoredRequests = (): RentalRequest[] => {
  if (typeof window === "undefined") return DEFAULT_REQUESTS;
  const data = localStorage.getItem("rentnest_all_requests");
  if (!data) {
    localStorage.setItem("rentnest_all_requests", JSON.stringify(DEFAULT_REQUESTS));
    return DEFAULT_REQUESTS;
  }
  try {
    const parsed = JSON.parse(data);
    // Sanitize any corrupt objects
    return parsed.map((item: any) => ({
      id: String(item.id || "req_" + Date.now()),
      propertyId: String(item.propertyId || "p5"),
      propertyTitle: String(item.propertyTitle || "Residential Flat"),
      tenantName: String(item.tenantName || "John Tenant"),
      tenantEmail: String(item.tenantEmail || "tenant@rentnest.com"),
      rentAmount: Number(String(item.rentAmount || item.rent || "32000").replace(/[^0-9]/g, "")) || 32000,
      moveInDate: String(item.moveInDate || new Date().toISOString().split("T")[0]),
      status: item.status || "Pending",
      paymentCompleted: !!item.paymentCompleted,
    }));
  } catch {
    return DEFAULT_REQUESTS;
  }
};

export const saveRequest = (req: Partial<RentalRequest>) => {
  const all = getStoredRequests();
  const numericRent = Number(String(req.rentAmount || (req as any).rent || "32000").replace(/[^0-9]/g, "")) || 32000;
  const newReq: RentalRequest = {
    id: "req_" + Date.now(),
    propertyId: String(req.propertyId || "p5"),
    propertyTitle: String(req.propertyTitle || "Concord Tower Residential Complex"),
    tenantName: String(req.tenantName || "John Tenant"),
    tenantEmail: String(req.tenantEmail || "tenant@rentnest.com"),
    rentAmount: numericRent,
    moveInDate: req.moveInDate || new Date(Date.now() + 14 * 86400000).toISOString().split("T")[0],
    status: req.status || "Pending",
    paymentCompleted: false,
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
