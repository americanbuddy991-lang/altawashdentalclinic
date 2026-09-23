import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { Check, Calendar, Clock, User, Phone, FileText, CheckCircle2, ChevronRight, ChevronLeft, MapPin, Sparkles, MessageSquare } from 'lucide-react';

interface BookingSystemProps {
  lang: Language;
  preselectedService?: string;
  preselectedTimeSlot?: string;
}

export const BookingSystem: React.FC<BookingSystemProps> = ({
  lang,
  preselectedService,
  preselectedTimeSlot,
}) => {
  const t = translations[lang];

  // Steps: 1 = Service, 2 = Date & Slot, 3 = Patient Details, 4 = Confirmation
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form State
  const [serviceId, setServiceId] = useState<string>(preselectedService || 'consultation');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedSlot, setSelectedSlot] = useState<string>(preselectedTimeSlot || '3:30 PM');
  const [patientName, setPatientName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [isFirstVisit, setIsFirstVisit] = useState<boolean>(true);
  const [commLanguage, setCommLanguage] = useState<'en' | 'ar'>(lang);
  const [bookingRef, setBookingRef] = useState<string>('');

  // Validation errors
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // When preselectedService or preselectedTimeSlot changes
  useEffect(() => {
    if (preselectedService) {
      setServiceId(preselectedService);
      setCurrentStep(2);
    }
  }, [preselectedService]);

  useEffect(() => {
    if (preselectedTimeSlot) {
      setSelectedSlot(preselectedTimeSlot);
    }
  }, [preselectedTimeSlot]);

  // Generate dynamic upcoming dates (next 7 days, excluding Fridays or marking on-call)
  const availableDates = React.useMemo(() => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 8; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const dayOfWeek = d.getDay(); // 0 is Sunday, 5 is Friday
      const isFriday = dayOfWeek === 5;
      
      const enDayName = i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : d.toLocaleDateString('en-US', { weekday: 'short' });
      const arDayName = i === 0 ? 'اليوم' : i === 1 ? 'غداً' : d.toLocaleDateString('ar-BH', { weekday: 'short' });
      const dateFormatted = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      const isoString = d.toISOString().split('T')[0];

      dates.push({
        iso: isoString,
        dayName: lang === 'ar' ? arDayName : enDayName,
        dateFormatted,
        isFriday,
      });
    }
    return dates;
  }, [lang]);

  // Default selected date to today
  useEffect(() => {
    if (!selectedDate && availableDates.length > 0) {
      setSelectedDate(availableDates[0].iso);
    }
  }, [availableDates, selectedDate]);

  // Morning and Evening Slots
  const morningSlots = ['9:00 AM', '9:45 AM', '10:30 AM', '11:15 AM', '12:00 PM'];
  const eveningSlots = ['3:30 PM', '4:15 PM', '5:00 PM', '5:45 PM', '6:30 PM', '7:15 PM', '8:00 PM', '8:30 PM'];

  // Services definitions
  const servicesList = [
    {
      id: 'consultation',
      title: t.services.consultation.title,
      category: t.services.consultation.category,
      desc: t.services.consultation.desc,
      cost: '0.00 BD (Complimentary)',
      isPromo: true,
    },
    {
      id: 'general-dentistry',
      title: t.services.general.title,
      category: t.services.general.category,
      desc: t.services.general.desc,
      cost: lang === 'ar' ? 'رسوم علاجية ميسرة' : 'Affordable clinical fee',
      isPromo: false,
    },
    {
      id: 'orthodontics',
      title: t.services.ortho.title,
      category: t.services.ortho.category,
      desc: t.services.ortho.desc,
      cost: lang === 'ar' ? 'تقسيط مريح متاح' : 'Flexible installment plans',
      isPromo: false,
    },
  ];

  // Validate Step 3
  const handleValidateAndSubmit = () => {
    const errs: { [key: string]: string } = {};

    if (!patientName.trim()) {
      errs.name = t.booking.validation.nameRequired;
    }

    const cleanPhone = phone.replace(/[^0-9]/g, '');
    if (!cleanPhone || cleanPhone.length < 8) {
      errs.phone = t.booking.validation.phoneRequired;
    }

    if (!selectedSlot) {
      errs.slot = t.booking.validation.slotRequired;
    }

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    // Generate reference number
    const randomCode = `ATD-${Math.floor(10000 + Math.random() * 90000)}`;
    setBookingRef(randomCode);
    setCurrentStep(4);
  };

  // Get current service object
  const selectedServiceObj = servicesList.find((s) => s.id === serviceId) || servicesList[0];

  // Helper to generate WhatsApp link
  const getWhatsAppBookingLink = () => {
    const text = lang === 'ar'
      ? `مرحباً مركز الطواش لطب الأسنان، أود تأكيد موعدي الطبي:\n- رقم المرجع: ${bookingRef}\n- المريض: ${patientName}\n- الخدمة: ${selectedServiceObj.title}\n- الموعد: ${selectedDate} في تمام ${selectedSlot}\n- هاتف: ${phone}\n- ملاحظات: ${notes || 'لا يوجد'}`
      : `Hello Al Tawash Dental Center, I would like to confirm my appointment:\n- Ref: ${bookingRef}\n- Patient: ${patientName}\n- Service: ${selectedServiceObj.title}\n- Date: ${selectedDate} at ${selectedSlot}\n- Phone: ${phone}\n- Notes: ${notes || 'None'}`;
    return `https://wa.me/97338000228?text=${encodeURIComponent(text)}`;
  };

  // Download .ics calendar file
  const handleAddToCalendar = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Al Tawash Dental Center//Appointments//EN
