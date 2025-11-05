import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);
  block.parentElement.className = 'nhsuk-footer';

  const uls = fragment.querySelectorAll('ul');
  const ulCount = uls.length;
  const ulCSSWidth = 'nhsuk-grid-column-one-quarter';

  const gridDiv = document.createElement('div');
  gridDiv.className = 'nhsuk-footer__navigation nhsuk-grid-row';

  uls.forEach((ul) => {
    const div = document.createElement('div');
    div.className = ulCSSWidth;
    gridDiv.appendChild(div);
    ul.className = 'nhsuk-footer__list';
    const anchors = ul.querySelectorAll('a');
    anchors.forEach((anchor) => {
      anchor.className = 'nhsuk-footer__list-item-link';
      anchor.parentElement.className = 'nhsuk-footer__list-item';
    });
    div.appendChild(ul);
  });

  fragment.querySelectorAll('p').forEach((p) => {
    p.className = 'nhsuk-body-s';
  });
  // decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');
  footer.className = 'nhsuk-width-container';
  footer.appendChild(gridDiv);

  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  block.append(footer);
}
