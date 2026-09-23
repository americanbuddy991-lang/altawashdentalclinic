import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { MapPin, Phone, Clock, Navigation, MessageSquare, ExternalLink } from 'lucide-react';

interface LocationHoursProps {
  lang: Language;
}

export const LocationHours: React.FC<LocationHoursProps> = ({ lang }) => {
  const t = translations[lang];

  return (
    <section id="location" className="py-16 sm:py-20 bg-[#F8FAF9] border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 tracking-wider uppercase mb-2">
            <span>{lang === 'ar' ? 'العيادة وساعات الدوام' : 'Visit Al Tawash'}</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>{lang === 'ar' ? 'بوكوارة، الرفاع' : 'Bukowarah, Riffa'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            {t.location.sectionTitle}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            {t.location.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Contact Information Cards (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            
            {/* Address Box */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-teal-800 uppercase tracking-wide">
                <MapPin className="w-4 h-4 text-teal-600" />
                <span>{t.location.addressTitle}</span>
              </div>
              <p className="text-sm font-semibold text-slate-900 leading-snug">
                {t.location.addressText}
              </p>
              <p className="text-xs text-slate-500 pt-1">
                {lang === 'ar'
                  ? 'بجانب المراكز التجارية والخدمية، تتوفر مواقف مجانية ومصعد مريح للطابق الأول.'
                  : 'Located on Mashtan Avenue with convenient ground parking and elevator access to the First Floor.'}
              </p>
            </div>

            {/* Hours Box */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-teal-800 uppercase tracking-wide">
                <Clock className="w-4 h-4 text-teal-600" />
                <span>{t.location.hoursTitle}</span>
              </div>
              
              <div className="space-y-2 text-xs divide-y divide-slate-100">
                <div className="flex items-center justify-between pt-1">
                  <span className="font-semibold text-slate-800">{t.location.satThu}</span>
                  <span className="text-slate-600 font-mono text-end">{t.location.satThuHours}</span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="font-semibold text-slate-800">{t.location.fri}</span>
                  <span className="text-amber-700 font-medium">{t.location.friHours}</span>
                </div>
              </div>
            </div>

            {/* Direct Phone & WhatsApp Actions */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-teal-800 uppercase tracking-wide">
                <Phone className="w-4 h-4 text-teal-600" />
                <span>{t.location.phoneTitle}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                <a
                  href="tel:+97317772837"
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 hover:bg-slate-50 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-teal-600" />
                  <span className="font-mono tabular-nums">+973 1777 2837</span>
                </a>

                <a
                  href="https://wa.me/97338000228"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-emerald-300 bg-emerald-50/70 text-xs font-bold text-emerald-900 hover:bg-emerald-100 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-700" />
                  <span className="font-mono tabular-nums">+973 38000228</span>
                </a>
              </div>

              <a
                href="https://maps.google.com/?q=Mashtan+Ave+Bukowarah+Riffa+Bahrain"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold text-teal-800 bg-teal-50 hover:bg-teal-100 rounded-xl transition-colors cursor-pointer"
              >
                <Navigation className="w-3.5 h-3.5 text-teal-700" />
                <span>{t.location.getDirectionsBtn}</span>
                <ExternalLink className="w-3 h-3 text-teal-600" />
              </a>
            </div>

          </div>

          {/* Right Column: Google Maps Embed (7 cols) */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="relative w-full h-full min-h-[360px] lg:min-h-[460px] rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm bg-slate-100">
              <iframe
                title="Al Tawash Dental Center Location Map - Mashtan Ave, Bukowarah, Riffa"
                src="https://maps.google.com/maps?q=Mashtan+Ave+Bukowarah+Riffa+Bahrain&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                className="absolute inset-0 border-0 w-full h-full"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Floating Overlay Badge on Map */}
              <div className="absolute top-4 start-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl border border-slate-200 shadow-md pointer-events-none flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-teal-600 animate-pulse" />
                <div>
                  <div className="text-xs font-bold text-slate-900">
                    {lang === 'ar' ? 'مركز الطواش لطب الأسنان' : 'Al Tawash Dental Center'}
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono">
                    Office 12, Mashtan Ave, Riffa
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
