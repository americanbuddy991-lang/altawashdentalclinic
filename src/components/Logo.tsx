import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  lang?: 'en' | 'ar';
}

export const DentalToothMark: React.FC<{ size?: number; className?: string }> = ({ size = 36, className = '' }) => {
  const gradientId = "tawash-teal-cyan-grad";
  const wireGradId = "tawash-wire-grad";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      aria-label="Al Tawash Dental Center Logo"
    >
      <defs>
        {/* Teal to Cyan Brand Gradient */}
        <linearGradient id={gradientId} x1="10%" y1="5%" x2="90%" y2="95%">
          <stop offset="0%" stopColor="#0F766E" />
          <stop offset="45%" stopColor="#0D9488" />
          <stop offset="100%" stopColor="#06B6D4" />
        </linearGradient>

        {/* Gloss highlight */}
        <linearGradient id="tawash-highlight" x1="20%" y1="0%" x2="40%" y2="60%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>

        {/* Archwire Silver/Cyan Gradient */}
        <linearGradient id={wireGradId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#E2E8F0" />
          <stop offset="50%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#E2E8F0" />
        </linearGradient>

        {/* Soft shadow for depth */}
        <filter id="subtle-shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#0F766E" floodOpacity="0.18" />
        </filter>
      </defs>

      {/* Main Tooth Silhouette */}
      <path
        d="M50 8C32 8 20 18 19 32C18 43 23 52 26 62C29 72 28 89 36 91C42 92 44 81 48 71C49 68 51 68 52 71C56 81 58 92 64 91C72 89 71 72 74 62C77 52 82 43 81 32C80 18 68 8 50 8Z"
        fill={`url(#${gradientId})`}
        filter="url(#subtle-shadow)"
      />

      {/* Gloss reflection on upper-left crown */}
      <path
        d="M50 12C36 12 25 20 24 32C23.5 39 27 46 29 53C31 43 36 22 50 19C57 17.5 67 20 72 26C68 18 60 12 50 12Z"
        fill="url(#tawash-highlight)"
      />

      {/* Orthodontic Braces Archwire */}
      <path
        d="M22 43 Q 50 49 78 43"
        stroke={`url(#${wireGradId})`}
        strokeWidth="2.8"
        strokeLinecap="round"
      />

      {/* Orthodontic Bracket 1 (Left) */}
      <rect
        x="30"
        y="41"
        width="6.5"
        height="7"
        rx="1.5"
        fill="#FFFFFF"
        stroke="#0F766E"
        strokeWidth="0.8"
      />
      <line x1="33.2" y1="41" x2="33.2" y2="48" stroke="#0D9488" strokeWidth="0.8" />

      {/* Orthodontic Bracket 2 (Center Left) */}
      <rect
        x="42"
        y="42.5"
        width="6.5"
        height="7"
        rx="1.5"
        fill="#FFFFFF"
        stroke="#0F766E"
        strokeWidth="0.8"
      />
      <line x1="45.2" y1="42.5" x2="45.2" y2="49.5" stroke="#0D9488" strokeWidth="0.8" />

      {/* Orthodontic Bracket 3 (Center Right) */}
      <rect
        x="51.5"
        y="42.5"
        width="6.5"
        height="7"
        rx="1.5"
        fill="#FFFFFF"
        stroke="#0F766E"
        strokeWidth="0.8"
      />
      <line x1="54.7" y1="42.5" x2="54.7" y2="49.5" stroke="#0D9488" strokeWidth="0.8" />

      {/* Orthodontic Bracket 4 (Right) */}
      <rect
        x="63.5"
        y="41"
        width="6.5"
        height="7"
        rx="1.5"
        fill="#FFFFFF"
        stroke="#0F766E"
        strokeWidth="0.8"
      />
      <line x1="66.7" y1="41" x2="66.7" y2="48" stroke="#0D9488" strokeWidth="0.8" />
    </svg>
  );
};

export const Logo: React.FC<LogoProps> = ({ size = 38, showText = true, lang = 'en', className = '' }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <DentalToothMark size={size} />
      {showText && (
        <div className="flex flex-col">
          <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900 leading-tight">
            {lang === 'ar' ? 'مركز الطواش لطب الأسنان' : 'Al Tawash Dental Center'}
          </span>
          <span className="text-[11px] text-teal-700 font-medium tracking-wide">
            {lang === 'ar' ? 'طب عام وتـقويـم الأسنان · الرفاع' : 'Dentistry & Orthodontics · Riffa'}
          </span>
        </div>
      )}
    </div>
  );
};
