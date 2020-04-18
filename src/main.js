import FilmDetailsPopupComponent from './components/film-details-popup.js';
import FilmsContainerComponent from './components/films-container.js';
import FilmsListComponent from './components/films-list.js';
import FilmsSectionComponent from './components/films-section.js';
import FilmCardComponent from './components/film-card.js';
import NavigationComponent from './components/navigation.js';
import ProfileRatingComponent from './components/profile-rating.js';
import ShowMoreButtonComponent from './components/show-more-button.js';
import SortComponent from './components/sort.js';
import FooterStatisticsComponent from './components/footerStatistics.js';
// import StatisticsComponent from './components/statistic.js';
import {generateNavigations} from './mock/navigation.js';
import {generateFilmCards} from './mock/film-cards.js';
import {generateUserProfile} from './mock/user-profile.js';
import {render, RenderPosition} from './utils.js';

// Основные элементы разметки
const siteBodyElement = document.querySelector(`body`);
const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterStatisticsElement = document.querySelector(`.footer__statistics`);
// Вспомогательные переменные для карточек фильмов
const FILM_CARD_COUNT = 17;
const FILM_CARD_COUNT_ON_START = 5;
const STEP = 5;

let showingFilmCardsCount = FILM_CARD_COUNT_ON_START;
// Получение данных из моков
const filmCards = generateFilmCards(0);
const userProfile = generateUserProfile();
const navigations = generateNavigations();

const filmCardsCount = filmCards.length;
// Рендер рейтинга, меню навигации и меню сортировки
render(siteHeaderElement, new ProfileRatingComponent(userProfile).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new NavigationComponent(navigations).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new SortComponent().getElement(), RenderPosition.BEFOREEND);
render(siteFooterStatisticsElement, new FooterStatisticsComponent(filmCardsCount).getElement(), RenderPosition.BEFOREEND);

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
  const filmCardPoster = filmCardComponent.getElement().querySelector(`.film-card__poster`);
  const filmCardTitle = filmCardComponent.getElement().querySelector(`.film-card__title`);
  const filmCardCommentsCount = filmCardComponent.getElement().querySelector(`.film-card__comments`);

  const filmDetailsPopupComponent = new FilmDetailsPopupComponent(film);
  const filmDetailsPopupCloseButton = filmDetailsPopupComponent.getElement().querySelector(`.film-details__close-btn`);

  // Обработчики для открытия попапа

  filmCardPoster.addEventListener(`click`, () => {
    openFilmDetailsPopup();
    document.addEventListener(`keydown`, onEscKeyDown);
  });
  filmCardTitle.addEventListener(`click`, () => {
    openFilmDetailsPopup();
    document.addEventListener(`keydown`, onEscKeyDown);
  });
  filmCardCommentsCount.addEventListener(`click`, () => {
    openFilmDetailsPopup();
    document.addEventListener(`keydown`, onEscKeyDown);
  });
  // Обработчик для закрытия
  filmDetailsPopupCloseButton.addEventListener(`click`, closeFilmDetailsPopup);
  // Рендер карточки фильма
  render(filmsListElement, filmCardComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderFilmsList = (filmsSectionComponent, filmCardsData) => {
  // Рендер сообщения о пустой базе данных
  if (filmCardsCount === 0 || !filmCardsCount || typeof filmCardsCount === `undefined`) {
    render(filmsSectionComponent.getElement(), new FilmsListComponent(`There are no movies in our database`, true).getElement(), RenderPosition.BEFOREEND);
    return;
  }
  // Рендер контейнера куда складываются карточки фильмов

  render(filmsSectionComponent.getElement(), new FilmsListComponent(`All movies. Upcoming`, false).getElement(), RenderPosition.BEFOREEND);
  render(filmsSectionComponent.getElement(), new FilmsContainerComponent().getElement(), RenderPosition.BEFOREEND);
  const filmsListElement = filmsSectionComponent.getElement().querySelector(`.films-list__container`);

  // // Отрисовка начального количества фильмов
  filmCardsData.slice(0, showingFilmCardsCount).forEach((film) => {
    renderFilmCard(filmsListElement, film);
  });

  // // Отрисовка кнопки Show More
  const showMoreButtonComponent = new ShowMoreButtonComponent();
  render(filmsSectionComponent.getElement(), showMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);
  showMoreButtonComponent.getElement().addEventListener(`click`, () => {
    const prevFilmCardsCount = showingFilmCardsCount;
    showingFilmCardsCount = showingFilmCardsCount + STEP;

    filmCardsData.slice(prevFilmCardsCount, showingFilmCardsCount).forEach((film) => {
      renderFilmCard(filmsListElement, film);
    });
    if (showingFilmCardsCount >= FILM_CARD_COUNT) {
      showMoreButtonComponent.getElement().remove();
      showMoreButtonComponent.removeElement();
    }
  });


};
const filmsSectionComponent = new FilmsSectionComponent();
render(siteMainElement, filmsSectionComponent.getElement(), RenderPosition.BEFOREEND);
renderFilmsList(filmsSectionComponent, filmCards);


