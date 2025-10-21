export default async function decorate(block) {
  const currentPage = window.location.href;
  const tocDiv = (block.children.length > 0) ? block.children[0] : null;
  const ol = (tocDiv) ? tocDiv.querySelector('ol') : null;
  if (ol) {
    ol.className = 'nhsuk-contents-list__list';

    const li = (tocDiv) ? tocDiv.querySelectorAll('li') : null;
    li.forEach((element) => {
      element.className = 'nhsuk-contents-list__item';
    });

    const listAnchors = (tocDiv) ? tocDiv.querySelectorAll('li a') : null;
    listAnchors.forEach((element) => {
      if (element.href === currentPage) {
        const span = document.createElement('span');
        span.className = 'nhsuk-contents-list__link nhsuk-contents-list__current';
        span.innerHTML = element.innerHTML;
        element.parentElement.insertBefore(span,element);
        element.remove();
      } else {
        element.className = 'nhsuk-contents-list__link ';
      }
    });

    const nav = document.createElement('nav');
    nav.className = 'nhsuk-contents-list';
    tocDiv.appendChild(nav);
    const newOl = ol.cloneNode(true);
    nav.appendChild(newOl);
    ol.parentNode.remove();
  }
}
