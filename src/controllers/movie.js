import FilmCardComponent from '../components/film-card.js';
import FilmDetailsPopupComponent from '../components/film-details-popup.js';
import FilmDetailsCommentsWrapComponent from '../components/film-details-comments-wrap.js';

import FilmCardControlsComponent from '../components/film-card-controls.js';
import FilmCardControlsWatchlistComponent from '../components/film-card-controls-watchlist.js';
import FilmCardControlsFavoriteComponent from '../components/film-card-controls-favorite.js';
import FilmCardControlsHistoryComponent from '../components/film-card-controls-history.js';

import FilmCardCommentsComponent from '../components/film-card-comments.js';

import {render, RenderPosition, remove, replace} from '../utils/render.js';
import CommentsController from './comments.js';
import NewCommentController from './new-comment.js';

import {CONTROLS} from '../const.js';

const renderComments = (container, comments, commentsModel, onDeleteComment) => {
  const commentsController = new CommentsController(container, comments, commentsModel, onDeleteComment);
  commentsController.render();
  return commentsController;
};

const renderAddNewComment = (container, commentsModel, activeEmotion, onAddComment, comments) => {
  const newCommentController = new NewCommentController(container, commentsModel, activeEmotion, onAddComment, comments);
  newCommentController.render();
  return newCommentController;
};


export default class MovieController {
  // в качестве контейнера должно приходить элемент с классом .films-list__container
  constructor(container, onViewChange, commentsModel, moviesModel) {
    this._container = container;
    this._filmCardComponent = null;
    this._filmDetailsPopupComponent = null;
    this._filmDetailsCommentsComponent = null;
    this._filmDetailsCommentsWrapComponent = null;

    this._filmCardControlsWatchlistComponent = null;
    this._filmCardControlsHistoryComponent = null;
    this._filmCardControlsFavoriteComponent = null;
    this._filmCardCommentsComponent = null;

    this._commentsController = null;
    this._newCommentController = null;
    this._addNewCommentContainerElement = null;

    this._onViewChange = onViewChange;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._onDeleteComment = this._onDeleteComment.bind(this);
    this._onAddComment = this._onAddComment.bind(this);
    this._renderComments = this._renderComments.bind(this);
    this._onControlClickHandler = this._onControlClickHandler.bind(this);

    this._commentsModel = commentsModel;
    this._moviesModel = moviesModel;
  }

