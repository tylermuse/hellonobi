import mixpanel from 'mixpanel-browser';

const MIXPANEL_TOKEN = 'd7b429a44a7a4864684036c75553530c';
const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development';

if (isProduction) {
  mixpanel.init(MIXPANEL_TOKEN, {
    debug: false,
    track_pageview: true,
    persistence: 'localStorage',
    autocapture: false,
    ignore_dnt: true
  });
}

class MixpanelClient {
  static track(eventName, properties = {}) {
    if (isProduction) {
      try {
        mixpanel.track(eventName, properties);
      } catch (error) {
        console.error('[MixpanelClient] Error tracking event:', error);
      }
    } else if (isDevelopment) {
      console.log('[MixpanelClient] Event (not tracked in dev):', eventName, properties);
    }
  }

  static identify(userId, userProperties = {}) {
    if (isProduction) {
      try {
        mixpanel.identify(userId);
        if (Object.keys(userProperties).length > 0) {
          mixpanel.people.set(userProperties);
        }
      } catch (error) {
        console.error('[MixpanelClient] Error identifying user:', error);
      }
    }
  }

  static reset() {
    if (isProduction) {
      try {
        mixpanel.reset();
      } catch (error) {
        console.error('[MixpanelClient] Error resetting:', error);
      }
    }
  }
}

export default MixpanelClient;
