import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem } from '../types';
import { INITIAL_PRODUCTS } from '../data/initialProducts';

interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  resetToDefaults: () => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, customMessage?: string, recipientName?: string) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  generateWhatsAppLink: (product?: Product, customMessage?: string, recipientName?: string) => string;
  generateCartWhatsAppLink: () => string;
}

const PRODUCTS_STORAGE_KEY = 'leudart_products_v1';
const FAVORITES_STORAGE_KEY = 'leudart_favorites_v1';
const CART_STORAGE_KEY = 'leudart_cart_v1';
const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '5588999287029';

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const stored = localStorage.getItem(PRODUCTS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // fallback
    }
    return INITIAL_PRODUCTS;
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    return [];
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
    } catch {
      // ignore
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      // ignore
    }
  }, [favorites]);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  const addProduct = (productData: Omit<Product, 'id' | 'createdAt'>) => {
    const newProduct: Product = {
      ...productData,
      id: 'prod-' + Date.now(),
      createdAt: new Date().toISOString(),
    };
    setProducts((prev) => [newProduct, ...prev]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
  };

  const resetToDefaults = () => {
    setProducts(INITIAL_PRODUCTS);
  };

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isFavorite = (id: string) => favorites.includes(id);

  const addToCart = (product: Product, quantity = 1, customMessage = '', recipientName = '') => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity, customMessage, recipientName }
            : item
        );
      }
      return [...prev, { product, quantity, customMessage, recipientName }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const generateWhatsAppLink = (product?: Product, customMessage?: string, recipientName?: string) => {
    if (!product) {
      return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
        'Olá, Leud\'Art! Gostaria de tirar dúvidas e encomendar uma cesta personalizada.'
      )}`;
    }

    let text = `Olá, Dona Arleuda! Tenho interesse em encomendar o item:\n\n`;
    text += `🎁 *${product.name}*\n`;
    text += `💰 *Valor:* R$ ${product.price.toFixed(2).replace('.', ',')}\n`;
    if (recipientName) {
      text += `👤 *Nome do Destinatário:* ${recipientName}\n`;
    }
    if (customMessage) {
      text += `💌 *Mensagem do Cartão:* "${customMessage}"\n`;
    }
    text += `\nPoderia me informar a disponibilidade e opções de entrega? Muito obrigado!`;

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  };

  const generateCartWhatsAppLink = () => {
    if (cart.length === 0) {
      return `https://wa.me/${WHATSAPP_NUMBER}`;
    }

    let text = `Olá, Dona Arleuda! Gostaria de fazer o pedido dos seguintes itens da Leud'Art:\n\n`;
    cart.forEach((item, index) => {
      text += `${index + 1}. *${item.product.name}* (x${item.quantity}) - R$ ${(item.product.price * item.quantity).toFixed(2).replace('.', ',')}\n`;
      if (item.recipientName) {
        text += `   Destinatário: ${item.recipientName}\n`;
      }
      if (item.customMessage) {
        text += `   Mensagem: "${item.customMessage}"\n`;
      }
    });

    text += `\n✨ *Total Estimado:* R$ ${cartTotal.toFixed(2).replace('.', ',')}\n`;
    text += `\nGostaria de confirmar a data de entrega e a forma de pagamento!`;

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        resetToDefaults,
        favorites,
        toggleFavorite,
        isFavorite,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotal,
        cartCount,
        generateWhatsAppLink,
        generateCartWhatsAppLink,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
