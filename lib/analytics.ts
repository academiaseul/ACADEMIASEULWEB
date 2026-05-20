import { trackMetaEvent } from '@/components/MetaPixel';
import { trackGAEvent } from '@/components/GoogleAnalytics';

/**
 * Track a conversion event across all analytics providers
 * (Vercel Analytics, Meta Pixel, Google Analytics).
 * Only runs on the client side.
 */
export function trackConversion(
  eventName: string,
  params?: Record<string, string | number | boolean>,
) {
  if (typeof window === 'undefined') return;

  // Vercel Analytics (custom event) - dynamic import to avoid SSR issues
  import('@vercel/analytics')
    .then((mod) => {
      try {
        if (params) {
          mod.track(eventName, params);
        } else {
          mod.track(eventName);
        }
      } catch {
        // Vercel analytics not loaded yet
      }
    })
    .catch(() => {
      // ignore
    });

  // Google Analytics 4
  trackGAEvent(eventName, params);

  // Meta Pixel - usa nombres estandar de Meta cuando aplique
  const metaEventMap: Record<string, string> = {
    taller_signup: 'CompleteRegistration',
    lead_magnet_download: 'Lead',
    nivel1_inscripcion: 'Purchase',
    whatsapp_click: 'Contact',
    cta_click: 'AddToCart',
  };

  const metaEventName = metaEventMap[eventName] || 'CustomEvent';
  trackMetaEvent(metaEventName, params);
}

/**
 * Common conversion events used across the site.
 */
export const events = {
  tallerSignup: () => trackConversion('taller_signup'),
  leadMagnetDownload: () => trackConversion('lead_magnet_download'),
  whatsappOpen: (quickReply?: string) =>
    trackConversion('whatsapp_click', { quick_reply: quickReply || 'general' }),
  notificameSubmit: (curso: string) =>
    trackConversion('notificame_submit', { curso }),
  nivel1Inscripcion: (cohorte: string, amount: number) =>
    trackConversion('nivel1_inscripcion', { cohorte, amount, currency: 'USD' }),
  popupCtaClick: () => trackConversion('cta_click', { source: 'popup' }),
};
