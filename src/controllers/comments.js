import FilmDetailsCommentsComponent from '../components/film-details-comments.js';
import FilmDetailsCommentsListComponent from '../components/film-details-comments-list.js';
import FilmDetailsCommentsTitleComponent from '../components/film-details-comments-title.js';
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

    // this._filmDetailsCommentsComponent = null;
    this._newCommentComponent = null;
    this._newCommentController = null;

  }

  render() {
    const container = this._container;
    const commentsCount = this._comments.comments.length;
    this._filmDetailsCommentsListComponent = new FilmDetailsCommentsListComponent();
    this._filmDetailsCommentsTitleComponent = new FilmDetailsCommentsTitleComponent(commentsCount);

    const commentsListElement = this._filmDetailsCommentsListComponent.getElement();
    
    this._comments.comments.forEach((it) => {
      this._filmDetailsCommentsComponent = new FilmDetailsCommentsComponent(it);
      this._filmDetailsCommentsComponent.setDeleteButtonClickHandler((commentId) => {
        this._onDeleteComment(this._comments, commentId);
      });
      render(commentsListElement, this._filmDetailsCommentsComponent, RenderPosition.BEFOREEND);
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
