import AbstractComponent from "./abstract-component"

const createFilmDetailsCommentsWrap = () => {
  return (`<section class="film-details__comments-wrap"></section>`)
}

export default class FilmDetailsCommentsWrap extends AbstractComponent {
  getTemplate() {
    return createFilmDetailsCommentsWrap();
  }
}