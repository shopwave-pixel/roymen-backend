import { Router, Response } from 'express';
import bcryptjs from 'bcryptjs';
import { dataService } from './db.js';
import {
  authenticateToken,
  requireAdmin,
  generateToken,
  AuthenticatedRequest
} from './authMiddleware.js';
import { sendOrderConfirmationEmail, emailLogs } from './emailService.js';
import { uploadToCloudinary } from './cloudinary.js';

const router = Router();

// =============================================================
// 1. AUTHENTICATION SERVICES
// =============================================================

// User Registration
router.post('/auth/register', async (req: any, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ message: "All fields (name, email, password) are mandatory." });
    return;
  }

  try {
    const existing = await dataService.findUserByEmail(email);
    if (existing) {
      res.status(400).json({ message: "An account with this email address already exists." });
      return;
    }

    // Encrypt password using bcryptjs
    const salt = bcryptjs.genSaltSync(10);
    const hashedPassword = bcryptjs.hashSync(password, salt);

    const newUser = await dataService.createUser({
      name,
      email,
      password: hashedPassword,
      role: 'customer' // default role is customer
    });

    const token = generateToken({ id: newUser.id, email: newUser.email, role: newUser.role });

    res.status(201).json({
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        addresses: newUser.addresses
      }
    });
  } catch (err) {
    res.status(500).json({ message: "An unexpected error occurred during registration." });
  }
});

// User Sign-In
router.post('/auth/login', async (req: any, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Email and password are required fields." });
    return;
  }

  try {
    const user = await dataService.findUserByEmail(email);
    if (!user) {
      res.status(401).json({ message: "Invalid email and password credentials combination." });
      return;
    }

    // Validate using bcrypt comparison (or direct match for fallback admin accounts if un-hashed)
    const isMatched = user.password.startsWith('$2a$') || user.password.startsWith('$2b$')
      ? bcryptjs.compareSync(password, user.password)
      : password === user.password;

    if (!isMatched) {
      res.status(401).json({ message: "Invalid email and password credentials combination." });
      return;
    }

    const token = generateToken({ id: user.id, email: user.email, role: user.role });

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        addresses: user.addresses || []
      }
    });
  } catch (err) {
    res.status(500).json({ message: "An unexpected error occurred during user sign-in." });
  }
});

// Get Connected User Credentials & addresses
router.get('/auth/me', authenticateToken as any, async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) return;
  try {
    const user = await dataService.findUserById(req.user.id);
    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }
    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        addresses: user.addresses || []
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Failed syncing profile." });
  }
});

// Create/Update Address Array
router.put('/auth/address', authenticateToken as any, async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) return;
  const { name, phone, address, district } = req.body;

  if (!name || !phone || !address || !district) {
    res.status(400).json({ message: "All address components are mandatory." });
    return;
  }

  try {
    const user = await dataService.findUserById(req.user.id);
    if (!user) {
      res.status(404).json({ message: "Profile session missing." });
      return;
    }

    if (!user.addresses) user.addresses = [];
    user.addresses.push({ name, phone, address, district });

    await dataService.updateUser(req.user.id, { addresses: user.addresses });

    res.json({ addresses: user.addresses });
  } catch (err) {
    res.status(500).json({ message: "Failed adding delivery address coordinate." });
  }
});


// =============================================================
// 2. PRODUCTS SHOWCASE SERVICES
// =============================================================

// List Products
router.get('/products', async (req, res) => {
  try {
    const products = await dataService.getProducts();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Failed loading product rows." });
  }
});

// Single Product Details
router.get('/products/:id', async (req, res) => {
  try {
    const product = await dataService.getProductById(req.params.id);
    if (!product) {
      res.status(404).json({ message: "Selected design not found in current closet collections." });
      return;
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Failed loading design metadata specs." });
  }
});

// Admin: Create Product
router.post('/products', authenticateToken as any, requireAdmin as any, async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (req.body && req.body.image) {
      req.body.image = await uploadToCloudinary(req.body.image);
    }
    const newProduct = await dataService.createProduct(req.body);
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: "Failed producing new product register." });
  }
});

// Admin: Update Product
router.put('/products/:id', authenticateToken as any, requireAdmin as any, async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (req.body && req.body.image) {
      req.body.image = await uploadToCloudinary(req.body.image);
    }
    const updated = await dataService.updateProduct(req.params.id, req.body);
    if (!updated) {
      res.status(404).json({ message: "Target layout was not found in catalog listing." });
      return;
    }
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: "Failed modifying selected clothes spec." });
  }
});

