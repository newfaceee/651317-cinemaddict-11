import AbstractComponent from './abstract-component.js';
import {FilterType} from '../const.js';

const createFilterMarkup = ({name, count}, isActive) => {
  const activeClass = isActive ? `main-navigation__item--active` : ``;
  const countMarkup = name !== FilterType.ALL ? `<span class="main-navigation__item-count">${count}</span>` : ``;
  return `<a data-id="${name}" href="#${name}" class="main-navigation__item ${activeClass}">${name} ${countMarkup}</a>`;
};


export const createFilterTemplate = (filters) => {
  const filtersMarkup = filters.map((filter) => {
    return createFilterMarkup(filter, filter.active);
  }).join(`\n`);
  return (`<nav class="main-navigation">
        <div class="main-navigation__items">
          ${filtersMarkup}
        </div>
        <a data-id="Stats" href="#stats" class="main-navigation__additional">Stats</a>
      </nav>`);
};
export default class Filter extends AbstractComponent {
  constructor(filters) {
    super();

    this._filters = filters;
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
  }

  setFilterChangeHandler(handler) {

    this.getElement().addEventListener(`click`, (evt) => {
      if (!evt.target.closest(`a`)) {
        return;
      }
      if (!this.getElement().contains(evt.target)) {
        return;
      }
      const filterType = evt.target.closest(`a`).dataset.id;
      handler(filterType);
    });
  }
  setOnChange(handler) {
    this.getElement().addEventListener(`click`, (evt) => {

      if (!evt.target.closest(`a`)) {
        return;
      }
      const navigationItem = evt.target.closest(`a`).dataset.id;

      handler(navigationItem);
    });
  }
}
