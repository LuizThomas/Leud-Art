import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserRole } from '../types';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; message?: string }>;
  register: (name: string, email: string, pass: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  loginAsDemoAdmin: () => void;
  loginAsDemoCustomer: () => void;
}

const AUTH_STORAGE_KEY = 'leudart_auth_user_v1';

// Default Admin credentials recognized by the system
export const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || 'arleuda.marte@gmail.com';
export const ADMIN_NAME = 'Arleuda (Proprietária Leud\'Art)';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return null;
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    } catch {
      // ignore
    }
  }, [user]);

  const login = async (email: string, pass: string): Promise<{ success: boolean; message?: string }> => {
    const cleanEmail = email.trim().toLowerCase();
    
    if (!cleanEmail || !pass) {
      return { success: false, message: 'Por favor, preencha todos os campos.' };
    }

    // Check if logging in as Admin/VIP
    if (cleanEmail === ADMIN_EMAIL.toLowerCase() || cleanEmail === 'admin@leudart.com') {
      const adminProfile: UserProfile = {
        id: 'user-admin-vip',
        name: ADMIN_NAME,
        email: cleanEmail,
        role: 'admin',
        phone: '(88) 99982-7279',
        createdAt: '2026-01-01T00:00:00Z',
      };
      setUser(adminProfile);
      return { success: true };
    }

    // Regular registered customer login
    const regularProfile: UserProfile = {
      id: 'user-' + Date.now(),
      name: cleanEmail.split('@')[0],
      email: cleanEmail,
      role: 'customer',
      phone: '',
      createdAt: new Date().toISOString(),
    };
    setUser(regularProfile);
    return { success: true };
  };

  const register = async (name: string, email: string, pass: string): Promise<{ success: boolean; message?: string }> => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim();

    if (!cleanName || !cleanEmail || !pass) {
      return { success: false, message: 'Todos os campos são obrigatórios para o cadastro.' };
    }

    if (pass.length < 6) {
      return { success: false, message: 'A senha deve ter pelo menos 6 caracteres.' };
    }

    const role: UserRole = cleanEmail === ADMIN_EMAIL.toLowerCase() ? 'admin' : 'customer';

    const newProfile: UserProfile = {
      id: 'user-' + Math.random().toString(36).substring(2, 9),
      name: cleanName,
      email: cleanEmail,
      role,
      createdAt: new Date().toISOString(),
    };

    setUser(newProfile);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
  };

  const loginAsDemoAdmin = () => {
    setUser({
      id: 'demo-admin-vip',
      name: 'Dona Arleuda (Proprietária)',
      email: ADMIN_EMAIL,
      role: 'admin',
      phone: '(88) 99928-7029',
      createdAt: '2026-01-01T00:00:00Z',
    });
  };

  const loginAsDemoCustomer = () => {
    setUser({
      id: 'demo-customer-01',
      name: 'Mariana Silveira',
      email: 'mariana.silveira@exemplo.com.br',
      role: 'customer',
      phone: '(88) 98877-6655',
      createdAt: '2026-02-15T14:00:00Z',
    });
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isAdmin,
        login,
        register,
        logout,
        loginAsDemoAdmin,
        loginAsDemoCustomer,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
