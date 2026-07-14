const makeBlockquote = (author, role, html) => `
<figure class="nhsuk-quote">
  <blockquote class="nhsuk-quote__blockquote" cite="https://example.com">
    <p class="nhsuk-body-m">
     ${html} 
   </p>
  </blockquote>
  <figcaption class="nhsuk-quote__caption">
    <span class="nhsuk-quote__author nhsuk-!-font-weight-bold"> ${author}</span>
    <span class="nhsuk-quote__metadata nhsuk-hint nhsuk-body-s"> ${role}</span>
  </figcaption>
</figure>
`;

export default async function decorate(block) {
  const html = (block.children.length > 0) ? block.children[0].innerHTML : '';
  const author = (block.children.length > 1) ? block.children[1].innerText : '';
  const role = (block.children.length > 2) ? block.children[2].innerText : '';

  const blockquoteBlock = makeBlockquote(author, role, html);
  block.textContent = '';
  block.innerHTML = blockquoteBlock;
}
