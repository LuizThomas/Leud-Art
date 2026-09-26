import React, { useState, useEffect } from 'react';
import { MessageCircle, Sparkles, Volume2, VolumeX, Menu, X, ArrowUpRight, Heart } from 'lucide-react';

interface ArtisanNavbarProps {
  onNavClick: (id: string) => void;
  activeSection: string;
}

export const ArtisanNavbar: React.FC<ArtisanNavbarProps> = ({ onNavClick, activeSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Soft ambient chime synthesizer using Web Audio API
  const toggleAmbientSound = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();

      if (!isPlayingAudio) {
        setIsPlayingAudio(true);
        // Play harmonious meditative chime chords (C major pentatonic chords)
        const notes = [261.63, 329.63, 392.00, 523.25, 659.25];
        notes.forEach((freq, index) => {
          setTimeout(() => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, ctx.currentTime);
            
            gain.gain.setValueAtTime(0.08, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 3.5);
            
            osc.connect(gain);
            gain.connect(ctx.destination);
            
            osc.start();
            osc.stop(ctx.currentTime + 3.5);
          }, index * 260);
        });

        setTimeout(() => setIsPlayingAudio(false), 3000);
      } else {
        setIsPlayingAudio(false);
      }
    } catch {
      // Audio fallback
    }
  };

  const navLinks = [
    { id: 'atelie', label: 'O Ateliê' },
    { id: 'simulador', label: 'Criador de Mimos' },
    { id: 'ocasioes', label: 'Ocasiões & Emoções' },
    { id: 'manifesto', label: 'Filosofia Artesanal' },
    { id: 'passo-a-passo', label: 'Como Encomendar' },
    { id: 'duvidas', label: 'Dúvidas' },
  ];

  const handleLinkClick = (id: string) => {
    onNavClick(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF7F2]/95 backdrop-blur-md shadow-sm border-b border-[#E8DCCD]'
          : 'bg-[#FAF7F2]/80 backdrop-blur-xs border-b border-[#E8DCCD]/50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-24 flex items-center justify-between">
        
        {/* Brand Text Identity */}
        <button
          onClick={() => handleLinkClick('atelie')}
          className="group text-left flex items-center gap-3 focus:outline-none"
        >
          {/* Handcrafted Wax Seal Symbol SVG */}
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full wax-seal flex items-center justify-center text-white shadow-md transform group-hover:rotate-12 transition-transform duration-500">
            <span className="font-serif text-lg sm:text-xl font-bold tracking-widest italic">L</span>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#2B1B15] group-hover:text-[#9B543D] transition-colors">
                Leud'Art
              </span>
              <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-[#E0A93B]" />
            </div>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#8C7A70] font-medium -mt-1">
              Ateliê de Cestas & Mimos
            </span>
          </div>
        </button>

        {/* Center Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold uppercase tracking-wider text-[#5A473E]">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={`py-1.5 relative transition-colors hover:text-[#9B543D] ${
                activeSection === link.id ? 'text-[#9B543D]' : ''
              }`}
            >
              {link.label}
              {activeSection === link.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#9B543D] rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Actions Zone */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          
          {/* Subtle Atelier Sound chime button */}
          <button
            onClick={toggleAmbientSound}
            aria-label="Tocar sino zen do ateliê"
            className="p-2 sm:px-3 sm:py-2 text-xs font-medium text-[#7A6A60] hover:text-[#2B1B15] bg-[#F2EBE1] hover:bg-[#EAE1D4] rounded-lg transition-colors flex items-center gap-1.5"
            title="Sintetizar som meditativo do ateliê"
          >
            {isPlayingAudio ? (
              <>
                <Volume2 className="w-4 h-4 text-[#9B543D] animate-pulse" />
                <span className="hidden md:inline text-[11px] font-semibold text-[#9B543D]">Harmonia Ativa</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-[#E0A93B]" />
                <span className="hidden md:inline text-[11px]">Sino do Ateliê</span>
              </>
            )}
          </button>

          {/* Primary Action: Direct WhatsApp Call to Dona Arleuda */}
          <a
            href="https://wa.me/5588999287029?text=Ol%C3%A1%2C%20Dona%20Arleuda!%20Gostaria%20de%20conversar%20sobre%20uma%20cesta%20personalizada%20da%20Leud%27Art."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 bg-[#9B543D] hover:bg-[#854432] text-white text-xs sm:text-sm font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform active:scale-95"
          >
            <MessageCircle className="w-4 h-4 text-emerald-300" />
            <span className="hidden sm:inline">(88) 99928-7029</span>
            <span className="sm:hidden">WhatsApp</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
          </a>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 lg:hidden text-[#2B1B15] hover:text-[#9B543D] rounded-lg"
            aria-label="Abrir menu móvel"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#E8DCCD] bg-[#FAF7F2] px-6 py-6 space-y-4 animate-fadeIn">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="text-left py-2.5 px-3 text-sm font-semibold text-[#2B1B15] hover:bg-[#F2EBE1] rounded-lg transition-colors"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="pt-4 border-t border-[#E8DCCD] space-y-3">
            <a
              href="https://wa.me/5588999287029"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-[#25D366] text-white text-sm font-semibold rounded-xl shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chamar Dona Arleuda: (88) 99928-7029</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
