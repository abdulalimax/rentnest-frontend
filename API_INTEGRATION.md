# RentNest - API Integration & Route Mapping

This document maps all frontend components and user journeys to their corresponding backend API endpoints.

## 📌 API Endpoints Mapping Table

| Frontend Route / Component | HTTP Method | Backend API Endpoint | Description |
| :--- | :--- | :--- | :--- |
| **Home Page** (/) | GET | /api/properties | Fetches featured rental property listings. |
| **Properties Directory** (/properties) | GET | /api/properties | Fetches all properties with real-time category & price filters. |
| **Property Details** (/properties/[id]) | GET | /api/properties/[id] | Fetches single detailed property data & landlord information. |
| **User Login** (/login) | POST | /api/auth/login | Authenticates Tenant, Landlord, or Admin credentials. |
| **User Registration** (/register) | POST | /api/auth/register | Registers new accounts with specific role selection. |
| **Tenant Dashboard** (/dashboard/tenant) | GET | /api/rentals | Fetches tenant rental requests and status badges. |
| **Payment Gateway Checkout** | POST | /api/payments/create | Initiates secure Stripe/SSLCommerz payment session. |
| **Payment Success Callback** (/payment/success) | GET | /payment/success | Confirms payment settlement and unlocks review form. |
| **Landlord Dashboard** (/dashboard/landlord) | GET | /api/landlord/properties | Displays landlord listings and active earnings. |
| **Request Management** (/dashboard/landlord) | PATCH | /api/landlord/requests/:id | Approves or Rejects tenant rental requests. |
| **Admin Moderation** (/dashboard/admin) | GET | /api/admin/users | Lists all platform users with statistics. |
| **User Moderation Action** (/dashboard/admin) | PATCH | /api/admin/users/:id | Banning and unbanning users platform-wide. |

## 🛡️ Authentication & Route Protection
- Protected routes (/dashboard/*) are strictly guarded using **Next.js Middleware**.
- UI dynamically adjusts based on the authenticated user role: **Tenant**, **Landlord**, or **Admin**.
