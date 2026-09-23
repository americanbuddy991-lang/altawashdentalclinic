import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { Calendar, Phone, Sparkles, MapPin, CheckCircle2, Clock } from 'lucide-react';
import heroClinicImg from '../assets/images/hero_clinic_dentist_1790166971925.jpg';

interface HeroProps {
  lang: Language;
  onBookClick: (preselectedService?: string, timeSlot?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ lang, onBookClick }) => {
  const t = translations[lang];
  const [imgSrc, setImgSrc] = useState<string>(heroClinicImg || '/images/hero-clinic.jpg');

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 bg-gradient-to-b from-teal-50/40 via-[#F8FAF9] to-[#F8FAF9]">
      {/* Background ambient accents */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-96 h-96 bg-cyan-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 -translate-x-1/4 w-80 h-80 bg-teal-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Trust-focused Copy & Booking Catalyst (7 cols on lg) */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            
            {/* Trust location kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 tracking-wide">
              <MapPin className="w-3.5 h-3.5 text-teal-600 shrink-0" />
              <span>{t.hero.locationBadge}</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="text-slate-600">Office 12, Mashtan Ave</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 leading-[1.15] text-balance">
              <span>{t.hero.headlineStart} </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-700 via-teal-600 to-cyan-600">
                {t.hero.headlineAccent}
              </span>
              <span className="block mt-1 sm:mt-2 text-slate-800 font-semibold">{t.hero.headlineEnd}</span>
            </h1>

            {/* Subhead naming General Dentistry & Orthodontics */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
              {t.hero.subhead}
            </p>

            {/* THE DELIBERATE BOLD MOMENT: Live Next Available Appointment Indicator */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-teal-200/90 shadow-sm hover:border-teal-300 transition-all">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    {/* Pulsing indicator */}
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 font-mono">
                      {t.hero.nextAvailablePrefix}
                    </span>
                  </div>

                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-extrabold text-teal-900 tracking-tight font-mono tabular-nums">
                      {t.hero.nextAvailableTime}
                    </span>
                    <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      {lang === 'ar' ? 'متاح اليوم' : 'Open Today'}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span>{t.hero.nextAvailableSub}</span>
                  </p>
                </div>

                {/* Instant Reserve Button for this exact slot */}
                <button
                  type="button"
                  onClick={() => onBookClick(undefined, '3:30 PM')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 text-xs sm:text-sm font-bold text-white bg-teal-800 hover:bg-teal-900 active:bg-teal-950 rounded-xl transition-colors shadow-sm cursor-pointer whitespace-nowrap"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{lang === 'ar' ? 'حجز موعد ٣:٣٠ م' : 'Reserve 3:30 PM Slot'}</span>
                </button>
              </div>
            </div>

            {/* CTAs Row */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
              <button
                type="button"
                onClick={() => onBookClick()}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-teal-700 to-cyan-700 hover:from-teal-800 hover:to-cyan-800 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>{t.hero.bookCta}</span>
              </button>

              <a
                href="tel:+97317772837"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm sm:text-base font-semibold text-slate-700 hover:text-teal-800 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl transition-colors"
              >
                <Phone className="w-4 h-4 text-teal-600" />
                <span className="font-mono tabular-nums">{t.hero.callCta}</span>
              </a>
            </div>

            {/* Visible Trust Stats & Social Proof */}
            <div className="pt-4 border-t border-slate-200/80 flex flex-wrap items-center gap-y-3 gap-x-6 text-xs sm:text-sm text-slate-600">
              {/* Google Reviews */}
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 text-sm">{t.hero.ratingScore}</span>
                <span className="text-amber-500 tracking-tighter" aria-label="4.5 stars">★★★★★</span>
                <span className="font-medium text-slate-700">({t.hero.reviewsCount})</span>
              </div>

              <span aria-hidden="true" className="hidden sm:inline text-slate-300">·</span>

              {/* Free Consultation Highlight (Instagram offer) */}
              <div
                onClick={() => onBookClick('consultation')}
                className="flex items-center gap-1.5 text-teal-800 font-semibold cursor-pointer hover:underline"
              >
                <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                <span>{t.hero.freeConsultTitle}</span>
              </div>

              <span aria-hidden="true" className="hidden md:inline text-slate-300">·</span>

              {/* Private suites marker */}
              <div className="flex items-center gap-1 text-slate-500">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>{lang === 'ar' ? 'غرف علاج خاصة ومعقمة' : 'Private sanitized suites'}</span>
              </div>
            </div>

          </div>

          {/* Right Column: Authentic Clinic Photography (5 cols on lg) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200/90 bg-slate-100 aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/5]">
              <img
                src={imgSrc}
                alt="Al Tawash Dental Center dentist and modern operatory in Riffa Bahrain"
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
                loading="eager"
                onError={() => {
                  if (imgSrc !== '/images/hero-clinic.jpg') {
                    setImgSrc('/images/hero-clinic.jpg');
                  } else {
                    setImgSrc('https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1200&auto=format&fit=crop');
                  }
                }}
              />
              
              {/* Clean gradient scrim for legible text overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/15 to-transparent pointer-events-none" />

              {/* Real location sticker tag */}
              <div className="absolute top-4 left-4 right-4 flex justify-between items-start pointer-events-none">
                <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-200/80 text-[11px] font-semibold text-slate-800 shadow-sm">
                  {lang === 'ar' ? 'عيادة بوكوارة المعتمدة' : 'Bukowarah Center · Riffa'}
                </div>
                <div className="bg-teal-900/90 text-white backdrop-blur-md px-3 py-1.5 rounded-lg text-[11px] font-bold shadow-sm">
                  {lang === 'ar' ? 'عرض الاستشارة المجانية' : 'Free Consultation Active'}
                </div>
              </div>

              {/* Bottom Card Annotation */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-sm font-bold tracking-tight">
                  {lang === 'ar' ? 'مركز الطواش لطب الأسنان' : 'Al Tawash Dental Center'}
                </p>
                <p className="text-xs text-slate-200 mt-0.5">
                  {lang === 'ar' ? 'أحدث التقنيات وأجواء مريحة تراعي خصوصيتك' : 'Advanced care in a tranquil, patient-centered atmosphere'}
                </p>
              </div>
            </div>

            {/* Subtle float badge beneath image */}
            <div className="mt-3 flex items-center justify-between text-xs text-slate-500 px-2">
              <span>{lang === 'ar' ? 'شارع مشتان، مجمع بوكوارة، مبنى ١٢' : 'Mashtan Ave, Bukowarah, Office 12'}</span>
              <span className="font-mono tabular-nums text-teal-800 font-medium">+973 1777 2837</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