// Admin: Delete Product
router.delete('/products/:id', authenticateToken as any, requireAdmin as any, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const success = await dataService.deleteProduct(req.params.id);
    if (!success) {
      res.status(404).json({ message: "Product not located." });
      return;
    }
    res.json({ message: "Apparel eliminated from listing database logs." });
  } catch (err) {
    res.status(500).json({ message: "Failed deleting database item." });
  }
});

// Customer: Add Review & Rating to apparel
router.post('/products/:id/review', authenticateToken as any, async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) return;
  const { rating, comment, userName } = req.body;

  if (!rating || !comment) {
    res.status(400).json({ message: "Rating and a brief comment review are required." });
    return;
  }

  try {
    const user = await dataService.findUserById(req.user.id);
    const resolvedName = userName || (user ? user.name : "Verified Customer");

    const updatedProduct = await dataService.addProductReview(req.params.id, {
      userId: req.user.id,
      userName: resolvedName,
      rating: Number(rating),
      comment
    });

    if (!updatedProduct) {
      res.status(404).json({ message: "Target garment not found." });
      return;
    }

    res.status(201).json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: "Failed registering reviews and comments." });
  }
});


// =============================================================
// 3. ORDERS & SHIPMENTS WORKFLOW
// =============================================================

// Checkout Placement
router.post('/orders', async (req, res) => {
  const {
    userId,
    billingDetails,
    items,
    subtotal,
    discount,
    deliveryFee,
    total,
    timeline,
    paymentMethod
  } = req.body;

  if (!billingDetails || !billingDetails.name || !billingDetails.phone || !billingDetails.address || !items || items.length === 0) {
    res.status(400).json({ message: "Order placement entries are incomplete." });
    return;
  }

  try {
    const pendingOrderObj = {
      userId: userId || null,
      billingDetails,
      items,
      subtotal: Number(subtotal),
      discount: Number(discount),
      deliveryFee: Number(deliveryFee),
      total: Number(total),
      timeline: timeline || "3-5 Days",
      paymentMethod,
      orderStatus: paymentMethod === 'cod' ? 'Processing' : 'Pending Payment',
      paymentInfo: paymentMethod === 'cod' ? {
        paymentMethod: 'cod',
        transactionId: 'COD-VERIFIED',
        senderNumber: billingDetails.phone,
        paidAmount: 0,
        paymentStatus: 'Approved',
        verifiedBy: 'System',
        verifiedAt: new Date().toISOString()
      } : null
    };

    const newOrder = await dataService.createOrder(pendingOrderObj);
    
    // Automatically trigger order placement email dispatch sequence asynchronously
    sendOrderConfirmationEmail(newOrder).catch(mailErr => {
      console.error("LOG: [ROYMEN] Auto-email background error:", mailErr.message);
    });

    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ message: "Failed completing checkout request sequence." });
  }
});

// View My Orders or Admin View All Core Logs
router.get('/orders', authenticateToken as any, async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) return;
  try {
    if (req.user.role === 'admin') {
      const allOrders = await dataService.getOrders();
      res.json(allOrders);
    } else {
      const myOrders = await dataService.getOrdersByUser(req.user.id);
      res.json(myOrders);
    }
  } catch (err) {
    res.status(500).json({ message: "Failed matching orders collection." });
  }
});

// Query Single Order for tracking / invoice receipt checks
router.get('/orders/:id', async (req, res) => {
  try {
    const order = await dataService.getOrderById(req.params.id);
    if (!order) {
      res.status(404).json({ message: "Order not tracked in Bangladesh delivery registries." });
      return;
    }
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Fail mapping tracker ID." });
  }
});

// Submit/Execute bKash or Nagad manual verification steps
router.post('/orders/:id/payment', async (req, res) => {
  const { paymentMethod, transactionId, senderNumber, paidAmount } = req.body;

  if (!paymentMethod || !transactionId || !senderNumber || !paidAmount) {
    res.status(400).json({ message: "Deposit verification request is incomplete." });
    return;
  }

  try {
    const updatedOrder = await dataService.submitManualPayment(req.params.id, {
      paymentMethod,
      transactionId,
      senderNumber,
      paidAmount: Number(paidAmount)
    });

    if (!updatedOrder) {
      res.status(404).json({ message: "Requested order was not logged." });
      return;
    }

    res.json(updatedOrder);
  } catch (err) {
    res.status(500).json({ message: "Failed submitting deposit transaction code." });
  }
});

