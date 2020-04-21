import FilmCardComponent from '../components/film-card.js';
import FilmDetailsPopupComponent from '../components/film-details-popup.js';
import ShowMoreButtonComponent from '../components/show-more-button.js';
import FilmsContainerComponent from '../components/films-container.js';
import FilmsListComponent from '../components/films-list.js';
import {generateFilmCards} from '../mock/film-cards.js';

import {render, remove, RenderPosition} from '../utils/render.js';
// Вспомогательные переменные для карточек фильмов
const FILM_CARD_COUNT = 17;
const FILM_CARD_COUNT_ON_START = 5;
const STEP = 5;

let showingFilmCardsCount = FILM_CARD_COUNT_ON_START;
// Получение данных из моков
export const filmCards = generateFilmCards(FILM_CARD_COUNT);


export const filmCardsCount = filmCards.length;


const siteBodyElement = document.querySelector(`body`);
// Функция для рендера карточки фильма
const renderFilmCard = (filmsListElement, film) => {
  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      closeFilmDetailsPopup();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };
  const openFilmDetailsPopup = () => {
    siteBodyElement.appendChild(filmDetailsPopupComponent.getElement());
  };
  const closeFilmDetailsPopup = () => {
    siteBodyElement.removeChild(filmDetailsPopupComponent.getElement());
  };
  const filmCardComponent = new FilmCardComponent(film);

  const filmDetailsPopupComponent = new FilmDetailsPopupComponent(film);

  // Обработчики для открытия попапа

  filmCardComponent.setClickHandler(() => {
    openFilmDetailsPopup();
    document.addEventListener(`keydown`, onEscKeyDown);
  }, `.film-card__poster`);
  filmCardComponent.setClickHandler(() => {
    openFilmDetailsPopup();
    document.addEventListener(`keydown`, onEscKeyDown);
  }, `.film-card__title`);
  filmCardComponent.setClickHandler(() => {
    openFilmDetailsPopup();
    document.addEventListener(`keydown`, onEscKeyDown);
  }, `.film-card__comments`);
  // Обработчик для закрытия
  filmDetailsPopupComponent.setClickHandler(() => {
    closeFilmDetailsPopup();
  }, `.film-details__close-btn`);
  // Рендер карточки фильма
  render(filmsListElement, filmCardComponent, RenderPosition.BEFOREEND);
};

const renderFilmsList = (filmsSectionComponent, filmCardsData) => {
  // Рендер сообщения о пустой базе данных
  if (filmCardsCount === 0 || !filmCardsCount || typeof filmCardsCount === `undefined`) {
    render(filmsSectionComponent.getElement(), new FilmsListComponent(`There are no movies in our database`, true), RenderPosition.BEFOREEND);
    return;
  }
  // Рендер контейнера куда складываются карточки фильмов

  render(filmsSectionComponent.getElement(), new FilmsListComponent(`All movies. Upcoming`, false), RenderPosition.BEFOREEND);
  render(filmsSectionComponent.getElement(), new FilmsContainerComponent(), RenderPosition.BEFOREEND);
  const filmsListElement = filmsSectionComponent.getElement().querySelector(`.films-list__container`);

  // // Отрисовка начального количества фильмов
  filmCardsData.slice(0, showingFilmCardsCount).forEach((film) => {
    renderFilmCard(filmsListElement, film);
  });

  // // Отрисовка кнопки Show More
  const showMoreButtonComponent = new ShowMoreButtonComponent();
  render(filmsSectionComponent.getElement(), showMoreButtonComponent, RenderPosition.BEFOREEND);
  showMoreButtonComponent.setClickHandler(() => {
    const prevFilmCardsCount = showingFilmCardsCount;
    showingFilmCardsCount = showingFilmCardsCount + STEP;

    filmCardsData.slice(prevFilmCardsCount, showingFilmCardsCount).forEach((film) => {
      renderFilmCard(filmsListElement, film);
    });
    if (showingFilmCardsCount >= FILM_CARD_COUNT) {
      remove(showMoreButtonComponent);
    }
  });

};


export default class PageController {
  constructor(container) {
    this._container = container;
  }

  render(filmCardsData) {
    renderFilmsList(this._container, filmCardsData);
  }

}
