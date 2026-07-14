const makeBlockquote = (author, role, html) => `
<figure class="nhsuk-quote">
  <!-- Accessible Decorative SVG Element -->
  <svg class="nhsuk-quote__icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
  </svg>
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
