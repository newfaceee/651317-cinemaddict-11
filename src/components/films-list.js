import {createElement} from '../utils.js';
const createFilmsListTemplate = (title) => {
  return (`<section class="films-list">
  <h2 class="films-list__title visually-hidden>${title}</h2>
      
    </section>`);
};
export default class FilmsList {
  constructor(title) {
    this._title = title;

    this._element = null;
  }

  getTemplate() {
    return createFilmsListTemplate(this._title);
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
