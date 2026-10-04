// eslint-disable-next-line import/no-unresolved
import { toClassName } from '../../scripts/aem.js';

export default async function decorate(block) {
  // build tablist
  const tabContainer = document.createElement('div');
  tabContainer.className = 'tabs-list nhsuk-tabs';
  tabContainer.setAttribute('role', 'tablist');
  tabContainer.setAttribute('data-module', 'nhsuk-tabs');
  const tabHeading = document.createElement('h2');
  tabHeading.className = 'nhsuk-tabs__heading';
  tabHeading.innerText = 'Contents';
  tabContainer.append(tabHeading);

  const tabList = document.createElement('ul');
  tabList.className = 'nhsuk-tabs__list';
  tabContainer.append(tabList);

  // decorate tabs and tabpanels
  const tabs = [...block.children].map((child) => child.firstElementChild);
  tabs.forEach((tab, i) => {
    const id = toClassName(tab.textContent);

    // decorate tabpanel
    const tabpanel = block.children[i];
    tabpanel.className = 'nhsuk-tabs__panel';
    tabpanel.id = `${id}`;
    tabpanel.setAttribute('aria-hidden', !!i);
    tabpanel.setAttribute('aria-labelledby', `${id}`);
    tabpanel.setAttribute('role', 'tabpanel');
    // tabContainer.append(tabpanel);

    // build tab links
    const tabListItem = document.createElement('li');
    tabListItem.className = 'nhsuk-tabs__list-item';
    const tabListItemLink = document.createElement('a');
    tabListItemLink.className = 'nhsuk-tabs__tab';
    tabListItemLink.href = `#${id}`;
    tabListItemLink.innerHTML = tab.innerHTML;
    tabListItem.append(tabListItemLink);
    tabList.append(tabListItem);

    // build tab button
    tab.remove();
  });
  const panels = block.getElementsByClassName("nhsuk-tabs__panel");
  panels.forEach(panel => {
    tabContainer.appendChild(panel);
  });

  block.prepend(tabContainer);
}
