export default async function decorate(block) {
  const insetType = block.children[0].innerText;
  const visualImparedInfoSpan = document.createElement('span');
  const visualImparedInfoText = document.createTextNode(insetType);
  visualImparedInfoSpan.className = 'nhsuk-u-visually-hidden';
  visualImparedInfoSpan.appendChild(visualImparedInfoText);

  block.children[1].className = 'nhsuk-inset-text';
  block.children[1].insertBefore(visualImparedInfoSpan, block.children[1].children[0]);
  block.children[0].remove();
}
