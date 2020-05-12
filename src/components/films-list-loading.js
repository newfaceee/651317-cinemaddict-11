import AbstractComponent from "./abstract-component";

const createFilmsListLoadingTemplate = () => {
  return (`<section class="films">
  <section class="films-list">
    <h2 class="films-list__title">Loading...</h2>
  </section>
  </section>`);
};

export default class FilmListLoading extends AbstractComponent {
  getTemplate() {
    return createFilmsListLoadingTemplate();
  }
}