// Admin: Accept / Deny Transaction codes
router.post('/orders/:id/verify-payment', authenticateToken as any, requireAdmin as any, async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) return;
  const { approve } = req.body; // true = Approve, false = Reject

  try {
    const status = approve ? 'Approved' : 'Rejected';
    const updated = await dataService.verifyPayment(req.params.id, status, req.user.email);

    if (!updated) {
      res.status(404).json({ message: "Order not traced." });
      return;
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed reviewing payment audit log." });
  }
});

// Admin: Move logistics status (Processing -> Shipped -> Delivered)
router.put('/orders/:id/status', authenticateToken as any, requireAdmin as any, async (req: AuthenticatedRequest, res: Response) => {
  const { orderStatus } = req.body;

  if (!orderStatus) {
    res.status(400).json({ message: "New status coordinate is undefined." });
    return;
  }

  try {
    const updated = await dataService.updateOrderStatus(req.params.id, orderStatus);
    if (!updated) {
      res.status(404).json({ message: "Order not tracked." });
      return;
    }
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed transitioning package log statuses." });
  }
});


// =============================================================
// 4. COUPONS / PROMO CODE SERVICES
// =============================================================

// List Coupons
router.get('/coupons', async (req, res) => {
  try {
    const list = await dataService.getCoupons();
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: "Failed loading campaigns register." });
  }
});

// Admin: Create Coupon
router.post('/coupons', authenticateToken as any, requireAdmin as any, async (req: AuthenticatedRequest, res: Response) => {
  const { code, discountPercent } = req.body;
  if (!code || !discountPercent) {
    res.status(400).json({ message: "Promo coupon needs a code string and percentage value." });
    return;
  }
  try {
    const created = await dataService.createCoupon({
      code: code.trim().toUpperCase(),
      discountPercent: Number(discountPercent)
    });
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ message: "Failed registering campaign." });
  }
});

// Admin: Delete Coupon
router.delete('/coupons/:code', authenticateToken as any, requireAdmin as any, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const success = await dataService.deleteCoupon(req.params.code);
    if (!success) {
      res.status(404).json({ message: "Code not mapped." });
      return;
    }
    res.json({ message: "Promo voucher destroyed successfully." });
  } catch (err) {
    res.status(500).json({ message: "Failed removing campaign entry." });
  }
});


// =============================================================
// 5. INTUITIVE ADMIN ANALYTICS METRICS
// =============================================================
router.get('/admin/analytics', authenticateToken as any, requireAdmin as any, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const [orders, products, users] = await Promise.all([
      dataService.getOrders(),
      dataService.getProducts(),
      dataService.getUsers()
    ]);

    // calculate financial revenues
    const approvedOrders = orders.filter(o => o.orderStatus === 'Payment Approved' || o.orderStatus === 'Processing' || o.orderStatus === 'Shipped' || o.orderStatus === 'Delivered');
    const totalEarnings = approvedOrders.reduce((acc, o) => acc + Number(o.total), 0);
    const pendingVerificationsCount = orders.filter(o => o.orderStatus === 'Verification Pending').length;

    // customer and admin ratios
    const customersCount = users.filter(u => u.role === 'customer').length;

    // Category list distribution
    const categorySpread: Record<string, number> = {};
    products.forEach(p => {
      categorySpread[p.category] = (categorySpread[p.category] || 0) + 1;
    });

    res.json({
      metrics: {
        totalOrders: orders.length,
        activeProducts: products.length,
        totalCustomers: customersCount,
        approvedRevenue: totalEarnings,
        pendingVerifications: pendingVerificationsCount
      },
      categoryPopularity: Object.entries(categorySpread).map(([name, value]) => ({ name, value })),
      recentSales: orders.slice(-6).reverse().map(o => ({
        id: o.orderId,
        customerName: o.billingDetails.name,
        date: o.createdAt.split('T')[0],
        total: o.total,
        status: o.orderStatus
      }))
    });
  } catch (err) {
    res.status(500).json({ message: "Failed aggregating cockpit management reports details." });
  }
});

// Retrieve Sent Email logs (Admin diagnostic)
router.get('/admin/emails', authenticateToken as any, requireAdmin as any, async (req: AuthenticatedRequest, res: Response) => {
  try {
    res.json(emailLogs);
  } catch (err) {
    res.status(500).json({ message: "Failed fetching email dispatch list." });
  }
});

export default router;
