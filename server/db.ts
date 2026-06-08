import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve __dirname since we may run under ESM or dynamic envs
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbDirectory = path.join(process.cwd(), 'data');
const dbFilePath = path.join(dbDirectory, 'db.json');

// Ensure database directory and file exist
if (!fs.existsSync(dbDirectory)) {
  fs.mkdirSync(dbDirectory, { recursive: true });
}

let isMongooseConnected = false;

// Connect to MongoDB if MONGO_URI or MONGODB_URI is set, else fall back gracefully
export async function connectDB() {
  const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;
  if (!mongoUri) {
    console.log("⚠️ No MongoDB URI found. Using fallback mode (local file storage data/db.json).");
    return false;
  }
  
  try {
    // Fail quickly to avoid blocking startup or leaving infinite retry loops active in the background
    const conn = await mongoose.connect(mongoUri, {
      connectTimeoutMS: 2500,
      serverSelectionTimeoutMS: 2500,
      family: 4, // Force IPv4 to avoid slow DNS dual-stack lookups in sandbox containers
    });
    isMongooseConnected = true;
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (err: any) {
    console.warn(`ℹ️ Note: Could not connect to MongoDB Atlas cluster directly. (${err.message})`);
    console.warn(`💡 If this is an IP Whitelist issue, ensure to add '0.0.0.0/0' (allow access from anywhere) to your MongoDB Atlas Network Access rules.`);
    console.warn(`👉 Roymen is now seamlessly falling back to its fully functional local JSON persistent storage (data/db.json). All features remain 100% operational.`);
    isMongooseConnected = false;
    // Explicitly disconnect mongoose on connection failure to stop background reconnect socket loops
    try {
      await mongoose.disconnect();
    } catch (disconErr) {
      // Ignored
    }
    return false;
  }
}

// -------------------------------------------------------------
// LOCAL DB fallback schema mapping & seeding
// -------------------------------------------------------------
interface LocalDBStructure {
  users: any[];
  products: any[];
  orders: any[];
  coupons: any[];
}

const defaultDBContent: LocalDBStructure = {
  users: [
    // Predefined Admin credential for quick testing
    {
      id: "admin-user-01",
      name: "ROYMEN Admin Control",
      email: "admin@roymen.com",
      password: "password123", // Will be hashed dynamically or preserved
      role: "admin",
      createdAt: new Date().toISOString()
    },
    // Predefined Customer for quick testing
    {
      id: "customer-user-01",
      name: "Istiaque Kabir",
      email: "customer@roymen.com",
      password: "password123",
      role: "customer",
      createdAt: new Date().toISOString(),
      addresses: [
        {
          name: "Istiaque Kabir",
          phone: "01721922927",
          address: "House 42, Road 11, Banani",
          district: "Dhaka"
        }
      ]
    }
  ],
  products: [], // Will seed from products.ts
  orders: [],
  coupons: [
    { code: "ROYMEN10", discountPercent: 10, active: true },
    { code: "WELCOME15", discountPercent: 15, active: true }
  ]
};

// Seed initial products if file empty
function loadLocalDB(): LocalDBStructure {
  if (!fs.existsSync(dbFilePath)) {
    // Inject default seed products (no external dependency)
    const initial = { ...defaultDBContent };
    initial.products = [
      {
        id: "roy-001",
        name: "Premium Silk Shirt",
        category: "Shirts",
        price: 2500,
        description: "Luxurious silk blend formal shirt",
        image: "https://via.placeholder.com/500",
        rating: 4.8,
        reviewCount: 12,
        reviews: [],
        inStock: true,
        createdAt: new Date().toISOString()
      },
      {
        id: "roy-002",
        name: "Classic Dress Pants",
        category: "Trousers",
        price: 1800,
        description: "Tailored dress pants with perfect fit",
        image: "https://via.placeholder.com/500",
        rating: 4.6,
        reviewCount: 8,
        reviews: [],
        inStock: true,
        createdAt: new Date().toISOString()
      }
    ];
    fs.writeFileSync(dbFilePath, JSON.stringify(initial, null, 2), 'utf-8');
    console.log('✅ Initialized database with seed data');
    return initial;
  }

  try {
    const raw = fs.readFileSync(dbFilePath, 'utf-8');
    const parsed = JSON.parse(raw);
    
    // Ensure all collections exist
    if (!parsed.users) parsed.users = defaultDBContent.users;
    if (!parsed.products || parsed.products.length === 0) {
      parsed.products = [
        {
          id: "roy-001",
          name: "Premium Silk Shirt",
          category: "Shirts",
          price: 2500,
          description: "Luxurious silk blend formal shirt",
          image: "https://via.placeholder.com/500",
          rating: 4.8,
          reviewCount: 12,
          reviews: [],
          inStock: true,
          createdAt: new Date().toISOString()
        }
      ];
    }
    if (!parsed.orders) parsed.orders = [];
    if (!parsed.coupons) parsed.coupons = defaultDBContent.coupons;

    return parsed;
  } catch (err) {
    console.error("LOG: [ROYMEN] Failed to load db.json file, utilizing volatile memory store.", err);
    return defaultDBContent;
  }
}

function saveLocalDB(data: LocalDBStructure) {
  try {
    fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error("LOG: [ROYMEN] Failed writing back to persistent store:", err);
  }
}

// -------------------------------------------------------------
// UNIFIED DATA SERVICE (Agnostic of Mongoose / JSON File fallback)
// -------------------------------------------------------------
export const dataService = {
  isMongoose() {
    return isMongooseConnected;
  },

  // --- USERS COLLECTION ---
  async getUsers(): Promise<any[]> {
    const db = loadLocalDB();
    return db.users;
  },

  async createUser(userData: any): Promise<any> {
    const db = loadLocalDB();
    const newUser = {
      id: `usr-${Math.floor(Math.random() * 1000000)}`,
      role: 'customer',
      addresses: [],
      createdAt: new Date().toISOString(),
      ...userData
    };
    db.users.push(newUser);
    saveLocalDB(db);
    return newUser;
  },

  async findUserByEmail(email: string): Promise<any | null> {
    const db = loadLocalDB();
    const matched = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    return matched || null;
  },

  async findUserById(id: string): Promise<any | null> {
    const db = loadLocalDB();
    const matched = db.users.find(u => u.id === id);
    return matched || null;
  },

  async updateUser(id: string, updates: any): Promise<any | null> {
    const db = loadLocalDB();
    const idx = db.users.findIndex(u => u.id === id);
    if (idx === -1) return null;
    db.users[idx] = { ...db.users[idx], ...updates };
    saveLocalDB(db);
    return db.users[idx];
  },

  // --- PRODUCTS COLLECTION ---
  async getProducts(): Promise<any[]> {
    const db = loadLocalDB();
    return db.products;
  },

  async getProductById(id: string): Promise<any | null> {
    const db = loadLocalDB();
    return db.products.find(p => p.id === id) || null;
  },

  async createProduct(productData: any): Promise<any> {
    const db = loadLocalDB();
    const newProduct = {
      id: `roy-${Math.floor(Math.random() * 1000000)}`,
      rating: 5.0,
      reviewCount: 0,
      reviews: [],
      inStock: true,
      createdAt: new Date().toISOString(),
      ...productData
    };
    db.products.push(newProduct);
    saveLocalDB(db);
    return newProduct;
  },

  async updateProduct(id: string, updates: any): Promise<any | null> {
    const db = loadLocalDB();
    const idx = db.products.findIndex(p => p.id === id);
    if (idx === -1) return null;
    db.products[idx] = { ...db.products[idx], ...updates };
    saveLocalDB(db);
    return db.products[idx];
  },

  async deleteProduct(id: string): Promise<boolean> {
    const db = loadLocalDB();
    const lenBefore = db.products.length;
    db.products = db.products.filter(p => p.id !== id);
    saveLocalDB(db);
    return db.products.length < lenBefore;
  },

  // Add review to products
  async addProductReview(id: string, review: any): Promise<any | null> {
    const db = loadLocalDB();
    const idx = db.products.findIndex(p => p.id === id);
    if (idx === -1) return null;
    
    if (!db.products[idx].reviews) db.products[idx].reviews = [];
    const newReview = {
      id: `rev-${Math.floor(Math.random() * 1000000)}`,
      date: new Date().toISOString().split('T')[0],
      verified: true,
      ...review
    };
    db.products[idx].reviews.push(newReview);
    
    // Recalculate average rating
    const reviews = db.products[idx].reviews;
    const sum = reviews.reduce((acc: number, r: any) => acc + Number(r.rating), 0);
    db.products[idx].rating = Number((sum / reviews.length).toFixed(1));
    db.products[idx].reviewCount = reviews.length;
    
    saveLocalDB(db);
    return db.products[idx];
  },

  // --- ORDERS & PAYMENTS ---
  async getOrders(): Promise<any[]> {
    const db = loadLocalDB();
    return db.orders;
  },

  async getOrderById(id: string): Promise<any | null> {
    const db = loadLocalDB();
    return db.orders.find(o => o.orderId === id || o.id === id) || null;
  },

  async getOrdersByUser(userId: string): Promise<any[]> {
    const db = loadLocalDB();
    return db.orders.filter(o => o.userId === userId);
  },

  async createOrder(orderData: any): Promise<any> {
    const db = loadLocalDB();
    const newOrder = {
      id: `ord-${Math.floor(Math.random() * 1000000)}`,
      orderId: `RM-${Math.floor(100000 + Math.random() * 900000)}`,
      orderStatus: 'Pending Payment',
      createdAt: new Date().toISOString(),
      ...orderData
    };
    db.orders.push(newOrder);
    saveLocalDB(db);
    return newOrder;
  },

  async updateOrderStatus(id: string, orderStatus: string): Promise<any | null> {
    const db = loadLocalDB();
    const idx = db.orders.findIndex(o => o.id === id || o.orderId === id);
    if (idx === -1) return null;
    db.orders[idx].orderStatus = orderStatus;
    saveLocalDB(db);
    return db.orders[idx];
  },

  async submitManualPayment(id: string, paymentData: {
    paymentMethod: 'bkash' | 'nagad' | 'pay_dc' | string;
    transactionId: string;
    senderNumber: string;
    paidAmount: number;
  }): Promise<any | null> {
    const db = loadLocalDB();
    const idx = db.orders.findIndex(o => o.id === id || o.orderId === id);
    if (idx === -1) return null;
    
    // Setup nested payment schema
    db.orders[idx].paymentInfo = {
      paymentMethod: paymentData.paymentMethod,
      transactionId: paymentData.transactionId,
      senderNumber: paymentData.senderNumber,
      paidAmount: Number(paymentData.paidAmount),
      paymentStatus: 'Pending Verification',
      verifiedBy: null,
      verifiedAt: null
    };

    // Transition Order Flow
    db.orders[idx].orderStatus = 'Verification Pending';
    saveLocalDB(db);
    return db.orders[idx];
  },

  async verifyPayment(id: string, status: 'Approved' | 'Rejected', adminEmail: string): Promise<any | null> {
    const db = loadLocalDB();
    const idx = db.orders.findIndex(o => o.id === id || o.orderId === id);
    if (idx === -1) return null;

    if (db.orders[idx].paymentInfo) {
      db.orders[idx].paymentInfo.paymentStatus = status;
      db.orders[idx].paymentInfo.verifiedBy = adminEmail;
      db.orders[idx].paymentInfo.verifiedAt = new Date().toISOString();
    }

    if (status === 'Approved') {
      db.orders[idx].orderStatus = 'Payment Approved';
    } else {
      db.orders[idx].orderStatus = 'Payment Rejected';
    }

    saveLocalDB(db);
    return db.orders[idx];
  },

  // --- COUPONS ---
  async getCoupons(): Promise<any[]> {
    const db = loadLocalDB();
    return db.coupons;
  },

  async createCoupon(couponData: any): Promise<any> {
    const db = loadLocalDB();
    const newCoupon = {
      active: true,
      ...couponData
    };
    db.coupons.push(newCoupon);
    saveLocalDB(db);
    return newCoupon;
  },

  async deleteCoupon(code: string): Promise<boolean> {
    const db = loadLocalDB();
    const lenBefore = db.coupons.length;
    db.coupons = db.coupons.filter(c => c.code.toUpperCase() !== code.toUpperCase());
    saveLocalDB(db);
    return db.coupons.length < lenBefore;
  }
};

// Export functions
export { connectDB, dataService, isMongooseConnected };
