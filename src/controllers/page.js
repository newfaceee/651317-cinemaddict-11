import FilmsSectionComponent from '../components/films-section.js';
import SortComponent, {SortType} from '../components/sort.js';
import ShowMoreButtonComponent from '../components/show-more-button.js';
import FilmsContainerComponent from '../components/films-container.js';
import FilmsListComponent from '../components/films-list.js';
import NoFilmsComponent from '../components/no-films.js';
import MovieController from './movie.js';
import {generateFilmCards} from '../mock/film-cards.js';


import {render, remove, add, RenderPosition} from '../utils/render.js';
// Вспомогательные переменные для карточек фильмов
const FILM_CARD_COUNT = 17;
const FILM_CARD_COUNT_ON_START = 5;
const STEP = 5;

let showingFilmCardsCount = FILM_CARD_COUNT_ON_START;
// Получение данных из моков
export const filmCards = generateFilmCards(3);
export const filmCardsCount = filmCards.length;

const renderFilmCards = (filmCardsData, filmCardsContainer, onDataChange) => {
  filmCardsData.map((film) => {
    // Создаем инстанс filmCardController, для того, чтобы затем вызвать
    // у него метод render и вернуть карточку фильма
    const filmCardController = new MovieController(filmCardsContainer, onDataChange);
    filmCardController.render(film);
    // console.log(filmCardController.());
    return filmCardController;
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
    // Массив с карточками фильмов, в дальнейшем там будут храниться
    // инстансы класса FilmCard 
    this._filmCards = [];
    // Вспомогательная переменная для задания количества отображаемых фильмов при
    // первом рендере
    this._showingFilmCardsCount = FILM_CARD_COUNT_ON_START;
    // Задаем требуемый контекст для метода _onSortTypeChange()
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);

    this._showedFilmCardControllers = [];
    this._sortComponent = new SortComponent();
    this._filmsSectionComponent = new FilmsSectionComponent();
    this._filmsListComponent = new FilmsListComponent();
    this._filmsContainerComponent = new FilmsContainerComponent();
    this._noFilmsComponent = new NoFilmsComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
    // Передаем колбэком метод класса PageController _onSortTypeChange()
    // в метод класса Sort _setSortTypeChangeHandler()
    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  render(filmCardsData) {
    // Запоминаем в this._filmCards наши моковые данные обо всех фильмах
    // чтобы в дальнейшем обращатсья к ним в любом из методов.
    this._filmCards = filmCardsData;
    // Контейнером является элемент с классом .main поэтому без getElement();
    const container = this._container; 
    const filmsSectionElement = this._filmsSectionComponent.getElement(); // .films
    const filmsListElement = this._filmsListComponent.getElement(); // .films-list
    const filmsListContainerElement = this._filmsContainerComponent.getElement(); // .films-list__container
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
    // Рендер карточек фильмов и кнопку Show-more
    const newFilmCards = renderFilmCards(this._filmCards.slice(0, this._showingFilmCardsCount), filmsListContainerElement, this._onDataChange);
    this._showedFilmCardControllers = this._showedFilmCardControllers.concat(newFilmCards);
    this._renderShowMoreButton();

  }

  _renderShowMoreButton() {
   
    const filmsSectionComponent = this._filmsSectionComponent.getElement();
    
    // Если количество фильмов в БД менььше количества фильмов
    // которые находятся на одном экране, кнопка Show-More нам не нужна
    if (filmCardsCount <= showingFilmCardsCount) {
      return;
    }

    // Рендер кнопки
    render(filmsSectionComponent, this._showMoreButtonComponent, RenderPosition.BEFOREEND);

    // Обработчки по клику на кнопку Show-more
    this._showMoreButtonComponent.setClickHandler(() => {
      const prevFilmCardsCount = this._showingFilmCardsCount;
      const filmsContainerElement = this._filmsContainerComponent.getElement();// .films-list__container
      this._showingFilmCardsCount = this._showingFilmCardsCount + STEP;
      const sortedFilmCards = getSortedFilmCards(this._filmCards, this._sortComponent.getSortType(), prevFilmCardsCount, this._showingFilmCardsCount);
      const newFilmCards = renderFilmCards(sortedFilmCards, filmsContainerElement, this._onDataChange);
      this._showedFilmCardControllers = this._showedFilmCardControllers.concat(newFilmCards);
      // Если текущее количество фильмов равно или больше количества всех карточек, удаляем кнопку
      if (showingFilmCardsCount >= FILM_CARD_COUNT) {
        remove(this._showMoreButtonComponent);
      }

    });
  }

  _onSortTypeChange(sortType) {
    // Обозначим контейнер, для карточек фильмов это .films-card__container
    const filmsContainerComponent = this._filmsContainerComponent.getElement();

    // Восстанавливаем количество отображаемых карточек до начального количества
    showingFilmCardsCount = FILM_CARD_COUNT_ON_START;
    // Очищаем DIV где хранятся карточки фильмов
    filmsContainerComponent.innerHTML = ``;
    // Получаем отсортированные карточки фильмов
    const sortedFilmCards = getSortedFilmCards(this._filmCardsData, sortType, 0, this._showingFilmCardsCount);
    // Получаем обновленные карточки фильмов
    const newFilmCards = renderFilmCards(sortedFilmCards, filmsContainerComponent, this._onDataChange);
    // Обновляем показываемые карточки фильмов
    this._showedFilmCardControllers = newFilmCards;
    // Если кнопки еще нет, добавляем её
    if (!filmsSectionElement.contains(this._showMoreButtomElement.getElement())) {
        renderShowMoreButton();
    }
  }
  _onDataChange(filmCardController, oldData, newData) {
    const filmsContainerElement = this._filmsContainerComponent.getElement();
    filmsContainerElement.innerHTML = ``;
    // Находит индекс карточки фильма по которому кликнули
    const index = this._filmCards.findIndex((it) => it === oldData);
    if (index === -1) {
      return;
    };
    this._filmCards = 
      [].concat(this._filmCards.slice(0, index), newData, this._filmCards.slice(index + 1));
    renderFilmCards(this._filmCards.slice(0, this._showingFilmCardsCount), filmsContainerElement, this._onDataChange);
  }
}
