const backLinkTemplate = `<a class="nhsuk-back-link" href="[HREF]">[LINKTEXT]</a>`;

export default function decorate(block) {
  const cardAnchor = block.querySelector('a');
  const linkHref = cardAnchor?.getAttribute('href') || '';
  const linkText = cardAnchor?.textContent || '';
  block.textContent = '';
  block.innerHTML = backLinkTemplate;
  block.querySelector('a').href = linkHref;
  block.querySelector('a').innerHTML = linkText;
}
