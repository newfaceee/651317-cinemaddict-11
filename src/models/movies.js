import {getMoviesByFilter} from '../utils/filter.js';
import {FilterType, SortType} from '../const.js';

export default class Movies {
  constructor() {
    this._movies = [];

    this._activeFilterType = FilterType.ALL;
    this._activeSortType = SortType.DEFAULT;
    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];
    this._sortTypeChangeHandlers = [];

  }

  getMovies() {
    return getMoviesByFilter(this._movies, this._activeFilterType);
  }

  getMoviesAll() {
    return this._movies;
  }

  getWatchedMovies() {
    return this._movies.filter((movie) => movie.isAlreadyWatched);
  }

  getMovieById(id) {
    return this._movies.filter((movie) => movie.id === id)[0];
  }

  getActiveSortType() {
    return this._activeSortType;
  }

  getActiveFilterType() {
    return this._activeFilterType;
  }

  getUniqueGenresByFilterType() {
    const filteredMovies = this._movies.filter((movie) => movie.filterType);
    const genres = [].concat(...filteredMovies.map((movie) => movie.genres));
    const uniqueGenres = Array.from(new Set(genres));

    return uniqueGenres;
  }


  setMovies(movies) {
    this._movies = Array.from(movies);
    this._callHandlers(this._dataChangeHandlers);
  }

  setDataChangeHandlers(handler) {
    this._dataChangeHandlers.push(handler);
  }

  setFilterChangeHandlers(handler) {
    this._filterChangeHandlers.push(handler);
  }

  setSortTypeChangeHandlers(handler) {
    this._sortTypeChangeHandlers.push(handler);
  }

  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._callHandlers(this._filterChangeHandlers);
    this._callHandlers(this._dataChangeHandlers);
  }

  setSortType(sortType) {
    this._activeSortType = sortType;
    this._callHandlers(this._sortTypeChangeHandlers);
  }

  updateMovie(id, movie) {
    const index = this._movies.findIndex((it) => it.id === id);
    if (index === -1) {
      return false;
    }

    this._movies = [].concat(this._movies.slice(0, index), movie, this._movies.slice(index + 1));
    return true;
  }

  updateFilters() {
    this._callHandlers(this._dataChangeHandlers);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
