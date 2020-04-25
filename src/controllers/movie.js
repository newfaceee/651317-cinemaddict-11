import FilmCardComponent from '../components/film-card.js';
import FilmDetailsPopupComponent from '../components/film-details-popup.js';

import {render, RenderPosition, remove, add} from '../utils/render.js';

const siteBodyElement = document.querySelector(`body`);

export default class MovieController {
  // в качестве контейнера должно приходить элемент с классом .films-list__container
  constructor(container, onDataChange) {
    this._container = container;
    this._filmCardComponent = null;
    this._filmDetailsPopupComponent = null;
    this._onDataChange = onDataChange;
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }
  render(filmCard) {
    // Создаем инстанс для карточки фильма и попапа
    // на вход принимают карточку одного фильма
    this._filmCardComponent = new FilmCardComponent(filmCard);
    this._filmDetailsPopupComponent = new FilmDetailsPopupComponent(filmCard);

    // Обработчики для открытия попапа

    this._filmCardComponent.setClickHandler(`.film-card__poster`, () => {
      this._openFilmDetailsPopup();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });
    this._filmCardComponent.setClickHandler(`.film-card__title`, () => {
      this._openFilmDetailsPopup();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });
    this._filmCardComponent.setClickHandler(`.film-card__comments`, () => {
      this._openFilmDetailsPopup();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });
    // Обработчики по клику на controllers [mark-as-favorite, mark-as-watched, add-to-watchlist]
    this._filmCardComponent.setWatchlistButtonClickHandler(() => {
      console.log(`You clicked watchlist controller`);
      this._onDataChange(this, filmCard, Object.assign({}, filmCard, {
        isWatchList: !filmCard.isWatchList
      }));
    });
    this._filmCardComponent.setAlreadyWatchedButtonClickHandler(() => {
      console.log(`You clicked already watched controller`)
      this._onDataChange(this, filmCard, Object.assign({}, filmCard, {
        isAlreadyWatched: !filmCard.isAlreadyWatched
      }));
    });
    this._filmCardComponent.setFavoriteButtonClickHandler(() => {
      console.log(`You clicked favorite controller`)
      this._onDataChange(this, filmCard, Object.assign({}, filmCard, {
        isFavorite: !filmCard.isFavorite
      }));
    });
    
    // Обработчик для закрытия попапа
    this._filmDetailsPopupComponent.setClickHandler(`.film-details__close-btn`, () => {
      closeFilmDetailsPopup();
    });

    // Рендер карточки фильма
    render(this._container, this._filmCardComponent, RenderPosition.BEFOREEND)
  }

  _openFilmDetailsPopup() {
    add(siteBodyElement, this._filmDetailsPopupComponent);
    // siteBodyElement.appendChild(filmDetailsPopupComponent.getElement());
  }
  _closeFilmDetailsPopup() {
    remove(this._filmDetailsPopupComponent);
    // siteBodyElement.removeChild(filmDetailsPopupComponent.getElement());
  }
  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._closeFilmDetailsPopup();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}