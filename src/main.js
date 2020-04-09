import { createFilmsDetailsPopupTemplate } from './components/film-details-popup.js';
import { createFilmsContainerTemplate } from './components/films-container.js';
import { createFilmsSectionTemplate } from './components/films-section.js';
import { createFilmCardTemplate } from './components/film-card.js';
import { createNavigationTemplate } from './components/navigation.js';
import { createProfileRatingTemplate } from './components/profile-rating.js';
import { createShowMoreButtonTemplate } from './components/show-more-button.js';
import { createSortTemplate } from './components/sorting.js';
import { createFooterStatisticsTemplate } from './components/footerStatistics.js';
import { generateNavigations } from './mock/navigation.js';
import { generateFilmCards } from './mock/film-cards.js';
import { generateUserProfile } from './mock/user-profile.js';
import { createStatisticsTemplate } from './components/statistic.js';

const FILM_CARD_COUNT = 17;
const filmCards = generateFilmCards(FILM_CARD_COUNT);
const userProfile = generateUserProfile();



const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};
const siteBodyElement = document.body;
const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterStatisticsElement = document.querySelector(`.footer__statistics`);


const navigations = generateNavigations();

render(siteHeaderElement, createProfileRatingTemplate(userProfile), `beforeend`);
render(siteMainElement, createNavigationTemplate(navigations), `beforeend`);
// render(siteMainElement, createSortTemplate(), `beforeend`);
render(siteMainElement, createFilmsSectionTemplate(), `beforeend`);

const siteFilmsElement = document.querySelector(`.films`);

render(siteFilmsElement, createFilmsContainerTemplate(false, `All movies. Upcoming`), `beforeend`);

const siteFilmsListElement = siteFilmsElement.querySelector(`.films-list`);
const siteFilmsListContainerElement = siteFilmsListElement.querySelector(`.films-list__container`);

render(siteFilmsListContainerElement, createFilmCardTemplate(filmCards), `beforeend`);



// render(siteFilmsListElement, createShowMoreButtonTemplate(), `beforeend`);
// render(siteFilmsElement, createFilmsContainerTemplate(true, `Top rated`), `beforeend`);
// render(siteFilmsElement, createFilmsContainerTemplate(true, `Most commented`), `beforeend`);
render(siteFooterStatisticsElement, createFooterStatisticsTemplate(filmCards.length), `beforeend`);

const siteFilmsListShowMoreElement = document.querySelector(`.films-list__show-more`);
const siteFilmsListExtraElement = document.querySelectorAll(`.films-list--extra`);




// for (let filmsExtraItem of siteFilmsListExtraElement) {
//   let filmsExtraItemContainer = filmsExtraItem.querySelector(`.films-list__container`);
//   for (let i = 0; i < FILM_CARD_ADDITIONAL_COUNT; i++) {
//     render(filmsExtraItemContainer, createFilmCardTemplate(), `beforeend`);
//   }
// }


// render(siteBodyElement, createFilmsDetailsPopupTemplate(filmCards), `beforeend`);


render(siteMainElement, createStatisticsTemplate(userProfile), `beforeend`)