BEGIN:VEVENT
SUMMARY:Dental Visit - Al Tawash Dental Center (${selectedServiceObj.title})
DESCRIPTION:Appointment Ref: ${bookingRef}\\nService: ${selectedServiceObj.title}\\nLocation: Office 12, First Floor, Mashtan Ave, Bukowarah, Riffa\\nPhone: +973 1777 2837
LOCATION:Office 12, First Floor, Mashtan Ave, Bukowarah, Riffa, Bahrain
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `altawash-appointment-${bookingRef}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="booking-widget" className="py-16 sm:py-24 bg-white border-t border-slate-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-teal-800 tracking-wider uppercase mb-2">
            <span>{lang === 'ar' ? 'حجز موعد فوري' : 'Direct Booking'}</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>{lang === 'ar' ? 'تأكيد مباشر' : 'Instant Confirmation'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            {t.booking.sectionTitle}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            {t.booking.subtitle}
          </p>
        </div>

        {/* Step Progression Bar */}
        <div className="mb-8">
          <div className="grid grid-cols-4 gap-2 text-center text-xs font-semibold">
            {[1, 2, 3, 4].map((step) => {
              const isActive = currentStep === step;
              const isCompleted = currentStep > step;
              const stepLabels = [
                lang === 'ar' ? 'الخدمة' : 'Service',
                lang === 'ar' ? 'الوقت' : 'Date & Time',
                lang === 'ar' ? 'البيانات' : 'Details',
                lang === 'ar' ? 'التأكيد' : 'Confirm',
              ];

              return (
                <div key={step} className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      isCompleted
                        ? 'bg-teal-700 text-white'
                        : isActive
                        ? 'bg-teal-900 text-white ring-4 ring-teal-100'
                        : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    {isCompleted ? <Check className="w-4 h-4" /> : step}
                  </div>
                  <span className={`mt-1.5 hidden sm:block ${isActive ? 'text-teal-900 font-bold' : 'text-slate-500'}`}>
                    {stepLabels[step - 1]}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="mt-3 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-teal-700 to-cyan-600 transition-all duration-300"
              style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Multi-Step Content Box */}
        <div className="bg-[#FAFCFB] rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-sm">
          
          {/* STEP 1: CHOOSE SERVICE */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900">
                  {t.booking.selectServicePrompt}
                </h3>
                <span className="text-xs text-slate-500 font-medium">Step 1 of 4</span>
              </div>

              <div className="space-y-3">
                {servicesList.map((service) => {
                  const isSelected = serviceId === service.id;
                  return (
                    <div
                      key={service.id}
                      onClick={() => setServiceId(service.id)}
                      className={`p-4 sm:p-5 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-4 ${
                        isSelected
                          ? 'border-teal-600 bg-white ring-2 ring-teal-500/20 shadow-sm'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-base text-slate-900">
                            {service.title}
                          </span>
                          {service.isPromo && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-teal-800 bg-teal-100 px-2 py-0.5 rounded">
                              <Sparkles className="w-3 h-3 text-teal-700" />
                              {lang === 'ar' ? 'عرض خاص مجاني' : 'Free Offer'}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500">{service.category}</p>
                        <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
                          {service.desc}
                        </p>
                      </div>

                      <div className="flex flex-col items-end shrink-0">
                        <span className={`text-xs font-bold ${service.isPromo ? 'text-teal-800' : 'text-slate-700'}`}>
                          {service.cost}
                        </span>
                        <div
                          className={`mt-2 w-5 h-5 rounded-full border flex items-center justify-center ${
                            isSelected ? 'bg-teal-700 border-teal-700 text-white' : 'border-slate-300'
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-teal-800 hover:bg-teal-900 rounded-xl transition-colors cursor-pointer"
                >
                  <span>{t.booking.btnNext}</span>
                  <ChevronRight className="w-4 h-4 rtl:rotate-180" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: DATE & TIME SLOT */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900">
                  {t.booking.selectDatePrompt}
                </h3>
                <span className="text-xs text-slate-500 font-medium">Step 2 of 4</span>
              </div>

              {/* Day Picker Slider */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {availableDates.map((item) => {
                  const isSelected = selectedDate === item.iso;
                  return (
                    <button
                      key={item.iso}
                      type="button"
                      disabled={item.isFriday}
                      onClick={() => setSelectedDate(item.iso)}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                        item.isFriday
                          ? 'bg-slate-100/70 border-slate-200 opacity-50 cursor-not-allowed'
                          : isSelected
                          ? 'bg-white border-teal-700 ring-2 ring-teal-500/20 shadow-sm text-teal-950 font-bold'
                          : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      <div className="text-xs font-semibold">{item.dayName}</div>
                      <div className="text-sm font-bold mt-0.5">{item.dateFormatted}</div>
                      {item.isFriday ? (
                        <div className="text-[10px] text-red-600 mt-1">{lang === 'ar' ? 'طوارئ فقط' : 'On-Call Only'}</div>
                      ) : (
                        <div className="text-[10px] text-emerald-700 mt-1">{lang === 'ar' ? 'متاح' : 'Available'}</div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Time Slots Selection */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-teal-700" />
                    <span>{t.booking.selectTimePrompt}</span>
                  </h4>
                  {selectedSlot && (
                    <span className="text-xs text-teal-800 font-semibold">
                      {lang === 'ar' ? 'الوقت المختار:' : 'Selected:'} {selectedSlot}
                    </span>
                  )}
                </div>

                {/* Evening Slots (Matches the Hero's 3:30 PM bold indicator) */}
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-slate-500 block">
                    {t.booking.eveningSlots}
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {eveningSlots.map((slot) => {
                      const isSelected = selectedSlot === slot;
                      const isBoldHighlight = slot === '3:30 PM';
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedSlot(slot)}
                          className={`py-2.5 px-3 rounded-lg text-xs font-mono font-medium transition-all relative ${
                            isSelected
                              ? 'bg-teal-800 text-white font-bold shadow-sm'
                              : isBoldHighlight
                              ? 'bg-teal-50 border border-teal-300 text-teal-900 hover:bg-teal-100/80'
                              : 'bg-white border border-slate-200 text-slate-800 hover:border-slate-300'
                          }`}
                        >
                          {slot}
                          {isBoldHighlight && !isSelected && (
                            <span className="block text-[9px] font-sans font-semibold text-emerald-700 mt-0.5">
                              {lang === 'ar' ? 'الأقرب اليوم' : 'Earliest Today'}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Morning Slots */}
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-semibold text-slate-500 block">
                    {t.booking.morningSlots}
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {morningSlots.map((slot) => {
                      const isSelected = selectedSlot === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedSlot(slot)}
                          className={`py-2 px-3 rounded-lg text-xs font-mono font-medium transition-all ${
                            isSelected
                              ? 'bg-teal-800 text-white font-bold shadow-sm'
                              : 'bg-white border border-slate-200 text-slate-800 hover:border-slate-300'
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {errors.slot && (
                  <p className="text-xs text-red-600 font-medium">{errors.slot}</p>
                )}
              </div>

              {/* Navigation */}
              <div className="pt-4 flex items-center justify-between border-t border-slate-200/80">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
                  <span>{t.booking.btnBack}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-teal-800 hover:bg-teal-900 rounded-xl transition-colors cursor-pointer"
                >
                  <span>{t.booking.btnNext}</span>
                  <ChevronRight className="w-4 h-4 rtl:rotate-180" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: PATIENT DETAILS */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900">
                  {t.booking.patientInfoPrompt}
                </h3>
                <span className="text-xs text-slate-500 font-medium">Step 3 of 4</span>
              </div>

              {/* Booking Summary Pill */}
              <div className="p-3 bg-teal-50/70 border border-teal-200/80 rounded-xl flex flex-wrap items-center justify-between gap-2 text-xs text-teal-900">
                <div className="flex items-center gap-2">
                  <span className="font-bold">{selectedServiceObj.title}</span>
                  <span aria-hidden="true" className="text-teal-400">·</span>
                  <span>{selectedDate} at {selectedSlot}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="text-xs font-semibold text-teal-800 underline hover:text-teal-950"
                >
                  {lang === 'ar' ? 'تغيير الموعد' : 'Change Slot'}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-teal-700" />
                    <span>{t.booking.fullNameLabel} *</span>
                  </label>
                  <input
                    type="text"
                    value={patientName}
                    onChange={(e) => {
                      setPatientName(e.target.value);
                      if (errors.name) setErrors({ ...errors, name: '' });
                    }}
                    placeholder={t.booking.fullNamePlaceholder}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
                  />
                  {errors.name && (
                    <p className="text-xs text-red-600 font-medium">{errors.name}</p>
                  )}
                </div>

                {/* Mobile Number with Bahrain Flag prefix */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-teal-700" />
                    <span>{t.booking.phoneLabel} *</span>
                  </label>
                  <div className="flex rounded-xl shadow-sm">
                    <span className="inline-flex items-center px-3 rounded-s-xl border border-e-0 border-slate-300 bg-slate-100 text-slate-600 text-xs font-mono">
                      🇧🇭 +973
                    </span>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (errors.phone) setErrors({ ...errors, phone: '' });
                      }}
                      placeholder={t.booking.phonePlaceholder}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-e-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-teal-600"
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-xs text-red-600 font-medium">{errors.phone}</p>
                  )}
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    {t.booking.emailLabel}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.booking.emailPlaceholder}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
                  />
                </div>

                {/* First Visit Choice */}
                <div className="space-y-2 sm:col-span-2 pt-1">
                  <label className="text-xs font-bold text-slate-700 block">
                    {t.booking.firstVisitQuestion}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setIsFirstVisit(true)}
                      className={`p-2.5 text-xs rounded-xl border text-start flex items-center justify-between cursor-pointer ${
                        isFirstVisit ? 'border-teal-700 bg-teal-50/50 font-bold text-teal-900' : 'border-slate-200 bg-white text-slate-700'
                      }`}
                    >
                      <span>{t.booking.yesFirstVisit}</span>
                      {isFirstVisit && <Check className="w-4 h-4 text-teal-700" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsFirstVisit(false)}
                      className={`p-2.5 text-xs rounded-xl border text-start flex items-center justify-between cursor-pointer ${
                        !isFirstVisit ? 'border-teal-700 bg-teal-50/50 font-bold text-teal-900' : 'border-slate-200 bg-white text-slate-700'
                      }`}
                    >
                      <span>{t.booking.noExistingVisit}</span>
                      {!isFirstVisit && <Check className="w-4 h-4 text-teal-700" />}
                    </button>
                  </div>
                </div>

                {/* Notes */}
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-teal-700" />
                    <span>{t.booking.notesLabel}</span>
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder={t.booking.notesPlaceholder}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
                  />
                </div>
              </div>

              {/* Navigation */}
              <div className="pt-4 flex items-center justify-between border-t border-slate-200/80">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
                  <span>{t.booking.btnBack}</span>
                </button>
                <button
                  type="button"
                  onClick={handleValidateAndSubmit}
                  className="inline-flex items-center gap-2 px-7 py-3 text-sm font-bold text-white bg-teal-800 hover:bg-teal-900 rounded-xl transition-colors cursor-pointer shadow-md"
                >
                  <span>{t.booking.btnConfirm}</span>
                  <Check className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: CONFIRMATION SCREEN */}
          {currentStep === 4 && (
            <div className="space-y-6 text-center sm:text-start">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 mx-auto sm:mx-0">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="space-y-0.5">
                  <h3 className="text-lg font-bold text-emerald-950">
                    {t.booking.bookingSuccessTitle}
                  </h3>
                  <p className="text-xs text-emerald-800">
                    {lang === 'ar'
                      ? 'تم تسجيل موعدك في نظام العيادة، وسيتواصل معك موظف الاستقبال لتأكيد الحضور.'
                      : 'Your appointment is reserved in our clinical schedule. Reception will welcome you on arrival.'}
                  </p>
                </div>
              </div>

              {/* Reference number banner */}
              <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2">
                <span className="text-xs text-slate-600 font-medium">
                  {t.booking.refNumberLabel}
                </span>
                <span className="text-xl font-extrabold font-mono text-teal-900 tracking-wider">
                  {bookingRef}
                </span>
              </div>

              {/* Detailed Summary Card */}
              <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3 text-xs text-slate-700">
                <div className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-2">
                  {t.booking.summaryHeader}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-start">
                  <div>
                    <span className="text-slate-400 block">{t.booking.serviceLabel}</span>
                    <span className="font-semibold text-slate-900">{selectedServiceObj.title}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">{t.booking.dateLabel} & {t.booking.timeLabel}</span>
                    <span className="font-semibold text-slate-900">{selectedDate} @ {selectedSlot}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">{t.booking.patientLabel}</span>
                    <span className="font-semibold text-slate-900">{patientName} ({phone})</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">{t.booking.locationLabel}</span>
                    <span className="font-semibold text-slate-900">{t.booking.locationVal}</span>
                  </div>
                </div>
              </div>

              {/* Direct Actions: WhatsApp + Calendar */}
              <div className="space-y-3">
                <p className="text-xs text-slate-600">
                  {t.booking.whatsappPrompt}
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={getWhatsAppBookingLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 text-xs sm:text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl transition-colors shadow-sm"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>{t.booking.whatsappBtn}</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleAddToCalendar}
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 text-xs sm:text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl transition-colors"
                  >
                    <Calendar className="w-4 h-4 text-teal-700" />
                    <span>{t.booking.calendarBtn}</span>
                  </button>
                </div>
              </div>

              {/* Reset to book another */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <a
                  href="#location"
                  className="text-teal-800 font-semibold hover:underline flex items-center gap-1"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{t.booking.directionsBtn}</span>
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setCurrentStep(1);
                    setPatientName('');
                    setPhone('');
                    setNotes('');
                  }}
                  className="text-slate-500 hover:text-slate-800 cursor-pointer"
                >
                  {t.booking.bookAnotherBtn}
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
