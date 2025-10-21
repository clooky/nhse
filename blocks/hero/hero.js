const makeHTML = (title, pictureSrc) => `
<section class="nhsuk-hero nhsuk-hero--image nhsuk-hero--image-description" style="background-image: url('${pictureSrc}'); background-size: cover; background-position: center center; background-color: rgb(0, 94, 184); margin-bottom: 70px;">
    <div class="nhsuk-hero__overlay">
        <div class="nhsuk-width-container">
            <div class="nhsuk-grid-row">
                <div class="nhsuk-grid-column-two-thirds">
                    <div class="nhsuk-hero-content">
                        <h1>${title}</h1>
                        <span class="nhsuk-hero__arrow" aria-hidden="true"></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
`;

export default async function decorate(block) {
  const title = block.querySelector('h1, h2, h3, h4, h5, h6')?.innerText || '';
  const pictureSrc = block.querySelector('img')?.src || '';

  const htmlBlock = makeHTML(title, pictureSrc);
  block.textContent = '';
  block.innerHTML = htmlBlock;
}
