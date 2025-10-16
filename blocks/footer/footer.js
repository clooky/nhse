// import { getMetadata } from '../../scripts/aem.js';
// import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
/*
export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  block.append(footer);
}
*/

export default async function decorate(block) {
  const footerHTML = `
  <footer class="nhsuk-footer" role="contentinfo">
    <div class="nhsuk-width-container">
      <div class="nhsuk-footer__meta">
        <h2 class="nhsuk-u-visually-hidden">Support links</h2>
        <ul class="nhsuk-footer__list">
          <li class="nhsuk-footer__list-item">
            <a class="nhsuk-footer__list-item-link" href="#">Accessibility statement</a>
          </li>
          <li class="nhsuk-footer__list-item">
            <a class="nhsuk-footer__list-item-link" href="#">Contact us</a>
          </li>
          <li class="nhsuk-footer__list-item">
            <a class="nhsuk-footer__list-item-link" href="#">Cookies</a>
          </li>
          <li class="nhsuk-footer__list-item">
            <a class="nhsuk-footer__list-item-link" href="#">Privacy policy</a>
          </li>
          <li class="nhsuk-footer__list-item">
            <a class="nhsuk-footer__list-item-link" href="#">Terms and conditions</a>
          </li>
        </ul>
  
        <p class="nhsuk-body-s">© NHS England</p>
      </div>
    </div>
  </footer>
  `;
  block.textContent = '';
  block.innerHTML = footerHTML;
}
