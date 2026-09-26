import React, { useState } from 'react';
import { ShoppingBag, Heart, User, ShieldCheck, Menu, X, ArrowUpRight } from 'lucide-react';
import { useAuth, ADMIN_EMAIL } from '../context/AuthContext';
import { useProducts } from '../context/ProductContext';

interface NavbarProps {
  onOpenAuth: () => void;
  onOpenCart: () => void;
  onOpenAccount: () => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
  isAdminView: boolean;
  setIsAdminView: (val: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAuth,
  onOpenCart,
  onOpenAccount,
  activeSection,
  setActiveSection,
  isAdminView,
  setIsAdminView,
}) => {
  const { user, isAdmin, logout } = useAuth();
  const { cartCount, favorites } = useProducts();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'inicio', label: 'Início' },
    { id: 'catalogo', label: 'Coleções & Cestas' },
    { id: 'sobre', label: 'Sobre a Marca' },
    { id: 'diferenciais', label: 'Artesanato & Afeto' },
    { id: 'contato', label: 'Fale Conosco' },
  ];

  const handleNavClick = (id: string) => {
    setIsAdminView(false);
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#EFE8E1] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Zone 1: Single text wordmark */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNavClick('inicio')}
            className="group flex flex-col text-left focus:outline-none"
          >
            <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#2E201B] group-hover:text-[#9B543D] transition-colors">
              Leud'Art
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#8C7A70] -mt-1 font-medium">
              Cestas & Mimos Artesanais
            </span>
          </button>
        </div>

        {/* Zone 2: 4-5 clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-[#5C4D44]">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`transition-colors py-1 relative hover:text-[#9B543D] ${
                activeSection === link.id && !isAdminView
                  ? 'text-[#9B543D] font-semibold'
                  : ''
              }`}
            >
              {link.label}
              {activeSection === link.id && !isAdminView && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#9B543D] rounded-full" />
              )}
            </button>
          ))}
          {isAdmin && (
            <button
              onClick={() => {
                setIsAdminView(!isAdminView);
                setMobileMenuOpen(false);
              }}
              className={`transition-colors py-1 flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded border ${
                isAdminView
                  ? 'bg-[#9B543D] text-white border-[#9B543D]'
                  : 'text-[#9B543D] border-[#9B543D]/30 hover:bg-[#9B543D]/10'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Painel VIP Proprietária
            </button>
          )}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* WhatsApp Direct Quick link */}
          <a
            href="https://wa.me/5588999287029"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#2E201B] bg-[#EFE8E1] hover:bg-[#E5DCD3] rounded-lg transition-colors whitespace-nowrap"
          >
            <span>(88) 99928-7029</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#9B543D]" />
          </a>

          {/* User Account / Login */}
          {user ? (
            <button
              onClick={onOpenAccount}
              className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-[#2E201B] hover:text-[#9B543D] transition-colors rounded-lg hover:bg-[#F3ECE5]"
              title={user.name}
            >
              <div className="w-7 h-7 rounded-full bg-[#9B543D] text-white flex items-center justify-center font-bold text-xs">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span className="hidden md:inline max-w-[100px] truncate">{user.name.split(' ')[0]}</span>
            </button>
          ) : (
            <button
              onClick={onOpenAuth}
              className="p-2 text-[#5C4D44] hover:text-[#9B543D] transition-colors rounded-lg hover:bg-[#F3ECE5] flex items-center gap-1 text-xs font-medium"
              title="Entrar ou Cadastrar"
            >
              <User className="w-5 h-5" />
              <span className="hidden sm:inline">Entrar</span>
            </button>
          )}

          {/* Cart / Inquiry Bag */}
          <button
            onClick={onOpenCart}
            className="relative p-2 text-[#2E201B] hover:text-[#9B543D] transition-colors rounded-lg hover:bg-[#F3ECE5]"
            aria-label="Abrir sacola de pedidos"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#9B543D] text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow-sm">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 lg:hidden text-[#2E201B] hover:text-[#9B543D] rounded-lg"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#EFE8E1] bg-[#FAF8F5] px-4 pt-2 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="text-left py-2 px-3 text-sm font-medium text-[#2E201B] hover:bg-[#F3ECE5] rounded-md transition-colors"
              >
                {link.label}
              </button>
            ))}
            {isAdmin && (
              <button
                onClick={() => {
                  setIsAdminView(true);
                  setMobileMenuOpen(false);
                }}
                className="text-left py-2 px-3 text-sm font-semibold text-[#9B543D] bg-[#9B543D]/10 rounded-md flex items-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                Painel VIP da Proprietária (/admin)
              </button>
            )}
          </nav>

          <div className="pt-3 border-t border-[#EFE8E1] flex flex-col gap-2">
            <a
              href="https://wa.me/5588999287029"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-[#9B543D] text-white text-sm font-medium rounded-lg shadow-sm"
            >
              Falar no WhatsApp: (88) 99928-7029
            </a>
            {!user ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth();
                }}
                className="w-full py-2 text-sm text-[#5C4D44] border border-[#D4C5B9] rounded-lg font-medium"
              >
                Entrar / Cadastrar-se
              </button>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAccount();
                }}
                className="w-full py-2 text-sm text-[#5C4D44] border border-[#D4C5B9] rounded-lg font-medium"
              >
                Minha Conta ({user.name})
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
