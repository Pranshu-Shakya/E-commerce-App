# eCart – E‑commerce App (MERN Monorepo)

A full‑stack e‑commerce platform built with React + Vite (Shopper & Admin panels), Tailwind CSS, and an Express/MongoDB backend. It supports product management with Cloudinary uploads, user authentication with JWT (cookies), email OTP verification, cart & orders, and Stripe Checkout.

## Monorepo Structure

```
E-commerce App/
├─ admin/      # React + Vite Admin Panel
├─ backend/    # Express API + MongoDB + Cloudinary + Stripe
└─ frontend/   # React + Vite Shopper App
```

## Features

- Shopper App (frontend)
  - Home with hero, latest collection, bestsellers
  - Product listing with sizes, cart & checkout (COD and Stripe Checkout)
  - Orders history & order status
  - Auth with JWT cookies, profile management, change password
  - Email verification via 6‑digit OTP (Brevo/SMTP)
- Admin Panel (admin)
  - Admin login (env‑driven credentials)
  - Add/list products with multiple images (Cloudinary)
  - Toggle bestseller, manage sizes/categories
  - View & update order status
- Backend API (backend)
  - Express + MongoDB (Mongoose)
  - JWT access/refresh tokens (cookies), CORS configured
  - Cloudinary media uploads
  - Stripe Checkout session creation & verification
  - Email OTP delivery/verification via SMTP (Brevo relay)

## Tech Stack

- Frontend/Admin: React 19, Vite, Tailwind CSS, React Router, Axios, React‑Toastify
- Backend: Node.js, Express 5, Mongoose 8, JWT, Multer, Cloudinary, Stripe, Nodemailer, dotenv
- DB/Infra: MongoDB, Cloudinary, Stripe, Brevo SMTP (or any SMTP)

## Prerequisites

- Node.js 18+ and npm
- MongoDB connection string (Atlas or local)
- Cloudinary account (cloud name, API key/secret)
- Stripe account (Secret key)
- SMTP provider (Brevo credentials recommended)

## Environment Variables

Create a `.env` file in each app based on the examples below.

### Backend (`backend/.env`)

```
PORT=4000
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net

# JWT
JWT_SECRET=your_jwt_secret
NODE_ENV=development

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_SECRET_KEY=your_api_secret

# Stripe
STRIPE_SECRET_KEY=sk_test_...

# SMTP (Brevo or other)
SMTP_USER=your_smtp_user
SMTP_PASSWORD=your_smtp_password
SENDER_NAME=Forever
SENDER_EMAIL=no-reply@forever.com

# Admin login (for Admin Panel)
ADMIN_EMAIL=admin@forever.com
ADMIN_PASSWORD=change_me
```

### Frontend (`frontend/.env`)

```
VITE_BACKEND_URL=http://localhost:4000
# Optional if enabling Razorpay frontend flow later
VITE_RAZORPAY_KEY_ID=
```

### Admin (`admin/.env`)

```
VITE_BACKEND_URL=http://localhost:4000
```

You can commit `.env.example` files but never commit real `.env`.

## Install & Run Locally

Install dependencies in each app:

```bash
# backend
cd backend
npm install

# frontend
cd ../frontend
npm install

# admin
cd ../admin
npm install
```

Start the apps (use three terminals):

```bash
# Terminal 1 – backend
cd backend
npm run server   # runs nodemon server.js on PORT (default 4000)

# Terminal 2 – frontend (Shopper App)
cd frontend
npm run dev      # Vite on :5173

# Terminal 3 – admin (Admin Panel)
cd admin
npm run dev      # Vite on :5174 (or next free port)
```

Now visit:
- Shopper App: http://localhost:5173
- Admin Panel: http://localhost:5174
- API: http://localhost:4000

Note: CORS is configured for `http://localhost:5173` and the deployed frontend URL. If your ports differ, update backend CORS.

## Build & Deploy

- Frontend/Admin: `npm run build` creates `dist/`. Deploy to any static host (e.g., Vercel). `vercel.json` files are present.
- Backend: Node server (`npm start`). You can deploy to Render, Railway, or Vercel Serverless depending on your setup.

## Key API Endpoints (summary)

- Auth/User: `POST /api/user/register`, `POST /api/user/login`, `POST /api/user/logout`, `POST /api/user/send-otp`, `POST /api/user/verify-otp`, `GET /api/user/profile`, `POST /api/user/update-profile`, `POST /api/user/change-password`
- Products (Admin): `POST /api/product/add`, `POST /api/product/remove`, `GET /api/product/list` (and other product routes)
- Cart: `POST /api/cart/add`, `POST /api/cart/remove`, `GET /api/cart/get`
- Orders: `POST /api/order/place`, `POST /api/order/place-stripe`, `POST /api/order/verify-stripe`, `POST /api/order/userorders`, `GET /api/order/list` (admin), `POST /api/order/status`

Most user endpoints rely on cookies for JWT; use `withCredentials: true` in Axios.

## Development Notes

- Image Uploads: Files are sent from Admin via Multer, uploaded to Cloudinary in the backend.
- Payments: Stripe Checkout is implemented; Razorpay hooks are scaffolded but commented.
- Cookies: Access/Refresh tokens are set as HTTP‑only cookies. Ensure sameSite/secure flags are configured for production.

## Scripts

- Backend: `npm run server` (dev, nodemon), `npm start` (prod)
- Frontend/Admin: `npm run dev`, `npm run build`, `npm run preview`, `npm run lint`

## Security

- Do not commit `.env` files or secrets. Rotate any keys that may have been committed historically.
- Set strong `JWT_SECRET`, `ADMIN_PASSWORD`, and SMTP credentials.

## License

ISC — © Pranshu Shakya
