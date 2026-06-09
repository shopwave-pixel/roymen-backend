export interface Product {
  id: string;
  name: string;
  category: string;
  price: number; // in BDT (৳)
  originalPrice?: number; // for discount calculations
  description: string;
  longDescription?: string;
  images: string[];
  sizes: string[];
  colors: string[];
  isNew?: boolean;
  isBestSeller?: boolean;
  featured?: boolean;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  sku: string;
  details: string[];
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}
