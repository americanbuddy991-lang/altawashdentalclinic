import React, { useState } from 'react';
import { Logo } from './Logo';
import { Language } from '../types';
import { translations } from '../data/translations';
import { Phone, Calendar, Globe, Menu, X } from 'lucide-react';

interface NavbarProps {
  lang: Language;
  onToggleLang: () => void;
  onBookClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ lang, onToggleLang, onBookClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[lang];

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#"
          className="flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 rounded-md py-1"
          aria-label="Al Tawash Dental Center Home"
        >
          <Logo size={36} showText={true} lang={lang} />
        </a>

        {/* Zone 2: 4-5 Clean Text Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
          <button
            type="button"
            onClick={() => handleNavClick('services')}
            className="hover:text-teal-700 transition-colors cursor-pointer whitespace-nowrap"
          >
            {t.nav.services}
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('free-offer')}
            className="hover:text-teal-700 transition-colors cursor-pointer text-teal-700 font-semibold whitespace-nowrap"
          >
            {t.nav.freeConsultBadge}
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('why-us')}
            className="hover:text-teal-700 transition-colors cursor-pointer whitespace-nowrap"
          >
            {t.nav.whyUs}
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('reviews')}
            className="hover:text-teal-700 transition-colors cursor-pointer whitespace-nowrap"
          >
            {t.nav.reviews}
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('location')}
            className="hover:text-teal-700 transition-colors cursor-pointer whitespace-nowrap"
          >
            {t.nav.location}
          </button>
        </nav>

        {/* Zone 3: Language Toggle + Primary Action */}
        <div className="flex items-center gap-3">
          {/* Language Switcher */}
          <button
            type="button"
            onClick={onToggleLang}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold text-slate-700 hover:text-teal-800 hover:bg-slate-100 transition-colors cursor-pointer"
            title={lang === 'en' ? 'التحويل إلى اللغة العربية' : 'Switch to English'}
            aria-label="Toggle language"
          >
            <Globe className="w-4 h-4 text-teal-600" />
            <span className="font-mono">{lang === 'en' ? 'العربية' : 'EN'}</span>
          </button>

          {/* Quick Call button (visible desktop) */}
          <a
            href="tel:+97317772837"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:text-teal-700 hover:bg-slate-50 transition-colors"
            title="Call Clinic"
          >
            <Phone className="w-3.5 h-3.5 text-teal-600" />
            <span className="font-mono tabular-nums">+973 1777 2837</span>
          </a>

          {/* Primary Action Button */}
          <button
            type="button"
            onClick={onBookClick}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-teal-700 to-cyan-700 hover:from-teal-800 hover:to-cyan-800 rounded-lg shadow-sm hover:shadow transition-all cursor-pointer whitespace-nowrap"
          >
            <Calendar className="w-4 h-4" />
            <span>{t.nav.bookBtn}</span>
          </button>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 shadow-lg space-y-2">
          <button
            type="button"
            onClick={() => handleNavClick('services')}
            className="block w-full text-start py-2.5 px-3 rounded-md text-sm font-medium text-slate-700 hover:bg-teal-50 hover:text-teal-800"
          >
            {t.nav.services}
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('free-offer')}
            className="block w-full text-start py-2.5 px-3 rounded-md text-sm font-medium text-teal-700 bg-teal-50/70"
          >
            {t.nav.freeConsultBadge}
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('why-us')}
            className="block w-full text-start py-2.5 px-3 rounded-md text-sm font-medium text-slate-700 hover:bg-teal-50 hover:text-teal-800"
          >
            {t.nav.whyUs}
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('reviews')}
            className="block w-full text-start py-2.5 px-3 rounded-md text-sm font-medium text-slate-700 hover:bg-teal-50 hover:text-teal-800"
          >
            {t.nav.reviews}
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('location')}
            className="block w-full text-start py-2.5 px-3 rounded-md text-sm font-medium text-slate-700 hover:bg-teal-50 hover:text-teal-800"
          >
            {t.nav.location}
          </button>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <a
              href="tel:+97317772837"
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg border border-slate-200 text-sm font-medium text-slate-800 hover:bg-slate-50"
            >
              <Phone className="w-4 h-4 text-teal-600" />
              <span>+973 1777 2837</span>
            </a>
            <a
              href="https://wa.me/97338000228"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg border border-teal-200 bg-teal-50/60 text-sm font-medium text-teal-800"
            >
              <span>WhatsApp: +973 38000228</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
