import React from 'react';
import { Sparkles, Heart, Award, CheckCircle2 } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="sobre" className="py-20 bg-white border-b border-[#EFE8E1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Image Showcase Column */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative">
              <div className="rounded-2xl overflow-hidden border border-[#E8DCD1] shadow-lg bg-[#FAF8F5] aspect-[4/5] relative">
                <img
                  src="/src/assets/images/box_mimo_afeto_1790455462869.jpg"
                  alt="Processo artesanal da Leud'Art e materiais nobres"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Floating quote badge */}
              <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-[#FAF8F5] border border-[#DDD0C5] p-5 rounded-xl shadow-lg max-w-[280px]">
                <div className="flex items-center gap-2 text-[#9B543D] mb-1">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Filosofia Autoral</span>
                </div>
                <p className="font-serif italic text-xs sm:text-sm text-[#3E2F27] leading-snug">
                  "Um presente só é verdadeiramente inesquecível quando carrega a essência de quem oferece e o afeto de quem recebe."
                </p>
                <span className="block text-[11px] font-semibold text-[#854432] mt-2">
                  — Dona Arleuda, Fundadora & Artesã
                </span>
              </div>
            </div>
          </div>

          {/* Text Storytelling Column */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#854432]">
              <span>História & Propósito</span>
              <span aria-hidden="true">·</span>
              <span>Leud'Art Ceará</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#241A15] leading-tight">
              A arte de transformar sentimentos em memórias afetivas.
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-[#5C4D44] leading-relaxed">
              <p>
                A <strong>Leud'Art</strong> nasceu do amor genuíno pelas manualidades e pelo poder acolhedor do feito à mão. O que começou como uma paixão em criar mimos únicos para a família e amigos floresceu em um ateliê boutique que celebra momentos preciosos em todo o Ceará.
              </p>
              <p>
                Recusamos a impessoalidade das produções industriais. Cada cesta de café da manhã, caixa comemorativa ou lembrança de maternidade é concebida como uma obra singular. Escolhemos trançados de palha nobre, madeiras sustentáveis, rendas, cerâmicas modeladas e arranjos florais desidratados de longa duração.
              </p>
              <p>
                Quando você encomenda na Leud'Art, fala diretamente com quem planeja, seleciona e confecciona o seu presente, garantindo que cada laço e cada palavra manuscrita no cartão expressem exatamente o que o seu coração deseja dizer.
              </p>
            </div>

            {/* Quality Seals */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#EFE8E1]">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#9B543D] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[#241A15]">100% Feito à Mão</h4>
                  <p className="text-[11px] text-[#7A6A60]">Montagem manual cuidadosa item por item</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#9B543D] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[#241A15]">Materiais Nobres</h4>
                  <p className="text-[11px] text-[#7A6A60]">Linho puro, cerâmica e madeira sustentável</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#9B543D] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[#241A15]">Exclusividade</h4>
                  <p className="text-[11px] text-[#7A6A60]">Nenhuma cesta é idêntica à outra</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
