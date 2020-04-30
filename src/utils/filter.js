import {FilterType} from '../const.js';

export const getAllMovies = (movies) => {
  return movies;
};

export const getWatchlistMovies = (movies) => {
  return movies.filter((movie) => movie.isWatchList);
};

export const getHistoryMovies = (movies) => {
  return movies.filter((movie) => movie.isAlreadyWatched);
};

export const getFavoritesMovies = (movies) => {
  return movies.filter((movie) => movie.isFavorite);
};

export const getMoviesByFilter = (movies, filterType) => {
  switch(filterType) {
    case FilterType.ALL: 
      return getAllMovies(movies);
      break;
    case FilterType.WATCHLIST:
      return getWatchlistMovies(movies);
      break;
    case FilterType.HISTORY:
      return getHistoryMovies(movies);
      break;
    case FilterType.FAVORITES:
      return getFavoritesMovies(movies);
      break;
  }
  return movies;
}