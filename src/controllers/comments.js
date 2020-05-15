import FilmDetailsCommentsComponent from '../components/film-details-comments.js';
import FilmDetailsCommentsListComponent from '../components/film-details-comments-list.js';
import FilmDetailsCommentsTitleComponent from '../components/film-details-comments-title.js';
import {render, RenderPosition, remove} from '../utils/render.js';

export default class CommentsController {
  constructor(container, comments, commentsModel, onDeleteComment) {
    this._container = container;
    this._comments = comments;
    this._commentsModel = commentsModel;

    this._onDeleteComment = onDeleteComment;

    this._onDataChange = this._onDataChange.bind(this);

    this._filmDetailsComments = [];

  }
  shake() {

  }
  render() {
    const container = this._container;
    const commentsCount = this._comments.length;
    this._filmDetailsCommentsListComponent = new FilmDetailsCommentsListComponent();
    this._filmDetailsCommentsTitleComponent = new FilmDetailsCommentsTitleComponent(commentsCount);

    const commentsListElement = this._filmDetailsCommentsListComponent.getElement();

    this._comments.forEach((comment) => {
      const filmDetailsCommentsComponent = new FilmDetailsCommentsComponent(comment);
      filmDetailsCommentsComponent.setDeleteButtonClickHandler((commentId, deleteButtonElement) => {
        this._onDeleteComment(this._comments, commentId, deleteButtonElement, filmDetailsCommentsComponent);
      });
      this._filmDetailsComments.push(filmDetailsCommentsComponent);
      render(commentsListElement, filmDetailsCommentsComponent, RenderPosition.BEFOREEND);
    });
    render(container, this._filmDetailsCommentsListComponent, RenderPosition.AFTERBEGIN);
    render(container, this._filmDetailsCommentsTitleComponent, RenderPosition.AFTERBEGIN);
  }

  destroy() {
    remove(this._filmDetailsCommentsListComponent);
    remove(this._filmDetailsCommentsTitleComponent);
  }

  _onDataChange() {
    this.render();
  }
}
