// Google Analytics utility functions
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

// Track page views
export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'GA_MEASUREMENT_ID', {
      page_path: url,
    });
  }
};

// Track custom events
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Track form submissions
export const trackFormSubmission = (formName: string) => {
  trackEvent('submit', 'form', formName);
};

// Track button clicks
export const trackButtonClick = (buttonName: string) => {
  trackEvent('click', 'button', buttonName);
};

// Track external link clicks
export const trackExternalLink = (url: string) => {
  trackEvent('click', 'external_link', url);
};

// Track WhatsApp clicks
export const trackWhatsAppClick = () => {
  trackEvent('click', 'contact', 'whatsapp');
};

// Track social media clicks
export const trackSocialClick = (platform: string) => {
  trackEvent('click', 'social', platform);
};

// Track consultation booking
export const trackConsultationBooking = () => {
  trackEvent('click', 'conversion', 'consultation_booking');
};