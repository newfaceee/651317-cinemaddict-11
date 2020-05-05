import AbstractComponent from "./abstract-component";

const createCommentsTemplate = (commentsCount) => {
  return (`<a class="film-card__comments">${commentsCount} comments</a>`);
};

export default class FilmCardComments extends AbstractComponent {
  constructor(commentsCount) {
    super();
    this._commentsCount = commentsCount;
  }

  getTemplate() {
    return createCommentsTemplate(this._commentsCount);
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}
