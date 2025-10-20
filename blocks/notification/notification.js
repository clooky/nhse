
const makeBanner = (title, html) => `
<div class="nhsuk-notification-banner" role="region" aria-labelledby="nhsuk-notification-banner-title" data-module="nhsuk-notification-banner">
  <div class="nhsuk-notification-banner__header">
    <h2 class="nhsuk-notification-banner__title" id="nhsuk-notification-banner-title">
      ${title}
    </h2>
  </div>
  <div class="nhsuk-notification-banner__content">
    ${html}
  </div>
</div>
`;

export default async function decorate(block) {
  const title = (block.children.length > 0) ? block.children[0].innerText : '';
  const html = (block.children.length > 1) ? block.children[1].innerHTML : '';

  const bannerBlock = makeBanner(title, html);
  block.textContent = '';
  block.innerHTML = bannerBlock;
}