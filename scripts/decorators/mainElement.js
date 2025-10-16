/**
 * Decorator to add attributes on <main> element
 * in the AEM boilerplate project.
 * @param {HTMLElement} mainEl the <main> element
 */
export function decorateMainElement(mainEl) {
  if (!mainEl) return;
  // Example: static or dynamic attribute values:
  mainEl.setAttribute('data-region', window.location.hostname.includes('localhost') ? 'dev' : 'prod');
  mainEl.setAttribute('data-site-version', '1.0.0');  // or fetch from meta / config
  // More attributes:
  mainEl.classList.add('nhsuk-main-wrapper');
}
