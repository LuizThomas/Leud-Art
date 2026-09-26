import React, { useState } from 'react';
import { X, MessageCircle, ShoppingBag, Check, Heart, Sparkles, Clock, PackageCheck } from 'lucide-react';
import { Product } from '../types';
import { useProducts } from '../context/ProductContext';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddedToCart: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddedToCart,
}) => {
  const { toggleFavorite, isFavorite, addToCart, generateWhatsAppLink } = useProducts();
  const [recipientName, setRecipientName] = useState('');
  const [customMessage, setCustomMessage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [addedSuccess, setAddedSuccess] = useState(false);

  if (!product) return null;

  const favorited = isFavorite(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity, customMessage, recipientName);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      onAddedToCart();
    }, 1200);
  };

  const whatsAppLink = generateWhatsAppLink(product, customMessage, recipientName);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div
        className="relative bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-[#E8DCD1] max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#5C4D44] hover:text-[#241A15] shadow-md flex items-center justify-center transition-colors"
          aria-label="Fechar modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto flex-1 p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            
            {/* Left: Product Image & Badges */}
            <div className="space-y-4">
              <div className="relative rounded-xl overflow-hidden bg-[#FAF8F5] border border-[#EFE8E1] aspect-[4/3] sm:aspect-square">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                {product.badge && (
                  <span className="absolute top-3 left-3 bg-white/95 px-2.5 py-1 rounded text-xs font-semibold text-[#854432] shadow-xs">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Quick Details Chips */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                {product.dimensions && (
                  <div className="p-3 bg-[#FAF8F5] rounded-lg border border-[#EFE8E1]">
                    <span className="block text-[#8C7A70] text-[10px] uppercase font-semibold">Dimensões</span>
                    <span className="font-medium text-[#241A15]">{product.dimensions}</span>
                  </div>
                )}
                <div className="p-3 bg-[#FAF8F5] rounded-lg border border-[#EFE8E1]">
                  <span className="block text-[#8C7A70] text-[10px] uppercase font-semibold">Tempo de Preparo</span>
                  <span className="font-medium text-[#241A15]">
                    {product.leadTimeDays ? `${product.leadTimeDays} dia(s) úteis` : 'Pronta entrega'}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Info, Items Included & Personalization Form */}
            <div className="flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium uppercase tracking-wider text-[#854432]">
                    Artesanato Sob Medida
                  </span>
                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className="p-1.5 text-[#5C4D44] hover:text-[#C53030] transition-colors"
                  >
                    <Heart className={`w-5 h-5 ${favorited ? 'fill-[#C53030] text-[#C53030]' : ''}`} />
                  </button>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#241A15] mb-2">
                  {product.name}
                </h2>

                <div className="font-mono text-2xl font-bold text-[#9B543D] tabular-nums mb-4">
                  R$ {product.price.toFixed(2).replace('.', ',')}
                </div>

                <p className="text-xs sm:text-sm text-[#5C4D44] leading-relaxed mb-6">
                  {product.description}
                </p>

                {/* Items Included */}
                {product.itemsIncluded && product.itemsIncluded.length > 0 && (
                  <div className="mb-6 p-4 rounded-xl bg-[#FAF8F5] border border-[#EFE8E1]">
                    <h4 className="text-xs font-semibold text-[#241A15] uppercase tracking-wide mb-3 flex items-center gap-1.5">
                      <PackageCheck className="w-4 h-4 text-[#9B543D]" />
                      Itens Inclusos nesta Composição
                    </h4>
                    <ul className="space-y-1.5 text-xs text-[#5C4D44]">
                      {product.itemsIncluded.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-[#9B543D] font-bold mt-0.5">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Personalization Section */}
                <div className="space-y-3 pt-2 border-t border-[#EFE8E1]">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#241A15]">
                    <Sparkles className="w-3.5 h-3.5 text-[#9B543D]" />
                    <span>Personalize o seu Pedido</span>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-[#7A6A60] mb-1">
                      Nome da pessoa a ser presenteada (opcional):
                    </label>
                    <input
                      type="text"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      placeholder="Ex: Minha mãe Carmem, Esposa Amanda..."
                      className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#E2D5CA] rounded-lg focus:outline-none focus:border-[#9B543D]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-[#7A6A60] mb-1">
                      Mensagem para o cartão manuscrito (opcional):
                    </label>
                    <textarea
                      rows={2}
                      value={customMessage}
                      onChange={(e) => setCustomMessage(e.target.value)}
                      placeholder="Escreva sua dedicatória com afeto para incluirmos no envelope lacrado..."
                      className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#E2D5CA] rounded-lg focus:outline-none focus:border-[#9B543D]"
                    />
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#EFE8E1] space-y-2.5">
                <a
                  href={whatsAppLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs sm:text-sm font-semibold rounded-lg shadow-sm transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Pedir Agora no WhatsApp da Proprietária</span>
                </a>

                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-[#E2D5CA] rounded-lg bg-[#FAF8F5]">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-2.5 py-2 text-xs text-[#5C4D44] hover:text-[#241A15]"
                    >
                      -
                    </button>
                    <span className="px-2 text-xs font-mono font-bold text-[#241A15]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-2.5 py-2 text-xs text-[#5C4D44] hover:text-[#241A15]"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-[#241A15] hover:bg-[#3D2C24] text-white text-xs font-semibold rounded-lg transition-colors"
                  >
                    {addedSuccess ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>Adicionado à Sacola!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Adicionar à Sacola</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
