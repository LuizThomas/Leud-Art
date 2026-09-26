import React, { useState } from 'react';
import { Heart, Clock, ShieldCheck, Feather, Sparkles, Award, MessageCircle } from 'lucide-react';

export const CraftManifesto: React.FC = () => {
  const [activePillar, setActivePillar] = useState<number>(0);

  const pillars = [
    {
      num: '01',
      title: 'O Tempo Humano vs. A Linha de Montagem',
      quote: 'A pressa é a maior inimiga da beleza. Nada aqui é feito em esteira.',
      content:
        'Vivemos num mundo dominado por cestas industriais pré-embaladas em caixas de plástico sem alma. Na Leud\'Art, remamos no sentido contrário. Dona Arleuda dedica tempo exclusivo a cada peça: do laço perfeito de fita de linho ao arranjo harmonioso dos sabores.',
      icon: Clock,
      highlight: 'Apenas poucas encomendas por dia para garantir perfeição absoluta.',
    },
    {
      num: '02',
      title: 'A Nobreza dos Materiais Vivos',
      quote: 'Um presente artesanal deve durar muito além do dia da entrega.',
      content:
        'Não utilizamos embalagens descartáveis que vão para o lixo. Nossas bandejas em madeira maciça teca, cerâmicas vitrificadas e cestos de palha trançada tornam-se peças afetivas de decoração permanente na casa de quem foi presenteado.',
      icon: Sparkles,
      highlight: 'Sustentabilidade, artesanato tradicional do Ceará e respeito à matéria-prima.',
    },
    {
      num: '03',
      title: 'A Caligrafia da Alma (Sem Impressões Frias)',
      quote: 'Um bilhete impresso numa folha comum nunca terá a força de uma letra manuscrita.',
      content:
        'Você envia sua mensagem pelo WhatsApp e ela é transposta à mão, traço a traço, para papel de alta gramatura com tinta nobre. O envelope é dobrado com afeto e selado com cera quente sob pressão do carimbo Leud\'Art.',
      icon: Feather,
      highlight: 'O ato de abrir um lacre de cera real cria um momento sensorial inesquecível.',
    },
    {
      num: '04',
      title: 'A Entrega da Emoção em Horário Exato',
      quote: 'Uma surpresa entregue com atraso perde metade do seu brilho.',
      content:
        'Cuidamos de cada detalhe logístico para que a cesta chegue impecável, fresquinha e exatamente no horário combinado — seja no primeiro amanhecer ou no meio de uma festa.',
      icon: ShieldCheck,
      highlight: 'Transporte seguro no Ceará com embalagens protegidas contra vento e calor.',
    },
  ];

  return (
    <section id="manifesto" className="py-20 sm:py-28 bg-[#FAF7F2] border-b border-[#E8DCCD] relative overflow-hidden">
      
      {/* Soft background watermark */}
      <div className="absolute -right-20 top-20 text-[#E8DCCD]/40 font-serif text-[180px] font-bold select-none pointer-events-none -z-0">
        ARTE
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-[#854432] mb-3">
            <Heart className="w-3.5 h-3.5 fill-[#9B543D] text-[#9B543D]" />
            O Manifesto Leud'Art
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#2B1B15] tracking-tight">
            Os 4 Pilares do Nosso Fazer Manual
          </h2>
          <p className="text-sm sm:text-base text-[#6A574E] mt-3 leading-relaxed">
            Entenda por que receber uma criação da Leud'Art causa uma sensação tão profunda de carinho e exclusividade.
          </p>
        </div>

        {/* 4 Interactive Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {pillars.map((pil, idx) => {
            const Icon = pil.icon;
            const isSelected = activePillar === idx;
            return (
              <div
                key={pil.num}
                onClick={() => setActivePillar(idx)}
                className={`p-8 rounded-3xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white border-[#9B543D] shadow-lg ring-1 ring-[#9B543D]/30'
                    : 'bg-white/80 border-[#E8DCCD] hover:bg-white hover:border-[#D8C7B8]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-serif text-3xl font-bold text-[#9B543D] opacity-80">
                      {pil.num}
                    </span>
                    <div className="w-11 h-11 rounded-xl bg-[#FAF7F2] border border-[#E8DCCD] flex items-center justify-center text-[#9B543D]">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2B1B15] mb-2">
                    {pil.title}
                  </h3>

                  <p className="font-serif italic text-xs sm:text-sm text-[#854432] mb-4">
                    "{pil.quote}"
                  </p>

                  <p className="text-xs sm:text-sm text-[#5C483F] leading-relaxed mb-6">
                    {pil.content}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F2EBE1] flex items-center gap-2 text-xs font-semibold text-[#2B1B15]">
                  <Sparkles className="w-4 h-4 text-[#E0A93B] shrink-0" />
                  <span>{pil.highlight}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Founder Story Tribute Section (NO PHOTOS - Pure Editorial Masterpiece) */}
        <div className="bg-[#2B1B15] text-[#FAF7F2] rounded-3xl p-8 sm:p-14 border border-[#46332A] shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            
            <div className="w-16 h-16 rounded-full wax-seal mx-auto flex items-center justify-center text-white shadow-xl">
              <span className="font-serif text-2xl font-bold italic">L</span>
            </div>

            <span className="text-[11px] uppercase tracking-[0.25em] text-[#E0A93B] font-semibold block">
              A Mente & O Coração do Ateliê
            </span>

            <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              "Cada cesta que sai das minhas mãos carrega uma prece de alegria para quem vai receber."
            </h3>

            <p className="text-sm sm:text-base text-[#D4C3B7] font-light leading-relaxed max-w-2xl mx-auto">
              Dona Arleuda começou a criar cestas e mimos como um gesto íntimo de afeto familiar no Ceará. Hoje, o ateliê Leud'Art é referência para quem busca presentes que tocam o coração com sofisticação artesanal e atendimento 100% humanizado.
            </p>

            <div className="pt-6 border-t border-[#46332A] flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://wa.me/5588999287029?text=Ol%C3%A1%2C%20Dona%20Arleuda!%20Li%20o%20manifesto%20do%20seu%20ateli%C3%AA%20e%20fiquei%20encantado(a)!%20Gostaria%20de%20conversar."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#25D366] hover:bg-[#20BA5A] text-white text-sm font-bold rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Conversar com Dona Arleuda: (88) 99928-7029</span>
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
