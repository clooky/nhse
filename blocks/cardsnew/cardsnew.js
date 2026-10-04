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
  let listClassWidth = 'nhsuk-grid-column-one-third';
  if (ctx.isHalf) listClassWidth = 'nhsuk-grid-column-one-half';
  if (ctx.isFull) listClassWidth = 'nhsuk-grid-column-full';
  let clickableClass = '';
  let isClickable = ctx.isClickable;
  
  /* change to ul, li */
  const ul = document.createElement('ul');
  ul.className = 'nhsuk-grid-row nhsuk-card-group';
  [...block.children].forEach((row) => {
    let isClickable = ctx.isClickable;
    const cardAnchor = row.querySelector('h1 a, h2 a, h3 a, h4 a, h5 a, h6 a');
    const cardAnchors = row.querySelectorAll('a');
    isClickable = cardAnchors.length === 1;
    // process card
    // const li = processCard(row, ctx);
    //ul.append(li);
    // end of process card
    const listElement = document.createElement('li');
    listElement.className = 'nhsuk-card-group__item';
    row.before(listElement);
    listElement.appendChild(row);
    row.className = 'nhsuk-card';
    if (isClickable) row.classList.add('nhsuk-card--clickable');
    if (ctx.isPrimary) row.classList.add('nhsuk-card--primary');
    if (ctx.isSecondary) row.classList.add('nhsuk-card--secondary');

    const contentWrapper = document.createElement('div');
    contentWrapper.className = 'nhsuk-card__content';
    // 3. Move all original grandchildren inside the new wrapper
    // Array.from is used because childNodes updates live as you move elements
    Array.from(row.childNodes).forEach((node) => {
      contentWrapper.appendChild(node);
    });
    // 4. Finally, put the new wrapper into the original child div
    row.appendChild(contentWrapper);
  });

  //block.textContent = '';
  block.append(ul);
}
