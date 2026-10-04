import processCard from './card-utils.js';

export default function decorate(block) {
  const ctx = {};
  ctx.isTop = block.classList.contains('top');
  ctx.isPrimary = block.classList.contains('primary');
  ctx.isSecondary = block.classList.contains('secondary');
  ctx.isNumber = block.classList.contains('number');
  ctx.isHalf = block.classList.contains('half');
  ctx.isFull = block.classList.contains('full');
  ctx.isClickable = block.classList.contains('clickable');

  /* change to ul, li */
  const ul = document.createElement('ul');
  ul.className = 'nhsuk-grid-row nhsuk-card-group';
  [...block.children].forEach((row) => {
    // process card
    // const li = processCard(row, ctx);
    //ul.append(li);
    // end of process card
    const listElement = document.createElement('li');
    listElement.className = 'nhsuk-card-group__item';
    row.before(listElement);
    listElement.appendChild(row);
    row.className = 'nhsuk-card';
  });

  //block.textContent = '';
  block.append(ul);
}
