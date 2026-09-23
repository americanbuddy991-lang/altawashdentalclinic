import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { Sparkles, Check, ArrowRight, ShieldCheck, Instagram } from 'lucide-react';

interface FreeConsultationBannerProps {
  lang: Language;
  onClaim: () => void;
}

export const FreeConsultationBanner: React.FC<FreeConsultationBannerProps> = ({ lang, onClaim }) => {
  const t = translations[lang];

  return (
    <section id="free-offer" className="py-12 bg-white border-y border-teal-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-br from-teal-50 via-cyan-50/50 to-emerald-50/40 border border-teal-200/80 p-6 sm:p-8 lg:p-10 shadow-sm relative overflow-hidden">
          
          {/* Subtle background glow */}
          <div className="absolute -right-20 -top-20 w-72 h-72 bg-teal-200/30 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative">
            
            {/* Left Column: Offer Details (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold text-teal-800 bg-teal-100/90 tracking-wide uppercase">
                  <Sparkles className="w-3.5 h-3.5 text-teal-700" />
                  {t.offer.tag}
                </span>
                <span className="text-xs font-semibold text-slate-500">
                  {lang === 'ar' ? 'ساري لجميع المراجعين الجدد' : 'Valid for all new & returning patients'}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                {t.offer.heading}
              </h2>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed max-w-2xl">
                {t.offer.subheading}
              </p>

              {/* Three explicit bullets */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                  <Check className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span>{t.offer.bullet1}</span>
                </div>
                <div className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                  <Check className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span>{t.offer.bullet2}</span>
                </div>
                <div className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                  <Check className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span>{t.offer.bullet3}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Instant Claim Card (4 cols) */}
            <div className="lg:col-span-4 flex flex-col items-stretch justify-center bg-white/95 backdrop-blur-sm p-5 sm:p-6 rounded-xl border border-teal-200/90 shadow-sm space-y-4">
              <div className="text-center">
                <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                  {lang === 'ar' ? 'تكلفة الكشفية' : 'Consultation Fee'}
                </span>
                <div className="flex items-baseline justify-center gap-2 mt-0.5">
                  <span className="text-3xl font-extrabold text-teal-800 font-mono">0.00 BD</span>
                  <span className="text-xs line-through text-slate-400">15.00 BD</span>
                </div>
                <p className="text-xs text-emerald-700 font-medium mt-1">
                  {lang === 'ar' ? 'مشمول بالكامل اليوم' : '100% Complimentary'}
                </p>
              </div>

              <button
                type="button"
                onClick={onClaim}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-bold text-white bg-teal-800 hover:bg-teal-900 active:bg-teal-950 rounded-xl transition-all shadow-sm cursor-pointer"
              >
                <span>{t.offer.claimBtn}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </button>

              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                  {lang === 'ar' ? 'بدون التزام بالعلاج' : 'No obligation'}
                </span>
                <a
                  href="https://www.instagram.com/altawashdental.bh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-slate-600 hover:text-teal-700 font-medium"
                >
                  <Instagram className="w-3 h-3 text-pink-600" />
                  <span>@altawashdental.bh</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
