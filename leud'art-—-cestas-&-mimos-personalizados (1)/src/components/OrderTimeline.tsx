import React from 'react';
import { MessageSquare, Palette, Feather, Gift, Check, ArrowRight } from 'lucide-react';

export const OrderTimeline: React.FC = () => {
  const steps = [
    {
      num: '1',
      title: 'O Primeiro Contato no WhatsApp',
      desc: 'Você envia uma mensagem ou áudio contando quem é a pessoa a ser presenteada, a ocasião e o que ela mais ama (café, vinhos, autocuidado ou doces).',
      icon: MessageSquare,
      badge: 'Atendimento Afetivo',
    },
    {
      num: '2',
      title: 'A Curadoria Sob Medida',
      desc: 'Dona Arleuda sugere a base perfeita (madeira, palha ou caixa rígida), a paleta de cores das fitas de linho e os itens artesanais que mais combinam.',
      icon: Palette,
      badge: '100% Personalizado',
    },
    {
      num: '3',
      title: 'A Caligrafia & O Lacre em Cera',
      desc: 'Você escreve ou dita a sua dedicatória. Ela é caligrafada à mão em papel artesanal verjê e lacrada em cera quente com a inicial escolhida.',
      icon: Feather,
      badge: 'À Moda Antiga',
    },
    {
      num: '4',
      title: 'A Entrega da Surpresa',
      desc: 'No dia e horário marcados, a peça chega impecavelmente embalada ao endereço combinado no Ceará, criando uma memória emocionante.',
      icon: Gift,
      badge: 'Pontualidade Garantida',
    },
  ];

  return (
    <section id="passo-a-passo" className="py-20 sm:py-28 bg-white border-b border-[#E8DCCD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs uppercase font-bold tracking-widest text-[#854432] block mb-2">
            Simples, Transparente & Afetivo
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#2B1B15] tracking-tight">
            Como Encomendar sua Criação
          </h2>
          <p className="text-sm sm:text-base text-[#68554C] mt-3 leading-relaxed">
            Sem processos frios ou formulários complexos. Aqui você conversa de pessoa para pessoa.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((st, idx) => {
            const Icon = st.icon;
            return (
              <div
                key={st.num}
                className="p-7 rounded-2xl bg-[#FAF7F2] border border-[#E8DCCD] hover:border-[#9B543D] hover:shadow-md transition-all duration-300 flex flex-col justify-between relative group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="w-10 h-10 rounded-full bg-[#9B543D] text-white font-serif font-bold text-lg flex items-center justify-center shadow-xs">
                      {st.num}
                    </span>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#854432] bg-white px-2.5 py-1 rounded-full border border-[#E8DCCD]">
                      {st.badge}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-[#2B1B15] mb-2.5">
                    {st.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#6A574E] leading-relaxed">
                    {st.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E8DCCD]/60 flex items-center text-xs font-semibold text-[#9B543D] gap-1">
                  <span>Passo {st.num} de 4</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Callout */}
        <div className="mt-14 max-w-2xl mx-auto p-6 sm:p-8 bg-[#FAF7F2] rounded-2xl border border-[#D8C7B8] text-center space-y-4">
          <p className="font-serif text-xl font-bold text-[#2B1B15]">
            Quer tirar uma dúvida ou agendar uma data comemorativa com antecedência?
          </p>
          <a
            href="https://wa.me/5588999287029?text=Ol%C3%A1%2C%20Dona%20Arleuda!%20Gostaria%20de%20saber%20como%20funciona%20para%20encomendar%20uma%20cesta%20para%20uma%20data%20especial."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#9B543D] hover:bg-[#854432] text-white text-xs sm:text-sm font-semibold rounded-xl shadow-sm transition-colors"
          >
            <span>Iniciar Conversa no WhatsApp: (88) 99928-7029</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
};
