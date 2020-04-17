const createNavigationMarkup = ({name, count}, isActive) => {
  const activeClass = isActive ? `main-navigation__item--active` : ``;
  return (typeof count === `undefined` ? `<a href="#${name}" class="main-navigation__item ${activeClass}">${name}</a>` : `<a href="#${name}" class="main-navigation__item ${activeClass}">${name} <span class="main-navigation__item-count">${count}</span></a>`);
};


export const createNavigationTemplate = (navigations) => {
  navigations.map((it) => {
    console.log(it);
  })
  // const navigationsMarkup = navigations.map((it, i) => {
  //   return createNavigationMarkup(it, i === 0);
  // }).join(`\n`);
  const navigationsMarkup = navigations.map((it) => {
    return ``;
  });
  console.log(navigationsMarkup);

  return (`<nav class="main-navigation">
        <div class="main-navigation__items">
          ${navigationsMarkup}
        </div>
        <a href="#stats" class="main-navigation__additional">Stats</a>
      </nav>`);
};
export default class Navigation {
  constructor(navigation) {
    this._navigation = navigation;
    this._element = null;
  }

  getTemplate() {
    return createNavigationTemplate(this._navigation);
  }

  getElement() {
    if (!this._element) {
      this._element = createNavigationTemplate(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}