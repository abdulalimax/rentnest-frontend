export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  category: string;
  bedrooms: number;
  bathrooms: number;
  size: number;
  amenities: string[];
  images: string[];
  landlordId: string;
  landlordName: string;
  isAvailable: boolean;
  featured?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "landlord" | "tenant";
  createdAt?: string;
  status?: string;
}

export interface RentalRequest {
  id: string;
  propertyId: string;
  propertyTitle: string;
  tenantId: string;
  tenantName: string;
  tenantEmail: string;
  landlordId: string;
  status: "Pending" | "Approved" | "Rejected" | "Active" | "Completed" | "Cancelled";
  rentAmount: number;
  moveInDate: string;
  durationMonths: number;
  createdAt: string;
  paymentStatus?: "unpaid" | "paid";
}

export const INITIAL_PROPERTIES: Property[] = [
  {
    id: "p1",
    title: "Modern Luxury Apartment in Gulshan-2",
    description: "Spacious 3-bedroom luxury apartment located in the prime diplomatic zone of Gulshan-2, Dhaka. High security, lake view balcony, and generator backup.",
    price: 65000,
    location: "Gulshan-2, Dhaka",
    category: "Apartment",
    bedrooms: 3,
    bathrooms: 3,
    size: 2150,
    amenities: ["Generator Backup", "24/7 Security", "Car Parking", "Elevator", "Balcony", "Gas Connection"],
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Buildings_in_Gulshan_2%2C_Dhaka.jpg/1280px-Buildings_in_Gulshan_2%2C_Dhaka.jpg",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=80"
    ],
    landlordId: "u_landlord",
    landlordName: "David Landlord",
    isAvailable: true,
    featured: true,
  },
  {
    id: "p2",
    title: "Elegant Residential Flat in Banani",
    description: "Quiet, peaceful and premium residential building in Banani Block C. Close to road 11, supermarkets, and international restaurants.",
    price: 52000,
    location: "Banani, Dhaka",
    category: "Apartment",
    bedrooms: 3,
    bathrooms: 3,
    size: 1850,
    amenities: ["Elevator", "Car Parking", "CCTV Surveillance", "Modern Kitchen", "Intercom"],
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/A_house_in_Banani_Model_Town%2C_Dhaka_01.jpg/1280px-A_house_in_Banani_Model_Town%2C_Dhaka_01.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/A_house_in_Banani_Model_Town%2C_Dhaka_02.jpg/1280px-A_house_in_Banani_Model_Town%2C_Dhaka_02.jpg"
    ],
    landlordId: "u_landlord",
    landlordName: "David Landlord",
    isAvailable: true,
    featured: true,
  },
  {
    id: "p3",
    title: "Spacious Family Flat in Dhanmondi",
    description: "Beautiful south-facing family apartment in Dhanmondi near lakeside. Abundant natural light and ventilation with easy access to top schools.",
    price: 45000,
    location: "Dhanmondi, Dhaka",
    category: "Apartment",
    bedrooms: 3,
    bathrooms: 2,
    size: 1650,
    amenities: ["Lakeside Access", "Generator", "Guard Security", "Wide Balcony", "Tiled Flooring"],
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Apartment_buildings_in_Dhaka_%2830569828554%29.jpg/1280px-Apartment_buildings_in_Dhaka_%2830569828554%29.jpg",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80"
    ],
    landlordId: "u_landlord",
    landlordName: "David Landlord",
    isAvailable: true,
    featured: true,
  },
  {
    id: "p4",
    title: "Contemporary 3-BHK Apartment in Uttara Sector 7",
    description: "Modern apartment right by Uttara Sector 7 park. Wide access roads, metro rail station nearby, and rooftop recreation area.",
    price: 38000,
    location: "Uttara Sector 7, Dhaka",
    category: "Apartment",
    bedrooms: 3,
    bathrooms: 3,
    size: 1550,
    amenities: ["Metro Rail Proximity", "Elevator", "Rooftop Garden", "Security Guards", "Dedicated Parking"],
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&auto=format&fit=crop&q=80"
    ],
    landlordId: "u_landlord",
    landlordName: "David Landlord",
    isAvailable: true,
    featured: false,
  },
  {
    id: "p5",
    title: "Concord Tower Residential Complex in Azimpur",
    description: "Secure and well-managed family residence at Concord complex, Azimpur. Extremely convenient for university faculties and professionals.",
    price: 32000,
    location: "Azimpur, Dhaka",
    category: "Apartment",
    bedrooms: 2,
    bathrooms: 2,
    size: 1250,
    amenities: ["Community Hall", "Gated Security", "Elevator", "Continuous Water Supply", "Maintenance Staff"],
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Concord_Apartment_Buildings%2C_Ajimpur%2C_Dhaka%2C_Bangladesh.jpg/1280px-Concord_Apartment_Buildings%2C_Ajimpur%2C_Dhaka%2C_Bangladesh.jpg",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=80"
    ],
    landlordId: "u_landlord",
    landlordName: "David Landlord",
    isAvailable: true,
    featured: false,
  },
  {
    id: "p6",
    title: "Affordable Cozy Flat in Mirpur DOHS",
    description: "Highly secure cantonment zone residence in Mirpur DOHS. Children play zone, walking trails, and disciplined community environment.",
    price: 30000,
    location: "Mirpur DOHS, Dhaka",
    category: "Apartment",
    bedrooms: 3,
    bathrooms: 2,
    size: 1400,
    amenities: ["DOHS Security", "Park & Walking Track", "Reserved Parking", "CCTV Monitoring", "Clean Air"],
    images: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&auto=format&fit=crop&q=80"
    ],
    landlordId: "u_landlord",
    landlordName: "David Landlord",
    isAvailable: true,
    featured: false,
  }
];

export const INITIAL_USERS: User[] = [
  { id: "u_admin", name: "Super Admin", email: "admin@rentnest.com", role: "admin", createdAt: "2024-01-10", status: "Active" },
  { id: "u_landlord", name: "David Landlord", email: "landlord@rentnest.com", role: "landlord", createdAt: "2024-01-15", status: "Active" },
  { id: "u_tenant", name: "John Tenant", email: "tenant@rentnest.com", role: "tenant", createdAt: "2024-02-01", status: "Active" }
];

export const INITIAL_REQUESTS: RentalRequest[] = [
  {
    id: "req_1",
    propertyId: "p1",
    propertyTitle: "Modern Luxury Apartment in Gulshan-2",
    tenantId: "u_tenant",
    tenantName: "John Tenant",
    tenantEmail: "tenant@rentnest.com",
    landlordId: "u_landlord",
    status: "Approved",
    rentAmount: 65000,
    moveInDate: "2026-04-01",
    durationMonths: 12,
    createdAt: "2026-03-10",
    paymentStatus: "unpaid"
  },
  {
    id: "req_2",
    propertyId: "p2",
    propertyTitle: "Elegant Residential Flat in Banani",
    tenantId: "u_tenant",
    tenantName: "John Tenant",
    tenantEmail: "tenant@rentnest.com",
    landlordId: "u_landlord",
    status: "Pending",
    rentAmount: 52000,
    moveInDate: "2026-05-01",
    durationMonths: 6,
    createdAt: "2026-03-12",
    paymentStatus: "unpaid"
  }
];

export const initialProperties = INITIAL_PROPERTIES;
export const initialUsers = INITIAL_USERS;
export const initialRequests = INITIAL_REQUESTS;
