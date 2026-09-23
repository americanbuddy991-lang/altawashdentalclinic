export type Language = 'en' | 'ar';

export interface ServiceItem {
  id: string;
  title: { en: string; ar: string };
  category: { en: string; ar: string };
  description: { en: string; ar: string };
  features: { en: string[]; ar: string[] };
  image: string;
  badge?: { en: string; ar: string };
  startingPrice?: { en: string; ar: string };
}

export interface BookingState {
  serviceId: string;
  date: string;
  timeSlot: string;
  patientName: string;
  phone: string;
  email?: string;
  notes?: string;
  isFirstVisit: boolean;
  preferredLanguage: 'en' | 'ar';
}

export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  date: { en: string; ar: string };
  treatment: { en: string; ar: string };
  text: { en: string; ar: string };
  verifiedGoogle: boolean;
}
