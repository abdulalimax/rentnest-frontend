"use client";

import { useState, useEffect } from "react";
import { initialProperties, initialRequests, Property, RentalRequest } from "@/lib/data";

export default function LandlordDashboard() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [requests, setRequests] = useState<RentalRequest[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    location: "Gulshan, Dhaka",
    category: "Apartment",
    bedrooms: 3,
    bathrooms: 2,
    size: 1500,
    image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200",
    description: "Modern luxurious family apartment in Dhaka."
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  useEffect(() => {
    const savedProps = localStorage.getItem("rentnest_properties");
    if (savedProps) {
      setProperties(JSON.parse(savedProps));
    } else {
      setProperties(initialProperties);
      localStorage.setItem("rentnest_properties", JSON.stringify(initialProperties));
    }

    const savedReqs = localStorage.getItem("rentnest_requests");
    if (savedReqs) {
      setRequests(JSON.parse(savedReqs));
    } else {
      setRequests(initialRequests);
      localStorage.setItem("rentnest_requests", JSON.stringify(initialRequests));
    }
  }, []);

  const saveProperties = (newProps: Property[]) => {
    setProperties(newProps);
    localStorage.setItem("rentnest_properties", JSON.stringify(newProps));
  };

  const saveRequests = (newReqs: RentalRequest[]) => {
    setRequests(newReqs);
    localStorage.setItem("rentnest_requests", JSON.stringify(newReqs));
  };

  // Status Update (Approve / Reject)
  const handleStatusChange = (id: string, status: "Approved" | "Rejected") => {
    const updated = requests.map((req) => (req.id === id ? { ...req, status } : req));
    saveRequests(updated);
    showToast(`Request ${status} successfully!`);
  };

  // Delete Property
  const handleDeleteProperty = (id: string) => {
    if (confirm("Are you sure you want to delete this property listing?")) {
      const updated = properties.filter((p) => p.id !== id);
      saveProperties(updated);
      showToast("Property deleted successfully!");
    }
  };

  // Open Edit Modal
  const handleEditClick = (prop: Property) => {
    setEditingProperty(prop);
    setFormData({
      title: prop.title,
      price: prop.price.toString(),
      location: prop.location,
      category: prop.category,
      bedrooms: prop.bedrooms,
      bathrooms: prop.bathrooms,
      size: prop.size,
      image: (prop as any).image || prop.images?.[0] || "",
      description: prop.description
    });
    setShowAddModal(true);
  };

  // Open Add Modal
  const handleAddClick = () => {
    setEditingProperty(null);
    setFormData({
      title: "",
      price: "",
      location: "Gulshan, Dhaka",
      category: "Apartment",
      bedrooms: 3,
      bathrooms: 2,
      size: 1500,
      image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200",
      description: "Modern luxurious family apartment in Dhaka."
    });
    setShowAddModal(true);
  };

  // Handle Form Submit (Create or Update)
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.title.trim() || !formData.price || Number(formData.price) <= 0) {
      showToast("Error: Title and a valid Rent Price are required!");
      return;
    }

    if (editingProperty) {
      // Update
      const updated = properties.map((p) =>
        p.id === editingProperty.id
          ? {
              ...p,
              title: formData.title,
              price: Number(formData.price),
              location: formData.location,
              bedrooms: Number(formData.bedrooms),
              bathrooms: Number(formData.bathrooms),
              size: Number(formData.size),
              image: formData.image,
              images: [formData.image],
              description: formData.description
            }
          : p
      );
      saveProperties(updated);
      showToast("Property updated successfully!");
    } else {
      // Create
      const newProp: Property = {
        id: "p_" + Date.now(),
        title: formData.title,
        price: Number(formData.price),
        location: formData.location,
        category: formData.category,
        bedrooms: Number(formData.bedrooms),
        bathrooms: Number(formData.bathrooms),
        size: Number(formData.size),
        amenities: ["24/7 Security", "Elevator", "Generator Backup", "Car Parking"],
        image: formData.image,
        images: [formData.image],
        landlordId: "u_landlord",
        landlordName: "David Landlord",
        isAvailable: true,
        featured: false,
        description: formData.description
      } as any;
      saveProperties([newProp, ...properties]);
      showToast("New property published successfully!");
    }

    setShowAddModal(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Toast Notification */}
      {toastMessage && (
        <div className={`fixed top-6 right-6 z-50 px-5 py-3 rounded-lg shadow-xl text-white font-medium ${toastMessage.startsWith("Error") ? "bg-red-600" : "bg-emerald-600"}`}>
          {toastMessage}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b border-slate-200 mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Landlord Portal</h1>
          <p className="text-slate-500 text-sm mt-1">Manage incoming tenant requests & listings</p>
        </div>
        <button
          onClick={handleAddClick}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-lg flex items-center gap-2 shadow-sm transition"
        >
          <span>⊕</span> Add Property
        </button>
      </div>

      {/* 1. Incoming Rental Requests Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-10">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-900">Incoming Rental Requests</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-400 font-semibold text-xs uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-4 px-6">Property</th>
                <th className="py-4 px-6">Tenant</th>
                <th className="py-4 px-6">Rent Price</th>
                <th className="py-4 px-6">Current Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {requests.map((req) => (
                <tr key={req.id} className="hover:bg-slate-50/70 transition">
                  <td className="py-4 px-6 font-semibold text-slate-900">{req.propertyTitle}</td>
                  <td className="py-4 px-6">{req.tenantName}</td>
                  <td className="py-4 px-6 font-semibold text-slate-800">
                    ৳{req.rentAmount ? req.rentAmount.toLocaleString() : "45,000"} / mo
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-block px-3 py-1 text-xs rounded-full font-semibold ${
                        req.status === "Approved"
                          ? "bg-blue-100 text-blue-700"
                          : req.status === "Rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {req.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right space-x-2">
                    <button
                      onClick={() => handleStatusChange(req.id, "Approved")}
                      className="inline-flex items-center gap-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold px-3 py-1.5 rounded-md text-xs border border-emerald-200 transition"
                    >
                      ✓ Approve
                    </button>
                    <button
                      onClick={() => handleStatusChange(req.id, "Rejected")}
                      className="inline-flex items-center gap-1 bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold px-3 py-1.5 rounded-md text-xs border border-rose-200 transition"
                    >
                      ✕ Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2. My Properties Listing Table (CRUD Operations) */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-slate-900">My Properties</h2>
            <p className="text-xs text-slate-500 mt-0.5">Manage, update rental price or remove listings</p>
          </div>
          <span className="text-xs font-semibold bg-slate-100 text-slate-600 px-3 py-1 rounded-full">
            Total: {properties.length} Listings
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-400 font-semibold text-xs uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-4 px-6">Image</th>
                <th className="py-4 px-6">Title</th>
                <th className="py-4 px-6">Location</th>
                <th className="py-4 px-6">Monthly Rent</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {properties.map((prop) => (
                <tr key={prop.id} className="hover:bg-slate-50/70 transition">
                  <td className="py-4 px-6">
                    <img
                      src={(prop as any).image || prop.images?.[0]}
                      alt={prop.title}
                      className="w-16 h-12 rounded object-cover border border-slate-200"
                    />
                  </td>
                  <td className="py-4 px-6 font-semibold text-slate-900">{prop.title}</td>
                  <td className="py-4 px-6">{prop.location}</td>
                  <td className="py-4 px-6 font-bold text-slate-900">৳{prop.price?.toLocaleString()}</td>
                  <td className="py-4 px-6 text-right space-x-2">
                    <button
                      onClick={() => handleEditClick(prop)}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold px-3 py-1.5 rounded-md text-xs transition"
                    >
                      ✏ Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProperty(prop.id)}
                      className="bg-red-50 hover:bg-red-100 text-red-600 font-semibold px-3 py-1.5 rounded-md text-xs border border-red-200 transition"
                    >
                      🗑 Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl animate-in fade-in zoom-in duration-150">
            <h3 className="text-xl font-bold text-slate-900 mb-4">
              {editingProperty ? "Edit Property Details" : "Add New Property Listing"}
            </h3>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Property Title</label>
                <input
                  type="text"
                  placeholder="e.g. Modern Luxury Apartment in Gulshan"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Monthly Rent (৳)</label>
                  <input
                    type="number"
                    placeholder="55000"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Beds</label>
                  <input
                    type="number"
                    value={formData.bedrooms}
                    onChange={(e) => setFormData({ ...formData, bedrooms: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Baths</label>
                  <input
                    type="number"
                    value={formData.bathrooms}
                    onChange={(e) => setFormData({ ...formData, bathrooms: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Sqft</label>
                  <input
                    type="number"
                    value={formData.size}
                    onChange={(e) => setFormData({ ...formData, size: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition"
                >
                  {editingProperty ? "Save Changes" : "Create Listing"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
