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

  getActiveSortType() {
    return this._activeSortType;
  }

  setMovies(movies) {
    this._movies = Array.from(movies);
    this._callHandlers(this._dataChangeHandlers);
  }

  setFavoriteHandler() {

  }

  setHistoryHandler() {

  }

  setWatchlistHandler() {

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
  }

  setSortType(sortType) {
    this._activeSortType = sortType;
    this._callHandlers(this._sortTypeChangeHandlers);
    this._callHandlers(this._dataChangeHandlers);
  }

  updateMovie(id, movie) {
    const index = this._movies.findIndex((movie) => movie.id === id);
    if (index === -1) {
      return false;
    }

    this._movies = [].concat(this._movies.slice(0, index), movie, this._movies.slice(index + 1));
    console.log(this._movies[index]);
    return true;
  }


  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}