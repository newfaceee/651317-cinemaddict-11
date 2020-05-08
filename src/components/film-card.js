import {transformDuration} from '../utils/common.js';
import AbstractComponent from './abstract-component.js';

const createFilmCardTemplate = ({title, poster, description, actors, duration, rating, genre, releaseDate}) => {
  const DESCRIPTION_SIZE = 140;
  const [hours, minutes] = transformDuration(duration);
  const releaseDateYear = releaseDate.getFullYear();
  const filmDescription = description.length > DESCRIPTION_SIZE ? description.substring(0, DESCRIPTION_SIZE) + `...` : description;
  return (`<article class="film-card">
    <h3 class="film-card__title">${title}</h3>
    <p class="film-card__rating">${rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${releaseDateYear}</span>
      <span class="film-card__duration">${hours}h ${minutes}m</span>
      <span class="film-card__genre">${genre[0]}</span>
    </p>
    <img src="${poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${filmDescription}</p>
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
}
