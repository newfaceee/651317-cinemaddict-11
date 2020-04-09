import {transformDuration} from '../utils.js';
import {CONTROLS} from '../const.js';

const createControlsMarkup = (control, isActive) => {
  const controlClass = control === `Mark as favorite` ? `favorite` : control.toLowerCase().split(` `).join(`-`);
  const activeClass = isActive ? `film-card__controls-item--active` : ``;
  return (`<button class="film-card__controls-item button film-card__controls-item--${controlClass} ${activeClass}">${control}</button>`);
};
const createFilmCardsMarkup = (filmCard) => {
  const {title, rating, release_date: date, duration, genres, poster, overview, comments} = filmCard;
  const [hours, minutes] = transformDuration(duration);
  const controlsMarkup = CONTROLS.map((control) => {
    return createControlsMarkup(control);
  }).join(`\n`);

  return (`<article class="film-card">
    <h3 class="film-card__title">${title}</h3>
    <p class="film-card__rating">${rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${date.getFullYear()}</span>
      <span class="film-card__duration">${hours}h ${minutes}m</span>
      <span class="film-card__genre">${genres[0]}</span>
    </p>
    <img src="./images/posters/${poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${overview.length > 140 ? overview.substring(0, 140) + `...` : overview}</p>
    <a class="film-card__comments">${comments.length} comments</a>
    <form class="film-card__controls">
      ${controlsMarkup}
    </form>
  </article>`);
};


export const createFilmCardTemplate = (filmCards) => {
  const filmCardsMarkup = filmCards.map((film) => {
    return createFilmCardsMarkup(film);
  }).join(`\n`);
  return filmCardsMarkup;
};
