import processCard from './cards-utils.js';

export default function decorate(block) {
  const ctx = {};
  ctx.isTop = block.classList.contains('top');
  ctx.isPrimary = block.classList.contains('primary');
  ctx.isSecondary = block.classList.contains('secondary');
  ctx.isNumber = block.classList.contains('number');

  /* change to ul, li */
  const ul = document.createElement('ul');
  ul.className = 'nhsuk-grid-row nhsuk-card-group';
  [...block.children].forEach((row) => {
    // process card
    const li = processCard(row, ctx);
    ul.append(li);
    // end of process card
  });

  block.textContent = '';
  block.append(ul);
}
