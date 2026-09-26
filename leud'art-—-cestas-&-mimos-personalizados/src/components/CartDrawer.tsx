import React from 'react';
import { X, Trash2, MessageCircle, ArrowRight, ShoppingBag } from 'lucide-react';
import { useProducts } from '../context/ProductContext';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onExploreProducts: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  onExploreProducts,
}) => {
  const { cart, removeFromCart, updateCartQuantity, clearCart, cartTotal, generateCartWhatsAppLink } = useProducts();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end">
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-[#EFE8E1] animate-slideLeft"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#EFE8E1] flex items-center justify-between bg-[#FAF8F5]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#9B543D]" />
            <h2 className="font-serif text-lg font-bold text-[#241A15]">
              Sua Sacola de Encomendas
            </h2>
            <span className="text-xs text-[#8C7A70]">({cart.length} itens)</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#5C4D44] hover:text-[#241A15] rounded-lg hover:bg-white"
            aria-label="Fechar sacola"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#FAF8F5] text-[#8C7A70] flex items-center justify-center mx-auto">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-[#241A15]">
                Sua sacola está vazia
              </h3>
              <p className="text-xs text-[#7A6A60] max-w-xs mx-auto">
                Explore nossas cestas autorais e adicione mimos especiais para quem você ama.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onExploreProducts();
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#9B543D] text-white text-xs font-semibold rounded-lg hover:bg-[#854432] transition-colors"
              >
                <span>Ver Coleções</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.product.id}
                className="p-3.5 bg-[#FAF8F5] rounded-xl border border-[#EFE8E1] flex gap-3 relative"
              >
                {/* Image */}
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-white shrink-0 border border-[#E8DCD1]">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-serif text-sm font-bold text-[#241A15] line-clamp-1">
                      {item.product.name}
                    </h4>
                    <span className="font-mono text-xs font-semibold text-[#9B543D] tabular-nums">
                      R$ {item.product.price.toFixed(2).replace('.', ',')}
                    </span>

                    {item.recipientName && (
                      <p className="text-[11px] text-[#7A6A60] mt-0.5 line-clamp-1">
                        Para: <strong>{item.recipientName}</strong>
                      </p>
                    )}

                    {item.customMessage && (
                      <p className="text-[11px] text-[#7A6A60] italic line-clamp-1">
                        "{item.customMessage}"
                      </p>
                    )}
                  </div>

                  {/* Quantity Stepper & Remove */}
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#EFE8E1]">
                    <div className="flex items-center border border-[#E2D5CA] rounded bg-white">
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                        className="px-2 py-0.5 text-xs text-[#5C4D44] hover:text-[#241A15]"
                      >
                        -
                      </button>
                      <span className="px-2 text-xs font-mono font-bold text-[#241A15]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                        className="px-2 py-0.5 text-xs text-[#5C4D44] hover:text-[#241A15]"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-[#994D4D] hover:text-[#C53030] p-1 text-xs flex items-center gap-1"
                      title="Remover item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-[#EFE8E1] bg-[#FAF8F5] space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#5C4D44]">Subtotal Estimado:</span>
              <span className="font-mono text-lg font-bold text-[#241A15] tabular-nums">
                R$ {cartTotal.toFixed(2).replace('.', ',')}
              </span>
            </div>

            <p className="text-[11px] text-[#7A6A60] leading-tight">
              * O pagamento e a data exata de entrega serão combinados diretamente pelo WhatsApp com a artesã Arleuda.
            </p>

            <a
              href={generateCartWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs sm:text-sm font-semibold rounded-xl shadow-md transition-all duration-200"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Finalizar Encomenda no WhatsApp</span>
            </a>

            <button
              onClick={clearCart}
              className="w-full text-center text-[11px] text-[#8C7A70] hover:text-[#241A15] py-1"
            >
              Limpar sacola
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
