import {MONTH_NAMES} from '../const.js';
import {formatDate, formatTime} from '../utils/common.js';
import AbstractSmartComponent from './abstract-smart-component.js';
import AbstractComponent from './abstract-component.js';

const POPUP_CONTROLS = {
  WATCHLIST: `Add to watchlist`,
  ALREADY_WATCHED: `Already watched`,
  FAVORITE: `Add to favorites`,
};

const POPUP_CONTROLS_TEXT = {
  WATCHLIST: `watchlist`,
  ALREADY_WATCHED: `watched`,
  FAVORITE: `favorite`,
};

const createGenresMarkup = (genre) => {
  return `<span class="film-details__genre">${genre}</span>`;
};

const createControlMarkup = (text, className, checked) => {
  const isChecked = checked ? `checked` : ``;
  return (`<input type="checkbox" class="film-details__control-input visually-hidden" id="${className}" name="${className}" ${isChecked}>
  <label for="${className}" class="film-details__control-label film-details__control-label--${className}">${text}</label>
`);
};

const createFilmDetailsPopupMarkup = ({ageRating, actors, alreadyWatched, country, description, director, duration, favorite, genre, originalTitle, poster, rating, releaseDate, title, watchlist, writers}) => {
  const formattedReleaseDate = formatDate(releaseDate);
  const formattedDuration = formatTime(duration);
  const genresMarkup = genre.map((it) => {
    return createGenresMarkup(it);
  }).join(`\n`);
  const popupWatchlistControlMarkup = createControlMarkup(POPUP_CONTROLS.WATCHLIST, POPUP_CONTROLS_TEXT.WATCHLIST, watchlist);
  const popupFavoriteControlMarkup = createControlMarkup(POPUP_CONTROLS.FAVORITE, POPUP_CONTROLS_TEXT.FAVORITE, favorite);
  const popupHistoryControlMarkup = createControlMarkup(POPUP_CONTROLS.ALREADY_WATCHED, POPUP_CONTROLS_TEXT.ALREADY_WATCHED, alreadyWatched);
  return (`<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="form-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="${poster}" alt="">
  
            <p class="film-details__age">${ageRating}+</p>
          </div>
  
          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${title}</h3>
                <p class="film-details__title-original">Original: ${originalTitle}</p>
              </div>
  
              <div class="film-details__rating">
                <p class="film-details__total-rating">${rating}</p>
              </div>
            </div>
  
            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">${writers.length > 1 ? `Writers` : `Writer`}</td>
                <td class="film-details__cell">${writers.join(` `)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">${actors.length > 1 ? `Actors` : `Actor`}</td>
                <td class="film-details__cell">${actors.join(` `)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${formattedReleaseDate}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${formattedDuration}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${country}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">${genre.length > 1 ? `Genres` : `Genre`}</td>
                <td class="film-details__cell">
                  ${genresMarkup}
                </td>
              </tr>
            </table>
  
            <p class="film-details__film-description">${description}</p>
          </div>
        </div>
  
        <section class="film-details__controls">
          ${popupWatchlistControlMarkup}
          ${popupFavoriteControlMarkup}
          ${popupHistoryControlMarkup}
        </section>
      </div>
  
      <div class="form-details__bottom-container">
        
      </div>
    </form>
  </section>`);
};

const createFilmsDetailsPopupTemplate = (filmCard) => {
  return createFilmDetailsPopupMarkup(filmCard);
};

export default class FilmDetailsPopup extends AbstractComponent {
  constructor(filmCard) {
    super();
    this._filmCard = filmCard;
  }

  getTemplate() {
    return createFilmsDetailsPopupTemplate(this._filmCard, this._comments);
  }

  setClickClosePopupHandler(handler) {
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, handler);
    this._clickClosePopupHandler = handler;
  }

  setWatchlistControlClickHandler(handler) {
    this.getElement().querySelector(`.film-details__control-label--watchlist`).addEventListener(`click`, (evt) => {
      handler(evt.target);
    });
  }

  setFavoriteControlClickHandler(handler) {
    this.getElement().querySelector(`.film-details__control-label--favorite`).addEventListener(`click`, (evt) => {
      handler(evt.target);
    });
  }

  setHistoryControlClickHandler(handler) {
    this.getElement().querySelector(`.film-details__control-label--watched`).addEventListener(`click`, (evt) => {
      handler(evt.target);
    });
  }
}
