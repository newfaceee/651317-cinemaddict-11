import { SORT_BY_TYPES } from '../const.js';

const createSortMarkup = (sortByType, isActive) => {
  const activeClass = isActive ? ` sort__button--active` : ``;
  return (
    `<li><a href="#" class="sort__button ${activeClass}">Sort by ${sortByType}</a></li>`
  )
}

export const createSortTemplate = () => {
  const sortByTypesMarkup = SORT_BY_TYPES.map((it, i) => {
    return createSortMarkup(it, i === 0);
  }).join('\n');
  return (`<ul class="sort">
    ${sortByTypesMarkup}
  </ul>`);
};
