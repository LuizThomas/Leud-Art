import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end">
      {/* Tooltip speech bubble */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 mb-2 bg-white text-[#241A15] text-xs py-2 px-3.5 rounded-xl shadow-lg border border-[#E8DCD1] animate-bounce">
          <span>Olá! Posso ajudar a montar sua cesta?</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-[#8C7A70] hover:text-[#241A15] ml-1"
            aria-label="Fechar dica do WhatsApp"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href="https://wa.me/5588999287029?text=Ol%C3%A1%2C%20Dona%20Arleuda!%20Gostaria%20de%20tirar%20uma%20d%C3%BAvida%20sobre%20as%20cestas%20da%20Leud%27Art."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Conversar no WhatsApp com a proprietária da Leud'Art"
        className="group relative flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#25D366]/40"
      >
        {/* Pulsing ring animation */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-30 group-hover:opacity-50 animate-ping pointer-events-none" />
        <MessageCircle className="w-7 h-7 relative z-10" />
      </a>
    </div>
  );
};
