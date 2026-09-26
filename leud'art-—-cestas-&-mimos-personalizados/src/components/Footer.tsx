import React from 'react';
import { MessageCircle, Heart, Phone, MapPin, Clock, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onNavClick: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick }) => {
  return (
    <footer id="contato" className="bg-[#241A15] text-[#D8CDC4] pt-16 pb-12 border-t border-[#3D2C24]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main CTA Banner */}
        <div className="bg-[#2E201B] border border-[#4A372D] rounded-2xl p-8 sm:p-12 mb-16 text-center lg:text-left flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <span className="text-xs uppercase tracking-widest text-[#E0A93B] font-semibold block mb-2">
              Atendimento Personalizado
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
              Fale com a gente e monte sua cesta dos sonhos!
            </h3>
            <p className="text-sm text-[#BDB0A6] leading-relaxed">
              Tem uma ideia especial em mente? Personalizamos o tamanho, os produtos, as cores das fitas e o bilhete manuscrito para que o momento seja perfeito.
            </p>
          </div>

          <a
            href="https://wa.me/5588999287029?text=Ol%C3%A1%2C%20Dona%20Arleuda!%20Gostaria%20de%20montar%20uma%20cesta%20personalizada%20dos%20meus%20sonhos."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#25D366] hover:bg-[#20BA5A] text-white text-sm font-bold rounded-xl shadow-lg transition-all duration-200 shrink-0 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Chamar no WhatsApp: (88) 99928-7029</span>
          </a>
        </div>

        {/* 4-Column Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#3D2C24]">
          
          {/* Col 1: Brand & Bio */}
          <div>
            <div className="font-serif text-2xl font-bold text-white tracking-tight mb-2">
              Leud'Art
            </div>
            <p className="text-xs text-[#A8988E] leading-relaxed mb-4">
              Ateliê de cestas e mimos personalizados. Criamos memórias afetivas através de peças artesanais sofisticadas, feitas com o coração.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#E0A93B]">
              <Heart className="w-3.5 h-3.5 fill-current" />
              <span>Artesanato autoral feito no Ceará</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Navegação
            </h4>
            <ul className="space-y-2 text-xs text-[#BDB0A6]">
              <li>
                <button
                  onClick={() => onNavClick('inicio')}
                  className="hover:text-white transition-colors"
                >
                  Início
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('catalogo')}
                  className="hover:text-white transition-colors"
                >
                  Coleções & Cestas
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('sobre')}
                  className="hover:text-white transition-colors"
                >
                  Sobre a Dona Leuda
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('diferenciais')}
                  className="hover:text-white transition-colors"
                >
                  Diferenciais do Feito à Mão
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Categorias */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Ocasiões Especiais
            </h4>
            <ul className="space-y-2 text-xs text-[#BDB0A6]">
              <li>Cestas de Café da Manhã</li>
              <li>Celebrações, Bodas & Vinhos</li>
              <li>Caixas Mimo & Autocuidado</li>
              <li>Maternidade & Chá de Bebê</li>
              <li>Presentes Corporativos Exclusivos</li>
            </ul>
          </div>

          {/* Col 4: Contato Direto */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Contato Direto
            </h4>
            <ul className="space-y-3 text-xs text-[#BDB0A6]">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#E0A93B] shrink-0" />
                <a
                  href="https://wa.me/5588999287029"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors font-medium text-white"
                >
                  (88) 99928-7029 (WhatsApp)
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#E0A93B] shrink-0 mt-0.5" />
                <span>Segunda a Sábado: 08h às 19h</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#E0A93B] shrink-0 mt-0.5" />
                <span>Ateliê Leud'Art — Ceará, Brasil</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Quiet Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8C7A70] gap-4">
          <p>
            © {new Date().getFullYear()} Leud'Art — Todos os direitos reservados.
          </p>
          <p className="flex items-center gap-1">
            <span>Desenvolvido com sofisticação artesanal e excelência.</span>
          </p>
        </div>

      </div>
    </footer>
  );
};
