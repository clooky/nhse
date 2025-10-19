import { createOptimizedPicture } from '../../scripts/aem.js';
import { processCard } from './cards-utils.js';

export default function decorate(block) {
  const ctx = {};
  ctx.isTop = block.classList.contains('top');
  ctx.isPrimary = block.classList.contains('primary');
  ctx.isSecondary = block.classList.contains('secondary');

  /* change to ul, li */
  const ul = document.createElement('ul');
  ul.className = 'nhsuk-grid-row nhsuk-card-group';
  [...block.children].forEach((row) => {
    // process card
    const li = processCard(row, ctx);
    ul.append(li);
    // end of process card
  });
  ul.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.textContent = '';
  block.append(ul);
}
