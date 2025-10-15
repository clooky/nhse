import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

// media query match that indicates mobile/tablet width
const isDesktop = window.matchMedia('(min-width: 900px)');

function closeOnEscape(e) {
  if (e.code === 'Escape') {
    const nav = document.getElementById('nav');
    const navSections = nav.querySelector('.nav-sections');
    const navSectionExpanded = navSections.querySelector('[aria-expanded="true"]');
    if (navSectionExpanded && isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleAllNavSections(navSections);
      navSectionExpanded.focus();
    } else if (!isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleMenu(nav, navSections);
      nav.querySelector('button').focus();
    }
  }
}

function closeOnFocusLost(e) {
  const nav = e.currentTarget;
  if (!nav.contains(e.relatedTarget)) {
    const navSections = nav.querySelector('.nav-sections');
    const navSectionExpanded = navSections.querySelector('[aria-expanded="true"]');
    if (navSectionExpanded && isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleAllNavSections(navSections, false);
    } else if (!isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleMenu(nav, navSections, false);
    }
  }
}

function openOnKeydown(e) {
  const focused = document.activeElement;
  const isNavDrop = focused.className === 'nav-drop';
  if (isNavDrop && (e.code === 'Enter' || e.code === 'Space')) {
    const dropExpanded = focused.getAttribute('aria-expanded') === 'true';
    // eslint-disable-next-line no-use-before-define
    toggleAllNavSections(focused.closest('.nav-sections'));
    focused.setAttribute('aria-expanded', dropExpanded ? 'false' : 'true');
  }
}

function focusNavSection() {
  document.activeElement.addEventListener('keydown', openOnKeydown);
}

/**
 * Toggles all nav sections
 * @param {Element} sections The container element
 * @param {Boolean} expanded Whether the element should be expanded or collapsed
 */
function toggleAllNavSections(sections, expanded = false) {
  sections.querySelectorAll('.nav-sections .default-content-wrapper > ul > li').forEach((section) => {
    section.setAttribute('aria-expanded', expanded);
  });
}

/**
 * Toggles the entire nav
 * @param {Element} nav The container element
 * @param {Element} navSections The nav sections within the container element
 * @param {*} forceExpanded Optional param to force nav expand behavior when not null
 */
function toggleMenu(nav, navSections, forceExpanded = null) {
  const expanded = forceExpanded !== null ? !forceExpanded : nav.getAttribute('aria-expanded') === 'true';
  const button = nav.querySelector('.nav-hamburger button');
  document.body.style.overflowY = (expanded || isDesktop.matches) ? '' : 'hidden';
  nav.setAttribute('aria-expanded', expanded ? 'false' : 'true');
  toggleAllNavSections(navSections, expanded || isDesktop.matches ? 'false' : 'true');
  button.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
  // enable nav dropdown keyboard accessibility
  const navDrops = navSections.querySelectorAll('.nav-drop');
  if (isDesktop.matches) {
    navDrops.forEach((drop) => {
      if (!drop.hasAttribute('tabindex')) {
        drop.setAttribute('tabindex', 0);
        drop.addEventListener('focus', focusNavSection);
      }
    });
  } else {
    navDrops.forEach((drop) => {
      drop.removeAttribute('tabindex');
      drop.removeEventListener('focus', focusNavSection);
    });
  }

  // enable menu collapse on escape keypress
  if (!expanded || isDesktop.matches) {
    // collapse menu on escape press
    window.addEventListener('keydown', closeOnEscape);
    // collapse menu on focus lost
    nav.addEventListener('focusout', closeOnFocusLost);
  } else {
    window.removeEventListener('keydown', closeOnEscape);
    nav.removeEventListener('focusout', closeOnFocusLost);
  }
}

