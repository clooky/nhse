import { createOptimizedPicture } from '../../scripts/aem.js';
/*
<ul class="nhsuk-grid-row nhsuk-card-group">
  <li class="nhsuk-grid-column-two-thirds nhsuk-card-group__item">

    <div class="nhsuk-card nhsuk-card--clickable">
      <div class="nhsuk-card__content nhsuk-card__content--primary">
        <h2 class="nhsuk-card__heading nhsuk-heading-m">
          <a class="nhsuk-card__link" href="#">Introduction to care and support</a>
        </h2>
        <p class="nhsuk-card__description">A quick guide for people who have care and support needs and their carers</p>

        <svg class="nhsuk-icon" xmlns="http://www.w3.org/2000/svg" width="27" height="27" aria-hidden="true" focusable="false">
          <circle cx="13.333" cy="13.333" r="13.333" fill="" />
          <g data-name="Group 1" fill="none" stroke="#fff" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2.667">
            <path d="M15.438 13l-3.771 3.771" />
            <path data-name="Path" d="M11.667 9.229L15.438 13" />
          </g>
        </svg>

      </div>
    </div>

  </li>
</ul>
*/
export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  ul.className = 'nhsuk-grid-row nhsuk-card-group'
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    li.className = 'nhsuk-grid-column-two-thirds nhsuk-card-group__item'
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
      else div.className = 'cards-card-body';
    });
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.textContent = '';
  block.append(ul);
}
