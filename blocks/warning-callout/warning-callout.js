export default async function decorate(block) {
  block.children[0].className = 'nhsuk-warning-callout';
  block.children[0].querySelector('h1, h2, h3, h4, h5, h6').className = 'nhsuk-warning-callout__label';
}
