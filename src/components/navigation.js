const createNavigationMarkup = (navigation, isActive) => {
  const {name, count} = navigation;
  const activeClass = isActive ? `main-navigation__item--active` : ``;
  return (typeof count === `undefined` ? `<a href="#${name}" class="main-navigation__item ${activeClass}">${name}</a>` : `<a href="#${name}" class="main-navigation__item ${activeClass}">${name} <span class="main-navigation__item-count">${count}</span></a>`);
};


export const createNavigationTemplate = (navigations) => {
  const navigationsMarkup = navigations.map((it, i) => {
    return createNavigationMarkup(it, i === 0);
  }).join(`\n`);
  return (`<nav class="main-navigation">
        <div class="main-navigation__items">
          ${navigationsMarkup}
        </div>
        <a href="#stats" class="main-navigation__additional">Stats</a>
      </nav>`);
};