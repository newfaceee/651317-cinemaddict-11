import AbstractComponent from './abstract-component.js';
import {CONTROLS} from '../const.js';

const createHistoryTemplate = (name, isActive) => {
  const controlClass = name.toLowerCase().split(` `).join(`-`);
  const activeClass = isActive ? `film-card__controls-item--active` : ``;
  return (`<button class="film-card__controls-item button film-card__controls-item--${controlClass} ${activeClass}">${name}</button>`);
}

export default class FilmCardWatchlist extends AbstractComponent {
  constructor(isActive) {
    super();
    this._isActive = isActive;
  }

  getTemplate() {
    return createHistoryTemplate(CONTROLS.ALREADY_WATCHED, this._isActive);
  }
  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      const controlName = evt.target.textContent;
      evt.preventDefault();
      handler(controlName);
    });
  }
}