# RentNest - API Integration Mapping

## Authentication Endpoints
- **POST** `/api/auth/login` -> `src/app/(auth)/login/page.tsx`
- **POST** `/api/auth/register` -> `src/app/(auth)/register/page.tsx`

## Property Management Endpoints
- **GET** `/api/properties` -> `src/app/properties/page.tsx`
- **GET** `/api/properties/:id` -> `src/app/properties/[id]/page.tsx`
- **POST** `/api/landlord/properties` -> `src/app/(dashboard)/dashboard/landlord/page.tsx`

## Rental Requests Endpoints
- **GET** `/api/rentals` -> `src/app/(dashboard)/dashboard/tenant/page.tsx`
- **POST** `/api/rentals/request` -> `src/app/properties/[id]/page.tsx`
- **GET** `/api/landlord/requests` -> `src/app/(dashboard)/dashboard/landlord/page.tsx`
- **PATCH** `/api/landlord/requests/:id` -> `src/app/(dashboard)/dashboard/landlord/page.tsx`

## Payment Integration Endpoints
- **POST** `/api/payments/create` -> `src/app/(dashboard)/dashboard/tenant/page.tsx`
- **GET** `/payment/success` -> `src/app/payment/success/page.tsx`
- **GET** `/payment/cancel` -> `src/app/payment/cancel/page.tsx`

## Admin Moderation Endpoints
- **GET** `/api/admin/users` -> `src/app/(dashboard)/dashboard/admin/page.tsx`
- **PATCH** `/api/admin/users/:id` -> `src/app/(dashboard)/dashboard/admin/page.tsx`

