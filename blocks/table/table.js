function buildCell(rowIndex) {
  const cell = rowIndex ? document.createElement('td') : document.createElement('th');
  if (!rowIndex) { 
    cell.className = 'nhsuk-table__header';
    cell.setAttribute('scope', 'col');
    cell.setAttribute('role', 'columnheader');
  } else {
    cell.className = 'nhsuk-table__cell nhsuk-u-text-break-word';
  }
  return cell;
}

export default function decorate(block) {
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');

  table.className = 'nhsuk-table-responsive';
  thead.className = 'nhsuk-table__head';
  tbody.className = 'nhsuk-table__body';

  const hasCaption = (block.children.length > 0) ? (block.children[0].children.length == 1) : flase;
  if (hasCaption) {
    const caption = document.createElement('caption');
    caption.className = 'nhsuk-table__caption';
    caption.innerText = block.children[0].children[0].innerText;
    table.appendChild(caption);
    block.removeChild(block.children[0]);
  }

  const header = !block.classList.contains('no-header');
  if (header) table.append(thead);
  table.append(tbody);

  [...block.children].forEach((child, i) => {
    const row = document.createElement('tr');
    row.className = 'nhsuk-table__row';
    if (header && i === 0) thead.append(row);
    else tbody.append(row);
    [...child.children].forEach((col) => {
      const cell = buildCell(header ? i : i + 1);
      const align = col.getAttribute('data-align');
      if (align == 'right') cell.classList.add('nhsuk-table__cell--numeric');
      cell.innerHTML = col.innerText;
      row.append(cell);
    });
  });
  block.innerHTML = '';
  block.append(table);
}
