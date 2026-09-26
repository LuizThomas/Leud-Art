import React, { useState } from 'react';
import { ChevronDown, MessageCircle, HelpCircle } from 'lucide-react';

export const ArtisanFAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Com quanta antecedência preciso fazer minha encomenda?',
      a: 'Para cestas de café da manhã e celebrações habituais, recomendamos encomendar com pelo menos 24 a 48 horas de antecedência. Isso garante que os pães artesanais, queijos e flores secas sejam preparados fresquinhos. Para datas comemorativas grandes (Dia das Mães, Dia dos Namorados, Natal), reserve com alguns dias de antecedência para garantir vaga na agenda de Dona Arleuda.',
    },
    {
      q: 'Onde a Leud\'Art realiza entregas no Ceará?',
      a: 'Atendemos Sobral e toda a região norte do Ceará com entrega própria e pontualidade rigorosa. Também enviamos caixas de mimos e lembranças afetivas embaladas com proteção especial para outras cidades do estado mediante consulta de rota no WhatsApp.',
    },
    {
      q: 'Posso incluir um presente meu (ex: joia, foto ou perfume) dentro da cesta?',
      a: 'Com certeza! Essa é uma das nossas maiores especialidades. Você pode combinar a entrega do seu item previamente com Dona Arleuda e nós incorporamos a peça no arranjo com o mesmo laço de linho e lacre de cera, criando uma harmonia perfeita.',
    },
    {
      q: 'A cartinha é realmente escrita à mão?',
      a: 'Sim, 100%! Rejeitamos cartões impressos por computador que parecem notas fiscais. Você envia sua mensagem pelo WhatsApp e ela é cuidadosamente caligrafada em papel verjê de alta gramatura, dobrada e selada com cera quente e o carimbo do ateliê.',
    },
    {
      q: 'Quais as formas de pagamento aceitas?',
      a: 'Aceitamos Pix (com confirmação imediata), transferência bancária e cartões de crédito. O pagamento é acordado de forma transparente diretamente com Dona Arleuda no momento da confirmação do pedido.',
    },
  ];

  return (
    <section id="duvidas" className="py-20 sm:py-28 bg-[#FAF7F2] border-b border-[#E8DCCD]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-[#854432] mb-2">
            <HelpCircle className="w-4 h-4 text-[#9B543D]" />
            Transparência & Confiança
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#2B1B15] tracking-tight">
            Perguntas Frequentes
          </h2>
          <p className="text-sm sm:text-base text-[#6A574E] mt-3">
            Tudo o que você precisa saber para planejar um presente inesquecível.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-[#E8DCCD] overflow-hidden shadow-xs transition-all duration-200"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="font-serif text-base sm:text-lg font-bold text-[#2B1B15]">
                    {faq.q}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full bg-[#FAF7F2] flex items-center justify-center text-[#8C7A70] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-[#F2EBE1] text-[#9B543D]' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-[#5C483F] leading-relaxed border-t border-[#F2EBE1]/80">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Direct question button */}
        <div className="mt-12 text-center">
          <p className="text-xs text-[#7A6A60] mb-3">
            Tem alguma outra dúvida específica ou quer um projeto especial?
          </p>
          <a
            href="https://wa.me/5588999287029?text=Ol%C3%A1%2C%20Dona%20Arleuda!%20Tenho%20uma%20d%C3%BAvida%20espec%C3%ADfica%20sobre%20as%20cestas."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#9B543D] hover:underline"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Tirar dúvida diretamente no WhatsApp: (88) 99928-7029</span>
          </a>
        </div>

      </div>
    </section>
  );
};
