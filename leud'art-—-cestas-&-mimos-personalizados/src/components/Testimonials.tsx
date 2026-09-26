import React from 'react';
import { Star, Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const reviews = [
    {
      name: 'Camila Fernandes',
      occasion: 'Aniversário de 50 Anos da Mãe',
      location: 'Sobral, CE',
      quote:
        'Encomendei a Cesta Amanhecer Especial para o aniversário da minha mãe e foi pura emoção. O acabamento dos pães, a xícara em cerâmica e a cartinha caligrafada fizeram ela chorar de alegria logo às 7h da manhã. O atendimento da Leuda é acolhedor demais!',
      rating: 5,
    },
    {
      name: 'Dr. Rodrigo Albuquerque',
      occasion: 'Bodas de Madeira (5 Anos)',
      location: 'Fortaleza / Região Norte, CE',
      quote:
        'A Cesta Celebração com Vinho Fino superou qualquer expectativa. A qualidade dos queijos artesanais e a tábua em madeira maciça com as nossas iniciais deram um toque de requinte que não se encontra em lojas comuns. Recomendo de olhos fechados.',
      rating: 5,
    },
    {
      name: 'Juliana e Renato Cavalcante',
      occasion: 'Nascimento da Primeira Filha',
      location: 'Ceará',
      quote:
        'A delicadeza do ursinho de crochê e da mantinha bordada na Cesta Doce Encanto encantou toda a família no quarto da maternidade. A Leud\'Art entrega amor em forma de presente.',
      rating: 5,
    },
  ];

  return (
    <section className="py-20 bg-[#FAF8F5] border-b border-[#EFE8E1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-2xl mx-auto text-center mb-14">
          <div className="text-xs uppercase tracking-widest text-[#854432] font-semibold mb-2">
            Depoimentos Reais
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#241A15] mb-3">
            O carinho de quem já presenteou com a Leud'Art
          </h2>
          <p className="text-sm text-[#6C5B52]">
            Histórias reais de afeto, celebração e momentos marcados para sempre.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-white p-7 rounded-xl border border-[#EFE8E1] shadow-xs flex flex-col justify-between"
            >
              <div>
                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-[#E0A93B] mb-4">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-[#4E3E36] leading-relaxed mb-6 italic">
                  "{rev.quote}"
                </p>
              </div>

              {/* Author & Occasion */}
              <div className="pt-4 border-t border-[#F2EAE3]">
                <h4 className="font-serif text-base font-bold text-[#241A15]">
                  {rev.name}
                </h4>
                <div className="flex items-center gap-1.5 text-xs text-[#8C7A70] mt-0.5">
                  <span>{rev.occasion}</span>
                  <span aria-hidden="true">·</span>
                  <span>{rev.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
