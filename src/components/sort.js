import AbstractComponent from './abstract-component.js';


const createSortTypeMarkup = ({name, active}) => {
  const activeClass = active ? `sort__button--active` : ``;
  return (`<li><a href="#${name}" data-sort-type="${name}" class="sort__button ${activeClass}">Sort by ${name}</a></li>`)
}


const createSortTemplate = (sortTypes) => {
  const sortTypeMarkup = sortTypes.map((sortType) => {
    return createSortTypeMarkup(sortType)
  }).join(`\n`);
  console.l
  return (`<ul class="sort">
    ${sortTypeMarkup}
  </ul>`);
};
export default class Sort extends AbstractComponent {
  constructor(sortTypes) {
    super();
    this._sortTypes = sortTypes;
  }
  getTemplate() {
    return createSortTemplate(this._sortTypes);
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      if (evt.target.tagName !== `A`) {
        return;
      }
      const sortType = evt.target.dataset.sortType;
      handler(sortType);
    });
  }
}
