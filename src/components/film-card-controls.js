import AbstractComponent from './abstract-component.js';

const CONTROLS = {
  WATCHLIST: `Add to watchlist`,
  ALREADY_WATCHED: `Mark as watched`,
  FAVORITE: `Mark as favorite`,
};

const createControlMarkup = (name, isActive) => {
  const controlClass = name === CONTROLS.FAVORITE ? `favorite` : name.toLowerCase().split(` `).join(`-`);
  const activeClass = isActive ? `film-card__controls-item--active` : ``;
  return (`<button class="film-card__controls-item button film-card__controls-item--${controlClass} ${activeClass}">${name}</button>`);

}

const createComponentTemplate = (controls) => {
  const watchlistControlMarkup = createControlMarkup(CONTROLS.WATCHLIST, controls.isWatchlist);
   const controlsAlreadyWatchedMarkup = createControlMarkup(CONTROLS.ALREADY_WATCHED, controls.isAlreadyWatched);
  const controlsFavoriteMarkup = createControlMarkup(CONTROLS.FAVORITE, controls.isFavorite);

  return (`<form class="film-card__controls">
      ${watchlistControlMarkup}
      ${controlsAlreadyWatchedMarkup}
      ${controlsFavoriteMarkup}
    </form>`);
}

export default class Component extends AbstractComponent {
  constructor(controls) {
    super();
    this._controls = controls;
  }
  getTemplate() {
    return createComponentTemplate(this._controls);
  }

  setWatchlistClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, (evt) => {
      evt.preventDefault();
      handler();
    })
  }
}