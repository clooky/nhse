// eslint-disable-next-line import/no-unresolved
import { toClassName } from '../../scripts/aem.js';

export default async function decorate(block) {
  // build tablist
  const tablist = document.createElement('div');
  tablist.className = 'tabs-list nhsuk-tabs';
  tablist.setAttribute('role', 'tablist');
  tablist.setAttribute('data-module', 'nhsuk-tabs');
  const tablistheading = document.createElement('h2');
  tablistheading.className = 'nhsuk-tabs__heading';
  tablistheading.innerText = 'Contents';
  tablist.append(tablistheading);

  const tablistlinks = document.createElement('ul');
  tablistlinks.className = 'nhsuk-tabs__list';
  tablist.append(tablistlinks);

  // decorate tabs and tabpanels
  const tabs = [...block.children].map((child) => child.firstElementChild);
  tabs.forEach((tab, i) => {
    const id = toClassName(tab.textContent);

    // decorate tabpanel
    const tabpanel = block.children[i];
    tabpanel.className = 'nhsuk-tabs__panel';
    tabpanel.id = `${id}`;
    tabpanel.setAttribute('aria-hidden', !!i);
    tabpanel.setAttribute('aria-labelledby', `tab-${id}`);
    tabpanel.setAttribute('role', 'tabpanel');

    // build tab links
    const tablinkitem = document.createElement('li');
    tablinkitem.className = 'nhsuk-tabs__list-item';
    const tablinkitemlink = document.createElement('a');
    tablinkitemlink.className = 'nhsuk-tabs__tab';
    tablinkitemlink.href = `#${id}`;
    tablinkitem.append(tablinkitemlink);
    tablistlinks.append(tablinkitem);
    tablinkitemlink.innerHTML = tab.innerHTML;

    // build tab button
    tab.remove();
  });

  block.prepend(tablist);
}