/**
 * loads and decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
/*
export default async function decorate(block) {
  // load nav as fragment
  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta, window.location).pathname : '/nav';
  const fragment = await loadFragment(navPath);

  // decorate nav DOM
  block.textContent = '';
  const nav = document.createElement('nav');
  nav.id = 'nav';
  while (fragment.firstElementChild) nav.append(fragment.firstElementChild);

  const classes = ['brand', 'sections', 'tools'];
  classes.forEach((c, i) => {
    const section = nav.children[i];
    if (section) section.classList.add(`nav-${c}`);
  });

  const navBrand = nav.querySelector('.nav-brand');
  const brandLink = navBrand.querySelector('.button');
  if (brandLink) {
    brandLink.className = '';
    brandLink.closest('.button-container').className = '';
  }

  const navSections = nav.querySelector('.nav-sections');
  if (navSections) {
    navSections.querySelectorAll(':scope .default-content-wrapper > ul > li').forEach((navSection) => {
      if (navSection.querySelector('ul')) navSection.classList.add('nav-drop');
      navSection.addEventListener('click', () => {
        if (isDesktop.matches) {
          const expanded = navSection.getAttribute('aria-expanded') === 'true';
          toggleAllNavSections(navSections);
          navSection.setAttribute('aria-expanded', expanded ? 'false' : 'true');
        }
      });
    });
  }

  // hamburger for mobile
  const hamburger = document.createElement('div');
  hamburger.classList.add('nav-hamburger');
  hamburger.innerHTML = `<button type="button" aria-controls="nav" aria-label="Open navigation">
      <span class="nav-hamburger-icon"></span>
    </button>`;
  hamburger.addEventListener('click', () => toggleMenu(nav, navSections));
  nav.prepend(hamburger);
  nav.setAttribute('aria-expanded', 'false');
  // prevent mobile nav behavior on window resize
  toggleMenu(nav, navSections, isDesktop.matches);
  isDesktop.addEventListener('change', () => toggleMenu(nav, navSections, isDesktop.matches));

  const navWrapper = document.createElement('div');
  navWrapper.className = 'nav-wrapper';
  navWrapper.append(nav);
  block.append(navWrapper);
}
*/

