import {createElement} from '../utils.js';
const createFilmsListTemplate = (title, isVisible) => {
  const visuallyHiddenClass = isVisible ? `` : `visually-hidden`;
  return (`<section class="films-list">
    <h2 class="films-list__title ${visuallyHiddenClass}">${title}</h2>
    </section>`);
};
export default class FilmsList {
  constructor(title, isVisible) {
    this._title = title;
    this._isVisible = isVisible;
    this._element = null;
  }

  getTemplate() {
    return createFilmsListTemplate(this._title, this._isVisible);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
