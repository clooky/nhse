const topCardTemplate = `
  <div class="nhsuk-card nhsuk-card--clickable">
    <div class="nhsuk-card__content">
      <h5 class="nhsuk-card__heading nhsuk-heading-xs"> <a class="nhsuk-card__link" href="[HREF]">[LINKTEXT]</a> </h5>
    </div>
  </div>
`;

const primaryCardTemplate = `
    <div class="nhsuk-card nhsuk-card--clickable">
      <div class="nhsuk-card__content nhsuk-card__content--primary">
        <h2 class="nhsuk-card__heading nhsuk-heading-m"> <a class="nhsuk-card__link" href="[HREF]">[LINKTEXT]</a> </h2>
        <p class="nhsuk-card__description">[CARDDESCRIPTION]</p>
        <svg class="nhsuk-icon nhsuk-icon--chevron-right-circle" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" focusable="false" aria-hidden="true">
          <path d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20Zm-.3 5.8a1 1 0 1 0-1.5 1.4l2.9 2.8-2.9 2.8a1 1 0 0 0 1.5 1.4l3.5-3.5c.4-.4.4-1 0-1.4Z" />
        </svg>
      </div>
    </div>
`;

const secondaryCardTemplate = `
    <div class="nhsuk-card nhsuk-card--clickable nhsuk-card--secondary">
      <div class="nhsuk-card__content nhsuk-card__content--secondary">
        <h2 class="nhsuk-card__heading nhsuk-heading-m"> <a class="nhsuk-card__link" href="[HREF]">[LINKTEXT]</a> </h2>
        <p class="nhsuk-card__description">[CARDDESCRIPTION]</p>
      </div>
    </div>
`;

function processTemplateCard(cardTemplate, href, linkText, paragraphs) {
  const li = document.createElement('li');
  li.className = 'nhsuk-grid-column-one-third nhsuk-card-group__item';
  li.innerHTML = cardTemplate;
  li.querySelector('.nhsuk-card__link').href = href;
  li.querySelector('.nhsuk-card__link').innerHTML = linkText;
  const descriptionNode = li.querySelector('.nhsuk-card__description');
  if (descriptionNode) {
    if (paragraphs) {
      paragraphs.forEach((paragraph) => {
        paragraph.className = descriptionNode.className;
        descriptionNode.parentElement.insertBefore(paragraph, descriptionNode);
      });
    }
    descriptionNode.remove();
  }
  return li;
}

function processCard(currentCard, ctx) {
  let li = null;
  const cardAnchor = currentCard.querySelector('h1 a, h2 a, h3 a, h4 a, h5 a, h6 a');
  const linkHref = cardAnchor?.getAttribute('href') || '';
  const linkText = cardAnchor?.textContent || '';

  // remove the node where the heading anchor was as we don't need this now
  currentCard.children[0].querySelectorAll(':scope > *').forEach((child) => {
    if (child.querySelector('h1 a, h2 a, h3 a, h4 a, h5 a, h6 a')) {
      child.remove();
    }
  });
  const paragraphs = currentCard.querySelectorAll('p');

  if (ctx.isTop) {
    li = processTemplateCard(topCardTemplate, linkHref, linkText, paragraphs);
  } else if (ctx.isPrimary) {
    li = processTemplateCard(primaryCardTemplate, linkHref, linkText, paragraphs);
  } else {
    li = processTemplateCard(secondaryCardTemplate, linkHref, linkText, paragraphs);
  }
  return li;
}

export {processCard};
