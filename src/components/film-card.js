import {transformDuration} from '../utils/common.js';
import AbstractComponent from './abstract-component.js';

const controls = [
  `Add to watchlist`, `Mark as watched`, `Mark as favorite`
];
const createControlsMarkup = (control, isActive) => {
  const controlClass = control === `Mark as favorite` ? `favorite` : control.toLowerCase().split(` `).join(`-`);
  const activeClass = isActive ? `film-card__controls-item--active` : ``;
  return (`<button class="film-card__controls-item button film-card__controls-item--${controlClass} ${activeClass}">${control}</button>`);
};
const createFilmCardTemplate = ({title, rating, releaseDate, duration, genres, poster, overview, comments}) => {
  const OVERVIEW_SIZE = 140;
  const posterName = `${poster.split(` `).join(`-`)}.jpg`;
  const [hours, minutes] = transformDuration(duration);
  const releaseDateYear = releaseDate.getFullYear();
  const filmOverview = overview.length > OVERVIEW_SIZE ? overview.substring(0, OVERVIEW_SIZE) + `...` : overview;
  const commentsCount = comments.length;
  const genre = genres[0];
  const controlsMarkup = controls.map((control) => {
    return createControlsMarkup(control);
  }).join(`\n`);

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
    <a class="film-card__comments">${commentsCount} comments</a>
    <form class="film-card__controls">
      ${controlsMarkup}
    </form>
  </article>`);
};

export default class FilmCard extends AbstractComponent {
  constructor(filmCard) {
    super();
    this._filmCard = filmCard;
  }
  getTemplate() {
    return createFilmCardTemplate(this._filmCard);
  }
}
