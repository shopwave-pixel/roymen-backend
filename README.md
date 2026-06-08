# ROYMEN Backend - Express.js + TypeScript

Premium luxury fashion eCommerce backend API for Bangladesh.

---

## 🛠️ Project Structure

```text
/
├── package.json                    # Dependencies
├── tsconfig.json                   # TypeScript configuration
├── render.yaml                     # Render deployment config
├── netlify.toml                    # Legacy (frontend only)
├── server/
│   ├── server.ts                   # Main Express app entry
│   ├── api.ts                      # API routes
│   ├── db.ts                       # Database service (MongoDB/JSON fallback)
│   ├── authMiddleware.ts           # JWT authentication
│   ├── cloudinary.ts               # Image upload service
│   └── emailService.ts             # Order confirmation emails
└── data/
    └── db.json                     # Local persistent storage (auto-created)
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Environment Setup**:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your configuration (see below)

3. **Run Development Server**:
   ```bash
   npm run dev
   ```
   Server runs on `http://localhost:5000`

### Production Build & Deploy

1. **Build TypeScript**:
   ```bash
   npm run build
   ```

2. **Start Server**:
   ```bash
   npm start
   ```

---

## 📋 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user profile
- `PUT /api/auth/address` - Add/update delivery address

### Products
- `GET /api/products` - List all products
- `GET /api/products/:id` - Get product details
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)
- `POST /api/products/:id/review` - Add product review

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user orders or all orders (admin)
- `GET /api/orders/:id` - Get order details
- `POST /api/orders/:id/payment` - Submit payment info
- `POST /api/orders/:id/verify-payment` - Verify payment (admin)
- `PUT /api/orders/:id/status` - Update order status (admin)

### Promotions
- `GET /api/coupons` - Get active coupons
- `POST /api/coupons` - Create coupon (admin)
- `DELETE /api/coupons/:code` - Delete coupon (admin)

### Admin
- `GET /api/admin/analytics` - Get sales analytics
- `GET /api/admin/emails` - Get email logs

---

## 🔑 Environment Variables

Create a `.env` file in the root directory:

```env
# Server
NODE_ENV=development
PORT=5000

# JWT
JWT_SECRET=your_secure_jwt_secret_key_here

# Database (Optional - uses local JSON if not provided)
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/roymen_db

# Cloudinary (Image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email Service
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
SMTP_FROM_NAME=ROYMEN
SMTP_FROM_EMAIL=noreply@roymen.com

# Frontend URL (for email links)
APP_URL=https://roymen.com
```

---

## 🗄️ Database

### MongoDB (Recommended for Production)
- Set `MONGODB_URI` in `.env`
- Automatic connection on startup

### Local JSON Fallback (Development)
- If `MONGODB_URI` not set, uses `data/db.json`
- Fully functional alternative with persistent storage
- Perfect for development without MongoDB setup

---

## 🚀 Deployment on Render

1. Push code to GitHub
2. Create new Web Service on [render.com](https://render.com)
3. Connect GitHub repository
4. Set Build Command: `npm install && npm run build`
5. Set Start Command: `npm start`
6. Add Environment Variables (from `.env`)
7. Deploy!

---

## 📧 Admin Credentials (Development)
- Email: `admin@roymen.com`
- Password: `password123`

---

## 🛡️ Features

✅ JWT Authentication  
✅ Product Management  
✅ Order Processing  
✅ Payment Verification (bKash, Nagad, Cash on Delivery)  
✅ Email Notifications  
✅ Image Upload to Cloudinary  
✅ Admin Analytics  
✅ Coupon/Promo Codes  
✅ Product Reviews & Ratings  
✅ MongoDB + JSON Fallback  

---

## 📝 License

Proprietary - ROYMEN Bangladesh Ltd.


2. **Boot Development Environment**:
   ```bash
   npm run dev
   ```
   Open your browser to `http://localhost:3000` to view the live build.

3. **Verify Build Process**:
   Ensure everything bundles cleanly into the production output:
   ```bash
   npm run build
   ```

---

## 🎯 Direct Netlify Deployment Guide

This applet is fully prepared to be deployed directly to Netlify with zero edits.

### Method 1: Continuous Deployment with GitHub (Recommended)
1. Push this workspace code repository to your GitHub account.
2. Log into your **Netlify Dashboard**, click **Add new site**, and select **Import an existing project**.
3. Choose **GitHub** and authorize access to your repository.
4. Set the following build settings:
   - **Build Command:** `npm run build`
   - **Publish Directory:** `dist`
5. Click **Deploy site**. Netlify automatically hosts, issues SSL, and synchronizes revisions.

### Method 2: Manual Drag & Drop Deploy
1. Compile the production bundle locally:
   ```bash
   npm run build
   ```
2. Drag the newly created `dist/` workspace folder directly into the designated drop zone inside [Netlify Drop](https://app.netlify.com/drop).
3. Your premium store is instantly live in seconds!

---

## ⚜️ Special Vouchers & Campaign Promos
Type these exclusive codes in the checkout drawer to unlock special prices during tests:
- `ROYMEN10`: Applies a flat **10% discount** at checkout.
- `WELCOME15`: Applies an immediate **15% welcome discount** on all menswear.

*Engineered with love in Dhaka, Bangladesh.*
