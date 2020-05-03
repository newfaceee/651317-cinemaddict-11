import FilmDetailsCommentsComponent from '../components/film-details-comments.js';
import NewCommentComponent from '../components/film-details-new-comment.js';
import {render, replace, RenderPosition} from '../utils/render.js';

export default class CommentsController {
  constructor(container, comments, commentsModel) {
    this._container = container;
    this._comments = comments;
    this._commentsModel = commentsModel;

    this._onDataChange = this._onDataChange.bind(this);

    this._filmDetailsCommentsComponent = null;
    this._newCommentComponent = null;

    this._commentsModel.setDataChangeHandlers(this._onDataChange);
  }

  render() {
    const container = this._container;
    const oldComponent = this._filmDetailsCommentsComponent;
    this._filmDetailsCommentsComponent = new FilmDetailsCommentsComponent(this._comments.comments);
    const newCommentContainerElement = this._filmDetailsCommentsComponent.getElement();

    this._newCommentComponent = new NewCommentComponent();
    this._filmDetailsCommentsComponent.setDeleteButtonClickHandler((commentId) => {
      this._onDeleteButtonClickHandler(commentId);
    });
    this._newCommentComponent.setEmojiChangeHandler(() => {
      console.log(`you clicked emoji`)
    })
    if (oldComponent) {
      replace(oldComponent, this._filmDetailsCommentsComponent);
    } else {
      render(container, this._filmDetailsCommentsComponent, RenderPosition.BEFOREEND);
    }
    render(newCommentContainerElement, this._newCommentComponent, RenderPosition.BEFOREEND);

  }
  _onDeleteButtonClickHandler(commentId) {
    this._commentsModel.deleteComment(this._comments, commentId);
  }

  _onDataChange() {
    this.render();
  }
}
