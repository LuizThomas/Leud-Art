import React, { useState, useRef } from 'react';
import {
  ShieldCheck,
  Plus,
  Edit2,
  Trash2,
  Image as ImageIcon,
  Check,
  X,
  AlertTriangle,
  ArrowLeft,
  Search,
  ExternalLink,
  Package,
  DollarSign,
  TrendingUp,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductContext';
import { Product, ProductCategory } from '../types';
import { CATEGORIES_CONFIG } from '../data/initialProducts';

interface AdminPanelProps {
  onBackToStore: () => void;
  onOpenAuth: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onBackToStore, onOpenAuth }) => {
  const { user, isAdmin } = useAuth();
  const { products, addProduct, updateProduct, deleteProduct, resetToDefaults } = useProducts();

  const [search, setSearch] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProductId, setDeletingProductId] = useState<string | null>(null);

  // Form states for Add / Edit
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState<ProductCategory>('cafe_manha');
  const [description, setDescription] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [itemsIncludedText, setItemsIncludedText] = useState('');
  const [badge, setBadge] = useState('');
  const [dimensions, setDimensions] = useState('');
  const [leadTimeDays, setLeadTimeDays] = useState('1');
  const [formError, setFormError] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Security check: If not admin, block view
  if (!isAdmin) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-6 bg-[#FAF8F5]">
        <div className="max-w-md w-full bg-white rounded-2xl p-8 border border-[#E8DCD1] shadow-xl text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto border border-amber-200">
            <AlertTriangle className="w-8 h-8" />
          </div>

          <h2 className="font-serif text-2xl font-bold text-[#241A15]">
            Acesso Restrito — Painel VIP
          </h2>

          <p className="text-xs text-[#7A6A60] leading-relaxed">
            Esta rota administrativa (/admin) é protegida por regras de acesso e é restrita exclusivamente à proprietária da <strong>Leud'Art</strong>.
          </p>

          <div className="pt-4 border-t border-[#EFE8E1] flex flex-col gap-2">
            <button
              onClick={onOpenAuth}
              className="w-full py-2.5 bg-[#9B543D] text-white text-xs font-semibold rounded-lg hover:bg-[#854432] transition-colors"
            >
              Fazer Login como Proprietária (VIP)
            </button>
            <button
              onClick={onBackToStore}
              className="w-full py-2 text-xs text-[#5C4D44] hover:underline"
            >
              Voltar para a Loja Pública
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Filtered products list
  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
  );

  // Stats calculation
  const totalProducts = products.length;
  const avgPrice =
    totalProducts > 0
      ? products.reduce((acc, p) => acc + p.price, 0) / totalProducts
      : 0;

  // Handle image upload from computer
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setFormError('A imagem deve ter no máximo 5MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Open modal for new product
  const handleOpenCreateModal = () => {
    setEditingProduct(null);
    setName('');
    setPrice('');
    setCategory('cafe_manha');
    setDescription('');
    setImagePreview('/src/assets/images/leudart_hero_artisan_1790455433073.jpg');
    setItemsIncludedText('Bandeja artesanal\nXícara em cerâmica\nCafé especial artesanal');
    setBadge('Nova Coleção');
    setDimensions('30cm x 25cm x 15cm');
    setLeadTimeDays('1');
    setFormError('');
    setIsCreateModalOpen(true);
  };

  // Open modal for editing product
  const handleOpenEditModal = (product: Product) => {
    setEditingProduct(product);
    setName(product.name);
    setPrice(product.price.toString());
    setCategory(product.category);
    setDescription(product.description);
    setImagePreview(product.image);
    setItemsIncludedText(product.itemsIncluded ? product.itemsIncluded.join('\n') : '');
    setBadge(product.badge || '');
    setDimensions(product.dimensions || '');
    setLeadTimeDays((product.leadTimeDays || 1).toString());
    setFormError('');
    setIsCreateModalOpen(true);
  };

  // Save product (Create or Edit)
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!name.trim()) {
      setFormError('Informe o nome oficial do produto.');
      return;
    }
    const numPrice = parseFloat(price.replace(',', '.'));
    if (isNaN(numPrice) || numPrice <= 0) {
      setFormError('Informe um valor de preço válido (ex: 189.90).');
      return;
    }
    if (!description.trim()) {
      setFormError('Informe a descrição detalhada do produto.');
      return;
    }
    if (!imagePreview) {
      setFormError('Selecione ou carregue uma imagem para a vitrine.');
      return;
    }

    const itemsArray = itemsIncludedText
      .split('\n')
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

    const leadTimeNum = parseInt(leadTimeDays) || 1;

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        name: name.trim(),
        price: numPrice,
        category,
        description: description.trim(),
        image: imagePreview,
        itemsIncluded: itemsArray,
        badge: badge.trim() || undefined,
        dimensions: dimensions.trim() || undefined,
        leadTimeDays: leadTimeNum,
      });
    } else {
      addProduct({
        name: name.trim(),
        price: numPrice,
        category,
        description: description.trim(),
        image: imagePreview,
        itemsIncluded: itemsArray,
        badge: badge.trim() || undefined,
        dimensions: dimensions.trim() || undefined,
        leadTimeDays: leadTimeNum,
        isFeatured: false,
      });
    }

    setIsCreateModalOpen(false);
  };

  // Confirm delete
  const handleConfirmDelete = (id: string) => {
    deleteProduct(id);
    setDeletingProductId(null);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-24">
      {/* Top Admin Header */}
      <div className="bg-[#241A15] text-white py-6 border-b border-[#3D2C24]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToStore}
              className="p-2 text-[#D8CDC4] hover:text-white rounded-lg hover:bg-white/10 transition-colors"
              title="Voltar à Vitrine"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-2xl font-bold tracking-tight">
                  Painel Administrativo VIP — Leud'Art
                </h1>
                <span className="px-2 py-0.5 bg-[#9B543D] text-[10px] uppercase font-bold rounded">
                  Acesso Total
                </span>
              </div>
              <p className="text-xs text-[#BDB0A6]">
                Gerenciamento de produtos, vitrine e valores cadastrados para o WhatsApp
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleOpenCreateModal}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#9B543D] hover:bg-[#854432] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Novo Produto</span>
            </button>

            <button
              onClick={onBackToStore}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-medium rounded-lg transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Ver Vitrine</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* KPI Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="p-6 bg-white rounded-xl border border-[#EFE8E1] shadow-xs flex items-center justify-between">
            <div>
              <span className="block text-xs uppercase font-medium text-[#8C7A70]">
                Produtos na Vitrine
              </span>
              <span className="font-mono text-2xl font-bold text-[#241A15] tabular-nums mt-1 block">
                {totalProducts}
              </span>
            </div>
            <div className="w-12 h-12 rounded-lg bg-[#FAF8F5] text-[#9B543D] flex items-center justify-center">
              <Package className="w-6 h-6" />
            </div>
          </div>

          <div className="p-6 bg-white rounded-xl border border-[#EFE8E1] shadow-xs flex items-center justify-between">
            <div>
              <span className="block text-xs uppercase font-medium text-[#8C7A70]">
                Preço Médio
              </span>
              <span className="font-mono text-2xl font-bold text-[#241A15] tabular-nums mt-1 block">
                R$ {avgPrice.toFixed(2).replace('.', ',')}
              </span>
            </div>
            <div className="w-12 h-12 rounded-lg bg-[#FAF8F5] text-[#9B543D] flex items-center justify-center">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>

          <div className="p-6 bg-white rounded-xl border border-[#EFE8E1] shadow-xs flex items-center justify-between">
            <div>
              <span className="block text-xs uppercase font-medium text-[#8C7A70]">
                Contato WhatsApp
              </span>
              <span className="text-sm font-semibold text-[#241A15] mt-1 block">
                (88) 99928-7029
              </span>
            </div>
            <div className="w-12 h-12 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Action / Search Bar */}
        <div className="bg-white p-4 rounded-xl border border-[#EFE8E1] shadow-xs mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8C7A70]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filtrar por nome ou descrição..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-[#FAF8F5] border border-[#E2D5CA] rounded-lg focus:outline-none focus:border-[#9B543D]"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={() => {
                if (window.confirm('Deseja restaurar as cestas e mimos para a configuração inicial de demonstração?')) {
                  resetToDefaults();
                }
              }}
              className="text-xs text-[#8C7A70] hover:text-[#241A15] flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#EFE8E1] hover:bg-[#FAF8F5] transition-colors"
              title="Restaurar catálogo inicial"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restaurar Catálogo Padrão</span>
            </button>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-xl border border-[#EFE8E1] shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#EFE8E1] bg-[#FAF8F5] text-[11px] uppercase tracking-wider text-[#7A6A60] font-semibold">
                  <th className="py-3.5 px-4">Item & Imagem</th>
                  <th className="py-3.5 px-4">Categoria</th>
                  <th className="py-3.5 px-4">Valor (R$)</th>
                  <th className="py-3.5 px-4">Selo / Tag</th>
                  <th className="py-3.5 px-4">Preparo</th>
                  <th className="py-3.5 px-4 text-right">Ações Rápidas</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EFE8E1] text-xs">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-[#FAF8F5]/80 transition-colors">
                    {/* Item */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-[#FAF8F5] overflow-hidden shrink-0 border border-[#E2D5CA]">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="max-w-xs">
                          <span className="font-serif font-bold text-[#241A15] text-sm block truncate">
                            {p.name}
                          </span>
                          <span className="text-[11px] text-[#7A6A60] block truncate">
                            {p.description}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3 px-4 text-[#5C4D44] whitespace-nowrap capitalize">
                      {p.category.replace('_', ' ')}
                    </td>

                    {/* Price */}
                    <td className="py-3 px-4 font-mono font-bold text-[#241A15] tabular-nums whitespace-nowrap">
                      R$ {p.price.toFixed(2).replace('.', ',')}
                    </td>

                    {/* Badge */}
                    <td className="py-3 px-4 text-[#854432] whitespace-nowrap">
                      {p.badge ? (
                        <span className="px-2 py-0.5 bg-[#FAF8F5] border border-[#E2D5CA] rounded text-[11px] font-medium">
                          {p.badge}
                        </span>
                      ) : (
                        <span className="text-[#C4A482]">—</span>
                      )}
                    </td>

                    {/* Lead time */}
                    <td className="py-3 px-4 text-[#7A6A60] whitespace-nowrap">
                      {p.leadTimeDays ? `${p.leadTimeDays} dia(s)` : 'Pronta'}
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEditModal(p)}
                          className="p-1.5 text-[#5C4D44] hover:text-[#9B543D] rounded-lg hover:bg-[#FAF8F5] transition-colors"
                          title="Editar Produto"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeletingProductId(p.id)}
                          className="p-1.5 text-[#994D4D] hover:text-[#C53030] rounded-lg hover:bg-red-50 transition-colors"
                          title="Excluir Produto"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Modal: Create or Edit Product */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div
            className="relative bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#E8DCD1] max-h-[90vh] overflow-y-auto animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#EFE8E1] mb-6">
              <h3 className="font-serif text-xl font-bold text-[#241A15]">
                {editingProduct ? 'Editar Produto na Vitrine' : 'Cadastrar Novo Produto Artesanal'}
              </h3>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1.5 text-[#8C7A70] hover:text-[#241A15] rounded-lg hover:bg-[#FAF8F5]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSaveProduct} className="space-y-4">
              
              {/* Image Upload & Preview */}
              <div>
                <label className="block text-xs font-semibold text-[#241A15] mb-1.5">
                  Foto do Produto (Vitrine)
                </label>
                <div className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-[#FAF8F5] border border-[#E2D5CA] rounded-xl">
                  <div className="w-24 h-24 rounded-lg bg-white overflow-hidden border border-[#D4C5B9] shrink-0 flex items-center justify-center">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <ImageIcon className="w-8 h-8 text-[#8C7A70]" />
                    )}
                  </div>

                  <div className="flex-1 space-y-2 text-center sm:text-left">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageFileChange}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3.5 py-2 bg-white border border-[#D4C5B9] rounded-lg text-xs font-semibold text-[#241A15] hover:bg-[#FAF8F5] transition-colors"
                    >
                      Carregar Foto do Computador/Celular
                    </button>
                    <p className="text-[11px] text-[#7A6A60]">
                      PNG, JPG ou WEBP até 5MB. Formato 4:3 recomendado para a vitrine.
                    </p>
                  </div>
                </div>
              </div>

              {/* Title & Price */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#241A15] mb-1">
                    Nome Oficial do Produto *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Cesta Amanhecer Especial"
                    className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#E2D5CA] rounded-lg focus:outline-none focus:border-[#9B543D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#241A15] mb-1">
                    Valor (R$) *
                  </label>
                  <input
                    type="text"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Ex: 189.90"
                    className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#E2D5CA] rounded-lg focus:outline-none focus:border-[#9B543D]"
                  />
                </div>
              </div>

              {/* Category & Badge */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#241A15] mb-1">
                    Categoria da Coleção *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ProductCategory)}
                    className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#E2D5CA] rounded-lg focus:outline-none focus:border-[#9B543D]"
                  >
                    <option value="cafe_manha">Café da Manhã</option>
                    <option value="celebracao">Celebração & Vinhos</option>
                    <option value="mimos">Mimos & Afeto</option>
                    <option value="maternidade">Maternidade & Bebê</option>
                    <option value="corporativo">Corporativo & Lembranças</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#241A15] mb-1">
                    Selo / Tag de Destaque (opcional)
                  </label>
                  <input
                    type="text"
                    value={badge}
                    onChange={(e) => setBadge(e.target.value)}
                    placeholder="Ex: Mais Pedida, Exclusiva, Edição Especial"
                    className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#E2D5CA] rounded-lg focus:outline-none focus:border-[#9B543D]"
                  />
                </div>
              </div>

              {/* Dimensions & Lead time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#241A15] mb-1">
                    Dimensões Aproximadas
                  </label>
                  <input
                    type="text"
                    value={dimensions}
                    onChange={(e) => setDimensions(e.target.value)}
                    placeholder="Ex: 35cm x 25cm x 15cm"
                    className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#E2D5CA] rounded-lg focus:outline-none focus:border-[#9B543D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#241A15] mb-1">
                    Prazo de Preparo (dias úteis)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={leadTimeDays}
                    onChange={(e) => setLeadTimeDays(e.target.value)}
                    placeholder="Ex: 1"
                    className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#E2D5CA] rounded-lg focus:outline-none focus:border-[#9B543D]"
                  />
                </div>
              </div>

              {/* Detailed Description */}
              <div>
                <label className="block text-xs font-semibold text-[#241A15] mb-1">
                  Descrição Detalhada do Produto *
                </label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Conte a história da peça, o sentimento que transmite e os materiais utilizados..."
                  className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#E2D5CA] rounded-lg focus:outline-none focus:border-[#9B543D]"
                />
              </div>

              {/* Items included */}
              <div>
                <label className="block text-xs font-semibold text-[#241A15] mb-1">
                  Itens Inclusos (um por linha)
                </label>
                <textarea
                  rows={3}
                  value={itemsIncludedText}
                  onChange={(e) => setItemsIncludedText(e.target.value)}
                  placeholder="Bandeja em madeira maciça&#10;Xícara de cerâmica Leud'Art&#10;Geleia artesanal da casa"
                  className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#E2D5CA] rounded-lg focus:outline-none focus:border-[#9B543D]"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#EFE8E1] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 bg-[#FAF8F5] text-[#5C4D44] text-xs font-medium rounded-lg border border-[#E2D5CA] hover:bg-[#F2EAE3]"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#9B543D] hover:bg-[#854432] text-white text-xs font-semibold rounded-lg shadow-sm"
                >
                  {editingProduct ? 'Salvar Alterações' : 'Publicar na Vitrine'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {deletingProductId && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div
            className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-[#E8DCD1] text-center space-y-4 animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>

            <h3 className="font-serif text-lg font-bold text-[#241A15]">
              Excluir este produto?
            </h3>

            <p className="text-xs text-[#7A6A60]">
              Esta ação removerá o item da vitrine digital. Você pode cadastrá-lo novamente a qualquer momento.
            </p>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setDeletingProductId(null)}
                className="flex-1 py-2 text-xs font-medium text-[#5C4D44] bg-[#FAF8F5] border border-[#E2D5CA] rounded-lg"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleConfirmDelete(deletingProductId)}
                className="flex-1 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-xs"
              >
                Sim, Excluir
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
