const createFilmsContainerTemplate = (isAdditional, title) => {
  return (`<section class="${isAdditional ? `films-list--extra` : `films-list`}">
  <h2 class="films-list__title ${isAdditional ? `` : `visually-hidden`}">${title}</h2>
      <div class="films-list__container">
      </div>
    </section>`);
};
export default class FilmsContainer {
  constructor(filmsContainer) {
    this._filmsContainer = filmsContainer;

    this._element = null;
  }

  getTemplate() {
    return createFilmsContainerTemplate(this._filmsContainer);
  }

  getElement() {
    if (!this._element) {
      this._element = createFilmsContainerTemplate(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}