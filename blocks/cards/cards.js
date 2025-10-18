import { createOptimizedPicture } from '../../scripts/aem.js';

const primaryCardTemplate = `
    <div class="nhsuk-card nhsuk-card--clickable">
      <div class="nhsuk-card__content nhsuk-card__content--primary">
        <h2 class="nhsuk-card__heading nhsuk-heading-m"> <a class="nhsuk-card__link" href="[HREF]">[LINKTEXT]</a> </h2>
        <p class="nhsuk-card__description">[CARDDESCRIPTION]</p> <svg class="nhsuk-icon nhsuk-icon--chevron-right-circle" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" focusable="false" aria-hidden="true">
          <path d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20Zm-.3 5.8a1 1 0 1 0-1.5 1.4l2.9 2.8-2.9 2.8a1 1 0 0 0 1.5 1.4l3.5-3.5c.4-.4.4-1 0-1.4Z" />
        </svg>
      </div>
    </div>
`;
const topCardTemplate = `
  <div class="nhsuk-card nhsuk-card--clickable">
    <div class="nhsuk-card__content">
      <h5 class="nhsuk-card__heading nhsuk-heading-xs"> <a class="nhsuk-card__link" href="[HREF]">[LINKTEXT]</a> </h5>
    </div>
  </div>
`;


function processTopCard1 (currentCard,href,linkText) {
  const cardAnchor = currentCard.querySelector('a');
  const li = document.createElement('li');
  li.className = 'nhsuk-grid-column-half nhsuk-card-group__item';
  li.innerHTML = primaryCardTemplate;
  li.querySelector('.nhsuk-card__link').href = href;
  li.querySelector('.nhsuk-card__link').innerHTML = linkText;
  return li
}

function processTopCard (currentCard) {
  const cardAnchor = currentCard.querySelector('a');
  const linkHref = cardAnchor.getAttribute('href');
  const linkText = cardAnchor.textContent;
//  let newCard = topCardTemplate;
  console.log (`href = ${linkHref} and text = ${linkText} `);
  const li = document.createElement('li');
  li.className = 'nhsuk-grid-column-half nhsuk-card-group__item';
  li.innerHTML = primaryCardTemplate;
  li.querySelector('.nhsuk-card__link').href = linkHref;
  li.querySelector('.nhsuk-card__link').innerHTML = linkText;
  return li
}

function processCard (currentCard, ctx) {
  let li = null;
  const cardAnchor = currentCard.querySelector('a');
  const linkHref = cardAnchor.getAttribute('href');
  const linkText = cardAnchor.textContent;
  if (ctx.isTop) {
    li = processTopCard1 (currentCard,linkHref,linkText);
  }
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
      li = processCard(row,ctx);
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