export default async function decorate(block) {
  const headerHTML =`
<header class="nhsuk-header" role="banner">
  <div class="nhsuk-width-container nhsuk-header__container beta-header">
    

<div class="nhsuk-header__logo">
  <a class="nhsuk-header__link" href="/" aria-label="NHS homepage">
    
    <svg class="nhsuk-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 16" height="40" width="100">
      <path class="nhsuk-logo__background" fill="#005eb8" d="M0 0h40v16H0z"></path>
      <path class="nhsuk-logo__text" fill="#fff" d="M3.9 1.5h4.4l2.6 9h.1l1.8-9h3.3l-2.8 13H9l-2.7-9h-.1l-1.8 9H1.1M17.3 1.5h3.6l-1 4.9h4L25 1.5h3.5l-2.7 13h-3.5l1.1-5.6h-4.1l-1.2 5.6h-3.4M37.7 4.4c-.7-.3-1.6-.6-2.9-.6-1.4 0-2.5.2-2.5 1.3 0 1.8 5.1 1.2 5.1 5.1 0 3.6-3.3 4.5-6.4 4.5-1.3 0-2.9-.3-4-.7l.8-2.7c.7.4 2.1.7 3.2.7s2.8-.2 2.8-1.5c0-2.1-5.1-1.3-5.1-5 0-3.4 2.9-4.4 5.8-4.4 1.6 0 3.1.2 4 .6"></path>
    </svg>
    
    
  </a>
</div>


    
      <div class="nhsuk-header__content" id="content-header">
<style>.nhsuk-account__login{float:right;margin-left:1em;margin-right:-16px;position:relative;z-index:2}.nhsuk-account__login--icon{fill:#fff;height:1.6em;margin-left:.6em;position:relative;top:.4em;width:1.6em}.nhsuk-account__login--link,.nhsuk-account__login--link:visited,.nhsuk-account__login--link:hover{color:#fff;padding:1em}.nhsuk-account__login--link:focus .nhsuk-account__login--icon{fill:#212b32}@media(min-width: 40.0625em){.nhsuk-account__login{margin-right:-8px}.nhsuk-account__login--link,.nhsuk-account__login--link:hover{margin-right:.6em;padding:.6em}}</style>
        <div class="nhsuk-header__search">
            <div class="nhsuk-header__search-wrap beta-header__search-wrap js-show" id="wrap-search">
              <form class="nhsuk-header__search-form beta-header__search-form" id="search" action="/search/" method="get" role="search">
                <label class="nhsuk-u-visually-hidden" for="search-field">Search the NHS website</label>
                <div class="autocomplete-container" id="autocomplete-container"><div class="autocomplete__wrapper"><div style="border: 0px; clip: rect(0px, 0px, 0px, 0px); height: 1px; margin-bottom: -1px; margin-right: -1px; overflow: hidden; padding: 0px; position: absolute; white-space: nowrap; width: 1px;"><div id="search-field__status--A" role="status" aria-atomic="true" aria-live="polite"></div><div id="search-field__status--B" role="status" aria-atomic="true" aria-live="polite"></div></div><input aria-expanded="false" aria-owns="search-field__listbox" aria-autocomplete="list" aria-describedby="search-field__assistiveHint" autocomplete="off" class="autocomplete__input autocomplete__input--default" id="search-field" name="q" placeholder="Search" type="text" role="combobox"><ul class="autocomplete__menu autocomplete__menu--inline autocomplete__menu--hidden" id="search-field__listbox" role="listbox"></ul><span id="search-field__assistiveHint" style="display: none;">When autocomplete results are available use up and down arrows to review and enter to select.  Touch device users, explore by touch or with swipe gestures.</span></div></div>
                
                <button class="nhsuk-search__submit beta-search__submit" type="submit">
                  <svg class="nhsuk-icon nhsuk-icon__search beta-icon__search" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <path d="M19.71 18.29l-4.11-4.1a7 7 0 1 0-1.41 1.41l4.1 4.11a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42zM5 10a5 5 0 1 1 5 5 5 5 0 0 1-5-5z"></path>
                  </svg>
                  <span class="nhsuk-u-visually-hidden">Search</span>
                </button>
              </form>
            </div>
          </div>
      <div class="nhsuk-account__login">
  <a class="nhsuk-account__login--link" href="https://www.nhs.uk/nhs-app/account/">
    My account<svg class="nhsuk-account__login--icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" height="26" width="26">
      <path d="M16,18.2c-3.1,0-5.7-2.5-5.7-5.7s2.5-5.7,5.7-5.7c3.1,0,5.7,2.5,5.7,5.7 C21.7,15.7,19.1,18.2,16,18.2"></path>
      <path d="M16,0C7.2,0,0,7.2,0,16s7.2,16,16,16s16-7.2,16-16C32,7.2,24.8,0,16,0 M24.1,27.5V26 c0-3.5-2.5-6.3-5.7-6.3h-4.8C10.5,19.6,8,22.5,8,26v1.6C1.6,23.1,0,14.3,4.5,8S17.7,0,24,4.5S32,17.7,27.5,24 C26.6,25.4,25.4,26.6,24.1,27.5"></path>
    </svg></a>
</div></div>
    

  </div>

  

    <div class="beta-nhsuk-navigation-container">
      <div class="nhsuk-width-container">
        <nav class="beta-nhsuk-navigation" id="header-navigation" role="navigation" aria-label="Primary navigation">
          <ul class="beta-nhsuk-header__navigation-list">
            
            <li class="beta-nhsuk-header__navigation-item">
              <a class="nhsuk-header__navigation-link beta-nhsuk-header__navigation-link" href="/health-a-to-z/">
                Health A to Z
                <svg class="nhsuk-icon nhsuk-icon__chevron-right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" height="34" width="34">
                  <path d="M15.5 12a1 1 0 0 1-.29.71l-5 5a1 1 0 0 1-1.42-1.42l4.3-4.29-4.3-4.29a1 1 0 0 1 1.42-1.42l5 5a1 1 0 0 1 .29.71z"></path>
                </svg>
              </a>
            </li>
            
            <li class="beta-nhsuk-header__navigation-item">
              <a class="nhsuk-header__navigation-link beta-nhsuk-header__navigation-link" href="/nhs-services/">
                NHS services
                <svg class="nhsuk-icon nhsuk-icon__chevron-right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" height="34" width="34">
                  <path d="M15.5 12a1 1 0 0 1-.29.71l-5 5a1 1 0 0 1-1.42-1.42l4.3-4.29-4.3-4.29a1 1 0 0 1 1.42-1.42l5 5a1 1 0 0 1 .29.71z"></path>
                </svg>
              </a>
            </li>
            
            <li class="beta-nhsuk-header__navigation-item">
              <a class="nhsuk-header__navigation-link beta-nhsuk-header__navigation-link" href="/live-well/">
                Live Well
                <svg class="nhsuk-icon nhsuk-icon__chevron-right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" height="34" width="34">
                  <path d="M15.5 12a1 1 0 0 1-.29.71l-5 5a1 1 0 0 1-1.42-1.42l4.3-4.29-4.3-4.29a1 1 0 0 1 1.42-1.42l5 5a1 1 0 0 1 .29.71z"></path>
                </svg>
              </a>
            </li>
            
            <li class="beta-nhsuk-header__navigation-item">
              <a class="nhsuk-header__navigation-link beta-nhsuk-header__navigation-link" href="/mental-health/">
                Mental health
                <svg class="nhsuk-icon nhsuk-icon__chevron-right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" height="34" width="34">
                  <path d="M15.5 12a1 1 0 0 1-.29.71l-5 5a1 1 0 0 1-1.42-1.42l4.3-4.29-4.3-4.29a1 1 0 0 1 1.42-1.42l5 5a1 1 0 0 1 .29.71z"></path>
                </svg>
              </a>
            </li>
            
            <li class="beta-nhsuk-header__navigation-item">
              <a class="nhsuk-header__navigation-link beta-nhsuk-header__navigation-link" href="/social-care-and-support/">
                Care and support
                <svg class="nhsuk-icon nhsuk-icon__chevron-right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" height="34" width="34">
                  <path d="M15.5 12a1 1 0 0 1-.29.71l-5 5a1 1 0 0 1-1.42-1.42l4.3-4.29-4.3-4.29a1 1 0 0 1 1.42-1.42l5 5a1 1 0 0 1 .29.71z"></path>
                </svg>
              </a>
            </li>
            
            <li class="beta-nhsuk-header__navigation-item">
              <a class="nhsuk-header__navigation-link beta-nhsuk-header__navigation-link" href="/pregnancy/">
                Pregnancy
                <svg class="nhsuk-icon nhsuk-icon__chevron-right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" height="34" width="34">
                  <path d="M15.5 12a1 1 0 0 1-.29.71l-5 5a1 1 0 0 1-1.42-1.42l4.3-4.29-4.3-4.29a1 1 0 0 1 1.42-1.42l5 5a1 1 0 0 1 .29.71z"></path>
                </svg>
              </a>
            </li>
            
           
            <li class="beta-nhsuk-header__navigation-item beta-nhsuk-header__navigation-item--home">
              <a class="nhsuk-header__navigation-link beta-nhsuk-header__navigation-link" href="/">
                Home
                <svg class="nhsuk-icon nhsuk-icon__chevron-right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" height="34" width="34">
                  <path d="M15.5 12a1 1 0 0 1-.29.71l-5 5a1 1 0 0 1-1.42-1.42l4.3-4.29-4.3-4.29a1 1 0 0 1 1.42-1.42l5 5a1 1 0 0 1 .29.71z"></path>
                </svg>
              </a>
            </li>
            <li class="beta-mobile-menu-container">
              <button class="beta-nhsuk-header__menu-toggle nhsuk-header__navigation-link beta-nhsuk-header__navigation-link" aria-expanded="false">
                <span class="nhsuk-u-visually-hidden">Browse</span>
                More
                <svg class="nhsuk-icon beta-nhsuk-icon__chevron-down" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d="M15.5 12a1 1 0 0 1-.29.71l-5 5a1 1 0 0 1-1.42-1.42l4.3-4.29-4.3-4.29a1 1 0 0 1 1.42-1.42l5 5a1 1 0 0 1 .29.71z"></path>
                </svg>
              </button>
            <ul class="beta-nhsuk-header__drop-down js-hidden"></ul></li>
          </ul>
        </nav>
      </div>
    </div>
</header>
`;
  block.textContent = '';
  block.innerHTML = headerHTML;
}
