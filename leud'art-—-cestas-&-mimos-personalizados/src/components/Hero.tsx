import React from 'react';
import { ArrowRight, Sparkles, MessageCircle, HeartHandshake, ShieldCheck } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  return (
    <section className="relative overflow-hidden bg-[#FAF8F5] pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-[#EFE8E1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Storytelling & CTA */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            
            {/* Quiet text kicker with typographic dot (Anti-slop compliant) */}
            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-[#854432] mb-4 tracking-wide uppercase">
              <span>Artesanato Autoral</span>
              <span aria-hidden="true" className="text-[#C4A482]">·</span>
              <span>Cestas & Mimos Personalizados</span>
              <span aria-hidden="true" className="text-[#C4A482]">·</span>
              <span>Ceará, Brasil</span>
            </div>

            {/* Display Headline with balanced wrap */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#241A15] leading-[1.12] mb-6 [text-wrap:balance]">
              Onde o afeto se transforma em peças artesanais inesquecíveis.
            </h1>

            {/* Subtitle / Value Proposition */}
            <p className="text-base sm:text-lg text-[#5F4E44] max-w-xl leading-relaxed mb-8">
              Na <strong>Leud'Art</strong>, cada cesta, mimo e detalhe é cuidadosamente criado à mão. Unimos materiais nobres, sabores selecionados e delicadeza para você presentear quem ama com significado e elegância.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
              <button
                onClick={onExploreClick}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#9B543D] hover:bg-[#854432] text-white text-sm font-semibold rounded-lg shadow-sm transition-all duration-200 active:scale-[0.98]"
              >
                <span>Conhecer Nossas Cestas</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="https://wa.me/5588999287029?text=Ol%C3%A1%2C%20Dona%20Arleuda!%20Conheci%20o%20site%20da%20Leud%27Art%20e%20gostaria%20de%20montar%20uma%20cesta%20personalizada."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#FFFFFF] hover:bg-[#F3ECE5] text-[#241A15] border border-[#DDD0C5] text-sm font-semibold rounded-lg transition-all duration-200"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>Encomendar pelo WhatsApp</span>
              </a>
            </div>

            {/* Adjacency Trust Proof */}
            <div className="pt-6 border-t border-[#EFE8E1]/80 grid grid-cols-3 gap-4 text-left">
              <div>
                <span className="block font-serif text-2xl font-bold text-[#241A15] tabular-nums">100%</span>
                <span className="text-xs text-[#7A6A60]">Feito à mão com afeto</span>
              </div>
              <div>
                <span className="block font-serif text-2xl font-bold text-[#241A15] tabular-nums">+450</span>
                <span className="text-xs text-[#7A6A60]">Momentos celebrados</span>
              </div>
              <div>
                <span className="block font-serif text-2xl font-bold text-[#241A15] tabular-nums">4.9/5</span>
                <span className="text-xs text-[#7A6A60]">Avaliações de clientes</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Image with refined frame */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-[#E8DCD1] bg-[#F3ECE5] aspect-[4/3] sm:aspect-[4/3] lg:aspect-[4/3]">
                <img
                  src="/src/assets/images/leudart_hero_artisan_1790455433073.jpg"
                  alt="Cesta artesanal Leud'Art montada com flores secas, cerâmica e mimos selecionados"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Floating artisanal endorsement box */}
              <div className="absolute -bottom-6 -left-4 sm:-left-6 bg-white/95 backdrop-blur-sm border border-[#E8DCD1] p-4 rounded-xl shadow-lg max-w-[260px]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#F3ECE5] flex items-center justify-center text-[#9B543D] shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-[#241A15]">Personalização Única</span>
                    <span className="text-[11px] text-[#7A6A60] leading-tight block">
                      Cartão manuscrito e itens escolhidos por você
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
