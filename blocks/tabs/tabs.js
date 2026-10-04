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
  
    // build tab links
    const tabListItem = document.createElement('li');
    tabListItem.className = 'nhsuk-tabs__list-item';
    const tabListItemLink = document.createElement('a');
    tabListItemLink.className = 'nhsuk-tabs__tab';
    tabListItemLink.href = `#${id}`;
    tabListItemLink.innerText = tab.innerText;
    tabListItem.append(tabListItemLink);
    tabList.append(tabListItem);

    // remove tab text div from block
    tab.remove();
  });

  // move tab panels to tabContainer
  [...block.getElementsByClassName("nhsuk-tabs__panel")]
      .forEach(panel => tabContainer.appendChild(panel));
    block.prepend(tabContainer);
}
