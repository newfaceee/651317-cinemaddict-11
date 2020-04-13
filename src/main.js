import {createFilmsDetailsPopupTemplate} from './components/film-details-popup.js';
import {createFilmsContainerTemplate} from './components/films-container.js';
import {createFilmsSectionTemplate} from './components/films-section.js';
import {createFilmCardTemplate} from './components/film-card.js';
import {createNavigationTemplate} from './components/navigation.js';
import {createProfileRatingTemplate} from './components/profile-rating.js';
import {createShowMoreButtonTemplate} from './components/show-more-button.js';
import {createSortTemplate} from './components/sorting.js';
import {createFooterStatisticsTemplate} from './components/footerStatistics.js';
import {generateNavigations} from './mock/navigation.js';
import {generateFilmCards} from './mock/film-cards.js';
import {generateUserProfile} from './mock/user-profile.js';
import {createStatisticsTemplate} from './components/statistic.js';

// const mainPageState = `All movies`;
const FILM_CARD_COUNT = 17;
const FILM_CARD_COUNT_ON_START = 5;
const STEP = 5;
const filmCards = generateFilmCards(FILM_CARD_COUNT);

const userProfile = generateUserProfile();

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};
const siteBodyElement = document.querySelector(`body`);
const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterStatisticsElement = document.querySelector(`.footer__statistics`);

const renderAllMovies = () => {
  let firstFilmCardIndex = 0;
  let lastFilmCardIndex = FILM_CARD_COUNT_ON_START;
  let currentFilmCards = filmCards.slice(firstFilmCardIndex, FILM_CARD_COUNT_ON_START);
  render(siteMainElement, createSortTemplate());
  render(siteMainElement, createFilmsSectionTemplate());
  const siteFilmsElement = document.querySelector(`.films`);
  render(siteFilmsElement, createFilmsContainerTemplate(false, `All movies. Upcoming`));

  const siteFilmsListElement = siteFilmsElement.querySelector(`.films-list`);
  const siteFilmsListContainerElement = siteFilmsListElement.querySelector(`.films-list__container`);

  render(siteFilmsListContainerElement, createFilmCardTemplate(currentFilmCards));
  render(siteFilmsListElement, createShowMoreButtonTemplate());
  const siteShowMoreElement = document.querySelector(`.films-list__show-more`);
  siteShowMoreElement.addEventListener(`click`, () => {
    const filmsListContainer = document.querySelector(`.films-list__container`);
    firstFilmCardIndex = firstFilmCardIndex + STEP;
    lastFilmCardIndex = lastFilmCardIndex + STEP > FILM_CARD_COUNT ? lastFilmCardIndex = FILM_CARD_COUNT : lastFilmCardIndex + 5;
    currentFilmCards = filmCards.slice(firstFilmCardIndex, lastFilmCardIndex);
    render(filmsListContainer, createFilmCardTemplate(currentFilmCards));
    if (lastFilmCardIndex >= FILM_CARD_COUNT) {
      siteShowMoreElement.remove();
    }
  });
};


const updateMainPage = (pageState) => {
  switch (pageState) {
    case `All movies`:
      document.querySelector(`.statistic`).remove();
      renderAllMovies();
      // mainPageState = `All movies`;
      break;
    case `Stats`:
      document.querySelector(`.films`).remove();
      document.querySelector(`.sort`).remove();
      render(siteMainElement, createStatisticsTemplate(userProfile));
      // mainPageState = `Stats`;
      break;
  }
};


const navigations = generateNavigations();

render(siteHeaderElement, createProfileRatingTemplate(userProfile));
render(siteMainElement, createNavigationTemplate(navigations));
const siteMainNavigationElement = document.querySelector(`.main-navigation`);


render(siteFooterStatisticsElement, createFooterStatisticsTemplate(filmCards.length));
renderAllMovies();
render(siteBodyElement, createFilmsDetailsPopupTemplate(filmCards[0]));

siteMainNavigationElement.addEventListener(`click`, (evt) => {
  const target = evt.target;
  if (target.tagName !== `A`) {
    return;
  }

  const text = target.textContent;
  switch (text) {
    case `All movies`:
      updateMainPage(text);
      break;
    case `Stats`:
      updateMainPage(text);
      break;
  }
});


