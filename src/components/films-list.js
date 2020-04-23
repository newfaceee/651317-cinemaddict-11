import AbstractComponent from './abstract-component.js';

const createFilmsListTemplate = (title, isVisible) => {
  const visuallyHiddenClass = isVisible ? `` : `visually-hidden`;
  return (`<section class="films-list">
    <h2 class="films-list__title ${visuallyHiddenClass}">${title}</h2>
    </section>`);
};
export default class FilmsList extends AbstractComponent {
  constructor(title, isVisible) {
    super();

    this._title = title;
    this._isVisible = isVisible;
  }

  getTemplate() {
    return createFilmsListTemplate(this._title, this._isVisible);
  }
}
