import FilmCardComponent from '../components/film-card.js';
import FilmDetailsPopupComponent from '../components/film-details-popup.js';
import FilmDetailsPopupCommentsComponent from '../components/film-details-popup-comments.js';
import {render, RenderPosition, remove} from '../utils/render.js';
import CommentsController from './comments.js';

const siteBodyElement = document.querySelector(`body`);

// const renderComments = (commentsData) => {
//   return commentsData.map((comment) => {
//     const commentsController = new CommentsController();
//     commentsController.render(comment);
//     return commentsController;
//   });
// };


export default class MovieController {
  // в качестве контейнера должно приходить элемент с классом .films-list__container
  constructor(container, onDataChange, onViewChange, onDeleteComment) {
    this._container = container;
    this._filmCardComponent = null;
    this._filmDetailsPopupComponent = null;
    this._filmDetailsPopupCommentsComponent = null;
    this._filmDetailsPopupCommentsComponent = null;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._onDeleteComment = onDeleteComment;
  }
  render(filmCard, comments) {
    this._comments = comments;

    // Создаем инстанс для карточки фильма и попапа
    // на вход принимают карточку одного фильма
    this._filmCardComponent = new FilmCardComponent(filmCard, this._comments);
    this._filmDetailsPopupComponent = new FilmDetailsPopupComponent(filmCard, this._comments);
    // this._filmDetailsPopupCommentsComponent = new FilmDetailsPopupCommentsComponent(comments);
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
    // Обработчики по клику на controllers [mark-as-favorite, mark-as-watched, add-to-watchlist]
    this._filmCardComponent.setWatchlistButtonClickHandler(() => {
      this._onDataChange(filmCard, Object.assign({}, filmCard, {
        isWatchList: !filmCard.isWatchList
      }));
    });
    this._filmCardComponent.setAlreadyWatchedButtonClickHandler(() => {
      this._onDataChange(filmCard, Object.assign({}, filmCard, {
        isAlreadyWatched: !filmCard.isAlreadyWatched
      }));
    });
    this._filmCardComponent.setFavoriteButtonClickHandler(() => {

      this._onDataChange(filmCard, Object.assign({}, filmCard, {
        isFavorite: !filmCard.isFavorite
      }));
    });
    // Обработчик для закрытия попапа
    this._filmDetailsPopupComponent.setClickClosePopupHandler(() => {
      this._closeFilmDetailsPopup();
    });

    this._filmDetailsPopupComponent.setDeleteCommentClickHandler((id) => {
      this._onDeleteComment(comments, id);
    });

    // Рендер карточки фильма
    render(this._container, this._filmCardComponent, RenderPosition.BEFOREEND);
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
    siteBodyElement.appendChild(popupElement);
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

}
