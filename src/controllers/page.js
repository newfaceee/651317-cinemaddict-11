import FilmsSectionComponent from '../components/films-section.js';

import ShowMoreButtonComponent from '../components/show-more-button.js';
import FilmsContainerComponent from '../components/films-container.js';
import FilmsListComponent from '../components/films-list.js';
import NoFilmsComponent from '../components/no-films.js';
import MovieController from './movie.js';


import {SortType} from '../const.js';
import {render, remove, RenderPosition} from '../utils/render.js';
// Вспомогательные переменные для карточек фильмов

const FILM_CARD_COUNT_ON_START = 5;
const STEP = 5;

let showingFilmCardsCount = FILM_CARD_COUNT_ON_START;
// Получение данных из моков

// Функция для рендера карточек
const renderFilmCards = (filmCardsData, filmCardsContainer, onDataChange, onViewChange) => {
  return filmCardsData.map((film) => {
    // Создаем инстанс filmCardController, для того, чтобы затем вызвать
    // у него метод render и вернуть карточку фильма
    const filmCardController = new MovieController(filmCardsContainer, onDataChange, onViewChange);
    filmCardController.render(film);
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
      sortedFilmCards = showingFilmCards.sort((a, b) => b.releaseDate - a.releaseDate);
      break;
    case SortType.RATING:
      sortedFilmCards = showingFilmCards.sort((a, b) => b.rating - a.rating);
      break;
  }
  return sortedFilmCards.slice(from, to);
};

export default class PageController {
  constructor(container, moviesModel, commentsModel) {
    this._container = container;
    // Массив с карточками фильмов, в дальнейшем там будут храниться
    // инстансы класса FilmCard
    this._moviesModel = moviesModel;
    this._commentsModel = commentsModel;
    // Вспомогательная переменная для задания количества отображаемых фильмов при
    // первом рендере
    this._showingFilmCardsCount = FILM_CARD_COUNT_ON_START;
    // Задаем требуемые контексты
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onShowMoreButtonClick = this._onShowMoreButtonClick.bind(this);

    this._showedFilmCardControllers = [];

    this._filmsSectionComponent = new FilmsSectionComponent();
    this._filmsListComponent = new FilmsListComponent();
    this._filmsContainerComponent = new FilmsContainerComponent();
    this._noFilmsComponent = new NoFilmsComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
    // Передаем колбэком метод класса PageController _onSortTypeChange()
    // в метод класса Sort _setSortTypeChangeHandler()
    this._moviesModel.setFilterChangeHandlers(this._onFilterChange);
    this._moviesModel.setSortTypeChangeHandlers(this._onSortTypeChange);
  }

  render() {
    const movies = this._moviesModel.getMovies();
    const filmCardsCount = movies.length;
    // Контейнером является элемент с классом .main поэтому без getElement();
    const container = this._container;
    const filmsSectionElement = this._filmsSectionComponent.getElement(); // .films
    const filmsListElement = this._filmsListComponent.getElement(); // .films-list

    // В случае если в БД нету фильмов отображает соответствующее сообщение
    if (filmCardsCount === 0 || !filmCardsCount || typeof filmCardsCount === `undefined`) {
      render(container, this._noFilmsComponent, RenderPosition.BEFOREEND);
      return;
    }

    // рендерит элементы сортировки
    // рендерит секцию фильмы (.films)
    render(container, this._filmsSectionComponent, RenderPosition.BEFOREEND);
    // рендерит элемент .films-list внутри .films
    render(filmsSectionElement, this._filmsListComponent, RenderPosition.BEFOREEND);
    // рендерит внутри .films-list элемент для хранения карточек фильмов .films-list__container
    render(filmsListElement, this._filmsContainerComponent, RenderPosition.BEFOREEND);

    this._renderMovies(movies.slice(0, this._showingFilmCardsCount));
    this._renderShowMoreButton();
  }

  _renderMovies(movies) {
    const filmsListContainerElement = this._filmsContainerComponent.getElement(); // .films-list__container
    const newfilmCards = renderFilmCards(movies, filmsListContainerElement, this._onDataChange, this._onViewChange);
    this._showedFilmCardControllers = [].concat(newfilmCards);
    this._showingFilmCardsCount = this._showedFilmCardControllers.length;
  }

  _renderShowMoreButton() {
    remove(this._showMoreButtonComponent);
    if (this._showingFilmCardsCount >= this._moviesModel.getMovies().length) {
      return;
    }
    const filmsSectionComponent = this._filmsSectionComponent.getElement();
    render(filmsSectionComponent, this._showMoreButtonComponent, RenderPosition.BEFOREEND);
    this._showMoreButtonComponent.setClickHandler(this._onShowMoreButtonClick);
  }

  _removeMovies() {
    this._showedFilmCardControllers.forEach((movieController) => movieController.destroy());
    this._showedFilmCardControllers = [];
  }

  _updateMovies(count) {
    this._removeMovies();
    this._renderMovies(this._moviesModel.getMovies().slice(0, count));
    this._renderShowMoreButton();
  }

  _onSortTypeChange() {
    const filmCards = this._moviesModel.getMovies();
    const sortType = this._moviesModel.getActiveSortType();
    const sortedFilmCards = getSortedFilmCards(filmCards, sortType, 0, this._showingFilmCardsCount);
    this._removeMovies();
    this._renderMovies(sortedFilmCards);
  }
  _onDataChange(oldData, newData) {
    const id = oldData.id;
    const isSuccess = this._moviesModel.updateMovie(id, newData);
    const filmCards = this._moviesModel.getMovies();
    const sortedFilmCards = getSortedFilmCards(filmCards, this._moviesModel.getActiveSortType(), 0, this._showingFilmCardsCount);
    
    if (isSuccess) {
      this._removeMovies();
      this._renderMovies(sortedFilmCards);
      this._renderShowMoreButton();
    }
  } 
  _onViewChange() {
    this._showedFilmCardControllers.forEach((it) => it.setDefaultView());
  }

  _onFilterChange() {
    this._updateMovies(FILM_CARD_COUNT_ON_START);
    this._moviesModel.setSortType(SortType.DEFAULT);
  }

  _onShowMoreButtonClick() {
    const movies = this._moviesModel.getMovies();
    const prevFilmCardsCount = this._showingFilmCardsCount;
    const filmsContainerElement = this._filmsContainerComponent.getElement();// .films-list__container
    this._showingFilmCardsCount = this._showingFilmCardsCount + STEP;

    const sortedFilmCards = getSortedFilmCards(movies, this._moviesModel.getActiveSortType(), prevFilmCardsCount, this._showingFilmCardsCount);
    const newFilmCards = renderFilmCards(sortedFilmCards, filmsContainerElement, this._onDataChange, this._onViewChange);
    this._showedFilmCardControllers = this._showedFilmCardControllers.concat(newFilmCards);

    if (this._showingFilmCardsCount >= movies.length) {
      remove(this._showMoreButtonComponent);
    }
  }
}
