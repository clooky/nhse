
const makeExpander = (title, html) => `
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
  const title = (block.children.length > 0) ? block.children[0].innerText : '';
  const html = (block.children.length > 1) ? block.children[1].innerHTML : '';

  const expanderBlock = makeExpander(title, html);
  block.textContent = '';
  block.innerHTML = expanderBlock;
}
