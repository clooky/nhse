import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

const moreLink = `
        <li class="nhsuk-header__menu" hidden>
          <button class="nhsuk-header__menu-toggle nhsuk-header__navigation-link" id="toggle-menu" aria-expanded="false">
            <span class="nhsuk-u-visually-hidden">Browse </span>More
          </button>
        </li>
`;

const makeLogo = (title) => `
  <div class="nhsuk-header__container nhsuk-width-container">
    <div class="nhsuk-header__service">
      <a class="nhsuk-header__service-logo" href="#" aria-label="NHS digital service manual homepage">
        <svg class="nhsuk-header__logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 80" height="40" width="100" focusable="false" role="img" aria-label="NHS">
          <title>NHS</title>
          <path fill="currentcolor" d="M200 0v80H0V0h200Zm-27.5 5.5c-14.5 0-29 5-29 22 0 10.2 7.7 13.5 14.7 16.3l.7.3c5.4 2 10.1 3.9 10.1 8.4 0 6.5-8.5 7.5-14 7.5s-12.5-1.5-16-3.5L135 70c5.5 2 13.5 3.5 20 3.5 15.5 0 32-4.5 32-22.5 0-19.5-25.5-16.5-25.5-25.5 0-5.5 5.5-6.5 12.5-6.5a35 35 0 0 1 14.5 3l4-13.5c-4.5-2-12-3-20-3Zm-131 2h-22l-14 65H22l9-45h.5l13.5 45h21.5l14-65H64l-9 45h-.5l-13-45Zm63 0h-18l-13 65h17l6-28H117l-5.5 28H129l13.5-65H125L119.5 32h-20l5-24.5Z" />
        </svg>
        <span class="nhsuk-header__service-name">${title}</span>
      </a>
    </div>
    <search class="nhsuk-header__search">
      <form class="nhsuk-header__search-form" id="search" action="https://www.nhs.uk/search/" method="get">
        <label class="nhsuk-u-visually-hidden" for="search-field">Search the NHS digital service manual</label>
        <input class="nhsuk-header__search-input nhsuk-input" id="search-field" name="q" type="search" placeholder="Search" autocomplete="off">
        <button class="nhsuk-header__search-submit" type="submit">
          <svg class="nhsuk-icon nhsuk-icon--search" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" focusable="false" role="img" aria-label="Search">
            <title>Search</title>
            <path d="m20.7 19.3-4.1-4.1a7 7 0 1 0-1.4 1.4l4 4.1a1 1 0 0 0 1.5 0c.4-.4.4-1 0-1.4ZM6 11a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z" />
          </svg>
        </button>
      </form>
    </search>
  </div>
`;

export default async function decorate(block) {
  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta, window.location).pathname : '/nav';
  const fragment = await loadFragment(navPath);
  const title = fragment.querySelector('h1').innerText;
  block.parentElement.className = 'nhsuk-header';

  const logoBlock = makeLogo(title);
  const div = document.createElement('div');
  div.innerHTML = logoBlock.trim();

  const nav = document.createElement('nav');
  nav.className = 'nhsuk-header__navigation';
  const navDiv = document.createElement('div');
  navDiv.className = 'nhsuk-header__navigation-container nhsuk-width-container';
  nav.append(navDiv);

  const ul = fragment.querySelector('ul');
  ul.className = 'nhsuk-header__navigation-list';
  const anchors = ul.querySelectorAll('a');
  anchors.forEach((anchor) => {
    anchor.className = 'nhsuk-header__navigation-link';
    anchor.parentElement.className = 'nhsuk-header__navigation-item';
  });
  ul.insertAdjacentHTML('beforeend', moreLink);

  navDiv.append(ul);
  block.parentElement.append(div.firstChild);
  block.parentElement.append(nav);
}
