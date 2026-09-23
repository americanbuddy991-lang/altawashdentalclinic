import React from 'react';
import { Logo } from './Logo';
import { Language } from '../types';
import { translations } from '../data/translations';
import { Phone, MapPin, Instagram, Mail, Calendar } from 'lucide-react';

interface FooterProps {
  lang: Language;
  onBookClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onBookClick }) => {
  const t = translations[lang];

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-24 sm:pb-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1: Brand & Identity */}
          <div className="space-y-4 lg:col-span-1">
            <div className="bg-white/10 p-2 rounded-xl inline-block">
              <Logo size={34} showText={false} />
            </div>
            <h3 className="text-white font-bold text-lg">
              {lang === 'ar' ? 'مركز الطواش لطب الأسنان' : 'Al Tawash Dental Center'}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t.footer.aboutText}
            </p>
            <div className="pt-1">
              <a
                href="https://www.instagram.com/altawashdental.bh"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-pink-500/10 text-pink-400 hover:bg-pink-500/20 text-xs font-semibold transition-colors"
              >
                <Instagram className="w-4 h-4 text-pink-400" />
                <span>@altawashdental.bh</span>
              </a>
            </div>
          </div>

          {/* Col 2: Services Quick Access */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wide">
              {lang === 'ar' ? 'الخدمات السريرية' : 'Dental Services'}
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a href="#services" className="hover:text-teal-400 transition-colors">
                  {t.services.general.title}
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-teal-400 transition-colors">
                  {t.services.ortho.title}
                </a>
              </li>
              <li>
                <a href="#free-offer" className="hover:text-teal-400 transition-colors text-teal-400 font-medium">
                  {t.services.consultation.title} (0 BD)
                </a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-teal-400 transition-colors">
                  {lang === 'ar' ? 'معايير النظافة والخصوصية' : 'Sterilization & Private Rooms'}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & NAP Consistency */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wide">
              {t.footer.contactHeading}
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>Office 12, 1st Floor, Mashtan Ave, Bukowarah, Riffa, Bahrain</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <a href="tel:+97317772837" className="hover:text-white font-mono tabular-nums">
                  +973 1777 2837
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <a href="tel:+97338000228" className="hover:text-white font-mono tabular-nums">
                  +973 38000228 (WhatsApp)
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Appointment CTA */}
          <div className="space-y-3 bg-slate-800/60 p-5 rounded-2xl border border-slate-700/60">
            <h4 className="text-white font-bold text-sm">
              {lang === 'ar' ? 'حجز موعد فوري' : 'Need an Appointment?'}
            </h4>
            <p className="text-xs text-slate-400">
              {lang === 'ar' ? 'احجز استشارتك المجانية اليوم مباشرة بدون تأخير.' : 'Book your free initial consultation slot today with instant confirmation.'}
            </p>
            <button
              type="button"
              onClick={onBookClick}
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>{t.nav.bookBtn}</span>
            </button>
          </div>

        </div>

        {/* Bottom Legal bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>{t.footer.copyright}</div>
          <div className="flex items-center gap-4">
            <span>{t.footer.allRights}</span>
            <span>·</span>
            <span>4.5★ (43 Google Reviews)</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
