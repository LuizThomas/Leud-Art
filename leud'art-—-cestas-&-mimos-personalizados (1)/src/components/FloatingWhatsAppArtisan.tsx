import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export const FloatingWhatsAppArtisan: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Interactive friendly tooltip bubble */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 mb-2.5 bg-white text-[#2B1B15] text-xs py-2 px-3.5 rounded-2xl shadow-xl border border-[#E8DCCD] animate-bounce">
          <span className="font-medium">Olá! Posso ajudar a montar sua cesta?</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-[#8C7A70] hover:text-[#2B1B15] ml-1 p-0.5 rounded"
            aria-label="Fechar mensagem"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action WhatsApp Button with Artisanal Aura */}
      <a
        href="https://wa.me/5588999287029?text=Ol%C3%A1%2C%20Dona%20Arleuda!%20Gostaria%20de%20conversar%20sobre%20uma%20encomenda%20especial%20da%20Leud%27Art."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Conversar no WhatsApp com Dona Arleuda (88) 99928-7029"
        className="group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full shadow-2xl hover:shadow-emerald-500/40 transition-all duration-300 transform hover:scale-110 active:scale-95 focus:outline-none"
      >
        {/* Pulsing ring animation */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-35 group-hover:opacity-60 animate-ping pointer-events-none" />
        
        {/* WhatsApp Icon */}
        <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8 relative z-10 fill-current" />
      </a>
    </div>
  );
};
