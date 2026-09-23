import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { Calendar, Phone } from 'lucide-react';

interface MobileStickyCTAProps {
  lang: Language;
  onBookClick: () => void;
}

export const MobileStickyCTA: React.FC<MobileStickyCTAProps> = ({ lang, onBookClick }) => {
  const t = translations[lang];
  const [isVisible, setIsVisible] = useState(true);

  // Hide sticky CTA when user is already viewing the booking widget or near footer
  useEffect(() => {
    const handleScroll = () => {
      const bookingEl = document.getElementById('booking-widget');
      if (bookingEl) {
        const rect = bookingEl.getBoundingClientRect();
        // If booking element is in view (between -200 and window.innerHeight + 200)
        if (rect.top <= window.innerHeight * 0.8 && rect.bottom >= window.innerHeight * 0.2) {
          setIsVisible(false);
          return;
        }
      }
      setIsVisible(true);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-30 p-2.5 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-xl transition-transform duration-200">
      <div className="max-w-md mx-auto flex items-center justify-between gap-2.5">
        
        {/* Quick Phone Call Button */}
        <a
          href="tel:+97317772837"
          className="flex items-center justify-center p-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 hover:bg-slate-100 transition-colors shrink-0"
          aria-label="Call Al Tawash Dental Center"
        >
          <Phone className="w-4 h-4 text-teal-700" />
        </a>

        {/* Primary Booking CTA (thumb-sized >= 44px) */}
        <button
          type="button"
          onClick={onBookClick}
          className="flex-1 flex items-center justify-between px-4 py-3 rounded-xl bg-gradient-to-r from-teal-800 to-cyan-800 text-white shadow-md active:scale-98 transition-all cursor-pointer"
        >
          <div className="flex flex-col text-start">
            <span className="text-xs font-bold leading-tight">
              {t.stickyMobile.bookNow}
            </span>
            <span className="text-[10px] text-teal-100 font-mono">
              {t.stickyMobile.title}
            </span>
          </div>
          <Calendar className="w-4 h-4 text-teal-100 shrink-0" />
        </button>

      </div>
    </div>
  );
};
