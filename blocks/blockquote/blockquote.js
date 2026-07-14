const makeBlockquote = (author, role, html) => `
<figure class="govuk-quote">
  <blockquote class="govuk-quote__blockquote" cite="https://example.com">
    <p class="govuk-body-m">
     ${html} 
   </p>
  </blockquote>
  <figcaption class="govuk-quote__caption">
    <span class="govuk-quote__author govuk-!-font-weight-bold"> ${author}</span>
    <span class="govuk-quote__metadata govuk-hint govuk-body-s"> ${role}</span>
  </figcaption>
</figure>


<details class="nhsuk-details nhsuk-expander">
  <summary class="nhsuk-details__summary">
    <span class="nhsuk-details__summary-text">
      ${title} 
    </span>
  </summary>
  <div class="nhsuk-details__text">
    ${html}
  </div>
</details>
`;

export default async function decorate(block) {
  const html = (block.children.length > 0) ? block.children[0].innerHTML : '';
  const author = (block.children.length > 1) ? block.children[1].innerText : '';
  const role = (block.children.length > 2) ? block.children[2].innerText : '';

  const blockquoteBlock = makeExpander(author, role, html);
  block.textContent = '';
  block.innerHTML = blockquoteBlock;
}
