import FilmCardComponent from '../components/film-card.js';
import FilmDetailsPopupComponent from '../components/film-details-popup.js';
import FilmDetailsCommentsWrapComponent from '../components/film-details-comments-wrap.js';
import FilmCardControlsComponent from '../components/film-card-controls.js';
import FilmCardControlsWatchlistComponent from '../components/film-card-controls-watchlist.js';
import FilmCardControlsFavoriteComponent from '../components/film-card-controls-favorite.js';
import FilmCardControlsHistoryComponent from '../components/film-card-controls-history.js';

import {render, RenderPosition, remove, replace} from '../utils/render.js';
import CommentsController from './comments.js';
import NewCommentController from './new-comment.js';

import {CONTROLS} from '../const.js';
const siteBodyElement = document.querySelector(`body`);


// const commentsController = new CommentsController(this._commentsContainerElement, this._comments, this._commentsModel);
// commentsController.render();

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
  constructor(container, onDataChange, onViewChange, commentsModel, moviesModel) {
    this._container = container;
    this._filmCardComponent = null;
    this._filmDetailsPopupComponent = null;
    this._filmDetailsCommentsComponent = null;
    this._filmDetailsCommentsWrapComponent = null;
    this._filmDetailsCommentsListComponent = null;

    this._filmCardControlsWatchlistComponent = null;
    this._filmCardControlsHistoryComponent = null;
    this._filmCardControlsFavoriteComponent = null;

    this._commentsController = null;
    this._newCommentController = null;
    this._addNewCommentContainerElement = null;

    this._onDataChange = onDataChange;
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
    // Создаем инстанс для карточки фильма и попапа
    // на вход принимают карточку одного фильма
    this._filmCardComponent = new FilmCardComponent(filmCard, commentsCount);
    const filmCardElement = this._filmCardComponent.getElement();

    render(filmCardElement, this._filmCardControlsComponent, RenderPosition.BEFOREEND);

    this._filmDetailsPopupComponent = new FilmDetailsPopupComponent(filmCard);
    this._filmDetailsCommentsWrapComponent = new FilmDetailsCommentsWrapComponent();
    
    const formDetailsContainerElement = this._filmDetailsPopupComponent.getElement().querySelector(`.form-details__bottom-container`);
    // const 
    render(formDetailsContainerElement, this._filmDetailsCommentsWrapComponent, RenderPosition.BEFOREEND);
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
    this._filmCardComponent.setClickHandler(`.film-card__comments`, () => {
      this._onViewChange();
      this._openFilmDetailsPopup();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });
    
    this._filmDetailsPopupComponent.setClickClosePopupHandler(() => {
      this._closeFilmDetailsPopup();
    });
    // Рендер карточки фильма
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

  _renderComments(comments) {
    const commentsWrapElement = this._filmDetailsCommentsWrapComponent.getElement();
    const commentsController = renderComments(commentsWrapElement, comments, this._commentsModel, this._onDeleteComment);
    this._commentsController = commentsController;
  }

  _renderAddNewComment(activeEmotion) {
    const commentsWrapElement = this._filmDetailsCommentsWrapComponent.getElement();
    console.log(commentsWrapElement);
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
    remove(this._filmDetailsPopupComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  setDefaultView() {
    this._closeFilmDetailsPopup();
  }

  _openFilmDetailsPopup() {
    const popupElement = this._filmDetailsPopupComponent.getElement();
    this._renderComments(this._comments);
    siteBodyElement.appendChild(popupElement);
    this._renderAddNewComment(null);
  }
  _closeFilmDetailsPopup() {
    // Если попап до этого открыт не был, выходим из функции
    if (!siteBodyElement.contains(this._filmDetailsPopupComponent.getElement())) {
      return;
    }
    const popupElement = this._filmDetailsPopupComponent.getElement();
    siteBodyElement.removeChild(popupElement);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
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
      this._removeComments();
      this._renderComments(newComments);
    }
  }

  _onAddComment(oldData, emotion, commentValue) {
    const isSuccess = this._commentsModel.addNewComment(oldData, emotion, commentValue);
    if (isSuccess) {
      const newComments = this._commentsModel.getCommentsByFilmId(this._filmCard.id);;
      this._removeComments();
      this._renderComments(newComments);
    }
  }

  _onControlClickHandler(id, movie, control) {
    const isSuccess = this._moviesModel.updateMovie(id, movie);
    if (isSuccess) {
      this._filmCard = movie;
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
    }
  }

}
