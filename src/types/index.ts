export type Role = "Tenant" | "Landlord" | "Admin";

export type RentalStatus = "PENDING" | "APPROVED" | "REJECTED" | "ACTIVE" | "COMPLETED";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  isBanned?: boolean;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  type: string;
  amenities: string[];
  image: string;
  isAvailable: boolean;
  landlordId: string;
  landlordName: string;
}

export interface RentalRequest {
  id: string;
  propertyId: string;
  propertyTitle: string;
  tenantId: string;
  tenantName: string;
  landlordId: string;
  price: number;
  status: RentalStatus;
  createdAt: string;
}

