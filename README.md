# ROYMEN Bangladesh - Premium Fashion eCommerce Store

Wear Confidence. 

An ultra-luxurious, production-ready, client-side fashion eCommerce website engineered for Bangladesh. Built using **React + Vite + TypeScript + Tailwind CSS v4 + React Router + Context API**, completely customized for Bangladeshi consumers with BDT pricing, localized payment structures (bKash, Cash on Delivery, cards), and translation support.

## 🌟 Major Highlights & Luxury Attributes
- **Monochrome Quiet Luxury Theme**: Minimalist black & white editorial style.
- **Durable Client State Context**: Cart and wishlist elements stored in `localStorage` for session retention.
- **Product Search & Filtering Grid**: Instant query search, size pills, category tags, price slider, and various sorters.
- **Multi-lingual support**: Instantly toggle text templates between **English (EN)** and **Bangla (বাং)**.
- **Bespoke Checkout System**: Fully operational delivery address form, county selector, bKash interactive sandbox form, and confirmation receipt.
- **Product details & hand-crafted reviews**: Multi-image thumbnail selection, detail specifications, care guides, and instant client feedback reviews.
- **Netlify Ready deployment**: Dedicated single-page routing, redirects, and custom configuration setup.

---

## 🛠️ Project Folder Layout
```text
/
├── netlify.toml                # Netlify SPA redirect rules
├── package.json                # Dependencies configuration
├── vite.config.ts              # Vite bundle configuration
├── src/
│   ├── main.tsx                # Client entry-point
│   ├── App.tsx                 # Base layout, routing nodes, & custom toasts
│   ├── types.ts                # App typescript models
│   ├── index.css               # Global styling, keyframes, transitions
│   ├── data/
│   │   └── products.ts         # High-resolution Unsplash fashion inventory
│   ├── context/
│   │   └── ShopContext.tsx     # Context state (cart, wishlist, language, theme)
│   ├── components/
│   │   ├── Navbar.tsx          # Utility drawer links & header alerts
│   │   ├── Footer.tsx          # Bangladesh showroom addresses & socials
│   │   ├── ProductCard.tsx     # Animated display layout, sizes, quick buy
│   │   └── CartDrawer.tsx      # Slide-over bag drawer & calculations
```

---

## 🚀 Local Launch Routine

Follow these simple steps to run the application on your local machine:

1. **Install Dependencies**:
   ```bash
   npm install
   ```

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
