import {createFilmsDetailsPopupTemplate} from './components/film-details-popup.js';
import {createFilmsContainerTemplate} from './components/films-container.js';
import {createFilmsSectionTemplate} from './components/films-section.js';
import {createFilmCardTemplate} from './components/film-card.js';
import {createNavigationTemplate} from './components/navigation.js';
import {createProfileRatingTemplate} from './components/profile-rating.js';
import {createShowMoreButtonTemplate} from './components/show-more-button.js';
import {createSortTemplate} from './components/sorting.js';


const FILM_CARD_COUNT = 5;
const FILM_CARD_ADDITIONAL_COUNT = 2;


const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};
const siteBodyElement = document.body;
const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

render(siteHeaderElement, createProfileRatingTemplate(), `beforeend`);
render(siteMainElement, createNavigationTemplate(), `beforeend`);
render(siteMainElement, createSortTemplate(), `beforeend`);
render(siteMainElement, createFilmsSectionTemplate(), `beforeend`);

const siteFilmsElement = document.querySelector(`.films`);

render(siteFilmsElement, createFilmsContainerTemplate(false, `All movies. Upcoming`), `beforeend`);

const siteFilmsListElement = siteFilmsElement.querySelector(`.films-list`);
const siteFilmsListContainerElement = siteFilmsListElement.querySelector(`.films-list__container`);

for (let i = 0; i < FILM_CARD_COUNT; i++) {
  render(siteFilmsListContainerElement, createFilmCardTemplate(), `beforeend`);
}

render(siteFilmsListElement, createShowMoreButtonTemplate(), `beforeend`);
render(siteFilmsElement, createFilmsContainerTemplate(true, `Top rated`), `beforeend`);
render(siteFilmsElement, createFilmsContainerTemplate(true, `Most commented`), `beforeend`);

const siteFilmsListExtraElement = document.querySelectorAll(`.films-list--extra`);

for (let filmsExtraItem of siteFilmsListExtraElement) {
  let filmsExtraItemContainer = filmsExtraItem.querySelector(`.films-list__container`);
  for (let i = 0; i < FILM_CARD_ADDITIONAL_COUNT; i++) {
    render(filmsExtraItemContainer, createFilmCardTemplate(), `beforeend`);
  }
}
render(siteBodyElement, createFilmsDetailsPopupTemplate(), `beforeend`);
