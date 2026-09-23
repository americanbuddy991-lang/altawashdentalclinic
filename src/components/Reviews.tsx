import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { Star, ShieldCheck } from 'lucide-react';

interface ReviewsProps {
  lang: Language;
}

export const Reviews: React.FC<ReviewsProps> = ({ lang }) => {
  const t = translations[lang];

  return (
    <section id="reviews" className="py-16 sm:py-20 bg-[#F8FAF9] border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Real Rating Anchor */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 tracking-wider uppercase mb-2">
              <span>{lang === 'ar' ? 'تجارب المراجعين' : 'Google Reviews Proof'}</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span>{lang === 'ar' ? 'ملاحظات حقيقية' : 'Authentic Feedback'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
              {t.reviews.sectionTitle}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              {t.reviews.ratingNote}
            </p>
          </div>

          {/* Rating Summary Box */}
          <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-sm flex items-center gap-4 self-start md:self-auto shrink-0">
            <div className="text-center">
              <span className="text-3xl font-extrabold text-slate-900 font-mono">4.5</span>
              <div className="flex text-amber-500 text-xs">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>
            <div className="text-xs text-slate-500 border-s border-slate-200 ps-3">
              <div className="font-semibold text-slate-800">43 Google Reviews</div>
              <div>{lang === 'ar' ? 'الرفاع، مملكة البحرين' : 'Bukowarah, Riffa'}</div>
            </div>
          </div>
        </div>

        {/* 3 Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.reviews.items.map((review, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Header with Google Verified pill and Stars */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    <ShieldCheck className="w-3 h-3" />
                    {lang === 'ar' ? 'تقييم جوجل معتمد' : 'Verified Review'}
                  </span>
                </div>

                {/* Treatment category tag (clean text, no heavy pill) */}
                <div className="text-xs font-semibold text-teal-800">
                  {review.treatment}
                </div>

                {/* Review Text */}
                <p className="text-sm text-slate-700 leading-relaxed italic">
                  "{review.text}"
                </p>
              </div>

              {/* Author and Date footer */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="font-bold text-slate-800 not-italic">{review.author}</span>
                <span>{review.date}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
