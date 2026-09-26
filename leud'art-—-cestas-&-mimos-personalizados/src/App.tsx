/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ProductProvider, useProducts } from './context/ProductContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductModal } from './components/ProductModal';
import { AboutSection } from './components/AboutSection';
import { Testimonials } from './components/Testimonials';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { AuthModal } from './components/AuthModal';
import { CustomerAccount } from './components/CustomerAccount';
import { AdminPanel } from './components/AdminPanel';
import { Product } from './types';

function MainApp() {
  const { user, isAdmin } = useAuth();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isAdminView, setIsAdminView] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  // Check URL path or hash for #admin or /admin
  useEffect(() => {
    const handleUrlChange = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path === '/admin' || hash === '#admin') {
        setIsAdminView(true);
      }
    };
    handleUrlChange();
    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);

  const handleExploreClick = () => {
    setIsAdminView(false);
    setActiveSection('catalogo');
    const el = document.getElementById('catalogo');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNavClick = (id: string) => {
    setIsAdminView(false);
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#241A15]">
      {/* Navbar */}
      <Navbar
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isAdminView={isAdminView}
        setIsAdminView={setIsAdminView}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {isAdminView ? (
          <AdminPanel
            onBackToStore={() => {
              setIsAdminView(false);
              window.location.hash = '';
            }}
            onOpenAuth={() => setIsAuthOpen(true)}
          />
        ) : (
          <>
            <div id="inicio">
              <Hero onExploreClick={handleExploreClick} />
            </div>

            <Features />

            <ProductCatalog
              onSelectProduct={(p) => setSelectedProduct(p)}
              onOpenNewProductModal={() => setIsAdminView(true)}
            />

            <AboutSection />

            <Testimonials />
          </>
        )}
      </main>

      {/* Footer */}
      {!isAdminView && <Footer onNavClick={handleNavClick} />}

      {/* Floating WhatsApp Button */}
      <FloatingWhatsApp />

      {/* Product Detail & Customization Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddedToCart={() => {
          setSelectedProduct(null);
          setIsCartOpen(true);
        }}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onExploreProducts={handleExploreClick}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={() => {
          // If logged in as admin, offer to jump to admin panel
          if (isAdmin) {
            setIsAdminView(true);
          }
        }}
      />

      {/* Customer Account Profile */}
      <CustomerAccount
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        onSelectProduct={(p) => setSelectedProduct(p)}
        onOpenAdmin={() => setIsAdminView(true)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <MainApp />
      </ProductProvider>
    </AuthProvider>
  );
}
