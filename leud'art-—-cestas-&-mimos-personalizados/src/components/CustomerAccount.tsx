import React from 'react';
import { X, User, Heart, LogOut, MessageCircle, ShoppingBag, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductContext';
import { Product } from '../types';

interface CustomerAccountProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (p: Product) => void;
  onOpenAdmin: () => void;
}

export const CustomerAccount: React.FC<CustomerAccountProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onOpenAdmin,
}) => {
  const { user, logout, isAdmin } = useAuth();
  const { favorites, products, generateWhatsAppLink } = useProducts();

  if (!isOpen || !user) return null;

  const favoriteProducts = products.filter((p) => favorites.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        className="relative bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#E8DCD1] max-h-[90vh] flex flex-col animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-5 border-b border-[#EFE8E1]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#9B543D] text-white flex items-center justify-center font-serif text-xl font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-xl font-bold text-[#241A15]">
                  {user.name}
                </h2>
                {user.role === 'admin' ? (
                  <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-[#9B543D] text-white rounded">
                    Proprietária VIP
                  </span>
                ) : (
                  <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-[#FAF8F5] text-[#8C7A70] border border-[#E2D5CA] rounded">
                    Cliente Leud'Art
                  </span>
                )}
              </div>
              <p className="text-xs text-[#7A6A60]">{user.email}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#8C7A70] hover:text-[#241A15] rounded-lg hover:bg-[#FAF8F5]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto py-6 space-y-6">
          
          {/* Quick Admin Callout if user is Admin */}
          {isAdmin && (
            <div className="p-4 bg-[#FAF8F5] border border-[#E8DCD1] rounded-xl flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-[#9B543D] shrink-0" />
                <div>
                  <span className="block text-xs font-bold text-[#241A15]">
                    Você tem privilégios de Proprietária (VIP)
                  </span>
                  <span className="text-[11px] text-[#7A6A60]">
                    Acesse o painel para gerenciar e cadastrar produtos na vitrine.
                  </span>
                </div>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onOpenAdmin();
                }}
                className="px-3.5 py-2 bg-[#9B543D] hover:bg-[#854432] text-white text-xs font-semibold rounded-lg transition-colors whitespace-nowrap"
              >
                Abrir Painel VIP
              </button>
            </div>
          )}

          {/* Favorites List */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-serif text-lg font-bold text-[#241A15] flex items-center gap-2">
                <Heart className="w-4 h-4 text-[#C53030] fill-current" />
                <span>Seus Mimos Favoritos</span>
              </h3>
              <span className="text-xs text-[#8C7A70]">
                {favoriteProducts.length} itens salvos
              </span>
            </div>

            {favoriteProducts.length === 0 ? (
              <div className="p-8 text-center bg-[#FAF8F5] rounded-xl border border-[#EFE8E1]">
                <p className="text-xs text-[#7A6A60]">
                  Você ainda não salvou nenhuma cesta nos favoritos. Clique no ícone de coração nos produtos para guardar suas ideias de presente!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {favoriteProducts.map((p) => (
                  <div
                    key={p.id}
                    className="p-3 bg-[#FAF8F5] rounded-xl border border-[#EFE8E1] flex gap-3 items-center hover:border-[#DDD0C5] transition-colors"
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-16 h-16 rounded-lg object-cover bg-white shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-[#241A15] truncate">
                        {p.name}
                      </h4>
                      <p className="font-mono text-xs font-semibold text-[#9B543D] tabular-nums mt-0.5">
                        R$ {p.price.toFixed(2).replace('.', ',')}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => {
                            onClose();
                            onSelectProduct(p);
                          }}
                          className="text-[11px] text-[#241A15] hover:underline font-medium"
                        >
                          Ver detalhes
                        </button>
                        <span className="text-[#C4A482]">·</span>
                        <a
                          href={generateWhatsAppLink(p)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] text-[#25D366] hover:underline font-semibold flex items-center gap-1"
                        >
                          <MessageCircle className="w-3 h-3" />
                          Pedir
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Contact with Arleuda */}
          <div className="p-4 rounded-xl border border-[#EFE8E1] bg-white flex items-center justify-between">
            <div>
              <span className="block text-xs font-bold text-[#241A15]">
                Dúvidas sobre entregas ou personalizações?
              </span>
              <span className="text-[11px] text-[#7A6A60]">
                Fale diretamente com a proprietária Arleuda no WhatsApp (88) 99928-7029.
              </span>
            </div>
            <a
              href="https://wa.me/5588999287029"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-[#25D366] text-white rounded-lg hover:bg-[#20BA5A] transition-colors"
              title="WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>

        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-[#EFE8E1] flex justify-between items-center">
          <button
            onClick={() => {
              logout();
              onClose();
            }}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#994D4D] hover:text-[#C53030] transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Encerrar Sessão</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#FAF8F5] hover:bg-[#F2EAE3] text-[#241A15] text-xs font-medium rounded-lg border border-[#E2D5CA]"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
