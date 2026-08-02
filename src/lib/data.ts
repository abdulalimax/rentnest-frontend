import { Property, User, RentalRequest } from "@/types";

export const initialUsers: User[] = [
  { id: "u1", name: "John Tenant", email: "tenant@rentnest.com", role: "Tenant", isBanned: false },
  { id: "u2", name: "Sarah Landlord", email: "landlord@rentnest.com", role: "Landlord", isBanned: false },
  { id: "u3", name: "Admin User", email: "admin@rentnest.com", role: "Admin", isBanned: false },
];

export const initialProperties: Property[] = [
  {
    id: "p1",
    title: "Modern Luxury Apartment in Gulshan",
    description: "Spacious 3-bedroom luxury apartment with full city view, modern kitchen, 24/7 security, and dedicated parking space.",
    price: 1200,
    location: "Gulshan, Dhaka",
    type: "Apartment",
    amenities: ["WiFi", "Parking", "Gym", "Security"],
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
    isAvailable: true,
    landlordId: "u2",
    landlordName: "Sarah Landlord",
  },
  {
    id: "p2",
    title: "Cozy Studio Flat Near University",
    description: "Perfect for students or working professionals. Fully furnished studio with high-speed internet and quiet atmosphere.",
    price: 450,
    location: "Dhanmondi, Dhaka",
    type: "Studio",
    amenities: ["WiFi", "Air Conditioning", "Furnished"],
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
    isAvailable: true,
    landlordId: "u2",
    landlordName: "Sarah Landlord",
  },
  {
    id: "p3",
    title: "Spacious Family Duplex",
    description: "Beautiful 4-bedroom duplex with private garden, garage, and quiet neighborhood. Great location near top schools.",
    price: 2200,
    location: "Uttara, Dhaka",
    type: "Duplex",
    amenities: ["Garden", "Garage", "Pet Friendly", "Security"],
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
    isAvailable: true,
    landlordId: "u2",
    landlordName: "Sarah Landlord",
  }
];

export const initialRequests: RentalRequest[] = [
  {
    id: "req1",
    propertyId: "p1",
    propertyTitle: "Modern Luxury Apartment in Gulshan",
    tenantId: "u1",
    tenantName: "John Tenant",
    landlordId: "u2",
    price: 1200,
    status: "APPROVED",
    createdAt: "2026-08-01",
  }
];

