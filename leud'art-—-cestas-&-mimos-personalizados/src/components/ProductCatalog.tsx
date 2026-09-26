import React, { useState, useMemo } from 'react';
import { Search, Heart, MessageCircle, Eye, SlidersHorizontal, Plus } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';
import { Product, ProductCategory } from '../types';
import { CATEGORIES_CONFIG } from '../data/initialProducts';

interface ProductCatalogProps {
  onSelectProduct: (product: Product) => void;
  onOpenNewProductModal?: () => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  onSelectProduct,
  onOpenNewProductModal,
}) => {
  const { products, favorites, toggleFavorite, isFavorite, generateWhatsAppLink } = useProducts();
  const { isAdmin } = useAuth();

  const [selectedCategory, setSelectedCategory] = useState<string>('todas');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'recent' | 'price_asc' | 'price_desc'>('recent');

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesCategory =
          selectedCategory === 'todas' || p.category === selectedCategory;
        const matchesSearch =
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price_asc') return a.price - b.price;
        if (sortBy === 'price_desc') return b.price - a.price;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }, [products, selectedCategory, searchQuery, sortBy]);

  const getCategoryLabel = (cat: ProductCategory) => {
    switch (cat) {
      case 'cafe_manha':
        return 'Café da Manhã';
      case 'celebracao':
        return 'Celebração & Vinhos';
      case 'mimos':
        return 'Mimos & Afeto';
      case 'maternidade':
        return 'Maternidade & Bebê';
      case 'corporativo':
        return 'Corporativo';
      default:
        return 'Especial';
    }
  };

  return (
    <section id="catalogo" className="py-16 sm:py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-[#EFE8E1] gap-4">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#854432] font-semibold mb-2">
              Vitrine Artesanal Exclusiva
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#241A15]">
              Nossas Cestas & Mimos
            </h2>
            <p className="text-sm text-[#6C5B52] mt-1">
              Escolha uma de nossas criações autorais ou personalize cada item com nossa artesã.
            </p>
          </div>

          {/* Admin shortcut if logged in */}
          {isAdmin && onOpenNewProductModal && (
            <button
              onClick={onOpenNewProductModal}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#9B543D] text-white text-xs font-semibold rounded-lg hover:bg-[#854432] transition-colors self-start md:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Adicionar Produto (VIP)</span>
            </button>
          )}
        </div>

        {/* Filter Controls Row */}
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-stretch lg:items-center mb-10">
          
          {/* Interactive Category Segmented Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
            {CATEGORIES_CONFIG.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                    isActive
                      ? 'bg-[#2E201B] text-white shadow-sm'
                      : 'bg-white text-[#5C4D44] hover:bg-[#F2EAE3] border border-[#E8DCD1]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search & Sort Controls */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8C7A70]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar cesta ou mimo..."
                className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#E2D5CA] rounded-lg text-[#2E201B] focus:outline-none focus:border-[#9B543D] transition-colors"
              />
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Ordenar produtos por preço ou data"
                className="w-full sm:w-auto px-3 py-2 text-xs bg-white border border-[#E2D5CA] rounded-lg text-[#5C4D44] focus:outline-none focus:border-[#9B543D] transition-colors cursor-pointer"
              >
                <option value="recent">Mais Recentes</option>
                <option value="price_asc">Menor Valor</option>
                <option value="price_desc">Maior Valor</option>
              </select>
            </div>

          </div>
        </div>

        {/* Catalog Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-xl border border-[#EFE8E1] max-w-md mx-auto p-8">
            <p className="font-serif text-xl font-semibold text-[#241A15] mb-2">
              Nenhum produto encontrado
            </p>
            <p className="text-xs text-[#7A6A60] mb-6">
              Não encontramos nenhum item com os filtros selecionados. Que tal falar diretamente com a artesã?
            </p>
            <a
              href="https://wa.me/5588999287029"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#9B543D] text-white text-xs font-semibold rounded-lg hover:bg-[#854432] transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Pedir Cesta Sob Medida</span>
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => {
              const favorited = isFavorite(product.id);
              return (
                <div
                  key={product.id}
                  className="group bg-white rounded-xl border border-[#EFE8E1] overflow-hidden hover:border-[#DDD0C5] hover:shadow-lg transition-all duration-300 flex flex-col"
                >
                  {/* Product Image Container */}
                  <div className="relative aspect-[4/3] bg-[#F5EFEB] overflow-hidden cursor-pointer" onClick={() => onSelectProduct(product)}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      referrerPolicy="no-referrer"
                    />

                    {/* Subtle textual tag (Single tag, Anti-slop compliant) */}
                    {product.badge && (
                      <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded text-[11px] font-semibold text-[#854432] border border-[#E8DCD1]/60 shadow-xs">
                        {product.badge}
                      </div>
                    )}

                    {/* Favorite Heart Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(product.id);
                      }}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#5C4D44] hover:text-[#C53030] hover:bg-white shadow-xs transition-colors"
                      aria-label="Favoritar produto"
                    >
                      <Heart
                        className={`w-4 h-4 transition-colors ${
                          favorited ? 'fill-[#C53030] text-[#C53030]' : ''
                        }`}
                      />
                    </button>

                    {/* Quick view overlay button on hover */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <span className="px-3.5 py-2 bg-white text-[#241A15] text-xs font-semibold rounded-lg shadow-md flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                        <Eye className="w-3.5 h-3.5" />
                        Ver Detalhes
                      </span>
                    </div>
                  </div>

                  {/* Product Card Information */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Quiet unboxed metadata */}
                      <div className="flex items-center gap-1.5 text-xs text-[#8C7A70] mb-1.5 font-medium">
                        <span>{getCategoryLabel(product.category)}</span>
                        <span aria-hidden="true">·</span>
                        <span>{product.leadTimeDays ? `Preparo ${product.leadTimeDays}d` : 'Pronta entrega'}</span>
                      </div>

                      {/* Product Name */}
                      <h3
                        onClick={() => onSelectProduct(product)}
                        className="font-serif text-lg sm:text-xl font-bold text-[#241A15] hover:text-[#9B543D] cursor-pointer transition-colors line-clamp-1 mb-2"
                      >
                        {product.name}
                      </h3>

                      {/* Description snippet */}
                      <p className="text-xs text-[#6C5B52] line-clamp-2 leading-relaxed mb-4">
                        {product.description}
                      </p>
                    </div>

                    {/* Footer Row: Price + WhatsApp direct action */}
                    <div className="pt-4 border-t border-[#F2EAE3] flex items-center justify-between gap-3">
                      <div>
                        <span className="block text-[10px] uppercase tracking-wider text-[#8C7A70]">
                          Valor
                        </span>
                        <span className="font-mono text-base sm:text-lg font-bold text-[#241A15] tabular-nums">
                          R$ {product.price.toFixed(2).replace('.', ',')}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <a
                          href={generateWhatsAppLink(product)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
                          title="Pedir direto no WhatsApp"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>Pedir</span>
                        </a>

                        <button
                          onClick={() => onSelectProduct(product)}
                          className="px-3 py-2 bg-[#F5EFEB] hover:bg-[#EAE1D7] text-[#241A15] text-xs font-medium rounded-lg transition-colors"
                        >
                          Detalhes
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
