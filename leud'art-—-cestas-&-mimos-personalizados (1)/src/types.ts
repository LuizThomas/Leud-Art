export type ProductCategory =
  | 'todas'
  | 'cafe_manha'
  | 'celebracao'
  | 'mimos'
  | 'maternidade'
  | 'corporativo';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: ProductCategory;
  description: string;
  itemsIncluded: string[];
  image: string;
  badge?: string;
  isFeatured?: boolean;
  dimensions?: string;
  leadTimeDays?: number;
  createdAt: string;
}

export type UserRole = 'visitor' | 'customer' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  avatar?: string;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  customMessage?: string;
  recipientName?: string;
}
