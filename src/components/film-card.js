import {transformDuration} from '../utils/common.js';
import AbstractComponent from './abstract-component.js';

const createFilmCardTemplate = ({title, rating, releaseDate, duration, genres, poster, overview}) => {
  const OVERVIEW_SIZE = 140;
  const posterName = `${poster.split(` `).join(`-`)}.jpg`;
  const [hours, minutes] = transformDuration(duration);
  const releaseDateYear = releaseDate.getFullYear();
  const filmOverview = overview.length > OVERVIEW_SIZE ? overview.substring(0, OVERVIEW_SIZE) + `...` : overview;
  const genre = genres[0];
  return (`<article class="film-card">
    <h3 class="film-card__title">${title}</h3>
    <p class="film-card__rating">${rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${releaseDateYear}</span>
      <span class="film-card__duration">${hours}h ${minutes}m</span>
      <span class="film-card__genre">${genre}</span>
    </p>
    <img src="./images/posters/${posterName}" alt="" class="film-card__poster">
    <p class="film-card__description">${filmOverview}</p>
  </article>`);
};

export default class FilmCard extends AbstractComponent {
  constructor(filmCard, commentsCount) {
    super();
    this._filmCard = filmCard;
    this._commentsCount = commentsCount;
  }
  getTemplate() {
    return createFilmCardTemplate(this._filmCard, this._commentsCount);
  }
  setClickHandler(selector, handler) {
    this.getElement().querySelector(selector).addEventListener(`click`, handler);
  }
  // setWatchlistButtonClickHandler(handler) {
  //   this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`)
  //     .addEventListener(`click`, (evt) => {
  //       evt.preventDefault();
  //       handler();
  //     });
  // }
  // setAlreadyWatchedButtonClickHandler(handler) {
  //   this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`)
  //     .addEventListener(`click`, (evt) => {
  //       evt.preventDefault();
  //       handler();
  //     });
  // }
  // setFavoriteButtonClickHandler(handler) {
  //   this.getElement().querySelector(`.film-card__controls-item--favorite`)
  //     .addEventListener(`click`, (evt) => {
  //       evt.preventDefault();
  //       handler();
  //     });
  // }

}
