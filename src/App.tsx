import React, { useState, useEffect } from 'react';
import { Language } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FreeConsultationBanner } from './components/FreeConsultationBanner';
import { Services } from './components/Services';
import { WhyUs } from './components/WhyUs';
import { Reviews } from './components/Reviews';
import { BookingSystem } from './components/BookingSystem';
import { LocationHours } from './components/LocationHours';
import { Footer } from './components/Footer';
import { MobileStickyCTA } from './components/MobileStickyCTA';

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [preselectedService, setPreselectedService] = useState<string>('consultation');
  const [preselectedTimeSlot, setPreselectedTimeSlot] = useState<string>('3:30 PM');

  // Sync html dir and lang attribute
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  const scrollToBooking = (serviceId?: string, timeSlot?: string) => {
    if (serviceId) setPreselectedService(serviceId);
    if (timeSlot) setPreselectedTimeSlot(timeSlot);

    const bookingEl = document.getElementById('booking-widget');
    if (bookingEl) {
      bookingEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans bg-[#F8FAF9] text-slate-900 ${lang === 'ar' ? 'font-arabic' : ''}`}>
      {/* 1. Header Navigation Bar (One-row, 3-zone contract) */}
      <Navbar
        lang={lang}
        onToggleLang={toggleLanguage}
        onBookClick={() => scrollToBooking()}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        {/* 2. Hero with Live 3:30 PM Availability Indicator & Trust Stats */}
        <Hero
          lang={lang}
          onBookClick={(service, slot) => scrollToBooking(service, slot)}
        />

        {/* 3. Featured Real Offer: Free Consultation Today (Instagram promotion) */}
        <FreeConsultationBanner
          lang={lang}
          onClaim={() => scrollToBooking('consultation')}
        />

        {/* 4. Services: General Dentistry, Orthodontics, Free Consultation */}
        <Services
          lang={lang}
          onSelectService={(serviceId) => scrollToBooking(serviceId)}
        />

        {/* 5. Why Al Tawash: On-Time Appointments, Private Rooms, Experienced Team, Riffa Central */}
        <WhyUs lang={lang} />

        {/* 6. Patient Reviews: Real-style 4.5★ proof (43 Google reviews) */}
        <Reviews lang={lang} />

        {/* 7. Multi-step Functional Booking Engine (Service, Calendar/Time Slot, Patient Info, Confirmation) */}
        <BookingSystem
          lang={lang}
          preselectedService={preselectedService}
          preselectedTimeSlot={preselectedTimeSlot}
        />

        {/* 8. Location & Hours: Riffa Google Map Embed, Mashtan Ave, Phone & WhatsApp */}
        <LocationHours lang={lang} />
      </main>

      {/* 9. Footer: Comprehensive NAP, Instagram (@altawashdental.bh), Bilingual Links */}
      <Footer
        lang={lang}
        onBookClick={() => scrollToBooking()}
      />

      {/* 10. Mobile Sticky Booking CTA (Max 15% mobile viewport cap) */}
      <MobileStickyCTA
        lang={lang}
        onBookClick={() => scrollToBooking()}
      />
    </div>
  );
}
