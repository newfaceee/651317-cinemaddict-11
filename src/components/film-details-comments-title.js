import AbstractComponent from "./abstract-component.js";

const createCommentsTitleTemplate = (commentsCount) => {
  return (`<h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentsCount}</span></h3>`);
}

export default class FilmDetailsCommentsTitle extends AbstractComponent {
  constructor(commentsCount) {
    super();
    this._commentsCount = commentsCount;
  } 
  getTemplate() {
    return createCommentsTitleTemplate(this._commentsCount);
  }
}