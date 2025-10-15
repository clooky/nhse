export default function decorate(block) {
  const headerText = block.querySelector('h1').textContent.trim();
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
            <ul>
                <li>you have tummy or back pain that does not go away or keeps coming back</li>
                <li>you feel a lump in your tummy</li>
            </ul>
            <p>These symptoms can be caused by lots of things and do not mean you have an
                abdominal aortic aneurysm, but it's best to get them checked.</p>
        </div>
    </div>
  `;
  const section = document.createElement('section');
  section.insertAdjacentHTML('beforeend', cardBody);
  block.textContent = '';
  block.append(section);
}
