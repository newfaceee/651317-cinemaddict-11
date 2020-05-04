import FilmDetailsCommentsComponent from '../components/film-details-comments.js';
import NewCommentController from './new-comment.js';
import {render, replace, RenderPosition, remove} from '../utils/render.js';

const renderAddNewComment = (container, commentsModel) => {
  const addNewComment = new NewCommentController(container, commentsModel);
  addNewComment.render();
}

export default class CommentsController {
  constructor(container, comments, commentsModel, onDeleteComment) {
    this._container = container;
    this._comments = comments;
    this._commentsModel = commentsModel;

    this._onDeleteComment = onDeleteComment;

    this._onDataChange = this._onDataChange.bind(this);

    this._filmDetailsCommentsComponent = null;
    this._newCommentComponent = null;
    this._newCommentController = null;
    this._commentsModel.setDataChangeHandlers(this._onDataChange);

  }

  render() {
    const container = this._container;
    const oldComponent = this._filmDetailsCommentsComponent;
    this._filmDetailsCommentsComponent = new FilmDetailsCommentsComponent(this._comments.comments);
    console.log(this._filmDetailsCommentsComponent.getElement());

    this._filmDetailsCommentsComponent.setDeleteButtonClickHandler((commentId) => {
      this._onDeleteComment(this._comments, commentId);
    });

    if (oldComponent) {
      replace(oldComponent, this._filmDetailsCommentsComponent);
    } else {
      render(container, this._filmDetailsCommentsComponent, RenderPosition.BEFOREEND);
    }
  }

  destroy() {
    remove(this._filmDetailsCommentsComponent);
  }
  
  _onDataChange() {
    this.render();
  }
}
