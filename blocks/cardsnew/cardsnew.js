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
  let isClickable = ctx.isClickable;
  const clickableSVGElement = `
    <svg class="nhsuk-icon nhsuk-icon--chevron-right-circle" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" focusable="false" aria-hidden="true">
      <path d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20Zm-.3 5.8a1 1 0 1 0-1.5 1.4l2.9 2.8-2.9 2.8a1 1 0 0 0 1.5 1.4l3.5-3.5c.4-.4.4-1 0-1.4Z" />
    </svg>
  `;

  /* change to ul, li */
  const ul = document.createElement('ul');
  ul.className = 'nhsuk-grid-row nhsuk-card-group';
  [...block.children].forEach((row) => {
    // add the nhs classes to the headings and anchors
    row.querySelectorAll('h1 a, h2 a, h3 a, h4 a, h5 a, h6 a').forEach(anchor => {
      anchor.classList.add('nhsuk-card__link');
      const heading = anchor.parentElement;
      if (heading) {
        heading.classList.add('nhsuk-card__heading', 'nhsuk-heading-m');
      }
    });
    const cardAnchors = row.querySelectorAll('a');
    isClickable = cardAnchors.length === 1;
    const listElement = document.createElement('li');
    listElement.className = 'nhsuk-card-group__item';
    listElement.classList.add(listClassWidth);
    row.before(listElement);
    ul.appendChild(listElement);
    listElement.appendChild(row);
    row.className = 'nhsuk-card';
    if (isClickable) row.classList.add('nhsuk-card--clickable');
    if (ctx.isPrimary) row.classList.add('nhsuk-card--primary');
    if (ctx.isSecondary) row.classList.add('nhsuk-card--secondary');

    const contentWrapper = document.createElement('div');
    contentWrapper.className = 'nhsuk-card__content';
    Array.from(row.childNodes).forEach((node) => {
      contentWrapper.appendChild(node);
    });
    row.appendChild(contentWrapper);

    if (isClickable) {
      const template = document.createElement('template');
      template.innerHTML = clickableSVGElement.trim(); // .trim() removes accidental leading spaces
      const svgNode = template.content.firstElementChild;
      row.appendChild(svgNode);
    }
  });

  block.append(ul);
}
