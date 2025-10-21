const makeHTML = (lastReviewed, nextReview) => `
<dl class="nhsuk-body-s nhsuk-u-secondary-text-colour nhsuk-u-margin-top-7 nhsuk-u-margin-bottom-0">
  <div>
    <dt>Page last reviewed:</dt>
    <dd><time datetime="${lastReviewed}">${lastReviewed}</time></dd>
  </div>
  <div>
    <dt>Next review due:</dt>
    <dd><time datetime="${nextReview}">${nextReview}</time></dd>
  </div>
</dl>
`;

export default async function decorate(block) {
  const lastReviewed = '15 March 2025';
  const nextReview = '15 March 2028';

  const HTML = makeHTML(lastReviewed, nextReview);
  block.textContent = '';
  block.innerHTML = HTML;
}
