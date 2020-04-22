import FilmCardComponent from '../components/film-card.js';
import FilmsSectionComponent from '../components/films-section.js';
import SortComponent, {SortType} from '../components/sort.js';
import FilmDetailsPopupComponent from '../components/film-details-popup.js';
import ShowMoreButtonComponent from '../components/show-more-button.js';
import FilmsContainerComponent from '../components/films-container.js';
import FilmsListComponent from '../components/films-list.js';
import NoFilmsComponent from '../components/no-films.js';
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
const renderFilmCard = (container, film) => {
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

  filmCardComponent.setClickHandler(`.film-card__poster`, () => {
    openFilmDetailsPopup();
    document.addEventListener(`keydown`, onEscKeyDown);
  });
  filmCardComponent.setClickHandler(`.film-card__title`, () => {
    openFilmDetailsPopup();
    document.addEventListener(`keydown`, onEscKeyDown);
  });
  filmCardComponent.setClickHandler(`.film-card__comments`, () => {
    openFilmDetailsPopup();
    document.addEventListener(`keydown`, onEscKeyDown);
  });
  // Обработчик для закрытия попапа
  filmDetailsPopupComponent.setClickHandler(`.film-details__close-btn`, () => {
    closeFilmDetailsPopup();
  });
  // Рендер карточки фильма
  render(container, filmCardComponent, RenderPosition.BEFOREEND);
};

const renderFilmCards = (filmCardsData, filmCardsContainer) => {
  filmCardsData.forEach((filmCardElement) => {
    renderFilmCard(filmCardsContainer, filmCardElement);
  });
};
const getSortedFilmCards = (filmCardsData, sortType, from, to) => {
  let sortedFilmCards = [];
  const showingFilmCards = filmCardsData.slice();
  switch (sortType) {
    case SortType.DEFAULT:
      sortedFilmCards = showingFilmCards;
      break;
    case SortType.DATE:
      sortedFilmCards = showingFilmCards.sort((a, b) => a.releaseDate - b.releaseDate);
      break;
    case SortType.RATING:
      sortedFilmCards = showingFilmCards.sort((a, b) => b.rating - a.rating);
      break;
  }
  return sortedFilmCards.slice(from, to);
};

export default class PageController {
  constructor(container) {
    this._container = container;
    this._filmsSectionComponent = new FilmsSectionComponent();
    this._filmsListComponent = new FilmsListComponent();
    this._filmsContainerComponent = new FilmsContainerComponent();
    this._noFilmsComponent = new NoFilmsComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
    this._sortComponent = new SortComponent();
  }

  render(filmCardsData) {

    const container = this._container;
    const filmsSectionElement = this._filmsSectionComponent.getElement(); // .films
    const filmsListElement = this._filmsListComponent.getElement(); // .films-list
    const filmsListContainerElement = this._filmsContainerComponent.getElement(); // .films-list__container
    const showMoreButtomElement = this._showMoreButtonComponent.getElement(); // show-more-button


    const renderShowMoreButton = () => {
      render(filmsSectionElement, this._showMoreButtonComponent, RenderPosition.BEFOREEND);
      this._showMoreButtonComponent.setClickHandler(() => {
        const prevFilmCardsCount = showingFilmCardsCount;
        showingFilmCardsCount = showingFilmCardsCount + STEP;
        const sortedFilmCards = getSortedFilmCards(filmCardsData, this._sortComponent.getSortType(), prevFilmCardsCount, showingFilmCardsCount);
        renderFilmCards(sortedFilmCards, filmsListContainerElement);
        if (showingFilmCardsCount >= FILM_CARD_COUNT) {
          remove(this._showMoreButtonComponent);
        }
      });
    };

    // В случае если в БД нету фильмов отображает соответствующее сообщение
    if (filmCardsCount === 0 || !filmCardsCount || typeof filmCardsCount === `undefined`) {
      render(container, this._noFilmsComponent, RenderPosition.BEFOREEND);
      return;
    }

    // рендерит элементы сортировки
    render(container, this._sortComponent, RenderPosition.BEFOREEND);
    // рендерит секцию фильмы (.films)
    render(container, this._filmsSectionComponent, RenderPosition.BEFOREEND);
    // рендерит элемент .films-list внутри .films
    render(filmsSectionElement, this._filmsListComponent, RenderPosition.BEFOREEND);
    // рендерит внутри .films-list элемент для хранения карточек фильмов .films-list__container
    render(filmsListElement, this._filmsContainerComponent, RenderPosition.BEFOREEND);
    // Отрисовка начального количества фильмов
    renderFilmCards(filmCardsData.slice(0, FILM_CARD_COUNT_ON_START), filmsListContainerElement);
    // Отрисовка кнопки Show More
    renderShowMoreButton();
    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      showingFilmCardsCount = FILM_CARD_COUNT_ON_START;

      filmsListContainerElement.innerHTML = ``;

      const sortedFilmCards = getSortedFilmCards(filmCardsData, sortType, 0, showingFilmCardsCount);
      renderFilmCards(sortedFilmCards.slice(0, showingFilmCardsCount), filmsListContainerElement);

      if (!filmsSectionElement.contains(showMoreButtomElement)) {
        renderShowMoreButton();
      }
    });
  }
}
