import React from 'react';
import { MessageCircle, Heart, Phone, MapPin, Clock, ArrowUpRight, Sparkles } from 'lucide-react';

interface ArtisanFooterProps {
  onNavClick: (id: string) => void;
}

export const ArtisanFooter: React.FC<ArtisanFooterProps> = ({ onNavClick }) => {
  return (
    <footer className="bg-[#241A15] text-[#D8CDC4] pt-16 pb-12 border-t border-[#3D2C24]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* High-Impact Warm Conversion Callout Banner */}
        <div className="bg-[#2E201B] border border-[#4A372D] rounded-3xl p-8 sm:p-12 mb-16 text-center lg:text-left flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl">
          
          <div className="max-w-xl space-y-3 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E0A93B]/10 border border-[#E0A93B]/30 text-xs font-semibold text-[#E0A93B]">
              <Sparkles className="w-3.5 h-3.5" />
              Ateliê Aberto para Novas Encomendas
            </div>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
              Vamos transformar seu sentimento no presente mais lindo que ela já ganhou?
            </h3>
            <p className="text-sm text-[#BDB0A6] leading-relaxed">
              Fale direto com Dona Arleuda. Conte a sua ideia, escolha a ocasião e receba um mimo planejado com todo o carinho do Ceará.
            </p>
          </div>

          <div className="flex flex-col items-center lg:items-end gap-3 relative z-10 shrink-0">
            <a
              href="https://wa.me/5588999287029?text=Ol%C3%A1%2C%20Dona%20Arleuda!%20Gostaria%20de%20conversar%20sobre%20uma%20encomenda%20especial%20da%20Leud%27Art."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#25D366] hover:bg-[#20BA5A] text-white text-sm sm:text-base font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Chamar Dona Arleuda no WhatsApp</span>
            </a>
            <span className="text-xs text-[#E0A93B] font-mono tracking-wider font-semibold">
              Telefone Direto: (88) 99928-7029
            </span>
          </div>

          {/* Decorative ambient background orb */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#9B543D]/10 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* 4-Column Editorial Links & Contact */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#3D2C24]">
          
          {/* Col 1: Brand & Philosophy */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full wax-seal flex items-center justify-center text-white font-serif font-bold text-base">
                L
              </div>
              <span className="font-serif text-2xl font-bold text-white tracking-tight">
                Leud'Art
              </span>
            </div>
            <p className="text-xs text-[#A8988E] leading-relaxed">
              Ateliê autoral de cestas e mimos personalizados. Unimos a nobreza de materiais naturais, curadoria de sabores e caligrafia manuscrita com cera real.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-[#E0A93B]">
              <Heart className="w-3.5 h-3.5 fill-current" />
              <span>Feito à mão no Ceará com muito amor</span>
            </div>
          </div>

          {/* Col 2: Atelier Navigation */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              O Ateliê
            </h4>
            <ul className="space-y-2.5 text-xs text-[#BDB0A6]">
              <li>
                <button
                  onClick={() => onNavClick('atelie')}
                  className="hover:text-white transition-colors"
                >
                  Início & Filosofia
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('simulador')}
                  className="hover:text-white transition-colors"
                >
                  Criador de Mimos Interativo
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('ocasioes')}
                  className="hover:text-white transition-colors"
                >
                  Ocasiões & Emoções
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('manifesto')}
                  className="hover:text-white transition-colors"
                >
                  Os 4 Pilares do Feito à Mão
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('duvidas')}
                  className="hover:text-white transition-colors"
                >
                  Dúvidas Frequentes
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Occasion Themes */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Criações Autorais
            </h4>
            <ul className="space-y-2.5 text-xs text-[#BDB0A6]">
              <li>Amanhecer & Café Especial</li>
              <li>Celebrações, Bodas & Vinhos</li>
              <li>Caixas Mimo & Autocuidado</li>
              <li>Boas-Vindas à Maternidade</li>
              <li>Homenagens Corporativas Nobres</li>
              <li>Cartão com Lacre em Cera Real</li>
            </ul>
          </div>

          {/* Col 4: Direct Contacts */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Contato com a Artesã
            </h4>
            <ul className="space-y-3 text-xs text-[#BDB0A6]">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#E0A93B] shrink-0" />
                <a
                  href="https://wa.me/5588999287029"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:underline font-semibold font-mono text-sm"
                >
                  (88) 99928-7029
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#E0A93B] shrink-0 mt-0.5" />
                <span>Atendimento acolhedor: Seg. a Sáb. das 08h às 19h</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#E0A93B] shrink-0 mt-0.5" />
                <span>Sobral & Região — Ceará, Brasil</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8C7A70] gap-4">
          <p>
            © {new Date().getFullYear()} Leud'Art — Ateliê de Cestas & Mimos Personalizados. Todos os direitos reservados.
          </p>
          <p className="flex items-center gap-1">
            <span>Proprietária & Artesã: <strong>Dona Arleuda</strong></span>
          </p>
        </div>

      </div>
    </footer>
  );
};
