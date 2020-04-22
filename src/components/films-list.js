import AbstractComponent from './abstract-component.js';

const createFilmsListTemplate = () => {
  return (`<section class="films-list">
    <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
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