  render(filmCard) {
    this._filmCard = filmCard;
    this._comments = this._commentsModel.getCommentsByFilmId(this._filmCard.id);
    const commentsCount = this._comments.comments.length;
    this._filmCardControlsComponent = new FilmCardControlsComponent(filmCard);

    this._filmCardComponent = new FilmCardComponent(filmCard, commentsCount);
    const filmCardElement = this._filmCardComponent.getElement();
    this._renderCommentsCount(commentsCount);
    render(filmCardElement, this._filmCardCommentsComponent, RenderPosition.BEFOREEND);
    this._filmDetailsCommentsWrapComponent = new FilmDetailsCommentsWrapComponent();

    // Обработчики для открытия попапа
    this._filmCardComponent.setClickHandler(`.film-card__poster`, () => {
      this._onViewChange();
      this._openFilmDetailsPopup();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });
    this._filmCardComponent.setClickHandler(`.film-card__title`, () => {
      this._onViewChange();
      this._openFilmDetailsPopup();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });
    this._filmCardCommentsComponent.setClickHandler(() => {
      this._onViewChange();
      this._openFilmDetailsPopup();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._renderFavoriteControl();
    this._renderHistoryControl();
    this._renderWathListControl();
    render(this._container, this._filmCardComponent, RenderPosition.BEFOREEND);
  }

  _renderWathListControl() {
    const oldComponent = this._filmCardControlsWatchlistComponent;
    this._filmCardControlsWatchlistComponent = new FilmCardControlsWatchlistComponent(this._filmCard.isWatchList);
    this._filmCardControlsWatchlistComponent.setClickHandler((control) => {
      const newMovie = Object.assign({}, this._filmCard, {
        isWatchList: !this._filmCard.isWatchList
      });
      this._onControlClickHandler(this._filmCard.id, newMovie, control);
    });
    const filmCardControlsElement = this._filmCardControlsComponent.getElement();
    if (oldComponent) {
      replace(oldComponent, this._filmCardControlsWatchlistComponent);
    } else {
      render(filmCardControlsElement, this._filmCardControlsWatchlistComponent, RenderPosition.AFTERBEGIN);
    }
  }

  _renderHistoryControl() {
    const oldComponent = this._filmCardControlsHistoryComponent;
    this._filmCardControlsHistoryComponent = new FilmCardControlsHistoryComponent(this._filmCard.isAlreadyWatched);
    this._filmCardControlsHistoryComponent.setClickHandler((control) => {
      const newMovie = Object.assign({}, this._filmCard, {
        isAlreadyWatched: !this._filmCard.isAlreadyWatched
      });
      this._onControlClickHandler(this._filmCard.id, newMovie, control);
    });
    const filmCardControlsElement = this._filmCardControlsComponent.getElement();
    if (oldComponent) {
      replace(oldComponent, this._filmCardControlsHistoryComponent);
    } else {
      render(filmCardControlsElement, this._filmCardControlsHistoryComponent, RenderPosition.AFTERBEGIN);
    }
  }

  _renderFavoriteControl() {
    const oldComponent = this._filmCardControlsFavoriteComponent;
    this._filmCardControlsFavoriteComponent = new FilmCardControlsFavoriteComponent(this._filmCard.isFavorite);
    this._filmCardControlsFavoriteComponent.setClickHandler((control) => {
      const newMovie = Object.assign({}, this._filmCard, {
        isFavorite: !this._filmCard.isFavorite
      });
      this._onControlClickHandler(this._filmCard.id, newMovie, control);
    });
    const filmCardControlsElement = this._filmCardControlsComponent.getElement();
    if (oldComponent) {
      replace(oldComponent, this._filmCardControlsFavoriteComponent);
    } else {
      render(filmCardControlsElement, this._filmCardControlsFavoriteComponent, RenderPosition.AFTERBEGIN);
    }
  }
  _renderPopup() {
    const container = document.querySelector(`body`);
    const comments = this._commentsModel.getCommentsByFilmId(this._filmCard.id);
    this._filmDetailsPopupComponent = new FilmDetailsPopupComponent(this._filmCard);
    this._filmDetailsPopupComponent.setClickClosePopupHandler(() => {
      this._closeFilmDetailsPopup();
      document.removeEventListener(`keydon`, this._onEscKeyDown);
    });

    this._filmDetailsPopupComponent.setWatchlistControlClickHandler(() => {
      const newMovie = Object.assign({}, this._filmCard, {
        isWatchList: !this._filmCard.isWatchList
      });
      this._onControlClickHandler(this._filmCard.id, newMovie, CONTROLS.WATCHLIST);
    });
    this._filmDetailsPopupComponent.setFavoriteControlClickHandler(() => {
      const newMovie = Object.assign({}, this._filmCard, {
        isFavorite: !this._filmCard.isFavorite
      });
      this._onControlClickHandler(this._filmCard.id, newMovie, CONTROLS.FAVORITE);
    });
    this._filmDetailsPopupComponent.setHistoryControlClickHandler(() => {
      const newMovie = Object.assign({}, this._filmCard, {
        isAlreadyWatched: !this._filmCard.isAlreadyWatched
      });
      this._onControlClickHandler(this._filmCard.id, newMovie, CONTROLS.ALREADY_WATCHED);
    });
    const formDetailsContainerElement = this._filmDetailsPopupComponent.getElement().querySelector(`.form-details__bottom-container`);
    render(formDetailsContainerElement, this._filmDetailsCommentsWrapComponent, RenderPosition.BEFOREEND);

    this._renderComments(comments);
    this._renderAddNewComment(null);
    render(container, this._filmDetailsPopupComponent, RenderPosition.BEFOREEND);
  }

  _renderComments(comments) {
    const commentsWrapElement = this._filmDetailsCommentsWrapComponent.getElement();
    const commentsController = renderComments(commentsWrapElement, comments, this._commentsModel, this._onDeleteComment);
    this._commentsController = commentsController;
  }

  _renderAddNewComment(activeEmotion) {
    const commentsWrapElement = this._filmDetailsCommentsWrapComponent.getElement();
    const newCommentController = renderAddNewComment(commentsWrapElement, this._commentsModel, activeEmotion, this._onAddComment, this._comments);
    this._newCommentController = newCommentController;
  }

  _removeComments() {
    this._commentsController.destroy();
    this._commentsController = null;
  }

  _removeAddNewComment() {
    this._newCommentController.destroy();
    this._newCommentController = null;
  }

  destroy() {
    remove(this._filmCardComponent);
    if (this._filmDetailsCommentsComponent) {
      remove(this._filmDetailsPopupComponent);
    }
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  setDefaultView() {
    this._closeFilmDetailsPopup();
  }

  _openFilmDetailsPopup() {
    this._renderPopup();
    document.addEventListener(`keydown`, (evt) => {
      this._onEscKeyDown(evt);
    });
  }

  _closeFilmDetailsPopup() {
    if (this._filmDetailsPopupComponent) {
      remove(this._filmDetailsPopupComponent);
    }

  }

  _renderCommentsCount(commentsCount) {
    const filmCardElement = this._filmCardComponent.getElement();
    const oldComponent = this._filmCardCommentsComponent;
    this._filmCardCommentsComponent = new FilmCardCommentsComponent(commentsCount);
    if (oldComponent) {
      replace(oldComponent, this._filmCardCommentsComponent);
    } else {
      render(filmCardElement, this._filmCardControlsComponent, RenderPosition.BEFOREEND);
    }
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
    if (isEscKey) {
      this._closeFilmDetailsPopup();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  _onDeleteComment(comment, id) {
    const isSuccess = this._commentsModel.deleteComment(comment, id);
    if (isSuccess) {
      const newComments = this._commentsModel.getCommentsByFilmId(this._filmCard.id);
      const commentsCount = newComments.comments.length;
      this._removeComments();
      this._renderComments(newComments);
      this._renderCommentsCount(commentsCount);
    }
  }

  _onAddComment(oldData, emotion, commentValue) {
    const isSuccess = this._commentsModel.addNewComment(oldData, emotion, commentValue);
    if (isSuccess) {
      const newComments = this._commentsModel.getCommentsByFilmId(this._filmCard.id);
      const commentsCount = newComments.comments.length;
      this._removeComments();
      this._renderComments(newComments);
      this._renderCommentsCount(commentsCount);
    }
  }

  _onControlClickHandler(id, movie, control) {
    const isSuccess = this._moviesModel.updateMovie(id, movie);

    if (isSuccess) {
      this._filmCard = this._moviesModel.getMovieById(this._filmCard.id);
      switch (control) {
        case CONTROLS.WATCHLIST:
          this._renderWathListControl();
          break;
        case CONTROLS.ALREADY_WATCHED:
          this._renderHistoryControl();
          break;
        case CONTROLS.FAVORITE:
          this._renderFavoriteControl();
          break;
      }
      this._moviesModel.updateFilters();
    }
  }
}
