const makeTopCard = (href, linkText) => `
  <div class='nhsuk-card nhsuk-card--clickable'>
    <div class='nhsuk-card__content'>
      <h5 class='nhsuk-card__heading nhsuk-heading-xs'>
        <a class="nhsuk-card__link" href='${href}'>${linkText}</a>
      </h5>
    </div>
  </div>
`;

const makePrimaryCard = (href, linkText, description) => `
  <div class='nhsuk-card nhsuk-card--clickable'>
    <div class='nhsuk-card__content nhsuk-card__content--primary'>
      <h2 class='nhsuk-card__heading nhsuk-heading-m'>
        <a class="nhsuk-card__link" href='${href}'>${linkText}</a>
      </h2>
      <p class='nhsuk-card__description'>${description}</p>
      <svg class='nhsuk-icon nhsuk-icon--chevron-right-circle' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='16' height='16' focusable='false' aria-hidden='true'>
        <path d='M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20Zm-.3 5.8a1 1 0 1 0-1.5 1.4l2.9 2.8-2.9 2.8a1 1 0 0 0 1.5 1.4l3.5-3.5c.4-.4.4-1 0-1.4Z' />
      </svg>
    </div>
  </div>
`;

const makeSecondaryCard = (href, linkText, description) => `
  <div class='nhsuk-card nhsuk-card--clickable nhsuk-card--secondary'>
    <div class='nhsuk-card__content nhsuk-card__content--secondary'>
      <h2 class='nhsuk-card__heading nhsuk-heading-m'>
        <a class="nhsuk-card__link" href='${href}'>${linkText}</a>
      </h2>
      <p class='nhsuk-card__description'>${description}</p>
    </div>
  </div>
`;

const makePictureCard = (href, linkText, description, pictureSrc) => `
  <div class="nhsuk-card nhsuk-card--clickable">
    <img class="nhsuk-card__img" src="${pictureSrc}" alt="">
    <div class="nhsuk-card__content">
      <h2 class="nhsuk-card__heading nhsuk-heading-m">
        <a class="nhsuk-card__link" href='${href}'>${linkText}</a>
      </h2>
      <p class='nhsuk-card__description'>${description}</p>
    </div>
  </div>
`;
const makeNumberCard = (href, linkText, title) => `
    <div class="nhsuk-card nhsuk-card--clickable">
      <div class="nhsuk-card__content">
        <p class="nhsuk-heading-xl nhsuk-u-font-size-64 nhsuk-u-margin-bottom-1">${title}<span class="nhsuk-u-visually-hidden">${linkText}</span></p>
        <a href='${href}' class="nhsuk-card__link nhsuk-u-font-weight-normal nhsuk-u-font-size-19 nhsuk-link--no-visited-state">${linkText}</a>
      </div>
    </div>
`;

export default function processCard(currentCard, ctx) {
  let card = null;
  let listClassWidth = 'nhsuk-grid-column-one-third';
  const cardAnchor = currentCard.querySelector('h1 a, h2 a, h3 a, h4 a, h5 a, h6 a');
  const linkHref = cardAnchor?.getAttribute('href') || '';
  const linkText = cardAnchor?.textContent || '';
  const cardPicture = currentCard.querySelector('img');
  currentCard.querySelector('picture')?.remove(); // Tech Debt remove all pictures
  const paragraphs = currentCard.querySelectorAll('p');
  const paragraphHTML = Array.from(paragraphs).map((p) => p.innerHTML).join('');

  if (cardPicture) {
    card = makePictureCard(linkHref, linkText, paragraphHTML, cardPicture.src);
  } else if (ctx.isTop) {
    card = makeTopCard(linkHref, linkText, paragraphHTML);
  } else if (ctx.isPrimary) {
    card = makePrimaryCard(linkHref, linkText, paragraphHTML);
  } else if (ctx.isNumber) {
    const title = currentCard.querySelector('h1, h2, h3, h4, h5, h6')?.innerText;
    const numberLink = currentCard.querySelector('a')?.href;
    const numberLinkText = currentCard.querySelector('a')?.innerText;
    card = makeNumberCard(numberLink, numberLinkText, title);
    listClassWidth = 'nhsuk-grid-column-one-quarter';
  } else {
    card = makeSecondaryCard(linkHref, linkText, paragraphHTML);
  }
  const li = document.createElement('li');
  li.className = listClassWidth + ' nhsuk-card-group__item';
  li.innerHTML = card;
  return li;
}
