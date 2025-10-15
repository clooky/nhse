export default function decorate(block) {
  const headerText = block.querySelector('h1').textContent.trim();
  const bodyHTML = block;
  bodyHTML.querySelector('h1').remove();
  const cardBody = `
      <div class="nhsuk-card nhsuk-card--care nhsuk-card--care--non-urgent">
        <div class="nhsuk-card--care__heading-container">
            <h2 class="nhsuk-card--care__heading">
                <span role="text">
                    <span class="nhsuk-u-visually-hidden">Non-urgent advice: </span>${headerText}
                </span>
            </h2>
            <span class="nhsuk-card--care__arrow" aria-hidden="true"></span>
        </div>
        
        <div class="nhsuk-card__content">
        ${bodyHTML}
        </div>
    </div>
  `;
  const section = document.createElement('section');
  section.insertAdjacentHTML('beforeend', cardBody);
//  block.textContent = '';
  block.append(section);
}
