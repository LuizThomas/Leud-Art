import React from 'react';
import { HeartHandshake, Sparkles, Gift, Clock, ShieldCheck, Smile } from 'lucide-react';

export const Features: React.FC = () => {
  const features = [
    {
      icon: HeartHandshake,
      title: '1. Afeto em Cada Laço',
      description: 'Cada cesta é pensada para emocionar. Não produzimos em série: dedicamos tempo e carinho exclusivo a cada detalhe.',
    },
    {
      icon: Sparkles,
      title: '2. Personalização Completa',
      description: 'Cartão caligrafado à mão, escolha de cores de laços, inclusão de fotos e mimos favoritos da pessoa presenteada.',
    },
    {
      icon: Gift,
      title: '3. Materiais Nobres',
      description: 'Bandejas em madeira reflorestada, cestos de palha nobre, cerâmicas artesanais e insumos gourmets de alta qualidade.',
    },
    {
      icon: Clock,
      title: '4. Entrega Pontual & Cuidado',
      description: 'Agendamos o horário exato da surpresa no Ceará com embalagem reforçada que preserva a beleza do arranjo.',
    },
  ];

  return (
    <section id="diferenciais" className="py-16 sm:py-20 bg-white border-b border-[#EFE8E1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-2xl mx-auto text-center mb-14">
          <div className="text-xs uppercase tracking-widest text-[#854432] font-semibold mb-2">
            O Padrão Leud'Art
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#241A15] mb-4">
            Por que um presente Leud'Art é inesquecível?
          </h2>
          <p className="text-[#64534A] text-sm sm:text-base leading-relaxed">
            Mais do que cestas, entregamos gestos de amor e consideração que ficam guardados na memória.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <div
                key={index}
                className="group p-6 rounded-xl border border-[#EFE8E1] bg-[#FAF8F5] hover:bg-white hover:border-[#DDD0C5] hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-lg bg-[#F2EAE3] text-[#9B543D] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#241A15] mb-2.5">
                    {feat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6C5B52] leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#EFE8E1]/60 flex items-center text-xs font-semibold text-[#854432]">
                  <span>Padrão Artesanal</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
