# RENTORA — Frontend

RENTORA is a property rental and booking platform that helps tenants discover homes, owners manage listings, and administrators oversee the marketplace. This repository contains the web application, authentication integration, dashboards, and Stripe Checkout entry point.

## Live application

- **Website:** [rentora-frontend-seven.vercel.app](https://rentora-frontend-seven.vercel.app)
- **Backend API:** [rentora-server-nine.vercel.app](https://rentora-server-nine.vercel.app)

## Features

- Browse approved rental properties, search by location, filter by property type, and sort by rent.
- View property galleries, amenities, features, pricing, and owner information.
- Register and sign in with email/password; Google authentication is available when OAuth credentials are configured.
- Role-based dashboards for **Tenant**, **Owner**, and **Admin**.
- Save and remove favorite properties.
- Submit and manage property listings, including administrative approval or rejection.
- Start date-based bookings through Stripe Checkout and display payment outcomes.
- Review and transaction interfaces for the corresponding workflows, subject to the backend endpoints being available.

## Technology stack

- **Next.js 16** — App Router and server-rendered pages
- **React 19** — UI components
- **Tailwind CSS 4** and **HeroUI** — styling and interface components
- **Better Auth** with MongoDB persistence — authentication and sessions
- **Express API** — property and marketplace data
- **Stripe Checkout** — payment flow
- **Framer Motion**, **Swiper**, **Recharts**, and **react-icons** — animation, galleries, charts, and icons

## Getting started

### Requirements

- Node.js compatible with the installed Next.js and MongoDB dependencies (Node.js **20.19+** is recommended)
- npm
- A MongoDB database
- Stripe credentials for the payment flow
- Google OAuth credentials only if Google sign-in is enabled

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create `.env.local` in the frontend repository root:

```dotenv
# MongoDB connection used by Better Auth
MONGODB_URI="mongodb+srv://<username>:<password>@<cluster>/<options>"

# Frontend origin; use the deployed frontend URL in production
BETTER_AUTH_URL="http://localhost:3000"

# Express backend origin
NEXT_PUBLIC_SERVER_URL="http://localhost:5000"

# Optional: Google sign-in
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# Required for Stripe Checkout
STRIPE_SECRET_KEY=""
```

Use the real connection string and credentials from your own services. In production, set the environment variables in the frontend hosting provider and use the deployed backend URL for `NEXT_PUBLIC_SERVER_URL`:

```dotenv
BETTER_AUTH_URL="https://rentora-frontend-seven.vercel.app"
NEXT_PUBLIC_SERVER_URL="https://rentora-server-nine.vercel.app"
```

The frontend and backend MongoDB connection strings should point to the intended MongoDB deployment and the `RENTORA` database. Never commit `.env.local` or real credentials.

### 3. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 4. Validate a production build

```bash
npm run lint
npm run build
npm run start
```

## Project structure

```text
src/
├── app/
│   ├── api/                 # Better Auth and Stripe Checkout routes
│   ├── dashboard/           # Tenant, Owner, and Admin dashboards
│   ├── properties/          # Property listing and details
│   ├── payment/             # Checkout success and cancellation pages
│   ├── login/               # Login
│   ├── register/            # Registration
│   └── Server/              # Server actions and API helpers
├── Component/
│   ├── Dashboard/           # Dashboard navigation and shared UI
│   ├── HomePage/            # Homepage sections
│   └── Property/             # Booking, pricing, gallery, and review UI
└── lib/                     # Auth, user, database, and Stripe helpers
```

## Roles and primary areas

| Role | Main capabilities |
|---|---|
| **Tenant** | Discover properties, save favorites, start bookings, view the tenant dashboard, and use review UI. |
| **Owner** | Submit and manage property listings and review booking requests. |
| **Admin** | Manage users, moderate properties, and access booking and transaction interfaces. |

Access control is handled through Better Auth sessions and role checks in the frontend, with protected API routes enforcing server-side checks where implemented. Client-side role checks should not be treated as a substitute for server-side authorization.

## Main integration flow

1. Better Auth authenticates users and persists auth records in MongoDB.
2. Frontend server actions call the Express API using `NEXT_PUBLIC_SERVER_URL` and send the session token as a bearer token.
3. Tenants start a booking from a property page; the Next.js `/api/checkout_sessions` route creates a Stripe Checkout session.
4. After payment, the success page verifies the Checkout session and requests booking/transaction creation from the backend.

## Implementation notes

- Owner and Admin analytics, homepage statistics, and top-location content include hard-coded demonstration values; they should not be interpreted as live platform metrics.
- The checkout route in the reviewed source snapshot does not explicitly validate the authenticated session before accepting user-related request data. Enforce authentication and derive the user identity on the server before production use.
- The frontend calls booking-list/status, transaction-history, and review endpoints. Confirm those endpoints exist in the deployed backend before relying on those dashboard and review flows; they were not present in the reviewed Express entry file.
- Some navigation links point to routes that were not present in the reviewed source snapshot, including password recovery, profile editing, and several footer pages.

## Deployment

The frontend is deployed on Vercel. Configure the environment variables above in the Vercel project settings, ensure the backend URL is correct, and redeploy after changing environment configuration.
