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

  const dsTabs = `
  <div class="nhsuk-tabs" data-module="nhsuk-tabs">
  <h2 class="nhsuk-tabs__heading">
    Contents
  </h2>
  <ul class="nhsuk-tabs__list">
    <li class="nhsuk-tabs__list-item nhsuk-tabs__list-item--selected">
      <a class="nhsuk-tabs__tab" href="#past-day">
        Past day
      </a>
    </li>
    <li class="nhsuk-tabs__list-item">
      <a class="nhsuk-tabs__tab" href="#past-week">
        Past week
      </a>
    </li>
    <li class="nhsuk-tabs__list-item">
      <a class="nhsuk-tabs__tab" href="#past-month">
        Past month
      </a>
    </li>
    <li class="nhsuk-tabs__list-item">
      <a class="nhsuk-tabs__tab" href="#past-year">
        Past year
      </a>
    </li>
  </ul>
  <div class="nhsuk-tabs__panel" id="past-day">
    <table class="nhsuk-table">
      <caption class="nhsuk-table__caption">
        Past day
      </caption>
      <thead class="nhsuk-table__head">
        <tr class="nhsuk-table__row">
          <th class="nhsuk-table__header" scope="col">
            Case manager
          </th>
          <th class="nhsuk-table__header nhsuk-table__header--numeric" scope="col">
            Cases opened
          </th>
          <th class="nhsuk-table__header nhsuk-table__header--numeric" scope="col">
            Cases closed
          </th>
        </tr>
      </thead>
      <tbody class="nhsuk-table__body">
        <tr class="nhsuk-table__row">
          <td class="nhsuk-table__cell">
            David Francis
          </td>
          <td class="nhsuk-table__cell nhsuk-table__cell--numeric">
            3
          </td>
          <td class="nhsuk-table__cell nhsuk-table__cell--numeric">
            0
          </td>
        </tr>
        <tr class="nhsuk-table__row">
          <td class="nhsuk-table__cell">
            Paul Farmer
          </td>
          <td class="nhsuk-table__cell nhsuk-table__cell--numeric">
            1
          </td>
          <td class="nhsuk-table__cell nhsuk-table__cell--numeric">
            0
          </td>
        </tr>
        <tr class="nhsuk-table__row">
          <td class="nhsuk-table__cell">
            Rita Patel
          </td>
          <td class="nhsuk-table__cell nhsuk-table__cell--numeric">
            2
          </td>
          <td class="nhsuk-table__cell nhsuk-table__cell--numeric">
            0
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="nhsuk-tabs__panel nhsuk-tabs__panel--hidden" id="past-week">
    <table class="nhsuk-table">
      <caption class="nhsuk-table__caption">
        Past week
      </caption>
      <thead class="nhsuk-table__head">
        <tr class="nhsuk-table__row">
          <th class="nhsuk-table__header" scope="col">
            Case manager
          </th>
          <th class="nhsuk-table__header nhsuk-table__header--numeric" scope="col">
            Cases opened
          </th>
          <th class="nhsuk-table__header nhsuk-table__header--numeric" scope="col">
            Cases closed
          </th>
        </tr>
      </thead>
      <tbody class="nhsuk-table__body">
        <tr class="nhsuk-table__row">
          <td class="nhsuk-table__cell">
            David Francis
          </td>
          <td class="nhsuk-table__cell nhsuk-table__cell--numeric">
            24
          </td>
          <td class="nhsuk-table__cell nhsuk-table__cell--numeric">
            18
          </td>
        </tr>
        <tr class="nhsuk-table__row">
          <td class="nhsuk-table__cell">
            Paul Farmer
          </td>
          <td class="nhsuk-table__cell nhsuk-table__cell--numeric">
            16
          </td>
          <td class="nhsuk-table__cell nhsuk-table__cell--numeric">
            20
          </td>
        </tr>
        <tr class="nhsuk-table__row">
          <td class="nhsuk-table__cell">
            Rita Patel
          </td>
          <td class="nhsuk-table__cell nhsuk-table__cell--numeric">
            24
          </td>
          <td class="nhsuk-table__cell nhsuk-table__cell--numeric">
            27
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="nhsuk-tabs__panel nhsuk-tabs__panel--hidden" id="past-month">
    <table class="nhsuk-table">
      <caption class="nhsuk-table__caption">
        Past month
      </caption>
      <thead class="nhsuk-table__head">
        <tr class="nhsuk-table__row">
          <th class="nhsuk-table__header" scope="col">
            Case manager
          </th>
          <th class="nhsuk-table__header nhsuk-table__header--numeric" scope="col">
            Cases opened
          </th>
          <th class="nhsuk-table__header nhsuk-table__header--numeric" scope="col">
            Cases closed
          </th>
        </tr>
      </thead>
      <tbody class="nhsuk-table__body">
        <tr class="nhsuk-table__row">
          <td class="nhsuk-table__cell">
            David Francis
          </td>
          <td class="nhsuk-table__cell nhsuk-table__cell--numeric">
            98
          </td>
          <td class="nhsuk-table__cell nhsuk-table__cell--numeric">
            95
          </td>
        </tr>
        <tr class="nhsuk-table__row">
          <td class="nhsuk-table__cell">
            Paul Farmer
          </td>
          <td class="nhsuk-table__cell nhsuk-table__cell--numeric">
            122
          </td>
          <td class="nhsuk-table__cell nhsuk-table__cell--numeric">
            131
          </td>
        </tr>
        <tr class="nhsuk-table__row">
          <td class="nhsuk-table__cell">
            Rita Patel
          </td>
          <td class="nhsuk-table__cell nhsuk-table__cell--numeric">
            126
          </td>
          <td class="nhsuk-table__cell nhsuk-table__cell--numeric">
            142
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="nhsuk-tabs__panel nhsuk-tabs__panel--hidden" id="past-year">
    <table class="nhsuk-table">
      <caption class="nhsuk-table__caption">
        Past year
      </caption>
      <thead class="nhsuk-table__head">
        <tr class="nhsuk-table__row">
          <th class="nhsuk-table__header" scope="col">
            Case manager
          </th>
          <th class="nhsuk-table__header nhsuk-table__header--numeric" scope="col">
            Cases opened
          </th>
          <th class="nhsuk-table__header nhsuk-table__header--numeric" scope="col">
            Cases closed
          </th>
        </tr>
      </thead>
      <tbody class="nhsuk-table__body">
        <tr class="nhsuk-table__row">
          <td class="nhsuk-table__cell">
            David Francis
          </td>
          <td class="nhsuk-table__cell nhsuk-table__cell--numeric">
            1380
          </td>
          <td class="nhsuk-table__cell nhsuk-table__cell--numeric">
            1472
          </td>
        </tr>
        <tr class="nhsuk-table__row">
          <td class="nhsuk-table__cell">
            Paul Farmer
          </td>
          <td class="nhsuk-table__cell nhsuk-table__cell--numeric">
            1129
          </td>
          <td class="nhsuk-table__cell nhsuk-table__cell--numeric">
            1083
          </td>
        </tr>
        <tr class="nhsuk-table__row">
          <td class="nhsuk-table__cell">
            Rita Patel
          </td>
          <td class="nhsuk-table__cell nhsuk-table__cell--numeric">
            1539
          </td>
          <td class="nhsuk-table__cell nhsuk-table__cell--numeric">
            1265
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>`;
  const dsDiv = document.createElement('div');
  block.append(dsDiv);
  block.prepend(tablist);
  dsDiv.innerHTML = dsTabs;
}
