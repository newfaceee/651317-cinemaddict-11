import FilmCardComponent from '../components/film-card.js';
import FilmDetailsPopupComponent from '../components/film-details-popup.js';
import FilmDetailsCommentsComponent from '../components/film-details-comments.js';
import {render, RenderPosition, remove} from '../utils/render.js';
import CommentsController from './comments.js';
import NewCommentController from './new-comment.js';

const siteBodyElement = document.querySelector(`body`);

export default class MovieController {
  // в качестве контейнера должно приходить элемент с классом .films-list__container
  constructor(container, onDataChange, onViewChange, onDeleteComment, commentsModel) {
    this._container = container;
    this._filmCardComponent = null;
    this._filmDetailsPopupComponent = null;
    this._filmDetailsCommentsComponent = null;

    this._commentsContainerElement = null;
    this._addNewCommentContainerElement = null;

    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._onDeleteComment = onDeleteComment;
    
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    

    this._commentsModel = commentsModel;
  }
  render(filmCard) {
    const index = this._commentsModel.getComments().findIndex((comments) => comments.id === filmCard.id);
    this._comments = this._commentsModel.getComments()[index];
    const commentsCount = this._comments.comments.length;
    // Создаем инстанс для карточки фильма и попапа
    // на вход принимают карточку одного фильма
    this._filmCardComponent = new FilmCardComponent(filmCard, commentsCount);
    this._filmDetailsPopupComponent = new FilmDetailsPopupComponent(filmCard);
    this._commentsContainerElement = this._filmDetailsPopupComponent.getElement().querySelector(`.form-details__bottom-container`);
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
    // Рендер карточки фильма
    render(this._container, this._filmCardComponent, RenderPosition.BEFOREEND);
  }

  _renderComments() {
    const commentsController = new CommentsController(this._commentsContainerElement, this._comments, this._commentsModel);
    this._addNewCommentContainerElement = commentsController;

    commentsController.render();
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
    this._renderComments();
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
