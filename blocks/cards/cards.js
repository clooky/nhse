import { createOptimizedPicture } from '../../scripts/aem.js';

const primaryCardTemplate = `
  <div class="nhsuk-card nhsuk-card--clickable">
    <div class="nhsuk-card__content">
      <h5 class="nhsuk-card__heading nhsuk-heading-xs"> <a class="nhsuk-card__link" href="[HREF]">[LINKTEXT]</a> </h5>
    </div>
  </div>
`;

function processTopCard (currentCard) {
  const cardAnchor = currentCard.querySelector('a');
  const linkHref = cardAnchor.getAttribute('href');
  const linkText = cardAnchor.textContent;
//  let newCard = primaryCardTemplate;
  console.log (`href = ${linkHref} and text = ${linkText} `);
  const li = document.createElement('li');
  li.className = 'nhsuk-grid-column-half nhsuk-card-group__item';
  li.innerHTML = primaryCardTemplate;
  li.querySelect('.nhsuk-card__link').href = linkHref;
  li.querySelect('.nhsuk-card__link').innerHTML = linkText;
  return li
}


export default function decorate(block) {
  const ctx = {};
  ctx.isTop = block.classList.contains('top');
  ctx.isPrimary = block.classList.contains('primary');
  ctx.isSecondary = block.classList.contains('secondary');
  console.log (JSON.stringify(ctx));
  
  /* change to ul, li */
  const ul = document.createElement('ul');
  ul.className = 'nhsuk-grid-row nhsuk-card-group';
  [...block.children].forEach((row) => {
    // process card
    let li = null;
    if (ctx.isTop) {
      // process top card
      li = processTopCard(row);
    } else {
      li = document.createElement('li');
      li.className = 'nhsuk-grid-column-half nhsuk-card-group__item';
      while (row.firstElementChild) li.append(row.firstElementChild);
      [...li.children].forEach((div) => {
        if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
        else div.className = 'cards-card-body';
      });
    }
    ul.append(li);
    // end of process card
  });
  ul.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.textContent = '';
  block.append(ul);
}
