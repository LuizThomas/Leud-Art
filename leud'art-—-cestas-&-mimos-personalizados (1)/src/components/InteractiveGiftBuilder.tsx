import React, { useState } from 'react';
import {
  Sparkles,
  MessageCircle,
  Check,
  RotateCcw,
  Feather,
  Heart,
  Share2,
  Copy,
  Gift,
  CheckCircle2,
  Palette
} from 'lucide-react';

interface BaseOption {
  id: string;
  name: string;
  material: string;
  description: string;
  iconBg: string;
}

interface OccasionOption {
  id: string;
  title: string;
  tag: string;
  vibe: string;
}

interface ItemOption {
  id: string;
  name: string;
  category: string;
}

export const InteractiveGiftBuilder: React.FC = () => {
  // Step 1: Base
  const baseOptions: BaseOption[] = [
    {
      id: 'bandeja-madeira',
      name: 'Bandeja em Madeira Teca Reflorestada',
      material: 'Madeira Maciça Natural',
      description: 'Acabamento encerado acetinado com alças ergonômicas. Vira peça decorativa durável.',
      iconBg: '#EFE5DC',
    },
    {
      id: 'cesto-palha',
      name: 'Cesto Oval em Palha Nobre Trançada',
      material: 'Fibra Natural do Ceará',
      description: 'Trançado manual tradicional, toque rústico chique e acolhedor.',
      iconBg: '#F5ECE3',
    },
    {
      id: 'caixa-terracota',
      name: 'Box Cartonada Terracota & Fita Cetim',
      material: 'Cartonagem Rígida Premium',
      description: 'Visual moderno e elegante estilo boutique, fechamento perfeito.',
      iconBg: '#F0E2D8',
    },
    {
      id: 'bau-vintage',
      name: 'Mini Baú Rústico com Fecho Dourado',
      material: 'Madeira & Metais Envelhecidos',
      description: 'Sensação nostálgica de guardar um tesouro afetivo inestimável.',
      iconBg: '#E9DFD5',
    },
  ];

  // Step 2: Occasions
  const occasions: OccasionOption[] = [
    {
      id: 'cafe-manha',
      title: 'Amanhecer & Café Especial',
      tag: 'Mais Pedida',
      vibe: 'Despertar com aroma de pão fresco e carinho matinal',
    },
    {
      id: 'celebracao-vinho',
      title: 'Celebração, Bodas & Vinho Fino',
      tag: 'Sofisticada',
      vibe: 'Brinde inesquecível a dois com vinho e queijo curado',
    },
    {
      id: 'autocuidado-aromas',
      title: 'Autocuidado & Aromas Botânicos',
      tag: 'Acolhedora',
      vibe: 'Velas de soja, banho botânico e momento de paz',
    },
    {
      id: 'maternidade-bebe',
      title: 'Boas-Vindas & Maternidade',
      tag: 'Doçura Pura',
      vibe: 'Delicadeza para celebrar a nova vida que chegou',
    },
    {
      id: 'corporativo-nobre',
      title: 'Gratidão & Parceria Corporativa',
      tag: 'Executiva',
      vibe: 'Reconhecimento à altura de grandes conquistas',
    },
  ];

  // Step 3: Artisanal Elements
  const availableItems: ItemOption[] = [
    { id: 'ceramica', name: 'Xícara em Cerâmica Autoral Feita à Mão', category: 'Utensílio' },
    { id: 'drip-coffee', name: 'Drip Coffee Microlote com Moagem Fresca', category: 'Sabor' },
    { id: 'mel-silvestre', name: 'Pote de Mel Silvestre com Pegador em Madeira', category: 'Sabor' },
    { id: 'geleia-artesanal', name: 'Geleia de Frutas Vermelhas Artesanal', category: 'Sabor' },
    { id: 'biscoitos', name: 'Biscoitos Amanteigados com Castanha', category: 'Sabor' },
    { id: 'vinho-tinto', name: 'Garrafa de Vinho Tinto Seco Fino (750ml)', category: 'Bebida' },
    { id: 'queijo-serra', name: 'Queijo Artesanal da Serra Curado', category: 'Sabor' },
    { id: 'trufas-belgas', name: 'Trufas Artesanais com Cacau Nobre', category: 'Doce' },
    { id: 'vela-aromatica', name: 'Vela Botânica de Soja em Vidro Âmbar', category: 'Aroma' },
    { id: 'sabonete-natural', name: 'Sabonete Botânico Prensado a Frio', category: 'Autocuidado' },
    { id: 'flores-secas', name: 'Mini Buquê de Flores Secas Perpétuas', category: 'Botânica' },
    { id: 'ursinho-croche', name: 'Ursinho em Crochê Amigurumi 100% Algodão', category: 'Mimo' },
  ];

  // Step 4: Ribbons and Seals
  const ribbonColors = [
    { id: 'terracota', name: 'Terracota Queimado', hex: '#9B543D' },
    { id: 'verde-oliva', name: 'Verde Oliva Silvestre', hex: '#5A684B' },
    { id: 'ouro-velho', name: 'Ouro Antigo Nobre', hex: '#C29845' },
    { id: 'cru-linho', name: 'Linho Cru Natural', hex: '#D2C3B2' },
    { id: 'rosa-seco', name: 'Rosa Seco Suave', hex: '#B87B7B' },
  ];

  // Component State
  const [selectedBase, setSelectedBase] = useState<string>('bandeja-madeira');
  const [selectedOccasion, setSelectedOccasion] = useState<string>('cafe-manha');
  const [selectedItems, setSelectedItems] = useState<string[]>([
    'ceramica',
    'drip-coffee',
    'mel-silvestre',
    'biscoitos',
    'flores-secas',
  ]);
  const [selectedRibbon, setSelectedRibbon] = useState<string>('terracota');
  const [sealInitial, setSealInitial] = useState<string>('M');
  const [recipientName, setRecipientName] = useState<string>('Minha Mãe');
  const [cardMessage, setCardMessage] = useState<string>(
    'Que o seu dia amanheça tão doce e luminoso quanto o seu coração. Com todo meu amor!'
  );
  const [copiedLink, setCopiedLink] = useState(false);

  // Toggle item selection
  const handleToggleItem = (itemId: string) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  // Reset simulator
  const handleReset = () => {
    setSelectedBase('bandeja-madeira');
    setSelectedOccasion('cafe-manha');
    setSelectedItems(['ceramica', 'drip-coffee', 'mel-silvestre', 'biscoitos', 'flores-secas']);
    setSelectedRibbon('terracota');
    setSealInitial('M');
    setRecipientName('Minha Mãe');
    setCardMessage('Que o seu dia amanheça tão doce e luminoso quanto o seu coração. Com todo meu amor!');
  };

  // Current selections
  const currentBase = baseOptions.find((b) => b.id === selectedBase) || baseOptions[0];
  const currentOccasion = occasions.find((o) => o.id === selectedOccasion) || occasions[0];
  const currentRibbon = ribbonColors.find((r) => r.id === selectedRibbon) || ribbonColors[0];

  // WhatsApp formatted generator
  const generateWhatsAppMessage = () => {
    let msg = `Olá, Dona Arleuda! Estive usando o Criador de Mimos no site da Leud'Art e montei esta composição personalizada:\n\n`;
    msg += `🪵 *Base:* ${currentBase.name}\n`;
    msg += `🎉 *Ocasião:* ${currentOccasion.title}\n`;
    msg += `🎀 *Fita em Linho:* ${currentRibbon.name}\n`;
    msg += `🕯️ *Lacre em Cera com Inicial:* [ ${sealInitial.toUpperCase() || 'L'} ]\n`;
    msg += `\n📦 *Itens Escolhidos:* (${selectedItems.length} selecionados):\n`;
    selectedItems.forEach((id) => {
      const it = availableItems.find((item) => item.id === id);
      if (it) msg += ` • ${it.name}\n`;
    });
    if (recipientName.trim()) {
      msg += `\n👤 *Presenteado(a):* ${recipientName}\n`;
    }
    if (cardMessage.trim()) {
      msg += `💌 *Dedicatória do Cartão:* "${cardMessage}"\n`;
    }
    msg += `\nPoderia me informar o valor estimado e disponibilidade para entrega? Muito obrigado!`;
    return encodeURIComponent(msg);
  };

  const handleCopySummary = () => {
    const text = `Composição Leud'Art para ${recipientName}: ${currentBase.name} (${currentOccasion.title}) com lacre [${sealInitial}].`;
    navigator.clipboard.writeText(text);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <section id="simulador" className="py-20 sm:py-28 bg-[#FAF7F2] border-b border-[#E8DCCD] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F2EBE1] border border-[#E8DCCD] text-xs uppercase font-bold tracking-widest text-[#854432] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#E0A93B]" />
            Experiência Interativa
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#2B1B15] tracking-tight">
            Monte o seu Mimo em Tempo Real
          </h2>
          <p className="text-sm sm:text-base text-[#68554C] mt-3 leading-relaxed">
            Experimente diferentes combinações de bases, laços e itens artesanais. Visualize o cartão manuscrito e envie a sua ideia pronta diretamente para Dona Arleuda.
          </p>
        </div>

        {/* 2-Column Interactive Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Interactive Controls (7 Cols) */}
          <div className="lg:col-span-7 space-y-10 bg-white p-6 sm:p-8 rounded-3xl border border-[#E8DCCD] shadow-sm">
            
            {/* Step 1: Base */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#9B543D] text-white text-xs font-bold flex items-center justify-center">
                    1
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#2B1B15]">
                    Escolha a Base Rústica
                  </h3>
                </div>
                <span className="text-xs text-[#8C7A70]">{currentBase.material}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {baseOptions.map((base) => {
                  const isSelected = selectedBase === base.id;
                  return (
                    <button
                      key={base.id}
                      onClick={() => setSelectedBase(base.id)}
                      className={`text-left p-4 rounded-xl border transition-all duration-200 relative ${
                        isSelected
                          ? 'border-[#9B543D] bg-[#FAF7F2] shadow-sm ring-1 ring-[#9B543D]'
                          : 'border-[#E8DCCD] hover:bg-[#FAF7F2] hover:border-[#D8C7B8]'
                      }`}
                    >
                      {isSelected && (
                        <span className="absolute top-3 right-3 w-5 h-5 rounded-full bg-[#9B543D] text-white flex items-center justify-center">
                          <Check className="w-3 h-3" />
                        </span>
                      )}
                      <span className="font-serif font-bold text-sm sm:text-base text-[#2B1B15] block mb-1">
                        {base.name}
                      </span>
                      <span className="text-[11px] text-[#7A6A60] block leading-snug">
                        {base.description}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Occasion */}
            <div className="pt-6 border-t border-[#F2EBE1]">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-6 h-6 rounded-full bg-[#9B543D] text-white text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <h3 className="font-serif text-xl font-bold text-[#2B1B15]">
                  Qual o Sentimento ou Ocasião?
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {occasions.map((occ) => {
                  const isSelected = selectedOccasion === occ.id;
                  return (
                    <button
                      key={occ.id}
                      onClick={() => setSelectedOccasion(occ.id)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                        isSelected
                          ? 'bg-[#2B1B15] text-white shadow-sm'
                          : 'bg-[#FAF7F2] text-[#5A473E] hover:bg-[#F2EBE1] border border-[#E8DCCD]'
                      }`}
                    >
                      <span>{occ.title}</span>
                    </button>
                  );
                })}
              </div>
              <p className="text-xs text-[#8C7A70] italic mt-2.5">
                Vibe da criação: "{currentOccasion.vibe}"
              </p>
            </div>

            {/* Step 3: Select Artisanal Items */}
            <div className="pt-6 border-t border-[#F2EBE1]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#9B543D] text-white text-xs font-bold flex items-center justify-center">
                    3
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#2B1B15]">
                    Adicione os Mimos & Sabores
                  </h3>
                </div>
                <span className="text-xs font-semibold text-[#9B543D]">
                  {selectedItems.length} selecionados
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {availableItems.map((item) => {
                  const isChecked = selectedItems.includes(item.id);
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleToggleItem(item.id)}
                      className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between transition-colors ${
                        isChecked
                          ? 'bg-[#FAF7F2] border-[#9B543D]/50 text-[#2B1B15]'
                          : 'bg-white border-[#E8DCCD] text-[#6A574E] hover:bg-[#FAF7F2]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0 pr-2">
                        <div
                          className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                            isChecked
                              ? 'bg-[#9B543D] border-[#9B543D] text-white'
                              : 'border-[#C8B8AE] bg-white'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3" />}
                        </div>
                        <span className="text-xs font-medium truncate">{item.name}</span>
                      </div>
                      <span className="text-[10px] uppercase font-bold text-[#9C8B82] shrink-0">
                        {item.category}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Ribbon & Wax Seal Customization */}
            <div className="pt-6 border-t border-[#F2EBE1]">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-6 h-6 rounded-full bg-[#9B543D] text-white text-xs font-bold flex items-center justify-center">
                  4
                </span>
                <h3 className="font-serif text-xl font-bold text-[#2B1B15]">
                  Acabamento: Fita & Lacre de Cera
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Ribbon Color */}
                <div>
                  <label className="block text-xs font-semibold text-[#5A473E] mb-2">
                    Cor da Fita de Linho Puro:
                  </label>
                  <div className="flex items-center gap-3">
                    {ribbonColors.map((ribbon) => (
                      <button
                        key={ribbon.id}
                        onClick={() => setSelectedRibbon(ribbon.id)}
                        className={`w-8 h-8 rounded-full border-2 transition-transform ${
                          selectedRibbon === ribbon.id
                            ? 'scale-125 border-[#2B1B15] shadow-md'
                            : 'border-white hover:scale-110'
                        }`}
                        style={{ backgroundColor: ribbon.hex }}
                        title={ribbon.name}
                      />
                    ))}
                  </div>
                  <span className="block text-xs text-[#8C7A70] mt-1.5 font-medium">
                    {currentRibbon.name}
                  </span>
                </div>

                {/* Wax Seal Initial */}
                <div>
                  <label className="block text-xs font-semibold text-[#5A473E] mb-2">
                    Inicial gravada no lacre de cera:
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      maxLength={1}
                      value={sealInitial}
                      onChange={(e) => setSealInitial(e.target.value.toUpperCase())}
                      className="w-12 h-12 text-center font-serif text-xl font-bold rounded-xl border border-[#D8C7B8] bg-[#FAF7F2] text-[#2B1B15] focus:outline-none focus:border-[#9B543D]"
                    />
                    <span className="text-xs text-[#7A6A60] leading-tight">
                      Estampada à quente na cera nobre do envelope.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 5: Recipient & Handwritten Card Message */}
            <div className="pt-6 border-t border-[#F2EBE1] space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-full bg-[#9B543D] text-white text-xs font-bold flex items-center justify-center">
                  5
                </span>
                <h3 className="font-serif text-xl font-bold text-[#2B1B15]">
                  Dedicatória Manuscrita à Moda Antiga
                </h3>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#5A473E] mb-1">
                  Nome de quem vai receber:
                </label>
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="Ex: Minha Mãe, Meu Amor, Dra. Amanda..."
                  className="w-full px-3.5 py-2.5 text-xs bg-[#FAF7F2] border border-[#E2D5CA] rounded-xl focus:outline-none focus:border-[#9B543D]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#5A473E] mb-1">
                  Texto para Dona Arleuda caligrafar à mão:
                </label>
                <textarea
                  rows={3}
                  value={cardMessage}
                  onChange={(e) => setCardMessage(e.target.value)}
                  placeholder="Escreva suas palavras com o coração..."
                  className="w-full px-3.5 py-2.5 text-xs bg-[#FAF7F2] border border-[#E2D5CA] rounded-xl focus:outline-none focus:border-[#9B543D]"
                />
              </div>
            </div>

            {/* Reset helper */}
            <div className="pt-2 flex justify-end">
              <button
                onClick={handleReset}
                className="text-xs text-[#8C7A70] hover:text-[#2B1B15] flex items-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restaurar simulador padrão</span>
              </button>
            </div>

          </div>

          {/* Right Column: Live Illustrated Visualizer & WhatsApp Dispatch (5 Cols) */}
          <div className="lg:col-span-5 sticky top-28 space-y-6">
            
            {/* Live Illustrated Composition Card */}
            <div className="bg-[#2B1B15] text-[#FAF7F2] rounded-3xl p-7 border border-[#46332A] shadow-2xl relative overflow-hidden">
              
              {/* Gold Ambient Aura */}
              <div className="absolute top-0 right-0 w-44 h-44 bg-[#E0A93B]/10 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center justify-between pb-4 border-b border-[#46332A]">
                  <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#E0A93B]">
                    Composição Visual ao Vivo
                  </span>
                  <span className="text-xs text-[#C8B8AE]">Ateliê Leud'Art</span>
                </div>

                {/* Illustrated Basket Mockup (Artistic Pure Vector SVG Representation) */}
                <div className="my-6 p-6 rounded-2xl bg-[#36231C] border border-[#523A2F] relative flex flex-col items-center justify-center text-center">
                  
                  {/* Floating Wax Seal with Initial */}
                  <div className="w-14 h-14 rounded-full wax-seal flex items-center justify-center text-amber-100 shadow-xl mb-3 border border-white/20 animate-float">
                    <span className="font-serif text-xl font-bold italic">
                      {sealInitial || 'L'}
                    </span>
                  </div>

                  <span className="font-serif text-lg sm:text-xl font-bold text-white block mb-1">
                    {currentBase.name}
                  </span>

                  {/* Ribbon band preview indicator */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs text-amber-200 mb-4 border border-white/10">
                    <span
                      className="w-2.5 h-2.5 rounded-full inline-block"
                      style={{ backgroundColor: currentRibbon.hex }}
                    />
                    <span>Laço {currentRibbon.name}</span>
                  </div>

                  {/* Included items counter pills */}
                  <div className="w-full pt-3 border-t border-[#523A2F]/60 flex flex-wrap justify-center gap-1.5 max-h-28 overflow-y-auto pr-1">
                    {selectedItems.map((id) => {
                      const it = availableItems.find((item) => item.id === id);
                      return it ? (
                        <span
                          key={id}
                          className="px-2 py-0.5 rounded text-[10px] bg-black/30 text-[#D8CDC4] border border-white/5 truncate max-w-[200px]"
                        >
                          • {it.name}
                        </span>
                      ) : null;
                    })}
                  </div>
                </div>

                {/* Simulated Handwritten Note Card */}
                <div className="p-4 rounded-xl bg-[#FAF7F2] text-[#2B1B15] border border-[#D8C7B8] shadow-md relative">
                  <div className="flex items-center justify-between text-[10px] text-[#8C7A70] uppercase tracking-wider mb-2 font-semibold">
                    <span className="flex items-center gap-1 text-[#9B543D]">
                      <Feather className="w-3 h-3" />
                      Cartão Caligrafado à Mão
                    </span>
                    <span>Para: {recipientName || 'Alguém especial'}</span>
                  </div>

                  <p className="font-serif italic text-xs sm:text-sm text-[#46332A] leading-relaxed line-clamp-3">
                    "{cardMessage || 'Sua mensagem de afeto aqui...'}"
                  </p>
                </div>

                {/* Direct Action: Send to Dona Arleuda on WhatsApp */}
                <div className="mt-6 pt-5 border-t border-[#46332A] space-y-3">
                  <a
                    href={`https://wa.me/5588999287029?text=${generateWhatsAppMessage()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2.5 py-4 px-6 bg-[#25D366] hover:bg-[#20BA5A] text-white text-sm font-bold rounded-xl shadow-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Enviar Esta Criação para Dona Arleuda</span>
                  </a>

                  <p className="text-[11px] text-[#A8988E] text-center leading-tight">
                    WhatsApp oficial: <strong>(88) 99928-7029</strong> · Resposta acolhedora direta da artesã.
                  </p>
                </div>

              </div>
            </div>

            {/* Quick Share / Copy Helper */}
            <div className="p-4 bg-white rounded-2xl border border-[#E8DCCD] flex items-center justify-between text-xs text-[#6A574E]">
              <span>Gostou da combinação que montou?</span>
              <button
                onClick={handleCopySummary}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FAF7F2] hover:bg-[#F2EBE1] text-[#2B1B15] font-semibold border border-[#E8DCCD] transition-colors"
              >
                {copiedLink ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar Resumo</span>
                  </>
                )}
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
