/**
 * Internal dependencies.
 */
import { CookieStore } from './cookieStore';

/**
 * Fires when the browser receives a response from a web server.
 *
 * For example:
 * When user loads a new page.
 * When user refreshes a page.
 * When the user clicks on a link.
 * When the user submits a form.
 * When the browser loads a web page in the background.
 * When the browser receives a push notification.
 * When the browser receives a WebSocket message.
 * When the browser receives a file download.
 * */
chrome.webRequest.onResponseStarted.addListener(
  (details) => {
    const { tabId, initiator, url, responseHeaders } = details;

    // Adds the cookies from the request headers to the cookies object.
    CookieStore.addFromRequest(tabId, {
      initiator,
      url,
      headers: responseHeaders,
    });
  },
  { urls: ['*://*/*'] },
  ['extraHeaders', 'responseHeaders']
);

// Fired when the browser is about to navigate to a new page.
chrome.webNavigation.onBeforeNavigate.addListener((details) => {
  const { tabId, url, frameType } = details;

  if (url && frameType === 'outermost_frame') {
    // Updates the location of the tab in the cookies object.
    CookieStore.updateTabLocation(tabId, new URL(url), Date.now());
  }
});

// Fired when a tab is activated(focused) or created.
chrome.tabs.onActivated.addListener((activeInfo) => {
  CookieStore.updateTabFocus(activeInfo);
});

// Fired when a tab is closed.
chrome.tabs.onRemoved.addListener((tabId) => {
  CookieStore.removeTabData(tabId);
});

// Fired when browser window is closed.
chrome.windows.onRemoved.addListener((windowId) => {
  CookieStore.removeWindowData(windowId);
});
