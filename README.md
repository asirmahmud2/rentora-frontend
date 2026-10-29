# RENTORA - Property Rental & Booking Platform (Frontend)

RENTORA is a rental marketplace that connects tenants and property owners. Owners list properties, admins review them, and tenants search, save favorites, book, pay online and leave reviews.

This repository is the **Next.js frontend**. It works together with the [RENTORA backend](https://github.com/asirmahmud2/rentora-server).

| | |
|---|---|
| **Live site** | https://rentora-frontend-seven.vercel.app |
| **Backend API** | https://rentora-server-nine.vercel.app |
| **Frontend repository** | https://github.com/asirmahmud2/rentora-frontend |
| **Backend repository** | https://github.com/asirmahmud2/rentora-server |

## Key Features

### For everyone
- Home page with a banner search (location, property type and price sort), six featured properties in an auto-sliding row, a "Why RENTORA" section, four top customer reviews, top locations and animated platform statistics
- Public properties page with search by location, filter by property type and sort by price, all processed by the backend
- Email and password registration and login, plus Google sign-in (new Google users become Tenants)
- Profile page for every role
- Loading, error, not-found and unauthorized pages

### Tenants
- Save and remove favorite properties
- Book a property with move-in and move-out dates, a contact number and notes
- Pay securely with Stripe Checkout, with the total calculated from the rent type (daily, weekly or monthly) and the length of stay
- Booking history with Pending, Approved and Rejected status tabs
- Rate and review properties (one review per property)

### Owners
- Add, edit and delete properties. Listings appear publicly only after an admin approves them.
- See each property's status and read the admin's rejection feedback
- Booking requests table with the tenant's contact number and notes, and Approve and Reject actions

### Admins
- User list with role changes (Tenant, Owner, Admin)
- Property moderation: approve, reject with written feedback, edit and delete
- Booking monitoring with status tabs, search and a details view
- Transaction history with search and a details view

## Tech Stack

| Area | Technology |
|---|---|
| Framework | Next.js 16 (App Router), React 19 |
| Authentication | Better Auth with the MongoDB adapter |
| Payments | Stripe Checkout |
| UI | HeroUI, Tailwind CSS 4, react-icons |
| Animation | Framer Motion |
| Charts and gallery | Recharts, Swiper |

### npm packages

**Dependencies**

| Package | Version | Used for |
|---|---|---|
| `next` | `^16.3.6` | App framework, routing and server actions |
| `react`, `react-dom` | `19.2.8` | UI library |
| `better-auth` | `^1.7.5` | Authentication and sessions |
| `@better-auth/mongo-adapter` | `^1.7.5` | Stores authentication data in MongoDB |
| `mongodb` | `^7.6.0` | Database driver used by Better Auth |
| `stripe` | `^23.0.0` | Creates and verifies Checkout sessions |
| `@heroui/react`, `@heroui/styles` | `^3.2.6` | UI components and toast messages |
| `framer-motion` | `^14.6.0` | Scroll reveals, counters and the featured slider |
| `recharts` | `^3.10.1` | Charts in the dashboards |
| `swiper` | `^14.2.0` | Property image gallery |
| `react-icons` | `^5.7.0` | Icons |

**Dev dependencies:** `tailwindcss` `^4`, `@tailwindcss/postcss` `^4`, `eslint` `^9`, `eslint-config-next` `16.3.6`, `babel-plugin-react-compiler` `1.0.0`

## How It Works

1. **Authentication.** Better Auth creates sessions and stores them in MongoDB. Server actions read the session token and send it to the backend as `Authorization: Bearer <token>`. The backend checks that token against the same database.
2. **Role protection.** Dashboard layouts check the user's role and redirect other users to `/unauthorized`. The backend repeats the role check on every protected API route.
3. **Booking and payment.** The booking modal posts to `/api/checkout_sessions`. That route loads the property, calculates the total and creates a Stripe Checkout session. After payment, Stripe redirects to `/payment/success`, which confirms the payment and asks the backend to create the booking and the transaction record.

## Routes

| Route | Access | Purpose |
|---|---|---|
| `/` | Public | Home page |
| `/properties` | Public | Approved properties with search, filter and sort |
| `/properties/[id]` | Logged in | Property details, favorites, booking and reviews |
| `/login`, `/register` | Public | Authentication |
| `/about`, `/how-it-works` | Public | Information pages |
| `/dashboard/Tenant/*` | Tenant | Overview, bookings, favorites |
| `/dashboard/Owner/*` | Owner | Overview, add property, my properties, booking requests |
| `/dashboard/Admin/*` | Admin | Users, properties, bookings, transactions |
| `/dashboard/profile` | Logged in | Profile |
| `/dashboard/edit/[id]` | Logged in | Edit a property |
| `/payment/success`, `/payment/cancel` | After checkout | Stripe return pages |

## Environment Variables

Create a `.env.local` file in the project root. Never commit it.

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SERVER_URL` | Base URL of the backend API |
| `MONGODB_URI` | MongoDB connection used by Better Auth. It must point to the same database as the backend. |
| `BETTER_AUTH_SECRET` | Secret used to sign and encrypt sessions |
| `BETTER_AUTH_URL` | Public URL of this frontend |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |
| `STRIPE_SECRET_KEY` | Stripe secret key |

**Local development** (fill in your own values):

```env
NEXT_PUBLIC_SERVER_URL=http://localhost:5000
BETTER_AUTH_URL=http://localhost:3000
MONGODB_URI=
BETTER_AUTH_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
STRIPE_SECRET_KEY=
```

**Production** (set these in the hosting provider's settings; the other variables stay the same):

```env
NEXT_PUBLIC_SERVER_URL=https://rentora-server-nine.vercel.app
BETTER_AUTH_URL=https://rentora-frontend-seven.vercel.app
```

## Getting Started

**Requirements:** Node.js 20.19 or newer, npm, a MongoDB database, a Stripe account (test keys work for development) and a Google OAuth client.

```bash
# 1. Clone and install
git clone https://github.com/asirmahmud2/rentora-frontend.git
cd rentora-frontend
npm install

# 2. Create .env.local (see above)

# 3. Start the backend first (see the backend repository), then run:
npm run dev
```

The app runs at http://localhost:3000.

| Script | Purpose |
|---|---|
| `npm run dev` | Start the development server |
| `npm run lint` | Check the code with ESLint |
| `npm run build` | Create a production build |
| `npm run start` | Run the production build |

**Google sign-in:** add these redirect URIs in the Google Cloud console.

```text
http://localhost:3000/api/auth/callback/google
https://rentora-frontend-seven.vercel.app/api/auth/callback/google
```

## Project Structure

```text
src/
├── app/
│   ├── page.js, layout.js        Home page and root layout
│   ├── api/
│   │   ├── auth/[...all]/        Better Auth handler
│   │   └── checkout_sessions/    Stripe Checkout session creation
│   ├── properties/               Property list and details
│   ├── dashboard/                Tenant, Owner, Admin, profile and edit pages
│   ├── payment/                  Success and cancel pages
│   ├── login/, register/         Authentication pages
│   ├── Server/                   Server actions and API helpers
│   └── error.jsx, loading.jsx, not-found.jsx, unauthorized/
├── Component/
│   ├── HomePage/                 Navbar, footer and home sections
│   ├── Dashboard/                Dashboard sidebar
│   └── Property/                 Booking modal, price helper, reviews
└── lib/                          Auth, session, MongoDB and Stripe helpers
```

## Deployment

The app is deployed on Vercel. Add every environment variable above in the Vercel project settings, set `BETTER_AUTH_URL` and the Google redirect URI to the deployed address, and redeploy after any change to environment variables.

## Known Limitations

- **Bookings are created from the payment success page.** There is no Stripe webhook, so a booking is not created if the browser is closed before that page loads.
- **No availability check.** The same property can be booked for overlapping dates.
- **No notifications.** Booking approvals and rejections appear in the tenant dashboard, but no email or push message is sent.
- **Reviews are not linked to stays.** Any tenant can review a property once, and a review cannot be edited or deleted afterwards.
- **Some analytics are placeholders.** The Owner overview (summary cards and earnings chart) and the Admin analytics panel show sample values and are not calculated from bookings.

## Author

Built by **asirmahmud2** - [GitHub](https://github.com/asirmahmud2)