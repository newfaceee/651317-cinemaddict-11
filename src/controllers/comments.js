import FilmDetailsPopupCommentsComponent from '../components/film-details-popup-comments.js';

export default class CommentsController {
  constructor(container) {
    this._container = container;
    this._filmDetailsPopupCommentsComponent = null;
  }

  render(comment) {
    this._filmDetailsPopupCommentsComponent = new FilmDetailsPopupCommentsComponent(comment);
    console.log(this._filmDetailsPopupCommentsComponent);
  }
}