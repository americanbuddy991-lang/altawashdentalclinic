import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { Clock, ShieldCheck, UserCheck, MapPin } from 'lucide-react';

interface WhyUsProps {
  lang: Language;
}

export const WhyUs: React.FC<WhyUsProps> = ({ lang }) => {
  const t = translations[lang];

  const pillarIcons = [
    Clock,
    ShieldCheck,
    UserCheck,
    MapPin,
  ];

  return (
    <section id="why-us" className="py-16 sm:py-20 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 tracking-wider uppercase mb-2">
            <span>{lang === 'ar' ? 'معايير الرعاية' : 'Patient Experience'}</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>{lang === 'ar' ? 'الالتزام والخصوصية' : 'Punctual & Private'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight text-balance">
            {t.whyUs.sectionTitle}
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            {t.whyUs.subtitle}
          </p>
        </div>

        {/* 4 Clean Pillars (2x2 grid on desktop, 1 col on mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.whyUs.pillars.map((pillar, index) => {
            const IconComponent = pillarIcons[index] || ShieldCheck;
            return (
              <div
                key={index}
                className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:bg-white hover:shadow-sm hover:border-teal-200 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-100/80 flex items-center justify-center text-teal-800">
                    <IconComponent className="w-5 h-5 text-teal-700" />
                  </div>
                  
                  <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                    {pillar.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                <div className="pt-4 mt-2 border-t border-slate-200/60 text-[11px] font-semibold text-teal-800">
                  {lang === 'ar' ? 'معيار أساسي بالمركز' : 'Guaranteed Standard'}
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick verifiable clinic fact strip */}
        <div className="mt-10 p-4 rounded-xl bg-teal-50/60 border border-teal-200/70 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-700">
          <div className="flex items-center gap-2">
            <span className="font-bold text-teal-900">
              {lang === 'ar' ? 'ساعات العمل الرسمية:' : 'Standard Clinic Operating Hours:'}
            </span>
            <span>
              {lang === 'ar' ? 'السبت إلى الخميس: ٩:٠٠ ص – ١:٠٠ م & ٤:٠٠ م – ٩:٠٠ م' : 'Sat – Thu: 9:00 AM – 1:00 PM & 4:00 PM – 9:00 PM'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-500">
              {lang === 'ar' ? 'خدمة الحالات الطارئة:' : 'Emergency On-Call:'}
            </span>
            <a href="tel:+97338000228" className="font-mono font-semibold text-teal-800 hover:underline">
              +973 38000228
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
