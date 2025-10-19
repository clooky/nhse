/**
 * Decorator to add attributes on <main> element
 * in the AEM boilerplate project.
 * @param {HTMLElement} mainEl the <main> element
 */
function decorateDefaultElements(mainEL) {
  const defaultElements = mainEL.querySelectorAll('h1,h2,h3,h4,h5,h6,ul,ol,li,p');
  defaultElements.forEach((defaultElement)  => {
    const tagName = defaultElement.localName;
    if (tagName == 'ul') {
      defaultElement.className = 'nhsuk-list';
    }
  });
}
function decorateMainElement(mainEl) {
  if (!mainEl) return;
  const wrapper = document.createElement('div');
  wrapper.classList.add('nhsuk-width-container');

  // Example: static or dynamic attribute values:
  mainEl.setAttribute('data-region', window.location.hostname.includes('localhost') ? 'dev' : 'prod');
  mainEl.setAttribute('data-site-version', '1.0.0');
  // More attributes:
  mainEl.classList.add('nhsuk-main-wrapper');

  mainEl.parentNode.insertBefore(wrapper, mainEl);
  wrapper.appendChild(mainEl);

  decorateDefaultElements(mainEL);
}
export default decorateMainElement;
