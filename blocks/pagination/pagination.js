const makePagination = (pagination) => `
<nav class="nhsuk-pagination" role="navigation" aria-label="Pagination">
  <ul class="nhsuk-list nhsuk-pagination__list">
    <li class="nhsuk-pagination-item--previous">
      <a class="nhsuk-pagination__link nhsuk-pagination__link--prev" href="${pagination.prev.href}">
        <span class="nhsuk-pagination__title">${pagination.prev.text}</span>
        <span class="nhsuk-u-visually-hidden">:</span>
        <span class="nhsuk-pagination__page">${pagination.prev.title}</span>
        <svg class="nhsuk-icon nhsuk-icon--arrow-left" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" focusable="false" aria-hidden="true">
          <path d="M10.7 6.3c.4.4.4 1 0 1.4L7.4 11H19a1 1 0 0 1 0 2H7.4l3.3 3.3c.4.4.4 1 0 1.4a1 1 0 0 1-1.4 0l-5-5A1 1 0 0 1 4 12c0-.3.1-.5.3-.7l5-5a1 1 0 0 1 1.4 0Z" />
        </svg>

      </a>
    </li>
    <li class="nhsuk-pagination-item--next">
      <a class="nhsuk-pagination__link nhsuk-pagination__link--next" href="${pagination.next.href}">
        <span class="nhsuk-pagination__title">${pagination.next.text}</span>
        <span class="nhsuk-u-visually-hidden">:</span>
        <span class="nhsuk-pagination__page">${pagination.next.title}</span>
        <svg class="nhsuk-icon nhsuk-icon--arrow-right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" focusable="false" aria-hidden="true">
          <path d="m14.7 6.3 5 5c.2.2.3.4.3.7 0 .3-.1.5-.3.7l-5 5a1 1 0 0 1-1.4-1.4l3.3-3.3H5a1 1 0 0 1 0-2h11.6l-3.3-3.3a1 1 0 1 1 1.4-1.4Z" />
        </svg>
      </a>
    </li>
  </ul>
</nav>
  `;

export default async function decorate(block) {
  const prevRow = (block.children.length > 0) ? block.children[0] : null;
  const nextRow = (block.children.length > 1) ? block.children[1] : null;
  const pagination = {
    prev : {
      text: (prevRow.children.length > 0) ? prevRow.children[0].innerText : '',
      title: (prevRow.children.length > 1) ? prevRow.children[1].innerText : '',
      href: (prevRow.children.length > 1) ? prevRow.children[1].querySelector('a')?.href
    },
    next : {
      text: (nextRow.children.length > 0) ? nextRow.children[0].innerText : '',
      title: (nextRow.children.length > 1) ? nextRow.children[1].innerText : '',
      href: (nextRow.children.length > 1) ? nextRow.children[1].querySelector('a')?.href
    }
  };
  
  const paginationBlock = makePagination(pagination);
  block.textContent = '';
  block.innerHTML = paginationBlock;
}
