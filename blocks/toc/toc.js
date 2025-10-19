export default function decorate(block) {
  const headers = document.querySelector('main').querySelectorAll('h2');
  const ol = document.createElement('ol');
  ol.className = 'nhs-toc';
  headers.forEach((header) => {
    const headerText = header.textContent.trim();
    const li = document.createElement('li');
    const text = document.createTextNode(headerText);
    li.appendChild(text);
    ol.append(li);
  });
  block.textContent = '';
  block.append(ol);
}
