import MixpanelClient from '../service-clients/mixpanel-client';
import { EVENTS } from '../constants/events';

export function trackEvent(eventName, properties = {}) {
  MixpanelClient.track(eventName, properties);

  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, properties);
  }
}

export function trackDemoFormOpened() {
  trackEvent(EVENTS.DEMO_FORM_OPENED, {
    source: 'website'
  });
}

export function trackScrollPreviewClicked(previewText) {
  trackEvent(EVENTS.SCROLL_PREVIEW_CLICKED, {
    preview_text: previewText,
    source: 'website'
  });
}
