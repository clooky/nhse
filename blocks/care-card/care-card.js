function getLevelClass(classList) {
  let levelClass = 'nhsuk-card--care--non-urgent';
  if (classList.contains('emergency')) {
    levelClass = 'nhsuk-card--care--emergency';
  } else if (classList.contains('urgent')) {
    levelClass = 'nhsuk-card--care--urgent';
  }
  return levelClass;
}
export default function decorate(block) {
  const cardClass = getLevelClass(block.classList);
  const headerText = block.querySelector('h1').textContent.trim();
  const bodyHTML = block.cloneNode(true);
  bodyHTML.querySelector('h1').remove();
  const section = document.createElement('section');
  section.innerHTML = `
      <div class="nhsuk-card nhsuk-card--care ${cardClass}">
        <div class="nhsuk-card--care__heading-container">
            <h2 class="nhsuk-card--care__heading">
                <span role="text">
                    <span class="nhsuk-u-visually-hidden">Non-urgent advice: </span>${headerText}
                </span>
            </h2>
            <span class="nhsuk-card--care__arrow" aria-hidden="true"></span>
        </div>
        
        <div class="nhsuk-card__content">
          <div id="cardBodyTextPlaceholder"></div>
        </div>
    </div>
  `;
  const cardBodyTextPlaceholder = section.querySelector('#cardBodyTextPlaceholder');
  if (cardBodyTextPlaceholder && bodyHTML) {
    cardBodyTextPlaceholder.replaceWith(bodyHTML);
  }
  block.textContent = '';
  block.append(section);
}
