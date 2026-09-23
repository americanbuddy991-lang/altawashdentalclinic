import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { Check, Calendar } from 'lucide-react';

interface ServicesProps {
  lang: Language;
  onSelectService: (serviceId: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ lang, onSelectService }) => {
  const t = translations[lang];

  const serviceCards = [
    {
      id: 'general-dentistry',
      title: t.services.general.title,
      category: t.services.general.category,
      desc: t.services.general.desc,
      features: t.services.general.features,
      image: '/src/assets/images/service_general_dentistry_1790167097908.jpg',
      alt: 'General dentistry operatory with dental examination light and digital radiography screen',
      badge: lang === 'ar' ? 'عناية وقائية وترميمية' : 'Preventive & Restorative',
    },
    {
      id: 'orthodontics',
      title: t.services.ortho.title,
      category: t.services.ortho.category,
      desc: t.services.ortho.desc,
      features: t.services.ortho.features,
      image: '/src/assets/images/service_orthodontics_1790167086088.jpg',
      alt: 'Precision clear aligners and orthodontic braces appliances on medical steel tray',
      badge: lang === 'ar' ? 'تقويم شفاف ومعدني' : 'Clear Aligners & Braces',
    },
    {
      id: 'consultation',
      title: t.services.consultation.title,
      category: t.services.consultation.category,
      desc: t.services.consultation.desc,
      features: t.services.consultation.features,
      image: '/src/assets/images/clinic_reception_interior_1790167109971.jpg',
      alt: 'Al Tawash Dental Center calm reception lounge and patient consultation area in Riffa',
      badge: lang === 'ar' ? 'عرض مجاني نشط' : 'Current Active Offer',
    },
  ];

  return (
    <section id="services" className="py-16 sm:py-20 bg-[#F8FAF9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 tracking-wider uppercase mb-2">
            <span>{lang === 'ar' ? 'الخدمات العلاجية' : 'Clinical Practice'}</span>
            <span aria-hidden="true" className="text-slate-300">/</span>
            <span>{lang === 'ar' ? 'الرفاع، البحرين' : 'Riffa, Bahrain'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight text-balance">
            {t.services.sectionTitle}
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            {t.services.subtitle}
          </p>
        </div>

        {/* 3 Structured Service Cards with Photography */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {serviceCards.map((service) => (
            <div
              key={service.id}
              className="group bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md hover:border-teal-200 transition-all flex flex-col overflow-hidden"
            >
              {/* Card Image Slot */}
              <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.alt}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                
                {/* Badge on Image */}
                <div className="absolute top-3 start-3">
                  <span className="inline-block bg-white/95 backdrop-blur-sm text-slate-800 text-[11px] font-semibold px-2.5 py-1 rounded-md shadow-sm">
                    {service.badge}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="text-xs font-semibold text-teal-700">
                    {service.category}
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                    {service.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {service.desc}
                  </p>

                  {/* Bullet list of procedures */}
                  <ul className="pt-2 space-y-2 border-t border-slate-100">
                    {service.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Action */}
                <div className="pt-6 mt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => onSelectService(service.id)}
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100/90 active:bg-teal-200/90 rounded-xl transition-colors cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5 text-teal-700" />
                    <span>{t.services.bookService}: {service.title}</span>
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
