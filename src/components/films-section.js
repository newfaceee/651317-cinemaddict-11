import AbstractComponent from './abstract-component.js';

const createFilmsSectionTemplate = () => {
  return `<section class="films"></section>`;
};
export default class FilmsSection extends AbstractComponent {
  constructor(filmsSection) {
    super();
    this._filmsSection = filmsSection;
  }

  getTemplate() {
    return createFilmsSectionTemplate(this._filmsSection);
  }
}
