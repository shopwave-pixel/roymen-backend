import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'roymen_luxury_sartorial_token_secret_key_2026';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: 'customer' | 'admin';
  };
}

// Token Verification
export function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: "Access denied. Auth Token is missing." });
    return;
  }

  try {
    const verified = jwt.verify(token, JWT_SECRET) as any;
    req.user = {
      id: verified.id,
      email: verified.email,
      role: verified.role
    };
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired Auth Token." });
  }
}

// Admin Privilege Verification
export function requireAdmin(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  if (!req.user || req.user.role !== 'admin') {
    res.status(403).json({ message: "Access forbidden. High-level administrator privileges required." });
    return;
  }
  next();
}

// Generate secure JWT token
export function generateToken(user: { id: string; email: string; role: 'customer' | 'admin' }): string {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}
