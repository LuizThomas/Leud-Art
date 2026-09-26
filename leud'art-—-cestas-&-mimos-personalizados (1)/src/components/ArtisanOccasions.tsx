import React, { useState } from 'react';
import {
  Coffee,
  Wine,
  Sparkles,
  Baby,
  Briefcase,
  ArrowRight,
  MessageCircle,
  Heart,
  Feather,
  Check
} from 'lucide-react';

export const ArtisanOccasions: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const occasions = [
    {
      id: 'amanhecer',
      title: 'Amanhecer & Café Especial',
      subtitle: 'Para quem merece começar o dia sentindo-se a pessoa mais importante do mundo.',
      icon: Coffee,
      badge: 'A Mais Emocionante',
      accentColor: '#B46A4A',
      sensoryNotes: [
        'Aroma de café moído na hora e pães de fermentação natural',
        'Xícara em cerâmica fria que aquece nas mãos',
        'Mel silvestre dourado com pegador rústico em madeira',
        'Bandeja que fica de presente para os cafés da vida toda',
      ],
      suggestedMessage:
        'Que este café quentinho te lembre o quanto seu sorriso ilumina as nossas manhãs. Te amo infinito!',
      whatsAppPrompt:
        'Olá, Dona Arleuda! Adorei a proposta da Cesta de Amanhecer & Café Especial e gostaria de encomendar uma!',
    },
    {
      id: 'bodas-vinho',
      title: 'Celebração, Bodas & Vinhos',
      subtitle: 'Para brindar conquistas, aniversários de casamento e o amor que só cresce com o tempo.',
      icon: Wine,
      badge: 'Sofisticação a Dois',
      accentColor: '#8C3D32',
      sensoryNotes: [
        'Garrafa de vinho fino tinto selecionado',
        'Tábua de corte rústica em madeira teca para queijos e antepastos',
        'Trufas artesanais com cacau belga e textura aveludada',
        'Lacre em cera nobre com o brasão ou inicial do casal',
      ],
      suggestedMessage:
        'A cada ano que passa, nosso amor ganha mais corpo e doçura. Um brinde à nossa história!',
      whatsAppPrompt:
        'Olá, Dona Arleuda! Gostaria de encomendar uma Cesta de Celebração com Vinho para um aniversário especial.',
    },
    {
      id: 'autocuidado',
      title: 'Refúgio de Autocuidado & Aromas',
      subtitle: 'Um convite delicado para respirar fundo, acender uma vela e desacelerar a alma.',
      icon: Sparkles,
      badge: 'Paz & Acolhimento',
      accentColor: '#9E6D48',
      sensoryNotes: [
        'Vela vegetal aromática de soja com óleo essencial de lavanda e baunilha',
        'Sabonete botânico saponificado a frio com sementes hidratantes',
        'Mini buquê perpétuo de flores secas e ramos perfumados',
        'Envelope de papel artesanal com poesia de bem-querer',
      ],
      suggestedMessage:
        'Pare alguns minutos, respire fundo e cuide de você com o mesmo carinho com que você cuida de todos.',
      whatsAppPrompt:
        'Olá, Dona Arleuda! Gostaria de encomendar uma Caixa de Mimo e Autocuidado com velas e aromas.',
    },
    {
      id: 'maternidade',
      title: 'Boas-Vindas & Maternidade',
      subtitle: 'A doçura infinita para acolher a nova vida que chegou e abraçar os papais.',
      icon: Baby,
      badge: 'Pura Ternura',
      accentColor: '#C48B71',
      sensoryNotes: [
        'Ursinho feito à mão em crochê amigurumi com fio 100% algodão hipoalergênico',
        'Manta de bebê macia bordada com o nome do recém-nascido',
        'Sachê aromático de camomila e alfazema para o berço',
        'Cesto rústico em palha nobre com laço de fita suave',
      ],
      suggestedMessage:
        'Bem-vindo(a) ao mundo, pequeno milagre! Que seus dias sejam repletos de saúde, paz e amor sem fim.',
      whatsAppPrompt:
        'Olá, Dona Arleuda! Gostaria de presentear uma mãezinha com o Mimo de Boas-Vindas & Maternidade!',
    },
    {
      id: 'corporativo',
      title: 'Legado & Parceria Corporativa',
      subtitle: 'Reconhecimento institucional refinado para homenagear líderes, clientes e parceiros.',
      icon: Briefcase,
      badge: 'Exclusividade Executiva',
      accentColor: '#5C4A3E',
      sensoryNotes: [
        'Caixa rígida preta ou kraft com gravação personalizada',
        'Café gourmet selecionado e caneca térmica nobre',
        'Mix de castanhas nobres caramelizadas com melado',
        'Cartão com a identidade e palavras do conselho ou diretoria',
      ],
      suggestedMessage:
        'Com profunda admiração e gratidão pela sua liderança e parceria em cada grande conquista.',
      whatsAppPrompt:
        'Olá, Dona Arleuda! Gostaria de consultar propostas de mimos corporativos para nossa empresa.',
    },
  ];

  const current = occasions[activeTab];
  const Icon = current.icon;

  return (
    <section id="ocasioes" className="py-20 sm:py-28 bg-white border-b border-[#E8DCCD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <span className="text-xs uppercase font-bold tracking-widest text-[#854432] block mb-2">
            Curadoria por Sentimento
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#2B1B15] tracking-tight">
            Para Cada Momento, uma Peça Única
          </h2>
          <p className="text-sm sm:text-base text-[#68554C] mt-3 leading-relaxed">
            Não entregamos apenas objetos: criamos a atmosfera perfeita para a emoção que você quer despertar.
          </p>
        </div>

        {/* Interactive Segmented Tabs */}
        <div className="flex items-center justify-start lg:justify-center gap-2 overflow-x-auto pb-4 mb-12 no-scrollbar">
          {occasions.map((occ, idx) => {
            const TabIcon = occ.icon;
            const isActive = activeTab === idx;
            return (
              <button
                key={occ.id}
                onClick={() => setActiveTab(idx)}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-[#2B1B15] text-white shadow-md'
                    : 'bg-[#FAF7F2] text-[#6A574E] hover:bg-[#F2EBE1] border border-[#E8DCCD]'
                }`}
              >
                <TabIcon className={`w-4 h-4 ${isActive ? 'text-[#E0A93B]' : 'text-[#8C7A70]'}`} />
                <span>{occ.title.split('&')[0].trim()}</span>
              </button>
            );
          })}
        </div>

        {/* Active Occasion Showcase Panel */}
        <div className="bg-[#FAF7F2] rounded-3xl border border-[#E8DCCD] p-6 sm:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Text & Sensory Breakdown (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-white border border-[#E8DCCD] text-[#854432] text-xs font-bold uppercase tracking-wider rounded-full shadow-xs">
                {current.badge}
              </span>
            </div>

            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B1B15] leading-tight">
              {current.title}
            </h3>

            <p className="text-sm sm:text-base text-[#5A473E] leading-relaxed">
              {current.subtitle}
            </p>

            {/* Sensory Checklist */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs uppercase font-bold tracking-widest text-[#854432]">
                A Harmonização dos Sentidos:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {current.sensoryNotes.map((note, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-[#5A473E] bg-white p-3 rounded-xl border border-[#E8DCCD]">
                    <Check className="w-4 h-4 text-[#9B543D] shrink-0 mt-0.5" />
                    <span>{note}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA directly to WhatsApp with this preset */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href={`https://wa.me/5588999287029?text=${encodeURIComponent(current.whatsAppPrompt)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all duration-200"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Pedir Esta Composição pelo WhatsApp</span>
              </a>
              <span className="text-xs text-[#8C7A70] text-center sm:text-left">
                (88) 99928-7029 · Dona Arleuda
              </span>
            </div>

          </div>

          {/* Right Artistic Calligraphy Presentation (5 Cols) */}
          <div className="lg:col-span-5 relative">
            <div className="bg-white rounded-2xl p-7 border border-[#E8DCCD] shadow-md relative overflow-hidden space-y-4">
              
              {/* Decorative Corner Wax Seal */}
              <div className="flex items-center justify-between pb-3 border-b border-[#F2EBE1]">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#854432] uppercase tracking-wider">
                  <Feather className="w-4 h-4 text-[#9B543D]" />
                  <span>Inspiração de Dedicatória</span>
                </div>
                <div className="w-7 h-7 rounded-full wax-seal flex items-center justify-center text-white text-xs font-serif font-bold">
                  L
                </div>
              </div>

              {/* Handcrafted Quote */}
              <p className="font-serif italic text-base sm:text-lg text-[#2B1B15] leading-relaxed py-2">
                "{current.suggestedMessage}"
              </p>

              <div className="pt-3 border-t border-[#F2EBE1] flex items-center justify-between text-xs text-[#8C7A70]">
                <span>Escrito à mão no Ceará</span>
                <span className="text-[#9B543D] font-semibold">Envelope lacrado em cera</span>
              </div>

            </div>

            {/* Subtle background shadow ornament */}
            <div className="absolute -bottom-4 -right-4 w-full h-full bg-[#E8DCCD]/50 rounded-2xl -z-10" />
          </div>

        </div>

      </div>
    </section>
  );
};
