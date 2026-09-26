/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArtisanNavbar } from './components/ArtisanNavbar';
import { ArtisanHero } from './components/ArtisanHero';
import { InteractiveGiftBuilder } from './components/InteractiveGiftBuilder';
import { ArtisanOccasions } from './components/ArtisanOccasions';
import { CraftManifesto } from './components/CraftManifesto';
import { OrderTimeline } from './components/OrderTimeline';
import { ArtisanFAQ } from './components/ArtisanFAQ';
import { ArtisanFooter } from './components/ArtisanFooter';
import { FloatingWhatsAppArtisan } from './components/FloatingWhatsAppArtisan';

export default function App() {
  const [activeSection, setActiveSection] = useState('atelie');

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#2B1B15] selection:bg-[#E2CEBF] selection:text-[#3B2820]">
      {/* Navigation */}
      <ArtisanNavbar
        activeSection={activeSection}
        onNavClick={scrollToSection}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <ArtisanHero
          onExploreBuilder={() => scrollToSection('simulador')}
          onExploreOccasions={() => scrollToSection('ocasioes')}
        />

        {/* Interactive Centerpiece: Monte seu Mimo em Tempo Real */}
        <InteractiveGiftBuilder />

        {/* Occasions & Emotions Showcase */}
        <ArtisanOccasions />

        {/* Philosophy & 4 Pillars of Crafting */}
        <CraftManifesto />

        {/* How it Works / 4-Step Journey */}
        <OrderTimeline />

        {/* Frequently Asked Questions */}
        <ArtisanFAQ />
      </main>

      {/* Footer with Direct Contacts & WhatsApp Hotline */}
      <ArtisanFooter onNavClick={scrollToSection} />

      {/* Floating WhatsApp Action Seal */}
      <FloatingWhatsAppArtisan />
    </div>
  );
}
