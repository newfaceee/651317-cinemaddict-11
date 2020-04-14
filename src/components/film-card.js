import {transformDuration} from '../utils.js';

const controls = [
  `Add to watchlist`, `Mark as watched`, `Mark as favorite`
];
const createControlsMarkup = (control, isActive) => {
  const controlClass = control === `Mark as favorite` ? `favorite` : control.toLowerCase().split(` `).join(`-`);
  const activeClass = isActive ? `film-card__controls-item--active` : ``;
  return (`<button class="film-card__controls-item button film-card__controls-item--${controlClass} ${activeClass}">${control}</button>`);
};
const createFilmCardsMarkup = ({title, rating, releaseDate, duration, genres, poster, overview, comments}) => {
  const OVERVIEW_SIZE = 140;
  const posterName = `${poster.split(` `).join(`-`)}.jpg`;
  const [hours, minutes] = transformDuration(duration);
  const controlsMarkup = controls.map((control) => {
    return createControlsMarkup(control);
  }).join(`\n`);

  return (`<article class="film-card">
    <h3 class="film-card__title">${title}</h3>
    <p class="film-card__rating">${rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${releaseDate.getFullYear()}</span>
      <span class="film-card__duration">${hours}h ${minutes}m</span>
      <span class="film-card__genre">${genres[0]}</span>
    </p>
    <img src="./images/posters/${posterName}" alt="" class="film-card__poster">
    <p class="film-card__description">${overview.length > OVERVIEW_SIZE ? overview.substring(0, OVERVIEW_SIZE) + `...` : overview}</p>
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
