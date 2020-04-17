const sortByTypes = [
  `default`, `date`, `rating`
];
const createSortMarkup = (sortByType, isActive) => {
  const activeClass = isActive ? ` sort__button--active` : ``;
  return (
    `<li><a href="#" class="sort__button ${activeClass}">Sort by ${sortByType}</a></li>`);
};

const createSortTemplate = () => {
  const sortByTypesMarkup = sortByTypes.map((type, i) => {
    return createSortMarkup(type, i === 0);
  }).join(`\n`);
  return (`<ul class="sort">
    ${sortByTypesMarkup}
  </ul>`);
};
export default class Sort {
  constructor() {

    this._element = null;
  }

  getTemplate() {
    return createSortTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createSortTemplate(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
