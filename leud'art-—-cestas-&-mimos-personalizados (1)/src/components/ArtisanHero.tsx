import React, { useState, useEffect } from 'react';
import { Sparkles, MessageCircle, ArrowRight, Heart, Feather, Compass, Award } from 'lucide-react';

interface ArtisanHeroProps {
  onExploreBuilder: () => void;
  onExploreOccasions: () => void;
}

export const ArtisanHero: React.FC<ArtisanHeroProps> = ({
  onExploreBuilder,
  onExploreOccasions,
}) => {
  const [greeting, setGreeting] = useState('Bem-vindo(a) ao Ateliê');
  const [interactiveSealHovered, setInteractiveSealHovered] = useState(false);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) setGreeting('Bom dia no Ateliê');
    else if (hour >= 12 && hour < 18) setGreeting('Boa tarde no Ateliê');
    else setGreeting('Boa noite no Ateliê');
  }, []);

  return (
    <section id="atelie" className="relative overflow-hidden pt-8 pb-20 sm:pt-14 sm:pb-28 border-b border-[#E8DCCD]">
      
      {/* Decorative ambient background glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 ambient-glow rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-80 h-80 ambient-glow-gold rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Kicker Label */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs uppercase tracking-widest text-[#854432] font-semibold mb-6 text-center">
          <span className="flex items-center gap-1.5 px-3 py-1 bg-[#F2EBE1] rounded-full border border-[#E8DCCD]">
            <Sparkles className="w-3.5 h-3.5 text-[#E0A93B]" />
            {greeting}
          </span>
          <span className="text-[#C4A482]">·</span>
          <span>Artesanato Autoral do Ceará</span>
          <span className="text-[#C4A482]">·</span>
          <span>Dona Arleuda</span>
        </div>

        {/* Central Display Typography with Maximum Editorial Elegance */}
        <div className="max-w-4xl mx-auto text-center space-y-6 mb-12">
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#2B1B15] leading-[1.08] [text-wrap:balance]">
            Onde o carinho se transforma em peças artesanais inesquecíveis.
          </h1>

          <p className="text-base sm:text-xl text-[#5C483F] font-light max-w-2xl mx-auto leading-relaxed">
            Aqui na <strong className="font-semibold text-[#2B1B15]">Leud'Art</strong>, não existem produções em massa. Cada cesta, caixa rústica e cartão é desenhado à mão com materiais nobres, fitas de linho e afeto genuíno.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={onExploreBuilder}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#9B543D] hover:bg-[#854432] text-white text-sm sm:text-base font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Feather className="w-5 h-5 text-amber-200" />
              <span>Simular Meu Mimo Personalizado</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="https://wa.me/5588999287029?text=Ol%C3%A1%2C%20Dona%20Arleuda!%20Gostaria%20de%20conversar%20sobre%20uma%20cesta%20especial."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-white hover:bg-[#F7F2EB] text-[#2B1B15] border border-[#D8C7B8] text-sm sm:text-base font-semibold rounded-xl shadow-sm transition-all duration-200"
            >
              <MessageCircle className="w-5 h-5 text-[#25D366]" />
              <span>Falar com Dona Arleuda: (88) 99928-7029</span>
            </a>
          </div>
        </div>

        {/* Artistic Interactive Showcase Grid (NO PHOTOS - 100% Vector & Tactile Materials) */}
        <div className="max-w-5xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: O Trançado e as Bases Nobres */}
          <div
            onClick={onExploreBuilder}
            className="group cursor-pointer p-7 rounded-2xl bg-white border border-[#E8DCCD] hover:border-[#9B543D] hover:shadow-xl transition-all duration-500 flex flex-col justify-between relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-28 h-28 bg-[#F4ECE4] rounded-bl-full -z-0 opacity-60 group-hover:scale-125 transition-transform duration-700" />

            <div className="relative z-10">
              {/* Handcrafted Illustrated Vector Icon */}
              <div className="w-14 h-14 rounded-xl bg-[#FAF7F2] border border-[#E8DCCD] flex items-center justify-center text-[#9B543D] mb-5 group-hover:rotate-6 transition-transform">
                <svg className="w-8 h-8 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
                  <path d="M4 10h16M4 14h16M8 6v12M16 6v12" strokeLinecap="round" />
                  <rect x="3" y="6" width="18" height="12" rx="2" />
                </svg>
              </div>

              <span className="text-[10px] uppercase font-bold tracking-widest text-[#854432] block mb-1">
                Bases Rústicas & Naturais
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2B1B15] mb-2">
                Palha, Madeira Teca & Linho Puro
              </h3>
              <p className="text-xs sm:text-sm text-[#6A574E] leading-relaxed">
                Cada cesto e bandeja é selecionado pela nobreza do toque e sustentabilidade. Peças duradouras que viram decoração na casa de quem recebe.
              </p>
            </div>

            <div className="relative z-10 pt-5 mt-6 border-t border-[#F2EBE1] flex items-center justify-between text-xs font-semibold text-[#9B543D]">
              <span>Explorar no Simulador</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
            </div>
          </div>

          {/* Card 2: Interactive Wax Seal Badge Centerpiece */}
          <div
            onMouseEnter={() => setInteractiveSealHovered(true)}
            onMouseLeave={() => setInteractiveSealHovered(false)}
            className="p-8 rounded-2xl bg-[#2B1B15] text-[#FAF7F2] shadow-2xl flex flex-col items-center text-center justify-between relative overflow-hidden group"
          >
            {/* Ambient gold glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#9B543D]/20 to-transparent pointer-events-none" />

            <div className="relative z-10 my-auto py-4">
              {/* 3D Wax Seal with hover rotate */}
              <div
                className={`w-20 h-20 rounded-full wax-seal mx-auto flex items-center justify-center shadow-2xl transition-all duration-700 cursor-pointer ${
                  interactiveSealHovered ? 'scale-110 rotate-180' : 'animate-float'
                }`}
              >
                <div className="w-16 h-16 rounded-full border border-white/30 flex items-center justify-center">
                  <span className="font-serif text-2xl font-bold italic text-amber-100 drop-shadow">
                    L
                  </span>
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#E0A93B] font-semibold block">
                  Selo de Exclusividade
                </span>
                <h3 className="font-serif text-2xl font-bold text-white">
                  Lacre em Cera Real & Caligrafia
                </h3>
                <p className="text-xs text-[#C8B8AE] leading-relaxed max-w-xs mx-auto">
                  A mensagem que você ditar é caligrafada à mão em papel artesanal e lacrada com cera à moda antiga.
                </p>
              </div>
            </div>

            <div className="relative z-10 w-full pt-4 border-t border-[#46332A] flex items-center justify-center gap-2 text-xs text-[#E0A93B] font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Assinatura Dona Arleuda</span>
            </div>
          </div>

          {/* Card 3: Experiência Afetiva Sobral & Ceará */}
          <div
            onClick={onExploreOccasions}
            className="group cursor-pointer p-7 rounded-2xl bg-white border border-[#E8DCCD] hover:border-[#9B543D] hover:shadow-xl transition-all duration-500 flex flex-col justify-between relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-28 h-28 bg-[#F4ECE4] rounded-bl-full -z-0 opacity-60 group-hover:scale-125 transition-transform duration-700" />

            <div className="relative z-10">
              {/* Handcrafted Illustrated Vector Icon */}
              <div className="w-14 h-14 rounded-xl bg-[#FAF7F2] border border-[#E8DCCD] flex items-center justify-center text-[#9B543D] mb-5 group-hover:rotate-6 transition-transform">
                <svg className="w-8 h-8 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>

              <span className="text-[10px] uppercase font-bold tracking-widest text-[#854432] block mb-1">
                Momentos Memoráveis
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2B1B15] mb-2">
                Café, Flores Secas & Aromas
              </h3>
              <p className="text-xs sm:text-sm text-[#6A574E] leading-relaxed">
                Harmonizações sensoriais pensadas para o paladar e olfato: cafés especiais, mel silvestre, cerâmicas e velas botânicas de soja.
              </p>
            </div>

            <div className="relative z-10 pt-5 mt-6 border-t border-[#F2EBE1] flex items-center justify-between text-xs font-semibold text-[#9B543D]">
              <span>Conhecer as Ocasiões</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
            </div>
          </div>

        </div>

        {/* Quiet Trust Bar */}
        <div className="mt-14 max-w-4xl mx-auto pt-8 border-t border-[#E8DCCD]/80 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          <div>
            <span className="block font-serif text-3xl font-bold text-[#2B1B15]">100%</span>
            <span className="text-xs text-[#7A6A60]">Autoral & Artesanal</span>
          </div>
          <div>
            <span className="block font-serif text-3xl font-bold text-[#2B1B15]">0%</span>
            <span className="text-xs text-[#7A6A60]">Produção em Massa</span>
          </div>
          <div>
            <span className="block font-serif text-3xl font-bold text-[#2B1B15]">1 a 1</span>
            <span className="text-xs text-[#7A6A60]">Atendimento Afetivo</span>
          </div>
          <div>
            <span className="block font-serif text-3xl font-bold text-[#2B1B15]">Ceará</span>
            <span className="text-xs text-[#7A6A60]">Entrega Pontual</span>
          </div>
        </div>

      </div>
    </section>
  );
};
